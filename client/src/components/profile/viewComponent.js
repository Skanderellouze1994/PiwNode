import React, {Component} from 'react';

class ViewComponent extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const state = this.props.getStore()
        const experience = state.positions.map(p => {
            return (<li className="ec-timeline-portlet__item mb-4">
                <small>{p.date1}</small>
                <h6 className="mb-0">{p.title}</h6>
                <p className="mb-2">{p.companyName}</p>
                <p>
                    {p.description}  </p>
            </li>)
        })
        const education = state.educations.map(p => {
            return (<li className="ec-timeline-portlet__item mb-4">
                <small>{p.date1}</small>
                <h6 className="mb-0">{p.title}</h6>
                <p className="mb-2">{p.degree}</p>
                <p>
                    {p.description}  </p>
            </li>)
        })
        const skill = state.skills.map(s => {
            return (<div className="col-3">
                <span className="badge badge-info">{s.title}</span>
            </div>)
        })
        return (
            <div>

                <div className="tab-content">
                    <div className="tab-pane fade show active" id="Tabs_1-1" role="tabpanel">
                        <h4>
                            Biography
                        </h4>

                        <p>
                            {state.summary}                        </p>
                        <hr className="my-4"/>
                        <div className="border-bottom mb-4 pb-4">
                            <h4 className="mb-4">
                                Experience
                            </h4>
                            <ul className="ec-timeline-portlet list-unstyled bullet-line-list">
                                {experience}
                            </ul>
                        </div>
                        <div className="mb-4">
                            <h4 className="mb-4">
                                Education
                            </h4>
                            <ul className="ec-timeline-portlet list-unstyled bullet-line-list">
                                {education}

                            </ul>
                        </div>
                        <div className="mb-4">
                            <h4 className="mb-4">
                                Skills
                            </h4>
                            <ul className="ec-timeline-portlet list-unstyled bullet-line-list">
                                <div className="row">
                                 {skill}

                                </div>

                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default ViewComponent;
