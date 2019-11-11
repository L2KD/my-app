import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import DanhSachBaoCaoQuyNamDeTai from './danhsachbaocaoquynamdetai';
import CapNhatBaoCaoQuyNamDeTai from './capnhatbienbanbaocaoquynam';

const Routes = ({ match }) => (
    <>
        <Switch>
            <ErrorBoundaryRoute path={`${match.url}/:tinhthanh/:donvi/:nam/:trangthai`} component={ DanhSachBaoCaoQuyNamDeTai } />
            <ErrorBoundaryRoute path={`${match.url}`} component={ DanhSachBaoCaoQuyNamDeTai } />
        </Switch>
        <ErrorBoundaryRoute path={`${match.url}/:detai/:donvi/:nam/:trangthai/cap-nhat-bien-ban`} component={ CapNhatBaoCaoQuyNamDeTai } />
    </>
);

export default Routes;
