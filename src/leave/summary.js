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
    axios.get(`http://192.168.20.151:8080/oneprodapterp/leavebalance/2269`)
      .then(res => {
        const availableLeaves = res.data.data;
        this.setState({ availableLeaves }, () => console.log('availableLeaves', this.state.availableLeaves));
      });

    axios.get(`http://192.168.20.151:8080/oneprodapterp/employeeleaves/revathi.g/2269/Revathi%20G`)
      .then(res => {
        const appliedList = res.data;
        this.setState({ appliedList }, () =>
          console.log("appliedList", this.state.appliedList)
        );
      });

    axios.get(`http://192.168.20.151:8080/oneprodapterp/leavetype`)
      .then(res => {
        const leavetype = res.data;
        this.setState({ leavetype }, () =>
          console.log("leavetype", this.state.leavetype)
        );
      });
  }

  render() {
    return (
      <div>
        <div className="card-row text-center">
          <div className="card">
            <div className="caption bg-blue01">P</div>
            <h3>Privilege Leave</h3>
            <p style={{ color: this.state.availableLeaves.privilegeLeave < 5 ? 'red' : this.state.availableLeaves.privilegeLeave >= 10 ? 'green' : 'orange' }}>
              {this.state.availableLeaves
                ? this.state.availableLeaves.privilegeLeave
                : ""}
            </p>
          </div>
          <div className="card">
            <div className="caption bg-yellow01">C</div>
            <h3>Casual Leave</h3>
            <p style={{ color: this.state.availableLeaves.casualLeave < 5 ? 'red' : this.state.availableLeaves.casualLeave >= 10 ? 'green' : 'orange' }}>
              {this.state.availableLeaves
                ? this.state.availableLeaves.casualLeave
                : ""}
            </p>
          </div>
          <div className="card">
            <div className="caption bg-blue02">F</div>
            <h3>Floating Holiday</h3>
            <p style={{ color: this.state.availableLeaves.floatingHoliday < 5 ? 'red' : this.state.availableLeaves.floatingHoliday >= 10 ? 'green' : 'orange' }}>
              {this.state.availableLeaves
                ? this.state.availableLeaves.floatingHoliday
                : ""}
            </p>
          </div>
          <div className="card">
            <div className="caption bg-red01">S</div>
            <h3>Sick Leave</h3>
            <p style={{ color: this.state.availableLeaves.sickLeave < 5 ? 'red' : this.state.availableLeaves.sickLeave >= 10 ? 'green' : 'orange' }}>
              {this.state.availableLeaves
                ? this.state.availableLeaves.sickLeave
                : ""}
            </p>
          </div>
        </div>
        <br />

        <div className="card-row">
          <div className="card card-table-body">
            <h3 className="text-left">Applied Leave(s) <span className="card-plus-icon">+</span></h3>
            <table className="text-center card-table-section">
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
                      <td>{cellData.toSession ? cellData.toSession : "-"}</td>
                      <td>{cellData.fromTime ? cellData.fromTime : "-"}</td>
                      <td>{cellData.toTime ? cellData.toTime : "-"}</td>
                      <td>
                        {cellData.reqLeaveUnit ? cellData.reqLeaveUnit : "-"}
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
    );
  }
}
export default LeaveSummary;
