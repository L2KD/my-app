import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import DanhSachHinhThuc from './HienThiDanhSachHinhThuc';
import ThemHinhThuc from './ThemMoiHinhThuc';
import XoaHinhThuc from './XoaHinhThuc';
import XemHinhThuc from './XemHinhThuc';
// import UserManagementDeleteDialog from "app/modules/administration/user-management/user-management-delete-dialog";

const Routes = ({ match }) => (
    <>
        <Switch>
            <ErrorBoundaryRoute exact path={`${match.url}/them-moi`} component={ ThemHinhThuc } />
            <ErrorBoundaryRoute exact path={`${match.url}/:hinhthuc/them-moi`} component={ ThemHinhThuc } />
            {<ErrorBoundaryRoute exact path={`${match.url}/:hinhthuc`} component={ XemHinhThuc } />}
            <ErrorBoundaryRoute path={`${match.url}`} component={ DanhSachHinhThuc } />
        </Switch>
        <ErrorBoundaryRoute path={`${match.url}/:hinhthuc/xoa`} component={ XoaHinhThuc } />
    </>
);

export default Routes;
