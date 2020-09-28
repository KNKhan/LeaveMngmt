import React from "react";
import "./Main.css";
import axios from "axios";
import { PieChart } from "react-minimal-pie-chart";
import Summary from "../leave/summary";
import Footer from "../footer/Footer";
import Breadcrumb from "../breadcrumb/Breadcrumb";
import Cookies from "universal-cookie";
import Navbar from "../navbar/navbar";
import { Notifications } from "react-push-notification";

class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      breadcrumb: 'Dashboard'
    };
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="container-fluid">
          <div className="container">
            <Breadcrumb page={this.state.breadcrumb} />
            <br />
            <Summary />
          </div>
        </div>
        <Footer />
        <Notifications />
      </div>
    );
  }
}
export default Main;
