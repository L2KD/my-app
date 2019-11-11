export interface IKeHoachDeTai {
    maKeHoachDeTai?: number;
    nam?: number;
    donVi?: string;
    keHoachDeTai?: string;
    noiDungTrichYeu?: string;
    tapTin?: string;
}
export const defaultValueKeHoachDeTai: Readonly<IKeHoachDeTai> = {
    maKeHoachDeTai: null,
    nam: null,
    donVi: null,
    keHoachDeTai: null,
    noiDungTrichYeu: null,
    tapTin: null
}
