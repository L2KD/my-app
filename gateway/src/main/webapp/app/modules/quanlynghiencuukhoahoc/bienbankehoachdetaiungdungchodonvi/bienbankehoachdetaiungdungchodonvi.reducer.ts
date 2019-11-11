import axios from 'axios';
import { ICrudGetAction, ICrudGetSomeAction1, ICrudGetAllAction, ICrudGetSomeAction3Params,
    ICrudGetSomeAction4Params, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IBienBanKeHoachDeTaiUngDungChoDonVi,
    defaultValueBienBanKeHoachDeTaiUngDungChoDonVi } from 'app/modules/quanlynghiencuukhoahoc/bienbankehoachdetaiungdungchodonvi/bienbankehoachdetaiungdungchodonvi.model';
import { IDonVi, ITinhThanh } from 'app/modules/quanlychidaotuyen/kehoach/kehoach.model';

export const ACTION_TYPES = {
    LAY_DANH_SACH_BIEN_BAN_KE_HOACH_DE_TAI_UNG_DUNG_CHO_DON_VI: 'BienBanKeHoachDeTaiUngDungChoDonVi/LAY_DANH_SACH_BIEN_BAN_KE_HOACH_DE_TAIUNG_DUNG_CHO_DON_VI',
    LAY_DANH_SACH_TINH_THANH: 'BienBanKeHoachDeTaiUngDungChoDonVi/LAY_DANH_SACH_TINH_THANH',
    LAY_DANH_SACH_DON_VI: 'BienBanKeHoachDeTaiUngDungChoDonVi/LAY_DANH_SACH_DON_VI',
    LAY_BIEN_BAN_KE_HOACH_DE_TAI_UNG_DUNG_CHO_DON_VI: 'BienBanKeHoachDeTaiUngDungChoDonVi/LAY_BIEN_BAN_KE_HOACH_DE_TAIUNG_DUNG_CHO_DON_VI',
    CAP_NHAT_BIEN_BAN_KE_HOACH_DE_TAI_UNG_DUNG_CHO_DON_VI: 'BienBanKeHoachDeTaiUngDungChoDonVi/CAP_NHAT_BIEN_BAN_KE_HOACH_DE_TAIUNG_DUNG_CHO_DON_VI',
    RESET: 'BienBanKeHoachDeTaiUngDungChoDonVi/RESET',
    RESETALL: 'BienBanKeHoachDeTaiUngDungChoDonVi/RESETALL'
};

const initialState = {
    ds_bien_ban_ke_hoach_de_tai_ung_dung_cho_don_vi: [] as ReadonlyArray<IBienBanKeHoachDeTaiUngDungChoDonVi>,
    ds_tinh_thanh: [] as ReadonlyArray<ITinhThanh>,
    ds_don_vi: [] as ReadonlyArray<IDonVi>,
    bien_ban_ke_hoach_de_tai_ung_dung_cho_don_vi: defaultValueBienBanKeHoachDeTaiUngDungChoDonVi,
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

export type bienBanKeHoachDeTaiUngDungChoDonViState = Readonly<typeof initialState>;

// Reducer
export default (state: bienBanKeHoachDeTaiUngDungChoDonViState = initialState, action): bienBanKeHoachDeTaiUngDungChoDonViState => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_BIEN_BAN_KE_HOACH_DE_TAI_UNG_DUNG_CHO_DON_VI):
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_TINH_THANH):
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_DON_VI):
        case REQUEST(ACTION_TYPES.LAY_BIEN_BAN_KE_HOACH_DE_TAI_UNG_DUNG_CHO_DON_VI):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                loading: true
            };
        case REQUEST(ACTION_TYPES.CAP_NHAT_BIEN_BAN_KE_HOACH_DE_TAI_UNG_DUNG_CHO_DON_VI):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                updating: true
            };
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_BIEN_BAN_KE_HOACH_DE_TAI_UNG_DUNG_CHO_DON_VI):
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_TINH_THANH):
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_DON_VI):
        case FAILURE(ACTION_TYPES.CAP_NHAT_BIEN_BAN_KE_HOACH_DE_TAI_UNG_DUNG_CHO_DON_VI):
            return {
                ...state,
                loading: false,
                updating: false,
                updateSuccess: false,
                errorMessage: action.payload
            };
        case SUCCESS(ACTION_TYPES.LAY_DANH_SACH_BIEN_BAN_KE_HOACH_DE_TAI_UNG_DUNG_CHO_DON_VI):
            return {
                ...state,
                loading: false,
                ds_bien_ban_ke_hoach_de_tai_ung_dung_cho_don_vi: action.payload.data,
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
        case SUCCESS(ACTION_TYPES.LAY_BIEN_BAN_KE_HOACH_DE_TAI_UNG_DUNG_CHO_DON_VI):
            return {
                ...state,
                loading: false,
                bien_ban_ke_hoach_de_tai_ung_dung_cho_don_vi: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.CAP_NHAT_BIEN_BAN_KE_HOACH_DE_TAI_UNG_DUNG_CHO_DON_VI):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                bien_ban_ke_hoach_de_tai_ung_dung_cho_don_vi: action.payload.data
            };
        case ACTION_TYPES.RESET:
            return {
                ...initialState
            };
        case ACTION_TYPES.RESETALL:
            return {
                ...initialState,
                ds_bien_ban_ke_hoach_de_tai_ung_dung_cho_don_vi: []
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

export const getDanhSachBienBanKeHoachDeTaiUngDungChoDonVi: ICrudGetSomeAction3Params<IBienBanKeHoachDeTaiUngDungChoDonVi> = (donvi, namxd, trangthai) => {
    const requestUrl = `${apiUrl}bien-ban-ke-hoach-de-tai-ung-dung-cho-don-vi/lay-danh-sach-bien-ban-ke-hoach-de-tai-ung-dung-cho-don-vi`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_BIEN_BAN_KE_HOACH_DE_TAI_UNG_DUNG_CHO_DON_VI,
        payload: axios.get(requestUrl, { params : { donVi: donvi, nam: namxd, trangThai: trangthai } })
    };
};

