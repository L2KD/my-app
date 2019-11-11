export interface IXetDuyetDeTai {
    maDeTai?: number;
    donVi?: string;
    tenDeTai?: string;
    ngayDangKy?: string;
    trangThai?: number;
    yKienDanhGia?: string;
    ngayXetDuyet?: string;
    xetDuyet?: number;
    tapTin?: string;
    tenDonVi?: string;
}

export const defaultValueXetDuyetDeTai: Readonly<IXetDuyetDeTai> = {
    maDeTai: null,
    donVi: '',
    tenDeTai: '',
    ngayDangKy: '',
    trangThai: 1,
    yKienDanhGia: '',
    ngayXetDuyet: '',
    xetDuyet: 3,
    tapTin: '',
    tenDonVi: ''
};
