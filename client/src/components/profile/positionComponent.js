import React, {Component} from 'react';
import {MonthPicker, YearPicker} from "react-dropdown-date";
import Modal from "react-responsive-modal";
import {connect} from "react-redux";
import UpdatePosition from "./updatePosition";
import SimpleReactValidator from "simple-react-validator";

class PositionComponent extends Component {
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
            positions: this.props.positions,
            //gender: '',
            // savedToCloud: false
        };

    }

    removePosition(i) {
        this.sampleStore.positions.splice(i, 1)
    }

    AddPosition(position) {
        this.sampleStore.positions.push(position)
    }

    updateStoree(update, i) {
        console.log(update)
        this.sampleStore.positions[i] = update
    }

    isValidated() {
        this.setState({submitted: true});
        let isDataValid = false;
        if (this.validator.allValid()) {
            console.log(this.sampleStore.positions)
            this.props.updateStore({
                positions: this.sampleStore.positions
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
        const {positions} = this.props
        const position = positions.map(e => {
            return (<UpdatePosition e={e} i={positions.indexOf(e)} validator={this.validator}
                                    removePosition={(i) => this.removePosition(i)}
                                    updateStoree={(u, i) => this.updateStoree(u, i)}
                                    addPosition={(position) => this.AddPosition(position)}/>)
        })
        return (
            <div>
                <div style={{width: 700}}>
                    <div className="modal-header">
                        <h5 className="modal-title">Add experience</h5>

                    </div>
                    <form name="form">

                        {position}


                        <div className="modal-footer py-4">

                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default PositionComponent
