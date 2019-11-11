export interface IBaoCaoQuyNamDeTai {
    maDeTai?: number;
    trangThai?: number;
    tapTinBaoCaoQuy1?: string;
    tapTinBaoCaoQuy2?: string;
    tapTinBaoCaoQuy3?: string;
    tapTinBaoCaoQuy4?: string;
    tapTinBaoCaoNam?: string;
    tenDeTai?: string;
    tenLoaiDeTai?: string;
    tenHangDeTai?: string;
    tenNhomDeTai?: string;
    tenChuThe?: string;
}

export const defaultValueBaoCaoQuyNamDeTai: Readonly<IBaoCaoQuyNamDeTai> = {
    maDeTai: null,
    trangThai: 1,
    tapTinBaoCaoQuy1: null,
    tapTinBaoCaoQuy2: null,
    tapTinBaoCaoQuy3: null,
    tapTinBaoCaoQuy4: null,
    tapTinBaoCaoNam: null,
    tenDeTai: null,
    tenLoaiDeTai: null,
    tenHangDeTai: null,
    tenNhomDeTai: null,
    tenChuThe: null
};
