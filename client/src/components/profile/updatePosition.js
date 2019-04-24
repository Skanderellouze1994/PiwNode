import React, {Component} from 'react';
import {MonthPicker, YearPicker} from "react-dropdown-date";
import SimpleReactValidator from "simple-react-validator";

const month = ["janv.", "févr.", "mars", "avril.", 'mai', "juin", "juil.", "août", "sept.", "oct.", "nov.", ".dec"]

function monthsub(e) {
    const a = e.date1.substring(e.date1.indexOf('-') + 2, e.date1.length)
    const b = a.substring(0, a.indexOf(' ') - 1)
    return b
}

function splitdate(e) {
    var tab = e.date1.split(' ')
    return tab

}

class UpdatePosition extends Component {
    constructor(props) {
        super(props)
        const {e} = this.props

        this.state = {
            etat:true,
            pos: {
                title: e.title,
                yeardate1: splitdate(e)[1],
                monthdate1: month.indexOf(splitdate(e)[0]),
                monthdate2: month.indexOf(splitdate(e)[3]) === -1 ? 0 : month.indexOf(splitdate(e)[3]),
                yeardate2: splitdate(e)[4] === undefined ? "2019" : splitdate(e)[4],
                companyName: e.companyName,
                description: e.description
            }
        }
        this.onClick = this.onClick.bind(this)
        this.handleChange = this.handleChange.bind(this)


    }
    onClick(){
        const {etat} = this.state
        if(etat){
            this.props.removePosition(this.props.i)
            this.setState({etat:false})
            this.props.validator.fields={};
            //console.log(this.props.validator)
        }
        else{
            this.props.addPosition(this.props.e)
            this.setState({etat:true})


        }

    }

    async handleChange(event) {
        var {name, value} = event.target;
        var {pos} = this.state;
        //console.log(user);
        await this.setState({
            pos: {
                ...pos,
                [name]: value
            },

        });
        // console.log(this.state.pos)
        const position = {
            title: this.state.pos.title,
            companyName: this.state.pos.companyName,
            date1: month[this.state.pos.monthdate1] + " " + this.state.pos.yeardate1 + " - " + month[this.state.pos.monthdate2] + " " + this.state.pos.yeardate2,
            date2: (this.state.pos.date2 - this.state.pos.date1) === 0 ? (this.state.pos.yeardate2 - this.state.pos.yeardate1 + " ans") : this.state.pos.monthdate2 - this.state.pos.monthdate1 + " mois",
            description: this.state.pos.description
        }
        await this.props.updateStoree(position, this.props.i)
    }

