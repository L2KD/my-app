import axios from 'axios';
import { ICrudGetAllAction } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IDashBoard, defaultValue, IDashBoardTongSo, defaultValueTongSo } from 'app/modules/quanlychidaotuyen/dashboard/dashboard.model';

export const ACTION_TYPES = {
    LAY_DANH_SACH_CDT_ALL: 'DashBoard/LAY_DANH_SACH_CDT_ALL',
    LAY_DANH_SACH_TONG_SO_ALL: 'DashBoard/LAY_DANH_SACH_TONG_SO_ALL',
    LAY_HINH_THUC: 'HinhThuc/LAY_HINH_THUC',
    TAO_HINH_THUC: 'HinhThuc/TAO_HINH_THUC',
    CAP_NHAT_HINH_THUC: 'HinhThuc/CAP_NHAT_HINH_THUC',
    XOA_HINH_THUC: 'HinhThuc/XOA_HINH_THUC',
    RESET: 'HinhThuc/RESET'
};

const initialState = {
    loading: false,
    errorMessage: null,
    ds_cdt: [] as ReadonlyArray<IDashBoard>,
    tong_so: defaultValueTongSo,
    authorities: [] as any[],
    updating: false,
    updateSuccess: false,
    totalItems: 0
};

export type DashBoardCDTState = Readonly<typeof initialState>;

// Reducer
export default (state: DashBoardCDTState = initialState, action): DashBoardCDTState => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_CDT_ALL):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                loading: true
            };
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_CDT_ALL):
            return {
                ...state,
                loading: false,
                updating: false,
                updateSuccess: false,
                errorMessage: action.payload
            };
        case SUCCESS(ACTION_TYPES.LAY_DANH_SACH_CDT_ALL):
            return {
                ...state,
                loading: false,
                ds_cdt: action.payload.data
            };
            case SUCCESS(ACTION_TYPES.LAY_DANH_SACH_TONG_SO_ALL):
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
export const getDanhSachCDTAll: ICrudGetAllAction<IDashBoard> = () => {
    const requestUrl = `${apiUrl}dashboard/get-cdt-all`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_CDT_ALL,
        payload: axios.get<IDashBoard>(requestUrl)
    };
};
export const getDanhSachTongSoAll: ICrudGetAllAction<IDashBoardTongSo> = () => {
    const requestUrl = `${apiUrl}dashboard/get-tong-so-all`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_TONG_SO_ALL,
        payload: axios.get<IDashBoardTongSo>(requestUrl)
    };
};

