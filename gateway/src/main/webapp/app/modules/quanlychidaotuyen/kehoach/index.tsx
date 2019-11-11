import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import DanhSachKeHoach from './hienthidanhsachkehoach';
import ThemKeHoach from './themmoikh';
import XoaKeHoach from './xoakehoach';
import XemKeHoach from './xemkehoach';
// import UserManagementDeleteDialog from "app/modules/administration/user-management/user-management-delete-dialog";

const Routes = ({ match }) => (
    <>
        <Switch>
            <ErrorBoundaryRoute exact path={`${match.url}/them-moi`} component={ ThemKeHoach } />
            <ErrorBoundaryRoute exact path={`${match.url}/:kehoach/them-moi/:tinhthanh/:donvi/:nam`} component={ ThemKeHoach } />
            <ErrorBoundaryRoute exact path={`${match.url}/them-moi/:tinhthanh`} component={ ThemKeHoach } />
            <ErrorBoundaryRoute exact path={`${match.url}/them-moi/:tinhthanh/:donvi/:nam`} component={ ThemKeHoach } />
            {<ErrorBoundaryRoute exact path={`${match.url}/:kehoach/:tinhthanh/:donvi/:nam`} component={ XemKeHoach } />}
            <ErrorBoundaryRoute path={`${match.url}/:tinhthanh/:donvi/:nam`} component={ DanhSachKeHoach } />
            <ErrorBoundaryRoute path={`${match.url}`} component={ DanhSachKeHoach } />
        </Switch>
        <ErrorBoundaryRoute path={`${match.url}/:kehoach/xoa`} component={ XoaKeHoach } />
    </>
);

export default Routes;
