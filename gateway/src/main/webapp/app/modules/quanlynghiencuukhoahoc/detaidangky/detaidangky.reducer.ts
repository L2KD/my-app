import axios from 'axios';
import { ICrudGetAction, ICrudGetSomeAction3Params, ICrudGetSomeAction1, ICrudGetAllAction, ICrudGetSomeAction2Params, ICrudPutAction, ICrudDeleteAction,
    IXoaVaTraVeDanhSach3Params } from 'react-jhipster';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IDeTaiDangKy, defaultValueDeTaiDangKy } from 'app/modules/quanlynghiencuukhoahoc/detaidangky/detaidangky.model';
import { INam, IDonVi, ITinhThanh } from 'app/modules/quanlychidaotuyen/kehoach/kehoach.model';
import { IKhoaPhong } from 'app/modules/khoaphong/khoaphong.model';

export const ACTION_TYPES = {
    LAY_DANH_SACH_DE_TAI_DANG_KY: 'DeTaiDangKy/LAY_DANH_SACH_DE_TAI_DANG_KY',
    LAY_DANH_SACH_TINH_THANH: 'DeTaiDangKy/LAY_DANH_SACH_TINH_THANH',
    LAY_DANH_SACH_DON_VI: 'DeTaiDangKy/LAY_DANH_SACH_DON_VI',
    LAY_DANH_SACH_KHOA_PHONG: 'DeTaiDangKy/LAY_DANH_SACH_KHOA_PHONG',
    LAY_DANH_SACH_KHOA_PHONG_DE_TAI: 'DeTaiDangKy/LAY_DANH_SACH_KHOA_PHONG_DE_TAI',
    LAY_MAX_MA: 'DeTaiDangKy/LAY_MAX_MA',
    LAY_DE_TAI_DANG_KY: 'DeTaiDangKy/LAY_DE_TAI_DANG_KY',
    TAO_DE_TAI_DANG_KY: 'DeTaiDangKy/TAO_DE_TAI_DANG_KY',
    CAP_NHAT_DE_TAI_DANG_KY: 'DeTaiDangKy/CAP_NHAT_DE_TAI_DANG_KY',
    XOA_DE_TAI_DANG_KY: 'DeTaiDangKy/XOA_DE_TAI_DANG_KY',
    RESET: 'DeTaiDangKy/RESET'
};

const initialState = {
    ds_de_tai_dang_ky: [] as ReadonlyArray<IDeTaiDangKy>,
    ds_tinh_thanh: [] as ReadonlyArray<ITinhThanh>,
    ds_don_vi: [] as ReadonlyArray<IDonVi>,
    de_tai_dang_ky: defaultValueDeTaiDangKy,
    ds_khoa_phong: [] as ReadonlyArray<IKhoaPhong>,
    ds_khoa_phong_de_tai: [] as ReadonlyArray<IKhoaPhong>,
    max_ma_de_tai: 0,
    loading: false,
    errorMessage: null,
    authorities: [] as any[],
    updating: false,
    updateSuccess: false,
    totalItems: 0
};

export type deTaiDangKyState = Readonly<typeof initialState>;

