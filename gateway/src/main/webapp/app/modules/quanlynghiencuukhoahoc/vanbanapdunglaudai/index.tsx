import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import DanhSachVanBanApDungLauDai from './danhsachvanbanapdunglaudai';
import CapNhatVanBanApDungLauDai from './capnhatvanbanapdunglaudai';

const Routes = ({ match }) => (
    <>
        <Switch>
            <ErrorBoundaryRoute path={`${match.url}/:tinhthanh/:donvi/:nam/:trangthai`} component={ DanhSachVanBanApDungLauDai } />
            <ErrorBoundaryRoute path={`${match.url}`} component={ DanhSachVanBanApDungLauDai } />
        </Switch>
        <ErrorBoundaryRoute path={`${match.url}/:detai/:donvi/:nam/:trangthai/cap-nhat-van-ban`} component={ CapNhatVanBanApDungLauDai } />
    </>
);

export default Routes;
