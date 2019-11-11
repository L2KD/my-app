import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import DanhSachDeTaiDangKy from './danhsachdetaidangky';
import ThemDeTaiDangKy from './themmoidetaidangky';
import XoaDeTaiDangKy from './xoadetaidangky';
import XemDeTaiDangKy from './xemdetaidangky';

const Routes = ({ match }) => (
    <>
        <Switch>
            <ErrorBoundaryRoute exact path={`${match.url}/:detaidangky/them-moi/:tinhthanh/:donvi/:nam`} component={ ThemDeTaiDangKy } />
            <ErrorBoundaryRoute exact path={`${match.url}/them-moi/:tinhthanh/:donvi/:nam`} component={ ThemDeTaiDangKy } />
            {<ErrorBoundaryRoute exact path={`${match.url}/xem/:detaidangky/:tinhthanh/:donvi/:nam`} component ={ XemDeTaiDangKy } />}
            <ErrorBoundaryRoute path={`${match.url}/:tinhthanh/:donvi/:nam`} component={ DanhSachDeTaiDangKy } />
            <ErrorBoundaryRoute path={`${match.url}`} component={ DanhSachDeTaiDangKy } />
        </Switch>
        <ErrorBoundaryRoute path={`${match.url}/:detaidangky/xoa/:donvi/:nam`} component={ XoaDeTaiDangKy } />
    </>
);

export default Routes;
