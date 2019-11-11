import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import DanhSachLoaiDeTai from './danhsachloaidetai';
import ThemLoaiDeTai from './themmoiloaidetai';
import XoaLoaiDeTai from './xoaloaidetai';
import XemLoaiDeTai from './xemloaidetai';

const Routes = ({ match }) => (
    <>
        <Switch>
            <ErrorBoundaryRoute exact path={`${match.url}/them-moi`} component={ ThemLoaiDeTai } />
            <ErrorBoundaryRoute exact path={`${match.url}/:loaidetai/them-moi`} component={ ThemLoaiDeTai } />
            {<ErrorBoundaryRoute exact path={`${match.url}/:loaidetai`} component={ XemLoaiDeTai } />}
            <ErrorBoundaryRoute path={`${match.url}`} component={ DanhSachLoaiDeTai } />
        </Switch>
        <ErrorBoundaryRoute path={`${match.url}/:loaidetai/xoa`} component={ XoaLoaiDeTai } />
    </>
);

export default Routes;
