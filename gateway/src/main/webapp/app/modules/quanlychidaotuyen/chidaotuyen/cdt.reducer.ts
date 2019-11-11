import axios from 'axios';
import { ICrudGetSomeAction1, IXoaVaTraVeDanhSach4Params, ICrudGetSomeAction2Params, ICrudGetSomeAction3Params,
    ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import {
    ITinhThanh,
    IDonVi,
    INam,
    ICDT,
    IBienBan,
    defaultValueTinhThanh,
    defaultValueDonVi,
    defaultValueNam,
    defaultValueCDT,
    defaultValueBienBan
} from './cdt.model';
import { IVanBan } from 'app/modules/quanlychidaotuyen/vanban/vanban.model';
import { IKeHoach } from 'app/modules/quanlychidaotuyen/kehoach/kehoach.model';
import { ILoaiCDT } from 'app/modules/quanlychidaotuyen/loaicdt/loaicdt.model';
import { IHinhThuc } from 'app/modules/quanlychidaotuyen/hinhthuc/HinhThuc.model';
import { INoiDung } from 'app/modules/quanlychidaotuyen/noidung/noidung.model';
import { IDoiTuong } from 'app/modules/quanlychidaotuyen/doituongtiepnhan/doituong.model';
import { IKhoaPhong } from 'app/modules/khoaphong/khoaphong.model';
import { INhanVien } from 'app/modules/nhanvien/nhanvien.model';
import { IDanhGia } from 'app/modules/quanlychidaotuyen/danhgia/danhgia.model';

export const ACTION_TYPES = {
    LAY_DANH_SACH_CDT: 'CDT/LAY_DANH_SACH_CDT',
    LAY_DANH_SACH_TINH_THANH: 'CDT/LAY_DANH_SACH_TINH_THANH',
    LAY_DANH_SACH_LOAI_CDT: 'CDT/LAY_DANH_SACH_LOAI_CDT',
    LAY_DANH_SACH_NOI_DUNG: 'CDT/LAY_DANH_SACH_NOI_DUNG',
    LAY_DANH_SACH_HINH_THUC: 'CDT/LAY_DANH_SACH_HINH_THUC',
    LAY_DANH_SACH_DOI_TUONG: 'CDT/LAY_DANH_SACH_DOI_TUONG',
    LAY_DANH_SACH_KHOA_PHONG: 'CDT/LAY_DANH_SACH_KHOA_PHONG',
    LAY_DANH_SACH_NHAN_VIEN: 'CDT/LAY_DANH_SACH_NHAN_VIEN',
    LAY_DANH_SACH_NHAN_VIEN_TIEP_NHAN: 'CDT/LAY_DANH_SACH_NHAN_VIEN_TIEP_NHAN',
    LAY_DANH_SACH_DON_VI: 'CDT/LAY_DANH_SACH_DON_VI',
    LAY_DANH_SACH_DON_VI_TIEP_NHAN: 'CDT/LAY_DANH_SACH_DON_VI_TIEP_NHAN',
    LAY_DANH_SACH_NAM: 'CDT/LAY_DANH_SACH_NAM',
    LAY_DANH_SACH_KE_HOACH: 'CDT/LAY_DANH_SACH_KE_HOACH',
    LAY_DANH_SACH_CDT_NOIDUNG: 'CDT/LAY_DANH_SACH_CDT_NOIDUNG',
    LAY_DANH_SACH_CDT_DOITUONG: 'CDT/LAY_DANH_SACH_CDT_DOITUONG',
    LAY_DANH_SACH_CDT_CANHAN_PHUTRACH: 'CDT/LAY_DANH_SACH_CDT_CANHAN_PHUTRACH',
    LAY_DANH_SACH_CDT_CANHAN_TIEPNHAN: 'CDT/LAY_DANH_SACH_CDT_CANHAN_TIEPNHAN',
    LAY_DANH_SACH_DANH_GIA: 'CDT/LAY_DANH_SACH_DANH_GIA',
    LAY_DANH_SACH_VB: 'CDT/LAY_DANH_SACH_VB',
    LAY_TINH_THANH: 'CDT/LAY_TINH_THANH',
    LAY_DON_VI: 'CDT/LAY_DON_VI',
    LAY_CDT: 'CDT/LAY_CDT',
    LAY_MAX_MA: 'CDT/LAY_MAX_MA',
    TAO_CDT: 'CDT/TAO_CDT',
    CAP_NHAT_CDT: 'CDT/CAP_NHAT_CDT',
    XOA_CDT: 'CDT/XOA_CDT',
    LAY_BIEN_BAN: 'CDT/LAY_BIEN_BAN',
    TAO_BIEN_BAN: 'CDT/TAO_BIEN_BAN',
    CAP_NHAT_BIEN_BAN: 'CDT/CAP_NHAT_BIEN_BAN',
    RESET: 'CDT/RESET'
};

const initialState = {
    loading: false,
    errorMessage: null,
    ds_cdt: [] as ReadonlyArray<ICDT>, // Danh sách chỉ đạo tuyến theo năm, đơn vị, kế hoạch
    ds_tinh_thanh: [] as ReadonlyArray<ITinhThanh>, // Danh sách tỉnh thành
    ds_don_vi: [] as ReadonlyArray<IDonVi>, // Danh sách đơn vị
    ds_don_vi_tiep_nhan: [] as ReadonlyArray<IDonVi>,
    ds_nam: [] as ReadonlyArray<INam>,
    ds_ke_hoach: [] as ReadonlyArray<IKeHoach>,
    ds_loai_cdt: [] as ReadonlyArray<ILoaiCDT>,
    ds_hinh_thuc: [] as ReadonlyArray<IHinhThuc>,
    ds_noi_dung: [] as ReadonlyArray<INoiDung>,
    ds_doi_tuong: [] as ReadonlyArray<IDoiTuong>,
    ds_khoa_phong: [] as ReadonlyArray<IKhoaPhong>,
    ds_nhan_vien: [] as ReadonlyArray<INhanVien>,
    ds_nhan_vien_tiep_nhan: [] as ReadonlyArray<INhanVien>,
    ds_cdt_noidung: [] as ReadonlyArray<INoiDung>,
    ds_cdt_doituong: [] as ReadonlyArray<IDoiTuong>,
    ds_cdt_canhan_phutrach: [] as ReadonlyArray<INhanVien>,
    ds_cdt_canhan_tiepnhan: [] as ReadonlyArray<INhanVien>,
    ds_danh_gia: [] as ReadonlyArray<IDanhGia>, // Đánh giá của Biên bản chỉ đạo tuyến
    tinh_thanh: defaultValueTinhThanh,
    max_ma: 0,
    don_vi: defaultValueDonVi,
    nam: defaultValueNam,
    cdt: defaultValueCDT,
    bienban: defaultValueBienBan,
    authorities: [] as any[],
    updating: false,
    updateSuccess: false,
    totalItems: 0
};

export type cdtState = Readonly<typeof initialState>;

// Reducer
export default (state: cdtState = initialState, action): cdtState => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_CDT):
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_TINH_THANH):
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_LOAI_CDT):
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_HINH_THUC):
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_NOI_DUNG):
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_DOI_TUONG):
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_KHOA_PHONG):
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_NHAN_VIEN):
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_NHAN_VIEN_TIEP_NHAN):
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_DON_VI):
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_DON_VI_TIEP_NHAN):
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_NAM):
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_KE_HOACH):
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_DANH_GIA):
        case REQUEST(ACTION_TYPES.LAY_TINH_THANH):
        case REQUEST(ACTION_TYPES.LAY_DON_VI):
        case REQUEST(ACTION_TYPES.LAY_CDT):
        case REQUEST(ACTION_TYPES.LAY_BIEN_BAN):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                loading: true
            };
        case REQUEST(ACTION_TYPES.TAO_CDT):
        case REQUEST(ACTION_TYPES.CAP_NHAT_CDT):
        case REQUEST(ACTION_TYPES.TAO_BIEN_BAN):
        case REQUEST(ACTION_TYPES.CAP_NHAT_BIEN_BAN):
        case REQUEST(ACTION_TYPES.XOA_CDT):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                updating: true
            };
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_CDT):
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_TINH_THANH):
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_LOAI_CDT):
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_HINH_THUC):
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_NOI_DUNG):
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_DOI_TUONG):
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_KHOA_PHONG):
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_NHAN_VIEN):
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_NHAN_VIEN_TIEP_NHAN):
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_DON_VI):
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_DON_VI_TIEP_NHAN):
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_NAM):
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_KE_HOACH):
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_DANH_GIA):
        case FAILURE(ACTION_TYPES.LAY_CDT):
        case FAILURE(ACTION_TYPES.LAY_DON_VI):
        case FAILURE(ACTION_TYPES.LAY_TINH_THANH):
        case FAILURE(ACTION_TYPES.TAO_CDT):
        case FAILURE(ACTION_TYPES.CAP_NHAT_CDT):
        case FAILURE(ACTION_TYPES.TAO_BIEN_BAN):
        case FAILURE(ACTION_TYPES.CAP_NHAT_BIEN_BAN):
        case FAILURE(ACTION_TYPES.XOA_CDT):
        case FAILURE(ACTION_TYPES.LAY_BIEN_BAN):
            return {
                ...state,
                loading: false,
                updating: false,
                updateSuccess: false,
                errorMessage: action.payload
            };
        case SUCCESS(ACTION_TYPES.LAY_DANH_SACH_CDT):
            return {
                ...state,
                loading: false,
                ds_cdt: action.payload.data,
                totalItems: action.payload.headers['x-total-count']
            };
        case SUCCESS(ACTION_TYPES.LAY_DANH_SACH_TINH_THANH):
            return {
                ...state,
                loading: false,
                ds_tinh_thanh: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.LAY_DANH_SACH_LOAI_CDT):
            return {
                ...state,
                loading: false,
                ds_loai_cdt: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.LAY_DANH_SACH_HINH_THUC):
            return {
                ...state,
                loading: false,
                ds_hinh_thuc: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.LAY_DANH_SACH_NOI_DUNG):
            return {
                ...state,
                loading: false,
                ds_noi_dung: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.LAY_DANH_SACH_DOI_TUONG):
            return {
                ...state,
                loading: false,
                ds_doi_tuong: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.LAY_DANH_SACH_KHOA_PHONG):
            return {
                ...state,
                loading: false,
                ds_khoa_phong: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.LAY_DANH_SACH_NHAN_VIEN):
            return {
                ...state,
                loading: false,
                ds_nhan_vien: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.LAY_DANH_SACH_NHAN_VIEN_TIEP_NHAN):
            return {
                ...state,
                loading: false,
                ds_nhan_vien_tiep_nhan: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.LAY_DANH_SACH_DON_VI):
            return {
                ...state,
                loading: false,
                ds_don_vi: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.LAY_DANH_SACH_DON_VI_TIEP_NHAN):
            return {
                ...state,
                loading: false,
                ds_don_vi_tiep_nhan: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.LAY_DANH_SACH_NAM):
            return {
                ...state,
                loading: false,
                ds_nam: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.LAY_DANH_SACH_KE_HOACH):
            return {
                ...state,
                loading: false,
                ds_ke_hoach: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.LAY_DANH_SACH_CDT_NOIDUNG):
            return {
                ...state,
                loading: false,
                ds_cdt_noidung: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.LAY_DANH_SACH_CDT_DOITUONG):
            return {
                ...state,
                loading: false,
                ds_cdt_doituong: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.LAY_DANH_SACH_CDT_CANHAN_PHUTRACH):
            return {
                ...state,
                loading: false,
                ds_cdt_canhan_phutrach: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.LAY_DANH_SACH_CDT_CANHAN_TIEPNHAN):
            return {
                ...state,
                loading: false,
                ds_cdt_canhan_tiepnhan: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.LAY_DANH_SACH_DANH_GIA):
            return {
                ...state,
                loading: false,
                ds_danh_gia: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.LAY_CDT):
            return {
                ...state,
                loading: false,
                cdt: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.LAY_BIEN_BAN):
            return {
                ...state,
                loading: false,
                bienban: action.payload.data
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
        case SUCCESS(ACTION_TYPES.TAO_CDT):
        case SUCCESS(ACTION_TYPES.CAP_NHAT_CDT):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                cdt: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.TAO_BIEN_BAN):
        case SUCCESS(ACTION_TYPES.CAP_NHAT_BIEN_BAN):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                bienban: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.XOA_CDT):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                cdt: defaultValueCDT
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

