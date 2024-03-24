import React from 'react'
import './AuthPage.css';
import {authentication, findUserByEmail, updateUserPassword} from "../request/auth";
import {AuthenticationRequest} from "../domain/AuthenticationRequest";
import PropTypes from "prop-types";

export class AuthPage extends React.Component {

    static propTypes = {
        onLogin: PropTypes.func.isRequired,
        onLogout: PropTypes.func.isRequired,
        logged: PropTypes.bool.isRequired
    }

    static defaultProps = {
        onLogin: () => {
        },
        onLogout: () => {
        }
    }

    state = {
        email: "",
        password: "",
        firstLogin: false,
        changePassword: "",
        confirmChangePassword: "",
        showPassword: false,
        failedToLogin: false,
        isValidPassword: true,
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }

    handleChangePassword(event) {
        this.setState({changePassword: event.target.value});
    }

    handleConfirmChangePassword(event) {
        this.setState({confirmChangePassword: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }


    render() {
        return (
            <div className="abstract-table-container">
                {this.state.firstLogin ? this.changePasswordForm() : this.showForLogIn()}
            </div>
        );
    }

    login() {
        const {email, password} = this.state;
        const DATA = {email, password};
        let authenticationRequest = new AuthenticationRequest(DATA);

        findUserByEmail(DATA.email).then((data) => {
            console.log("userByEmail: " + data.body.updatedAt);
            if (data.body.updatedAt === null) {
                console.log("First login");
                this.setState({firstLogin: true})
            } else {
                authentication(authenticationRequest.requestObject).then((data) => {
                    localStorage.setItem('token', data.body.token);
                    this.props.onLogin();
                    console.log("Logged in");
                    this.setState({failedToLogin: false});
                }).catch((error) => {
                    console.log(error);
                    this.setState({failedToLogin: true});
                });
            }
        }).catch((error) => {
            console.log(error);
            this.setState({failedToLogin: true});
        });
    }

    logOut() {
        this.setState({firstLogin: false});
        localStorage.removeItem('token');
        this.props.onLogout();
        console.log("Logged out");
    }


    showForLogIn() {
        return (
            <div className="auth-form">
                {this.userIsLoggedIn()}
            </div>
        )
    }

    userIsLoggedIn() {
        if (this.props.logged) {
            return (
                <div className="auth-form-component">
                    <button onClick={() => this.logOut()} className="auth-button">Log out</button>
                </div>
            )
        } else {
            return (
                <>
                    <div className="auth-form-component">
                        <label>Email:</label>
                        <br/>
                        <input
                            value={this.state.email}
                            onChange={(event) => this.handleEmailChange(event)}
                            className="auth-form-input"
                        />
                    </div>
                    <div className="auth-form-component">
                        <label>Password:</label>
                        <br/>
                        <input
                            type={this.state.showPassword ? "text" : "password"}
                            value={this.state.password}
                            onChange={(event) => this.handlePasswordChange(event)}
                            className="auth-form-input"
                        />
                    </div>
                    {
                        this.state.failedToLogin ? (
                            <div className="auth-form-component">
                                <label>Email or password are incorrect</label>
                            </div>
                        ) : null
                    }
                    <div>
                        <button onClick={() => this.handleTogglePassword()} className="auth-button">
                            {this.state.showPassword ? 'Hide Password' : 'Show Password'}
                        </button>
                    </div>
                    <div className="auth-form-component">
                        <button onClick={() => this.login()} className="auth-button">Login</button>
                    </div>
                </>
            )
        }
    }

    changePasswordForm() {
        return (
            <div className="auth-form">
                <div className="auth-form-component">
                    <label>New password:</label>
                    <br/>
                    <input
                        type={this.state.showPassword ? "text" : "password"}
                        value={this.state.changePassword}
                        onChange={(event) => this.handleChangePassword(event)}
                        className="auth-form-input"
                    />
                </div>

                <div className="auth-form-component">
                    <label>Confirm new password:</label>
                    <br/>
                    <input
                        type={this.state.showPassword ? "text" : "password"}
                        value={this.state.confirmChangePassword}
                        onChange={(event) => this.handleConfirmChangePassword(event)}
                        className="auth-form-input"
                    />
                </div>
                {this.state.isValidPassword ? null :
                    (
                        <div className="auth-form-component">
                            <label>Password must contain at least 8 characters, <br/>
                                including at least one letter and one number</label>
                        </div>
                    )}
                {this.state.changePassword !== this.state.confirmChangePassword ? (
                    <div className="auth-form-component">
                        <label>Passwords do not match</label>
                    </div>
                ) : null}
                <div>
                    <button onClick={() => this.handleTogglePassword()} className="auth-button">
                        {this.state.showPassword ? 'Hide Password' : 'Show Password'}
                    </button>
                </div>
                <div className="auth-form-component">
                    <button onClick={() => this.changePasswordToNew()} className="auth-button">Change</button>
                </div>
                <div className="auth-form-component">
                    <button onClick={() => this.setState({firstLogin: false})} className="auth-button">Cancel</button>
                </div>
            </div>
        )
    }

    handleTogglePassword() {
        this.setState({showPassword: !this.state.showPassword});
    }

    changePasswordToNew() {
        this.setState({isValidPassword: this.checkPassword()}, () => {
            console.log("is valid Password: " + this.state.isValidPassword);
            if (this.state.isValidPassword) {
                updateUserPassword(this.state.confirmChangePassword, this.state.email).then(() => {
                    console.log("Password changed");
                    this.setState({firstLogin: false})
                });
            }
        });
    }


    checkPassword() {
        if (this.state.changePassword === this.state.confirmChangePassword) {
            const hasLetter = /[a-zA-Z]/.test(this.state.changePassword);
            const hasNumber = /\d/.test(this.state.changePassword);
            const isLengthValid = this.state.changePassword.length >= 8;
            console.log("hasLetter: " + hasLetter + " hasNumber: " + hasNumber + " isLengthValid: " + isLengthValid);
            console.log("test validation " + (hasLetter && hasNumber && isLengthValid));
            return (hasLetter && hasNumber && isLengthValid);
        }
    }
}