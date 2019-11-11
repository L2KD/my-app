import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import DanhSachBienBanKeHoachDeTaiUngDungChoDonVi from './danhsachbienbankehoach';
import CapNhatBienBanKeHoachDeTaiUngDungChoDonVi from './capnhatbienbankehoach';

const Routes = ({ match }) => (
    <>
        <Switch>
            <ErrorBoundaryRoute path={`${match.url}/:tinhthanh/:donvi/:nam/:trangthai`} component={ DanhSachBienBanKeHoachDeTaiUngDungChoDonVi } />
            <ErrorBoundaryRoute path={`${match.url}`} component={ DanhSachBienBanKeHoachDeTaiUngDungChoDonVi } />
        </Switch>
        <ErrorBoundaryRoute path={`${match.url}/:detai/:donvi/:nam/:trangthai/cap-nhat-bien-ban`} component={ CapNhatBienBanKeHoachDeTaiUngDungChoDonVi } />
    </>
);

export default Routes;
