import axios from 'axios';
import { ICrudGetAction, ICrudGetSomeAction1, ICrudGetAllAction, ICrudGetSomeAction3Params,
    ICrudGetSomeAction4Params, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IDeTaiNam, defaultValueDeTaiNam } from 'app/modules/quanlynghiencuukhoahoc/detainam/detainam.model';
import { IDonVi, ITinhThanh } from 'app/modules/quanlychidaotuyen/kehoach/kehoach.model';
import { ILoaiDeTai } from 'app/modules/quanlynghiencuukhoahoc/loaidetai/loaidetai.model';
import { IHangDeTai } from 'app/modules/quanlynghiencuukhoahoc/hangdetai/hangdetai.model';
import { INhomDeTai } from 'app/modules/quanlynghiencuukhoahoc/nhomdetai/nhomdetai.model';
import { INhanVien } from 'app/modules/nhanvien/nhanvien.model';
import { IChuThe } from 'app/modules/quanlynghiencuukhoahoc/chuthedetai/chuthedetai.model';

export const ACTION_TYPES = {
    LAY_DANH_SACH_DE_TAI_NAM: 'DeTaiNam/LAY_DANH_SACH_DE_TAI_NAM',
    LAY_DANH_SACH_TINH_THANH: 'DeTaiNam/LAY_DANH_SACH_TINH_THANH',
    LAY_DANH_SACH_DON_VI: 'DeTaiNam/LAY_DANH_SACH_DON_VI',
    LAY_DANH_SACH_LOAI_DE_TAI: 'DeTaiNam/LAY_DANH_SACH_LOAI_DE_TAI',
    LAY_DANH_SACH_HANG_DE_TAI: 'DeTaiNam/LAY_DANH_SACH_HANG_DE_TAI',
    LAY_DANH_SACH_NHOM_DE_TAI: 'DeTaiNam/LAY_DANH_SACH_NHOM_DE_TAI',
    LAY_DANH_SACH_CHU_THE: 'DeTaiNam/LAY_DANH_SACH_CHU_THE',
    LAY_DANH_SACH_NHAN_VIEN: 'DeTaiNam/LAY_DANH_SACH_NHAN_VIEN',
    LAY_DANH_SACH_NGUOI_THUC_HIEN: 'DeTaiNam/LAY_DANH_SACH_NGUOI_THUC_HIEN',
    LAY_MAX_MA: 'DeTaiNam/LAY_MAX_MA',
    LAY_DE_TAI_NAM: 'DeTaiNam/LAY_DE_TAI_NAM',
    CAP_NHAT_DE_TAI_NAM: 'DeTaiNam/CAP_NHAT_DE_TAI_NAM',
    RESET: 'DeTaiNam/RESET'
};

const initialState = {
    ds_de_tai_nam: [] as ReadonlyArray<IDeTaiNam>,
    ds_tinh_thanh: [] as ReadonlyArray<ITinhThanh>,
    ds_don_vi: [] as ReadonlyArray<IDonVi>,
    de_tai_nam: defaultValueDeTaiNam,
    ds_loai_de_tai: [] as ReadonlyArray<ILoaiDeTai>,
    ds_hang_de_tai: [] as ReadonlyArray<IHangDeTai>,
    ds_nhom_de_tai: [] as ReadonlyArray<INhomDeTai>,
    ds_chu_the: [] as ReadonlyArray<IChuThe>,
    ds_nhan_vien: [] as ReadonlyArray<INhanVien>,
    ds_nguoi_thuc_hien: [] as ReadonlyArray<INhanVien>,
    max_ma_de_tai: 0,
    loading: false,
    errorMessage: null,
    authorities: [] as any[],
    updating: false,
    updateSuccess: false,
    totalItems: 0
};

export type deTaiNamState = Readonly<typeof initialState>;

// Reducer
export default (state: deTaiNamState = initialState, action): deTaiNamState => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_DE_TAI_NAM):
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_TINH_THANH):
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_DON_VI):
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_LOAI_DE_TAI):
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_HANG_DE_TAI):
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_NHOM_DE_TAI):
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_CHU_THE):
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_NHAN_VIEN):
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_NGUOI_THUC_HIEN):
        case REQUEST(ACTION_TYPES.LAY_DE_TAI_NAM):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                loading: true
            };
        case REQUEST(ACTION_TYPES.CAP_NHAT_DE_TAI_NAM):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                updating: true
            };
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_DE_TAI_NAM):
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_TINH_THANH):
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_DON_VI):
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_LOAI_DE_TAI):
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_HANG_DE_TAI):
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_NHOM_DE_TAI):
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_CHU_THE):
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_NHAN_VIEN):
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_NGUOI_THUC_HIEN):
        case FAILURE(ACTION_TYPES.CAP_NHAT_DE_TAI_NAM):
            return {
                ...state,
                loading: false,
                updating: false,
                updateSuccess: false,
                errorMessage: action.payload
            };
        case SUCCESS(ACTION_TYPES.LAY_DANH_SACH_DE_TAI_NAM):
            return {
                ...state,
                loading: false,
                ds_de_tai_nam: action.payload.data,
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
        case SUCCESS(ACTION_TYPES.LAY_DANH_SACH_LOAI_DE_TAI):
            return {
                ...state,
                loading: false,
                ds_loai_de_tai: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.LAY_DANH_SACH_HANG_DE_TAI):
            return {
                ...state,
                loading: false,
                ds_hang_de_tai: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.LAY_DANH_SACH_NHOM_DE_TAI):
            return {
                ...state,
                loading: false,
                ds_nhom_de_tai: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.LAY_DANH_SACH_CHU_THE):
            return {
                ...state,
                loading: false,
                ds_chu_the: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.LAY_DANH_SACH_NHAN_VIEN):
            return {
                ...state,
                loading: false,
                ds_nhan_vien: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.LAY_DANH_SACH_NGUOI_THUC_HIEN):
            return {
                ...state,
                loading: false,
                ds_nguoi_thuc_hien: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.LAY_DE_TAI_NAM):
            return {
                ...state,
                loading: false,
                de_tai_nam: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.LAY_MAX_MA):
            return {
                ...state,
                loading: false,
                max_ma_de_tai: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.CAP_NHAT_DE_TAI_NAM):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                de_tai_nam: action.payload.data
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

export const getDanhSachLoaiDeTai: ICrudGetSomeAction1<ILoaiDeTai> = () => {
    const requestUrl = `${apiUrl}loai-de-tai/lay-danh-sach-loai-de-tai`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_LOAI_DE_TAI,
        payload: axios.get(requestUrl)
    };
};

