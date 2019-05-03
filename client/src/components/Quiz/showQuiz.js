import React,{Component} from "react";
import connect from "react-redux/es/connect/connect";
import axios from "axios";
import { Link } from "react-router-dom";

class ShowQuiz extends Component{
    constructor(props) {
        super(props);

        this.delete = this.delete.bind(this);

        this.state ={
            quiz: {},
            questions: [],
            question: {},
            idp: 0
        };
    }

    componentDidMount(){
        axios
            .get(`http://localhost:4000/quiz/${this.props.match.params.id}`)
            .then(response => {
                this.setState({ quiz: response.data });
                console.log(response.data);
            })
        axios
            .get(`http://localhost:4000/quiz/${this.props.match.params.id}/questions`)
            .then(response => {
                this.setState({ questions: response.data });
                console.log(response.data);
            })
    }

    delete() {
        setTimeout(() => window.location.reload(), 0);
        axios
            .delete(`http://localhost:4000/quiz/${this.props.match.params.id}/question/${this.state.idp}`)
            .then(response => {
                this.setState({ question: response.data });
                console.log(response.data)
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
                                    <h2 className="mt-4">
                                        quiz name : {this.state.quiz.name}
                                    </h2>
                                </div>
                                <div className="card-body">
                                    {this.state.questions.map(q=>
                                    {return(
                                        <ul className="list-unstyled list-style-icon list-icon-check">
                                            <h5>
                                                {this.props.user.user._id === this.state.quiz.tutor &&
                                                    <i className="ti-trash" onClick={this.delete}/>
                                                }
                                                question: {q.name} </h5>
                                            <li className="nav-item">
                                                    {q.rightResponse}
                                            </li>
                                            {q.propositions.map(p=>
                                            {return(
                                                <ul>
                                                    <li className="nav-item">
                                                        {p.name}
                                                    </li>
                                                </ul>
                                            )})}
                                        </ul>
                                    )})}
                                    {this.props.user.user._id === this.state.quiz.tutor &&

                                    <Link to={"/addquestion/" + this.state.quiz._id}
                                          className="btn btn-info active mr-2 mb-3"
                                          type="submit">
                                        new question
                                    </Link>
                                    }
                                    <Link to={"/course/"+this.state.quiz.course}
                                          className="btn btn-info active mr-2 mb-3"
                                          type="submit">
                                        course
                                    </Link>
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
    const { authentication } = state;
    const { user } = authentication;
    return {
        user,
        quiz: state.quiz
    };
}

const connectedLoginPage = connect(mapStateToProps)(ShowQuiz);
export { connectedLoginPage as ShowQuiz };
