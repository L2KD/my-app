import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import DanhSachXetDuyetBaoCaoTongKet from './danhsachxetduyetbaocaotongket';
import XemXetDuyetBaoCaoTongKet from './xemxetduyetbaocaotongket';
import XetDuyetBaoCaoTongKet from './xetduyetbaocaotongket';

const Routes = ({ match }) => (
    <>
        <Switch>
            <ErrorBoundaryRoute exact path={`${match.url}/:xetduyetbaocaotongket/xet-duyet/:tinhthanh/:donvi/:nam/:trangthai`} component={ XetDuyetBaoCaoTongKet } />
            {<ErrorBoundaryRoute exact path={`${match.url}/:xetduyetbaocaotongket/:tinhthanh/:donvi/:nam/:trangthai`} component ={ XemXetDuyetBaoCaoTongKet } />}
            <ErrorBoundaryRoute path={`${match.url}/:tinhthanh/:donvi/:nam/:trangthai`} component={ DanhSachXetDuyetBaoCaoTongKet } />
            <ErrorBoundaryRoute path={`${match.url}`} component={ DanhSachXetDuyetBaoCaoTongKet } />
        </Switch>
    </>
);

export default Routes;
