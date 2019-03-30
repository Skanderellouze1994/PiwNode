import React, {Component} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import connect from "react-redux/es/connect/connect";

class AddCourse extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);

        this.state = {
            title :'',
            startDate:'',
            description:'',
            objectives:'',
            category:'',
            period:''
        };
    }

    componentDidMount() {
        console.log(this.props)
    }
    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const course = {
            title: this.state.title
        };

        axios.post('http://localhost:4000/trainingSession/add/course/',course)
            .then(res => console.log(res.data));


        this.setState({
            title: ''
        })
    }

    render() {
       // console.log(this.props.user);
        console.log(this.props);
       // console.log(this.state);
        return (
            <div className="tab-pane fade" id="tabAddCourse" role="tabpanel">
                <div className="row">
                    <div className="col-lg-6 mx-auto">
                        <div className="card shadow-v2">
                            <div className="card-header border-bottom">
                                <h4 className="mt-4">
                                    Add your new course here!
                                </h4>
                            </div>
                            <div className="card-body">
                                <form name="form">
                                    <div className="input-group input-group--focus mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text bg-white ti-comment"/>
                                        </div>
                                        <input name="title" type="text" className="form-control border-left-0 pl-0"
                                               placeholder="Name"
                                               value={this.state.title}
                                               onChange={this.onChangeTitle}
                                        />
                                    </div>
                                    <div className="input-group input-group--focus mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text bg-white ti-text"/>
                                        </div>
                                        <input name="description" type="text"
                                               className="form-control border-left-0 pl-0" placeholder="Description"
                                        />
                                    </div>
                                    <div className="input-group input-group--focus mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text bg-white ti-calendar"/>
                                        </div>
                                        <input name="startDate"
                                               placeholder="Start date 03/27/2018 8:09 PM" type="text"
                                               className="form-control datetimepicker-input" id="ec-datetimepicker"
                                               data-toggle="datetimepicker" data-target="#ec-datetimepicker"/>
                                    </div>
                                    <div className="input-group input-group--focus mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text bg-white ti-key"/>
                                        </div>
                                        <input name="objectives" type="text"
                                               className="form-control border-left-0 pl-0" placeholder="Objectives"
                                        />
                                    </div>
                                    <div className="input-group input-group--focus mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text bg-white ti-layers"/>
                                        </div>
                                        <input name="category" type="text"
                                               className="form-control border-left-0 pl-0" placeholder="Category"
                                        />
                                    </div>
                                    <div className="input-group input-group--focus mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text bg-white ti-timer"/>
                                        </div>
                                        <input name="period" type="number"
                                               className="form-control border-left-0 pl-0" placeholder="Hours per day"
                                        />
                                    </div>
                                    <button className="btn btn-block btn-primary">Add course</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    const {alert} = state;
    const { authentication } = state;
    const { user } = authentication;
    const { session } = state;

    return {
        alert,
        user,
        authentication,
        session
    };
}

const connectedLoginPage = connect(mapStateToProps)(AddCourse);
export { connectedLoginPage as AddCourse };