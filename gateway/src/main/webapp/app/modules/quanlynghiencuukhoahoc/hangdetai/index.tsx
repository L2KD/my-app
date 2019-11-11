import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import DanhSachHangDeTai from './danhsachhangdetai';
import ThemHangDeTai from './themmoihhangdetai';
import XoaHangDeTai from './xoahangdetai';
import XemHangDeTai from './xemhangdetai';

const Routes = ({ match }) => (
    <>
        <Switch>
            <ErrorBoundaryRoute exact path={`${match.url}/them-moi`} component={ ThemHangDeTai } />
            <ErrorBoundaryRoute exact path={`${match.url}/:hangdetai/them-moi`} component={ ThemHangDeTai } />
            {<ErrorBoundaryRoute exact path={`${match.url}/:hangdetai`} component={ XemHangDeTai } />}
            <ErrorBoundaryRoute path={`${match.url}`} component={ DanhSachHangDeTai } />
        </Switch>
        <ErrorBoundaryRoute path={`${match.url}/:hangdetai/xoa`} component={ XoaHangDeTai } />
    </>
);

export default Routes;
