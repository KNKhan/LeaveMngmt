import React from 'react';
import Breadcrumb from '../breadcrumb/Breadcrumb';
import Footer from '../footer/Footer';
import Navbar from '../navbar/navbar';

class TeamAvailability extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            breadcrumb: 'Team Availability'
        };
    }

    render() {
        return (
            <div className="teamAvailability">
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

export default TeamAvailability;