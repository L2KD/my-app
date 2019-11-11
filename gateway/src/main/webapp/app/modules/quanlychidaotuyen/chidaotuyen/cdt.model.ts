export interface ICDT {
    maCDT?: number;
    ngayThucHien?: number;
    nam?: number;
    donVi?: string;
    keHoach?: number;
    hinhThuc?: number;
    loaiCDT?: number;
    truongDoan?: number;
    thuKi?: number;
    donViTiepNhan?: string;
    nguoiDaiDien?: number;
    trangThai?: number;
    tapTin?: string;
    nguoiTao?: number;
    tenDonVi?: string;
    noiDungTrichYeu?: string;
    tenHinhThuc?: string;
    tenLoaiCDT?: string;
    tenDonViTiepNhan?: string;
    soNguoiTiepNhan?: string;
    khoaPhong?: string;
    tenKhoaPhong?: string;
    tenNguoiDaiDien?: string;
}

export interface IBienBan {
    maCDT?: number;
    danhGia?: number;
    ngayBatDau?: string;
    ngayKetThuc?: string;
    baoCaoKetQua?: string;
    thongBaoSaiSot?: string;
    deNghi?: string;
    dongGop?: string;
    nhuCau?: string;
    nguoiTao?: string;
}

export interface ITinhThanh {
    maTinhThanh?: number;
    tenTinhThanh?: string;
}

export interface IDonVi {
    maDonVi?: string;
    tenDonVi?: string;
}

export interface INam {
    nam?: number;
}

export const defaultValueCDT: Readonly<ICDT> = {
    maCDT: null,
    ngayThucHien: null,
    nam: null,
    donVi: null,
    keHoach: null,
    hinhThuc: null,
    loaiCDT: null,
    truongDoan: null,
    thuKi: null,
    donViTiepNhan: null,
    nguoiDaiDien: null,
    trangThai: null,
    tapTin: null,
    nguoiTao: null,
    tenDonVi: null,
    noiDungTrichYeu: null,
    tenHinhThuc: null,
    tenLoaiCDT: null,
    tenDonViTiepNhan: null,
    soNguoiTiepNhan: null,
    khoaPhong: null,
    tenKhoaPhong: null,
    tenNguoiDaiDien: null
};

export const defaultValueTinhThanh: Readonly<ITinhThanh> = {
    maTinhThanh: null,
    tenTinhThanh: ''
};

export const defaultValueDonVi: Readonly<IDonVi> = {
    maDonVi: null,
    tenDonVi: ''
};

export const defaultValueNam: Readonly<INam> = {
    nam: null
};

export const defaultValueBienBan: Readonly<IBienBan> = {
    maCDT: null,
    danhGia: null,
    ngayBatDau: null,
    ngayKetThuc: null,
    baoCaoKetQua: null,
    thongBaoSaiSot: null,
    deNghi: null,
    dongGop: null,
    nhuCau: null,
    nguoiTao: null
};
