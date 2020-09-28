import React from 'react';
import Breadcrumb from '../breadcrumb/Breadcrumb';
import Footer from '../footer/Footer';
import Navbar from '../navbar/navbar';

class ManageTimesheets extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            breadcrumb: 'Manage Timesheets'
        };
    }

    render() {
        return (
            <div className="manageTimesheets">
                <Navbar />
                <div className="container-fluid">
                    <div className="container">
                        <Breadcrumb page={this.state.breadcrumb} />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default ManageTimesheets;