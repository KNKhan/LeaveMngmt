import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Logo from './Prodapt-logo.png';

class Navbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = { addClass: false }
        this.cookies = new Cookies();
        this.state = {
            userType: 'employee'
        };
    }
    // constructor(props) {
    //     super(props);
    //     this.state = {addClass: false}
    // }

    componentDidMount() {
        if (this.cookies.get('userType') === 'manager')
            this.setState({ userType: this.cookies.get('userType') });
    }

    logoutClicked = () => {
        this.cookies.remove('userType');
        this.cookies.remove('userName');
        this.cookies.remove('userPassword');
    }
    toggle() {
        this.setState({ addClass: !this.state.addClass });
    }

    render() {
        let boxClass = ["side-nav-mobile"];
        if (this.state.addClass) {
            boxClass.push('active');
        }
        return (
            <nav>
                <ul>
                    <li className="pt-0">
                        <div className="logo">
                            <img src={Logo} />
                            <img className="user-img-mobile" src={`http://erp.prodapt.com/extui/document/ei/${this.cookies.get('empCode')}.jpg`} />
                                <span className="hamburger-icon" onClick={this.toggle.bind(this)}></span>
                             
                        </div>
                        <div className="user-details">
                            <img className="user-img" src={`http://erp.prodapt.com/extui/document/ei/${this.cookies.get('empCode')}.jpg`} />
                            <div className="user-name">{this.cookies.get('userFullName')}</div>
                            <div className="user-emp-id">{this.cookies.get('empCode')}</div>
                        </div>
                    </li>
                    <div className={boxClass.join(' ')} >{this.state.addClass ? "" : ""}
                        <li>
                            <h3 className="mobile-header-fixed">Leave Management <span className="close-icon" onClick={this.toggle.bind(this)}>X</span></h3>
                            <ul>
                                <li><NavLink activeClassName="active" exact={true} to="/">Summary</NavLink></li>
                                <li><NavLink activeClassName="active" to="/manage-leaves">Manage Leaves</NavLink></li>
                                {this.state.userType === 'manager' ? <li><NavLink activeClassName="active" to="/approve-leaves">Approve Leaves</NavLink></li> : ""}
                                {this.state.userType === 'manager' ? <li><NavLink activeClassName="active" to="/team-availability">Team Availability</NavLink></li> : ""}
                                {this.state.userType === 'manager' ? <li><NavLink activeClassName="active" to="/settings">Settings</NavLink></li> : ""}
                            </ul>
                        </li>
                        <li>
                            <h3 className="mt-0">Timesheet Management</h3>
                            <ul>
                                <li><NavLink activeClassName="active" to="/manage-timesheets">Manage Timesheet</NavLink></li>
                            </ul>
                        </li>
                        <li>
                            <h3>Profile</h3>
                            <ul>
                                <li><NavLink activeClassName="active" to="/login" onClick={this.logoutClicked}>Logout</NavLink></li>
                            </ul>
                        </li>
                    </div>
                </ul>
            </nav>
        );
    }
}

export default Navbar;