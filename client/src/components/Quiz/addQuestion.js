import React, {Component} from 'react';
import SimpleReactValidator from "simple-react-validator";
import axios from "axios";
import Swal from "sweetalert2";
import connect from "react-redux/es/connect/connect";
import {history} from "../../_helpers";

class AddQuestion extends Component {

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);

        this.state = {
            question: {
                name: '',
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
        const { question } = this.state;
        this.setState({
            question: {
                ...question,
                [name]: value
            }
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const {question} = this.state;
        console.log(question)

        axios.post(`http://localhost:4000/quiz/${this.props.match.params.id}/question`,question)
            .then(res => {
                //console.log(res)
                history.push('/addproposition/'+this.props.match.params.id+'/'+res.data.questions[res.data.questions.length-1]._id);
            });

        this.setState({
        })
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
                                        Add new question!
                                    </h4>
                                </div>
                                <div className="card-body">
                                    {alert.message &&
                                    <div className={`alert ${alert.type} text-white px-4 py-3`} role="alert">
                                        {alert.message}
                                    </div>
                                    }
                                    <form name="form" onSubmit={this.onSubmit}>
                                        <div className="input-group input-group--focus mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-white" />
                                            </div>
                                            <input name="name" type="text" className="form-control border-left-0 pl-0" placeholder="Name"
                                                   value={this.state.question.name}
                                                   onChange={this.onChange}
                                            />
                                            {this.validator.message('Name', this.state.question.name, 'required')}
                                        </div>
                                        <div className="input-group input-group--focus mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-white" />
                                            </div>
                                            <input name="rightResponse" type="text" className="form-control border-left-0 pl-0" placeholder="Right response"
                                                   value={this.state.question.rightResponse}
                                                   onChange={this.onChange}
                                            />
                                            {this.validator.message('Name', this.state.question.rightResponse, 'required')}
                                        </div>
                                        <button type="submit" className="btn btn-block btn-primary">Add question</button>
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
    const { question } = state;

    return {
        alert,
        user,
        authentication,
        question
    };
}

const connectedLoginPage = connect(mapStateToProps)(AddQuestion);
export { connectedLoginPage as AddQuestion };
