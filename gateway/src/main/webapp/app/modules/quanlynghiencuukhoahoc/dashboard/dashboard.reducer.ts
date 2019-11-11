import axios from 'axios';
import { ICrudGetAllAction } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IDashboardDeTaiDangKy, IDashBoardTongSoDeTai, defaultValue } from 'app/modules/quanlynghiencuukhoahoc/dashboard/dashboard.model';

export const ACTION_TYPES = {
    LAY_DANH_SACH_DE_TAI_ALL: 'DashBoard/LAY_DANH_SACH_DE_TAI_ALL',
    LAY_DANH_SACH_TONG_SO_DE_TAI_ALL: 'DashBoard/LAY_DANH_SACH_TONG_SO_DE_TAI_ALL',
    LAY_HINH_THUC: 'HinhThuc/LAY_HINH_THUC',
    TAO_HINH_THUC: 'HinhThuc/TAO_HINH_THUC',
    CAP_NHAT_HINH_THUC: 'HinhThuc/CAP_NHAT_HINH_THUC',
    XOA_HINH_THUC: 'HinhThuc/XOA_HINH_THUC',
    RESET: 'HinhThuc/RESET'
};

const initialState = {
    loading: false,
    errorMessage: null,
    ds_de_tai: [] as ReadonlyArray<IDashboardDeTaiDangKy>,
    tong_so: defaultValue,
    authorities: [] as any[],
    updating: false,
    updateSuccess: false,
    totalItems: 0
};

export type DashBoardDeTaiState = Readonly<typeof initialState>;

// Reducer
export default (state: DashBoardDeTaiState = initialState, action): DashBoardDeTaiState => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_DE_TAI_ALL):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                loading: true
            };
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_DE_TAI_ALL):
            return {
                ...state,
                loading: false,
                updating: false,
                updateSuccess: false,
                errorMessage: action.payload
            };
        case SUCCESS(ACTION_TYPES.LAY_DANH_SACH_DE_TAI_ALL):
            return {
                ...state,
                loading: false,
                ds_de_tai: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.LAY_DANH_SACH_TONG_SO_DE_TAI_ALL):
            return {
                ...state,
                loading: false,
                tong_so: action.payload.data
            };
        default:
            return state;
    }
};

const apiUrl = 'http://localhost:8080/chidaotuyen/api/';

// Actions
export const getDanhSachDeTaiAll: ICrudGetAllAction<IDashboardDeTaiDangKy> = () => {
    const requestUrl = `${apiUrl}dashboard/get-de-tai-all`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_DE_TAI_ALL,
        payload: axios.get<IDashboardDeTaiDangKy>(requestUrl)
    };
};
export const getDanhSachTongSoAll: ICrudGetAllAction<IDashBoardTongSoDeTai> = () => {
    const requestUrl = `${apiUrl}dashboard/get-tong-so-de-tai-all`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_TONG_SO_DE_TAI_ALL,
        payload: axios.get<IDashBoardTongSoDeTai>(requestUrl)
    };
};
