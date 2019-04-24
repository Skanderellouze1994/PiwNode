import React, {Component} from 'react';
async function verifyExistance(tab, val) {
    return new Promise((resolve) => {

        var etat = true;
        for (let element of tab) {
            console.log('dkhal lel for')
            console.log(element.title)
            console.log(val.title)
            if (element.title ===  val.title) {
                console.log("dkhal lel if")

                var index = tab.indexOf(element);
                tab.splice(index, 1);
                etat = false
            }
        }
        if (etat === true) {
            tab.push(val)
        }
        return resolve(tab);
    });
}
class SkillsComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            skills:[]
        }
        this.isValidated = this.isValidated.bind(this);
        this.handleChange = this.handleChange.bind(this)


    }
    handleChange(event){
        verifyExistance(this.state.skills,{title:event.target.value}).then(res=>{
            console.log(res)
            this.setState({skills:res})
        })
    }
    isValidated() {
        this.setState({submitted: true});
        let isDataValid = false;
        if (this.state.skills.length>0) {
            this.props.updateStore({
                skills: this.state.skills
                //savedToCloud: false
            });
            isDataValid = true;
        } else {

        }
        console.log(isDataValid)
        return isDataValid;
    }
    render() {
        const {skills} = this.props
        const skill = skills.map((s) => {
            return (<div className="col-md-4 my-4">
                <label className="ec-checkbox check-rounded check-outline check-xl mb-3 mr-4">
                    <input type="checkbox" name="checkbox" value={s.title} onChange={this.handleChange}/>
                    <span className="ec-checkbox__control"/>
                    <span className="ec-checkbox__lebel">{s.title}</span>
                </label>
                <br/>

            </div>)
        })
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center mb-5">
                            <h4>Skills</h4>
                        </div>
                    </div>
                    {/* END row*/}
                    <div className="row">
                        {skill}

                    </div>
                </div>
            </div>
        );
    }
}

export default SkillsComponent;
