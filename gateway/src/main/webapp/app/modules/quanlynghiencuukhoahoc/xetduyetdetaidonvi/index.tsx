import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import DanhSachXetDuyetDeTaiDonVi from './danhsachxetduyetdetaidonvi';
import XemXetDuyetDeTaiDonVi from './xemxetduyetdetaidonvi';
import XetDuyetDeTaiDonVi from './xetduyetdetaidonvi';

const Routes = ({ match }) => (
    <>
        <Switch>
            <ErrorBoundaryRoute exact path={`${match.url}/xet-duyet/:xetduyetdetaidonvi/:tinhthanh/:donvi/:nam/:trangthai`} component={ XetDuyetDeTaiDonVi } />
            {<ErrorBoundaryRoute exact path={`${match.url}/:xetduyetdetaidonvi/:tinhthanh/:donvi/:nam/:trangthai`} component ={ XemXetDuyetDeTaiDonVi } />}
            <ErrorBoundaryRoute path={`${match.url}/:tinhthanh/:donvi/:nam/:trangthai`} component={ DanhSachXetDuyetDeTaiDonVi } />
            <ErrorBoundaryRoute path={`${match.url}`} component={ DanhSachXetDuyetDeTaiDonVi } />
        </Switch>
    </>
);

export default Routes;
