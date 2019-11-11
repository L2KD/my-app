import axios from 'axios';
import { ICrudGetSomeAction1, IXoaVaTraVeDanhSach3Params, ICrudGetSomeAction3Params,
    ICrudGetSomeAction2Params, ICrudGetAction, ICrudGetAllAction,
    ICrudPutAction2Params, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import {
    ITinhThanh,
    IDonVi,
    INam,
    IVanBan,
    defaultValueTinhThanh,
    defaultValueDonVi,
    defaultValueNam,
    defaultValueVanBan,
    defaultValueCoQuan,
    ICoQuan
} from './vanban.model';

export const ACTION_TYPES = {
    LAY_DANH_SACH_VAN_BAN: 'VanBan/LAY_DANH_SACH_VAN_BAN',
    LAY_DANH_SACH_TINH_THANH: 'VanBan/LAY_DANH_SACH_TINH_THANH',
    LAY_DANH_SACH_DON_VI: 'VanBan/LAY_DANH_SACH_DON_VI',
    LAY_DANH_SACH_NAM: 'VanBan/LAY_DANH_SACH_NAM',
    LAY_DANH_SACH_CO_QUAN: 'VanBan/LAY_DANH_SACH_CO_QUAN',
    LAY_TINH_THANH: 'VanBan/LAY_TINH_THANH',
    LAY_DON_VI: 'VanBan/LAY_DON_VI',
    LAY_CO_QUAN: 'VanBan/LAY_CO_QUAN',
    LAY_VAN_BAN: 'VanBan/LAY_VAN_BAN',
    TAO_VAN_BAN: 'VanBan/TAO_VAN_BAN',
    CAP_NHAT_VAN_BAN: 'VanBan/CAP_NHAT_VAN_BAN',
    XOA_VAN_BAN: 'VanBan/XOA_VAN_BAN',
    RESET: 'VanBan/RESET',
    RESET_ALL: 'VanBan/RESET_ALL'
};

const initialState = {
    loading: false,
    errorMessage: null,
    ds_van_ban: [] as ReadonlyArray<IVanBan>,
    ds_tinh_thanh: [] as ReadonlyArray<ITinhThanh>,
    ds_don_vi: [] as ReadonlyArray<IDonVi>,
    ds_nam: [] as ReadonlyArray<INam>,
    ds_co_quan: [] as ReadonlyArray<ICoQuan>,
    tinh_thanh: defaultValueTinhThanh,
    don_vi: defaultValueDonVi,
    nam: defaultValueNam,
    co_quan: defaultValueCoQuan,
    van_ban: defaultValueVanBan,
    authorities: [] as any[],
    updating: false,
    updateSuccess: false,
    totalItems: 0
};

export type vanBanState = Readonly<typeof initialState>;

// Reducer
export default (state: vanBanState = initialState, action): vanBanState => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_VAN_BAN):
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_TINH_THANH):
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_DON_VI):
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_NAM):
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_CO_QUAN):
        case REQUEST(ACTION_TYPES.LAY_TINH_THANH):
        case REQUEST(ACTION_TYPES.LAY_DON_VI):
        case REQUEST(ACTION_TYPES.LAY_VAN_BAN):
        case REQUEST(ACTION_TYPES.LAY_CO_QUAN):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                loading: true
            };
        case REQUEST(ACTION_TYPES.TAO_VAN_BAN):
        case REQUEST(ACTION_TYPES.CAP_NHAT_VAN_BAN):
        case REQUEST(ACTION_TYPES.XOA_VAN_BAN):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                updating: true
            };
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_VAN_BAN):
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_TINH_THANH):
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_DON_VI):
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_NAM):
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_CO_QUAN):
        case FAILURE(ACTION_TYPES.LAY_VAN_BAN):
        case FAILURE(ACTION_TYPES.LAY_DON_VI):
        case FAILURE(ACTION_TYPES.LAY_TINH_THANH):
        case FAILURE(ACTION_TYPES.LAY_CO_QUAN):
        case FAILURE(ACTION_TYPES.TAO_VAN_BAN):
        case FAILURE(ACTION_TYPES.CAP_NHAT_VAN_BAN):
        case FAILURE(ACTION_TYPES.XOA_VAN_BAN):
            return {
                ...state,
                loading: false,
                updating: false,
                updateSuccess: false,
                errorMessage: action.payload
            };
        case SUCCESS(ACTION_TYPES.LAY_DANH_SACH_VAN_BAN):
            return {
                ...state,
                loading: false,
                ds_van_ban: action.payload.data,
                totalItems: action.payload.headers['x-total-count']
            };
        case SUCCESS(ACTION_TYPES.LAY_DANH_SACH_TINH_THANH):
            return {
                ...state,
                loading: false,
                ds_tinh_thanh: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.LAY_DANH_SACH_DON_VI):
            return {
                ...state,
                loading: false,
                ds_don_vi: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.LAY_DANH_SACH_NAM):
            return {
                ...state,
                loading: false,
                ds_nam: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.LAY_DANH_SACH_CO_QUAN):
            return {
                ...state,
                loading: false,
                ds_co_quan: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.LAY_VAN_BAN):
            return {
                ...state,
                loading: false,
                van_ban: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.LAY_TINH_THANH):
            return {
                ...state,
                loading: false,
                tinh_thanh: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.LAY_DON_VI):
            return {
                ...state,
                loading: false,
                don_vi: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.LAY_CO_QUAN):
            return {
                ...state,
                loading: false,
                co_quan: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.TAO_VAN_BAN):
        case SUCCESS(ACTION_TYPES.CAP_NHAT_VAN_BAN):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                van_ban: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.XOA_VAN_BAN):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                van_ban: defaultValueVanBan
            };
        case ACTION_TYPES.RESET:
            return {
                ...initialState
            };
        case ACTION_TYPES.RESET_ALL:
            return {
                ...initialState
            };
        default:
            return state;
    }
};

