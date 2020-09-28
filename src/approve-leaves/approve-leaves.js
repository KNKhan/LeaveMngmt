import React from 'react';
import axios from 'axios';
import Navbar from '../navbar/navbar';

class ApproveLeaves extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Approvername: "MARAMVEERA.R",
            data: [],
        };
    }

    componentDidMount() {
        axios.get(`http://192.168.20.151:8080/oneprodapterp/approvalpendingleaves/MARAMVEERA.R`)
            .then((res) => {
                const leavestoapprove = res.data;
                const count = res.length;
                this.setState({ leavestoapprove }, () =>
                    console.log("leavestoapprove", this.state.leavestoapprove)
                );
            });
        //   console.log( this.state.Approvername);
    }

    componentDidUpdate() {
        console.log(this.state);
    }

    handleApproveLeave = (e) => {
        console.log(JSON.stringify(e));

        let requestBody = {
            supUserName: "MARAMVEERA.R",
            employeeName: e.employeeName,
            empCode: e.employeeCode,
            lvApplNo: e.leaveAppNumber,
            rejReason: "",
            useraction: "approve",
        };
        axios.post('http://192.168.20.151:8080/oneprodapterp/leaveapproval', requestBody)
            .then(res => console.log(res.data));
    };

    RejectLeave = (e) => {
        console.log(JSON.stringify(e));

        let requestBody = {
            supUserName: "MARAMVEERA.R",
            employeeName: e.employeeName,
            empCode: e.employeeCode,
            lvApplNo: e.leaveAppNumber,
            rejReason: "something",
            useraction: "reject",
        };
        axios.post('http://192.168.20.151:8080/oneprodapterp/leaveapproval', requestBody)
            .then(res => console.log(res.data));
    };



    render() {
        return (
            <React.Fragment>
                <Navbar />
                <div>
                    <div className="container-fluid">
                        <div className="container">
                            <div className="card-row">
                                <div className="card">
                                    <h3 className="text-left">Leave(s) details {}</h3>
                                    <table className="text-center">
                                        <thead>
                                            <tr>
                                                <th>Employee Name</th>
                                                <th>From Date</th>
                                                <th>To Date</th>
                                                <th>From Session</th>
                                                <th>To Session</th>
                                                <th>From Time</th>
                                                <th>To Time</th>
                                                <th>Applied Day(s)</th>
                                                <th>Reason</th>
                                                <th>Leave Status</th>
                                                <th> </th>
                                                <th> </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.leavestoapprove
                                                ? this.state.leavestoapprove.map((cellData, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            {cellData.employeeName ? cellData.employeeName : "-"}
                                                        </td>
                                                        <td>{cellData.fromDate ? cellData.fromDate : "-"}</td>
                                                        <td>{cellData.toDate ? cellData.toDate : "-"}</td>
                                                        <td>
                                                            {cellData.fromSession ? cellData.fromSession : "-"}
                                                        </td>
                                                        <td>{cellData.toSession ? cellData.toSession : "-"}</td>
                                                        <td>{cellData.timeFrom ? cellData.timeFrom : "-"}</td>
                                                        <td>{cellData.timeTo ? cellData.timeTo : "-"}</td>
                                                        <td>
                                                            {cellData.reqLeaveUnits ? cellData.reqLeaveUnits : "-"}
                                                        </td>
                                                        <td>
                                                            {cellData.leaveReason ? cellData.leaveReason : "-"}
                                                        </td>
                                                        <td>
                                                            {cellData.applicationStatus
                                                                ? cellData.applicationStatus
                                                                : "-"}
                                                        </td>
                                                        <td>
                                                            <button
                                                                onClick={() => this.handleApproveLeave(cellData)}
                                                            >
                                                                Approve
                          </button>
                                                        </td>
                                                        <td>
                                                            <button onClick={() => this.RejectLeave(cellData)}>Reject</button>
                                                            {/* <button
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Are you sure to delete this record?"
                                )
                              ) {
                                this.RejectLeave(cellData);
                              }
                            }}
                          >
                            Reject
                          </button> */}
                                                        </td>
                                                    </tr>
                                                ))
                                                : ""}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default ApproveLeaves;