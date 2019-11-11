export interface IDeTaiNam {
    maDeTai?: number;
    nam?: number;
    trangThai?: number;
    loaiDeTai?: number;
    hangDeTai?: number;
    nhomDeTai?: number;
    chuThe?: number;
    chuNhiem?: number;

    tenDeTai?: string;
    tenLoaiDeTai?: string;
    tenHangDeTai?: string;
    tenNhomDeTai?: string;
    tenChuNhiem?: string;
    donVi?: string;
}

export const defaultValueDeTaiNam: Readonly<IDeTaiNam> = {
    maDeTai: null,
    nam: null,
    trangThai: null,
    loaiDeTai: null,
    hangDeTai: null,
    nhomDeTai: null,
    chuThe: null,
    chuNhiem: null,
    tenDeTai: null,
    tenLoaiDeTai: null,
    tenHangDeTai: null,
    tenNhomDeTai: null,
    tenChuNhiem: null,
    donVi: null
};
