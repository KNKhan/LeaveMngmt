import React from "react";
import "./Main.css";
import axios from "axios";
import { PieChart } from "react-minimal-pie-chart";
import Summary from "./leave/summary";
import Footer from "./footer/Footer";
import Breadcrumb from "./breadcrumb/Breadcrumb";
import Cookies from "universal-cookie";
import Navbar from "./navbar/navbar";

class Main extends React.Component {

  render() {
    return (
      <div>
        <Navbar />
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
