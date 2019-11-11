import axios from 'axios';
import { ICrudGetSomeAction1, IXoaVaTraVeDanhSach2Params, ICrudGetSomeAction2Params, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { ILoaiCDT, IDanhGia, defaultValue, defaultValueLoai } from './danhgia.model';

export const ACTION_TYPES = {
    LAY_DANH_SACH_DANH_GIA: 'DanhGia/LAY_DANH_SACH_DANH_GIA',
    LAY_DANH_SACH_LOAI: 'DanhGia/LAY_DANH_SACH_LOAI',
    LAY_LOAI_CDT: 'DanhGia/LAY_LOAI_CDT',
    LAY_DANH_GIA: 'DanhGia/LAY_DANH_GIA',
    TAO_DANH_GIA: 'DanhGia/TAO_DANH_GIA',
    CAP_NHAT_DANH_GIA: 'DanhGia/CAP_NHAT_DANH_GIA',
    XOA_DANH_GIA: 'DanhGia/XOA_DANH_GIA',
    RESET: 'DanhGia/RESET'
};

const initialState = {
    loading: false,
    errorMessage: null,
    ds_danh_gia: [] as ReadonlyArray<IDanhGia>,
    ds_loai_cdt: [] as ReadonlyArray<ILoaiCDT>,
    loai_cdt: defaultValueLoai,
    authorities: [] as any[],
    danh_gia: defaultValue,
    updating: false,
    updateSuccess: false,
    totalItems: 0
};

export type danhGiaState = Readonly<typeof initialState>;

// Reducer
export default (state: danhGiaState = initialState, action): danhGiaState => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_DANH_GIA):
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_LOAI):
        case REQUEST(ACTION_TYPES.LAY_DANH_GIA):
        case REQUEST(ACTION_TYPES.LAY_LOAI_CDT):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                loading: true
            };
        case REQUEST(ACTION_TYPES.TAO_DANH_GIA):
        case REQUEST(ACTION_TYPES.CAP_NHAT_DANH_GIA):
        case REQUEST(ACTION_TYPES.XOA_DANH_GIA):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                updating: true
            };
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_DANH_GIA):
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_LOAI):
        case FAILURE(ACTION_TYPES.LAY_DANH_GIA):
        case FAILURE(ACTION_TYPES.LAY_LOAI_CDT):
        case FAILURE(ACTION_TYPES.TAO_DANH_GIA):
        case FAILURE(ACTION_TYPES.CAP_NHAT_DANH_GIA):
        case FAILURE(ACTION_TYPES.XOA_DANH_GIA):
            return {
                ...state,
                loading: false,
                updating: false,
                updateSuccess: false,
                errorMessage: action.payload
            };
        case SUCCESS(ACTION_TYPES.LAY_DANH_SACH_DANH_GIA):
            return {
                ...state,
                loading: false,
                ds_danh_gia: action.payload.data,
                totalItems: action.payload.headers['x-total-count']
            };
        case SUCCESS(ACTION_TYPES.LAY_DANH_SACH_LOAI):
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
                loai_cdt: action.payload.data,
                totalItems: action.payload.headers['x-total-count']
            };
        case SUCCESS(ACTION_TYPES.LAY_DANH_GIA):
            return {
                ...state,
                loading: false,
                danh_gia: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.TAO_DANH_GIA):
        case SUCCESS(ACTION_TYPES.CAP_NHAT_DANH_GIA):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                danh_gia: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.XOA_DANH_GIA):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                danh_gia: defaultValue
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

export const layDanhSachLoaiCDTDanhGia: ICrudGetAllAction<ILoaiCDT> = () => {
    const requestUrl = `${apiUrl}danh-gia/lay-danh-sach-loai-cdt-danh-gia`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_LOAI,
        payload: axios.get(requestUrl)
    };
};
export const layLoaiCDTDanhGia: ICrudGetAction<ILoaiCDT> = maloaicdt => {
    const requestUrl = `${apiUrl}danh-gia/lay-loai-cdt`;
    return {
        type: ACTION_TYPES.LAY_LOAI_CDT,
        payload: axios.get<ILoaiCDT>(requestUrl, { params : { ma_loai_cdt: maloaicdt } })
    };
};

export const layDanhSachDanhGia: ICrudGetSomeAction1<IDanhGia> = loaicdt => {
    const requestUrl = `${apiUrl}danh-gia/lay-danh-sach-danh-gia-theo-loai`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_DANH_GIA,
        payload: axios.get<IDanhGia>(requestUrl, { params : { loai_cdt: loaicdt } })
    };
};

export const layDanhSachDanhGiaTheoTenVaLoai: ICrudGetSomeAction2Params<IDanhGia> = (name, loaicdt) => {
    const requestUrl = `${apiUrl}danh-gia/lay-danh-sach-danh-gia-theo-ten-va-loai`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_DANH_GIA,
        payload: axios.get<IDanhGia>(requestUrl, { params: { tenDanhGia: name, maLoaiCDT: loaicdt } })
    };
};

// export const layDanhSachDanhGia1: ICrudGetSomeAction1<IDanhGia> = loaicdt => {
//     const requestUrl = `${apiUrl}danh-gia/lay-danh-sach-danh-gia-theo-loai`;
//     return {
//         type: ACTION_TYPES.LAY_DANH_SACH_DANH_GIA,
//         payload: axios.get<IDanhGia>(requestUrl, { params : { loai_cdt: loaicdt } })
//     };
// };

export const layDanhGia: ICrudGetAction<IDanhGia> = madanhgia => {
    const requestUrl = `${apiUrl}danh-gia/lay-danh-gia`;
    return {
        type: ACTION_TYPES.LAY_DANH_GIA,
        payload: axios.get<IDanhGia>(requestUrl, { params : { ma_danh_gia: madanhgia } })
    };
};

export const themMoiDanhGia: ICrudPutAction<IDanhGia> = danhgia => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.TAO_DANH_GIA,
        payload: axios.post(`${apiUrl}danh-gia/them-moi-danh-gia`, danhgia)
    });
    dispatch(layDanhSachDanhGia(danhgia.loai_cdt));
    return result;
};

export const capNhatDanhGia: ICrudPutAction<IDanhGia> = danhgia => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.CAP_NHAT_DANH_GIA,
        payload: axios.post(`${apiUrl}danh-gia/cap-nhat-danh-gia`, danhgia)
    });
      dispatch(layDanhSachDanhGia(danhgia.loai_cdt));
    return result;
};

export const xoaDanhGia: ICrudDeleteAction<IDanhGia> = madanhgia => async dispatch => {
    const requestUrl = `${apiUrl}danh-gia/xoa`;
    const result = await dispatch({
        type: ACTION_TYPES.XOA_DANH_GIA,
        payload: axios.delete(requestUrl, { params: { ma_danh_gia: madanhgia } })
    });
    dispatch(layDanhSachDanhGia());
    return result;
};

export const xoaDanhGiaVaTraVeDanhSach: IXoaVaTraVeDanhSach2Params<IDanhGia> = (madanhgia, maloaicdt) => async dispatch => {
    const requestUrl = `${apiUrl}danh-gia/xoa`;
    const result = await dispatch({
        type: ACTION_TYPES.XOA_DANH_GIA,
        payload: axios.delete(requestUrl, { params: { ma_danh_gia: madanhgia } })
    });
    dispatch(layDanhSachDanhGia(maloaicdt));
    return result;
};

export const reset = () => ({
    type: ACTION_TYPES.RESET
});
