import axios from 'axios';
import { ICrudGetAction, ICrudGetSomeAction1, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ILoaiDeTai, defaultValueILoaiDeTai } from 'app/modules/quanlynghiencuukhoahoc/loaidetai/loaidetai.model';

export const ACTION_TYPES = {
    LAY_DANH_SACH_LOAI_DE_TAI: 'LoaiDeTai/LAY_DANH_SACH_LOAI_DE_TAI',
    LAY_LOAI_DE_TAI: 'LoaiDeTai/LAY_LOAI_DE_TAI',
    TAO_LOAI_DE_TAI: 'LoaiDeTai/TAO_LOAI_DE_TAI',
    CAP_NHAT_LOAI_DE_TAI: 'LoaiDeTai/CAP_NHAT_LOAI_DE_TAI',
    XOA_LOAI_DE_TAI: 'LoaiDeTai/XOA_LOAI_DE_TAI',
    RESET: 'LoaiDeTai/RESET'
};

const initialState = {
    ds_loai_de_tai: [] as ReadonlyArray<ILoaiDeTai>,
    loai_de_tai: defaultValueILoaiDeTai,
    loading: false,
    errorMessage: null,
    authorities: [] as any[],
    updating: false,
    updateSuccess: false,
    totalItems: 0
};

export type loaiDeTaiState = Readonly<typeof initialState>;

// Reducer
export default (state: loaiDeTaiState = initialState, action): loaiDeTaiState => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_LOAI_DE_TAI):
        case REQUEST(ACTION_TYPES.LAY_LOAI_DE_TAI):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                loading: true
            };
        case REQUEST(ACTION_TYPES.TAO_LOAI_DE_TAI):
        case REQUEST(ACTION_TYPES.CAP_NHAT_LOAI_DE_TAI):
        case REQUEST(ACTION_TYPES.XOA_LOAI_DE_TAI):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                updating: true
            };
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_LOAI_DE_TAI):
        case FAILURE(ACTION_TYPES.TAO_LOAI_DE_TAI):
        case FAILURE(ACTION_TYPES.CAP_NHAT_LOAI_DE_TAI):
        case FAILURE(ACTION_TYPES.XOA_LOAI_DE_TAI):
            return {
                ...state,
                loading: false,
                updating: false,
                updateSuccess: false,
                errorMessage: action.payload
            };
        case SUCCESS(ACTION_TYPES.LAY_DANH_SACH_LOAI_DE_TAI):
            return {
                ...state,
                loading: false,
                ds_loai_de_tai: action.payload.data,
                totalItems: action.payload.headers['x-total-count']
            };
        case SUCCESS(ACTION_TYPES.LAY_LOAI_DE_TAI):
            return {
                ...state,
                loading: false,
                loai_de_tai: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.TAO_LOAI_DE_TAI):
        case SUCCESS(ACTION_TYPES.CAP_NHAT_LOAI_DE_TAI):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                loai_de_tai: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.XOA_LOAI_DE_TAI):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                loai_de_tai: defaultValueILoaiDeTai
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
export const getDanhSachLoaiDeTai: ICrudGetAllAction<ILoaiDeTai> = () => {
    const requestUrl = `${apiUrl}loai-de-tai/lay-danh-sach-loai-de-tai`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_LOAI_DE_TAI,
        payload: axios.get(requestUrl)
    };
};

export const getDanhSachLoaiDeTaiTheoTen: ICrudGetSomeAction1<ILoaiDeTai> = name => {
    const requestUrl = `${apiUrl}loai-de-tai/lay-danh-sach-loai-de-tai-theo-ten`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_LOAI_DE_TAI,
        payload: axios.get<ILoaiDeTai>(requestUrl, { params: { loaiDeTai: name } })
    };
};

export const getLoaiDeTai: ICrudGetAction<ILoaiDeTai> = maloaidetai => {
    const requestUrl = `${apiUrl}loai-de-tai/lay-loai-de-tai`;
    return {
        type: ACTION_TYPES.LAY_LOAI_DE_TAI,
        payload: axios.get<ILoaiDeTai>(requestUrl, { params : { maLoaiDeTai: maloaidetai } })
    };
};

export const addLoaiDeTai: ICrudPutAction<ILoaiDeTai> = loaidetai => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.TAO_LOAI_DE_TAI,
        payload: axios.post(`${apiUrl}loai-de-tai/them-moi-loai-de-tai`, loaidetai)
    });
    dispatch(getDanhSachLoaiDeTai());
    return result;
};

export const updateLoaiDeTai: ICrudPutAction<ILoaiDeTai> = loaidetai => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.CAP_NHAT_LOAI_DE_TAI,
        payload: axios.post(`${apiUrl}loai-de-tai/cap-nhat-loai-de-tai`, loaidetai)
    });
    dispatch(getDanhSachLoaiDeTai());
    return result;
};

export const deleteLoaiDeTai: ICrudDeleteAction<ILoaiDeTai> = maloaidetai => async dispatch => {
    const requestUrl = `${apiUrl}loai-de-tai/xoa`;
    const result = await dispatch({
        type: ACTION_TYPES.XOA_LOAI_DE_TAI,
        payload: axios.delete(requestUrl, { params: { maLoaiDeTai: maloaidetai } })
    });
    dispatch(getDanhSachLoaiDeTai());
    return result;
};

export const reset = () => ({
    type: ACTION_TYPES.RESET
});