// Reducer
export default (state: deTaiDangKyState = initialState, action): deTaiDangKyState => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_DE_TAI_DANG_KY):
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_TINH_THANH):
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_DON_VI):
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_KHOA_PHONG):
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_KHOA_PHONG_DE_TAI):
        case REQUEST(ACTION_TYPES.LAY_DE_TAI_DANG_KY):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                loading: true
            };
        case REQUEST(ACTION_TYPES.TAO_DE_TAI_DANG_KY):
        case REQUEST(ACTION_TYPES.CAP_NHAT_DE_TAI_DANG_KY):
        case REQUEST(ACTION_TYPES.XOA_DE_TAI_DANG_KY):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                updating: true
            };
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_DE_TAI_DANG_KY):
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_TINH_THANH):
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_DON_VI):
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_KHOA_PHONG):
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_KHOA_PHONG_DE_TAI):
        case FAILURE(ACTION_TYPES.TAO_DE_TAI_DANG_KY):
        case FAILURE(ACTION_TYPES.CAP_NHAT_DE_TAI_DANG_KY):
        case FAILURE(ACTION_TYPES.XOA_DE_TAI_DANG_KY):
            return {
                ...state,
                loading: false,
                updating: false,
                updateSuccess: false,
                errorMessage: action.payload
            };
        case SUCCESS(ACTION_TYPES.LAY_DANH_SACH_DE_TAI_DANG_KY):
            return {
                ...state,
                loading: false,
                ds_de_tai_dang_ky: action.payload.data,
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
        case SUCCESS(ACTION_TYPES.LAY_DANH_SACH_KHOA_PHONG):
            return {
                ...state,
                loading: false,
                ds_khoa_phong: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.LAY_DANH_SACH_KHOA_PHONG_DE_TAI):
            return {
                ...state,
                loading: false,
                ds_khoa_phong_de_tai: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.LAY_DE_TAI_DANG_KY):
            return {
                ...state,
                loading: false,
                de_tai_dang_ky: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.LAY_MAX_MA):
            return {
                ...state,
                loading: false,
                max_ma_de_tai: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.TAO_DE_TAI_DANG_KY):
        case SUCCESS(ACTION_TYPES.CAP_NHAT_DE_TAI_DANG_KY):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                de_tai_dang_ky: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.XOA_DE_TAI_DANG_KY):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                de_tai_dang_ky: defaultValueDeTaiDangKy
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

export const getDanhSachKhoaPhong: ICrudGetSomeAction1<IKhoaPhong> = madonvi => {
    const requestUrl = `${apiUrl}khoa-phong/lay-danh-sach-khoa-phong-theo-don-vi`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_KHOA_PHONG,
        payload: axios.get(requestUrl, { params : { maDonVi: madonvi } })
    };
};

export const getDanhSachDeTaiDangKy: ICrudGetSomeAction2Params<IDeTaiDangKy> = (donvi, namkh) => {
    const requestUrl = `${apiUrl}de-tai-dang-ky/lay-danh-sach-de-tai-dang-ky`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_DE_TAI_DANG_KY,
        payload: axios.get(requestUrl, { params : { donVi: donvi, nam: namkh } })
    };
};

export const getDanhSachDeTaiDangKyTheoTen_DonVi_Nam: ICrudGetSomeAction3Params<IDeTaiDangKy> = (kehoach, donvi, _nam) => {
    const requestUrl = `${apiUrl}de-tai-dang-ky/lay-danh-sach-de-tai-dang-ky-theo-ten-don-vi-nam`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_DE_TAI_DANG_KY,
        payload: axios.get<IDeTaiDangKy>(requestUrl, { params : { tenDeTai: kehoach, donVi: donvi, nam: _nam } })
    };
};

export const getDeTaiDangKy: ICrudGetAction<IDeTaiDangKy> = madetai => {
    const requestUrl = `${apiUrl}de-tai-dang-ky/lay-de-tai-dang-ky`;
    return {
        type: ACTION_TYPES.LAY_DE_TAI_DANG_KY,
        payload: axios.get<IDeTaiDangKy>(requestUrl, { params : { maDeTai: madetai } })
    };
};

export const getMaxMaDeTaiDangKy: ICrudGetAction<number> = () => {
    const requestUrl = `${apiUrl}de-tai-dang-ky/lay-ma-de-tai-max`;
    return {
        type: ACTION_TYPES.LAY_MAX_MA,
        payload: axios.get<number>(requestUrl)
    };
};

export const addDeTaiDangKy: ICrudPutAction<IDeTaiDangKy> = detaidangky => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.TAO_DE_TAI_DANG_KY,
        payload: axios.post(`${apiUrl}de-tai-dang-ky/them-moi-de-tai-dang-ky`, detaidangky)
    });
    dispatch(getDanhSachDeTaiDangKy(detaidangky.donVi, detaidangky.ngayDangKy.toString().substring(0, 4)));
    return result;
};

