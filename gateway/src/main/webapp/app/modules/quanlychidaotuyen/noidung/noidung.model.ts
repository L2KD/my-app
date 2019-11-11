export interface INoiDung {
    maNoiDung?: number;
    noiDung?: string;
    viTri?: number;
    trangThai?: number;
    nguoiTao?: number;
}

export const defaultValue: Readonly<INoiDung> = {
    maNoiDung: null,
    noiDung: null,
    viTri: null,
    trangThai: null,
    nguoiTao: null
};
