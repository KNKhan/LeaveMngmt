import React from 'react';
import axios from 'axios';
import Navbar from '../navbar/navbar';
import './approve-leaves.css';
import Breadcrumb from '../breadcrumb/Breadcrumb';
import Footer from '../footer/Footer';

class ApproveLeaves extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Approvername: "MARAMVEERA.R",
            data: [],
            leaveCount: 0,
            breadcrumb: 'Approve Leaves'
        };
    }

    componentDidMount() {
        axios.get(`http://192.168.20.151:8080/oneprodapterp/approvalpendingleaves/MARAMVEERA.R`)
            .then((res) => {
                const leavestoapprove = res.data;
                let leaveCount = res.data.length;
                // const count = res.length;
                this.setState({ leavestoapprove, leaveCount }, () =>
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
            <div className="approveLeaves">
                <Navbar />
                <div className="container-fluid">
                    <div className="container">
                        <Breadcrumb page={this.state.breadcrumb} />
                        <div className="card-row">
                            <div className="card">
                                <h3 className="text-left">Leave(s) details [Count - {this.state.leaveCount}]</h3>
                                <div className="tableDiv">
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
                                                            onClick={() => {
                                                            if (
                                                                window.confirm(
                                                                "Are you sure to approve this leave?"
                                                                )
                                                            ) {
                                                                this.handleApproveLeave(cellData);
                                                            }
                                                            }}
                                                        >
                                                         <i className="fa fa-check"></i>
                                                        </button>
                                                            {/* <button onClick={() => this.handleApproveLeave(cellData)}>
                                                                <i className="fa fa-check"></i>
                                                            </button> */}
                                                        </td>
                                                        <td>
                                                            {/* <button onClick={() => this.RejectLeave(cellData)}>
                                                                <i className="fa fa-times"></i>
                                                            </button> */}
                                                            <button
                                                            onClick={() => {
                                                            if (
                                                                window.confirm(
                                                                "Are you sure to reject this leave?"
                                                                )
                                                            ) {
                                                                this.RejectLeave(cellData);
                                                            }
                                                            }}
                                                        >
                                                           <i className="fa fa-times"></i>
                                                        </button>
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
                <Footer />
            </div>
        );
    }
}

export default ApproveLeaves;