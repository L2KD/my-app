import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
import hinhthuc, { HinhThucState } from 'app/modules/quanlychidaotuyen/hinhthuc/HinhThuc.reducer';
import noidung, { noiDungState } from 'app/modules/quanlychidaotuyen/noidung/noidung.reducer';
import loaicdt, { loaiCDTState } from 'app/modules/quanlychidaotuyen/loaicdt/loaicdt.reducer';
import doituong, { doiTuongState } from 'app/modules/quanlychidaotuyen/doituongtiepnhan/doituong.reducer';
import danhgia, { danhGiaState } from 'app/modules/quanlychidaotuyen/danhgia/danhgia.reducer';
import vanban, { vanBanState } from 'app/modules/quanlychidaotuyen/vanban/vanban.reducer';
import kehoach, { keHoachState } from 'app/modules/quanlychidaotuyen/kehoach/kehoach.reducer';
import cdt, { cdtState } from 'app/modules/quanlychidaotuyen/chidaotuyen/cdt.reducer';
import thongke, { thongKeState } from 'app/modules/quanlychidaotuyen/thongke/thongke.reducer';
import dashboard, { DashBoardCDTState } from 'app/modules/quanlychidaotuyen/dashboard/dashboard.reducer';
import loaidetai, { loaiDeTaiState } from 'app/modules/quanlynghiencuukhoahoc/loaidetai/loaidetai.reducer';
import chucvu, { chucVuState } from 'app/modules/quanlynghiencuukhoahoc/chucvu/chucvu.reducer';
import hangdetai, { hangDeTaiState } from 'app/modules/quanlynghiencuukhoahoc/hangdetai/hangdetai.reducer';
import chuthe, { chuTheState } from 'app/modules/quanlynghiencuukhoahoc/chuthedetai/chuthedetai.reducer';
import nhomdetai, { nhomDeTaiState } from 'app/modules/quanlynghiencuukhoahoc/nhomdetai/nhomdetai.reducer';
import kehoachdetai, { keHoachDeTaiState } from 'app/modules/quanlynghiencuukhoahoc/kehoachdetai/kehoachdetai.reducer';
import detaidangky, { deTaiDangKyState } from 'app/modules/quanlynghiencuukhoahoc/detaidangky/detaidangky.reducer';
import xetduyetdetai, { xetDuyetDeTaiState } from 'app/modules/quanlynghiencuukhoahoc/xetduyetdetai/xetduyetdetai.reducer';
import xetduyetdecuong, { xetDuyetDeCuongState } from 'app/modules/quanlynghiencuukhoahoc/xetduyetdecuong/xetduyetdecuong.reducer';
import xetduyetbaocaotongket, { xetDuyetBaoCaoTongKetState } from 'app/modules/quanlynghiencuukhoahoc/xetduyetbaocaotongket/xetduyetbaocaotongket.reducer';
import detainam, { deTaiNamState } from 'app/modules/quanlynghiencuukhoahoc/detainam/detainam.reducer';
import xetduyetdetaidonvi, { xetDuyetDeTaiDonViState } from 'app/modules/quanlynghiencuukhoahoc/xetduyetdetaidonvi/xetduyetdetaidonvi.reducer';
import xetduyetdetaiungdungchodonvi,
{ xetDuyetDeTaiUngDungChoDonViState } from 'app/modules/quanlynghiencuukhoahoc/xetduyetdetaiungdungchodonvi/xetduyetdetaiungdungchodonvi.reducer';
import bienbankehoachdetaiungdungchodonvi,
{ bienBanKeHoachDeTaiUngDungChoDonViState } from 'app/modules/quanlynghiencuukhoahoc/bienbankehoachdetaiungdungchodonvi/bienbankehoachdetaiungdungchodonvi.reducer';
import baocaoquynamdetai, { baoCaoQuyNamDeTaiState } from 'app/modules/quanlynghiencuukhoahoc/baocaoquynamdetai/baocaoquynamdetai.reducer';
import vanbanapdunglaudai, { vanBanApDungLauDaiState } from 'app/modules/quanlynghiencuukhoahoc/vanbanapdunglaudai/vanbanapdunglaudai.reducer';
import vanbanchapthuanapdunglaudai, { vanBanChapThuanApDungLauDaiState } from 'app/modules/quanlynghiencuukhoahoc/vanbanchapthuanapdunglaudai/vanbanchapthuanapdunglaudai.reducer';
import thongkenckh, { thongKeNCKHState } from 'app/modules/quanlynghiencuukhoahoc/thongke/thongkenckh.reducer';
import taikhoan, { taiKhoanState } from 'app/modules/taikhoan/taikhoan.reducer';
import dashboardDeTai, { DashBoardDeTaiState } from 'app/modules/quanlynghiencuukhoahoc/dashboard/dashboard.reducer';

/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  /* Chỉ đạo tuyến */
  readonly hinhthuc: HinhThucState;
  readonly noidung: noiDungState;
  readonly loaicdt: loaiCDTState;
  readonly doituong: doiTuongState;
  readonly danhgia: danhGiaState;
  readonly vanban: vanBanState;
  readonly thongke: thongKeState;
  readonly kehoach: keHoachState;
  readonly cdt: cdtState;
  readonly dashboard: DashBoardCDTState;
  /* Quản lý nghiên cứu khoa học */
    readonly loaidetai: loaiDeTaiState;
    readonly chucvu: chucVuState;
    readonly hangdetai: hangDeTaiState;
    readonly chuthe: chuTheState;
    readonly nhomdetai: nhomDeTaiState;
    readonly kehoachdetai: keHoachDeTaiState;
    readonly detaidangky: deTaiDangKyState;
    readonly xetduyetdetai: xetDuyetDeTaiState;
    readonly xetduyetbaocaotongket: xetDuyetBaoCaoTongKetState;
    readonly xetduyetdecuong: xetDuyetDeCuongState;
    readonly detainam: deTaiNamState;
    readonly xetduyetdetaidonvi: xetDuyetDeTaiDonViState;
    readonly xetduyetdetaiungdungchodonvi: xetDuyetDeTaiUngDungChoDonViState;
    readonly bienbankehoachdetaiungdungchodonvi: bienBanKeHoachDeTaiUngDungChoDonViState;
    readonly baocaoquynamdetai: baoCaoQuyNamDeTaiState;
    readonly vanbanapdunglaudai: vanBanApDungLauDaiState;
    readonly vanbanchapthuanapdunglaudai: vanBanChapThuanApDungLauDaiState;
    readonly thongkenckh: thongKeNCKHState;
    readonly taikhoan: taiKhoanState;
    readonly dashboardDeTai: DashBoardDeTaiState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings, hinhthuc , noidung, loaicdt, doituong, danhgia, vanban, kehoach, cdt,
    thongke, dashboard,
    loaidetai, chucvu, hangdetai, chuthe, nhomdetai, kehoachdetai, detaidangky, xetduyetdetai,
    xetduyetdecuong, xetduyetbaocaotongket, detainam, xetduyetdetaidonvi,
    xetduyetdetaiungdungchodonvi, bienbankehoachdetaiungdungchodonvi,
    baocaoquynamdetai, vanbanapdunglaudai, vanbanchapthuanapdunglaudai, thongkenckh,
    taikhoan, dashboardDeTai,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
