export interface IXetDuyetDeTaiUngDungChoDonVi {
    maDeTai?: number;
    trangThai?: number;
    xetDuyet?: number;
    ngayXetDuyet?: string;
    tapTin?: number;
    tenDeTai?: string;
    tenLoaiDeTai?: string;
    tenHangDeTai?: string;
    tenNhomDeTai?: string;
    tenChuThe?: string;
    donVi?: string;
}

export const defaultValueXetDuyetDeTaiUngDungChoDonVi: Readonly<IXetDuyetDeTaiUngDungChoDonVi> = {
    maDeTai: null,
    trangThai: 1,
    xetDuyet: 3,
    ngayXetDuyet: null,
    tapTin: null,
    tenDeTai: null,
    tenLoaiDeTai: null,
    tenHangDeTai: null,
    tenNhomDeTai: null,
    tenChuThe: null,
    donVi: null
};
