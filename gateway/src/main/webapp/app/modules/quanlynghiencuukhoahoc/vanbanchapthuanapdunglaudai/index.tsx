import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import DanhSachVanBanChapThuanApDungLauDai from './danhsachvanbanchapthuanapdunglaudai';
import CapNhatVanBanChapThuanApDungLauDai from './capnhatvanbanchapthuanapdunglaudai';

const Routes = ({ match }) => (
    <>
        <Switch>
            <ErrorBoundaryRoute path={`${match.url}/:tinhthanh/:donvi/:nam/:trangthai`} component={ DanhSachVanBanChapThuanApDungLauDai } />
            <ErrorBoundaryRoute path={`${match.url}`} component={ DanhSachVanBanChapThuanApDungLauDai } />
        </Switch>
        <ErrorBoundaryRoute path={`${match.url}/:detai/:donvi/:nam/:trangthai/cap-nhat-van-ban`} component={ CapNhatVanBanChapThuanApDungLauDai } />
    </>
);

export default Routes;