export const addDeTaiDangKyKhoaPhong = (madetai, makhoaphong) => {
    const requestUrl = `${apiUrl}de-tai-dang-ky/them-moi-de-tai-dang-ky-khoa-phong?maDeTai=${madetai}&maKhoaPhong=${makhoaphong}`;
    axios.post(requestUrl);
};

export const deleteDeTaiDangKyKhoaPhong = madetai => {
    const requestUrl = `${apiUrl}de-tai-dang-ky/xoa-de-tai-dang-ky-khoa-phong?maDeTai=${madetai}`;
    axios.delete(requestUrl);
};

export const addDeTaiDangKy_1 = (detaidangky, maxma, ds_khoa_phong: IKhoaPhong[]) => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.TAO_DE_TAI_DANG_KY,
        payload: axios.post(`${apiUrl}de-tai-dang-ky/them-moi-de-tai-dang-ky`, detaidangky)
    });
    for (const ele of ds_khoa_phong) {
        addDeTaiDangKyKhoaPhong(maxma, ele.maKhoaPhong);
    }
    dispatch(getDanhSachDeTaiDangKy(detaidangky.donVi, detaidangky.ngayDangKy.toString().substring(0, 4)));
    return result;
};

export const updateDeTaiDangKy: ICrudPutAction<IDeTaiDangKy> = detaidangky => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.CAP_NHAT_DE_TAI_DANG_KY,
        payload: axios.post(`${apiUrl}de-tai-dang-ky/cap-nhat-de-tai-dang-ky`, detaidangky)
    });
    dispatch(getDanhSachDeTaiDangKy());
    return result;
};

export const updateDeTaiDangKy_1 = (detaidangky, ds_khoa_phong: IKhoaPhong[]) => async dispatch => {
    deleteDeTaiDangKyKhoaPhong(detaidangky.maDeTai);
    const result = await dispatch({
        type: ACTION_TYPES.CAP_NHAT_DE_TAI_DANG_KY,
        payload: axios.post(`${apiUrl}de-tai-dang-ky/cap-nhat-de-tai-dang-ky`, detaidangky)
    });
    await dispatch(() => {
        for (const ele of ds_khoa_phong) {
            addDeTaiDangKyKhoaPhong(detaidangky.maDeTai, ele.maKhoaPhong);
        }
    });
    await dispatch(getDanhSachDeTaiDangKy(detaidangky.donVi, detaidangky.ngayDangKy.toString().substring(0, 4)));
    return result;
};

export const deleteDeTaiDangKy: IXoaVaTraVeDanhSach3Params<IDeTaiDangKy> = (madetai, madonvi, ngaydangky) => async dispatch => {
    const requestUrl = `${apiUrl}de-tai-dang-ky/xoa`;
    const result = await dispatch({
        type: ACTION_TYPES.XOA_DE_TAI_DANG_KY,
        payload: axios.delete(requestUrl, { params: { maDeTai: madetai } })
    });
    dispatch(getDanhSachDeTaiDangKy(madonvi, ngaydangky.toString().substring(0, 4)));
    return result;
};

export const uploadDeTaiDangKy = data => {
    const requestUrl = `${apiUrl}de-tai-dang-ky/upload-de-tai-dang-ky`;
    return axios.post(requestUrl, data);
};

export const getDanhSachKhoaPhongDeTai: ICrudGetSomeAction1<IKhoaPhong> = madetai => {
    const requestUrl = `${apiUrl}de-tai-dang-ky/lay-danh-sach-khoa-phong-de-tai-dang-ky`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_KHOA_PHONG_DE_TAI,
        payload: axios.get(requestUrl, { params : { maDeTai: madetai } })
    };
};

export const downloadDeTai = filename => {
    const requestUrl = `${apiUrl}de-tai-dang-ky/download-de-tai-dang-ky`;
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