export const getDanhSachBienBanKeHoachDeTaiUngDungChoDonViTheoTen_DonVi_Nam_TrangThai: ICrudGetSomeAction4Params<IBienBanKeHoachDeTaiUngDungChoDonVi> = (detai, donvi, _nam, trangthai) => {
    const requestUrl = `${apiUrl}bien-ban-ke-hoach-de-tai-ung-dung-cho-don-vi/lay-danh-sach-bien-ban-ke-hoach-de-tai-ung-dung-cho-don-vi-theo-ten-don-vi-nam-trang-thai`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_BIEN_BAN_KE_HOACH_DE_TAI_UNG_DUNG_CHO_DON_VI,
        payload: axios.get<IBienBanKeHoachDeTaiUngDungChoDonVi>(requestUrl, { params : { tenDeTai: detai, donVi: donvi, nam: _nam, trangThai: trangthai } })
    };
};

export const getBienBanKeHoachDeTaiUngDungChoDonVi: ICrudGetAction<IBienBanKeHoachDeTaiUngDungChoDonVi> = detai => {
    const requestUrl = `${apiUrl}bien-ban-ke-hoach-de-tai-ung-dung-cho-don-vi/lay-bien-ban-ke-hoach-de-tai-ung-dung-cho-don-vi`;
    return {
        type: ACTION_TYPES.LAY_BIEN_BAN_KE_HOACH_DE_TAI_UNG_DUNG_CHO_DON_VI,
        payload: axios.get(requestUrl, { params : { maDeTai: detai } })
    };
};

export const updateBienBanKeHoachDeTaiUngDungChoDonVi = (detai, donvi, nam, trangthai) => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.CAP_NHAT_BIEN_BAN_KE_HOACH_DE_TAI_UNG_DUNG_CHO_DON_VI,
        payload: axios.post(`${apiUrl}bien-ban-ke-hoach-de-tai-ung-dung-cho-don-vi/cap-nhat-bien-ban-ke-hoach-de-tai-ung-dung-cho-don-vi`, detai)
    });
    dispatch(getDanhSachBienBanKeHoachDeTaiUngDungChoDonVi(donvi, nam, trangthai));
    return result;
};

export const uploadTapTinBienBanKeHoachDeTaiUngDungChoDonVi = data => {
    const requestUrl = `${apiUrl}bien-ban-ke-hoach-de-tai-ung-dung-cho-don-vi/upload-bien-ban-ke-hoach-de-tai-ung-dung-cho-don-vi`;
    return axios.post(requestUrl, data);
};

export const reset = () => ({
    type: ACTION_TYPES.RESET
});

export const resetall = () => ({
    type: ACTION_TYPES.RESETALL
});
