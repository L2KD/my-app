export interface IXetDuyetBaoCaoTongKet {
    maDeTai?: number;
    donVi?: string;
    tenDeTai?: string;
    ngayDangKy?: string;
    trangThai?: number;
    noiDungGopY?: string;
    ngayXetDuyet?: string;
    xetDuyet?: number;
    tapTin?: string;
    tenDonVi?: string;
}

export const defaultValueXetDuyetBaoCaoTongKet: Readonly<IXetDuyetBaoCaoTongKet> = {
    maDeTai: null,
    donVi: '',
    tenDeTai: '',
    ngayDangKy: '',
    trangThai: 1,
    noiDungGopY: '',
    ngayXetDuyet: '',
    xetDuyet: 3,
    tapTin: '',
    tenDonVi: ''
};
