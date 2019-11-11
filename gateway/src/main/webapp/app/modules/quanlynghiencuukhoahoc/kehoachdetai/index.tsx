import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import DanhSachKeHoachDeTai from './danhsachkehoachdetai';
import ThemKeHoachDeTai from './themmoikehoachdetai';
import XoaKeHoachDeTai from './xoakehoachdetai';
import XemKeHoachDeTai from './xemkehoachdetai';

const Routes = ({ match }) => (
    <>
        <Switch>
            <ErrorBoundaryRoute exact path={`${match.url}/:kehoachdetai/them-moi/:tinhthanh/:donvi/:nam`} component={ ThemKeHoachDeTai } />
            <ErrorBoundaryRoute exact path={`${match.url}/them-moi/:tinhthanh/:donvi/:nam`} component={ ThemKeHoachDeTai } />
            {<ErrorBoundaryRoute exact path={`${match.url}/:kehoachdetai/:tinhthanh/:donvi/:nam`} component ={ XemKeHoachDeTai } />}
            <ErrorBoundaryRoute path={`${match.url}/:tinhthanh/:donvi/:nam`} component={ DanhSachKeHoachDeTai } />
            <ErrorBoundaryRoute path={`${match.url}`} component={ DanhSachKeHoachDeTai } />
        </Switch>
        <ErrorBoundaryRoute path={`${match.url}/:kehoachdetai/xoa/:tinhthanh/:donvi/:nam`} component={ XoaKeHoachDeTai } />
    </>
);

export default Routes;