const apiUrl = 'http://localhost:8080/chidaotuyen/api/';
// Actions
export const getDanhSachTinhThanh: ICrudGetAllAction<ITinhThanh> = () => {
    const requestUrl = `${apiUrl}van-ban/lay-danh-sach-tinh-thanh`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_TINH_THANH,
        payload: axios.get(requestUrl)
    };
};
export const getDanhSachDonVi: ICrudGetSomeAction1<IDonVi> = tinhthanh => {
    const requestUrl = `${apiUrl}van-ban/lay-danh-sach-don-vi-theo-tinh`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_DON_VI,
        payload: axios.get(requestUrl, { params : { ma_tinh_thanh: tinhthanh } })
    };
};
export const getDanhSachNam: ICrudGetAllAction<INam> = () => {
    const requestUrl = `${apiUrl}van-ban/lay-danh-sach-nam`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_NAM,
        payload: axios.get(requestUrl)
    };
};

export const getDanhSachCoQuanBanHanh: ICrudGetAllAction<ICoQuan> = () => {
    const requestUrl = `${apiUrl}van-ban/lay-danh-sach-co-quan-ban-hanh`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_CO_QUAN,
        payload: axios.get(requestUrl)
    };
};

export const getDanhSachVanBan: ICrudGetSomeAction2Params<IVanBan> = (donvi, _nam) => {
    const requestUrl = `${apiUrl}van-ban/lay-danh-sach-van-ban-theo-donvi-nam`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_VAN_BAN,
        payload: axios.get<IVanBan>(requestUrl, { params : { ma_don_vi: donvi, nam: _nam } })
    };
};

export const getDanhSachVanBanTheoNoiDungTrichYeu_DonVi_Nam: ICrudGetSomeAction3Params<IVanBan> = (name, donvi, Nam) => {
    const requestUrl = `${apiUrl}van-ban/lay-danh-sach-van-ban-theo-ndty-donvi-nam`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_VAN_BAN,
        payload: axios.get<IVanBan>(requestUrl, { params: { noiDungTrichYeu: name, maDonVi: donvi, nam: Nam } })
    };
};

export const getTinhThanh: ICrudGetAction<ITinhThanh> = tinhthanh => {
    const requestUrl = `${apiUrl}van-ban/lay-tinh-thanh`;
    return {
        type: ACTION_TYPES.LAY_TINH_THANH,
        payload: axios.get<ITinhThanh>(requestUrl, { params : { ma_tinh_thanh: tinhthanh } })
    };
};

export const getDonVi: ICrudGetAction<IDonVi> = donvi => {
    const requestUrl = `${apiUrl}van-ban/lay-don-vi`;
    return {
        type: ACTION_TYPES.LAY_DON_VI,
        payload: axios.get<IDonVi>(requestUrl, { params : { ma_don_vi: donvi } })
    };
};

export const getCoQuanBanHanh: ICrudGetAction<ICoQuan> = coquan => {
    const requestUrl = `${apiUrl}van-ban/lay-co-quan-ban-hanh`;
    return {
        type: ACTION_TYPES.LAY_CO_QUAN,
        payload: axios.get<ICoQuan>(requestUrl, { params : { ma_co_quan: coquan } })
    };
};

export const getVanBan: ICrudGetAction<IVanBan> = vanban => {
    const requestUrl = `${apiUrl}van-ban/lay-van-ban`;
    return {
        type: ACTION_TYPES.LAY_VAN_BAN,
        payload: axios.get<IVanBan>(requestUrl, { params : { ma_van_ban: vanban } })
    };

};

