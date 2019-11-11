export interface IDeTaiDangKy {
    maDeTai?: number;
    donVi?: string;
    tenDeTai?: string;
    ngayDangKy?: string;
    khoaPhongChuNhiem?: string;
    tapTin?: string;
    tenDonVi?: string;
    tenKhoaPhongChuNhiem?: string;
}

export const defaultValueDeTaiDangKy: Readonly<IDeTaiDangKy> = {
    maDeTai: null,
    donVi: null,
    tenDeTai: null,
    ngayDangKy: null,
    khoaPhongChuNhiem: null,
    tapTin: null,
    tenDonVi: null,
    tenKhoaPhongChuNhiem: null
};
