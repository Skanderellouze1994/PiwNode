import React, {Component} from 'react';

export class Signup extends Component {
    render(){
        return(
            <section class="padding-y-100 bg-light">
            <div class="container">
            <div class="row">
            <div class="col-lg-6 mx-auto">
            <div class="card shadow-v2">
            <div class="card-header border-bottom">
            <h4 class="mt-4">
            Sign Up and Start Learning!
        </h4>
        </div>
        <div class="card-body">
            <div class="row">
            <div class="col my-2">
            <button class="btn btn-block btn-facebook">
            <i class="ti-facebook mr-1"></i>
            <span>Facebook Sign in</span>
        </button>
        </div>
        <div class="col my-2">
            <button class="btn btn-block btn-google-plus">
            <i class="ti-google mr-1"></i>
            <span>Google Sign in</span>
        </button>
        </div>
        </div>
        <p class="text-center my-4">
            OR
            </p>
            <form action="#" method="POST" class="px-lg-4">
            <div class="input-group input-group--focus mb-3">
            <div class="input-group-prepend">
            <span class="input-group-text bg-white ti-user"></span>
            </div>
            <input type="text" class="form-control border-left-0 pl-0" placeholder="Full Name" />
            </div>
            <div class="input-group input-group--focus mb-3">
            <div class="input-group-prepend">
            <span class="input-group-text bg-white ti-email"></span>
            </div>
            <input type="email" class="form-control border-left-0 pl-0" placeholder="Email" />
            </div>
            <div class="input-group input-group--focus mb-3">
            <div class="input-group-prepend">
            <span class="input-group-text bg-white ti-lock"></span>
            </div>
            <input type="email" class="form-control border-left-0 pl-0" placeholder="Password" required />
        </div>
        <div class="my-4">
            <label class="ec-checkbox check-sm my-2 clearfix">
            <input type="checkbox" name="checkbox" />
            <span class="ec-checkbox__control mt-1"></span>
            <span class="ec-checkbox__lebel">
            By signing up, you agree to our
        <a href="page-terms-and-privacy-policy.html" class="text-primary">Terms of Use</a>
        and
        <a href="page-terms-and-privacy-policy.html" class="text-primary">Privacy Policy.</a>
        </span>
        </label>
        </div>
        <button class="btn btn-block btn-primary">Register Now</button>
        <p class="my-5 text-center">
            Already have an account? <a href="page-login.html" class="text-primary">Login</a>
            </p>
            </form>
            </div>
            </div>
            </div>
            </div>
            </div>
            </section>

    )
    }
}