import React from "react";
import axios from "axios";
import { PieChart } from "react-minimal-pie-chart";

class LeaveSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      availableLeaves: {
        CasualLeave: 6.0,
        SickLeave: 5.0,
        PrivilegeLeave: 9.0,
        FloatingHoliday: 1.0
      },
      data: [
        {
          color: "#E38627",
          title: "CL",
          value: 60
        },
        {
          color: "#C13C37",
          title: "PL",
          value: 15
        },
        {
          color: "#6A2135",
          title: "SL",
          value: 20
        }
      ]
    };
  }

  componentDidMount() {
    // axios.get(`http://192.168.20.151:8080/oneprodapterp/employeeAvailableLeave/3393`)
    // .then(res => {
    //   const availableLeaves = res.data;
    //   this.setState({ availableLeaves },()=>console.log('availableLeaves', this.state.availableLeaves));
    // });

    axios
      .get(
        `http://192.168.20.151:8080/oneprodapterp/employeeLeaveList/khadar.a/3393/khadar`
      )
      .then(res => {
        const appliedList = res.data;
        this.setState({ appliedList }, () =>
          console.log("appliedList", this.state.appliedList)
        );
      });

    axios
      .get(`http://192.168.20.151:8080/oneprodapterp/leaveTypeList`)
      .then(res => {
        const leavetypeList = res.data;
        this.setState({ leavetypeList }, () =>
          console.log("leavetypeList", this.state.leavetypeList)
        );
      });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="container">
          <div className="card title-bar">
            Home/ <span className="blue">Dashboard</span>
          </div>
          <br />

          <div className="card-row text-center">
            <div className="card">
              <div className="caption bg-blue01">P</div>
              <h3>Privilege Leave</h3>
              <p>
                {this.state.availableLeaves
                  ? this.state.availableLeaves.PrivilegeLeave
                  : ""}
              </p>
            </div>
            <div className="card">
              <div className="caption bg-yellow01">C</div>
              <h3>Casual Leave</h3>
              <p>
                {this.state.availableLeaves
                  ? this.state.availableLeaves.CasualLeave
                  : ""}
              </p>
            </div>
            <div className="card">
              <div className="caption bg-blue02">F</div>
              <h3>Floating Holiday</h3>
              <p>
                {this.state.availableLeaves
                  ? this.state.availableLeaves.FloatingHoliday
                  : ""}
              </p>
            </div>
            <div className="card">
              <div className="caption bg-red01">S</div>
              <h3>Sick Leave</h3>
              <p>
                {this.state.availableLeaves
                  ? this.state.availableLeaves.SickLeave
                  : ""}
              </p>
            </div>
          </div>
          <br />

          <div className="card-row">
            <div className="card">
              <h3 className="text-left">Applied Leave(s)</h3>
              <table className="text-center">
                <thead>
                  <tr>
                    <th>Leave Type</th>
                    <th>From Date</th>
                    <th>To Date</th>
                    <th>From Session</th>
                    <th>To Session</th>
                    <th>From Time</th>
                    <th>To Time</th>
                    <th>Applied Day(s)</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.appliedList
                    ? this.state.appliedList.map((cellData, index) => (
                        <tr key={index}>
                          <td>
                            {cellData.leaveTypeDesc
                              ? cellData.leaveTypeDesc
                              : "-"}
                          </td>
                          <td>{cellData.fromDate ? cellData.fromDate : "-"}</td>
                          <td>{cellData.toDate ? cellData.toDate : "-"}</td>
                          <td>
                            {cellData.fromSession ? cellData.fromSession : "-"}
                          </td>
                          <td>
                            {cellData.toSession ? cellData.toSession : "-"}
                          </td>
                          <td>{cellData.fromTime ? cellData.fromTime : "-"}</td>
                          <td>{cellData.toTime ? cellData.toTime : "-"}</td>
                          <td>
                            {cellData.reqLeaveUnit
                              ? cellData.reqLeaveUnit
                              : "-"}
                          </td>
                        </tr>
                      ))
                    : ""}
                </tbody>
              </table>
            </div>
            <div className="card">
              <h3 className="text-left">Balance Leave(s)</h3>
              <select>
                <option>All</option>
                {this.state.leavetypeList
                  ? this.state.leavetypeList.map((item, index) => (
                      <option key={index}>{item.leaveTypeLongDesc}</option>
                    ))
                  : ""}
              </select>

              <div className="chart">
                <PieChart
                  animation
                  animationDuration={500}
                  animationEasing="ease-out"
                  center={[50, 50]}
                  data={this.state.data}
                  labelPosition={50}
                  lengthAngle={360}
                  lineWidth={35}
                  paddingAngle={0}
                  radius={40}
                  rounded
                  startAngle={0}
                  viewBoxSize={[100, 100]}
                  label={(data = this.state.data) => data.dataEntry.title}
                  labelStyle={{
                    fontSize: "7px",
                    fontColor: "000",
                    fontWeight: "normal"
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default LeaveSummary;
