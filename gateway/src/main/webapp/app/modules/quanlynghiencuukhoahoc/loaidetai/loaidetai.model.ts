export interface ILoaiDeTai {
    maLoaiDeTai?: number;
    loaiDeTai?: string;
    viTri?: number;
    trangThai?: number;
}

export const defaultValueILoaiDeTai: Readonly<ILoaiDeTai> = {
    maLoaiDeTai: null,
    loaiDeTai: null,
    viTri: null,
    trangThai: null
}
