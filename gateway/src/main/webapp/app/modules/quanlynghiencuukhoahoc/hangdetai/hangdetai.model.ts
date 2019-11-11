export interface IHangDeTai {
    maHangDeTai?: number;
    hangDeTai?: string;
    viTri?: number;
    trangThai?: number;
}

export const defaultValueIHangDeTai: Readonly<IHangDeTai> = {
    maHangDeTai: null,
    hangDeTai: null,
    viTri: null,
    trangThai: null
}
