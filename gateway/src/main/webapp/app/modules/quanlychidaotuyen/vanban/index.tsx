import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
// import VanBanIndex from './vanban-index';
import DanhSachVanBan from './hienthidanhsachvanban';
import ThemVanBan from './themoivb';
import XoaVanBan from './xoavanban';
import XemVanBan from './xemvanban';
import Uploadfile from './uploadfile';
// import UserManagementDeleteDialog from "app/modules/administration/user-management/user-management-delete-dialog";

const Routes = ({ match }) => (
    <>
        <Switch>
            <ErrorBoundaryRoute exact path={`${match.url}/:vanban/them-moi/:tinhthanh/:donvi/:nam`} component={ ThemVanBan } />
            <ErrorBoundaryRoute exact path={`${match.url}/them-moi/:tinhthanh/:donvi/:nam`} component={ ThemVanBan } />
            {<ErrorBoundaryRoute exact path={`${match.url}/:vanban/:tinhthanh/:donvi/:nam`} component={ XemVanBan } />}
            <ErrorBoundaryRoute path={`${match.url}/:tinhthanh/:donvi/:nam`} component={ DanhSachVanBan } />
            <ErrorBoundaryRoute path={`${match.url}`} component={ DanhSachVanBan } />
        </Switch>
        <ErrorBoundaryRoute path={`${match.url}/:vanban/xoa`} component={ XoaVanBan } />
    </>
);

export default Routes;
