import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import DanhSachXetDuyetDeTaiUngDungChoDonVi from './danhsachxetduyetdetaiungdungdonvi';
import XemXetDuyetDeTaiUngDungChoDonVi from './xemxetuyetdetaiungdungchodonvi';
import XetDuyetDeTaiUngDungChoDonVi from './xetduyetdetaiungdungchodonvi';

const Routes = ({ match }) => (
    <>
        <Switch>
            <ErrorBoundaryRoute exact path={`${match.url}/xet-duyet/:xetduyetdetaiungdungchodonvi/:tinhthanh/:donvi/:nam/:trangthai`} component={ XetDuyetDeTaiUngDungChoDonVi } />
            {<ErrorBoundaryRoute exact path={`${match.url}/:xetduyetdetaiungdungchodonvi/:tinhthanh/:donvi/:nam/:trangthai`} component ={ XemXetDuyetDeTaiUngDungChoDonVi } />}
            <ErrorBoundaryRoute path={`${match.url}/:tinhthanh/:donvi/:nam/:trangthai`} component={ DanhSachXetDuyetDeTaiUngDungChoDonVi } />
            <ErrorBoundaryRoute path={`${match.url}`} component={ DanhSachXetDuyetDeTaiUngDungChoDonVi } />
        </Switch>
    </>
);

export default Routes;