export const getDanhSachHangDeTai: ICrudGetSomeAction1<IHangDeTai> = () => {
    const requestUrl = `${apiUrl}hang-de-tai/lay-danh-sach-hang-de-tai`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_HANG_DE_TAI,
        payload: axios.get(requestUrl)
    };
};

export const getDanhSachNhomDeTai: ICrudGetSomeAction1<INhomDeTai> = () => {
    const requestUrl = `${apiUrl}nhom-de-tai/lay-danh-sach-nhom-de-tai`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_NHOM_DE_TAI,
        payload: axios.get(requestUrl)
    };
};

export const getDanhSachChuThe: ICrudGetSomeAction1<IChuThe> = () => {
    const requestUrl = `${apiUrl}chu-the/lay-danh-sach-chu-the`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_CHU_THE,
        payload: axios.get(requestUrl)
    };
};

export const getDanhSachNhanVien: ICrudGetSomeAction1<INhanVien> = madonvi => {
    const requestUrl = `${apiUrl}nhan-vien/lay-danh-sach-nhan-vien-theo-don-vi`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_NHAN_VIEN,
        payload: axios.get(requestUrl, { params : { maDonVi: madonvi } })
    };
};

export const getDanhSachNguoiThucHien: ICrudGetSomeAction1<INhanVien> = madetai => {
    const requestUrl = `${apiUrl}de-tai-nam/lay-danh-sach-nguoi-thuc-hien`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_NGUOI_THUC_HIEN,
        payload: axios.get(requestUrl, { params : { maDeTai: madetai } })
    };
};

export const getDanhSachDeTaiNam: ICrudGetSomeAction3Params<IDeTaiNam> = (donvi, namdt, trangthai) => {
    const requestUrl = `${apiUrl}de-tai-nam/lay-danh-sach-de-tai-nam`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_DE_TAI_NAM,
        payload: axios.get(requestUrl, { params : { donVi: donvi, nam: namdt, trangThai: trangthai } })
    };
};

export const getDanhSachDeTaiNamTheoTen_DonVi_Nam_TrangThai: ICrudGetSomeAction4Params<IDeTaiNam> = (detai, donvi, _nam, trangthai) => {
    const requestUrl = `${apiUrl}de-tai-nam/lay-danh-sach-de-tai-nam-theo-ten-don-vi-nam-trang-thai`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_DE_TAI_NAM,
        payload: axios.get<IDeTaiNam>(requestUrl, { params : { tenDeTai: detai, donVi: donvi, nam: _nam, trangThai: trangthai } })
    };
};

export const getDeTaiNam: ICrudGetAction<IDeTaiNam> = madetai => {
    const requestUrl = `${apiUrl}de-tai-nam/lay-de-tai-nam`;
    return {
        type: ACTION_TYPES.LAY_DE_TAI_NAM,
        payload: axios.get<IDeTaiNam>(requestUrl, { params : { maDeTai: madetai } })
    };
};

export const addDeTaiNam_NguoiThucHien = (madetai, manhanvien) => {
    const requestUrl = `${apiUrl}de-tai-nam/them-de-tai-nam-nguoi-thuc-hien?maDeTai=${madetai}&maNhanVien=${manhanvien}`;
    axios.post(requestUrl);
};

export const deleteDeTaiNam_NguoiThucHien = madetai => {
    const requestUrl = `${apiUrl}de-tai-nam/xoa-de-tai-nam-nguoi-thuc-hien?maDeTai=${madetai}`;
    axios.delete(requestUrl);
};

export const updateDeTaiNam = (detainam, trangthai, ds_nguoi_thuc_hien: INhanVien[]) => async dispatch => {
    deleteDeTaiNam_NguoiThucHien(detainam.maDeTai);
    const result = await dispatch({
        type: ACTION_TYPES.CAP_NHAT_DE_TAI_NAM,
        payload: axios.post(`${apiUrl}de-tai-nam/cap-nhat-de-tai-nam`, detainam)
    });
    await dispatch(() => {
        for (const ele of ds_nguoi_thuc_hien) {
            addDeTaiNam_NguoiThucHien(detainam.maDeTai, ele.maNhanVien);
        }
    });
    await dispatch(getDanhSachDeTaiNam(detainam.donVi, detainam.nam, trangthai));
    return result;
};

export const reset = () => ({
    type: ACTION_TYPES.RESET
});
