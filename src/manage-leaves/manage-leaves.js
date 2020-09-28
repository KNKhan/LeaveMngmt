import React from 'react';
import axios from 'axios';
import 'font-awesome/css/font-awesome.min.css';
import Navbar from '../navbar/navbar';
import addNotification from 'react-push-notification';
import './manage-leaves.css';
import Breadcrumb from '../breadcrumb/Breadcrumb';
import Footer from '../footer/Footer';

class ManageLeaves extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumb: 'Manage Leaves',
            isCreateClicked: false,
            isUpdateClicked: false,
            leaveTypes: [],
            leaveFrom: new Date(),
            leaveTo: new Date(),
            fromTime: '',
            toTime: '',
            leaveReason: '',
            leaveType: '',
            availableLeaves: {},
            balanceUnits: 0,
            selectedLeave: {},
            appliedLeaves: [],
            appNumber: 0,
            appStatus: '',
            employeeName: '',
            fromSession: '',
            toSession: '',
            appliedDays: 0
        };
    }

    componentDidMount() {
        axios.get(`http://192.168.20.151:8080/oneprodapterp/leavebalance/2269`)
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
        axios.get(`http://192.168.20.151:8080/oneprodapterp/approvalpendingleaves/maramveera.r`)
            .then(res => {
                const appliedLeaves = res.data.filter(appliedLeave => appliedLeave.employeeCode === '2269');
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
            <div className="card">
                <div className="createLeave form-container">
                    <h2>Leave Details</h2>
                    <form className="formpages">
                        <div className="title-bar form-group col-12 col-sm-6 col-md-6">
                            <label htmlFor="fname" className="manageLeaves-lable form-group">Name:</label>
                            <input type="text" className="manageLeaves-input form-control" value={this.state.employeeName} placeholder="Employee Name" readOnly />
                        </div>
                        <div className="title-bar">
                            <label htmlFor="leave-type" className="manageLeaves-lable">Leave Type :</label>
                            <select className="manageLeaves-input form-control" value={this.state.leaveType} onChange={this.handleLeaveTypeChange}>
                                {this.state.leaveTypes.map((leaveType, index) => {
                                    return <option key={index} value={leaveType.leaveTypeCode}>{leaveType.leaveTypeName}</option>;
                                })}
                            </select>
                        </div>
                        <div className="title-bar">
                            <label htmlFor="leave-type" className="manageLeaves-lable">Leave Reason :</label>
                            <input type="text" className="manageLeaves-input form-control" placeholder="Leave Reason" value={this.state.leaveReason} onChange={this.handleLeaveReasonInput} />
                        </div>
                        <div className="title-bar">
                            <label htmlFor="fname" className="manageLeaves-lable">From Date :</label>
                            <input type="date" className="manageLeaves-input form-control" value={this.state.leaveFrom.toISOString().split('T')[0]} onChange={this.handleLeaveFromChange} />
                        </div>
                        <div className="title-bar">
                            <label htmlFor="fname" className="manageLeaves-lable">To Date :</label>
                            <input type="date" className="manageLeaves-input form-control" value={this.state.leaveTo.toISOString().split('T')[0]} onChange={this.handleLeaveToChange} />
                        </div>
                        <div className="title-bar">
                            <label htmlFor="fname" className="manageLeaves-lable">From Session :</label>
                            <select className="manageLeaves-input form-control" value={this.state.fromSession} onChange={this.handleFromSessionChange}>
                                <option value="WDAY">Whole Day</option>
                                <option value="">Afternoon Session</option>
                                <option value="">Morning Session</option>
                            </select>
                        </div>
                        <div className="title-bar">
                            <label htmlFor="fname" className="manageLeaves-lable">To Session :</label>
                            <select className="manageLeaves-input form-control" value={this.state.toSession} onChange={this.handleToSessionChange}>
                                <option value="WDAY">Whole Day</option>
                                <option value="">Afternoon Session</option>
                                <option value="">Morning Session</option>
                            </select>
                        </div>
                        <div className="title-bar">
                            <label className="manageLeaves-lable">From Time :</label>
                            <input type="time" className="manageLeaves-input form-control" value={this.state.fromTime} onChange={this.handlefromTimeChange} />
                        </div>
                        <div className="title-bar">
                            <label className="manageLeaves-lable">To Time :</label>
                            <input type="time" className="manageLeaves-input form-control" value={this.state.toTime} onChange={this.handletoTimeChange} />
                        </div>
                        <div className="title-bar">
                            <label className="manageLeaves-lable">Applied Days :</label>
                            <input type="number" className="manageLeaves-input form-control" value={this.state.appliedDays} readOnly />
                        </div>
                        <div className="title-bar">
                            <button className="btn btn-submit-leave" onClick={this.submitCreateRequest}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    renderAppliedLeavesSection = () => {
        return (
            <div className="card">
                <h3 className="text-left">Applied Leave(s) <span className="card-plus-icon">+</span></h3>
                <div className="tableDiv">
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
                                    <td>{cellData.timeFrom ? cellData.timeFrom : "-"}</td>
                                    <td>{cellData.timeTo ? cellData.timeTo : "-"}</td>
                                    <td>{cellData.reqLeaveUnits ? cellData.reqLeaveUnits : "-"}</td>
                                    <td>
                                        <button className="btn btn-primary" onClick={(e) => this.editLeaveClicked(e, cellData)}>
                                            <i className="fa fa-pencil"></i>
                                        </button>
                                        <button className="btn btn-danger" onClick={(e) => this.deleteLeaveClicked(e, cellData)}>
                                            <i className="fa fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            )) : ""}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    editLeaveClicked = (e, leaveDetails) => {
        let leaveType = '';
        let appNumber = leaveDetails.leaveAppNumber;
        let appStatus = leaveDetails.applicationStatus;
        let leaveReason = leaveDetails.leaveReason;
        let employeeName = leaveDetails.employeeName;
        let fromSession;
        switch (leaveDetails.fromSession) {
            case 'Whole Day': fromSession = 'WDAY'; break;
            case 'Afternoon Session': fromSession = ''; break;;
            case 'Morning Session': fromSession = ''; break;
            default: fromSession = '';
        }
        let toSession;
        switch (leaveDetails.toSession) {
            case 'Whole Day': toSession = 'WDAY'; break;
            case 'Afternoon Session': toSession = ''; break;
            case 'Morning Session': toSession = ''; break;
            default: toSession = '';
        }
        let fromTime = leaveDetails.timeFrom;
        let toTime = leaveDetails.timeTo;
        let appliedDays = leaveDetails.reqLeaveUnits;
        switch (leaveDetails.leaveTypeDesc) {
            case 'Casual Leave': leaveType = 'CL'; break;
            case 'Privilege Leave': leaveType = 'PL'; break;
            case 'Sick Leave': leaveType = 'SL'; break;
            case 'Floating Holiday': leaveType = 'FH'; break;
            default: leaveType = 'LWP';
        }
        this.setState({ isUpdateClicked: true, employeeName, appliedDays, fromTime, toTime, fromSession, toSession, leaveType, leaveReason, leaveFrom: new Date(leaveDetails.fromDate), leaveTo: new Date(leaveDetails.toDate), appNumber, appStatus, });
    };

    deleteLeaveClicked = (e, leaveDetails) => {

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

    handleFromSessionChange = (e) => {
        this.setState({ fromSession: e.currentTarget.value });
    };

    handleToSessionChange = (e) => {
        this.setState({ toSession: e.currentTarget.value });
    };

    handlefromTimeChange = (e) => {
        this.setState({ fromTime: e.currentTarget.value });
    };

    handletoTimeChange = (e) => {
        this.setState({ toTime: e.currentTarget.value });
    };

    submitCreateRequest = () => {
        debugger
        if (this.state.isCreateClicked) {
            let requestBody = {
                "empName": "REVATHI.G",
                "empCode": "2269",
                "employeeName": "REVATHI G",
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
                .then(res => {
                    addNotification({
                        title: 'Leave Request Submitted',
                        subtitle: requestBody.leaveFrom - requestBody.leaveTo,
                        message: 'Your request for leave has been submitted to your manager for approval.',
                        theme: 'green',
                        native: true
                    });
                });
        }
        else if (this.state.isUpdateClicked) {
            let requestBody = {
                "userName": "REVATHI.G",
                "empCode": "2269",
                "empName": "REVATHI G",
                "appNumber": this.state.appNumber.toString(),
                "appStatus": this.state.appStatus,
                "leaveTypeCode": this.state.leaveType,
                "balanceUnit": this.state.balanceUnits.toFixed(2),
                "reqDate": new Date().toISOString().split('T')[0],
                "leaveFrom": this.state.leaveFrom.toISOString().split('T')[0],
                "leaveTo": this.state.leaveTo.toISOString().split('T')[0],
                "confTimeFrom": this.state.fromTime,
                "confTimeTo": this.state.toTime,
                "fromSession": this.state.fromSession,
                "toSession": this.state.toSession,
                "retDate": "2020-08-11",
                "reason": this.state.leaveReason,
                "holidayWorkedDate": "01/01/1900"
            };
            axios.post('http://192.168.20.151:8080/oneprodapterp/leaveupdate', requestBody)
                .then(res => console.log(res.data));
        }
    };

    createClicked = () => {
        this.setState({ isCreateClicked: true });
    };

    render() {
        return (
            <div className="manageLeaves">
                <Navbar />
                <div className="container-fluid">
                    <div className="container">
                        <Breadcrumb page={this.state.breadcrumb} />
                        <div className="create-btn-div"><button className="btn btn-primary create-btn" onClick={this.createClicked}>Create</button></div>

                        {this.state.isCreateClicked || this.state.isUpdateClicked ? this.renderCreateLeaveSection() : ""}
                        {!this.state.isCreateClicked && !this.state.isUpdateClicked ? this.renderAppliedLeavesSection() : ""}
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default ManageLeaves;