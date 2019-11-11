export interface IDanhGia {
    ma_danh_gia?: number;
    loai_cdt?: number;
    danh_gia_cdt?: string;
    vi_tri?: number;
    trang_thai?: number;
    nguoi_tao?: number;
}

export interface ILoaiCDT {
    ma_loai_cdt?: number;
    ten_loai_cdt?: string;
}

export const defaultValue: Readonly<IDanhGia> = {
    ma_danh_gia: null,
    loai_cdt: null,
    danh_gia_cdt: null,
    vi_tri: null,
    trang_thai: 0,
    nguoi_tao: null
};

export const defaultValueLoai: Readonly<ILoaiCDT> = {
    ma_loai_cdt: null,
    ten_loai_cdt: null
};
