export interface IDashboardDeTaiDangKy {
    nam?: number;
    soLuong?: number;
}
export interface IDashBoardTongSoDeTai {
    tongDeTaiDangKy?: number;
    tongDeTaiNam?: number;
    tongDeTaiDonVi?: number;
}

export const defaultValue: Readonly<IDashBoardTongSoDeTai> = {
    tongDeTaiDangKy: 0,
    tongDeTaiNam: 0,
    tongDeTaiDonVi: 0
};
