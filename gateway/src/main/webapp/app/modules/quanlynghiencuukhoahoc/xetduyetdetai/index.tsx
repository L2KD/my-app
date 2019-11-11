import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import DanhSachXetDuyetDeTai from './danhsachxetduyetdetai';
import XemXetDuyetDeTai from './xemxetduyetdetai';
import XetDuyetDeTai from './xetduyetdetai';

const Routes = ({ match }) => (
    <>
        <Switch>
            <ErrorBoundaryRoute exact path={`${match.url}/:xetduyetdetai/xet-duyet/:tinhthanh/:donvi/:nam/:trangthai`} component={ XetDuyetDeTai } />
            {<ErrorBoundaryRoute exact path={`${match.url}/:xetduyetdetai/:tinhthanh/:donvi/:nam/:trangthai`} component ={ XemXetDuyetDeTai } />}
            {<ErrorBoundaryRoute exact path={`${match.url}/:tinhthanh/:donvi/:nam/:trangthai`} component ={ DanhSachXetDuyetDeTai } />}
            <ErrorBoundaryRoute path={`${match.url}`} component={ DanhSachXetDuyetDeTai } />
        </Switch>
    </>
);

export default Routes;
