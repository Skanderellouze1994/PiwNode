import React, {Component} from 'react';

export default class HomeStudent extends Component {
    render() {
        return (
            <section className="height-90vh py-5 flex-center jarallax" data-dark-overlay="6">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9 mx-auto text-white text-center">
                            <h2 className="display-md-4 font-weight-bold text-primary wow slideInUp">
                                Harvard University
                            </h2>
                            <h1 className="display-md-3 font-weight-bold text-white wow slideInUp">
                                Online Learning
                            </h1>
                            <p className="lead wow slideInUp">
                                This modern and inviting academic template is perfectly suited for school, colleges,
                                university, on-line course, and other educational institutions.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}