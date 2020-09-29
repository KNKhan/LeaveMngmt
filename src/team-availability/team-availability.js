import axios from 'axios';
import React from 'react';
import Breadcrumb from '../breadcrumb/Breadcrumb';
import Footer from '../footer/Footer';
import Navbar from '../navbar/navbar';

class TeamAvailability extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            breadcrumb: 'Team Availability',
            teamLeaves: [],
            individualEmployeeLeaves: [],
            timeFrame: 7
        };
    }

    componentDidMount() {
        axios.get('http://192.168.20.151:8080/oneprodapterp/teamleavestatus/2627')
            .then(res => {
                this.setState({ teamLeaves: res.data.data });
                res.data.data.forEach(datum => {
                    let userName = datum.employeeDetail.firstName.toLowerCase() + '.' + datum.employeeDetail.lastName.toLowerCase();
                    let empCode = datum.employeeDetail.compositeKey.employeeCode;
                    let fullName = datum.employeeDetail.fullName;
                    axios.get('http://192.168.20.151:8080/oneprodapterp/employeeleaves/' + userName + '/' + empCode + '/' + fullName)
                        .then(res => {
                            let employeeLeaveArray = new Array(res.data.filter(empLeave => empLeave.applicationStatus === 'Authorized'));
                            let individualEmployeeLeaves = this.state.individualEmployeeLeaves;
                            individualEmployeeLeaves.push({ empCode, employeeLeaveArray });
                            this.setState({ individualEmployeeLeaves });
                            console.log(individualEmployeeLeaves);
                        });
                });
            });
    }

    componentDidUpdate() {
        console.log(this.state);
    }

    handleTimeFrameChange = (e) => {
        this.setState({ timeFrame: e.currentTarget.value });
    };

    render() {
        let teamLeavesByDate = this.state.individualEmployeeLeaves;
        let dates = [];
        let leaves = [];
        for (let i = 0; i < this.state.timeFrame; i++) {
            let date = new Date(new Date().toDateString()).getTime() + (i * 24 * 60 * 60 * 1000);
            dates.push(new Date(date));
            teamLeavesByDate.forEach(teamLeave => {
                teamLeave.employeeLeaveArray[0].forEach(employeeLeave => {
                    if (new Date(employeeLeave.fromDate).getTime() <= date && new Date(employeeLeave.toDate).getTime() >= date)
                        leaves.push({ date: new Date(date), leaveType: employeeLeave.leaveTypeDesc, empCode: teamLeave.empCode });
                });
            });
        }

        console.log('leaves', leaves);

        return (
            <div className="teamAvailability">
                <Navbar />
                <div className="container-fluid">
                    <div className="container">
                        <Breadcrumb page={this.state.breadcrumb} />
                        <div className="card">
                            <h3 className="text-left">
                                Team Availability
                                <span style={{ float: "right" }}>
                                    <select value={this.state.timeFrame} onChange={this.handleTimeFrameChange}>
                                        <option value="7">This Week</option>
                                        <option value="15">This Fortnight</option>
                                        <option value="30">This Month</option>
                                    </select>
                                </span>
                            </h3>
                            <div className="tableDiv">
                                <table className="text-center">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            {this.state.teamLeaves ? this.state.teamLeaves.map((teamLeave, i) => (
                                                <React.Fragment key={i}>
                                                    <th>{teamLeave.employeeDetail.compositeKey.employeeCode} {teamLeave.employeeDetail.fullName}</th>
                                                </React.Fragment>
                                            )) : ""}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dates ? dates.map((date, index) => (
                                            <tr key={index}>
                                                <td>{date.toLocaleDateString()}</td>
                                                {this.state.teamLeaves ? this.state.teamLeaves.map((teamLeave, i) => (
                                                    <td key={i}>{leaves.find(leave => leave.date.toLocaleDateString() === date.toLocaleDateString() && leave.empCode === teamLeave.employeeDetail.compositeKey.employeeCode)
                                                        ? <i className="fa fa-times"></i>
                                                        : <i className="fa fa-check"></i>}</td>
                                                )) : ""}
                                                {/* <td>
                                                    <button className="btn btn-primary" onClick={(e) => this.editLeaveClicked(e, cellData)}>
                                                        <i className="fa fa-pencil"></i>
                                                    </button>
                                                    <button className="btn btn-danger" onClick={(e) => this.deleteLeaveClicked(e, cellData)}>
                                                        <i className="fa fa-trash"></i>
                                                    </button>
                                                </td> */}
                                            </tr>
                                        )) : ""}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default TeamAvailability;