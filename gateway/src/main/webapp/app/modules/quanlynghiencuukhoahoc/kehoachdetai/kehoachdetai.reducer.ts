import axios from 'axios';
import { ICrudGetAction, ICrudGetSomeAction3Params, IXoaVaTraVeDanhSach3Params,
    ICrudGetSomeAction1, ICrudGetAllAction, ICrudGetSomeAction2Params, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IKeHoachDeTai, defaultValueKeHoachDeTai } from 'app/modules/quanlynghiencuukhoahoc/kehoachdetai/kehoachdetai.model';
import { INam, IDonVi, ITinhThanh } from 'app/modules/quanlychidaotuyen/kehoach/kehoach.model';

export const ACTION_TYPES = {
    LAY_DANH_SACH_KE_HOACH_DE_TAI: 'KeHoachDeTai/LAY_DANH_SACH_KE_HOACH_DE_TAI',
    LAY_DANH_SACH_TINH_THANH: 'KeHoachDeTai/LAY_DANH_SACH_TINH_THANH',
    LAY_DANH_SACH_DON_VI: 'KeHoachDeTai/LAY_DANH_SACH_DON_VI',
    LAY_DANH_SACH_NAM: 'KeHoachDeTai/LAY_DANH_SACH_NAM',
    LAY_KE_HOACH_DE_TAI: 'KeHoachDeTai/LAY_KE_HOACH_DE_TAI',
    TAO_KE_HOACH_DE_TAI: 'KeHoachDeTai/TAO_KE_HOACH_DE_TAI',
    CAP_NHAT_KE_HOACH_DE_TAI: 'KeHoachDeTai/CAP_NHAT_KE_HOACH_DE_TAI',
    XOA_KE_HOACH_DE_TAI: 'KeHoachDeTai/XOA_KE_HOACH_DE_TAI',
    RESET: 'KeHoachDeTai/RESET'
};

const initialState = {
    ds_ke_hoach_de_tai: [] as ReadonlyArray<IKeHoachDeTai>,
    ds_tinh_thanh: [] as ReadonlyArray<ITinhThanh>,
    ds_don_vi: [] as ReadonlyArray<IDonVi>,
    ds_nam_kh: [] as ReadonlyArray<INam>,
    ke_hoach_de_tai: defaultValueKeHoachDeTai,
    loading: false,
    errorMessage: null,
    authorities: [] as any[],
    updating: false,
    updateSuccess: false,
    totalItems: 0
};

export type keHoachDeTaiState = Readonly<typeof initialState>;

// Reducer
export default (state: keHoachDeTaiState = initialState, action): keHoachDeTaiState => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_KE_HOACH_DE_TAI):
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_TINH_THANH):
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_DON_VI):
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_NAM):
        case REQUEST(ACTION_TYPES.LAY_KE_HOACH_DE_TAI):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                loading: true
            };
        case REQUEST(ACTION_TYPES.TAO_KE_HOACH_DE_TAI):
        case REQUEST(ACTION_TYPES.CAP_NHAT_KE_HOACH_DE_TAI):
        case REQUEST(ACTION_TYPES.XOA_KE_HOACH_DE_TAI):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                updating: true
            };
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_KE_HOACH_DE_TAI):
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_TINH_THANH):
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_DON_VI):
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_NAM):
        case FAILURE(ACTION_TYPES.TAO_KE_HOACH_DE_TAI):
        case FAILURE(ACTION_TYPES.CAP_NHAT_KE_HOACH_DE_TAI):
        case FAILURE(ACTION_TYPES.XOA_KE_HOACH_DE_TAI):
            return {
                ...state,
                loading: false,
                updating: false,
                updateSuccess: false,
                errorMessage: action.payload
            };
        case SUCCESS(ACTION_TYPES.LAY_DANH_SACH_KE_HOACH_DE_TAI):
            return {
                ...state,
                loading: false,
                ds_ke_hoach_de_tai: action.payload.data,
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
                ds_nam_kh: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.LAY_KE_HOACH_DE_TAI):
            return {
                ...state,
                loading: false,
                ke_hoach_de_tai: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.TAO_KE_HOACH_DE_TAI):
        case SUCCESS(ACTION_TYPES.CAP_NHAT_KE_HOACH_DE_TAI):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                ke_hoach_de_tai: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.XOA_KE_HOACH_DE_TAI):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                ke_hoach_de_tai: defaultValueKeHoachDeTai
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

