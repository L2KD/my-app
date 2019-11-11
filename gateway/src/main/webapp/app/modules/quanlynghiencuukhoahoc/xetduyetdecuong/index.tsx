import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import DanhSachXetDuyetDeCuong from './danhsachxetduyetdecuong';
import XemXetDuyetDeCuong from './xemxetduyetdecuong';
import XetDuyetDeCuong from './xetduyetdecuong';

const Routes = ({ match }) => (
    <>
        <Switch>
            <ErrorBoundaryRoute exact path={`${match.url}/:xetduyetdecuong/xet-duyet/:tinhthanh/:donvi/:nam/:trangthai`} component={ XetDuyetDeCuong } />
            {<ErrorBoundaryRoute exact path={`${match.url}/:xetduyetdecuong/:tinhthanh/:donvi/:nam/:trangthai`} component ={ XemXetDuyetDeCuong } />}
            {<ErrorBoundaryRoute exact path={`${match.url}/:tinhthanh/:donvi/:nam/:trangthai`} component ={ DanhSachXetDuyetDeCuong } />}
            <ErrorBoundaryRoute path={`${match.url}`} component={ DanhSachXetDuyetDeCuong } />
        </Switch>
    </>
);

export default Routes;
