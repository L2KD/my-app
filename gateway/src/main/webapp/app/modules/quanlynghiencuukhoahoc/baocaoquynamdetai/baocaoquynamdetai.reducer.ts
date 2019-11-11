import axios from 'axios';
import { ICrudGetAction, ICrudGetSomeAction1, ICrudGetAllAction, ICrudGetSomeAction3Params,
    ICrudGetSomeAction4Params, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IBaoCaoQuyNamDeTai,
    defaultValueBaoCaoQuyNamDeTai } from 'app/modules/quanlynghiencuukhoahoc/baocaoquynamdetai/baocaoquynamdetai.model';
import { IDonVi, ITinhThanh } from 'app/modules/quanlychidaotuyen/kehoach/kehoach.model';

export const ACTION_TYPES = {
    LAY_DANH_SACH_BAO_CAO_QUY_NAM_DE_TAI: 'BaoCaoQuyNamDeTai/LAY_DANH_SACH_BIEN_BAN_KE_HOACH_DE_TAIUNG_DUNG_CHO_DON_VI',
    LAY_DANH_SACH_TINH_THANH: 'BaoCaoQuyNamDeTai/LAY_DANH_SACH_TINH_THANH',
    LAY_DANH_SACH_DON_VI: 'BaoCaoQuyNamDeTai/LAY_DANH_SACH_DON_VI',
    LAY_BAO_CAO_QUY_NAM_DE_TAI: 'BaoCaoQuyNamDeTai/LAY_BIEN_BAN_KE_HOACH_DE_TAIUNG_DUNG_CHO_DON_VI',
    CAP_NHAT_BAO_CAO_QUY_NAM_DE_TAI: 'BaoCaoQuyNamDeTai/CAP_NHAT_BIEN_BAN_KE_HOACH_DE_TAIUNG_DUNG_CHO_DON_VI',
    RESET: 'BaoCaoQuyNamDeTai/RESET',
    RESETALL: 'BaoCaoQuyNamDeTai/RESETALL'
};

const initialState = {
    ds_bao_cao_quy_nam_de_tai: [] as ReadonlyArray<IBaoCaoQuyNamDeTai>,
    ds_tinh_thanh: [] as ReadonlyArray<ITinhThanh>,
    ds_don_vi: [] as ReadonlyArray<IDonVi>,
    bao_cao_quy_nam_de_tai: defaultValueBaoCaoQuyNamDeTai,
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

export type baoCaoQuyNamDeTaiState = Readonly<typeof initialState>;

// Reducer
export default (state: baoCaoQuyNamDeTaiState = initialState, action): baoCaoQuyNamDeTaiState => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_BAO_CAO_QUY_NAM_DE_TAI):
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_TINH_THANH):
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_DON_VI):
        case REQUEST(ACTION_TYPES.LAY_BAO_CAO_QUY_NAM_DE_TAI):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                loading: true
            };
        case REQUEST(ACTION_TYPES.CAP_NHAT_BAO_CAO_QUY_NAM_DE_TAI):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                updating: true
            };
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_BAO_CAO_QUY_NAM_DE_TAI):
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_TINH_THANH):
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_DON_VI):
        case FAILURE(ACTION_TYPES.CAP_NHAT_BAO_CAO_QUY_NAM_DE_TAI):
            return {
                ...state,
                loading: false,
                updating: false,
                updateSuccess: false,
                errorMessage: action.payload
            };
        case SUCCESS(ACTION_TYPES.LAY_DANH_SACH_BAO_CAO_QUY_NAM_DE_TAI):
            return {
                ...state,
                loading: false,
                ds_bao_cao_quy_nam_de_tai: action.payload.data,
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
        case SUCCESS(ACTION_TYPES.LAY_BAO_CAO_QUY_NAM_DE_TAI):
            return {
                ...state,
                loading: false,
                bao_cao_quy_nam_de_tai: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.CAP_NHAT_BAO_CAO_QUY_NAM_DE_TAI):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                bao_cao_quy_nam_de_tai: action.payload.data
            };
        case ACTION_TYPES.RESET:
            return {
                ...initialState
            };
        case ACTION_TYPES.RESETALL:
            return {
                ...initialState,
                ds_bao_cao_quy_nam_de_tai: []
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

export const getDanhSachBaoCaoQuyNamDeTai: ICrudGetSomeAction3Params<IBaoCaoQuyNamDeTai> = (donvi, namxd, trangthai) => {
    const requestUrl = `${apiUrl}bao-cao-quy-nam-de-tai/lay-danh-sach-bao-cao-quy-nam-de-tai`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_BAO_CAO_QUY_NAM_DE_TAI,
        payload: axios.get(requestUrl, { params : { donVi: donvi, nam: namxd, trangThai: trangthai } })
    };
};

