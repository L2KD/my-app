import React from 'react';
import { Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

import Login from 'app/modules/login/login';
import Register from 'app/modules/account/register/register';
import Activate from 'app/modules/account/activate/activate';
import PasswordResetInit from 'app/modules/account/password-reset/init/password-reset-init';
import PasswordResetFinish from 'app/modules/account/password-reset/finish/password-reset-finish';
import Logout from 'app/modules/login/logout';
// import Home from 'app/modules/home/home';
import DanhSachHinhThuc from 'app/modules/quanlychidaotuyen/hinhthuc';
import DanhSachLoaiCDT from 'app/modules/quanlychidaotuyen/loaicdt';
import Entities from 'app/entities';
import PrivateRoute from 'app/shared/auth/private-route';
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import { AUTHORITIES } from 'app/config/constants';
import DanhSachNoiDung from 'app/modules/quanlychidaotuyen/noidung';
import DanhSachDoiTuong from 'app/modules/quanlychidaotuyen/doituongtiepnhan';
import DanhSachDanhGia from 'app/modules/quanlychidaotuyen/danhgia';
import DanhSachVanBan from 'app/modules/quanlychidaotuyen/vanban';
import DanhSachKeHoach from 'app/modules/quanlychidaotuyen/kehoach';
import DanhSachCDT from 'app/modules/quanlychidaotuyen/chidaotuyen';
import DanhSachThongKe from 'app/modules/quanlychidaotuyen/thongke';
import MainIndex from 'app/modules/trangchu/main';
import DashBoardCDT from 'app/modules/quanlychidaotuyen/dashboard';
import DashBoardDeTai from 'app/modules/quanlynghiencuukhoahoc/dashboard';

// Phân hệ quản lý nghiên cứu khoa học
import DanhSachChucVu from 'app/modules/quanlynghiencuukhoahoc/chucvu';
import DanhSachChuThe from 'app/modules/quanlynghiencuukhoahoc/chuthedetai';
import DanhSachHangDeTai from 'app/modules/quanlynghiencuukhoahoc/hangdetai';
import DanhSachLoaiDeTai from 'app/modules/quanlynghiencuukhoahoc/loaidetai';
import DanhSachNhomDeTai from 'app/modules/quanlynghiencuukhoahoc/nhomdetai';
import DanhSachKeHoachDeTai from 'app/modules/quanlynghiencuukhoahoc/kehoachdetai';
import DanhSachDeTaiDangKy from 'app/modules/quanlynghiencuukhoahoc/detaidangky';
import DanhSachXetDuyetDeTai from 'app/modules/quanlynghiencuukhoahoc/xetduyetdetai';
import DanhSachXetDuyetDeCuong from 'app/modules/quanlynghiencuukhoahoc/xetduyetdecuong';
import DanhSachXetDuyetBaoCaoTongKet from 'app/modules/quanlynghiencuukhoahoc/xetduyetbaocaotongket';
import DanhSachDeTaiNam from 'app/modules/quanlynghiencuukhoahoc/detainam';
import DanhSachXetDuyetDeTaiDonVi from 'app/modules/quanlynghiencuukhoahoc/xetduyetdetaidonvi';
import DanhSachXetDuyetDeTaiUngDungChoDonVi from 'app/modules/quanlynghiencuukhoahoc/xetduyetdetaiungdungchodonvi';
import DanhSachBienBanKeHoachDeTaiUngDungChoDonVi from 'app/modules/quanlynghiencuukhoahoc/bienbankehoachdetaiungdungchodonvi';
import DanhSachBaoCaoQuyNamDeTai from 'app/modules/quanlynghiencuukhoahoc/baocaoquynamdetai';
import DanhSachVanBanApDungLauDai from 'app/modules/quanlynghiencuukhoahoc/vanbanapdunglaudai';
import DanhSachVanBanChapThuanApDungLauDai from 'app/modules/quanlynghiencuukhoahoc/vanbanchapthuanapdunglaudai';
import DanhSachThongKeNCKH from 'app/modules/quanlynghiencuukhoahoc/thongke';
import DangNhap from 'app/modules/taikhoan';
// tslint:disable:space-in-parens

const Account = Loadable({
  loader: () => import(/* webpackChunkName: "account" */ 'app/modules/account'),
  loading: () => <div>loading ...</div>
});

const Admin = Loadable({
  loader: () => import(/* webpackChunkName: "administration" */ 'app/modules/administration'),
  loading: () => <div>loading ...</div>
});
// tslint:enable

const Routes = () => (
  <div className="view-routes">
    {/*<ErrorBoundaryRoute path="/login" component={Login} />*/}
    {/*<Switch>*/}
      {/*<ErrorBoundaryRoute path="/logout" component={Logout} />*/}
      {/*<ErrorBoundaryRoute path="/register" component={Register} />*/}
      {/*<ErrorBoundaryRoute path="/activate/:key?" component={Activate} />*/}
      {/*<ErrorBoundaryRoute path="/reset/request" component={PasswordResetInit} />*/}
      {/*<ErrorBoundaryRoute path="/reset/finish/:key?" component={PasswordResetFinish} />*/}
      {/*<PrivateRoute path="/admin" component={Admin} hasAnyAuthorities={[AUTHORITIES.ADMIN]} />*/}
      {/*<PrivateRoute path="/account" component={Account} hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]} />*/}
      {/*<PrivateRoute path="/entity" component={Entities} hasAnyAuthorities={[AUTHORITIES.USER]} />*/}
      {/*<Switch>*/}
          {/*<ErrorBoundaryRoute path="/logout" component={Logout} />*/}
          {/*/!*<ErrorBoundaryRoute path="/register" component={Register} />*!/*/}
          {/*/!*<ErrorBoundaryRoute path="/activate/:key?" component={Activate} />*!/*/}
          {/*/!*<ErrorBoundaryRoute path="/reset/request" component={PasswordResetInit} />*!/*/}
          {/*/!*<ErrorBoundaryRoute path="/reset/finish/:key?" component={PasswordResetFinish} />*!/*/}
          {/*<PrivateRoute path="/admin" component={Admin} hasAnyAuthorities={[AUTHORITIES.ADMIN]} />*/}
          {/*/!*<PrivateRoute path="/account" component={Account} hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]} />*!/*/}
          {/*/!*<PrivateRoute path="/entity" component={Entities} hasAnyAuthorities={[AUTHORITIES.USER]} />*!/*/}
      {/*</Switch>*/}
      {
            localStorage.getItem('tai_khoan') !== null && localStorage.getItem('tai_khoan') !== undefined ?
                (
                    localStorage.getItem('phan_quyen') === '1' || localStorage.getItem('phan_quyen') === '2' ? (
                        localStorage.getItem('phan_quyen') === '1' ? (
                            <Switch>
                                <ErrorBoundaryRoute path="/hinh-thuc" component={DanhSachHinhThuc} />
                                <ErrorBoundaryRoute path="/loai-cdt" component={DanhSachLoaiCDT} />
                                <ErrorBoundaryRoute path="/noi-dung" component={DanhSachNoiDung} />
                                <ErrorBoundaryRoute path="/doi-tuong" component={DanhSachDoiTuong} />
                                <ErrorBoundaryRoute path="/danh-gia" component={DanhSachDanhGia} />
                                <ErrorBoundaryRoute path="/van-ban" component={DanhSachVanBan} />
                                <ErrorBoundaryRoute path="/ke-hoach" component={DanhSachKeHoach} />
                                <ErrorBoundaryRoute path="/cdt" component={DanhSachCDT} />
                                <ErrorBoundaryRoute path="/thong-ke" component={DanhSachThongKe} />
                                <ErrorBoundaryRoute path="/dashboard-cdt" component={DashBoardCDT} />
                                <ErrorBoundaryRoute path="/" component={MainIndex} />
                            </Switch>
                        ) : (
                            <Switch>
                                <ErrorBoundaryRoute path="/cdt" component={DanhSachCDT} />
                                <ErrorBoundaryRoute path="/thong-ke" component={DanhSachThongKe} />
                                <ErrorBoundaryRoute path="/" component={MainIndex} />
                            </Switch>
                        )
                    ) : (
                        localStorage.getItem('phan_quyen') === '3' ? (
                            <Switch>
                                <ErrorBoundaryRoute path="/quan-ly-nckh/chuc-vu" component={ DanhSachChucVu } />
                                <ErrorBoundaryRoute path="/quan-ly-nckh/chu-the-de-tai" component={ DanhSachChuThe } />
                                <ErrorBoundaryRoute path="/quan-ly-nckh/hang-de-tai" component={ DanhSachHangDeTai } />
                                <ErrorBoundaryRoute path="/quan-ly-nckh/loai-de-tai" component={ DanhSachLoaiDeTai } />
                                <ErrorBoundaryRoute path="/quan-ly-nckh/nhom-de-tai" component={ DanhSachNhomDeTai } />
                                <ErrorBoundaryRoute path="/quan-ly-nckh/ke-hoach-de-tai" component={ DanhSachKeHoachDeTai } />
                                <ErrorBoundaryRoute path="/" component={MainIndex} />
                            </Switch>
                        ) : (
                            localStorage.getItem('phan_quyen') === '4' ? (
                                <Switch>
                                    <ErrorBoundaryRoute path="/quan-ly-nckh/de-tai-dang-ky" component={ DanhSachDeTaiDangKy } />
                                    <ErrorBoundaryRoute path="/quan-ly-nckh/xet-duyet-de-tai" component={ DanhSachXetDuyetDeTai } />
                                    <ErrorBoundaryRoute path="/quan-ly-nckh/thong-ke" component={ DanhSachThongKeNCKH } />
                                    <ErrorBoundaryRoute path="/quan-ly-nckh/dashboard-de-tai" component={DashBoardDeTai} />
                                    <ErrorBoundaryRoute path="/" component={MainIndex} />
                                </Switch>
                            ) : (
                                localStorage.getItem('phan_quyen') === '5' ? (
                                    <Switch>
                                        <ErrorBoundaryRoute path="/quan-ly-nckh/xet-duyet-de-cuong" component={ DanhSachXetDuyetDeCuong } />
                                        <ErrorBoundaryRoute path="/quan-ly-nckh/xet-duyet-bao-cao-tong-ket" component={ DanhSachXetDuyetBaoCaoTongKet } />
                                        <ErrorBoundaryRoute path="/quan-ly-nckh/de-tai-nam" component={ DanhSachDeTaiNam } />
                                        <ErrorBoundaryRoute path="/quan-ly-nckh/xet-duyet-de-tai-don-vi" component={ DanhSachXetDuyetDeTaiDonVi } />
                                        <ErrorBoundaryRoute path="/quan-ly-nckh/xet-duyet-de-tai-ung-dung-cho-don-vi" component={ DanhSachXetDuyetDeTaiUngDungChoDonVi } />
                                        <ErrorBoundaryRoute path="/quan-ly-nckh/thong-ke" component={ DanhSachThongKeNCKH } />
                                        <ErrorBoundaryRoute path="/quan-ly-nckh/dashboard-de-tai" component={DashBoardDeTai} />
                                        <ErrorBoundaryRoute path="/" component={MainIndex} />
                                    </Switch>
                                ) : (
                                        localStorage.getItem('phan_quyen') === '6' ? (
                                            <Switch>
                                                <ErrorBoundaryRoute path="/quan-ly-nckh/bien-ban-ke-hoach-de-tai-ung-dung-cho-don-vi"
                                                                    component={ DanhSachBienBanKeHoachDeTaiUngDungChoDonVi } />
                                                <ErrorBoundaryRoute path="/quan-ly-nckh/bao-cao-quy-nam-de-tai" component={ DanhSachBaoCaoQuyNamDeTai } />
                                                <ErrorBoundaryRoute path="/quan-ly-nckh/van-ban-ap-dung-lau-dai" component={ DanhSachVanBanApDungLauDai } />
                                                <ErrorBoundaryRoute path="/quan-ly-nckh/van-ban-chap-thuan-ap-dung-lau-dai" component={ DanhSachVanBanChapThuanApDungLauDai } />
                                                <ErrorBoundaryRoute path="/quan-ly-nckh/thong-ke" component={ DanhSachThongKeNCKH } />
                                                <ErrorBoundaryRoute path="/quan-ly-nckh/dashboard-de-tai" component={DashBoardDeTai} />
                                                <ErrorBoundaryRoute path="/" component={MainIndex} />
                                            </Switch>
                                        ) : (
                                            localStorage.getItem('phan_quyen') === '9999' ? (
                                                <Switch>
                                                    <ErrorBoundaryRoute path="/admin" component={Admin}/>
                                                </Switch>
                                            ) : (
                                                <>
                                                </>
                                            )
                                            )
                                    )
                                )
                        )
                    )
                ) : (
                <Switch>
                    {/*<ErrorBoundaryRoute path="/tai-khoan" component={ DangNhap }/>*/}
                    <ErrorBoundaryRoute path="/" component={MainIndex} />
                </Switch>
                )
        }
          <ErrorBoundaryRoute path="/tai-khoan" component={ DangNhap }/>
  </div>
);

export default Routes;
