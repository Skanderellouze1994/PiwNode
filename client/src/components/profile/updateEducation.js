import React, {Component} from 'react';
import {MonthPicker, YearPicker} from "react-dropdown-date";

class UpdateEducation extends Component {
    constructor(props){
        super(props)
        const {e} = this.props;

        this.state = {
            etat: true,
            pos: {
                _id:e._id,
                title:e.title,
                date1: e.date1,
                date2: e.date2,
                degree: e.degree,
                description: e.description
            }

        }
        this.onClick = this.onClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    onClick(){
        const {etat} = this.state
        if(etat){
            this.props.removeEducation(this.props.i)
            this.setState({etat:false})
            //this.props.validator.fields={};
            //console.log(this.props.validator)
        }
        else{
            this.props.addEducation(this.props.e)
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
            title:pos.title,
            degree: pos.degree,
            date1: pos.date1 ,
            date2: pos.date2 ,
            description: pos.description
        }
        await this.props.updateStoree(position, this.props.i)
    }
    render() {
        const {validator} = this.props

        return (
            <div className={"modal-body py-4" + (this.state.etat===true?"":" bg-danger-0_1")}>
                <div className="col-12 mx-auto">
                    <div className="row form-group">
                        <label htmlFor="example-text-input" className="col-2 col-form-label text-right">Title</label>
                        <div className="col-10">
                            <input name="title" className="form-control" type="text"
                                   value={this.state.pos.title} id="example-text-input"
                                   onChange={this.handleChange}/>

                            {validator.message('title', this.state.pos.title, 'required')}
                        </div>
                    </div>

                    <div className="row form-group">
                        <label htmlFor="example-text-input" className="col-2 col-form-label text-right">Degree</label>
                        <div className="col-10">
                            <input name="degree" className="form-control" type="text"
                                   value={this.state.pos.degree} id="example-text-input"
                                   onChange={this.handleChange}/>

                            {validator.message('degree', this.state.pos.degree, 'required')}
                        </div>
                    </div>
                </div>
                <div className="col-12 mx-auto">
                    <div className="row form-group">
                        <label htmlFor="example-text-input"
                               className="col-2 col-form-label text-right">Start</label>
                        <div className="col-10">
                            <YearPicker

                                defaultValue={'select year'}
                                // default is 1900

                                // default is current year

                                // default is ASCENDING
                                reverse
                                // default is false
                                // default is false
                                // mandatory
                                value={this.state.pos.date1}
                                // mandatory
                                onChange={async (year) => {
                                    const {pos} = this.state
                                    await this.setState({
                                        pos: {
                                            ...pos,
                                            date1: year

                                        }
                                    });
                                    console.log(year);
                                    const position = {
                                        title:pos.title,
                                        degree: pos.degree,
                                        date1: year ,
                                        date2: pos.date2 ,
                                        description: pos.description
                                    }
                                    await this.props.updateStoree(position, this.props.i)

                                }}
                                id={'example-text-input'}
                                name={'date1'}
                                classes={'form-control'}
                                optionClasses={'option classes'}
                            />
                            {validator.message('date1', this.state.pos.date1, 'required')}
                        </div>
                    </div>

                    <div className="row form-group">
                        <label htmlFor="example-search-input"
                               className="col-2 col-form-label text-right">End</label>
                        <div className="col-10">
                            <YearPicker

                                defaultValue={'select year'}
                                // default is 1900

                                // default is current year
                                start={this.state.pos.date1}
                                // default is ASCENDING
                                reverse
                                // default is false
                                // default is false
                                // mandatory
                                value={this.state.pos.date2}
                                // mandatory
                                onChange={async (year) => {
                                    const {pos} = this.state
                                    await this.setState({
                                        pos: {
                                            ...pos,
                                            date2: year

                                        }
                                    });
                                    console.log(year);
                                    const position = {
                                        title:pos.title,
                                        degree: pos.degree,
                                        date1: pos.date1 ,
                                        date2: year ,
                                        description: pos.description
                                    }
                                    await this.props.updateStoree(position, this.props.i)

                                }}
                                id={'example-text-input'}
                                name={'year'}
                                classes={'form-control'}
                                optionClasses={'option classes'}
                            />
                            {validator.message('date2', this.state.pos.date2, 'required')}
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

export default UpdateEducation;