export const getDanhSachLoaiCDT: ICrudGetSomeAction1<ILoaiCDT> = () => {
    const requestUrl = `${apiUrl}loai-cdt/lay-danh-sach-loai-cdt`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_LOAI_CDT,
        payload: axios.get<ILoaiCDT>(requestUrl)
    };
};

export const getDanhSachHinhThuc: ICrudGetSomeAction1<IHinhThuc> = () => {
    const requestUrl = `${apiUrl}hinh-thuc/lay-danh-sach-hinh-thuc`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_HINH_THUC,
        payload: axios.get<IHinhThuc>(requestUrl)
    };
};

export const getDanhSachNoiDung: ICrudGetSomeAction1<INoiDung> = () => {
    const requestUrl = `${apiUrl}noi-dung/lay-danh-sach-noi-dung`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_NOI_DUNG,
        payload: axios.get<INoiDung>(requestUrl)
    };
};

export const getDanhSachDoiTuong: ICrudGetSomeAction1<IDoiTuong> = () => {
    const requestUrl = `${apiUrl}doi-tuong/lay-danh-sach-doi-tuong`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_DOI_TUONG,
        payload: axios.get<IDoiTuong>(requestUrl)
    };
};

export const getDanhSachKhoaPhong: ICrudGetSomeAction1<IKhoaPhong> = madonvi => {
    const requestUrl = `${apiUrl}khoa-phong/lay-danh-sach-khoa-phong-theo-don-vi`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_KHOA_PHONG,
        payload: axios.get(requestUrl, { params : { maDonVi: madonvi } })
    };
};

