import axios from 'axios';
import { ICrudGetAction, ICrudGetSomeAction1, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { INhomDeTai, defaultValueINhomDeTai } from 'app/modules/quanlynghiencuukhoahoc/nhomdetai/nhomdetai.model';

export const ACTION_TYPES = {
    LAY_DANH_SACH_NHOM_DE_TAI: 'NhomDeTai/LAY_DANH_SACH_NHOM_DE_TAI',
    LAY_NHOM_DE_TAI: 'NhomDeTai/LAY_NHOM_DE_TAI',
    TAO_NHOM_DE_TAI: 'NhomDeTai/TAO_NHOM_DE_TAI',
    CAP_NHAT_NHOM_DE_TAI: 'NhomDeTai/CAP_NHAT_NHOM_DE_TAI',
    XOA_NHOM_DE_TAI: 'NhomDeTai/XOA_NHOM_DE_TAI',
    RESET: 'NhomDeTai/RESET'
};

const initialState = {
    ds_nhom_de_tai: [] as ReadonlyArray<INhomDeTai>,
    nhom_de_tai: defaultValueINhomDeTai,
    loading: false,
    errorMessage: null,
    authorities: [] as any[],
    updating: false,
    updateSuccess: false,
    totalItems: 0
};

export type nhomDeTaiState = Readonly<typeof initialState>;

// Reducer
export default (state: nhomDeTaiState = initialState, action): nhomDeTaiState => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_NHOM_DE_TAI):
        case REQUEST(ACTION_TYPES.LAY_NHOM_DE_TAI):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                loading: true
            };
        case REQUEST(ACTION_TYPES.TAO_NHOM_DE_TAI):
        case REQUEST(ACTION_TYPES.CAP_NHAT_NHOM_DE_TAI):
        case REQUEST(ACTION_TYPES.XOA_NHOM_DE_TAI):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                updating: true
            };
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_NHOM_DE_TAI):
        case FAILURE(ACTION_TYPES.TAO_NHOM_DE_TAI):
        case FAILURE(ACTION_TYPES.CAP_NHAT_NHOM_DE_TAI):
        case FAILURE(ACTION_TYPES.XOA_NHOM_DE_TAI):
            return {
                ...state,
                loading: false,
                updating: false,
                updateSuccess: false,
                errorMessage: action.payload
            };
        case SUCCESS(ACTION_TYPES.LAY_DANH_SACH_NHOM_DE_TAI):
            return {
                ...state,
                loading: false,
                ds_nhom_de_tai: action.payload.data,
                totalItems: action.payload.headers['x-total-count']
            };
        case SUCCESS(ACTION_TYPES.LAY_NHOM_DE_TAI):
            return {
                ...state,
                loading: false,
                nhom_de_tai: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.TAO_NHOM_DE_TAI):
        case SUCCESS(ACTION_TYPES.CAP_NHAT_NHOM_DE_TAI):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                nhom_de_tai: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.XOA_NHOM_DE_TAI):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                nhom_de_tai: defaultValueINhomDeTai
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
export const getDanhSachNhomDeTai: ICrudGetAllAction<INhomDeTai> = () => {
    const requestUrl = `${apiUrl}nhom-de-tai/lay-danh-sach-nhom-de-tai`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_NHOM_DE_TAI,
        payload: axios.get(requestUrl)
    };
};

export const getDanhSachNhomDeTaiTheoTen: ICrudGetSomeAction1<INhomDeTai> = name => {
    const requestUrl = `${apiUrl}nhom-de-tai/lay-danh-sach-nhom-de-tai-theo-ten`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_NHOM_DE_TAI,
        payload: axios.get<INhomDeTai>(requestUrl, { params: { nhomDeTai: name } })
    };
};

export const getNhomDeTai: ICrudGetAction<INhomDeTai> = manhomdetai => {
    const requestUrl = `${apiUrl}nhom-de-tai/lay-nhom-de-tai`;
    return {
        type: ACTION_TYPES.LAY_NHOM_DE_TAI,
        payload: axios.get<INhomDeTai>(requestUrl, { params : { maNhomDeTai: manhomdetai } })
    };
};

export const addNhomDeTai: ICrudPutAction<INhomDeTai> = nhomdetai => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.TAO_NHOM_DE_TAI,
        payload: axios.post(`${apiUrl}nhom-de-tai/them-moi-nhom-de-tai`, nhomdetai)
    });
    dispatch(getDanhSachNhomDeTai());
    return result;
};

export const updateNhomDeTai: ICrudPutAction<INhomDeTai> = nhomdetai => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.CAP_NHAT_NHOM_DE_TAI,
        payload: axios.post(`${apiUrl}nhom-de-tai/cap-nhat-nhom-de-tai`, nhomdetai)
    });
    dispatch(getDanhSachNhomDeTai());
    return result;
};

export const deleteNhomDeTai: ICrudDeleteAction<INhomDeTai> = manhomdetai => async dispatch => {
    const requestUrl = `${apiUrl}nhom-de-tai/xoa`;
    const result = await dispatch({
        type: ACTION_TYPES.XOA_NHOM_DE_TAI,
        payload: axios.delete(requestUrl, { params: { maNhomDeTai: manhomdetai } })
    });
    dispatch(getDanhSachNhomDeTai());
    return result;
};

export const reset = () => ({
    type: ACTION_TYPES.RESET
});
