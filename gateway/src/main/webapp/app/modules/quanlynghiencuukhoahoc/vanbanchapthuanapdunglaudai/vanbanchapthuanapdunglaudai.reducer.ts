import axios from 'axios';
import { ICrudGetAction, ICrudGetSomeAction1, ICrudGetAllAction, ICrudGetSomeAction3Params,
    ICrudGetSomeAction4Params, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IVanBanChapThuanApDungLauDai,
    defaultValueVanBanChapThuanApDungLauDai } from 'app/modules/quanlynghiencuukhoahoc/vanbanchapthuanapdunglaudai/vanbanchapthuanapdunglaudai.model';
import { IDonVi, ITinhThanh } from 'app/modules/quanlychidaotuyen/kehoach/kehoach.model';

export const ACTION_TYPES = {
    LAY_DANH_SACH_VAN_BAN_CHAP_THUAN_AP_DUNG_LAU_DAI: 'VanBanChapThuanApDungLauDai/LAY_DANH_SACH_BIEN_BAN_KE_HOACH_DE_TAIUNG_DUNG_CHO_DON_VI',
    LAY_DANH_SACH_TINH_THANH: 'VanBanChapThuanApDungLauDai/LAY_DANH_SACH_TINH_THANH',
    LAY_DANH_SACH_DON_VI: 'VanBanChapThuanApDungLauDai/LAY_DANH_SACH_DON_VI',
    LAY_VAN_BAN_CHAP_THUAN_AP_DUNG_LAU_DAI: 'VanBanChapThuanApDungLauDai/LAY_BIEN_BAN_KE_HOACH_DE_TAIUNG_DUNG_CHO_DON_VI',
    CAP_NHAT_VAN_BAN_CHAP_THUAN_AP_DUNG_LAU_DAI: 'VanBanChapThuanApDungLauDai/CAP_NHAT_BIEN_BAN_KE_HOACH_DE_TAIUNG_DUNG_CHO_DON_VI',
    RESET: 'VanBanChapThuanApDungLauDai/RESET'
};

const initialState = {
    ds_van_ban_chap_thuan_ap_dung_lau_dai: [] as ReadonlyArray<IVanBanChapThuanApDungLauDai>,
    ds_tinh_thanh: [] as ReadonlyArray<ITinhThanh>,
    ds_don_vi: [] as ReadonlyArray<IDonVi>,
    van_ban_chap_thuan_ap_dung_lau_dai: defaultValueVanBanChapThuanApDungLauDai,
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

export type vanBanChapThuanApDungLauDaiState = Readonly<typeof initialState>;

// Reducer
export default (state: vanBanChapThuanApDungLauDaiState = initialState, action): vanBanChapThuanApDungLauDaiState => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_VAN_BAN_CHAP_THUAN_AP_DUNG_LAU_DAI):
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_TINH_THANH):
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_DON_VI):
        case REQUEST(ACTION_TYPES.LAY_VAN_BAN_CHAP_THUAN_AP_DUNG_LAU_DAI):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                loading: true
            };
        case REQUEST(ACTION_TYPES.CAP_NHAT_VAN_BAN_CHAP_THUAN_AP_DUNG_LAU_DAI):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                updating: true
            };
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_VAN_BAN_CHAP_THUAN_AP_DUNG_LAU_DAI):
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_TINH_THANH):
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_DON_VI):
        case FAILURE(ACTION_TYPES.CAP_NHAT_VAN_BAN_CHAP_THUAN_AP_DUNG_LAU_DAI):
            return {
                ...state,
                loading: false,
                updating: false,
                updateSuccess: false,
                errorMessage: action.payload
            };
        case SUCCESS(ACTION_TYPES.LAY_DANH_SACH_VAN_BAN_CHAP_THUAN_AP_DUNG_LAU_DAI):
            return {
                ...state,
                loading: false,
                ds_van_ban_chap_thuan_ap_dung_lau_dai: action.payload.data,
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
        case SUCCESS(ACTION_TYPES.LAY_VAN_BAN_CHAP_THUAN_AP_DUNG_LAU_DAI):
            return {
                ...state,
                loading: false,
                van_ban_chap_thuan_ap_dung_lau_dai: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.CAP_NHAT_VAN_BAN_CHAP_THUAN_AP_DUNG_LAU_DAI):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                van_ban_chap_thuan_ap_dung_lau_dai: action.payload.data
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
        tinhthanh1: tinhthanh.toString(),
        type: ACTION_TYPES.LAY_DANH_SACH_DON_VI,
        payload: axios.get(requestUrl, { params : { ma_tinh_thanh: tinhthanh } })
    };
};

export const getDanhSachVanBanChapThuanApDungLauDai: ICrudGetSomeAction3Params<IVanBanChapThuanApDungLauDai> = (donvi, namxd, trangthai) => {
    const requestUrl = `${apiUrl}van-ban-chap-thuan-ap-dung-lau-dai/lay-danh-sach-van-ban-chap-thuan-ap-dung-lau-dai`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_VAN_BAN_CHAP_THUAN_AP_DUNG_LAU_DAI,
        payload: axios.get(requestUrl, { params : { donVi: donvi, nam: namxd, trangThai: trangthai } })
    };
};

export const getDanhSachVanBanChapNhanApDungLauDaiTheoTen_DonVi_Nam_TrangThai: ICrudGetSomeAction4Params<IVanBanChapThuanApDungLauDai> = (detai, donvi, _nam, trangthai) => {
    const requestUrl = `${apiUrl}van-ban-chap-thuan-ap-dung-lau-dai/lay-danh-sach-van-ban-chap-thuan-ap-dung-lau-dai-theo-ten-don-vi-nam-trang-thai`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_VAN_BAN_CHAP_THUAN_AP_DUNG_LAU_DAI,
        payload: axios.get<IVanBanChapThuanApDungLauDai>(requestUrl, { params : { tenDeTai: detai, donVi: donvi, nam: _nam, trangThai: trangthai } })
    };
};

export const getVanBanChapThuanApDungLauDai: ICrudGetAction<IVanBanChapThuanApDungLauDai> = detai => {
    const requestUrl = `${apiUrl}van-ban-chap-thuan-ap-dung-lau-dai/lay-van-ban-chap-thuan-ap-dung-lau-dai`;
    return {
        type: ACTION_TYPES.LAY_VAN_BAN_CHAP_THUAN_AP_DUNG_LAU_DAI,
        payload: axios.get(requestUrl, { params : { maDeTai: detai } })
    };
};

export const updateVanBanChapThuanApDungLauDai = (detai, donvi, nam, trangthai) => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.CAP_NHAT_VAN_BAN_CHAP_THUAN_AP_DUNG_LAU_DAI,
        payload: axios.post(`${apiUrl}van-ban-chap-thuan-ap-dung-lau-dai/cap-nhat-van-ban-chap-thuan-ap-dung-lau-dai`, detai)
    });
    dispatch(getDanhSachVanBanChapThuanApDungLauDai(donvi, nam, trangthai));
    return result;
};

export const uploadTapTinVanBanChapThuanApDungLauDai = data => {
    const requestUrl = `${apiUrl}van-ban-chap-thuan-ap-dung-lau-dai/upload-van-ban-chap-thuan-ap-dung-lau-dai`;
    return axios.post(requestUrl, data);
};

export const reset = () => ({
    type: ACTION_TYPES.RESET
});
