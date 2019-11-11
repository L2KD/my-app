export interface IBienBanKeHoachDeTaiUngDungChoDonVi {
    maDeTai?: number;
    trangThai?: number;
    tapTin?: string;
    tenDeTai?: string;
    tenLoaiDeTai?: string;
    tenHangDeTai?: string;
    tenNhomDeTai?: string;
    tenChuThe?: string;
}

export const defaultValueBienBanKeHoachDeTaiUngDungChoDonVi: Readonly<IBienBanKeHoachDeTaiUngDungChoDonVi> = {
    maDeTai: null,
    trangThai: 1,
    tapTin: null,
    tenDeTai: null,
    tenLoaiDeTai: null,
    tenHangDeTai: null,
    tenNhomDeTai: null,
    tenChuThe: null
};
