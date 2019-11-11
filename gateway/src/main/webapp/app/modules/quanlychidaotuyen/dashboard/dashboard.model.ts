export interface IDashBoard {
    tenDonVi?: string;
    soLuongCDT: number;
}

export const defaultValue: Readonly<IDashBoard> = {
    tenDonVi: '',
    soLuongCDT: 0
};

export interface IDashBoardTongSo {
    tongSoVanBan?: number;
    tongSoKeHoach?: number;
    tongSoCDT?: number;
}

export const defaultValueTongSo: Readonly<IDashBoardTongSo> = {
    tongSoVanBan: 0,
    tongSoKeHoach: 0,
    tongSoCDT: 0
};
