import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudGetSomeAction1, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { ILoaiCDT, defaultValue } from './loaicdt.model';

export const ACTION_TYPES = {
    LAY_DANH_SACH: 'LoaiCDT/LAY_DANH_SACH',
    LAY_LOAI_CDT: 'LoaiCDT/LAY_LOAI_CDT',
    TAO_LOAI_CDT: 'LoaiCDT/TAO_LOAI_CDT',
    CAP_NHAT_LOAI_CDT: 'LoaiCDT/CAP_NHAT_LOAI_CDT',
    XOA_LOAI_CDT: 'LoaiCDT/XOA_LOAI_CDT',
    RESET: 'LoaiCDT/RESET'
};

const initialState = {
    loading: false,
    errorMessage: null,
    ds_loai_cdt: [] as ReadonlyArray<ILoaiCDT>,
    authorities: [] as any[],
    loai_cdt: defaultValue,
    updating: false,
    updateSuccess: false,
    totalItems: 0
};

export type loaiCDTState = Readonly<typeof initialState>;

// Reducer
export default (state: loaiCDTState = initialState, action): loaiCDTState => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH):
        case REQUEST(ACTION_TYPES.LAY_LOAI_CDT):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                loading: true
            };
        case REQUEST(ACTION_TYPES.TAO_LOAI_CDT):
        case REQUEST(ACTION_TYPES.CAP_NHAT_LOAI_CDT):
        case REQUEST(ACTION_TYPES.XOA_LOAI_CDT):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                updating: true
            };
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH):
        case FAILURE(ACTION_TYPES.LAY_LOAI_CDT):
        case FAILURE(ACTION_TYPES.TAO_LOAI_CDT):
        case FAILURE(ACTION_TYPES.CAP_NHAT_LOAI_CDT):
        case FAILURE(ACTION_TYPES.XOA_LOAI_CDT):
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
                ds_loai_cdt: action.payload.data,
                totalItems: action.payload.headers['x-total-count']
            };
        case SUCCESS(ACTION_TYPES.LAY_LOAI_CDT):
            return {
                ...state,
                loading: false,
                loai_cdt: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.TAO_LOAI_CDT):
        case SUCCESS(ACTION_TYPES.CAP_NHAT_LOAI_CDT):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                loai_cdt: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.XOA_LOAI_CDT):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                loai_cdt: defaultValue
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
export const layDanhSachLoaiCDT: ICrudGetAllAction<ILoaiCDT> = (page, size, sort) => {
    const requestUrl = `${apiUrl}loai-cdt/lay-danh-sach-loai-cdt${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH,
        payload: axios.get<ILoaiCDT>(requestUrl)
    };
};

export const layDanhSachLoaiCDTTheoTen: ICrudGetSomeAction1<ILoaiCDT> = name => {
    const requestUrl = `${apiUrl}loai-cdt/lay-danh-sach-loai-cdt-theo-ten`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH,
        payload: axios.get<ILoaiCDT>(requestUrl, { params: { tenLoaiCDT: name } })
    };
};

export const layLoaiCDT: ICrudGetAction<ILoaiCDT> = maloaicdt => {
    const requestUrl = `${apiUrl}loai-cdt/lay-loai-cdt`;
    return {
        type: ACTION_TYPES.LAY_LOAI_CDT,
        payload: axios.get<ILoaiCDT>(requestUrl, { params : { ma_loai_cdt: maloaicdt } })
    };
};

export const themMoiLoaiCDT: ICrudPutAction<ILoaiCDT> = loaicdt => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.TAO_LOAI_CDT,
        payload: axios.post(`${apiUrl}loai-cdt/them-moi-loai-cdt`, loaicdt)
    });
    dispatch(layDanhSachLoaiCDT());
    return result;
};

export const capNhatLoaiCDT: ICrudPutAction<ILoaiCDT> = loaicdt => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.CAP_NHAT_LOAI_CDT,
        payload: axios.post(`${apiUrl}loai-cdt/cap-nhat-loai-cdt`, loaicdt)
    });
    dispatch(layDanhSachLoaiCDT());
    return result;
};

export const xoaLoaiCDT: ICrudDeleteAction<ILoaiCDT> = maloaicdt => async dispatch => {
    const requestUrl = `${apiUrl}loai-cdt/xoa`;
    const result = await dispatch({
        type: ACTION_TYPES.XOA_LOAI_CDT,
        payload: axios.delete(requestUrl, { params: { ma_loai_cdt: maloaicdt } })
    });
    dispatch(layDanhSachLoaiCDT());
    return result;
};

export const reset = () => ({
    type: ACTION_TYPES.RESET
});
