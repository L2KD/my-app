export interface IKeHoach {
    maKeHoach?: number;
    donVi?: string;
    noiDungTrichYeu?: string;
    ngayBanHanh?: any;
    tapTin?: string;
    nguoiTao?: number;
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

export const defaultValueKeHoach: Readonly<IKeHoach> = {
    maKeHoach: null,
    donVi: '',
    noiDungTrichYeu: '',
    ngayBanHanh: '',
    tapTin: '',
    nguoiTao: null
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
