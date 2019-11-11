import axios from 'axios';
import { ICrudGetSomeAction1, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IDonVi, ITinhThanh } from './thongkenckh.model';

export const ACTION_TYPES = {
    LAY_DANH_SACH_TINH_THANH: 'ThongKe/LAY_DANH_SACH_TINH_THANH',
    LAY_DANH_SACH_DON_VI: 'ThongKe/LAY_DANH_SACH_DON_VI',
    LAY_DANH_SACH_CO_QUAN: 'ThongKe/LAY_DANH_SACH_CO_QUAN',
    IN_DANH_SACH_DE_TAI_DANG_KY: 'ThongKe/IN_DANH_SACH_DE_TAI_DANG_KY',
    IN_DANH_SACH_DE_TAI_NAM: 'ThongKe/IN_DANH_SACH_DE_TAI_DANG_KY',
    IN_DANH_SACH_DE_TAI_UNG_DUNG_DON_VI: 'ThongKe/IN_DANH_SACH_DE_TAI_UNG_DUNG_DON_VI',
    RESET: 'ThongKe/RESET'
};

const initialState = {
    loading: false,
    errorMessage: null,
    ds_tinh_thanh: [] as ReadonlyArray<ITinhThanh>,
    ds_don_vi: [] as ReadonlyArray<IDonVi>,
    authorities: [] as any[],
    updating: false,
    updateSuccess: false,
    totalItems: 0
};

export type thongKeNCKHState = Readonly<typeof initialState>;

// Reducer
export default (state: thongKeNCKHState = initialState, action): thongKeNCKHState => {
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
            case REQUEST(ACTION_TYPES.IN_DANH_SACH_DE_TAI_DANG_KY):
            case REQUEST(ACTION_TYPES.IN_DANH_SACH_DE_TAI_NAM):
            case REQUEST(ACTION_TYPES.IN_DANH_SACH_DE_TAI_UNG_DUNG_DON_VI):
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
            case FAILURE(ACTION_TYPES.IN_DANH_SACH_DE_TAI_DANG_KY):
            case FAILURE(ACTION_TYPES.IN_DANH_SACH_DE_TAI_NAM):
            case FAILURE(ACTION_TYPES.IN_DANH_SACH_DE_TAI_UNG_DUNG_DON_VI):
            return {
                ...state,
                loading: false,
                updating: false,
                updateSuccess: false,
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
            case SUCCESS(ACTION_TYPES.IN_DANH_SACH_DE_TAI_DANG_KY):
            return {
                ...state,
                loading: false
            };
            case SUCCESS(ACTION_TYPES.IN_DANH_SACH_DE_TAI_NAM):
            return {
                ...state,
                loading: false
            };
            case SUCCESS(ACTION_TYPES.IN_DANH_SACH_DE_TAI_UNG_DUNG_DON_VI):
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

export const printDSDeTaiDangKy = (donvi, Nam) => {
    const requestUrl = `${apiUrl}thong-ke-nckh/in-ds-de-tai-dang-ky`;
    return {
        type: ACTION_TYPES.IN_DANH_SACH_DE_TAI_DANG_KY,
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

export const printDSDeTaiNam = (donvi, Nam) => {
    const requestUrl = `${apiUrl}thong-ke-nckh/in-ds-de-tai-nam`;
    return {
        type: ACTION_TYPES.IN_DANH_SACH_DE_TAI_NAM,
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

export const printDSDeTaiUngDungChoDonVi = (donvi, Nam) => {
    const requestUrl = `${apiUrl}thong-ke-nckh/in-ds-de-tai-ung-dung-cho-don-vi`;
    return {
        type: ACTION_TYPES.IN_DANH_SACH_DE_TAI_UNG_DUNG_DON_VI,
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
