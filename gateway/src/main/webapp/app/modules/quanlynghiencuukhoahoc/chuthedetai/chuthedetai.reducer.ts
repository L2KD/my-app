import axios from 'axios';
import { ICrudGetAction, ICrudGetSomeAction1, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IChuThe, defaultValueIChuThe } from 'app/modules/quanlynghiencuukhoahoc/chuthedetai/chuthedetai.model';

export const ACTION_TYPES = {
    LAY_DANH_SACH_CHU_THE: 'ChuThe/LAY_DANH_SACH_CHU_THE',
    LAY_CHU_THE: 'ChuThe/LAY_CHU_THE',
    TAO_CHU_THE: 'ChuThe/TAO_CHU_THE',
    CAP_NHAT_CHU_THE: 'ChuThe/CAP_NHAT_CHU_THE',
    XOA_CHU_THE: 'ChuThe/XOA_CHU_THE',
    RESET: 'ChuThe/RESET'
};

const initialState = {
    ds_chu_the: [] as ReadonlyArray<IChuThe>,
    chu_the: defaultValueIChuThe,
    loading: false,
    errorMessage: null,
    authorities: [] as any[],
    updating: false,
    updateSuccess: false,
    totalItems: 0
};

export type chuTheState = Readonly<typeof initialState>;

// Reducer
export default (state: chuTheState = initialState, action): chuTheState => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_CHU_THE):
        case REQUEST(ACTION_TYPES.LAY_CHU_THE):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                loading: true
            };
        case REQUEST(ACTION_TYPES.TAO_CHU_THE):
        case REQUEST(ACTION_TYPES.CAP_NHAT_CHU_THE):
        case REQUEST(ACTION_TYPES.XOA_CHU_THE):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                updating: true
            };
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_CHU_THE):
        case FAILURE(ACTION_TYPES.TAO_CHU_THE):
        case FAILURE(ACTION_TYPES.CAP_NHAT_CHU_THE):
        case FAILURE(ACTION_TYPES.XOA_CHU_THE):
            return {
                ...state,
                loading: false,
                updating: false,
                updateSuccess: false,
                errorMessage: action.payload
            };
        case SUCCESS(ACTION_TYPES.LAY_DANH_SACH_CHU_THE):
            return {
                ...state,
                loading: false,
                ds_chu_the: action.payload.data,
                totalItems: action.payload.headers['x-total-count']
            };
        case SUCCESS(ACTION_TYPES.LAY_CHU_THE):
            return {
                ...state,
                loading: false,
                chu_the: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.TAO_CHU_THE):
        case SUCCESS(ACTION_TYPES.CAP_NHAT_CHU_THE):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                chu_the: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.XOA_CHU_THE):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                chu_the: defaultValueIChuThe
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
export const getDanhSachChuThe: ICrudGetAllAction<IChuThe> = () => {
    const requestUrl = `${apiUrl}chu-the/lay-danh-sach-chu-the`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_CHU_THE,
        payload: axios.get(requestUrl)
    };
};

export const getDanhSachChuTheTheoTen: ICrudGetSomeAction1<IChuThe> = name => {
    const requestUrl = `${apiUrl}chu-the/lay-danh-sach-chu-the-theo-ten`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_CHU_THE,
        payload: axios.get<IChuThe>(requestUrl, { params: { chuTheDeTai: name } })
    };
};

export const getChuThe: ICrudGetAction<IChuThe> = machuthe => {
    const requestUrl = `${apiUrl}chu-the/lay-chu-the`;
    return {
        type: ACTION_TYPES.LAY_CHU_THE,
        payload: axios.get<IChuThe>(requestUrl, { params : { maChuThe: machuthe } })
    };
};

export const addChuThe: ICrudPutAction<IChuThe> = chuthe => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.TAO_CHU_THE,
        payload: axios.post(`${apiUrl}chu-the/them-moi-chu-the`, chuthe)
    });
    dispatch(getDanhSachChuThe());
    return result;
};

export const updateChuThe: ICrudPutAction<IChuThe> = chuthe => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.CAP_NHAT_CHU_THE,
        payload: axios.post(`${apiUrl}chu-the/cap-nhat-chu-the`, chuthe)
    });
    dispatch(getDanhSachChuThe());
    return result;
};

export const deleteChuThe: ICrudDeleteAction<IChuThe> = machuthe => async dispatch => {
    const requestUrl = `${apiUrl}chu-the/xoa`;
    const result = await dispatch({
        type: ACTION_TYPES.XOA_CHU_THE,
        payload: axios.delete(requestUrl, { params: { maChuThe: machuthe } })
    });
    dispatch(getDanhSachChuThe());
    return result;
};

export const reset = () => ({
    type: ACTION_TYPES.RESET
});
