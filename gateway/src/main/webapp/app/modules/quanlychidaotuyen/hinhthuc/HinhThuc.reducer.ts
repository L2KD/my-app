import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudGetSomeAction1, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IHinhThuc, defaultValue } from './HinhThuc.model';

export const ACTION_TYPES = {
    LAY_DANH_SACH: 'HinhThuc/LAY_DANH_SACH',
    LAY_HINH_THUC: 'HinhThuc/LAY_HINH_THUC',
    TAO_HINH_THUC: 'HinhThuc/TAO_HINH_THUC',
    CAP_NHAT_HINH_THUC: 'HinhThuc/CAP_NHAT_HINH_THUC',
    XOA_HINH_THUC: 'HinhThuc/XOA_HINH_THUC',
    RESET: 'HinhThuc/RESET'
};

const initialState = {
    loading: false,
    errorMessage: null,
    ds_hinh_thuc: [] as ReadonlyArray<IHinhThuc>,
    authorities: [] as any[],
    hinh_thuc: defaultValue,
    updating: false,
    updateSuccess: false,
    totalItems: 0
};

export type HinhThucState = Readonly<typeof initialState>;

// Reducer
export default (state: HinhThucState = initialState, action): HinhThucState => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH):
        case REQUEST(ACTION_TYPES.LAY_HINH_THUC):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                loading: true
            };
        case REQUEST(ACTION_TYPES.TAO_HINH_THUC):
        case REQUEST(ACTION_TYPES.CAP_NHAT_HINH_THUC):
        case REQUEST(ACTION_TYPES.XOA_HINH_THUC):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                updating: true
            };
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH):
        case FAILURE(ACTION_TYPES.LAY_HINH_THUC):
        case FAILURE(ACTION_TYPES.TAO_HINH_THUC):
        case FAILURE(ACTION_TYPES.CAP_NHAT_HINH_THUC):
        case FAILURE(ACTION_TYPES.XOA_HINH_THUC):
            return {
                ...state,
                loading: false,
                updating: false,
                updateSuccess: false,
                errorMessage: action.payload
            };
        case SUCCESS(ACTION_TYPES.LAY_DANH_SACH):
            return {
                ...state,
                loading: false,
                ds_hinh_thuc: action.payload.data,
                totalItems: action.payload.headers['x-total-count']
            };
        case SUCCESS(ACTION_TYPES.LAY_HINH_THUC):
            return {
                ...state,
                loading: false,
                hinh_thuc: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.TAO_HINH_THUC):
        case SUCCESS(ACTION_TYPES.CAP_NHAT_HINH_THUC):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                hinh_thuc: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.XOA_HINH_THUC):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                hinh_thuc: defaultValue
            };
        case ACTION_TYPES.RESET:
            return {
                ...initialState
            };
        default:
            return state;
    }
};

const apiUrl = 'http://localhost:8080/chidaotuyen/api/';

// Actions
export const layDanhSachHinhThuc: ICrudGetAllAction<IHinhThuc> = () => {
    const requestUrl = `${apiUrl}hinh-thuc/lay-danh-sach-hinh-thuc`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH,
        payload: axios.get<IHinhThuc>(requestUrl)
    };
};

export const layHinhThuc: ICrudGetAction<IHinhThuc> = mahinhthuc => {
    const requestUrl = `${apiUrl}hinh-thuc/lay-hinh-thuc`;
    return {
        type: ACTION_TYPES.LAY_HINH_THUC,
        payload: axios.get<IHinhThuc>(requestUrl, { params : { ma_hinh_thuc: mahinhthuc } })
    };
};

export const themMoiHinhThuc: ICrudPutAction<IHinhThuc> = hinhthuc => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.TAO_HINH_THUC,
        payload: axios.post(`${apiUrl}hinh-thuc/them-moi-hinh-thuc`, hinhthuc)
    });
    dispatch(layDanhSachHinhThuc());
    return result;
};

export const capNhatHinhThuc: ICrudPutAction<IHinhThuc> = hinhthuc => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.CAP_NHAT_HINH_THUC,
        payload: axios.post(`${apiUrl}hinh-thuc/cap-nhat-hinh-thuc`, hinhthuc)
    });
    dispatch(layDanhSachHinhThuc());
    return result;
};

export const xoaHinhThuc: ICrudDeleteAction<IHinhThuc> = mahinhthuc => async dispatch => {
    const requestUrl = `${apiUrl}hinh-thuc/xoa`;
    const result = await dispatch({
        type: ACTION_TYPES.XOA_HINH_THUC,
        payload: axios.delete(requestUrl, { params: { ma_hinh_thuc: mahinhthuc } })
    });
    dispatch(layDanhSachHinhThuc());
    return result;
};

export const layDanhSachHinhThucTheoTen: ICrudGetSomeAction1<IHinhThuc> = name => {
    const requestUrl = `${apiUrl}hinh-thuc/lay-danh-sach-hinh-thuc-theo-ten`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH,
        payload: axios.get<IHinhThuc>(requestUrl, { params: { tenHinhThuc: name } })
    };
};

export const reset = () => ({
    type: ACTION_TYPES.RESET
});
