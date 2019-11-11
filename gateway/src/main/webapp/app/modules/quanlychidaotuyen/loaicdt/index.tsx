import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import DanhSachLoaiCDT from './danhsachloaicdt';
import ThemLoaiCDT from './themmoiloaicdt';
import XoaLoaiCDT from './xoaloaicdt';
import XemLoaiCDT from './xemloaicdt';
// import UserManagementDeleteDialog from "app/modules/administration/user-management/user-management-delete-dialog";

const Routes = ({ match }) => (
    <>
        <Switch>
            <ErrorBoundaryRoute exact path={`${match.url}/them-moi`} component={ ThemLoaiCDT } />
            <ErrorBoundaryRoute exact path={`${match.url}/:loaicdt/them-moi`} component={ ThemLoaiCDT } />
            {<ErrorBoundaryRoute exact path={`${match.url}/:loaicdt`} component={ XemLoaiCDT } />}
            <ErrorBoundaryRoute path={`${match.url}`} component={ DanhSachLoaiCDT } />
        </Switch>
        <ErrorBoundaryRoute path={`${match.url}/:loaicdt/xoa`} component={ XoaLoaiCDT } />
    </>
);

export default Routes;
