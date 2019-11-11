import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import DanhSachDoiTuong from './danhsachdoituong';
import ThemDoiTuong from './themmoidoituong';
import XoaDoiTuong from './xoadoituong';
import XemDoiTuong from './xemdoituong';
// import UserManagementDeleteDialog from "app/modules/administration/user-management/user-management-delete-dialog";

const Routes = ({ match }) => (
    <>
        <Switch>
            <ErrorBoundaryRoute exact path={`${match.url}/them-moi`} component={ ThemDoiTuong } />
            <ErrorBoundaryRoute exact path={`${match.url}/:doituong/them-moi`} component={ ThemDoiTuong } />
            {<ErrorBoundaryRoute exact path={`${match.url}/:doituong`} component={ XemDoiTuong } />}
            <ErrorBoundaryRoute path={`${match.url}`} component={ DanhSachDoiTuong } />
        </Switch>
        <ErrorBoundaryRoute path={`${match.url}/:doituong/xoa`} component={ XoaDoiTuong } />
    </>
);

export default Routes;
