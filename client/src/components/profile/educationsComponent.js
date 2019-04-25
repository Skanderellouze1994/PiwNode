import React, {Component} from 'react';
import SimpleReactValidator from "simple-react-validator";
import UpdatePosition from "./updatePosition";
import UpdateEducation from "./updateEducation";

class EducationsComponent extends Component {
    constructor(props) {
        super(props)
        this.validator = new SimpleReactValidator(
            {
                element: message => <div className="alert text-danger bg-danger-0_1 px-4 py-3" role="alert">
                    {message}
                </div>
            }
        );

        this.isValidated = this.isValidated.bind(this);
        this.sampleStore = {
            educations: this.props.educations,
            //gender: '',
            // savedToCloud: false
        };

    }

    removeEducation(i) {
        this.sampleStore.educations.splice(i, 1)
    }

    AddEducation(education) {
        this.sampleStore.educations.push(education)
    }

    updateStoree(update, i) {
        console.log(update)
        this.sampleStore.educations[i] = update
    }

    isValidated() {
        this.setState({submitted: true});
        let isDataValid = false;
        if (this.validator.allValid()) {
            this.props.updateStore({
                educations: this.sampleStore.educations
                //savedToCloud: false
            });
            isDataValid = true;
        } else {
            this.validator.showMessages();
            // rerender to show messages for the first time
            this.forceUpdate();
        }
        console.log(isDataValid)
        return isDataValid;
    }
    render() {
        const {educations} = this.props
        const education = educations.map(e => {
            return (<UpdateEducation e={e} i={educations.indexOf(e)} validator={this.validator}
                                    removeEducation={(i) => this.removeEducation(i)}
                                    updateStoree={(u, i) => this.updateStoree(u, i)}
                                    addEducation={(education) => this.AddEducation(education)}/>)
        })
        return (
            <div>
                <div style={{width: 700}}>
                    <div className="modal-header">
                        <h5 className="modal-title">Add education</h5>

                    </div>
                    <form name="form">
                        {education}


                        <div className="modal-footer py-4">

                        </div>
                    </form>
                </div>
            </div>

        );
    }
}

export default EducationsComponent;
