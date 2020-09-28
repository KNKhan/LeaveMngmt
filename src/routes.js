import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Main from './Main';
import ManageLeaves from './manage-leaves/manage-leaves';
import ApproveLeaves from './approve-leaves/approve-leaves';
import Settings from './settings/settings';
import ManageTimesheets from './manage-timesheets/manage-timesheets';
import Cookies from 'universal-cookie';
import Login from './login/login';

class Routes extends React.Component {

    componentDidMount() {
        const cookies = new Cookies();
        if (!cookies.get('userName'))
            this.props.history.push('/login');
    }

    render() {
        return (
            <Switch>
                <Route exact path="/">
                    <Main />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/manage-leaves">
                    <ManageLeaves />
                </Route>
                <Route path="/approve-leaves">
                    <ApproveLeaves />
                </Route>
                <Route path="/settings">
                    <Settings />
                </Route>
                <Route path="/manage-timesheets">
                    <ManageTimesheets />
                </Route>
            </Switch>
        );
    }
}

export default withRouter(Routes);