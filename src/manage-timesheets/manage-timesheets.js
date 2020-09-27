import React from 'react';
import Navbar from '../navbar/navbar';

class ManageTimesheets extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <Navbar />
                <div className="manageTimesheets"></div>
            </React.Fragment>
        );
    }
}

export default ManageTimesheets;