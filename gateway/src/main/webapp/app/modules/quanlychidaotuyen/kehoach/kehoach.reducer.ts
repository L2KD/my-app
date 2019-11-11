import axios from 'axios';
import { ICrudGetSomeAction1, IXoaVaTraVeDanhSach3Params, ICrudGetSomeAction2Params, ICrudGetSomeAction3Params,
    ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import {
    ITinhThanh,
    IDonVi,
    INam,
    IKeHoach,
    defaultValueTinhThanh,
    defaultValueDonVi,
    defaultValueNam,
    defaultValueKeHoach
} from './kehoach.model';
import { IVanBan } from 'app/modules/quanlychidaotuyen/vanban/vanban.model';

export const ACTION_TYPES = {
    LAY_DANH_SACH_KE_HOACH: 'KeHoach/LAY_DANH_SACH_KE_HOACH',
    LAY_DANH_SACH_TINH_THANH: 'KeHoach/LAY_DANH_SACH_TINH_THANH',
    LAY_DANH_SACH_DON_VI: 'KeHoach/LAY_DANH_SACH_DON_VI',
    LAY_DANH_SACH_NAM: 'KeHoach/LAY_DANH_SACH_NAM',
    LAY_DANH_SACH_VB: 'KeHoach/LAY_DANH_SACH_VB',
    LAY_TINH_THANH: 'KeHoach/LAY_TINH_THANH',
    LAY_DON_VI: 'KeHoach/LAY_DON_VI',
    LAY_KE_HOACH: 'KeHoach/LAY_KE_HOACH',
    LAY_MAX_MA: 'KeHoach/LAY_MAX_MA',
    TAO_KE_HOACH: 'KeHoach/TAO_KE_HOACH',
    CAP_NHAT_KE_HOACH: 'KeHoach/CAP_NHAT_KE_HOACH',
    XOA_KE_HOACH: 'KeHoach/XOA_KE_HOACH',
    RESET: 'KeHoach/RESET'
};

const initialState = {
    loading: false,
    errorMessage: null,
    ds_ke_hoach: [] as ReadonlyArray<IKeHoach>,
    ds_tinh_thanh: [] as ReadonlyArray<ITinhThanh>,
    ds_don_vi: [] as ReadonlyArray<IDonVi>,
    ds_nam: [] as ReadonlyArray<INam>,
    ds_vb_ct: [] as ReadonlyArray<IVanBan>,
    tinh_thanh: defaultValueTinhThanh,
    max_ma: 0,
    don_vi: defaultValueDonVi,
    nam: defaultValueNam,
    ke_hoach: defaultValueKeHoach,
    authorities: [] as any[],
    updating: false,
    updateSuccess: false,
    totalItems: 0
};

export type keHoachState = Readonly<typeof initialState>;

// Reducer
export default (state: keHoachState = initialState, action): keHoachState => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_KE_HOACH):
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_TINH_THANH):
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_DON_VI):
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_NAM):
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_VB):
        case REQUEST(ACTION_TYPES.LAY_TINH_THANH):
        case REQUEST(ACTION_TYPES.LAY_DON_VI):
        case REQUEST(ACTION_TYPES.LAY_KE_HOACH):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                loading: true
            };
        case REQUEST(ACTION_TYPES.TAO_KE_HOACH):
        case REQUEST(ACTION_TYPES.CAP_NHAT_KE_HOACH):
        case REQUEST(ACTION_TYPES.XOA_KE_HOACH):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                updating: true
            };
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_KE_HOACH):
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_TINH_THANH):
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_DON_VI):
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_NAM):
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_VB):
        case FAILURE(ACTION_TYPES.LAY_KE_HOACH):
        case FAILURE(ACTION_TYPES.LAY_DON_VI):
        case FAILURE(ACTION_TYPES.LAY_TINH_THANH):
        case FAILURE(ACTION_TYPES.TAO_KE_HOACH):
        case FAILURE(ACTION_TYPES.CAP_NHAT_KE_HOACH):
        case FAILURE(ACTION_TYPES.XOA_KE_HOACH):
            return {
                ...state,
                loading: false,
                updating: false,
                updateSuccess: false,
                errorMessage: action.payload
            };
        case SUCCESS(ACTION_TYPES.LAY_DANH_SACH_KE_HOACH):
            return {
                ...state,
                loading: false,
                ds_ke_hoach: action.payload.data,
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
        case SUCCESS(ACTION_TYPES.LAY_DANH_SACH_NAM):
            return {
                ...state,
                loading: false,
                ds_nam: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.LAY_DANH_SACH_VB):
            return {
                ...state,
                loading: false,
                ds_vb_ct: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.LAY_KE_HOACH):
            return {
                ...state,
                loading: false,
                ke_hoach: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.LAY_TINH_THANH):
            return {
                ...state,
                loading: false,
                tinh_thanh: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.LAY_DON_VI):
            return {
                ...state,
                loading: false,
                don_vi: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.LAY_MAX_MA):
            return {
                ...state,
                loading: false,
                max_ma: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.TAO_KE_HOACH):
        case SUCCESS(ACTION_TYPES.CAP_NHAT_KE_HOACH):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                ke_hoach: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.XOA_KE_HOACH):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                ke_hoach: defaultValueKeHoach
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
export const getDanhSachNam: ICrudGetAllAction<INam> = () => {
    const requestUrl = `${apiUrl}ke-hoach/lay-danh-sach-nam`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_NAM,
        payload: axios.get(requestUrl)
    };
};