export const getDanhSachNhanVien: ICrudGetSomeAction1<INhanVien> = makhoaphong => {
    const requestUrl = `${apiUrl}nhan-vien/lay-danh-sach-nhan-vien-theo-khoa-phong`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_NHAN_VIEN,
        payload: axios.get(requestUrl, { params : { maKhoaPhong: makhoaphong } })
    };
};

export const getDanhSachNhanVienTiepNhan: ICrudGetSomeAction1<INhanVien> = madonvi => {
    const requestUrl = `${apiUrl}nhan-vien/lay-danh-sach-nhan-vien-theo-don-vi`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_NHAN_VIEN_TIEP_NHAN,
        payload: axios.get(requestUrl, { params : { maDonVi: madonvi } })
    };
};

export const getDanhSachDonVi: ICrudGetSomeAction1<IDonVi> = tinhthanh => {
    const requestUrl = `${apiUrl}van-ban/lay-danh-sach-don-vi-theo-tinh`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_DON_VI,
        payload: axios.get(requestUrl, { params : { ma_tinh_thanh: tinhthanh } })
    };
};

export const getDanhSachDonViTiepNhan: ICrudGetSomeAction1<IDonVi> = madonvi => {
    const requestUrl = `${apiUrl}cdt/lay-danh-sach-don-vi-tiep-nhan`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_DON_VI_TIEP_NHAN,
        payload: axios.get(requestUrl, { params : { maDonVi: madonvi } })
    };
};

