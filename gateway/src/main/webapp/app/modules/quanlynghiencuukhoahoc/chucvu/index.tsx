import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import DanhSachChucVu from './danhsachchucvu';
import ThemChucVu from './themmoichucvu';
import XoaChucVu from './xoachucvu';
import XemChucVu from './xemchucvu';

const Routes = ({ match }) => (
    <>
        <Switch>
            <ErrorBoundaryRoute exact path={`${match.url}/them-moi`} component={ ThemChucVu } />
            <ErrorBoundaryRoute exact path={`${match.url}/:chucvu/them-moi`} component={ ThemChucVu } />
            {<ErrorBoundaryRoute exact path={`${match.url}/:chucvu`} component={ XemChucVu } />}
            <ErrorBoundaryRoute path={`${match.url}`} component={ DanhSachChucVu } />
        </Switch>
        <ErrorBoundaryRoute path={`${match.url}/:chucvu/xoa`} component={ XoaChucVu } />
    </>
);

export default Routes;
