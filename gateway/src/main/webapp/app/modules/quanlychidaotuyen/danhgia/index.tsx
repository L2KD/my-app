import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import DanhSachDanhGia from './hienthidanhsachdanhgia';
import ThemDanhGia from './themmoidanhgia';
import XoaDanhGia from './xoadanhgia';
import XemDanhGia from './xemdanhgia';

const Routes = ({ match }) => (
    <>
        <Switch>
            <ErrorBoundaryRoute exact path={`${match.url}/:danhgia/them-moi/:loaicdt`} component={ ThemDanhGia } />
            <ErrorBoundaryRoute exact path={`${match.url}/them-moi/:loaicdt`} component={ ThemDanhGia } />
            {<ErrorBoundaryRoute exact path={`${match.url}/xem/:danhgia/:loaicdt`} component={ XemDanhGia } />}
            <ErrorBoundaryRoute path={`${match.url}/:loaicdt`} component={ DanhSachDanhGia } />
            <ErrorBoundaryRoute path={`${match.url}`} component={ DanhSachDanhGia } />
        </Switch>
        <ErrorBoundaryRoute path={`${match.url}/:danhgia/xoa-danh-gia`} component={ XoaDanhGia } />
    </>
);

export default Routes;
