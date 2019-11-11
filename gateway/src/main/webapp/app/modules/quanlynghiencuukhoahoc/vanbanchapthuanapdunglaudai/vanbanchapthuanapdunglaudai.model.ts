export interface IVanBanChapThuanApDungLauDai {
    maDeTai?: number;
    trangThai?: number;
    tapTin?: string;
    tenDeTai?: string;
    tenLoaiDeTai?: string;
    tenHangDeTai?: string;
    tenNhomDeTai?: string;
    tenChuThe?: string;
}

export const defaultValueVanBanChapThuanApDungLauDai: Readonly<IVanBanChapThuanApDungLauDai> = {
    maDeTai: null,
    trangThai: 1,
    tapTin: null,
    tenDeTai: null,
    tenLoaiDeTai: null,
    tenHangDeTai: null,
    tenNhomDeTai: null,
    tenChuThe: null
};
