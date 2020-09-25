import React from "react";
import "./Main.css";
import axios from "axios";
import { PieChart } from "react-minimal-pie-chart";
import Summary from "./leave/summary";
import Footer from "./Footer";

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
                <li className="active">Summary</li>
                <li>Manage Leaves</li>
                <li>Approve</li>
                <li>Settings</li>
              </ul>
            </li>
          </ul>
        </nav>
        <Summary />
        <Footer />
      </div>
    );
  }
}
export default Main;
