import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import DanhSachNoiDung from './danhsachnoidung';
import ThemNoiDung from './themmoinoidung';
import XoaNoiDung from './xoanoidung';
import XemNoiDung from './xemnoidung';
// import UserManagementDeleteDialog from "app/modules/administration/user-management/user-management-delete-dialog";

const Routes = ({ match }) => (
    <>
        <Switch>
            <ErrorBoundaryRoute exact path={`${match.url}/them-moi`} component={ ThemNoiDung } />
            <ErrorBoundaryRoute exact path={`${match.url}/:noidung/them-moi`} component={ ThemNoiDung } />
            {<ErrorBoundaryRoute exact path={`${match.url}/:noidung`} component={ XemNoiDung } />}
            <ErrorBoundaryRoute path={`${match.url}`} component={ DanhSachNoiDung } />
        </Switch>
        <ErrorBoundaryRoute path={`${match.url}/:noidung/xoa`} component={ XoaNoiDung } />
    </>
);

export default Routes;
