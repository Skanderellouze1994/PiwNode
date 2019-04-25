import React, {Component} from 'react';
import SimpleReactValidator from "simple-react-validator";
import axios from "axios";
import Swal from "sweetalert2";
import connect from "react-redux/es/connect/connect";
import {history} from "../../_helpers";
import {Link} from "react-router-dom";

class ResponseQuiz extends Component {

    constructor(props) {
        super(props);
        var a = null;
        var next = null;
        var last = null;

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);

        this.state = {
            quiz: {},
            questions: [],
            question: {},
            propositions: [],
            response : {
                rightResponse: ''
            }
        };
        this.validator = new SimpleReactValidator(
            {element: message => <div className="alert text-danger bg-danger-0_1 px-4 py-3" role="alert">
                    {message}
                </div>}
        );
    }

    onChange(e) {
        const { name, value } = e.target;
        const { response } = this.state;
        this.setState({
            response: {
                ...response,
                [name]: value
            }
        });
    }

    componentDidMount(){
        axios
            .get(`http://localhost:4000/quiz/${this.props.match.params.idquiz}/questions`)
            .then(response => {
                this.setState({ questions: response.data });
                this.a = response.data
               // console.log(a)

                var i = 0;
                for (i; i < this.a.length-1; i += 1) {
                    if (this.a[i]) {
                        //console.log(this.a[i + 1]._id);
                    }
                }
            })
        axios
            .get(`http://localhost:4000/quiz/${this.props.match.params.idquiz}/question/${this.props.match.params.id}`)
            .then(response => {
                this.setState({ question: response.data });
                //console.log(response.data)
                var i = 0;
                for (i; i < this.a.length-1; i += 1) {
                    if (this.a[i]._id==response.data._id) {
                        if(this.a[i - 1]){
                            this.last = this.a[i - 1]._id;
                            console.log(this.last);
                        }
                        if(this.a[i + 1]){
                            this.next = this.a[i + 1]._id;
                            console.log(this.next);
                        }
                    }
                }
            })
        axios
            .get(`http://localhost:4000/quiz/${this.props.match.params.idquiz}/question/${this.props.match.params.id}/propositions`)
            .then(response => {
                this.setState({ propositions: response.data });
                console.log(response.data)
            })
    }
    onSubmit(e) {
        e.preventDefault();

        const {response} = this.state;
        var i = 0;
        for (i; i < this.a.length-1; i += 1) {
        axios.post(`http://localhost:4000/quiz/${this.props.match.params.idquiz}/question/${this.props.match.params.id}/resp`,response)
            .then(res => {
                console.log(this.a[i].name);
                setTimeout(()=>window.location.reload(),0);
                history.push('/responsequiz/'+this.props.match.params.idquiz+'/'+this.a[i]._id);

            });
        }
        this.setState({
        })
    }
    nextQuestion(){
        history.push('/responsequiz/'+this.props.match.params.idquiz+'/'+this.next);
    }
    lastQuestion(){
        history.push('/responsequiz/'+this.props.match.params.idquiz+'/'+this.last);
    }
    render() {
        return (
            <section className="padding-y-100 bg-light">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 mx-auto">
                            <div className="card shadow-v2">
                                <div className="card-header border-bottom">
                                    <h4 className="mt-4">
                                        question : {this.state.question.name}
                                    </h4>
                                </div>
                                <div className="card-body">
                                    {alert.message &&
                                    <div className={`alert ${alert.type} text-white px-4 py-3`} role="alert">
                                        {alert.message}
                                    </div>
                                    }

                                    <form name="form" onSubmit={this.onSubmit} className="px-lg-4">

                                            {this.state.propositions.map(p=>
                                            {return(
                                                <ol>
                                                <label className="ec-radio radio-thin radio-sm mb-3 mr-4">
                                                    <input type="radio" name="rightResponse"
                                                           value={this.state.response.rightResponse}
                                                           onChange={this.onChange}/>
                                                    <span className="ec-radio__control"/>
                                                    <span className="ec-radio__label">{p.name}</span>
                                                </label>
                                                </ol>
                                            )})}

                                            {this.validator.message('Name', this.state.response.rightResponse, 'required')}
                                        <button type="submit" className="btn btn-block btn-primary">Validate</button>

                                        <button onClick={this.lastQuestion} className="btn btn-info rounded">
                                            <i className="ti-angle-left small"/>
                                        </button>
                                        <button onClick={this.nextQuestion} className="btn btn-info rounded">
                                            <i className="ti-angle-right small"/>
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
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

const connectedLoginPage = connect(mapStateToProps)(ResponseQuiz);
export { connectedLoginPage as ResponseQuiz };
