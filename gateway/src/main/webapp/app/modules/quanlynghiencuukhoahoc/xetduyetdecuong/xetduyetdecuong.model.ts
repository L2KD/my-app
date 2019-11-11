export interface IXetDuyetDeCuong {
    maDeTai?: number;
    donVi?: string;
    tenDeTai?: string;
    ngayDangKy?: string;
    trangThai?: number;
    noiDungGopY?: string;
    ngayXetDuyet?: string;
    xetDuyet?: number;
    tapTinDeCuong?: string;
    tapTinBienBan?: string;
    tenDonVi?: string;
}

export const defaultValueXetDuyetDeCuong: Readonly<IXetDuyetDeCuong> = {
    maDeTai: null,
    donVi: '',
    tenDeTai: '',
    ngayDangKy: '',
    trangThai: 1,
    noiDungGopY: '',
    ngayXetDuyet: '',
    xetDuyet: 3,
    tapTinDeCuong: '',
    tapTinBienBan: '',
    tenDonVi: ''
};