export const addVanBan: ICrudPutAction<IVanBan> = vanban => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.TAO_VAN_BAN,
        payload: axios.post(`${apiUrl}van-ban/them-moi-van-ban`, vanban)
    });
    dispatch(getDanhSachVanBan(vanban.donVi, vanban.ngayBanHanh.toString().substring(0, 4)));
    return result;
};

export const addVanBan1: ICrudPutAction<IVanBan> = vanban => async dispatch => {
    // const formData = new FormData();
    // vanban.append('tap_tin', file);
    const result = await dispatch({
        type: ACTION_TYPES.TAO_VAN_BAN,
        payload: axios.post(`${apiUrl}van-ban/them-moi-van-ban`, vanban, { headers: {
                'content-type': 'multipart/form-data'
            }})
    });
    dispatch(getDanhSachVanBan(vanban.donVi, vanban.nam));
    return result;
};

export const updateVanBan: ICrudPutAction<IVanBan> = vanban => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.CAP_NHAT_VAN_BAN,
        payload: axios.post(`${apiUrl}van-ban/cap-nhat-van-ban`, vanban)
    });
      dispatch(getDanhSachVanBan(vanban.donVi, vanban.ngayBanHanh.toString().substring(0, 4)));
    return result;
};

export const uploadVanBan = data => {
    const requestUrl = `${apiUrl}van-ban/upload-van-ban`;
    return axios.post(requestUrl, data);
};

export const xoaVanBan: ICrudDeleteAction<IVanBan> = vanban => async dispatch => {
    const requestUrl = `${apiUrl}van-ban/xoa`;
    const result = await dispatch({
        type: ACTION_TYPES.XOA_VAN_BAN,
        payload: axios.delete(requestUrl, { params: { ma_van_ban: vanban } })
    });
    dispatch(getDanhSachVanBan());
    return result;
};

export const xoaVanBanVaTraVeDanhSach: IXoaVaTraVeDanhSach3Params<IVanBan> = (maVanBan, maDonVi, nam) => async dispatch => {
    const requestUrl = `${apiUrl}van-ban/xoa`;
    const result = await dispatch({
        type: ACTION_TYPES.XOA_VAN_BAN,
        payload: axios.delete(requestUrl, { params: { ma_van_ban: maVanBan } })
    });
    dispatch(getDanhSachVanBan(maDonVi, nam));
    return result;
};

export const printDSVB = (coquanbanhanh, donvi) => {
    const requestUrl = `${apiUrl}van-ban/in-ds-van-ban`;
    return {
        // type: ACTION_TYPES.IN_DS_VAN_BAN,
        payload: axios({
            params: { coQuanBanHanh: coquanbanhanh, donVi: donvi },
            url: requestUrl,
            method: 'GET',
            responseType: 'blob'
        }).then(response => {
            const url = window.URL.createObjectURL(response.data);
            const frame = document.createElement('iframe');
            frame.setAttribute('src', url);
            frame.setAttribute('name', 'ifrm');
            frame.setAttribute('style', 'position:absolute;left:-9999px');
            document.body.appendChild(frame);
            frame.addEventListener('load', () => {
                frame.contentWindow.focus();
                frame.contentWindow.print();
                const infanticide = () => {
                    frame.parentElement.removeChild(frame);
                    window.removeEventListener('focus', infanticide);
                };
                window.addEventListener('focus', infanticide);
            });
        })
    };
};

// export const downloadVanBan = filename => {
//     const requestUrl = `${apiUrl}van-ban/download-van-ban`;
//     return {
//         // type: ACTION_TYPES.IN_DS_THONG_KE,
//         payload: axios({
//             params: { tap_tin: filename },
//             url: requestUrl,
//             method: 'GET',
//             responseType: 'blob'
//             // timeout: 100000
//         }).then(response => {
//             const file = new Blob(
//                 [response.data],
//                 { type: 'application/' + filename.substring(filename.lastIndexOf('.')) });
//             const fileURL = URL.createObjectURL(file);
//             window.open(fileURL);
//         })
//     };
// };

export const downloadVanBan = filename => {
    const requestUrl = `${apiUrl}van-ban/download-van-ban`;
    return {
        // type: ACTION_TYPES.IN_DS_THONG_KE,
        payload: axios.get(requestUrl, { params: { tap_tin: filename }, responseType: 'blob' }).then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
        })
    };
}

export const reset = () => ({
    type: ACTION_TYPES.RESET
});

export const resetAll = () => ({
    type: ACTION_TYPES.RESET_ALL
});
