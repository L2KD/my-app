import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import DanhSachChuThe from './danhsachchuthedetai';
import ThemChuThe from './themmoichuthedetai';
import XoaChuThe from './xoachuthedetai';
import XemChuThe from './xemchuthedetai';

const Routes = ({ match }) => (
    <>
        <Switch>
            <ErrorBoundaryRoute exact path={`${match.url}/them-moi`} component={ ThemChuThe } />
            <ErrorBoundaryRoute exact path={`${match.url}/:chuthe/them-moi`} component={ ThemChuThe } />
            {<ErrorBoundaryRoute exact path={`${match.url}/:chuthe`} component={ XemChuThe } />}
            <ErrorBoundaryRoute path={`${match.url}`} component={ DanhSachChuThe } />
        </Switch>
        <ErrorBoundaryRoute path={`${match.url}/:chuthe/xoa`} component={ XoaChuThe } />
    </>
);

export default Routes;