export const getDanhSachNam: ICrudGetAllAction<INam> = () => {
    const requestUrl = `${apiUrl}cdt/lay-danh-sach-nam`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_NAM,
        payload: axios.get(requestUrl)
    };
};

export const getDanhSachKeHoach: ICrudGetSomeAction2Params<IKeHoach> = (donvi, _nam) => {
    const requestUrl = `${apiUrl}ke-hoach/lay-danh-sach-ke-hoach-theo-donvi-nam`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_KE_HOACH,
        payload: axios.get<IKeHoach>(requestUrl, { params : { maDonVi: donvi, nam: _nam } })
    };
};

export const getDanhSachCDT: ICrudGetSomeAction3Params<ICDT> = (donvi, _nam, kehoach) => {
    const requestUrl = `${apiUrl}cdt/lay-danh-sach-cdt-theo-donvi-nam-kehoach`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_CDT,
        payload: axios.get<ICDT>(requestUrl, { params : { maDonVi: donvi, nam: _nam, maKeHoach: kehoach } })
    };
};
export const getDanhSachCDT_DonVi_Nam: ICrudGetSomeAction2Params<ICDT> = (donvi, _nam) => {
    const requestUrl = `${apiUrl}cdt/lay-danh-sach-cdt-theo-donvi-nam`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_CDT,
        payload: axios.get<ICDT>(requestUrl, { params : { maDonVi: donvi, nam: _nam } })
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

export const getCDT: ICrudGetAction<ICDT> = cdt => {
    const requestUrl = `${apiUrl}cdt/lay-cdt`;
    return {
        type: ACTION_TYPES.LAY_CDT,
        payload: axios.get<ICDT>(requestUrl, { params : { maCDT: cdt } })
    };
};

export const uploadCDT = data => {
    const requestUrl = `${apiUrl}cdt/upload-cdt`; // Sua lai theo tung muc
    return axios.post(requestUrl, data);
};

export const addCDT: ICrudPutAction<ICDT> = cdt => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.TAO_CDT,
        payload: axios.post(`${apiUrl}cdt/them-moi-cdt`, cdt)
    });
    dispatch(getDanhSachCDT(cdt.donVi, cdt.nam, cdt.keHoach));
    return result;
};

