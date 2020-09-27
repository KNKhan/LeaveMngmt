import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from './Main';
import ManageLeaves from './manage-leaves/manage-leaves';
import ApproveLeaves from './approve-leaves/approve-leaves';
import Settings from './settings/settings';

class Routes extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path="/">
                    <Main />
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
            </Switch>
        );
    }
}

export default Routes;