export const getDanhSachVanBanTheoKeHoach: ICrudGetAction<IVanBan> = makehoach => {
    const requestUrl = `${apiUrl}ke-hoach/lay-danh-sach-van-ban-theo-ke-hoach`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_VB,
        payload: axios.get<IVanBan>(requestUrl, { params : { maKeHoach: makehoach } })
    };
};

export const getDanhSachKeHoach: ICrudGetSomeAction2Params<IKeHoach> = (donvi, _nam) => {
    const requestUrl = `${apiUrl}ke-hoach/lay-danh-sach-ke-hoach-theo-donvi-nam`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_KE_HOACH,
        payload: axios.get<IKeHoach>(requestUrl, { params : { maDonVi: donvi, nam: _nam } })
    };
};

export const getDanhSachKeHoachTheoNoiDungTrichYeu_DonVi_Nam: ICrudGetSomeAction3Params<IKeHoach> = (noidungtrichyeu, donvi, _nam) => {
    const requestUrl = `${apiUrl}ke-hoach/lay-danh-sach-ke-hoach-theo-ndty-donvi-nam`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_KE_HOACH,
        payload: axios.get<IKeHoach>(requestUrl, { params : { noiDungTrichYeu: noidungtrichyeu, maDonVi: donvi, nam: _nam } })
    };
};

export const getTinhThanh: ICrudGetAction<ITinhThanh> = tinhthanh => {
    const requestUrl = `${apiUrl}van-ban/lay-tinh-thanh`;
    return {
        type: ACTION_TYPES.LAY_TINH_THANH,
        payload: axios.get<ITinhThanh>(requestUrl, { params : { ma_tinh_thanh: tinhthanh } })
    };
};

export const getDonVi: ICrudGetAction<IDonVi> = donvi => {
    const requestUrl = `${apiUrl}ke-hoach/lay-don-vi`;
    return {
        type: ACTION_TYPES.LAY_DON_VI,
        payload: axios.get<IDonVi>(requestUrl, { params : { ma_don_vi: donvi } })
    };
};

export const getKeHoach: ICrudGetAction<IKeHoach> = kehoach => {
    const requestUrl = `${apiUrl}ke-hoach/lay-ke-hoach`;
    return {
        type: ACTION_TYPES.LAY_KE_HOACH,
        payload: axios.get<IKeHoach>(requestUrl, { params : { maKeHoach: kehoach } })
    };
};

export const uploadKeHoach = data => {
    const requestUrl = `${apiUrl}ke-hoach/upload-ke-hoach`;
    return axios.post(requestUrl, data);
};

