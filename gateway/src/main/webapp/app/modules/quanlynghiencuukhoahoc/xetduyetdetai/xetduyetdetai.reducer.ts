import axios from 'axios';
import { ICrudGetAction, ICrudGetSomeAction1, ICrudGetAllAction, ICrudGetSomeAction3Params, ICrudGetSomeAction4Params, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IXetDuyetDeTai, defaultValueXetDuyetDeTai } from 'app/modules/quanlynghiencuukhoahoc/xetduyetdetai/xetduyetdetai.model';
import { IDonVi, ITinhThanh } from 'app/modules/quanlychidaotuyen/kehoach/kehoach.model';

export const ACTION_TYPES = {
    LAY_DANH_SACH_XET_DUYET_DE_TAI: 'XetDuyetDeTai/LAY_DANH_SACH_XET_DUYET_DE_TAI',
    LAY_DANH_SACH_TINH_THANH: 'XetDuyetDeTai/LAY_DANH_SACH_TINH_THANH',
    LAY_DANH_SACH_DON_VI: 'XetDuyetDeTai/LAY_DANH_SACH_DON_VI',
    LAY_XET_DUYET_DE_TAI: 'XetDuyetDeTai/LAY_XET_DUYET_DE_TAI',
    CAP_NHAT_XET_DUYET_DE_TAI: 'XetDuyetDeTai/CAP_NHAT_XET_DUYET_DE_TAI',
    RESET: 'XetDuyetDeTai/RESET'
};

const initialState = {
    ds_xet_duyet_de_tai: [] as ReadonlyArray<IXetDuyetDeTai>,
    ds_tinh_thanh: [] as ReadonlyArray<ITinhThanh>,
    ds_don_vi: [] as ReadonlyArray<IDonVi>,
    xet_duyet_de_tai: defaultValueXetDuyetDeTai,
    loading: false,
    errorMessage: null,
    authorities: [] as any[],
    updating: false,
    updateSuccess: false,
    totalItems: 0
};

export type xetDuyetDeTaiState = Readonly<typeof initialState>;

// Reducer
export default (state: xetDuyetDeTaiState = initialState, action): xetDuyetDeTaiState => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_XET_DUYET_DE_TAI):
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_TINH_THANH):
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_DON_VI):
        case REQUEST(ACTION_TYPES.LAY_XET_DUYET_DE_TAI):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                loading: true
            };
        case REQUEST(ACTION_TYPES.CAP_NHAT_XET_DUYET_DE_TAI):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                updating: true
            };
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_XET_DUYET_DE_TAI):
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_TINH_THANH):
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_DON_VI):
        case FAILURE(ACTION_TYPES.CAP_NHAT_XET_DUYET_DE_TAI):
            return {
                ...state,
                loading: false,
                updating: false,
                updateSuccess: false,
                errorMessage: action.payload
            };
        case SUCCESS(ACTION_TYPES.LAY_DANH_SACH_XET_DUYET_DE_TAI):
            return {
                ...state,
                loading: false,
                ds_xet_duyet_de_tai: action.payload.data,
                totalItems: action.payload.headers['x-total-count']
            };
        case SUCCESS(ACTION_TYPES.LAY_DANH_SACH_TINH_THANH):
            return {
                ...state,
                loading: false,
                ds_tinh_thanh: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.LAY_DANH_SACH_DON_VI):
            return {
                ...state,
                loading: false,
                ds_don_vi: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.LAY_XET_DUYET_DE_TAI):
            return {
                ...state,
                loading: false,
                xet_duyet_de_tai: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.CAP_NHAT_XET_DUYET_DE_TAI):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                xet_duyet_de_tai: action.payload.data
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
export const getDanhSachTinhThanh: ICrudGetAllAction<ITinhThanh> = () => {
    const requestUrl = `${apiUrl}van-ban/lay-danh-sach-tinh-thanh`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_TINH_THANH,
        payload: axios.get(requestUrl)
    };
};

export const getDanhSachDonVi: ICrudGetSomeAction1<IDonVi> = tinhthanh => {
    const requestUrl = `${apiUrl}van-ban/lay-danh-sach-don-vi-theo-tinh`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_DON_VI,
        payload: axios.get(requestUrl, { params : { ma_tinh_thanh: tinhthanh } })
    };
};

export const getDanhSachXetDuyetDeTai: ICrudGetSomeAction3Params<IXetDuyetDeTai> = (donvi, namxd, trangthai) => {
    const requestUrl = `${apiUrl}xet-duyet-de-tai/lay-danh-sach-xet-duyet-de-tai`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_XET_DUYET_DE_TAI,
        payload: axios.get(requestUrl, { params : { donVi: donvi, nam: namxd, trangThai: trangthai } })
    };
};

export const getDanhSachXetDuyetDeTaiTheoTen_DonVi_Nam_TrangThai: ICrudGetSomeAction4Params<IXetDuyetDeTai> = (detai, donvi, _nam, trangthai) => {
    const requestUrl = `${apiUrl}xet-duyet-de-tai/lay-danh-sach-xet-duyet-de-tai-theo-ten-don-vi-nam-trang-thai`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_XET_DUYET_DE_TAI,
        payload: axios.get<IXetDuyetDeTai>(requestUrl, { params : { tenDeTai: detai, donVi: donvi, nam: _nam, trangThai: trangthai } })
    };
};

export const getXetDuyetDeTai: ICrudGetAction<IXetDuyetDeTai> = maxetduyetdetai => {
    const requestUrl = `${apiUrl}xet-duyet-de-tai/lay-xet-duyet-de-tai`;
    return {
        type: ACTION_TYPES.LAY_XET_DUYET_DE_TAI,
        payload: axios.get<IXetDuyetDeTai>(requestUrl, { params : { maDeTai: maxetduyetdetai } })
    };
};

export const updateXetDuyetDeTai = (xetduyetdetai, donvi, nam, trangthai) => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.CAP_NHAT_XET_DUYET_DE_TAI,
        payload: axios.post(`${apiUrl}xet-duyet-de-tai/cap-nhat-xet-duyet-de-tai`, xetduyetdetai)
    });
    dispatch(getDanhSachXetDuyetDeTai(donvi, nam, trangthai));
    return result;
};

export const uploadXetDuyetDeTai = data => {
    const requestUrl = `${apiUrl}xet-duyet-de-tai/upload-xet-duyet-de-tai`;
    return axios.post(requestUrl, data);
};

export const downloadXetDuyetDeTai = filename => {
    const requestUrl = `${apiUrl}xet-duyet-de-tai/download-xet-duyet-de-tai`;
    return {
        // type: ACTION_TYPES.IN_DS_THONG_KE,
        payload: axios.get(requestUrl, { params: { tap_tin: filename }, responseType: 'blob' }).then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
        })
    };
}

export const reset = () => ({
    type: ACTION_TYPES.RESET
});
