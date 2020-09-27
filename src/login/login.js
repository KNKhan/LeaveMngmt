import React from 'react';

class Login extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <label className="loginFormLabel">Username *</label>
                <input type="text" className="form-control" onChange={this.handleUserNameChange} />
                <label className="loginFormLabel">Password *</label>
                <input type="password" className="form-control" onChange={this.handlePasswordChange} />
                <button type="submit">Login</button>
            </React.Fragment>
        );
    }

    handleUserNameChange = () => {

    };

    handlePasswordChange = () => {

    };

}

export default Login;