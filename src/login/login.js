import React from 'react';
import Cookies from 'universal-cookie';
import { withRouter } from 'react-router-dom';
import './login.css';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.cookies = new Cookies();
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div className="login-wrap">
                    <div className="login-html">
                        <input id="tab-1" type="radio" name="tab" className="sign-in" checked onChange={this.ssoChecked} /><label htmlFor="tab-1" className="tab">Sign In</label>
                        <input id="tab-2" type="radio" name="tab" className="sign-up" /><label htmlFor="tab-2" className="tab">Sign Up</label>
                        <div className="login-form">
                            <div className="sign-in-htm">
                                <div className="group">
                                    <label htmlFor="user" className="label">Username</label>
                                    <input id="user" type="text" className="input" onChange={this.handleUserNameChange} />
                                </div>
                                <div className="group">
                                    <label htmlFor="pass" className="label">Password</label>
                                    <input id="pass" type="password" className="input" data-type="password" onChange={this.handlePasswordChange} />
                                </div>
                                <div className="group">
                                    <input id="check" type="checkbox" className="check" checked onChange={this.ssoChecked} />
                                    <label htmlFor="check"><span className="icon"></span> Keep me Signed in</label>
                                </div>
                                <div className="group">
                                    <input type="submit" className="button" value="Sign In" />
                                </div>
                                <div className="hr"></div>
                                <div className="foot-lnk">
                                    <a href="#forgot">Forgot Password?</a>
                                </div>
                            </div>
                            <div className="sign-up-htm">
                                <div className="group">
                                    <label htmlFor="user" className="label">Username</label>
                                    <input id="user" type="text" className="input" />
                                </div>
                                <div className="group">
                                    <label htmlFor="pass" className="label">Password</label>
                                    <input id="pass" type="password" className="input" data-type="password" />
                                </div>
                                <div className="group">
                                    <label htmlFor="pass" className="label">Repeat Password</label>
                                    <input id="pass" type="password" className="input" data-type="password" />
                                </div>
                                <div className="group">
                                    <label htmlFor="pass" className="label">Email Address</label>
                                    <input id="pass" type="text" className="input" />
                                </div>
                                <div className="group">
                                    <input type="submit" className="button" value="Sign Up" />
                                </div>
                                <div className="hr"></div>
                                <div className="foot-lnk">
                                    <a><label htmlFor="tab-1">Already Member?</label></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }

    handleUserNameChange = (e) => {
        this.cookies.set('userName', e.currentTarget.value);
        if (e.currentTarget.value === 'khadar.a')
            this.cookies.set('userType', 'employee');
        else if (e.currentTarget.value === 'viji.c')
            this.cookies.set('userType', 'manager');
    };

    handlePasswordChange = (e) => {
        this.cookies.set('userPassword', e.currentTarget.value);
    };

    onSubmit = () => {
        this.props.history.push('/');
    };

    ssoChecked = () => {

    };

}

export default withRouter(Login);