// export const addCDT_1 = (kehoach, maxma, vb) => async dispatch => {
//     const result = await dispatch({
//         type: ACTION_TYPES.TAO_CDT,
//         payload: axios.post(`${apiUrl}ke-hoach/them-moi-ke-hoach`, kehoach)
//     });
//     for (const ele of vb) {
//         addChiTietCDT(maxma, ele);
//     }
//     return result;
// };

//     const addChiTietCDT = (makh, mavb) => {
//     const requestUrl = `${apiUrl}ke-hoach/them-moi-chi-tiet-ke-hoach?ma_ke_hoach=${makh}&ma_van_ban=${mavb}`;
//     axios.post(requestUrl);
// };

export const getMaxMaCDT: ICrudGetAction<number> = () => {
    const requestUrl = `${apiUrl}cdt/lay-max`;
    return {
        type: ACTION_TYPES.LAY_MAX_MA,
        payload: axios.get<number>(requestUrl)
    };
};

export const updateCDT: ICrudPutAction<ICDT> = cdt => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.CAP_NHAT_CDT,
        payload: axios.post(`${apiUrl}cdt/cap-nhat-cdt`, cdt)
    });
      dispatch(getDanhSachCDT(cdt.donVi, cdt.ngayThucHien.toString().substring(0, 4)), cdt.keHoach);
    return result;
};

export const xoaCDTVaTraVeDanhSach: IXoaVaTraVeDanhSach4Params<ICDT> = (cdt, maDonVi, nam, maKeHoach) => async dispatch => {
    const requestUrl = `${apiUrl}cdt/xoa`;
    const result = await dispatch({
        type: ACTION_TYPES.XOA_CDT,
        payload: axios.delete(requestUrl, { params: { maCDT: cdt } })
    });
    dispatch(getDanhSachCDT(maDonVi, nam, maKeHoach));
    return result;
};

