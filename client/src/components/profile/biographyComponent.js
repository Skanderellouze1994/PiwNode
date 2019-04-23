import React, {Component} from 'react';
import SimpleReactValidator from "simple-react-validator";

class BiographyComponent extends Component {
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator(
            {element: message => <div className="alert text-danger bg-danger-0_1 px-4 py-3" role="alert">
                    {message}
                </div>}
        );
        this.state = {
            summary: "",
            submitted: false

        };
        this.isValidated = this.isValidated.bind(this);
        this.handleChange = this.handleChange.bind(this);


    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    isValidated() {
        this.setState({ submitted: true });
        let isDataValid = false;
         if (this.validator.allValid()) {
                this.props.updateStore({
                    summary: this.state.summary
                    //savedToCloud: false
                });
                isDataValid = true;
            }
         else {
             this.validator.showMessages();
             // rerender to show messages for the first time
             this.forceUpdate();
        }

        return isDataValid;
    }
    render() {
        return (

                <div className="">
                    <h4>
                        Biography
                    </h4>
                    <div className="form-group">
                        <textarea className="form-control rounded-pill" rows={5} defaultValue={""} name="summary" onChange={this.handleChange} />
                    </div>
                    {this.validator.message('summary', this.state.summary, 'required')}

                </div>
        );
    }
}


export default BiographyComponent;
