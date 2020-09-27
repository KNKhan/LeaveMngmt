import React from 'react';
import axios from 'axios';
import 'font-awesome/css/font-awesome.min.css';
import Navbar from '../navbar/navbar';

class ManageLeaves extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCreateClicked: false,
            leaveTypes: [],
            leaveFrom: new Date(),
            leaveTo: new Date(),
            leaveReason: '',
            leaveType: '',
            availableLeaves: {},
            balanceUnits: 0,
            selectedLeave: {},
            appliedLeaves: []
        };
    }

    componentDidMount() {
        axios.get(`http://192.168.20.151:8080/oneprodapterp/leavebalance/3393`)
            .then(res => {
                const availableLeaves = res.data.data;
                this.setState({ availableLeaves }, () => console.log('availableLeaves', this.state.availableLeaves));
                axios.get(`http://192.168.20.151:8080/oneprodapterp/leavetype`)
                    .then(res => {
                        let leaveTypes = [];
                        res.data.data.forEach(leaveType => leaveTypes.push({ leaveTypeName: leaveType.leaveTypeLongDesc, leaveTypeCode: leaveType.compositeKey.leaveTypeCode }));
                        this.setState({ leaveTypes }, () => console.log("leavetype", this.state.leaveTypes));
                        this.handleLeaveTypeChange(undefined, leaveTypes[0].leaveTypeCode);
                    });
            });
        axios.get(`http://192.168.20.151:8080/oneprodapterp/employeeleaves/khadar.a/3393/Khadar%20Navaz%20Khan`)
            .then(res => {
                const appliedLeaves = res.data;
                this.setState({ appliedLeaves }, () =>
                    console.log("appliedLeaves", this.state.appliedLeaves)
                );
            });
    }

    componentDidUpdate() {
        console.log(this.state);
    }

    renderCreateLeaveSection = () => {
        return (
            <div className="container-fluid">
                <div className="container">
                    <div className="manageLeaves">
                        <h2>Leave Details</h2>
                        <form>
                            <div className="title-bar">
                                <label for="fname" className="manageLeaves-lable">Name:</label>
                                <input type="text" className="manageLeaves-input" />
                            </div>
                            <div className="title-bar">
                                <label for="leave-type" className="manageLeaves-lable">Leave Type :</label>
                                <select className="manageLeaves-input" onChange={this.handleLeaveTypeChange}>
                                    {this.state.leaveTypes.map((leaveType, index) => {
                                        return <option key={index} value={leaveType.leaveTypeCode}>{leaveType.leaveTypeName}</option>;
                                    })}
                                </select>
                            </div>
                            <div className="title-bar">
                                <label for="leave-type" className="manageLeaves-lable">Leave Reason :</label>
                                <input type="text" className="manageLeaves-input" placeholder="Leave Reason" value={this.state.leaveReason} onChange={this.handleLeaveReasonInput} />
                            </div>
                            <div className="title-bar">
                                <label for="fname" className="manageLeaves-lable">From Date :</label>
                                <input type="date" className="manageLeaves-input" value={this.state.leaveFrom.toISOString().split('T')[0]} onChange={this.handleLeaveFromChange} />
                            </div>
                            <div className="title-bar">
                                <label for="fname" className="manageLeaves-lable">To Date :</label>
                                <input type="date" className="manageLeaves-input" value={this.state.leaveTo.toISOString().split('T')[0]} onChange={this.handleLeaveToChange} />
                            </div>
                            <div className="title-bar">
                                <label for="fname" className="manageLeaves-lable">From Session :</label>
                                <input type="date" className="manageLeaves-input" />
                            </div>
                            <div className="title-bar">
                                <label for="fname" className="manageLeaves-lable">To Session :</label>
                                <input type="date" className="manageLeaves-input" />
                            </div>
                            <div className="title-bar">
                                <label for="fname" className="manageLeaves-lable">From Time :</label>
                                <input type="time" className="manageLeaves-input" />
                            </div>
                            <div className="title-bar">
                                <label for="fname" className="manageLeaves-lable">To Time :</label>
                                <input type="time" className="manageLeaves-input" />
                            </div>
                            <div className="title-bar">
                                <label for="fname" className="manageLeaves-lable">Applied Days :</label>
                                <input type="date" className="manageLeaves-input" />
                            </div>
                            <div className="title-bar">
                                <button className="btn btn-success" onClick={this.submitCreateRequest}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    };

    renderAppliedLeavesSection = () => {
        return (
            <div className="card">
                <h3 className="text-left">Applied Leave(s) <span className="card-plus-icon">+</span></h3>
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
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.appliedLeaves ? this.state.appliedLeaves.map((cellData, index) => (
                            <tr key={index}>
                                <td>{cellData.leaveTypeDesc ? cellData.leaveTypeDesc : "-"}</td>
                                <td>{cellData.fromDate ? cellData.fromDate : "-"}</td>
                                <td>{cellData.toDate ? cellData.toDate : "-"}</td>
                                <td>{cellData.fromSession ? cellData.fromSession : "-"}</td>
                                <td>{cellData.toSession ? cellData.toSession : "-"}</td>
                                <td>{cellData.fromTime ? cellData.fromTime : "-"}</td>
                                <td>{cellData.toTime ? cellData.toTime : "-"}</td>
                                <td>{cellData.reqLeaveUnit ? cellData.reqLeaveUnit : "-"}</td>
                                <td>
                                    <button className="btn btn-primary" onClick={(e) => this.editLeaveClicked(e, cellData)}>
                                        <i className="fa fa-pencil"></i>
                                    </button>
                                    <button className="btn btn-danger">
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        )) : ""}
                    </tbody>
                </table>
            </div>
        );
    };

    editLeaveClicked = (e, leaveDetails) => {
        let leaveType = '';
        switch (leaveDetails.leaveTypeDesc) {
            case 'Casual Leave': leaveType = 'CL'; break;
            case 'Privilege Leave': leaveType = 'PL'; break;
            case 'Sick Leave': leaveType = 'SL'; break;
            case 'Floating Holiday': leaveType = 'FH'; break;
            default: leaveType = 'LWP';
        }
        this.setState({ isCreateClicked: true, leaveType, leaveFrom: new Date(leaveDetails.fromDate), leaveTo: new Date(leaveDetails.toDate) });
    };

    handleLeaveTypeChange = (e, leaveTypeCode = '') => {
        let balanceUnits;
        let leaveType = e ? e.currentTarget.value : leaveTypeCode;
        switch (leaveType) {
            case 'CL': balanceUnits = this.state.availableLeaves.casualLeave; break;
            case 'PL': balanceUnits = this.state.availableLeaves.privilegeLeave; break;
            case 'SL': balanceUnits = this.state.availableLeaves.sickLeave; break;
            case 'FH': balanceUnits = this.state.availableLeaves.floatingHoliday; break;
            default: balanceUnits = 0;
        }
        this.setState({ leaveType, balanceUnits });
    };

    handleLeaveReasonInput = (e) => {
        this.setState({ leaveReason: e.currentTarget.value });
    };

    handleLeaveFromChange = (e) => {
        this.setState({ leaveFrom: new Date(e.currentTarget.value) });
    };

    handleLeaveToChange = (e) => {
        this.setState({ leaveTo: new Date(e.currentTarget.value) });
    };

    submitCreateRequest = () => {
        let requestBody = {
            "empName": "KHADAR NAVAZ KHAN A",
            "empCode": "3393",
            "employeeName": "KHADAR NAVAZ KHAN A",
            "reason": this.state.leaveReason,
            "leaveTypeCode": this.state.leaveType,
            "balanceUnits": this.state.balanceUnits.toFixed(2),
            "notifiedDate": new Date().toISOString().split('T')[0],
            "leaveFrom": this.state.leaveFrom.toISOString().split('T')[0],
            "leaveTo": this.state.leaveTo.toISOString().split('T')[0],
            "confTimeFrom": "",
            "confTimeTo": "",
            "fromSession": "WDAY",
            "toSession": "WDAY",
            "holidayWorkedDate": "01/01/1900"
        };
        axios.post('http://192.168.20.151:8080/oneprodapterp/createleave', requestBody)
            .then(res => console.log(res.data));
    };

    createClicked = () => {
        this.setState({ isCreateClicked: true });
    };

    render() {
        return (
            <React.Fragment>
                <Navbar />
                <div className="manageLeaves">
                    {this.state.isCreateClicked ? this.renderCreateLeaveSection() : ""}
                    {this.renderAppliedLeavesSection()}
                    <button className="btn btn-primary" onClick={this.createClicked}>Create</button>
                </div>
            </React.Fragment>
        );
    }
}

export default ManageLeaves;