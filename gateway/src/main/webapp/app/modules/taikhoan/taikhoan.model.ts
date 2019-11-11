export interface ITaiKhoan {
    maNhanVien?: number;
    taiKhoan?: string;
    matKhau?: string;
    phanQuyen?: string;
    tenNhanVien?: string;
}

export const defaultTaiKhoan: Readonly<ITaiKhoan> = {
    maNhanVien: null,
    taiKhoan: null,
    matKhau: null,
    phanQuyen: null,
    tenNhanVien: null
}
