import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import DanhSachNhomDeTai from './danhsachnhomdetai';
import ThemNhomDeTai from './themmoinhomdetai';
import XoaNhomDeTai from './xoanhomdetai';
import XemNhomDeTai from './xemnhomdetai';

const Routes = ({ match }) => (
    <>
        <Switch>
            <ErrorBoundaryRoute exact path={`${match.url}/them-moi`} component={ ThemNhomDeTai } />
            <ErrorBoundaryRoute exact path={`${match.url}/:nhomdetai/them-moi`} component={ ThemNhomDeTai } />
            {<ErrorBoundaryRoute exact path={`${match.url}/:nhomdetai`} component={ XemNhomDeTai } />}
            <ErrorBoundaryRoute path={`${match.url}`} component={ DanhSachNhomDeTai } />
        </Switch>
        <ErrorBoundaryRoute path={`${match.url}/:nhomdetai/xoa`} component={ XoaNhomDeTai } />
    </>
);

export default Routes;
