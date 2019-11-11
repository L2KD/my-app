export interface IVanBanApDungLauDai {
    maDeTai?: number;
    trangThai?: number;
    tapTin?: string;
    tenDeTai?: string;
    tenLoaiDeTai?: string;
    tenHangDeTai?: string;
    tenNhomDeTai?: string;
    tenChuThe?: string;
}

export const defaultValueVanBanApDungLauDai: Readonly<IVanBanApDungLauDai> = {
    maDeTai: null,
    trangThai: 1,
    tapTin: null,
    tenDeTai: null,
    tenLoaiDeTai: null,
    tenHangDeTai: null,
    tenNhomDeTai: null,
    tenChuThe: null
};
