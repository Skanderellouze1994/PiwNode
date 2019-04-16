import React, {Component} from "react";
import axios from "axios";
import connect from "react-redux/es/connect/connect";
import SimpleReactValidator from "simple-react-validator";

import Swal from 'sweetalert2';

class AddCourse extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);

        this.state = {
            course: {
                title: '',
                startDate: '',
                description: '',
                objectives: '',
                category: '',
                period: ''
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
        const { course } = this.state;
        this.setState({
            course: {
                ...course,
                [name]: value
            }
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const {course} = this.state;

        axios.post(`http://localhost:4000/trainingSession/add/course/${this.props.user.user._id}/${this.props.id}`,course)
            .then(res => console.log(res.data))
            .catch(error => {
                console.log(error.response)
            });
        Swal.fire(
            'Good job!',
            'You added a new course!',
            'success'
        );


        this.setState({
        })
    }

    render() {
       // console.log(this.props.user);
        console.log(this.props.user.user._id);
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
                                <form name="form" onSubmit={this.onSubmit}>
                                    <div className="input-group input-group--focus mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text bg-white ti-comment"/>
                                        </div>
                                        <input name="title" type="text" className="form-control border-left-0 pl-0"
                                               placeholder="Name"
                                               value={this.state.course.title}
                                               onChange={this.onChange}
                                        />
                                    </div>
                                    <div className="input-group input-group--focus mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text bg-white ti-text"/>
                                        </div>
                                        <input name="description" type="text"
                                               className="form-control border-left-0 pl-0" placeholder="Description"
                                               value={this.state.course.description}
                                               onChange={this.onChange}
                                        />
                                    </div>
                                    <div className="input-group input-group--focus mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text bg-white ti-calendar"/>
                                        </div>
                                        <input name="startDate"
                                               placeholder="Start date 2019-01-01 8:09 PM" type="text"
                                               className="form-control datetimepicker-input" id="ec-datetimepicker"
                                               data-toggle="datetimepicker" data-target="#ec-datetimepicker"
                                        value={this.state.course.startDate}
                                        onChange={this.onChange}/>
                                    </div>
                                    <div className="input-group input-group--focus mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text bg-white ti-key"/>
                                        </div>
                                        <input name="objectives" type="text"
                                               className="form-control border-left-0 pl-0" placeholder="Objectives"
                                               value={this.state.course.objectives}
                                               onChange={this.onChange}
                                        />
                                    </div>
                                    <div className="input-group input-group--focus mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text bg-white ti-layers"/>
                                        </div>
                                        <input name="category" type="text"
                                               className="form-control border-left-0 pl-0" placeholder="Category"
                                               value={this.state.course.category}
                                               onChange={this.onChange}
                                        />
                                    </div>
                                    <div className="input-group input-group--focus mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text bg-white ti-timer"/>
                                        </div>
                                        <input name="period" type="number"
                                               className="form-control border-left-0 pl-0" placeholder="Hours per day"
                                               value={this.state.course.period}
                                               onChange={this.onChange}
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
