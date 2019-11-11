import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import DanhSachDeTaiNam from './danhsachdetainam';
import CapNhatDeTaiNam from './capnhatdetainam';
import XemDeTaiNam from './xemdetainam';

const Routes = ({ match }) => (
    <>
        <Switch>
            <ErrorBoundaryRoute exact path={`${match.url}/:detainam/cap-nhat/:tinhthanh/:donvi/:nam/:trangthai`} component={ CapNhatDeTaiNam } />
            {<ErrorBoundaryRoute exact path={`${match.url}/:detainam/:tinhthanh/:donvi/:nam/:trangthai`} component ={ XemDeTaiNam } />}
            <ErrorBoundaryRoute path={`${match.url}/:tinhthanh/:donvi/:nam/:trangthai`} component={ DanhSachDeTaiNam } />
            <ErrorBoundaryRoute path={`${match.url}`} component={ DanhSachDeTaiNam } />
        </Switch>
        {/*<ErrorBoundaryRoute path={`${match.url}/:detainam/xoa/:donvi/:nam`} component={ XoaDeTaiNam } />*/}
    </>
);

export default Routes;
