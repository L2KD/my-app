import axios from 'axios';
import { ICrudGetAction, ICrudGetSomeAction1, ICrudGetAllAction, ICrudGetSomeAction3Params, ICrudGetSomeAction4Params,
    ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IXetDuyetDeCuong, defaultValueXetDuyetDeCuong } from 'app/modules/quanlynghiencuukhoahoc/xetduyetdecuong/xetduyetdecuong.model';
import { IDonVi, ITinhThanh } from 'app/modules/quanlychidaotuyen/kehoach/kehoach.model';

export const ACTION_TYPES = {
    LAY_DANH_SACH_XET_DUYET_DE_CUONG: 'XetDuyetDeCuong/LAY_DANH_SACH_XET_DUYET_DE_CUONG',
    LAY_DANH_SACH_TINH_THANH: 'XetDuyetDeCuong/LAY_DANH_SACH_TINH_THANH',
    LAY_DANH_SACH_DON_VI: 'XetDuyetDeCuong/LAY_DANH_SACH_DON_VI',
    LAY_XET_DUYET_DE_CUONG: 'XetDuyetDeCuong/LAY_XET_DUYET_DE_CUONG',
    CAP_NHAT_XET_DUYET_DE_CUONG: 'XetDuyetDeCuong/CAP_NHAT_XET_DUYET_DE_CUONG',
    RESET: 'XetDuyetDeCuong/RESET'
};

const initialState = {
    ds_xet_duyet_de_cuong: [] as ReadonlyArray<IXetDuyetDeCuong>,
    ds_tinh_thanh: [] as ReadonlyArray<ITinhThanh>,
    ds_don_vi: [] as ReadonlyArray<IDonVi>,
    xet_duyet_de_cuong: defaultValueXetDuyetDeCuong,
    cbx_maTinhThanh: '',
    cbx_maDonVi: '',
    cbx_nam: '',
    cbx_trangThai: '',
    loading: false,
    errorMessage: null,
    authorities: [] as any[],
    updating: false,
    updateSuccess: false,
    totalItems: 0
};

export type xetDuyetDeCuongState = Readonly<typeof initialState>;

// Reducer
export default (state: xetDuyetDeCuongState = initialState, action): xetDuyetDeCuongState => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_XET_DUYET_DE_CUONG):
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_TINH_THANH):
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_DON_VI):
        case REQUEST(ACTION_TYPES.LAY_XET_DUYET_DE_CUONG):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                loading: true
            };
        case REQUEST(ACTION_TYPES.CAP_NHAT_XET_DUYET_DE_CUONG):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                updating: true
            };
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_XET_DUYET_DE_CUONG):
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_TINH_THANH):
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_DON_VI):
        case FAILURE(ACTION_TYPES.CAP_NHAT_XET_DUYET_DE_CUONG):
            return {
                ...state,
                loading: false,
                updating: false,
                updateSuccess: false,
                errorMessage: action.payload
            };
        case SUCCESS(ACTION_TYPES.LAY_DANH_SACH_XET_DUYET_DE_CUONG):
            return {
                ...state,
                loading: false,
                ds_xet_duyet_de_cuong: action.payload.data,
                totalItems: action.payload.headers['x-total-count'],
                // cbx_maTinhThanh: action.tinhthanh1,
                cbx_maDonVi: action.donvi1,
                cbx_nam: action.nam1,
                cbx_trangThai: action.trangthai1
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
                ds_don_vi: action.payload.data,
                cbx_maTinhThanh: action.tinhthanh1
            };
        case SUCCESS(ACTION_TYPES.LAY_XET_DUYET_DE_CUONG):
            return {
                ...state,
                loading: false,
                xet_duyet_de_cuong: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.CAP_NHAT_XET_DUYET_DE_CUONG):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                xet_duyet_de_cuong: action.payload.data
            };
        case ACTION_TYPES.RESET:
            return {
                ...initialState
            };
        default:
            return state;
    }
};

// const tt = null;
// const dv = null;
// const nam = null;
// const trt = null;

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
        tinhthanh1: tinhthanh.toString(),
        type: ACTION_TYPES.LAY_DANH_SACH_DON_VI,
        payload: axios.get(requestUrl, { params : { ma_tinh_thanh: tinhthanh } })
    };
};

export const getDanhSachXetDuyetDeCuong: ICrudGetSomeAction3Params<IXetDuyetDeCuong> = (donvi, namxd, trangthai) => {
    const requestUrl = `${apiUrl}xet-duyet-de-cuong/lay-danh-sach-xet-duyet-de-cuong`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_XET_DUYET_DE_CUONG,
        payload: axios.get(requestUrl, { params : { donVi: donvi, nam: namxd, trangThai: trangthai } }),
        donvi1: donvi,
        nam1: namxd,
        trangthai1: trangthai
    };
};

export const getDanhSachXetDuyetDeCuongTheoTen_DonVi_Nam_TrangThai: ICrudGetSomeAction4Params<IXetDuyetDeCuong> = (detai, donvi, _nam, trangthai) => {
    const requestUrl = `${apiUrl}xet-duyet-de-cuong/lay-danh-sach-xet-duyet-de-cuong-theo-ten-don-vi-nam-trang-thai`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_XET_DUYET_DE_CUONG,
        payload: axios.get<IXetDuyetDeCuong>(requestUrl, { params : { tenDeTai: detai, donVi: donvi, nam: _nam, trangThai: trangthai } })
    };
};

export const getXetDuyetDeCuong: ICrudGetAction<IXetDuyetDeCuong> = madetai => {
    const requestUrl = `${apiUrl}xet-duyet-de-cuong/lay-xet-duyet-de-cuong`;
    return {
        type: ACTION_TYPES.LAY_XET_DUYET_DE_CUONG,
        payload: axios.get<IXetDuyetDeCuong>(requestUrl, { params : { maDeTai: madetai } })
    };
};

export const updateXetDuyetDeCuong = (madetai, donvi, nam, trangthai) => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.CAP_NHAT_XET_DUYET_DE_CUONG,
        payload: axios.post(`${apiUrl}xet-duyet-de-cuong/cap-nhat-xet-duyet-de-cuong`, madetai)
    });
    dispatch(getDanhSachXetDuyetDeCuong(donvi, nam, trangthai));
    return result;
};

export const uploadDeCuongXetDuyetDeCuong = data => {
    const requestUrl = `${apiUrl}xet-duyet-de-cuong/upload-de-cuong-xet-duyet-de-cuong`;
    return axios.post(requestUrl, data);
};

export const uploadBienBanXetDuyetDeCuong = data => {
    const requestUrl = `${apiUrl}xet-duyet-de-cuong/upload-bien-ban-xet-duyet-de-cuong`;
    return axios.post(requestUrl, data);
};

export const downloadXetDuyetDeCuong = filename => {
    const requestUrl = `${apiUrl}xet-duyet-de-cuong/download-de-cuong-xet-duyet-de-cuong`;
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
};
export const downloadXetDuyetBienBanDeCuong = filename => {
    const requestUrl = `${apiUrl}xet-duyet-de-cuong/download-bien-ban-xet-duyet-de-cuong`;
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
};

export const reset = () => ({
    type: ACTION_TYPES.RESET
});
