import axios from 'axios';
import { ICrudGetAction, ICrudGetSomeAction1, ICrudGetAllAction, ICrudGetSomeAction3Params,
    ICrudGetSomeAction4Params, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IXetDuyetBaoCaoTongKet, defaultValueXetDuyetBaoCaoTongKet } from 'app/modules/quanlynghiencuukhoahoc/xetduyetbaocaotongket/xetduyetbaocaotongket.model';
import { IDonVi, ITinhThanh } from 'app/modules/quanlychidaotuyen/kehoach/kehoach.model';

export const ACTION_TYPES = {
    LAY_DANH_SACH_XET_DUYET_BAO_CAO_TONG_KET: 'XetDuyetBaoCaoTongKet/LAY_DANH_SACH_XET_DUYET_BAO_CAO_TONG_KET',
    LAY_DANH_SACH_TINH_THANH: 'XetDuyetBaoCaoTongKet/LAY_DANH_SACH_TINH_THANH',
    LAY_DANH_SACH_DON_VI: 'XetDuyetBaoCaoTongKet/LAY_DANH_SACH_DON_VI',
    LAY_XET_DUYET_BAO_CAO_TONG_KET: 'XetDuyetBaoCaoTongKet/LAY_XET_DUYET_BAO_CAO_TONG_KET',
    CAP_NHAT_XET_DUYET_BAO_CAO_TONG_KET: 'XetDuyetBaoCaoTongKet/CAP_NHAT_XET_DUYET_BAO_CAO_TONG_KET',
    RESET: 'XetDuyetBaoCaoTongKet/RESET'
};

const initialState = {
    ds_xet_duyet_bao_cao_tong_ket: [] as ReadonlyArray<IXetDuyetBaoCaoTongKet>,
    ds_tinh_thanh: [] as ReadonlyArray<ITinhThanh>,
    ds_don_vi: [] as ReadonlyArray<IDonVi>,
    xet_duyet_bao_cao_tong_ket: defaultValueXetDuyetBaoCaoTongKet,
    loading: false,
    errorMessage: null,
    authorities: [] as any[],
    updating: false,
    updateSuccess: false,
    totalItems: 0
};

export type xetDuyetBaoCaoTongKetState = Readonly<typeof initialState>;

// Reducer
export default (state: xetDuyetBaoCaoTongKetState = initialState, action): xetDuyetBaoCaoTongKetState => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_XET_DUYET_BAO_CAO_TONG_KET):
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_TINH_THANH):
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_DON_VI):
        case REQUEST(ACTION_TYPES.LAY_XET_DUYET_BAO_CAO_TONG_KET):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                loading: true
            };
        case REQUEST(ACTION_TYPES.CAP_NHAT_XET_DUYET_BAO_CAO_TONG_KET):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                updating: true
            };
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_XET_DUYET_BAO_CAO_TONG_KET):
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_TINH_THANH):
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_DON_VI):
        case FAILURE(ACTION_TYPES.CAP_NHAT_XET_DUYET_BAO_CAO_TONG_KET):
            return {
                ...state,
                loading: false,
                updating: false,
                updateSuccess: false,
                errorMessage: action.payload
            };
        case SUCCESS(ACTION_TYPES.LAY_DANH_SACH_XET_DUYET_BAO_CAO_TONG_KET):
            return {
                ...state,
                loading: false,
                ds_xet_duyet_bao_cao_tong_ket: action.payload.data,
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
        case SUCCESS(ACTION_TYPES.LAY_XET_DUYET_BAO_CAO_TONG_KET):
            return {
                ...state,
                loading: false,
                xet_duyet_bao_cao_tong_ket: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.CAP_NHAT_XET_DUYET_BAO_CAO_TONG_KET):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                xet_duyet_bao_cao_tong_ket: action.payload.data
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

export const getDanhSachXetDuyetBaoCaoTongKet: ICrudGetSomeAction3Params<IXetDuyetBaoCaoTongKet> = (donvi, namxd, trangthai) => {
    const requestUrl = `${apiUrl}xet-duyet-bao-cao-tong-ket/lay-danh-sach-xet-duyet-bao-cao-tong-ket`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_XET_DUYET_BAO_CAO_TONG_KET,
        payload: axios.get(requestUrl, { params : { donVi: donvi, nam: namxd, trangThai: trangthai } })
    };
};

export const getDanhSachXetDuyetBaoCaoTongKetTheoTen_DonVi_Nam_TrangThai: ICrudGetSomeAction4Params<IXetDuyetBaoCaoTongKet> = (detai, donvi, _nam, trangthai) => {
    const requestUrl = `${apiUrl}xet-duyet-bao-cao-tong-ket/lay-danh-sach-xet-duyet-bao-cao-tong-ket-theo-ten-don-vi-nam-trang-thai`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_XET_DUYET_BAO_CAO_TONG_KET,
        payload: axios.get<IXetDuyetBaoCaoTongKet>(requestUrl, { params : { tenDeTai: detai, donVi: donvi, nam: _nam, trangThai: trangthai } })
    };
};

export const getXetDuyetBaoCaoTongKet: ICrudGetAction<IXetDuyetBaoCaoTongKet> = madetai => {
    const requestUrl = `${apiUrl}xet-duyet-bao-cao-tong-ket/lay-xet-duyet-bao-cao-tong-ket`;
    return {
        type: ACTION_TYPES.LAY_XET_DUYET_BAO_CAO_TONG_KET,
        payload: axios.get<IXetDuyetBaoCaoTongKet>(requestUrl, { params : { maDeTai: madetai } })
    };
};

export const updateXetDuyetBaoCaoTongKet = (xetduyetbaocaotongket, donvi, nam, trangthai) => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.CAP_NHAT_XET_DUYET_BAO_CAO_TONG_KET,
        payload: axios.post(`${apiUrl}xet-duyet-bao-cao-tong-ket/cap-nhat-xet-duyet-bao-cao-tong-ket`, xetduyetbaocaotongket)
    });
    dispatch(getDanhSachXetDuyetBaoCaoTongKet(donvi, nam, trangthai));
    return result;
};

export const uploadXetDuyetBaoCaoTongKet = data => {
    const requestUrl = `${apiUrl}xet-duyet-bao-cao-tong-ket/upload-xet-duyet-bao-cao-tong-ket`;
    return axios.post(requestUrl, data);
};

export const downloadXetDuyetBaoCaoTongKet = filename => {
    const requestUrl = `${apiUrl}xet-duyet-bao-cao-tong-ket/download-xet-duyet-bao-cao-tong-ket`;
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
