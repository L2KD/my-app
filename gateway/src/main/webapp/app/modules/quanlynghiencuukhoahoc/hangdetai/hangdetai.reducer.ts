import axios from 'axios';
import { ICrudGetAction, ICrudGetSomeAction1, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IHangDeTai, defaultValueIHangDeTai } from 'app/modules/quanlynghiencuukhoahoc/hangdetai/hangdetai.model';

export const ACTION_TYPES = {
    LAY_DANH_SACH_HANG_DE_TAI: 'hangDeTai/LAY_DANH_SACH_HANG_DE_TAI',
    LAY_HANG_DE_TAI: 'hangDeTai/LAY_HANG_DE_TAI',
    TAO_HANG_DE_TAI: 'hangDeTai/TAO_HANG_DE_TAI',
    CAP_NHAT_HANG_DE_TAI: 'hangDeTai/CAP_NHAT_HANG_DE_TAI',
    XOA_HANG_DE_TAI: 'hangDeTai/XOA_HANG_DE_TAI',
    RESET: 'hangDeTai/RESET'
};

const initialState = {
    ds_hang_de_tai: [] as ReadonlyArray<IHangDeTai>,
    hang_de_tai: defaultValueIHangDeTai,
    loading: false,
    errorMessage: null,
    authorities: [] as any[],
    updating: false,
    updateSuccess: false,
    totalItems: 0
};

export type hangDeTaiState = Readonly<typeof initialState>;

// Reducer
export default (state: hangDeTaiState = initialState, action): hangDeTaiState => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_HANG_DE_TAI):
        case REQUEST(ACTION_TYPES.LAY_HANG_DE_TAI):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                loading: true
            };
        case REQUEST(ACTION_TYPES.TAO_HANG_DE_TAI):
        case REQUEST(ACTION_TYPES.CAP_NHAT_HANG_DE_TAI):
        case REQUEST(ACTION_TYPES.XOA_HANG_DE_TAI):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                updating: true
            };
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_HANG_DE_TAI):
        case FAILURE(ACTION_TYPES.TAO_HANG_DE_TAI):
        case FAILURE(ACTION_TYPES.CAP_NHAT_HANG_DE_TAI):
        case FAILURE(ACTION_TYPES.XOA_HANG_DE_TAI):
            return {
                ...state,
                loading: false,
                updating: false,
                updateSuccess: false,
                errorMessage: action.payload
            };
        case SUCCESS(ACTION_TYPES.LAY_DANH_SACH_HANG_DE_TAI):
            return {
                ...state,
                loading: false,
                ds_hang_de_tai: action.payload.data,
                totalItems: action.payload.headers['x-total-count']
            };
        case SUCCESS(ACTION_TYPES.LAY_HANG_DE_TAI):
            return {
                ...state,
                loading: false,
                hang_de_tai: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.TAO_HANG_DE_TAI):
        case SUCCESS(ACTION_TYPES.CAP_NHAT_HANG_DE_TAI):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                hang_de_tai: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.XOA_HANG_DE_TAI):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                hang_de_tai: defaultValueIHangDeTai
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
export const getDanhSachHangDeTai: ICrudGetAllAction<IHangDeTai> = () => {
    const requestUrl = `${apiUrl}hang-de-tai/lay-danh-sach-hang-de-tai`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_HANG_DE_TAI,
        payload: axios.get(requestUrl)
    };
};

export const getDanhSachHangDeTaiTheoTen: ICrudGetSomeAction1<IHangDeTai> = name => {
    const requestUrl = `${apiUrl}hang-de-tai/lay-danh-sach-hang-de-tai-theo-ten`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_HANG_DE_TAI,
        payload: axios.get<IHangDeTai>(requestUrl, { params: { hangDeTai: name } })
    };
};

export const getHangDeTai: ICrudGetAction<IHangDeTai> = mahangdetai => {
    const requestUrl = `${apiUrl}hang-de-tai/lay-hang-de-tai`;
    return {
        type: ACTION_TYPES.LAY_HANG_DE_TAI,
        payload: axios.get<IHangDeTai>(requestUrl, { params : { maHangDeTai: mahangdetai } })
    };
};

export const addHangDeTai: ICrudPutAction<IHangDeTai> = hangdetai => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.TAO_HANG_DE_TAI,
        payload: axios.post(`${apiUrl}hang-de-tai/them-moi-hang-de-tai`, hangdetai)
    });
    dispatch(getDanhSachHangDeTai());
    return result;
};

export const updateHangDeTai: ICrudPutAction<IHangDeTai> = hangdetai => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.CAP_NHAT_HANG_DE_TAI,
        payload: axios.post(`${apiUrl}hang-de-tai/cap-nhat-hang-de-tai`, hangdetai)
    });
    dispatch(getDanhSachHangDeTai());
    return result;
};

export const deleteHangDeTai: ICrudDeleteAction<IHangDeTai> = mahangdetai => async dispatch => {
    const requestUrl = `${apiUrl}hang-de-tai/xoa`;
    const result = await dispatch({
        type: ACTION_TYPES.XOA_HANG_DE_TAI,
        payload: axios.delete(requestUrl, { params: { maHangDeTai: mahangdetai } })
    });
    dispatch(getDanhSachHangDeTai());
    return result;
};

export const reset = () => ({
    type: ACTION_TYPES.RESET
});
