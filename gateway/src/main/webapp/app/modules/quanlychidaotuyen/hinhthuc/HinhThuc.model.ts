export interface IHinhThuc {
    ma_hinh_thuc?: number;
    ten_hinh_thuc?: string;
    vi_tri?: number;
    trang_thai?: number;
    nguoi_tao?: number;
}

export const defaultValue: Readonly<IHinhThuc> = {
    ma_hinh_thuc: null,
    ten_hinh_thuc: null,
    vi_tri: null,
    trang_thai: 0,
    nguoi_tao: null
};
