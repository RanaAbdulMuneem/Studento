import { Link, Navigate } from "react-router-dom";
import { Component } from "react";
import ForgetPassword from "../utils/ForgetPassword";


class NewLogIn extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: "",
            password: "",
            errors: {email: '', password: ''},
        }

        this.handleChangeEmail = this.handleChangeEmail.bind(this)
        this.handleChangePassword = this.handleChangePassword.bind(this)
        this.validateEmail = this.validateEmail.bind(this)
        this.validatePassword = this.validatePassword.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChangeEmail(event) {
        this.setState({
            email: event.target.value
        })
    }
    handleChangePassword(event) {
        this.setState({
            password: event.target.value
        })
    }
    handleSubmit(event) {
        event.preventDefault()
        let valid = true
        valid = this.validateEmail() && valid
        valid = this.validatePassword() && valid
        if (valid){
            console.log("Validated")
        }
        else {
            console.log("Not valid")
        }
    }
    validateEmail() {
        let updated_errors = this.state.errors
        if (!this.state.email.trim()){
            updated_errors.email = 'Email is required'
            this.setState({errors: updated_errors})
            return false
        }
        else if (!/\S+@\S+\.\S+/.test(this.state.email)){
            updated_errors.email = 'Invalid email. Missing @ or .com'
            this.setState({errors: updated_errors})
            return false
        }
        updated_errors.email = ''
            this.setState({errors: updated_errors})
        return true
        
    }
    validatePassword() {
        let updated_errors = this.state.errors
        if (!this.state.password.trim()){
            updated_errors.password = 'Password is required'
            this.setState({errors: updated_errors})
            return false
        }
        updated_errors.password = ''
        this.setState({errors: updated_errors})
        return true
    }

    render () {
        return (
            <div
            class="container p-5 "
            style={{
                background: `url(${this.props.background}) no-repeat center center / cover`,
                borderRadius: "25px",
                width: "75vw"
            }}
            >
                
                <div class="row justify-content-center">
                    <div class="col-lg-4 col-md-10 order-2 me-2">
                        <div class="row mb-5">
                            <p class="h1 fw-bold text-center">{this.props.header}</p>
                        </div>
                        <div class="row mb-3">
                        <form onSubmit={this.handleSubmit}>
                        <label for="login_email"><strong>Email</strong></label>
                        <input
                        type="email"
                        id="login_email"
                        className="form-control border border-secondary"
                        placeholder="name@mail.com"
                        name="login_email"
                        value={this.state.email}
                        onChange={this.handleChangeEmail}
                        />
                        {
                            this.state.errors.email ? (
                                <p class="text-danger">{this.state.errors.email}</p>
                            ) : (
                                <div class="mb-3"></div>
                            )
                        }

                        <label for="login_password"><strong>Password</strong></label>
                        <input
                        type="password"
                        id="login_password"
                        className="form-control border border-secondary"
                        placeholder="Minimum 8 chars"
                        name="login_password"
                        value={this.state.password}
                        onChange={this.handleChangePassword}
                        />
                        {
                            this.state.errors.password ? (
                                <p class="text-danger">{this.state.errors.password}</p>
                            ) : (
                                <div class="mb-3"></div>
                            )
                        }

                        <button
                        class="btn btn-primary text-center w-100"
                        type="submit"
                        >
                            Log Me In!
                        </button>
                        </form>
                        </div>
                        <div class="row justify-content-center mb-2">
                            <div class="col-auto">
                                <ForgetPassword />
                            </div>  
                        </div>
                        <div class="row justify-content-center mb-2">
                            <div class="col"><hr /></div>
                            <div class="col-auto">OR</div>
                            <div class="col"><hr /></div>
                        </div>
                        <div class="row mb-3">
                            <a
                            href="https://accounts.google.com"
                            target="_blank"
                            class="btn btn-light border-secondary w-100"
                            >
                            Get started with Google
                            </a>
                        </div>
                        <div class="row mb-1">
                            <a 
                            href="https://facebook.com"
                            target="_blank" 
                            class="btn btn-light border-secondary w-100"
                            >
                            Login with Facebook
                            </a>
                        </div>
                        <div class="row">
                            <p
                            className="text-center"
                            style={{ fontSize: "12px" }}
                            >
                            By continuing you accept our{" "}
                            <a href="#"> standard terms</a> and
                            <a href="#"> conditions</a> and our{" "}
                            <a href="#"> privacy policy</a>.
                            </p>
                        </div>
                        <div class="row">
                            <p className="text-center">
                              Don't have an account? <Link to={"/" + this.props.type + "signup"}>Sign Up!</Link>
                            </p>
                        </div>
                    </div>
                    <div class="col-lg col-md-12 order-1 p-0 align-self-end">
                        <div class="row mt-5 py-5">
                            <img src={this.props.image} class="img-fluid" />
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }

}

export default NewLogIn