export const getDanhSachBaoCaoQuyNamDeTaiTheoTen_DonVi_Nam_TrangThai: ICrudGetSomeAction4Params<IBaoCaoQuyNamDeTai> = (detai, donvi, _nam, trangthai) => {
    const requestUrl = `${apiUrl}bao-cao-quy-nam-de-tai/lay-danh-sach-bao-cao-quy-nam-de-tai-theo-ten-don-vi-nam-trang-thai`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_BAO_CAO_QUY_NAM_DE_TAI,
        payload: axios.get<IBaoCaoQuyNamDeTai>(requestUrl, { params : { tenDeTai: detai, donVi: donvi, nam: _nam, trangThai: trangthai } })
    };
};

export const getBaoCaoQuyNamDeTai: ICrudGetAction<IBaoCaoQuyNamDeTai> = detai => {
    const requestUrl = `${apiUrl}bao-cao-quy-nam-de-tai/lay-bao-cao-quy-nam-de-tai`;
    return {
        type: ACTION_TYPES.LAY_BAO_CAO_QUY_NAM_DE_TAI,
        payload: axios.get(requestUrl, { params : { maDeTai: detai } })
    };
};

export const updateBaoCaoQuyNamDeTai = (detai, donvi, nam, trangthai) => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.CAP_NHAT_BAO_CAO_QUY_NAM_DE_TAI,
        payload: axios.post(`${apiUrl}bao-cao-quy-nam-de-tai/cap-nhat-bao-cao-quy-nam-de-tai`, detai)
    });
    dispatch(getDanhSachBaoCaoQuyNamDeTai(donvi, nam, trangthai));
    return result;
};

export const uploadTapTinBaoCaoQuyNamDeTaiQuy1 = data => {
    const requestUrl = `${apiUrl}bao-cao-quy-nam-de-tai/upload-bao-cao-quy-nam-de-tai-quy-1`;
    return axios.post(requestUrl, data);
};

export const uploadTapTinBaoCaoQuyNamDeTaiQuy2 = data => {
    const requestUrl = `${apiUrl}bao-cao-quy-nam-de-tai/upload-bao-cao-quy-nam-de-tai-quy-2`;
    return axios.post(requestUrl, data);
};

export const uploadTapTinBaoCaoQuyNamDeTaiQuy3 = data => {
    const requestUrl = `${apiUrl}bao-cao-quy-nam-de-tai/upload-bao-cao-quy-nam-de-tai-quy-3`;
    return axios.post(requestUrl, data);
};

export const uploadTapTinBaoCaoQuyNamDeTaiQuy4 = data => {
    const requestUrl = `${apiUrl}bao-cao-quy-nam-de-tai/upload-bao-cao-quy-nam-de-tai-quy-4`;
    return axios.post(requestUrl, data);
};

export const uploadTapTinBaoCaoQuyNamDeTaiNam = data => {
    const requestUrl = `${apiUrl}bao-cao-quy-nam-de-tai/upload-bao-cao-quy-nam-de-tai-nam`;
    return axios.post(requestUrl, data);
};

export const reset = () => ({
    type: ACTION_TYPES.RESET
});

export const resetall = () => ({
    type: ACTION_TYPES.RESETALL
});
