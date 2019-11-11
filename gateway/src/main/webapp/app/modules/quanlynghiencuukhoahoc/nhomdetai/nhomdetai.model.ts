export interface INhomDeTai {
    maNhomDeTai?: number;
    nhomDeTai?: string;
    viTri?: number;
    trangThai?: number;
}

export const defaultValueINhomDeTai: Readonly<INhomDeTai> = {
    maNhomDeTai: null,
    nhomDeTai: null,
    viTri: null,
    trangThai: null
}
