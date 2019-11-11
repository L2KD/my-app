import axios from 'axios';
import { ICrudGetSomeAction1, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IDonVi, ITinhThanh, ICoQuan } from './thongke.model';

export const ACTION_TYPES = {
    LAY_DANH_SACH_TINH_THANH: 'ThongKe/LAY_DANH_SACH_TINH_THANH',
    LAY_DANH_SACH_DON_VI: 'ThongKe/LAY_DANH_SACH_DON_VI',
    LAY_DANH_SACH_CO_QUAN: 'ThongKe/LAY_DANH_SACH_CO_QUAN',
    IN_DANH_SACH_VAN_BAN: 'ThongKe/IN_DANH_SACH_VAN_BAN',
    IN_DANH_SACH_KE_HOACH: 'ThongKe/IN_DANH_SACH_VAN_BAN',
    IN_DANH_SACH_CDT: 'ThongKe/IN_DANH_SACH_VAN_BAN',
    RESET: 'ThongKe/RESET'
};

const initialState = {
    loading: false,
    errorMessage: null,
    ds_tinh_thanh: [] as ReadonlyArray<ITinhThanh>,
    ds_don_vi: [] as ReadonlyArray<IDonVi>,
    ds_co_quan: [] as ReadonlyArray<ICoQuan>,
    authorities: [] as any[],
    updating: false,
    updateSuccess: false,
    totalItems: 0
};

export type thongKeState = Readonly<typeof initialState>;

// Reducer
export default (state: thongKeState = initialState, action): thongKeState => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_TINH_THANH):
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_DON_VI):
        case REQUEST(ACTION_TYPES.LAY_DANH_SACH_CO_QUAN):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false
                // loading: true
            };
        case REQUEST(ACTION_TYPES.IN_DANH_SACH_VAN_BAN):
        case REQUEST(ACTION_TYPES.IN_DANH_SACH_KE_HOACH):
        case REQUEST(ACTION_TYPES.IN_DANH_SACH_CDT):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                loading: true
            };
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_TINH_THANH):
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_DON_VI):
        case FAILURE(ACTION_TYPES.LAY_DANH_SACH_CO_QUAN):
            return {
                ...state,
                // loading: false,
                updating: false,
                updateSuccess: false,
                errorMessage: action.payload
            };
        case FAILURE(ACTION_TYPES.IN_DANH_SACH_VAN_BAN):
        case FAILURE(ACTION_TYPES.IN_DANH_SACH_KE_HOACH):
        case FAILURE(ACTION_TYPES.IN_DANH_SACH_CDT):
            return {
                ...state,
                loading: false,
                errorMessage: action.payload
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
        case SUCCESS(ACTION_TYPES.LAY_DANH_SACH_CO_QUAN):
            return {
                ...state,
                loading: false,
                ds_co_quan: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.IN_DANH_SACH_VAN_BAN):
            return {
                ...state,
                loading: false
            };
            case SUCCESS(ACTION_TYPES.IN_DANH_SACH_KE_HOACH):
            return {
                ...state,
                loading: false
            };
        case SUCCESS(ACTION_TYPES.IN_DANH_SACH_CDT):
            return {
                ...state,
                loading: false
            };
        case ACTION_TYPES.RESET:
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

export const getDanhSachCoQuanBanHanh: ICrudGetAllAction<ICoQuan> = () => {
    const requestUrl = `${apiUrl}van-ban/lay-danh-sach-co-quan-ban-hanh`;
    return {
        type: ACTION_TYPES.LAY_DANH_SACH_CO_QUAN,
        payload: axios.get(requestUrl)
    };
};

// export const printDSVB = (coquanbanhanh, donvi) => {
//     const requestUrl = `${apiUrl}thong-ke/in-ds-van-ban`;
//     return {
//         // type: ACTION_TYPES.IN_DS_THONG_KE,
//         payload: axios({
//             params: { coQuanBanHanh: coquanbanhanh, donVi: donvi },
//             url: requestUrl,
//             method: 'GET',
//             responseType: 'blob'
//             // timeout: 100000
//         }).then(response => {
//             const file = new Blob(
//                 [response.data],
//                 { type: 'application/pdf' });
//             const fileURL = URL.createObjectURL(file);
//             window.open(fileURL);
//         })
//     };
// };

export const printDSVB = (coquanbanhanh, donvi) => {
    const requestUrl = `${apiUrl}thong-ke/in-ds-van-ban`;
    return {
        type: ACTION_TYPES.IN_DANH_SACH_VAN_BAN,
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

export const printDSKH = (donvi, Nam) => {
    const requestUrl = `${apiUrl}thong-ke/in-ds-ke-hoach`;
    return {
        type: ACTION_TYPES.IN_DANH_SACH_KE_HOACH,
        payload: axios({
            params: { donVi: donvi, nam: Nam },
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

export const printDSCDT = (donvi, Nam) => {
    const requestUrl = `${apiUrl}thong-ke/in-ds-cdt`;
    return {
        type: ACTION_TYPES.IN_DANH_SACH_CDT,
        payload: axios({
            params: { donVi: donvi, nam: Nam },
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

export const reset = () => ({
    type: ACTION_TYPES.RESET
});
