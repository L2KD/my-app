import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import FrmDangNhap from './frmdangnhap';
import DangXuat from './logout';
const Routes = ({ match }) => (
    <>
        <Switch>
            <ErrorBoundaryRoute path={`${match.url}/dang-nhap`} component={ FrmDangNhap } />
            <ErrorBoundaryRoute path={`${match.url}/dang-xuat`} component={ DangXuat } />
            <ErrorBoundaryRoute path={`${match.url}`} component={ FrmDangNhap } />
        </Switch>
    </>
);

export default Routes;
