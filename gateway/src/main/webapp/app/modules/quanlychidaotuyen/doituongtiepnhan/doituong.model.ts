export interface IDoiTuong {
    maDoiTuong?: number;
    tenDoiTuong?: string;
    viTri?: number;
    trangThai?: number;
    nguoiTao?: number;
}

export const defaultValue: Readonly<IDoiTuong> = {
    maDoiTuong: null,
    tenDoiTuong: null,
    viTri: null,
    trangThai: 0,
    nguoiTao: null
};
