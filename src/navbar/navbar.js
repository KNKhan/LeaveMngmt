import React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

class Navbar extends React.Component {

    constructor(props) {
        super(props);
        this.cookies = new Cookies();
        this.state = {
            userType: 'employee'
        };
    }

    componentDidMount() {
        if (this.cookies.get('userType') === 'manager')
            this.setState({ userType: this.cookies.get('userType') });
    }

    logoutClicked = () => {
        this.cookies.remove('userType');
        this.cookies.remove('userName');
        this.cookies.remove('userPassword');
    };

    render() {
        return (
            <nav>
                <ul>
                    <li>
                        <h3>Leave Management</h3>
                        <ul>
                            {/* <li className="active">Summary</li> */}
                            <li className="active"><Link to="/">Summary</Link></li>
                            <li><Link to="/manage-leaves">Create Leaves</Link></li>
                            {this.state.userType === 'manager' ? <li><Link to="/approve-leaves">Approve Leaves</Link></li> : ""}
                            {this.state.userType === 'manager' ? <li><Link to="/settings">Settings</Link></li> : ""}
                        </ul>
                    </li>
                    <li>
                        <h3>Timesheet Management</h3>
                        <ul>
                            <li className="active"><Link to="/manage-timesheets">Manage Timesheet</Link></li>
                        </ul>
                    </li>
                    <li>
                        <h3>Profile</h3>
                        <ul>
                            <li className="active"><Link to="/login" onClick={this.logoutClicked}>Logout</Link></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Navbar;