export const addKeHoach: ICrudPutAction<IKeHoach> = kehoach => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.TAO_KE_HOACH,
        payload: axios.post(`${apiUrl}ke-hoach/them-moi-ke-hoach`, kehoach)
    });
    dispatch(getDanhSachKeHoach(kehoach.donVi, kehoach.ngayBanHanh.toString().substring(0, 4)));
    return result;
};

export const addKeHoach_1 = (kehoach, maxma, vb: IVanBan[]) => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.TAO_KE_HOACH,
        payload: axios.post(`${apiUrl}ke-hoach/them-moi-ke-hoach`, kehoach)
    });
    for (const ele of vb) {
        addChiTietKeHoach(maxma, ele.maVanBan);
    }
    dispatch(getDanhSachKeHoach(kehoach.donVi, kehoach.ngayBanHanh.toString().substring(0, 4)));
    return result;
};

    const addChiTietKeHoach = (makh, mavb) => {
    const requestUrl = `${apiUrl}ke-hoach/them-moi-chi-tiet-ke-hoach?maKeHoach=${makh}&maVanBan=${mavb}`;
    axios.post(requestUrl);
};

export const getMaxMa: ICrudGetAction<number> = () => {
    const requestUrl = `${apiUrl}ke-hoach/lay-max`;
    return {
        type: ACTION_TYPES.LAY_MAX_MA,
        payload: axios.get<number>(requestUrl)
    };
};

export const addKeHoach1: ICrudPutAction<IKeHoach> = kehoach => async dispatch => {
    // const formData = new FormData();
    // kehoach.append('tap_tin', file);
    const result = await dispatch({
        type: ACTION_TYPES.TAO_KE_HOACH,
        payload: axios.post(`${apiUrl}ke-hoach/them-moi-ke-hoach`, kehoach, { headers: {
                'content-type': 'multipart/form-data'
            }})
    });
    dispatch(getDanhSachKeHoach(kehoach.donVi, kehoach.ngayBanHanh.toString().substring(0, 4)));
    return result;
};

export const updateKeHoach: ICrudPutAction<IKeHoach> = kehoach => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.CAP_NHAT_KE_HOACH,
        payload: axios.post(`${apiUrl}ke-hoach/cap-nhat-ke-hoach`, kehoach)
    });
      dispatch(getDanhSachKeHoach(kehoach.donVi, kehoach.ngayBanHanh.toString().substring(0, 4)));
    return result;
};

const deleteCiTietKeHoach = kehoach => {
    axios.delete(`${apiUrl}ke-hoach/xoa-chi-tiet-ke-hoach`, { params: { maKeHoach: kehoach } });
};

export const updateKeHoach_1 = (kehoach, ds_vb: IVanBan[]) => async dispatch => {
    deleteCiTietKeHoach(kehoach.maKeHoach);
    const result = await dispatch({
        type: ACTION_TYPES.CAP_NHAT_KE_HOACH,
        payload: axios.post(`${apiUrl}ke-hoach/cap-nhat-ke-hoach`, kehoach)
    });
    for (const ele of ds_vb) {
        addChiTietKeHoach(kehoach.maKeHoach, ele.maVanBan);
    }
    return result;
};

export const xoaKeHoachVaTraVeDanhSach: IXoaVaTraVeDanhSach3Params<IKeHoach> = (maKeHoach, maDonVi, nam) => async dispatch => {
    const requestUrl = `${apiUrl}ke-hoach/xoa`;
    const result = await dispatch({
        type: ACTION_TYPES.XOA_KE_HOACH,
        payload: axios.delete(requestUrl, { params: { ma_ke_hoach: maKeHoach } })
    });
    dispatch(getDanhSachKeHoach(maDonVi, nam));
    return result;
};

export const downloadKeHoach = filename => {
    const requestUrl = `${apiUrl}ke-hoach/download-ke-hoach`;
    return {
        // type: ACTION_TYPES.,
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
