import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
// import VanBanIndex from './vanban-index';
import DanhSachThongKe from './danhsachthongke';
import DanhSachThongKeVanBan from './thongkevanban';
import DanhSachThongKeKeHoach from './thongkekehoach';
import DanhSachThongKeCDT from './thongkecdt';
const Routes = ({ match }) => (
    <>
            <ErrorBoundaryRoute path={`${match.url}/thong-ke-van-ban`} component={ DanhSachThongKeVanBan } />
            <ErrorBoundaryRoute path={`${match.url}/thong-ke-ke-hoach`} component={ DanhSachThongKeKeHoach } />
            <ErrorBoundaryRoute path={`${match.url}/thong-ke-cdt`} component={ DanhSachThongKeCDT } />
            <ErrorBoundaryRoute path={`${match.url}`} component={ DanhSachThongKe } />
    </>
);

export default Routes;
