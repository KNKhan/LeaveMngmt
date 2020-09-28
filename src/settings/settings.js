import React from 'react';
import Breadcrumb from '../breadcrumb/Breadcrumb';
import Navbar from '../navbar/navbar';

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumb: 'Settings'
        };
    }

    render() {
        return (
            <div className="settings">
                <Navbar />
                <div className="container-fluid">
                    <div className="container">
                        <Breadcrumb page={this.state.breadcrumb} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Settings;