export const addCDT_1 = (cdt, maxma, ds_noidung: INoiDung[], ds_doituong: IDoiTuong[],
                         ds_canhan_phutrach: INhanVien[], ds_canhan_tiepnhan: INhanVien[]) => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.TAO_CDT,
        payload: axios.post(`${apiUrl}cdt/them-moi-cdt`, cdt)
    });
    dispatch(getMaxMaCDT);
    for (const ele of ds_noidung) {
        addCDT_NoiDung(maxma, ele.maNoiDung);
    }
    for (const ele of ds_doituong) {
        addCDT_DoiTuong(maxma, ele.maDoiTuong);
    }
    for (const ele of ds_canhan_phutrach) {
        addCDT_CaNhan_PhuTrach(maxma, ele.maNhanVien);
    }
    for (const ele of ds_canhan_tiepnhan) {
        addCDT_CaNhan_TiepNhan(maxma, ele.maNhanVien);
    }
    dispatch(getDanhSachCDT(cdt.donVi, cdt.nam, cdt.keHoach));
    return result;
};

export const deleteCDT_NoiDung = macdt => {
    const requestUrl = `${apiUrl}cdt/xoa-cdt-noi-dung`;
    axios.delete(requestUrl, { params: { maCDT: macdt } });
};

export const addCDT_NoiDung = (macdt, manoidung) => {
    const requestUrl = `${apiUrl}cdt/them-moi-cdt-noi-dung?maCDT=${macdt}&maNoiDung=${manoidung}`;
    axios.post(requestUrl);
};

export const deleteCDT_DoiTuong = macdt => {
    const requestUrl = `${apiUrl}cdt/xoa-cdt-doi-tuong`;
    axios.delete(requestUrl, { params: { maCDT: macdt } });
};

export const addCDT_DoiTuong = (macdt, madoituong) => {
    const requestUrl = `${apiUrl}cdt/them-moi-cdt-doi-tuong?maCDT=${macdt}&maDoiTuong=${madoituong}`;
    axios.post(requestUrl);
};

export const deleteCDT_CaNhan_PhuTrach = macdt => {
    const requestUrl = `${apiUrl}cdt/xoa-cdt-ca-nhan-phu-trach`;
    axios.delete(requestUrl, { params: { maCDT: macdt } });
};

export const addCDT_CaNhan_PhuTrach = (macdt, manhanvien) => {
    const requestUrl = `${apiUrl}cdt/them-moi-cdt-ca-nhan-phu-trach?maCDT=${macdt}&maNhanVien=${manhanvien}`;
    axios.post(requestUrl);
};

export const deleteCDT_CaNhan_TiepNhan = macdt => {
    const requestUrl = `${apiUrl}cdt/xoa-cdt-ca-nhan-tiep-nhan`;
    axios.delete(requestUrl, { params: { maCDT: macdt } });
};

export const addCDT_CaNhan_TiepNhan = (macdt, manhanvien) => {
    const requestUrl = `${apiUrl}cdt/them-moi-cdt-ca-nhan-tiep-nhan?maCDT=${macdt}&maNhanVien=${manhanvien}`;
    axios.post(requestUrl);
};