export const getDanhSachNamKH: ICrudGetAllAction<INam> = () => {
    const requestUrl = `${apiUrl}ke-hoach-de-tai/lay-danh-sach-nam-ke-hoach-de-tai`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_NAM,
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

export const getDanhSachKeHoachDeTai: ICrudGetSomeAction2Params<IKeHoachDeTai> = (donvi, namkh) => {
    const requestUrl = `${apiUrl}ke-hoach-de-tai/lay-danh-sach-ke-hoach-de-tai`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_KE_HOACH_DE_TAI,
        payload: axios.get(requestUrl, { params : { donVi: donvi, nam: namkh } })
    };
};

export const getDanhSachKeHoachDeTaiTheoKeHoach_DonVi_Nam: ICrudGetSomeAction3Params<IKeHoachDeTai> = (kehoach, donvi, _nam) => {
    const requestUrl = `${apiUrl}ke-hoach-de-tai/lay-danh-sach-ke-hoach-de-tai-theo-ke-hoach-don-vi-nam`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_KE_HOACH_DE_TAI,
        payload: axios.get<IKeHoachDeTai>(requestUrl, { params : { keHoach: kehoach, donVi: donvi, nam: _nam } })
    };
};

export const getKeHoachDeTai: ICrudGetAction<IKeHoachDeTai> = makehoachdetai => {
    const requestUrl = `${apiUrl}ke-hoach-de-tai/lay-ke-hoach-de-tai`;
    return {
        type: ACTION_TYPES.LAY_KE_HOACH_DE_TAI,
        payload: axios.get<IKeHoachDeTai>(requestUrl, { params : { maKeHoachDeTai: makehoachdetai } })
    };
};

export const addKeHoachDeTai: ICrudPutAction<IKeHoachDeTai> = kehoachdetai => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.TAO_KE_HOACH_DE_TAI,
        payload: axios.post(`${apiUrl}ke-hoach-de-tai/them-moi-ke-hoach-de-tai`, kehoachdetai)
    });
    dispatch(getDanhSachKeHoachDeTai(kehoachdetai.donVi, kehoachdetai.nam));
    return result;
};

export const updateKeHoachDeTai: ICrudPutAction<IKeHoachDeTai> = kehoachdetai => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.CAP_NHAT_KE_HOACH_DE_TAI,
        payload: axios.post(`${apiUrl}ke-hoach-de-tai/cap-nhat-ke-hoach-de-tai`, kehoachdetai)
    });
    dispatch(getDanhSachKeHoachDeTai(kehoachdetai.donVi, kehoachdetai.nam));
    return result;
};

export const deleteKeHoachDeTai: IXoaVaTraVeDanhSach3Params<IKeHoachDeTai> = (makehoachdetai, donvi, nam) => async dispatch => {
    const requestUrl = `${apiUrl}ke-hoach-de-tai/xoa`;
    const result = await dispatch({
        type: ACTION_TYPES.XOA_KE_HOACH_DE_TAI,
        payload: axios.delete(requestUrl, { params: { maKeHoachDeTai: makehoachdetai } })
    });
    dispatch(getDanhSachKeHoachDeTai(donvi, nam));
    return result;
};

export const downloadKeHoach = filename => {
    const requestUrl = `${apiUrl}ke-hoach-de-tai/download-ke-hoach-de-tai`;
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

export const uploadKeHoachDeTai = data => {
    const requestUrl = `${apiUrl}ke-hoach-de-tai/upload-ke-hoach-de-tai`;
    return axios.post(requestUrl, data);
};

export const reset = () => ({
    type: ACTION_TYPES.RESET
});
