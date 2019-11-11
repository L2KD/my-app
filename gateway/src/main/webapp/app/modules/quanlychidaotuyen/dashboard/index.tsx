import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import DashBoardCDT from './dashboard_cdt';
// import UserManagementDeleteDialog from "app/modules/administration/user-management/user-management-delete-dialog";

const Routes = ({ match }) => (
    <>
        <Switch>
            <ErrorBoundaryRoute exact path={`${match.url}`} component={ DashBoardCDT } />
        </Switch>
    </>
);

export default Routes;
