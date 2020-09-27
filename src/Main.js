import React from "react";
import "./Main.css";
import axios from "axios";
import { PieChart } from "react-minimal-pie-chart";
import Summary from "./leave/summary";
import Footer from "./footer/Footer";
import { Link } from 'react-router-dom';
import Breadcrumb from "./breadcrumb/Breadcrumb";

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <nav>
          <ul>
            <li>
              <h3>Leave Management</h3>
              <ul>
                {/* <li className="active">Summary</li> */}
                <li className="active"><Link to="/">Summary</Link></li>
                <li><Link to="/manage-leaves">Create Leaves</Link></li>
                <li><Link to="/approve-leaves">Approve Leaves</Link></li>
                <li><Link to="/settings">Settings</Link></li>
              </ul>
            </li>
            <li>
              <h3>Timesheet Management</h3>
              <ul>
                <li className="active"><Link to="/manage-timesheets">Manage Timesheet</Link></li>
              </ul>
            </li>
          </ul>
        </nav>
        <div className="container-fluid">
          <div className="container">
            <Breadcrumb />
            <div className="Employee-details title-bar">Employee-details</div>
            <br />
            <Summary />
           
          </div>
         
        </div>
        <Footer />
      </div>
    );
  }
}
export default Main;
