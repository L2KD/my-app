import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import DanhSachThongKeNCKH from './danhsachthongke_nckh';
import DanhSachThongKeDeTaiDangKy from './thongkedetaidangky';
import DanhSachThongKeDeTaiNam from './thongkedetainam';
import DanhSachThongKeDeTaiUngDungChoDonVi from './thongkedetaiungdungchodonvi';
const Routes = ({ match }) => (
    <>
        {
            localStorage.getItem('phan_quyen') === '4' ? (
                <>
                    <ErrorBoundaryRoute path={`${match.url}/thong-ke-de-tai-dang-ky`} component={ DanhSachThongKeDeTaiDangKy } />
                    <ErrorBoundaryRoute path={`${match.url}`} component={ DanhSachThongKeNCKH } />
                </>
            ) : (
                localStorage.getItem('phan_quyen') === '5' || localStorage.getItem('phan_quyen') === '6' ? (
                    <>
                        <ErrorBoundaryRoute path={`${match.url}/thong-ke-de-tai-dang-ky`} component={ DanhSachThongKeDeTaiDangKy } />
                        <ErrorBoundaryRoute path={`${match.url}/thong-ke-de-tai-nam`} component={ DanhSachThongKeDeTaiNam } />
                        <ErrorBoundaryRoute path={`${match.url}/thong-ke-de-tai-ung-dung-cho-don-vi`} component={ DanhSachThongKeDeTaiUngDungChoDonVi } />
                        <ErrorBoundaryRoute path={`${match.url}`} component={ DanhSachThongKeNCKH } />
                    </>
                ) : (
                    <></>
                )
            )
        }
    </>
);

export default Routes;
