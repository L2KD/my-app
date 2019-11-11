import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import DanhSachCDT from './hienthidanhsachcdt';
import ThemCDT from './themmoicdt';
import SuaCDT from './suacdt';
import XoaCDT from './xoacdt';
import XemCDT from './xemcdt';
import CapNhatBienBanCDT from './capnhatbienbancdt';
// import UserManagementDeleteDialog from "app/modules/administration/user-management/user-management-delete-dialog";

const Routes = ({ match }) => (
    <>
        {
            localStorage.getItem('phan_quyen') === '1' ? (
                <Switch>
                    <ErrorBoundaryRoute exact path={`${match.url}/sua/:cdt/:tinhthanh/:donvi/:nam/:kehoach/:khoaphong/:donvitiepnhan`} component={ SuaCDT } />
                    <ErrorBoundaryRoute exact path={`${match.url}/them-moi/:tinhthanh/:donvi/:nam/:kehoach`} component={ ThemCDT } />
                    {<ErrorBoundaryRoute exact path={`${match.url}/xem/:cdt/:tinhthanh/:donvi/:nam/:kehoach/:khoaphong/:donvitiepnhan`} component={ XemCDT } />}
                    {<ErrorBoundaryRoute exact path={`${match.url}/cap-nhat-bien-ban/:cdt/:loaicdt/:tinhthanh/:donvi/:nam/:kehoach`} component={ CapNhatBienBanCDT } />}
                    <ErrorBoundaryRoute path={`${match.url}/:tinhthanh/:donvi/:nam/:kehoach`} component={ DanhSachCDT } />
                    <ErrorBoundaryRoute path={`${match.url}`} component={ DanhSachCDT } />
                </Switch>
            ) : (
                localStorage.getItem('phan_quyen') === '2' ? (
                    <Switch>
                        {<ErrorBoundaryRoute exact path={`${match.url}/xem/:cdt/:tinhthanh/:donvi/:nam/:kehoach/:khoaphong/:donvitiepnhan`} component={ XemCDT } />}
                        <ErrorBoundaryRoute path={`${match.url}/:tinhthanh/:donvi/:nam/:kehoach`} component={ DanhSachCDT } />
                        <ErrorBoundaryRoute path={`${match.url}`} component={ DanhSachCDT } />
                    </Switch>
                ) : (
                    <Switch/>
                )
            )
        }
        {
            localStorage.getItem('phan_quyen') === '1' ? (
                <ErrorBoundaryRoute path={`${match.url}/:cdt/xoa`} component={ XoaCDT } />
            ) : (
                <Switch/>
            )
        }
    </>
);

export default Routes;
