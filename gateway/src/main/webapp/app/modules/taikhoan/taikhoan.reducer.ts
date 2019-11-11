import axios from 'axios';
import { ICrudGetAction, ICrudGetSomeAction2Params } from 'react-jhipster';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { ITaiKhoan, defaultTaiKhoan } from 'app/modules/taikhoan/taikhoan.model';

export const ACTION_TYPES = {
    LAY_TAI_KHOAN: 'TaiKhoan/LAY_TAI_KHOAN',
    CHECK_TAI_KHOAN: 'TaiKhoan/CHECK_TAI_KHOAN',
    SET_TAI_KHOAN: 'TaiKhoan/SET_TAI_KHOAN',
    DANG_XUAT: 'TaiKhoan/DANG_XUAT',
    RESET: 'TaiKhoan/RESET'
};
const initialState = {
    tai_khoan: defaultTaiKhoan,
    loading: false,
    isTrue: false,
    islogout: true, /* Mặc định sẽ là đã đăng xuất*/
    errorMessage: null,
    authorities: [] as any[],
    updating: false,
    updateSuccess: false,
    totalItems: 0
};

export type taiKhoanState = Readonly<typeof initialState>;

// Reducer
export default (state: taiKhoanState = initialState, action): taiKhoanState => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.LAY_TAI_KHOAN):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false
                // loading: true
            };
        case FAILURE(ACTION_TYPES.LAY_TAI_KHOAN):
            return {
                ...state,
                loading: false,
                updating: false,
                updateSuccess: false,
                errorMessage: action.payload
            };
        case SUCCESS(ACTION_TYPES.LAY_TAI_KHOAN):
            // alert(action.payload.data);
            if (action.payload.data.maNhanVien !== null) {
                localStorage.setItem('ma_nhan_vien', action.payload.data.maNhanVien.toString());
            }
            localStorage.setItem('mat_khau', action.payload.data.matKhau);
            localStorage.setItem('phan_quyen', action.payload.data.phanQuyen);
            localStorage.setItem('ten_nhan_vien', action.payload.data.tenNhanVien);
            return {
                ...state,
                loading: false,
                tai_khoan: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.CHECK_TAI_KHOAN):
            return {
                ...state,
                loading: false,
                isTrue: action.payload.data === 1 ? true : false
            };
        case ACTION_TYPES.SET_TAI_KHOAN:
            return {
                ...state,
                tai_khoan: action.taiKhoan,
                isTrue: true
            };
            case ACTION_TYPES.DANG_XUAT:
            return {
                ...initialState
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

export const getTaiKhoan: ICrudGetSomeAction2Params<ITaiKhoan> = (taikhoan, matkhau) => {
    const requestUrl = `${apiUrl}tai-khoan/lay-thong-tin-tai-khoan`;
    return {
        type: ACTION_TYPES.LAY_TAI_KHOAN,
        payload: axios.get<ITaiKhoan>(requestUrl, { params : { taiKhoan: taikhoan, matKhau: matkhau } })
    };
};
export const checkLogin = (taikhoan, matkhau) => async dispatch => {
    const requestUrl = `${apiUrl}tai-khoan/check`;
    const result = await dispatch({
        type: ACTION_TYPES.CHECK_TAI_KHOAN,
        payload: axios.get(requestUrl, { params : { taiKhoan: taikhoan, matKhau: matkhau } })
    });
    await dispatch(getTaiKhoan(taikhoan, matkhau));
    return result;
};

// export const logout = () => {
//     return {
//         type: ACTION_TYPES.DANG_XUAT
//     };
// };

export const reset = () => ({
    type: ACTION_TYPES.RESET
});
