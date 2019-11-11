import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudGetSomeAction1, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { INoiDung, defaultValue } from './noidung.model';

export const ACTION_TYPES = {
    LAY_DANH_SACH: 'NoiDung/LAY_DANH_SACH',
    LAY_NOI_DUNG: 'NoiDung/LAY_NOI_DUNG',
    TAO_NOI_DUNG: 'NoiDung/TAO_NOI_DUNG',
    CAP_NHAT_NOI_DUNG: 'NoiDung/CAP_NHAT_NOI_DUNG',
    XOA_NOI_DUNG: 'NoiDung/XOA_NOI_DUNG',
    RESET: 'NoiDung/RESET'
};

const initialState = {
    loading: false,
    errorMessage: null,
    ds_noi_dung: [] as ReadonlyArray<INoiDung>,
    authorities: [] as any[],
    noi_dung: defaultValue,
    updating: false,
    updateSuccess: false,
    totalItems: 0
};

export type noiDungState = Readonly<typeof initialState>;

// Reducer
export default (state: noiDungState = initialState, action): noiDungState => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH):
        case REQUEST(ACTION_TYPES.LAY_NOI_DUNG):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                loading: true
            };
        case REQUEST(ACTION_TYPES.TAO_NOI_DUNG):
        case REQUEST(ACTION_TYPES.CAP_NHAT_NOI_DUNG):
        case REQUEST(ACTION_TYPES.XOA_NOI_DUNG):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                updating: true
            };
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH):
        case FAILURE(ACTION_TYPES.LAY_NOI_DUNG):
        case FAILURE(ACTION_TYPES.TAO_NOI_DUNG):
        case FAILURE(ACTION_TYPES.CAP_NHAT_NOI_DUNG):
        case FAILURE(ACTION_TYPES.XOA_NOI_DUNG):
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
                ds_noi_dung: action.payload.data,
                totalItems: action.payload.headers['x-total-count']
            };
        case SUCCESS(ACTION_TYPES.LAY_NOI_DUNG):
            return {
                ...state,
                loading: false,
                noi_dung: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.TAO_NOI_DUNG):
        case SUCCESS(ACTION_TYPES.CAP_NHAT_NOI_DUNG):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                noi_dung: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.XOA_NOI_DUNG):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                noi_dung: defaultValue
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
export const layDanhSachNoiDung: ICrudGetAllAction<INoiDung> = (page, size, sort) => {
    const requestUrl = `${apiUrl}noi-dung/lay-danh-sach-noi-dung${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH,
        payload: axios.get<INoiDung>(requestUrl)
    };
};

export const layDanhSachNoiDungTheoTen: ICrudGetSomeAction1<INoiDung> = name => {
    const requestUrl = `${apiUrl}noi-dung/lay-danh-sach-noi-dung-theo-ten`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH,
        payload: axios.get<INoiDung>(requestUrl, { params: { noiDung: name } })
    };
};

export const layNoiDung: ICrudGetAction<INoiDung> = manoidung => {
    const requestUrl = `${apiUrl}noi-dung/lay-noi-dung`;
    return {
        type: ACTION_TYPES.LAY_NOI_DUNG,
        payload: axios.get<INoiDung>(requestUrl, { params : { ma_noi_dung: manoidung } })
    };
};

export const themMoiNoiDung: ICrudPutAction<INoiDung> = noidung => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.TAO_NOI_DUNG,
        payload: axios.post(`${apiUrl}noi-dung/them-moi-noi-dung`, noidung)
    });
    dispatch(layDanhSachNoiDung());
    return result;
};

export const capNhatNoiDung: ICrudPutAction<INoiDung> = noidung => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.CAP_NHAT_NOI_DUNG,
        payload: axios.post(`${apiUrl}noi-dung/cap-nhat-noi-dung`, noidung)
    });
    dispatch(layDanhSachNoiDung());
    return result;
};

export const xoaNoiDung: ICrudDeleteAction<INoiDung> = manoidung => async dispatch => {
    const requestUrl = `${apiUrl}noi-dung/xoa`;
    const result = await dispatch({
        type: ACTION_TYPES.XOA_NOI_DUNG,
        payload: axios.delete(requestUrl, { params: { ma_noi_dung: manoidung } })
    });
    dispatch(layDanhSachNoiDung());
    return result;
};

export const reset = () => ({
    type: ACTION_TYPES.RESET
});