    render() {
        const {validator} = this.props
        // console.log(validator)
        return (
            <div className={"modal-body py-4" + (this.state.etat===true?"":" bg-danger-0_1")}>
                <div className="col-12 mx-auto">
                    <div className="row form-group">
                        <label htmlFor="example-text-input"
                               className="col-2 col-form-label text-right">Title
                            Name</label>
                        <div className="col-10">
                            <input name="title" className="form-control" type="text"
                                   value={this.state.pos.title} id="example-text-input"
                                   onChange={this.handleChange}/>

                            {validator.message('title', this.state.pos.title, 'required')}
                        </div>
                    </div>
                    <div className="row form-group">
                        <label htmlFor="example-text-input"
                               className="col-2 col-form-label text-right">Company
                            Name</label>
                        <div className="col-10">
                            <input name="companyName" className="form-control" type="text"
                                   value={this.state.pos.companyName} id="example-text-input"
                                   onChange={this.handleChange}/>

                            {validator.message('companyName', this.state.pos.companyName, 'required')}
                        </div>
                    </div>

                </div>
                <div className="col-12 mx-auto">
                    <div className="row form-group">
                        <label htmlFor="example-text-input"
                               className="col-2 col-form-label text-right">Start</label>
                        <div className="col-10">
                            <div className="row col-10">
                                <MonthPicker
                                    defaultValue={'month'}
                                    // to get months as numbers

                                    // default is full name
                                    short
                                    // default is Titlecase

                                    // mandatory if end={} is given in YearPicker
                                    endYearGiven
                                    // mandatory
                                    year={this.state.pos.monthdate1}
                                    // default is false

                                    // mandatory
                                    value={this.state.pos.monthdate1}
                                    // mandatory
                                    onChange={async (monthh) => {
                                        const {pos} = this.state
                                        await this.setState({
                                            pos: {
                                                ...pos,
                                                monthdate1: parseInt(monthh)
                                            }
                                        });
                                        //console.log(pos);
                                        const position = {
                                            title: this.state.pos.title,
                                            companyName: this.state.pos.companyName,
                                            date1: month[parseInt(monthh)] + " " + this.state.pos.yeardate1 + " - " + month[this.state.pos.monthdate2] + " " + this.state.pos.yeardate2,
                                            date2: (this.state.pos.date2 - this.state.pos.date1) === 0 ? (this.state.pos.yeardate2 - this.state.pos.yeardate1 + " ans") : this.state.pos.monthdate2 - parseInt(month) + " mois",
                                            description: this.state.pos.description
                                        }
                                        await this.props.updateStoree(position, this.props.i)
                                    }}
                                    id={'example-text-input'}
                                    name={'monthdate1'}
                                    classes={'form-control col-3'}
                                    optionClasses={'option classes'}
                                />
                                {validator.message('monthdate1', this.state.pos.monthdate1, 'required')}

                                <YearPicker

                                    defaultValue={'year'}
                                    // default is 1900

                                    // default is current year

                                    // default is ASCENDING
                                    reverse
                                    // default is false
                                    // default is false
                                    // mandatory
                                    value={this.state.pos.yeardate1}
                                    // mandatory
                                    onChange={async (year) => {
                                        const {pos} = this.state
                                        await this.setState({
                                            pos: {
                                                ...pos,
                                                yeardate1: year

                                            }
                                        });
                                        //console.log(year);
                                        const position = {
                                            title: this.state.pos.title,
                                            companyName: this.state.pos.companyName,
                                            date1: month[this.state.pos.monthdate1] + " " + this.state.pos.yeardate1 + " - " + month[this.state.pos.monthdate2] + " " + this.state.pos.yeardate2,
                                            date2: (this.state.pos.date2 - this.state.pos.date1) === 0 ? (this.state.pos.yeardate2 - this.state.pos.yeardate1 + " ans") : this.state.pos.monthdate2 - this.state.pos.monthdate1 + " mois",
                                            description: this.state.pos.description
                                        }
                                        await this.props.updateStoree(position, this.props.i)
                                    }}
                                    id={'example-text-input'}
                                    name={'yeardate1'}
                                    classes={'form-control col-3'}
                                    optionClasses={'option classes'}
                                />
                                {validator.message('date1', this.state.pos.yeardate1, 'required')}
                            </div>
                        </div>
                    </div>

                    <div className="row form-group">
                        <label htmlFor="example-search-input"
                               className="col-2 col-form-label text-right">End</label>
                        <div className="col-10">
                            <div className="row col-10">
                                <MonthPicker
                                    defaultValue={'month'}
                                    // to get months as numbers

                                    // default is full name
                                    short
                                    // default is Titlecase

                                    // mandatory if end={} is given in YearPicker
                                    endYearGiven
                                    // mandatory
                                    year={this.state.pos.monthdate2}
                                    // default is false

                                    // mandatory
                                    value={this.state.pos.monthdate2}
                                    // mandatory
                                    onChange={async (monthh) => {
                                        const {pos} = this.state
                                        await this.setState({
                                            pos: {
                                                ...pos,
                                                monthdate2: monthh
                                            }
                                        });
                                        //console.log(month);
                                        const position = {
                                            title: this.state.pos.title,
                                            companyName: this.state.pos.companyName,
                                            date1: month[this.state.pos.monthdate1] + " " + this.state.pos.yeardate1 + " - " + month[this.state.pos.monthdate2] + " " + this.state.pos.yeardate2,
                                            date2: (this.state.pos.date2 - this.state.pos.date1) === 0 ? (this.state.pos.yeardate2 - this.state.pos.yeardate1 + " ans") : this.state.pos.monthdate2 - this.state.pos.monthdate1 + " mois",
                                            description: this.state.pos.description
                                        }
                                        await this.props.updateStoree(position, this.props.i)
                                    }}
                                    id={'example-text-input'}
                                    name={'monthdate1'}
                                    classes={'form-control col-3'}
                                    optionClasses={'option classes'}
                                />
                                {validator.message('monthdate2', this.state.pos.monthdate2, 'required')}

                                <YearPicker

                                    defaultValue={'year'}
                                    // default is 1900

                                    // default is current year
                                    start={this.state.pos.yeardate1}
                                    // default is ASCENDING
                                    reverse
                                    // default is false
                                    // default is false
                                    // mandatory
                                    value={this.state.pos.yeardate2}
                                    // mandatory
                                    onChange={async (year) => {
                                        const {pos} = this.state
                                        await this.setState({
                                            pos: {
                                                ...pos,
                                                yeardate2: year

                                            }
                                        });
                                        //console.log(this.state.pos);
                                        const position = {
                                            title: pos.title,
                                            companyName: this.state.pos.companyName,
                                            date1: month[this.state.pos.monthdate1] + " " + this.state.pos.yeardate1 + " - " + month[this.state.pos.monthdate2] + " " + year,
                                            date2: (this.state.pos.date2 - this.state.pos.date1) === 0 ? (year - this.state.pos.yeardate1 + " ans") : this.state.pos.monthdate2 - this.state.pos.monthdate1 + " mois",
                                            description: this.state.pos.description
                                        }
                                        await this.props.updateStoree(position, this.props.i)
                                    }}
                                    id={'example-text-input'}
                                    name={'year'}
                                    classes={'form-control col-3'}
                                    optionClasses={'option classes'}
                                />
                                {validator.message('date2', this.state.pos.yeardate2, 'required')}

                            </div>
                        </div>
                    </div>

                    <div className="row form-group">
                        <label htmlFor="example-textarea"
                               className="col-2 col-form-label text-right">Description</label>
                        <div className="col-10">
                                                <textarea className="form-control" value={this.state.pos.description}
                                                          rows={5} name="description" onChange={this.handleChange}/>
                        </div>
                    </div>
                    {this.state.etat?<button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.onClick}>Discard</button>:
                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.onClick}>Add</button>}



                </div>
            </div>
        );
    }
}

export default UpdatePosition;
