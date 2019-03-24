import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";


class Profil extends Component {

    render() {
        const {user}=this.props;
        console.log("props"+this.props);
        return (

               <div>
                   <div className="padding-y-80 bg-cover" data-dark-overlay={6} style={{background: 'url(assets/img/breadcrumb-bg.jpg) no-repeat'}}>
                       <div className="container">
                           <h2 className="text-white">
                               My profile
                           </h2>
                           <ol className="breadcrumb breadcrumb-double-angle text-white bg-transparent p-0">
                               <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                               <li className="breadcrumb-item"> My profile</li>
                           </ol>
                       </div>
                   </div>
                   <section className="paddingTop-50 paddingBottom-120 bg-light">
                       <div className="container">
                           <div className="row">
                               <div className="col-lg-4 mt-4">
                                   <div className="card shadow-v1">
                                       <div className="card-header text-center border-bottom pt-5 mb-4">
                                           <img alt="aaa" className="rounded-circle mb-4" src="assets/img/262x230/6.jpg" width={200} height={200}   />
                                           <h4>
                                               {user.user.username}
                                           </h4>
                                           <p>
                                               Web Developer and Instructor
                                           </p>
                                           <ul className="list-inline mb-0">
                                               <li className="list-inline-item m-2">
                                                   <i className="ti-user text-primary" />
                                                   <span className="d-block">Students</span>
                                                   <span className="h6">147570</span>
                                               </li>
                                               <li className="list-inline-item m-2">
                                                   <i className="ti-book text-primary" />
                                                   <span className="d-block">Courses</span>
                                                   <span className="h6">27</span>
                                               </li>
                                               <li className="list-inline-item m-2">
                                                   <i className="ti-star text-primary" />
                                                   <span className="d-block">Reviews</span>
                                                   <span className="h6">10467</span>
                                               </li>
                                           </ul>
                                       </div>
                                       <div className="card-body border-bottom">
                                           <ul className="list-unstyled">
                                               <li className="mb-3">
                                                   <span className="d-block">Email address:</span>
                                                   <Link to="/" className="h6" href="mailto:saifullah@gmail.com">saifullah@gmail.com</Link>
                                               </li>
                                               <li className="mb-3">
                                                   <span className="d-block">Phone:</span>
                                                   <Link to="/" className="h6" href="mailto:saifullah@gmail.com">+91 654 784 547</Link>
                                               </li>
                                               <li className="mb-3">
                                                   <span className="d-block">Location:</span>
                                                   <Link to="/" className="h6" href="mailto:saifullah@gmail.com">South Street, London, UK</Link>
                                               </li>
                                           </ul>
                                       </div>
                                       <div className="card-footer">
                                           <p>
                                               Social Profile:
                                           </p>
                                           <ul className="list-inline mb-0">
                                               <li className="list-inline-item">
                                                   <Link to="/" className="btn btn-outline-facebook iconbox iconbox-sm">
                                                       <i className="ti-facebook" />
                                                   </Link>
                                               </li>
                                               <li className="list-inline-item">
                                                   <Link to="/" className="btn btn-outline-twitter iconbox iconbox-sm">
                                                       <i className="ti-twitter" />
                                                   </Link>
                                               </li>
                                               <li className="list-inline-item">
                                                   <Link to="/" className="btn btn-outline-google-plus iconbox iconbox-sm">
                                                       <i className="ti-google" />
                                                   </Link>
                                               </li>
                                               <li className="list-inline-item">
                                                   <Link to="/" className="btn btn-outline-linkedin iconbox iconbox-sm">
                                                       <i className="ti-linkedin" />
                                                   </Link>
                                               </li>
                                           </ul>
                                       </div>
                                   </div>
                               </div> {/* END col-md-4 */}
                               <div className="col-lg-8 mt-4">
                                   <div className="card shadow-v1 padding-30">
                                       <ul className="nav tab-line tab-line border-bottom mb-4" role="tablist">
                                           <li className="nav-item">
                                               <Link to="/" className="nav-link active" data-toggle="tab" href="#Tabs_1-1" role="tab" aria-selected="true">
                                                   About
                                               </Link>
                                           </li>
                                           <li className="nav-item">
                                               <Link to="/" className="nav-link" data-toggle="tab" href="#Tabs_1-2" role="tab" aria-selected="true">
                                                   Courses
                                               </Link>
                                           </li>
                                           <li className="nav-item">
                                               <Link to="/" className="nav-link" data-toggle="tab" href="#Tabs_1-3" role="tab" aria-selected="true">
                                                   Reviews
                                               </Link>
                                           </li>
                                           <li className="nav-item">
                                               <Link to="/" className="nav-link" data-toggle="tab" href="#Tabs_1-4" role="tab" aria-selected="true">
                                                   Message
                                               </Link>
                                           </li>
                                           <li className="nav-item">
                                               <Link to="/" className="nav-link" data-toggle="tab"  role="tab" aria-selected="true">
                                                   Settings
                                               </Link>
                                           </li>
                                       </ul>
                                       <div className="tab-content">
                                           <div className="tab-pane fade show active" id="Tabs_1-1" role="tabpanel">
                                               <h4>
                                                   Biography
                                               </h4>
                                               <p>
                                                   Investig ationes demons travge vunt lectores legee lrus quodk legunt saepius was
                                                   claritas kesty conctetur kedadip sicing. Dummy text of the printing and typesetting
                                                   industry. It was popularised in the 1960s with the release of Letraset sheets contain luing lorem Ipsum passages, and more recently with desktop publishing.
                                               </p>
                                               <p>
                                                   Investig ationes demons travge vunt lectores legee lrus quodk legunt saepius claritas est conctetur adip sicing. Dummy text of the printing was and typesetting industry. Lorem Ipsum has been the industry standad dummy text ever since the 1500s.
                                               </p>
                                               <hr className="my-4" />
                                               <div className="border-bottom mb-4 pb-4">
                                                   <h4 className="mb-4">
                                                       Experience
                                                   </h4>
                                                   <ul className="ec-timeline-portlet list-unstyled bullet-line-list">
                                                       <li className="ec-timeline-portlet__item mb-4">
                                                           <small>2000-2004</small>
                                                           <h6 className="mb-0">Full Stack Developer</h6>
                                                           <p className="mb-2">Apple Inc.</p>
                                                           <p>
                                                               Investig ationes demons travge vunt lectores legee lrus quodk legunt saepius was claritas kesty conctetur they kedadip lectores legee sicing. legee lrus quodk legunt.
                                                           </p>
                                                       </li>
                                                       <li className="ec-timeline-portlet__item">
                                                           <small>2004-2018</small>
                                                           <h6 className="mb-0">Project Manager</h6>
                                                           <p className="mb-2">Google</p>
                                                           <p>
                                                               Investig ationes demons travge vunt lectores legee lrus quodk legunt saepius was claritas kesty conctetur they kedadip lectores legee sicing. legee lrus quodk legunt.
                                                           </p>
                                                       </li>
                                                   </ul>
                                               </div>
                                               <div className="mb-4">
                                                   <h4 className="mb-4">
                                                       Education
                                                   </h4>
                                                   <ul className="ec-timeline-portlet list-unstyled bullet-line-list">
                                                       <li className="ec-timeline-portlet__item mb-4">
                                                           <small>2000-2004</small>
                                                           <h6 className="mb-0">Full Stack Developer</h6>
                                                           <p className="mb-2">Apple Inc.</p>
                                                           <p>
                                                               Investig ationes demons travge vunt lectores legee lrus quodk legunt saepius was claritas kesty conctetur they kedadip lectores legee sicing. legee lrus quodk legunt.
                                                           </p>
                                                       </li>
                                                       <li className="ec-timeline-portlet__item">
                                                           <small>2004-2018</small>
                                                           <h6 className="mb-0">Project Manager</h6>
                                                           <p className="mb-2">Google</p>
                                                           <p>
                                                               Investig ationes demons travge vunt lectores legee lrus quodk legunt saepius was claritas kesty conctetur they kedadip lectores legee sicing. legee lrus quodk legunt.
                                                           </p>
                                                       </li>
                                                   </ul>
                                               </div>
                                           </div>
                                           <div className="tab-pane fade" id="Tabs_1-2" role="tabpanel">
                                               <div className="row">
                                                   <div className="col-md-6 mt-4">
                                                       <Link to="/"> href="page-course-details.html" className="card text-gray overflow-hidden height-100p shadow-v1 border">
                                                           <span className="ribbon-badge font-size-sm bg-success text-white">Best selling</span>
                                                           <img alt="aaa" className="card-img-top" src="assets/img/360x220/1.jpg"  />
                                                           <div className="card-body">
                                                               <h4 className="h5">
                                                                   The Web Developer Bootcamp
                                                               </h4>
                                                               <p className="my-3">
                                                                   <i className="ti-user mr-2" />
                                                                   Andrew Mead
                                                               </p>
                                                               <p className="mb-0">
                                                                   <i className="fas fa-star text-warning" />
                                                                   <i className="fas fa-star text-warning" />
                                                                   <i className="fas fa-star text-warning" />
                                                                   <i className="fas fa-star text-warning" />
                                                                   <i className="fas fa-star text-warning" />
                                                                   <span className="text-dark">5</span>
                                                                   <span>(4578)</span>
                                                               </p>
                                                           </div>
                                                           <div className="card-footer media align-items-center justify-content-between">
                                                               <ul className="list-unstyled mb-0">
                                                                   <li className="mb-1">
                                                                       <i className="ti-headphone small mr-2" />
                                                                       46 lectures
                                                                   </li>
                                                                   <li className="mb-1">
                                                                       <i className="ti-time small mr-2" />
                                                                       27.5 hours
                                                                   </li>
                                                               </ul>
                                                               <h4 className="h5">
                                                                   <span className="text-primary">$180</span>
                                                               </h4>
                                                           </div>
                                                       </Link>
                                                   </div>
                                                   <div className="col-md-6 mt-4">
                                                       <Link to="/"> href="page-course-details.html" className="card text-gray overflow-hidden height-100p shadow-v1 border">
                                                           <img alt="aaa" className="card-img-top" src="assets/img/360x220/2.jpg"  />
                                                           <div className="card-body">
                                                               <h4 className="h5">
                                                                   C++ Essential Training
                                                               </h4>
                                                               <p className="my-3">
                                                                   <i className="ti-user mr-2" />
                                                                   Andrew Mead, John Doe
                                                               </p>
                                                               <p className="mb-0">
                                                                   <i className="fas fa-star text-warning" />
                                                                   <i className="fas fa-star text-warning" />
                                                                   <i className="fas fa-star text-warning" />
                                                                   <i className="fas fa-star text-warning" />
                                                                   <i className="fas fa-star-half" />
                                                                   <span className="text-dark">4.9</span>
                                                                   <span>(8793)</span>
                                                               </p>
                                                           </div>
                                                           <div className="card-footer media align-items-center justify-content-between">
                                                               <ul className="list-unstyled mb-0">
                                                                   <li className="mb-1">
                                                                       <i className="ti-headphone small mr-2" />
                                                                       46 lectures
                                                                   </li>
                                                                   <li className="mb-1">
                                                                       <i className="ti-time small mr-2" />
                                                                       27.5 hours
                                                                   </li>
                                                               </ul>
                                                               <h4 className="h5 text-right">
                                                                   <span className="text-primary d-block">$10</span>
                                                                   <s className="small">$129</s>
                                                               </h4>
                                                           </div>
                                                       </Link>
                                                   </div>
                                                   <div className="col-md-6 mt-4">
                                                       <Link to="/"> href="page-course-details.html" className="card text-gray overflow-hidden height-100p shadow-v1 border">
                                                           <img alt="aaa" className="card-img-top" src="assets/img/360x220/3.jpg"  />
                                                           <div className="card-body">
                                                               <h4 className="h5">
                                                                   Programming Real-World Examples
                                                               </h4>
                                                               <p className="my-3">
                                                                   <i className="ti-user mr-2" />
                                                                   Adam Kury
                                                               </p>
                                                               <p className="mb-0">
                                                                   <i className="fas fa-star text-warning" />
                                                                   <i className="fas fa-star text-warning" />
                                                                   <i className="fas fa-star text-warning" />
                                                                   <i className="fas fa-star" />
                                                                   <i className="fas fa-star" />
                                                                   <span className="text-dark">3.4</span>
                                                                   <span>(7)</span>
                                                               </p>
                                                           </div>
                                                           <div className="card-footer media align-items-center justify-content-between">
                                                               <ul className="list-unstyled mb-0">
                                                                   <li className="mb-1">
                                                                       <i className="ti-headphone small mr-2" />
                                                                       46 lectures
                                                                   </li>
                                                                   <li className="mb-1">
                                                                       <i className="ti-time small mr-2" />
                                                                       27.5 hours
                                                                   </li>
                                                               </ul>
                                                               <h4 className="h5">
                                                                   <span className="text-primary">$249</span>
                                                               </h4>
                                                           </div>
                                                       </Link>
                                                   </div>
                                                   <div className="col-md-6 mt-4">
                                                       <Link to="/"> href="page-course-details.html" className="card text-gray overflow-hidden height-100p shadow-v1 border shadow-v1">
                                                           <img alt="aaa" className="card-img-top" src="assets/img/360x220/4.jpg"  />
                                                           <div className="card-body">
                                                               <h4 className="h5">
                                                                   Java 8 Essential Training
                                                               </h4>
                                                               <p className="my-3">
                                                                   <i className="ti-user mr-2" />
                                                                   Anthony Brooks
                                                               </p>
                                                               <p className="mb-0">
                                                                   <i className="fas fa-star text-warning" />
                                                                   <i className="fas fa-star text-warning" />
                                                                   <i className="fas fa-star text-warning" />
                                                                   <i className="fas fa-star text-warning" />
                                                                   <i className="fas fa-star text-warning" />
                                                                   <span className="text-dark">5</span>
                                                                   <span>(4578)</span>
                                                               </p>
                                                           </div>
                                                           <div className="card-footer media align-items-center justify-content-between">
                                                               <ul className="list-unstyled mb-0">
                                                                   <li className="mb-1">
                                                                       <i className="ti-headphone small mr-2" />
                                                                       46 lectures
                                                                   </li>
                                                                   <li className="mb-1">
                                                                       <i className="ti-time small mr-2" />
                                                                       27.5 hours
                                                                   </li>
                                                               </ul>
                                                               <h4 className="h5">
                                                                   <span className="text-success">Free</span>
                                                               </h4>
                                                           </div>
                                                       </Link>
                                                   </div>
                                                   <div className="col-12 text-center mt-5">
                                                       <Link to="/" className="btn btn-icon btn-outline-primary">
                                                           <i className="ti-reload mr-2" />
                                                           Load More
                                                       </Link>
                                                   </div>
                                               </div> {/* END row*/}
                                           </div> {/* END tab-pane */}
                                           <div className="tab-pane fade" id="Tabs_1-3" role="tabpanel">
                                               <div className="row mx-0 py-4 border-bottom mt-4">
                                                   <div className="col-md-4 media">
                                                       <img alt="aaa" className="iconbox iconbox-xl" src="assets/img/avatar/4.jpg"  />
                                                       <div className="media-body ml-4 mb-4 mb-md-0">
                                                           <small className="text-gray">7 min ago</small>
                                                           <h6>
                                                               Anthony Forsey
                                                           </h6>
                                                       </div>
                                                   </div>
                                                   <div className="col-md-8">
                                                       <p>
                                                           <i className="fas fa-star text-warning" />
                                                           <i className="fas fa-star text-warning" />
                                                           <i className="fas fa-star text-warning" />
                                                           <i className="fas fa-star text-warning" />
                                                           <i className="fas fa-star text-warning" />
                                                       </p>
                                                       <p className="font-size-18">
                                                           Awesome course
                                                       </p>
                                                       <p>
                                                           Investig ationes demons travge vunt lectores legee lrus quodk legunt saepius was claritas kesty they conctetur they kedadip lectores legee sicing.
                                                       </p>
                                                   </div>
                                               </div> {/* END d-flex*/}
                                               <div className="row mx-0 py-4 border-bottom mt-4">
                                                   <div className="col-md-4 media">
                                                       <img alt="aaa" className="iconbox iconbox-xl" src="assets/img/avatar/5.jpg"  />
                                                       <div className="media-body ml-4 mb-4 mb-md-0">
                                                           <small className="text-gray">1 mon ago</small>
                                                           <h6>
                                                               Justin Nam
                                                           </h6>
                                                       </div>
                                                   </div>
                                                   <div className="col-md-8">
                                                       <p className="text-light">
                                                           <i className="fas fa-star text-warning" />
                                                           <i className="fas fa-star" />
                                                           <i className="fas fa-star" />
                                                           <i className="fas fa-star" />
                                                           <i className="fas fa-star" />
                                                       </p>
                                                       <p className="font-size-18">
                                                           Test review lol
                                                       </p>
                                                       <p>
                                                           Investig ationes demons travge vunt lectores legee lrus quodk legunt saepius was claritas kesty.
                                                       </p>
                                                   </div>
                                               </div> {/* END d-flex*/}
                                               <div className="row mx-0 py-4 border-bottom mt-4">
                                                   <div className="col-md-4 media">
                                                       <div className="iconbox iconbox-xl border">
                                                           MD
                                                       </div>
                                                       <div className="media-body ml-4 mb-4 mb-md-0">
                                                           <small className="text-gray">3 Mon ago</small>
                                                           <h6>
                                                               Murir Dokan
                                                           </h6>
                                                       </div>
                                                   </div>
                                                   <div className="col-md-8">
                                                       <p>
                                                           <i className="fas fa-star text-warning" />
                                                           <i className="fas fa-star text-warning" />
                                                           <i className="fas fa-star text-warning" />
                                                           <i className="fas fa-star text-warning" />
                                                           <i className="fas fa-star text-warning" />
                                                       </p>
                                                       <p className="font-size-18">
                                                           This is a title of review. the developer suffer from lot's of vitamin. what about you?
                                                       </p>
                                                       <p>
                                                           Investig ationes demons travge vunt lectores legee lrus quodk legunt saepius was claritas kesty they conctetur they kedadip lectores legee sicing.
                                                       </p>
                                                   </div>
                                               </div> {/* END d-flex*/}
                                               <div className="row mx-0 py-4 border-bottom mt-4">
                                                   <div className="col-md-4 media">
                                                       <img alt="aaa" className="iconbox iconbox-xl" src="assets/img/avatar/6.jpg"  />
                                                       <div className="media-body ml-4 mb-4 mb-md-0">
                                                           <small className="text-gray">1 year ago</small>
                                                           <h6>
                                                               John Doe
                                                           </h6>
                                                       </div>
                                                   </div>
                                                   <div className="col-md-8">
                                                       <p>
                                                           <i className="fas fa-star text-warning" />
                                                           <i className="fas fa-star text-warning" />
                                                           <i className="fas fa-star text-warning" />
                                                           <i className="fas fa-star text-warning" />
                                                           <i className="fas fa-star text-warning" />
                                                       </p>
                                                       <p className="font-size-18">
                                                           Best course ever
                                                       </p>
                                                       <p>
                                                           Investig ationes demons travge vunt lectores legee lrus quodk legunt saepius was claritas kesty they conctetur they kedadip lectores legee sicing.
                                                           Investig ationes demons travge vunt lectores legee lrus quodk legunt saepius was claritas kesty they conctetur they kedadip lectores legee sicing.
                                                       </p>
                                                   </div>
                                               </div> {/* END d-flex*/}
                                               <div className="text-center mt-5">
                                                   <Link to="/" className="btn btn-primary btn-icon">
                                                       <i className="ti-reload mr-2" />
                                                       Load More
                                                   </Link>
                                               </div>
                                           </div>
                                           <div className="tab-pane fade" id="Tabs_1-4" role="tabpanel">
                                               <form action="#" method="POST" className="p-4">
                                                   <div className="row">
                                                       <div className="col-md-6 mb-4">
                                                           <input type="text" className="form-control" placeholder="Name" required />
                                                       </div>
                                                       <div className="col-md-6 mb-4">
                                                           <input type="email" className="form-control" placeholder="Email" required />
                                                       </div>
                                                       <div className="col-12 mb-4">
                                                           <textarea className="form-control" placeholder="Message" rows={5} required defaultValue={""} />
                                                       </div>
                                                       <div className="col-12 mb-4">
                                                           <button className="btn btn-primary">Send Now</button>
                                                       </div>
                                                   </div>
                                               </form>
                                           </div>
                                           <div className="tab-pane fade" id="Tabs_1-5" role="tabpanel">
                                               <div className="border-bottom mb-4 pb-4">
                                                   <h4>
                                                       Upload Avatar
                                                   </h4>
                                                   <div className="media align-items-end mt-4">
                                                       <div className="position-relative">
                                                           <input type="file" className="opacity-0 position-absolute as-parent" />
                                                           <img alt="aaa" src="assets/img/placeholder-1.jpg"  />
                                                       </div>
                                                       <div className="media-body ml-4 mb-4 mb-md-0">
                                                           <p>
                                                               JPG or PNG 200x200 px
                                                           </p>
                                                           <Link to="/" />
                                                           <button className="btn btn-outline-primary">
                                                               <input type="file" className="opacity-0 position-absolute" />
                                                               Upload
                                                           </button>
                                                       </div>
                                                   </div>
                                               </div>
                                               <div className="border-bottom mb-4 pb-4">
                                                   <h4 className="mb-4">
                                                       Manage your Account
                                                   </h4>
                                                   <div className="form-group row">
                                                       <label className="col-md-3 col-form-label text-dark">Full Name</label>
                                                       <div className="col-md-9">
                                                           <input type="text" className="form-control" defaultValue="John Doe" />
                                                       </div>
                                                   </div>
                                                   <div className="form-group row">
                                                       <label className="col-md-3 col-form-label text-dark">Position</label>
                                                       <div className="col-md-9">
                                                           <input type="text" className="form-control" defaultValue="Web Developer and Instructor" />
                                                       </div>
                                                   </div>
                                                   <div className="form-group row">
                                                       <label className="col-md-3 col-form-label text-dark">Email</label>
                                                       <div className="col-md-9">
                                                           <input type="email" className="form-control" defaultValue="support@echotheme.com" />
                                                       </div>
                                                   </div>
                                                   <div className="form-group row">
                                                       <label className="col-md-3 col-form-label text-dark">Phone</label>
                                                       <div className="col-md-9">
                                                           <input type="tel" className="form-control" defaultValue="+91 654 784 547" />
                                                       </div>
                                                   </div>
                                                   <div className="form-group row">
                                                       <label className="col-md-3 col-form-label text-dark">Location</label>
                                                       <div className="col-md-9">
                                                           <input type="tel" className="form-control" defaultValue="South Street, London, UK" />
                                                       </div>
                                                   </div>
                                               </div>
                                               <div className="border-bottom mb-4 pb-4">
                                                   <h4 className="mb-4">
                                                       Security Settings
                                                   </h4>
                                                   <div className="form-group row">
                                                       <label className="col-md-3 col-form-label text-dark">Current Password</label>
                                                       <div className="col-md-9">
                                                           <input type="password" className="form-control" defaultValue={123456} />
                                                       </div>
                                                   </div>
                                                   <div className="form-group row">
                                                       <label className="col-md-3 col-form-label text-dark">New Password</label>
                                                       <div className="col-md-9">
                                                           <input type="password" className="form-control" placeholder={12345678} />
                                                       </div>
                                                   </div>
                                                   <div className="form-group row">
                                                       <label className="col-md-3 col-form-label text-dark">Confirm Password</label>
                                                       <div className="col-md-9">
                                                           <input type="password" className="form-control" placeholder={12345678} />
                                                       </div>
                                                   </div>
                                               </div>
                                               <div className="border-bottom mb-4 pb-4">
                                                   <h4 className="mb-4">
                                                       Social Account
                                                   </h4>
                                                   <div className="form-group row">
                                                       <label className="col-md-3 col-form-label text-dark">Facebook</label>
                                                       <div className="col-md-9">
                                                           <input type="text" className="form-control" defaultValue="https://fb.com/jaman57" />
                                                       </div>
                                                   </div>
                                                   <div className="form-group row">
                                                       <label className="col-md-3 col-form-label text-dark">Twitter</label>
                                                       <div className="col-md-9">
                                                           <input type="text" className="form-control" defaultValue="https://twitter.com/jaman57" />
                                                       </div>
                                                   </div>
                                                   <div className="form-group row">
                                                       <label className="col-md-3 col-form-label text-dark">Linkdin</label>
                                                       <div className="col-md-9">
                                                           <input type="text" className="form-control" defaultValue="https://linkdin.com/jaman57" />
                                                       </div>
                                                   </div>
                                                   <div className="form-group row">
                                                       <label className="col-md-3 col-form-label text-dark">Google</label>
                                                       <div className="col-md-9">
                                                           <input type="text" className="form-control" defaultValue="https://google.com/jaman57" />
                                                       </div>
                                                   </div>
                                               </div>
                                               <div className="border-bottom mb-4 pb-4">
                                                   <h4 className="mb-4">
                                                       About You
                                                   </h4>
                                                   <textarea rows={6} className="form-control" defaultValue={"Dummy text of the printing and typesetting industry. It was popular ised in the kest with the release of Letraset sheets contain was luing lorem kepsum passages, and more recently with desktop publishing software.\n                   "} />
                                               </div>
                                               <div className="border-bottom mb-4 pb-4">
                                                   <h4 className="mb-4">
                                                       Account Type
                                                   </h4>
                                                   <p>
                                                       <span className="badge badge-danger">Free</span>
                                                   </p>
                                               </div>
                                               <div className="my-5">
                                                   <button className="btn btn-success m-2">Update Profile</button>
                                                   <button className="btn btn-danger m-2">Cancel</button>
                                               </div>
                                           </div> {/* END tab-pane */}
                                       </div> {/* END tab-content*/}
                                   </div> {/* END card*/}
                               </div> {/* END col-md-8 */}
                           </div> {/*END row*/}
                       </div> {/*END container*/}
                   </section>
               </div>

        )
    }

}
function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(Profil);
export { connectedHomePage as Profil };