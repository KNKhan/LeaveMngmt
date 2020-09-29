import React from 'react';
import Breadcrumb from '../breadcrumb/Breadcrumb';
import Navbar from '../navbar/navbar';
import Footer from '../footer/Footer';
import image from './underconstruction.jpg';

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
                        <div className="UnderConstdiv">
                            <img  src={image} className="underconstru-image"/>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Settings;