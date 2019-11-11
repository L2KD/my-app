import axios from 'axios';
import { ICrudGetAction, ICrudGetSomeAction1, ICrudGetAllAction, ICrudGetSomeAction3Params,
    ICrudGetSomeAction4Params, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IXetDuyetDeTaiDonVi, defaultValueXetDuyetDeTaiDonVi } from 'app/modules/quanlynghiencuukhoahoc/xetduyetdetaidonvi/xetduyetdetaidonvi.model';
import { IDonVi, ITinhThanh } from 'app/modules/quanlychidaotuyen/kehoach/kehoach.model';

export const ACTION_TYPES = {
    LAY_DANH_SACH_XET_DUYET_DE_TAI_DON_VI: 'XetDuyetDeTaiDonVi/LAY_DANH_SACH_XET_DUYET_DE_TAI_DON_VI',
    LAY_DANH_SACH_TINH_THANH: 'XetDuyetDeTaiDonVi/LAY_DANH_SACH_TINH_THANH',
    LAY_DANH_SACH_DON_VI: 'XetDuyetDeTaiDonVi/LAY_DANH_SACH_DON_VI',
    LAY_XET_DUYET_DE_TAI_DON_VI: 'XetDuyetDeTaiDonVi/LAY_XET_DUYET_DE_TAI_DON_VI',
    CAP_NHAT_XET_DUYET_DE_TAI_DON_VI: 'XetDuyetDeTaiDonVi/CAP_NHAT_XET_DUYET_DE_TAI_DON_VI',
    RESET: 'XetDuyetDeTaiDonVi/RESET'
};

const initialState = {
    ds_xet_duyet_de_tai_don_vi: [] as ReadonlyArray<IXetDuyetDeTaiDonVi>,
    ds_tinh_thanh: [] as ReadonlyArray<ITinhThanh>,
    ds_don_vi: [] as ReadonlyArray<IDonVi>,
    xet_duyet_de_tai_don_vi: defaultValueXetDuyetDeTaiDonVi,
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

export type xetDuyetDeTaiDonViState = Readonly<typeof initialState>;

// Reducer
export default (state: xetDuyetDeTaiDonViState = initialState, action): xetDuyetDeTaiDonViState => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_XET_DUYET_DE_TAI_DON_VI):
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_TINH_THANH):
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_DON_VI):
        case REQUEST(ACTION_TYPES.LAY_XET_DUYET_DE_TAI_DON_VI):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                loading: true
            };
        case REQUEST(ACTION_TYPES.CAP_NHAT_XET_DUYET_DE_TAI_DON_VI):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                updating: true
            };
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_XET_DUYET_DE_TAI_DON_VI):
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_TINH_THANH):
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_DON_VI):
        case FAILURE(ACTION_TYPES.CAP_NHAT_XET_DUYET_DE_TAI_DON_VI):
            return {
                ...state,
                loading: false,
                updating: false,
                updateSuccess: false,
                errorMessage: action.payload
            };
        case SUCCESS(ACTION_TYPES.LAY_DANH_SACH_XET_DUYET_DE_TAI_DON_VI):
            return {
                ...state,
                loading: false,
                ds_xet_duyet_de_tai_don_vi: action.payload.data,
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
                ds_don_vi: action.payload.data,
                cbx_maTinhThanh: action.tinhthanh1
            };
        case SUCCESS(ACTION_TYPES.LAY_XET_DUYET_DE_TAI_DON_VI):
            return {
                ...state,
                loading: false,
                xet_duyet_de_tai_don_vi: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.CAP_NHAT_XET_DUYET_DE_TAI_DON_VI):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                xet_duyet_de_tai_don_vi: action.payload.data
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

export const getDanhSachXetDuyetDeTaiDonVi: ICrudGetSomeAction3Params<IXetDuyetDeTaiDonVi> = (donvi, namxd, trangthai) => {
    const requestUrl = `${apiUrl}xet-duyet-de-tai-don-vi/lay-danh-sach-xet-duyet-de-tai-don-vi`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_XET_DUYET_DE_TAI_DON_VI,
        payload: axios.get(requestUrl, { params : { donVi: donvi, nam: namxd, trangThai: trangthai } })
    };
};

export const getDanhSachXetDuyetDeTaiDonViTheoTen_DonVi_Nam_TrangThai: ICrudGetSomeAction4Params<IXetDuyetDeTaiDonVi> = (detai, donvi, _nam, trangthai) => {
    const requestUrl = `${apiUrl}xet-duyet-de-tai-don-vi/lay-danh-sach-xet-duyet-de-tai-don-vi-theo-ten-don-vi-nam-trang-thai`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_XET_DUYET_DE_TAI_DON_VI,
        payload: axios.get<IXetDuyetDeTaiDonVi>(requestUrl, { params : { tenDeTai: detai, donVi: donvi, nam: _nam, trangThai: trangthai } })
    };
};

export const getXetDuyetDeTaiDonVi: ICrudGetAction<IXetDuyetDeTaiDonVi> = madetai => {
    const requestUrl = `${apiUrl}xet-duyet-de-tai-don-vi/lay-xet-duyet-de-tai-don-vi`;
    return {
        type: ACTION_TYPES.LAY_XET_DUYET_DE_TAI_DON_VI,
        payload: axios.get<IXetDuyetDeTaiDonVi>(requestUrl, { params : { maDeTai: madetai } })
    };
};

export const updateXetDuyetDeTaiDonVi = (madetai, donvi, nam, trangthai) => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.CAP_NHAT_XET_DUYET_DE_TAI_DON_VI,
        payload: axios.post(`${apiUrl}xet-duyet-de-tai-don-vi/cap-nhat-xet-duyet-de-tai-don-vi`, madetai)
    });
    dispatch(getDanhSachXetDuyetDeTaiDonVi(donvi, nam, trangthai));
    return result;
};

export const uploadTapTinXetDuyetDeTaiDonVi = data => {
    const requestUrl = `${apiUrl}xet-duyet-de-tai-don-vi/upload-bien-ban-xet-duyet-de-tai-don-vi`;
    return axios.post(requestUrl, data);
};

export const downloadXetDuyetDeTai = filename => {
    const requestUrl = `${apiUrl}xet-duyet-de-tai-don-vi/download-bien-ban-xet-duyet-de-tai-don-vi`;
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
