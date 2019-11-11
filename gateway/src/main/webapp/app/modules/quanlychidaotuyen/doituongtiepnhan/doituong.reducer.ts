import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudGetSomeAction1, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IDoiTuong, defaultValue } from './doituong.model';

export const ACTION_TYPES = {
    LAY_DANH_SACH: 'DoiTuong/LAY_DANH_SACH',
    LAY_DOI_TUONG: 'DoiTuong/LAY_DOI_TUONG',
    TAO_DOI_TUONG: 'DoiTuong/TAO_DOI_TUONG',
    CAP_NHAT_DOI_TUONG: 'DoiTuong/CAP_NHAT_DOI_TUONG',
    XOA_DOI_TUONG: 'DoiTuong/XOA_DOI_TUONG',
    RESET: 'DoiTuong/RESET'
};

const initialState = {
    loading: false,
    errorMessage: null,
    ds_doi_tuong: [] as ReadonlyArray<IDoiTuong>,
    authorities: [] as any[],
    doi_tuong: defaultValue,
    updating: false,
    updateSuccess: false,
    totalItems: 0
};

export type doiTuongState = Readonly<typeof initialState>;

// Reducer
export default (state: doiTuongState = initialState, action): doiTuongState => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH):
        case REQUEST(ACTION_TYPES.LAY_DOI_TUONG):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                loading: true
            };
        case REQUEST(ACTION_TYPES.TAO_DOI_TUONG):
        case REQUEST(ACTION_TYPES.CAP_NHAT_DOI_TUONG):
        case REQUEST(ACTION_TYPES.XOA_DOI_TUONG):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                updating: true
            };
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH):
        case FAILURE(ACTION_TYPES.LAY_DOI_TUONG):
        case FAILURE(ACTION_TYPES.TAO_DOI_TUONG):
        case FAILURE(ACTION_TYPES.CAP_NHAT_DOI_TUONG):
        case FAILURE(ACTION_TYPES.XOA_DOI_TUONG):
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
                ds_doi_tuong: action.payload.data,
                totalItems: action.payload.headers['x-total-count']
            };
        case SUCCESS(ACTION_TYPES.LAY_DOI_TUONG):
            return {
                ...state,
                loading: false,
                doi_tuong: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.TAO_DOI_TUONG):
        case SUCCESS(ACTION_TYPES.CAP_NHAT_DOI_TUONG):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                doi_tuong: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.XOA_DOI_TUONG):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                doi_tuong: defaultValue
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
export const layDanhSachDoiTuong: ICrudGetAllAction<IDoiTuong> = (page, size, sort) => {
    const requestUrl = `${apiUrl}doi-tuong/lay-danh-sach-doi-tuong${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH,
        payload: axios.get<IDoiTuong>(requestUrl)
    };
};

export const layDanhSachDoiTuongTheoTen: ICrudGetSomeAction1<IDoiTuong> = name => {
    const requestUrl = `${apiUrl}doi-tuong/lay-danh-sach-doi-tuong-theo-ten`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH,
        payload: axios.get<IDoiTuong>(requestUrl, { params: { tenDoiTuong: name } })
    };
};

export const layDoiTuong: ICrudGetAction<IDoiTuong> = madoituong => {
    const requestUrl = `${apiUrl}doi-tuong/lay-doi-tuong`;
    return {
        type: ACTION_TYPES.LAY_DOI_TUONG,
        payload: axios.get<IDoiTuong>(requestUrl, { params : { ma_doi_tuong: madoituong } })
    };
};

export const themMoiDoiTuong: ICrudPutAction<IDoiTuong> = doituong => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.TAO_DOI_TUONG,
        payload: axios.post(`${apiUrl}doi-tuong/them-moi-doi-tuong`, doituong)
    });
    dispatch(layDanhSachDoiTuong());
    return result;
};

export const capNhatDoiTuong: ICrudPutAction<IDoiTuong> = doituong => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.CAP_NHAT_DOI_TUONG,
        payload: axios.post(`${apiUrl}doi-tuong/cap-nhat-doi-tuong`, doituong)
    });
    dispatch(layDanhSachDoiTuong());
    return result;
};

export const xoaDoiTuong: ICrudDeleteAction<IDoiTuong> = madoituong => async dispatch => {
    const requestUrl = `${apiUrl}doi-tuong/xoa`;
    const result = await dispatch({
        type: ACTION_TYPES.XOA_DOI_TUONG,
        payload: axios.delete(requestUrl, { params: { ma_doi_tuong: madoituong } })
    });
    dispatch(layDanhSachDoiTuong());
    return result;
};

export const reset = () => ({
    type: ACTION_TYPES.RESET
});
