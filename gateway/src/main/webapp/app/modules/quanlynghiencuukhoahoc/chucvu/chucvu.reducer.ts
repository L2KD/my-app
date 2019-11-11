import axios from 'axios';
import { ICrudGetAction, ICrudGetSomeAction1, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IChucVu, defaultValueIChucVu } from 'app/modules/quanlynghiencuukhoahoc/chucvu/chucvu.model';

export const ACTION_TYPES = {
    LAY_DANH_SACH_CHUC_VU: 'ChucVu/LAY_DANH_SACH_CHUC_VU',
    LAY_CHUC_VU: 'ChucVu/LAY_CHUC_VU',
    TAO_CHUC_VU: 'ChucVu/TAO_CHUC_VU',
    CAP_NHAT_CHUC_VU: 'ChucVu/CAP_NHAT_CHUC_VU',
    XOA_CHUC_VU: 'ChucVu/XOA_CHUC_VU',
    RESET: 'ChucVu/RESET'
};

const initialState = {
    ds_chuc_vu: [] as ReadonlyArray<IChucVu>,
    chuc_vu: defaultValueIChucVu,
    loading: false,
    errorMessage: null,
    authorities: [] as any[],
    updating: false,
    updateSuccess: false,
    totalItems: 0
};

export type chucVuState = Readonly<typeof initialState>;

// Reducer
export default (state: chucVuState = initialState, action): chucVuState => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_CHUC_VU):
        case REQUEST(ACTION_TYPES.LAY_CHUC_VU):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                loading: true
            };
        case REQUEST(ACTION_TYPES.TAO_CHUC_VU):
        case REQUEST(ACTION_TYPES.CAP_NHAT_CHUC_VU):
        case REQUEST(ACTION_TYPES.XOA_CHUC_VU):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                updating: true
            };
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_CHUC_VU):
        case FAILURE(ACTION_TYPES.TAO_CHUC_VU):
        case FAILURE(ACTION_TYPES.CAP_NHAT_CHUC_VU):
        case FAILURE(ACTION_TYPES.XOA_CHUC_VU):
            return {
                ...state,
                loading: false,
                updating: false,
                updateSuccess: false,
                errorMessage: action.payload
            };
        case SUCCESS(ACTION_TYPES.LAY_DANH_SACH_CHUC_VU):
            return {
                ...state,
                loading: false,
                ds_chuc_vu: action.payload.data,
                totalItems: action.payload.headers['x-total-count']
            };
        case SUCCESS(ACTION_TYPES.LAY_CHUC_VU):
            return {
                ...state,
                loading: false,
                chuc_vu: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.TAO_CHUC_VU):
        case SUCCESS(ACTION_TYPES.CAP_NHAT_CHUC_VU):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                chuc_vu: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.XOA_CHUC_VU):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                chuc_vu: defaultValueIChucVu
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
export const getDanhSachChucVu: ICrudGetAllAction<IChucVu> = () => {
    const requestUrl = `${apiUrl}chuc-vu/lay-danh-sach-chuc-vu`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_CHUC_VU,
        payload: axios.get(requestUrl)
    };
};

export const getDanhSachChucVuTheoTen: ICrudGetSomeAction1<IChucVu> = name => {
    const requestUrl = `${apiUrl}chuc-vu/lay-danh-sach-chuc-vu-theo-ten`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_CHUC_VU,
        payload: axios.get<IChucVu>(requestUrl, { params: { chucVu: name } })
    };
};

export const getChucVu: ICrudGetAction<IChucVu> = machucvu => {
    const requestUrl = `${apiUrl}chuc-vu/lay-chuc-vu`;
    return {
        type: ACTION_TYPES.LAY_CHUC_VU,
        payload: axios.get<IChucVu>(requestUrl, { params : { maChucVu: machucvu } })
    };
};

export const addChucVu: ICrudPutAction<IChucVu> = chucvu => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.TAO_CHUC_VU,
        payload: axios.post(`${apiUrl}chuc-vu/them-moi-chuc-vu`, chucvu)
    });
    dispatch(getDanhSachChucVu());
    return result;
};

export const updateChucVu: ICrudPutAction<IChucVu> = chucvu => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.CAP_NHAT_CHUC_VU,
        payload: axios.post(`${apiUrl}chuc-vu/cap-nhat-chuc-vu`, chucvu)
    });
    dispatch(getDanhSachChucVu());
    return result;
};

export const deleteChucVu: ICrudDeleteAction<IChucVu> = machucvu => async dispatch => {
    const requestUrl = `${apiUrl}chuc-vu/xoa`;
    const result = await dispatch({
        type: ACTION_TYPES.XOA_CHUC_VU,
        payload: axios.delete(requestUrl, { params: { maChucVu: machucvu } })
    });
    dispatch(getDanhSachChucVu());
    return result;
};

export const reset = () => ({
    type: ACTION_TYPES.RESET
});
