export interface IVanBan {
    maVanBan?: number;
    donVi?: string;
    coQuanBanHanh?: number;
    noiDungTrichYeu?: string;
    ngayBanHanh?: any;
    nam?: number;
    soCongVan?: string;
    tapTin?: string;
    trangThai?: number;
    nguoiTao?: number;
    tenCoQuan?: string;
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

export interface ICoQuan {
    maCoQuanBanHanh?: number;
    tenCoQuan?: string;
}

export const defaultValueVanBan: Readonly<IVanBan> = {
    maVanBan: null,
    donVi: '',
    coQuanBanHanh: null,
    noiDungTrichYeu: '',
    ngayBanHanh: '',
    nam: null,
    soCongVan: '',
    tapTin: '',
    trangThai: null,
    nguoiTao: null,
    tenCoQuan: ''
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

export const defaultValueCoQuan: Readonly<ICoQuan> = {
    maCoQuanBanHanh: null,
    tenCoQuan: ''
};
