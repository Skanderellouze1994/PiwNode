import React, {Component} from "react";
import connect from "react-redux/es/connect/connect";
import axios from "axios";
import {Link} from "react-router-dom";
import moment from "moment";

var dateFormat = require('dateformat');

class OneSessionDetail extends Component {
    /*componentWillMount() {
        const { dispatch } = this.props;
        dispatch(trainingSessionAction.getAll());
        console.log(dispatch(trainingSessionAction.getAll()))
    }*/
    constructor(props) {
        super(props);

        this.state = {
            session: {},
            courses: [],
            buttonOn : 'Participate Now',
            buttonOff : 'Already Participated',
            classname :'btn btn-outline-success shadow-success mr-3 mb-3'
        };
    }


    componentDidMount() {
        axios
            .get(`/trainingSession/get/${this.props.id}`)
            .then(response => {
                this.setState({session: response.data});
                this.setState({courses: response.data.courses});
                console.log(response.data.courses);
            })

    }

    participateNow(){
        axios
            .post(`/trainingSession/add/student/${this.props.user.user._id}/${this.props.id}`)
            .then(response => {
                //this.setState({courses: response.data.courses});
                console.log(response.data);
            });
    }

    participate(){
        this.setState({buttonOn : 'Already Participated'});
        this.setState({classname: 'btn btn-success shadow-success mr-3 mb-3'});
        axios
            .post(`/trainingSession/add/student/${this.props.user.user._id}/${this.props.id}`)
            .then(response => {
                //this.setState({courses: response.data.courses});
                console.log(response.data);
            });
    }

    render() {
        if(this.state.session.studentsList !== undefined)
        this.state.session.studentsList.map(e=>console.log(e))
        const currentDate = moment();

        return (
            <div className="list-card align-items-center shadow-v1 marginTop-30">
                <div className="col-lg-4 px-lg-4 my-4">
                    <img className="w-100" src="assets/img/360x220/4.jpg" alt="true"/>
                </div>
                <div className="col-lg-8 paddingRight-30 my-4">
                    <div className="media justify-content-between">
                        <div className="group">
                            <Link to={"/allCourses/" + this.state.session._id}>
                                <strong>{this.state.session.name}</strong>
                            </Link>
                            <ul className="list-inline mt-3">
                                {this.state.session.tutor !== undefined &&
                                <li className="list-inline-item mr-2">
                                    <i className="ti-user mr-2"/>
                                    {this.state.session.tutor.username}
                                </li>}
                                <li className="list-inline-item mr-2">
                                    <i className="fas fa-star text-warning"/>
                                    <i className="fas fa-star text-warning"/>
                                    <i className="fas fa-star text-warning"/>
                                    <i className="fas fa-star text-warning"/>
                                    <i className="fas fa-star text-warning"/>
                                </li>
                            </ul>
                        </div>
                        <Link to="/all" className="btn btn-opacity-primary iconbox iconbox-sm"
                              data-container="body" data-toggle="tooltip" data-placement="top"
                              data-skin="light" title="Add to favorite"
                              data-original-title="to favorite">
                            <i className="ti-heart"/>
                        </Link>
                    </div>
                    <p>
                        {this.state.session.description}
                    </p>
                    <ul className="list-inline mb-0">
                        <li className="list-inline-item mr-3">
                            <i className="ti-time small mr-2"/>
                            {dateFormat(this.state.session.startDate, "dddd, mmmm dS, yyyy, h:MM:ss TT")}
                        </li>
                    </ul>
                    <br/>

                    {this.state.session.studentsList !== undefined && this.state.session.studentsList.length !== 0
                        ?
                        this.state.session.studentsList.map(list => (
                            list === this.props.user.user._id
                                ? <button className="btn btn-success shadow-success mr-3 mb-3">
                                    {this.state.buttonOff}</button>
                                :list !== this.props.user.user._id&& <button className={this.state.classname} onClick={this.participate.bind(this)}>
                                    {this.state.buttonOn}</button>))

                        : <button className={this.state.classname} onClick={this.participate.bind(this)}>
                            {this.state.buttonOn}</button>}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {alert} = state;
    const {authentication} = state;
    const {user} = authentication;

    return {
        alert,
        user
    };
}

const connectedLoginPage = connect(mapStateToProps)(OneSessionDetail);
export {connectedLoginPage as OneSessionDetail};