export interface ILoaiCDT {
    ma_loai_cdt?: number;
    ten_loai_cdt?: string;
    nguoi_tao?: number;
}

export const defaultValue: Readonly<ILoaiCDT> = {
    ma_loai_cdt: null,
    ten_loai_cdt: null,
    nguoi_tao: null
};