export const updateCDT_1 = (cdt, ds_noidung: INoiDung[], ds_doituong: IDoiTuong[],
                         ds_canhan_phutrach: INhanVien[], ds_canhan_tiepnhan: INhanVien[]) => async dispatch => {
    deleteCDT_NoiDung(cdt.maCDT);
    deleteCDT_DoiTuong(cdt.maCDT);
    deleteCDT_CaNhan_TiepNhan(cdt.maCDT);
    deleteCDT_CaNhan_PhuTrach(cdt.maCDT);
    const result = await dispatch({
        type: ACTION_TYPES.CAP_NHAT_CDT,
        payload: axios.post(`${apiUrl}cdt/cap-nhat-cdt`, cdt)
    });
    for (const ele of ds_noidung) {
        addCDT_NoiDung(cdt.maCDT, ele.maNoiDung);
    }
    for (const ele of ds_doituong) {
        addCDT_DoiTuong(cdt.maCDT, ele.maDoiTuong);
    }
    for (const ele of ds_canhan_phutrach) {
        addCDT_CaNhan_PhuTrach(cdt.maCDT, ele.maNhanVien);
    }
    for (const ele of ds_canhan_tiepnhan) {
        addCDT_CaNhan_TiepNhan(cdt.maCDT, ele.maNhanVien);
    }
    dispatch(getDanhSachCDT(cdt.donVi, cdt.nam, cdt.keHoach));
    return result;
};

export const getDanhSachCDT_NoiDung: ICrudGetSomeAction2Params<INoiDung> = macdt => {
    const requestUrl = `${apiUrl}cdt/lay-danh-sach-cdt-noi-dung`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_CDT_NOIDUNG,
        payload: axios.get<INoiDung>(requestUrl, { params : { maCDT: macdt } })
    };
};

export const getDanhSachCDT_DoiTuong: ICrudGetSomeAction2Params<IDoiTuong> = macdt => {
    const requestUrl = `${apiUrl}cdt/lay-danh-sach-cdt-doi-tuong`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_CDT_DOITUONG,
        payload: axios.get<IDoiTuong>(requestUrl, { params : { maCDT: macdt } })
    };
};

export const getDanhSachCDT_CaNhan_PhuTrach: ICrudGetSomeAction2Params<INhanVien> = macdt => {
    const requestUrl = `${apiUrl}cdt/lay-danh-sach-cdt-ca-nhan-phu-trach`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_CDT_CANHAN_PHUTRACH,
        payload: axios.get<INhanVien>(requestUrl, { params : { maCDT: macdt } })
    };
};

export const getDanhSachCDT_CaNhan_TiepNhan: ICrudGetSomeAction2Params<INhanVien> = macdt => {
    const requestUrl = `${apiUrl}cdt/lay-danh-sach-cdt-ca-nhan-tiep-nhan`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_CDT_CANHAN_TIEPNHAN,
        payload: axios.get<INhanVien>(requestUrl, { params : { maCDT: macdt } })
    };
};

    // Biên bản chỉ đạo tuyến
export const getDanhSachDanhGia: ICrudGetSomeAction1<IDanhGia> = loaicdt => {
    const requestUrl = `${apiUrl}danh-gia/lay-danh-sach-danh-gia-theo-loai`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_DANH_GIA,
        payload: axios.get<IDanhGia>(requestUrl, { params : { loai_cdt: loaicdt } })
    };
};

export const getBienBan: ICrudGetAction<IBienBan> = cdt => {
    const requestUrl = `${apiUrl}cdt/lay-bien-ban`;
    return {
        type: ACTION_TYPES.LAY_BIEN_BAN,
        payload: axios.get<IBienBan>(requestUrl, { params : { maCDT: cdt } })
    };
};

export const addBienBanCDT: IXoaVaTraVeDanhSach4Params<IBienBan> = (bienban, donvi, nam, kehoach) => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.TAO_BIEN_BAN,
        payload: axios.post(`${apiUrl}cdt/them-moi-bien-ban-cdt`, bienban)
    });
    dispatch(getDanhSachCDT(donvi, nam, kehoach));
    return result;
};

export const updateBienBanCDT: IXoaVaTraVeDanhSach4Params<IBienBan> = (bienban, donvi, nam, kehoach) => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.CAP_NHAT_BIEN_BAN,
        payload: axios.post(`${apiUrl}cdt/cap-nhat-bien-ban-cdt`, bienban)
    });
    dispatch(getDanhSachCDT(donvi, nam, kehoach));
    return result;
};

export const downloadCDT = filename => {
    const requestUrl = `${apiUrl}cdt/download-cdt`;
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
