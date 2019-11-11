package vn.vnpt.pwa.khambenh.controller;

import com.google.gson.Gson;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.Channel;
import com.zaxxer.hikari.HikariDataSource;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import jreport.report.util.JasperHelper;
import org.apache.commons.collections.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.DataSourceUtils;
import org.springframework.web.bind.annotation.*;
import vn.vnpt.pwa.khambenh.dao.KhambenhDAO;
import vn.vnpt.pwa.khambenh.sendsms.SendSMS;
import vn.vnpt.pwa.khambenh.object.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.UnsupportedEncodingException;


import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api")
@Api(value = "KhambenhController", description = "Khám bệnh controller")
public class KhambenhController {
    @Autowired
    private KhambenhDAO khamBenhDao;
    @Autowired private HikariDataSource dataSourceKhamBenh;

    @ApiOperation("Lay danh sach benh nhan theo phong kham")
    @RequestMapping(value = "kham-benh/danh-sach-tiep-nhan-khoa-phong-phan-chia", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List danhsachtiepnhantheophong_phanchia(
        @RequestParam(value = "trangThai") int trangThai,
        @RequestParam(value = "maPhongKham") int maPhongKham,
        @RequestParam(value = "dvtt") String dvtt,
        @RequestParam(value = "tsKhamNgoaiLoc67") int tsKhamNgoaiLoc67,
        @RequestParam(value = "tsBnMienPhiKbhKhongCanDongTien820343") int tsBnMienPhiKbhKhongCanDongTien820343,
        @RequestParam(value = "batBuocDongTien70") int batBuocDongTien70,
        @RequestParam(value = "chuyenPhongKoBh89194") int chuyenPhongKoBh89194,
        @RequestParam(value = "bhytTraiTuyenVanKham96126") int bhytTraiTuyenVanKham96126,
        @RequestParam(value = "goiSoHinhAnh91100") int goiSoHinhAnh91100,
        @RequestParam(value = "tsKhamCapCuu94434") int tsKhamCapCuu94434,
        @RequestParam(value = "tsBantManTinh9401022") int tsBantManTinh9401022
    ) {
        return khamBenhDao.laydstheophong_phanchia(
            maPhongKham,
            trangThai,
            dvtt,
            tsKhamNgoaiLoc67,
            tsBnMienPhiKbhKhongCanDongTien820343,
            batBuocDongTien70, chuyenPhongKoBh89194, bhytTraiTuyenVanKham96126, goiSoHinhAnh91100, tsKhamCapCuu94434, tsBantManTinh9401022);
    }

    @ApiOperation("Lay noi dang ky kham chua benh ban dau")
    @RequestMapping(value = "kham-benh/lay-noi-dang-ky-kcb", method = RequestMethod.GET)
    public @ResponseBody
    String laynoidangkykcb(@RequestParam(value = "noiDangKy") String noiDangKy) {
        return khamBenhDao.noitru_select_tennoidangky(noiDangKy);
    }

    @ApiOperation("Lay so ngay con lai bhyt")
    @RequestMapping(value = "kham-benh/lay-so-ngay-con-lai-bhyt", method = RequestMethod.GET)
    public @ResponseBody
    String songayconbhyt_svv(@RequestParam(value = "idTiepNhan") String idTiepNhan,
                             @RequestParam(value = "dvtt") String dvtt,
                             @RequestParam(value = "soVaoVien") String soVaoVien
    ) {
        return khamBenhDao.songayconbhyt_svv(idTiepNhan, dvtt, soVaoVien);
    }

    @ApiOperation("Lay thong tin kham benh")
    @RequestMapping(value = "kham-benh/lay-thong-tin-kham-benh-svv", produces = "application/json; charset=utf-8",method = RequestMethod.GET)
    public @ResponseBody
    List loadthongtinkb_svv(@RequestParam(value = "maKb") String maKb, @RequestParam(value = "dvtt") String dvtt, @RequestParam(value = "soVaoVien") String soVaoVien) {

        return khamBenhDao.loadthongtinkb_svv(maKb, dvtt, soVaoVien);
    }

    @ApiOperation("Lay so phieu thanh toan")
    @RequestMapping(value = "kham-benh/lay-so-phieu-thanh-toan-svv-moi", method = RequestMethod.GET)
    public @ResponseBody
    String laysophieuthanhtoan_svv_moi(@RequestParam(value = "maKhamBenh") String maKhamBenh, @RequestParam(value = "dvtt") String dvtt, @RequestParam(value = "dieuTriChuyenKhoa") String dieuTriChuyenKhoa, @RequestParam(value = "soVaoVien") int soVaoVien) {
        return khamBenhDao.laysophieuthanhtoan_svv_moi(maKhamBenh, dvtt, dieuTriChuyenKhoa, soVaoVien);
    }

    @ApiOperation("Lay thong tin toa thuoc")
    @RequestMapping(value = "kham-benh/lay-thong-tin-toa-thuoc-svv", produces = "application/json; charset=utf-8",method = RequestMethod.GET)
    public @ResponseBody
    List laythongtintoathuoc_svv(@RequestParam(value = "maKb") String maKb, @RequestParam(value = "soVaoVien") String soVaoVien, @RequestParam(value = "dvtt") String dvtt) {
        return khamBenhDao.laythongtintoathuoc_svv(maKb, dvtt, soVaoVien);
    }

    @ApiOperation("Chi tiet toa thuoc ngoai tru")
    @RequestMapping(value = "kham-benh/chi-tiet-toa-thuoc-ngoai-tru-svv", produces = "application/json; charset=utf-8",method = RequestMethod.GET)
    public @ResponseBody
    List chitiettoathuocngoatru_svv(@RequestParam(value = "maTT") String maTT,
                                    @RequestParam(value = "nghiepVu") String nghiepVu,
                                    @RequestParam(value = "dvtt") String dvtt,
                                    @RequestParam(value = "soVaoVien") String soVaoVien/*,
                                    @RequestParam(value = "soPhieu", required = false, defaultValue = "") String soPhieu,
                                    @RequestParam(value = "ma", required = false, defaultValue = "0") String ma,
                                    @RequestParam(value = "theoDv", required = false, defaultValue = "0") String theoDv,
                                    @RequestParam(value = "soPhieuTtPt", required = false, defaultValue = "") String soPhieuTtPt,
                                    @RequestParam(value = "maTtPt", required = false, defaultValue = "") String maTtPt*/) {
        return khamBenhDao.chitiettoathuocngoaitru_svv(maTT, dvtt, nghiepVu, soVaoVien/*, soPhieu, ma, theoDv, soPhieuTtPt, maTtPt*/);
    }

    @ApiOperation("Them kham benh")
    @RequestMapping(value = "kham-benh/them-kham-benh-giamtai",method = RequestMethod.POST)
    public @ResponseBody
    Map themkhambenh_giamtai(@RequestBody KhambenhObj kb) {
        try {
            Date date = new Date(); // your date
            Calendar cal = Calendar.getInstance();
            cal.setTime(date);
            String ngayhientai = new SimpleDateFormat("yyyy-MM-dd").format(new java.util.Date());
            kb.ngayRaToa = ngayhientai;
            kb.maKhamBenh = "";
            String sql = "select ifnull(ma_kham_benh,'') from his_kb_ngt.kb_kham_benh where MA_KHAM_BENH= ? and dvtt= ?";
            try {
                kb.maKhamBenh = khamBenhDao.queryForString(sql, new Object[]{
                    "kb_" + kb.idTiepNhan, kb.dvtt
                });
            } catch (Exception e) {
                kb.maKhamBenh = "";
            }
            kb.maToaThuoc = "tt_" + kb.idTiepNhan;
            kb.ngayGioKham = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new java.util.Date());
            sql = "call his_kb_ngt.SELECT_TIEPNHANPHONGBENH_SVV(?,?,?,?,?)";
            try {
                kb.ttKiemTra = khamBenhDao.queryForString(sql, new Object[]{
                    kb.idTiepNhan, kb.dvtt, kb.maPhongKham, kb.soPhieu, kb.soVaoVien
                });
            } catch (Exception e) {
                kb.ttKiemTra = "";
            }
            Map map_tt = khamBenhDao.thongtinkbc_select_hk_svv(kb.soVaoVien, kb.dvtt + "");
            boolean dungtuyen = Boolean.parseBoolean(map_tt.get("DUNG_TUYEN").toString());
            String noidangkykcb = map_tt.get("NOIDANGKY_KCB").toString();
            String dvkham = map_tt.get("MA_DV").toString();
            kb.congKham = map_tt.get("TIEN_CONG_KHAM").toString();
            if (map_tt.get("BHYT_NOITINH").toString().equals("1")) {
                if (noidangkykcb.equals(kb.dvtt + "")) {
                    kb.kyHieuGroup = "A";
                } else {
                    kb.kyHieuGroup = "B";
                }
            } else {
                kb.kyHieuGroup = "C";
            }
            kb.ngayHienTai = ngayhientai;
            TaoToaThuocMSObj toaToaThuocMSObj = new TaoToaThuocMSObj();
            toaToaThuocMSObj.idTiepNhan = kb.idTiepNhan;
            toaToaThuocMSObj.dvtt = kb.dvtt;
            toaToaThuocMSObj.ngayRaToa = kb.ngayRaToa;
            toaToaThuocMSObj.maPhongKham = Integer.toString(kb.maPhongKham);
            toaToaThuocMSObj.hoTen = kb.tenBenhNhan;
            toaToaThuocMSObj.phanTramBH =kb.tiLeMienGiam;
            toaToaThuocMSObj.tuoi = Integer.toString(kb.tuoi);
            toaToaThuocMSObj.maBenhNhan = kb.maBenhNhan;
            toaToaThuocMSObj.namHienTai = String.valueOf(cal.get(Calendar.YEAR));
            toaToaThuocMSObj.tenPhongKham = kb.tenPhongKham;
            toaToaThuocMSObj.soVaoVien = Integer.toString(kb.soVaoVien);
            toaToaThuocMSObj.maNhanVien = Integer.toString(kb.maNv);

            Gson gson = new Gson();
            String message = gson.toJson(toaToaThuocMSObj);
            String QUEUE_NAME = "TAO_TOA_THUOC_QUEUE";
            ConnectionFactory factory = new ConnectionFactory();
            factory.setHost("10.82.14.178");
            Connection connection = factory.newConnection();
            Channel channel = connection.createChannel();
            channel.basicPublish("", QUEUE_NAME, null, message.getBytes("UTF-8"));
            System.out.println(" [x] Sent '" + message + "'");

            channel.close();
            connection.close();
            return khamBenhDao.themkhambenh_giamtai(kb);
        } catch (Exception e) {
            e.printStackTrace();
            return new HashedMap();
        }
    }

    @ApiOperation("Luu thong tin kham benh")
    @RequestMapping(value = "kham-benh/luu-kham-benh-svv",method = RequestMethod.POST)
    public @ResponseBody
    String luukhambenh_svv(@RequestBody KhambenhObj kb) {
        try {
            kb.maKhamBenh = "kb_" + kb.idTiepNhan;
            kb.mach = kb.mach == "" ? null : kb.mach;
            kb.nhipTho = kb.nhipTho == "" ? null : kb.nhipTho;
            kb.nhietDo = kb.nhietDo == "" ? null : kb.nhietDo;
            kb.huyetApTren = kb.huyetApTren == "" ? null : kb.huyetApTren;
            kb.huyetApDuoi = kb.huyetApDuoi == "" ? null : kb.huyetApDuoi;
            kb.chieuCao = kb.chieuCao == "" ? null : kb.chieuCao;
            kb.canNang = kb.canNang == "" ? null : kb.canNang;
            kb.creaTiNin = kb.creaTiNin == "" ? null : kb.creaTiNin;
            kb.bmi = kb.bmi == "" ? null : kb.bmi;
            kb.doThanhThai = kb.doThanhThai == "" ? null : kb.doThanhThai;
            kb.icd = kb.icd == "" ? null : kb.icd;
            if(kb.benhPhu != null) {
                kb.benhPhu = kb.benhPhu.replaceAll("=", "+");
                kb.benhPhu = kb.benhPhu.replaceAll("encode_symbol_0025", "%");
            }
            khamBenhDao.luukhambenh_svv(kb);
        } catch (NumberFormatException e) {
            throw e;
        }
        return "200";
    }

    @ApiOperation("Chuyen phong")
    @RequestMapping(value = "kham-benh/chi-dinh-chuyen-phong-kham", method = RequestMethod.POST)
    public @ResponseBody
    String luukhambenh_svv(@RequestParam(value = "dvtt") String dvtt,
                           @RequestParam(value = "idTiepNhan") String idTiepNhan,
                           @RequestParam(value = "soThuTuBV") String soThuTuBV,
                           @RequestParam(value = "maPhongHT") String maPhongHT,
                           @RequestParam(value = "soThuTuHT") String soThuTuHT,
                           @RequestParam(value = "maNhanVien") String maNhanVien,
                           @RequestParam(value = "khongThuTien") String khongThuTien,
                           @RequestParam(value = "soVaoVien") String soVaoVien,
                           @RequestParam(value = "maDV") String maDV,
                           @RequestParam(value = "maPhongChiDinh") String maPhongChiDinh) {
        String sql = "select ifnull(count(MA_TOA_THUOC),0) "
                + " from kb_chi_tiet_toa_thuoc "
                + " where MA_TOA_THUOC = ? and DVTT = ? "
                + "and sovaovien=?"
                + " and XAC_NHAN = 1 and NGHIEP_VU !='ngoaitru_toadichvu'";

        String kiemtrahethong = khamBenhDao.queryForString(sql, new Object[]{"tt_" + idTiepNhan, dvtt, soVaoVien});

        if (!kiemtrahethong.equals("0")) {
            return "1";
        }
        String kiemtra_kq = khamBenhDao.kb_ngt_cpk_cctt_tt37_svv(dvtt, idTiepNhan, soThuTuBV, maPhongHT, soThuTuHT, maPhongChiDinh, maNhanVien, khongThuTien, soVaoVien, maDV, "0");
        return kiemtra_kq;
    }

    @ApiOperation("Lay mo ta benh ly")
    @RequestMapping(value = "kham-benh/lay-mo-ta-benh-ly", method = RequestMethod.GET)
    public @ResponseBody
    List laymotabenhly(@RequestParam(value = "icd") String icd) {
        try {
            return khamBenhDao.laymotabenhly(icd);
        } catch (Exception e) {
            return null;
        }
    }

    @ApiOperation("Lay bc tinh hinh kb")
    @RequestMapping(value = "kham-benh/danhsachbenhnhanthuckham", method = RequestMethod.POST)
    public List danhsachbenhnhanthuckham(@RequestBody BaoCaoObj obj) {
        return khamBenhDao.xembaocaokhambenh(obj);
    }

    @ApiOperation("Lay danh sach don vi")
    @RequestMapping(value = "kham-benh/danhsach_donvi", method = RequestMethod.GET)
    public @ResponseBody
    List danhsach_donvi(@RequestParam(value = "dvtt") String dvtt) {
        return khamBenhDao.danhsach_donvi(dvtt);
    }

    @ApiOperation("Lay danh sach khoa theo donvi")
    @RequestMapping(value = "kham-benh/danhsachkhoa_theodonvi", method = RequestMethod.GET)
    public @ResponseBody
    List danhsachkhoa_theodonvi(@RequestParam(value = "dvtt") String dvtt) {
        return khamBenhDao.danhsach_phongban(dvtt);
    }

    @ApiOperation("Lay danh sach phong theo khoa")
    @RequestMapping(value = "kham-benh/danhsachphong_theokhoa", method = RequestMethod.GET)
    public @ResponseBody
    List danhsachphong_theokhoa(@RequestParam(value = "khoa") String khoa) {
        return khamBenhDao.danhsach_phongbenh(khoa);
    }

    @ApiOperation("Lay mo ta benh ly y hoc co truyen")
    @RequestMapping(value = "kham-benh/lay-mo-ta-benh-ly-yhct", method = RequestMethod.GET)
    public @ResponseBody
    List laymotabenhly_yhct(@RequestParam(value = "icd") String icd) {
        try {
            return khamBenhDao.laymotabenhly(icd);
        } catch (Exception e) {
            return null;
        }
    }

    @ApiOperation("Lay danh sach ICD thuong dung")
    @RequestMapping(value = "kham-benh/ds-icd-thuong-dung", produces = "application/json; charset=utf-8",method = RequestMethod.GET)
    public @ResponseBody
    List ds_icdthuongdung(@RequestParam(value = "maNhanVien") String maNhanVien,
                          @RequestParam(value = "dvtt") String dvtt
    ) {
        return khamBenhDao.ds_icd_thuongdung(dvtt, maNhanVien);
    }

    @ApiOperation("Kiem tra benh man tinh")
    @RequestMapping(value = "kham-benh/kiem-tra-benh-man-tinh", method = RequestMethod.GET)
    public @ResponseBody
    String kiemtrabenhmantinh(@RequestParam(value = "icd") String  icd, @RequestParam(value = "dvtt") String  dvtt
    ) {
        return khamBenhDao.kiemtrabenhmantinh_benhnhan(dvtt, icd);
    }

    @ApiOperation("Luu thong tin toa thuoc")
    @RequestMapping(value = "kham-benh/luu-thong-tin-toa-thuoc", method = RequestMethod.POST)
    public @ResponseBody
    void luuthongtintoathuoc(@RequestBody KhambenhObj kb) {
        try {
            khamBenhDao.luuthongtintoathuoc(kb);
        } catch (NumberFormatException e) {
            throw e;
        }
    }

    @ApiOperation("Luu thong tin icd thuong dung")
    @RequestMapping(value = "kham-benh/icd-thuong-dung-insert", method = RequestMethod.POST)
    public @ResponseBody
    void icdthuongdung_insert(@RequestParam(value = "maBenhLy") String maBenhLy,
                              @RequestParam(value = "icd") String icd,
                              @RequestParam(value = "moTa") String moTa,
                              @RequestParam(value = "maNhanVien") String maNhanVien,
                              @RequestParam(value = "dvtt") String dvtt
    ) {
        khamBenhDao.icd_thuongdung_insert(maBenhLy, icd, moTa, maNhanVien, dvtt);
    }

    @ApiOperation("Lay trang thai kham")
    @RequestMapping(value = "kham-benh/lay-trang-thai-kham-svv", method = RequestMethod.GET)
    public @ResponseBody
    String laytrangthaikham_svv(@RequestParam(value = "idTiepNhan") String idTiepNhan,
                                @RequestParam(value = "dvtt") String dvtt, @RequestParam(value = "soVaoVien") String soVaoVien,@RequestParam(value = "tsKiemTraCls89011") String tsKiemTraCls89011

    ) {
        if (tsKiemTraCls89011.equals("1")) {
            String sl_cls = khamBenhDao.agg_kt_cls_ngoai(dvtt, idTiepNhan);
            if (sl_cls.equals("1")) {
                return "cocls";
            } else {// nếu không có cls
                return khamBenhDao.laytrangthaikham_svv(idTiepNhan, dvtt, soVaoVien);
            }
        }
        return khamBenhDao.laytrangthaikham_svv(idTiepNhan, dvtt, soVaoVien);
    }

    @ApiOperation("Hoan tat kham benh nhan")
    @RequestMapping(value = "kham-benh/hoan-tat-kham-giam-tai",method = RequestMethod.POST)
    public @ResponseBody
    String hoantatkham_giamtai(@RequestBody KhambenhObj obj) throws UnsupportedEncodingException {
        String sql = "select MA_PHONG_BAN from his_dm.dm_phong_benh_doi_chieu where MA_PHONG_BENH = ?";
        obj.maPhongBan = khamBenhDao.queryForString(sql, new Object[]{obj.maPhongKham});
        sql = "select THOI_GIAN_KHAM_BENH FROM his_tn.tiep_nhan_phong_benh where ID_TIEPNHAN=? and dvtt=? "
            + " and MA_PHONG_BENH=? and SO_TIEP_NHAN_PB=? and rownum = 1";
        try {
            obj.ngayGioKham = khamBenhDao.queryForString(sql, new Object[]{obj.idTiepNhan, obj.dvtt, obj.maPhongKham, obj.soPhieu});
        } catch (Exception e) {
            obj.ngayGioKham = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new java.util.Date());
        }
        /*LichsusudungObj objls = new LichsusudungObj(obj.dvtt + "", "Hoàn tất khám cho bệnh nhân " + obj.makhambenh, session.getAttribute("Sess_UserID").toString() + "-" + session.getAttribute("Sess_User"), "Hoàn tất khám");
        LichsusudungDAO.them_lichsusudung(objls);*/
        String kq = khamBenhDao.hoantatkham_giamtai(obj);
        if (!"1".equals(kq)) {
            /*luuLichSuKhamBenh(obj.dvtt, obj.makhambenh);*/
        }
        return kq;
    }

    @ApiOperation("Lay danh sach ICD")
    @RequestMapping(value = "kham-benh/get_list_icd", method = RequestMethod.GET)
    public @ResponseBody
    List laydanhsachICD(@RequestParam(value = "icd") String icd) {
        try {
            return khamBenhDao.laydanhsachICD();
        } catch (Exception e) {
            return null;
        }
    }
    @ApiOperation("Lay danh sach vat tu theo loai")
    @RequestMapping(value = "kham-benh/lay-vat-tu-theo-loai", method = RequestMethod.GET)
    public @ResponseBody
    Map layvattu_theoloai(@RequestParam(value = "sidx") String sidx,
                          @RequestParam(value = "page") String page,
                          @RequestParam(value = "sord") String sord,
                          @RequestParam(value = "rows") String rows,
                          @RequestParam(value = "searchTerm") String searchTerm,
                          @RequestParam(value = "makhovt") String makhovt,
                          @RequestParam(value = "loaivattu") String loaivattu,
                          @RequestParam(value = "nhomvattu", required = false) String nhomvattu,
                          @RequestParam(value = "dvtt") String dvtt) {
        int page_Int = Integer.parseInt(page);
        int limit = Integer.parseInt(rows);
        if (sidx.equals("")) {
            sidx = "1";
        }
        if (searchTerm.equals("")) {
            return new HashMap();
        } else {
            searchTerm = searchTerm + "%";
            int c = khamBenhDao.laysoluong_vattu(dvtt, makhovt, searchTerm);
            int total_pages;
            if (c > 0) {
                total_pages = (c / limit) + 1;
            } else {
                total_pages = 0;
            }
            if (page_Int > total_pages) {
                page_Int = total_pages;
            }
            int start = limit * page_Int - limit;
            List<Map<String, Object>> vattu= khamBenhDao.danhsach_vattu(dvtt, makhovt, searchTerm, sidx, sord, start, limit, total_pages, loaivattu);
            if (!vattu.isEmpty()) {
                Map m = new HashMap();
                m.put("records", c);
                m.put("total", total_pages);
                m.put("rows", vattu);
                return m;
            }
        }
        return new HashMap();
    }

    @ApiOperation("Them chi tiet toa thuoc ngoai tru")
    @RequestMapping(value = "kham-benh/them-toa-thuoc-ngoai-tru-giam-tai", method = RequestMethod.POST)
    public @ResponseBody
    String themtoathuocngoaitru_giamtai(@RequestBody ToaThuocMSObj toathuoc
//                                        @RequestParam(value = "sang") float sang,
//                                        @RequestParam(value = "trua") float trua,
//                                        @RequestParam(value = "chieu") float chieu,
//                                        @RequestParam(value = "toi") float toi,
//                                        @RequestParam(value = "dongia_bv") float dongia_bv,
//                                        @RequestParam(value = "dongia_bh") float dongia_bh,
//                                        @RequestParam(value = "thanhtien") float thanhtien,
//                                        @RequestParam(value = "nghiepvu") String nghiepvu,
//                                        @RequestParam(value = "kho") String kho,
//                                        @RequestParam(value = "ngaykb") String ngaykb,
//                                        @RequestParam(value = "magoidichvu", required = false, defaultValue = "") String maGoiDichVu,
//                                        @RequestParam(value = "sophieu", required = false, defaultValue = "") String sophieu
//                                        @RequestParam(value = "ma_cdha", required = false, defaultValue = "") String ma_cdha, //
//                                        @RequestParam(value = "sophieu_ttpt", required = false, defaultValue = "") String sophieu_ttpt,
//                                        @RequestParam(value = "ma_ttpt", required = false, defaultValue = "") String ma_ttpt,
//                                        @RequestParam(value = "sophieu_xn", required = false, defaultValue = "") String sophieu_xn
    ) throws UnsupportedEncodingException {
        try {
            toathuoc.ngayRaToa =new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new java.util.Date());
            if (toathuoc.soPhieuTT.trim().equals("")) {
                toathuoc.soPhieuTT = khamBenhDao.laysophieuthanhtoan_svv_moi(toathuoc.maKhamBenh, toathuoc.dvtt, "0", toathuoc.soVaoVien);
            }
            toathuoc.maToaThuoc = toathuoc.maKhamBenh.replaceFirst("kb_", "tt_");
            toathuoc.idTiepNhan = toathuoc.maKhamBenh.replaceFirst("kb_", "");
            toathuoc.maKhamBenh = "kb_" + toathuoc.idTiepNhan;
            toathuoc.ngayKb = new SimpleDateFormat("yyyy-MM-dd").format(new java.util.Date());
            toathuoc.ngayHienTai = toathuoc.ngayKb;
            toathuoc.daThanhToan = "0";
            ThemThuocObj themThuocObj = new ThemThuocObj();

            themThuocObj.thamso82112 = "0";
            themThuocObj.thamso82112 = "0";
            themThuocObj.toaThuocMSObj =  toathuoc;
//            themThuocObj.toaThuocMSObj.dvtt = toathuoc.dvtt;
//            themThuocObj.toaThuocMSObj.maToaThuoc= toathuoc.matoathuoc;
//            themThuocObj.toaThuocMSObj.maKho = toathuoc.makhovt;
//            themThuocObj.toaThuocMSObj.maVatTu = toathuoc.mavt;
//            themThuocObj.toaThuocMSObj.tenVatTu = toathuoc.tenvt;
//            themThuocObj.toaThuocMSObj.tenGoc = toathuoc.tengoc;
//            themThuocObj.toaThuocMSObj.nghiepVu = toathuoc.nghiepvu;
//            themThuocObj.toaThuocMSObj.soLuong = toathuoc.soluong;
//            themThuocObj.toaThuocMSObj.soLuongThucLinh= toathuoc.soluongthuclinh;
//            themThuocObj.toaThuocMSObj.donGiaBV = toathuoc.dongiabv;
//            themThuocObj.toaThuocMSObj.donGiaBH = toathuoc.dongiabh;
//            themThuocObj.toaThuocMSObj.thanhTien = toathuoc.thanhtien;
//            themThuocObj.toaThuocMSObj.soNgay = toathuoc.songay;
//            themThuocObj.toaThuocMSObj.sang = toathuoc.sang;
//            themThuocObj.toaThuocMSObj.trua = toathuoc.trua;
//            themThuocObj.toaThuocMSObj.chieu = toathuoc.chieu;
//            themThuocObj.toaThuocMSObj.toi = toathuoc.toi;
//            themThuocObj.toaThuocMSObj.ngayRaToa = toathuoc.ngayratoa;
//            themThuocObj.toaThuocMSObj.ghiChuToaThuoc = toathuoc.ghichutoathuoc;
//            themThuocObj.toaThuocMSObj.maBacSi = toathuoc.mabacsi;
//            themThuocObj.toaThuocMSObj.cachSuDung = toathuoc.cachsudung;
//            themThuocObj.toaThuocMSObj.coBHYT = toathuoc.cobhyt;
//            themThuocObj.toaThuocMSObj.namHienTai = toathuoc.namhientai;
//            themThuocObj.toaThuocMSObj.maBenhNhan = toathuoc.mabenhnhan;
//            themThuocObj.toaThuocMSObj.soPhieuTT = toathuoc.sophieuthanhtoan;
//            themThuocObj.toaThuocMSObj.soVaoVien= toathuoc.sovaovien;

            if (toathuoc.soPhieuTT.trim().equals("")) {
                toathuoc.soPhieuTT = khamBenhDao.laysophieuthanhtoan_svv_moi(toathuoc.maKhamBenh, toathuoc.dvtt, "0", toathuoc.soVaoVien);
                themThuocObj.toaThuocMSObj.soPhieuTT=toathuoc.soPhieuTT;
            }
            themThuocObj.toaThuocMSObj.idTiepNhan = toathuoc.maToaThuoc.replaceFirst("tt_", "");
            themThuocObj.toaThuocMSObj.maKhamBenh= "kb_" + toathuoc.idTiepNhan;
            //toathuoc.ngayhientai = new SimpleDateFormat("yyyy-MM-dd").format(new java.util.Date());
            themThuocObj.toaThuocMSObj.ngayHienTai= toathuoc.ngayHienTai;
            themThuocObj.toaThuocMSObj.daThanhToan = "0";
            themThuocObj.toaThuocMSObj.keyQl = "0";
            themThuocObj.toaThuocMSObj.user = toathuoc.user;
            //Bo sung ma goi dich vu
//            themThuocObj.toaThuocMSObj.maGoiDichVu="0";
//            themThuocObj.toaThuocMSObj.soPhieu="";
//            themThuocObj.toaThuocMSObj.maCDHA="";
//            themThuocObj.toaThuocMSObj.soPhieuTT="";
//            themThuocObj.toaThuocMSObj.maTTPT="";
//            themThuocObj.toaThuocMSObj.soPhieuXN="";

            if (Integer.parseInt(toathuoc.coBHYT) > 0) {
                toathuoc.daThanhToan = khamBenhDao.khambenh_ngoaitru_chitiettoathuoc_kt_ptt_datt(toathuoc.dvtt, toathuoc.ngayRaToa, toathuoc.maBenhNhan, toathuoc.maKhamBenh, toathuoc.soVaoVien);
               if (Integer.parseInt(toathuoc.daThanhToan) > 0) {
                    return "4";
                }
            }
            String kiemtrahethong = "0";
//            kiemtrahethong = khamBenhDao.khambenh_ngoaitru_chitiettoathuoc_kt_xuatthuoc(toathuoc.dvtt, toathuoc.maToaThuoc, toathuoc.nghiepVu, toathuoc.ngayRaToa, toathuoc.maBenhNhan, toathuoc.soVaoVien);
//            if (!kiemtrahethong.equals("0")) {
//                return "5";
//            }
            if ("".equals(toathuoc.soPhieu)) {
                    kiemtrahethong = khamBenhDao.khambenh_ngoaitru_chitiettoathuoc_kt_trung(toathuoc.dvtt, toathuoc.maToaThuoc, toathuoc.nghiepVu, toathuoc.ngayRaToa, toathuoc.maBenhNhan, toathuoc.maVatTu, toathuoc.soVaoVien);
                    if (!kiemtrahethong.equals("0")) {
                        return "3";
                    }
            }
            Gson gson = new Gson();
            String message = gson.toJson(themThuocObj);
            String QUEUE_NAME = "THEM_THUOC_QUEUE";
            ConnectionFactory factory = new ConnectionFactory();
            factory.setHost("10.82.14.178");
            Connection connection = factory.newConnection();
            Channel channel = connection.createChannel();
            channel.basicPublish("", QUEUE_NAME, null, message.getBytes("UTF-8"));
            System.out.println(" [x] Sent '" + message + "'");

            channel.close();
            connection.close();
            //LichsusudungObj objls = new LichsusudungObj(toathuoc.dvtt, "Thêm thuốc " + toathuoc.tenvt + " - " + toathuoc.tengoc + " sl: " + toathuoc.soluong + " vào mã toa thuốc " + toathuoc.matoathuoc, session.getAttribute("Sess_UserID").toString() + "-" + session.getAttribute("Sess_User"), "Thêm thuốc");
            //LichsusudungDAO.them_lichsusudung(objls);
            String kq;
//            toathuoc.setMaGoiDichVu(maGoiDichVu);
                kq = khamBenhDao.themtoathuocngoaitru_gt_new(toathuoc);
            return kq;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "0";
    }

    @ApiOperation("Xoa chi tiet toa thuoc")
    @RequestMapping(value = "kham-benh/xoa-thuoc-ngoai-tru-giam-tai", method = RequestMethod.DELETE)
    public @ResponseBody
    String xoathuocngoaitru_giamtai(@RequestBody ToaThuocMSObj tt/*,
                                    @RequestParam(value = "sophieu", required = false, defaultValue = "") String sophieu,
                                    @RequestParam(value = "ma_cdha", required = false, defaultValue = "") String ma_cdha*/
    ) {
        try {
        if (tt.soPhieuTT.trim().equals("")) {
            tt.soPhieuTT = khamBenhDao.laysophieuthanhtoan_svv_moi(tt.maKhamBenh, tt.dvtt, "0", tt.soVaoVien);
        }
        tt.thanhTien = 0;
        tt.donGiaBV = 0;
        tt.ngayRaToa = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new java.util.Date());
//        tt.setSophieu(sophieu);
//        tt.setMa_cdha(ma_cdha);
//        String kiemtrahethong = "0";
//
//        kiemtrahethong = khamBenhDao.khambenh_ngoaitru_chitiettoathuoc_kt_xuatthuoc(tt.dvtt, tt.matoathuoc, tt.nghiepvu, tt.ngayratoa, tt.mabenhnhan, tt.sovaovien);
//        if (!kiemtrahethong.equals("0")) {
//            return "2";
//        }
//        //kiemtrahethong = khamBenhDao.khambenh_ngoaitru_chitiettoathuoc_kt_trathuocvekho(tt.dvtt, tt.matoathuoc, tt.nghiepvu, tt.ngayratoa, tt.mabenhnhan, tt.sovaovien);
//        if (!kiemtrahethong.equals("0")) {
//            return "3";
//        }
//        //kiemtrahethong = khamBenhDao.khambenh_ngoaitru_chitiettoathuoc_kt_thanhtoanthuoc(tt.dvtt, tt.matoathuoc, tt.nghiepvu, tt.ngayratoa, tt.mabenhnhan);
//        //kiemtrahethong=0;
//        if (!kiemtrahethong.equals("0")) {
//                return "1";
//        }
        //AGG Begin Khang 8/5/2017 kiem tra so luong thuoc truoc khi delete
        //LichsusudungObj objls = new LichsusudungObj(tt.dvtt, "Xóa thuốc với số thứ tự " + tt.sott + " trong toa thuốc " + tt.matoathuoc, session.getAttribute("Sess_UserID").toString() + "-" + session.getAttribute("Sess_User"), "Xóa thuốc");
        //LichsusudungDAO.them_lichsusudung(objls);
        //luuLichSuToaThuoc(tt.dvtt, tt.matoathuoc);
            Gson gson = new Gson();
            String message = gson.toJson(tt);
            String QUEUE_NAME = "XOA_THUOC_QUEUE";
            ConnectionFactory factory = new ConnectionFactory();
            factory.setHost("10.82.14.178");
            Connection connection = factory.newConnection();
            Channel channel = connection.createChannel();
            channel.basicPublish("", QUEUE_NAME, null, message.getBytes("UTF-8"));
            System.out.println(" [x] Sent Xóa toa thuốc '" + message + "'");

            channel.close();
            connection.close();
        String kq = khamBenhDao.xoachitiettoathuoc_gt(tt);
        if ("100".equals(kq)) {
            return kq;
        } else if ("0".equals(kq)) {
        }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "0";
    }



    @ApiOperation("load thong tin kham benh ")
    @RequestMapping(value = "kham-benh/loadthongtinkb", method = RequestMethod.POST)
    public @ResponseBody
    List thongtinkhambenh(@RequestParam(value = "makb") String makb, @RequestParam(value = "dvtt") String dvtt) {
        return khamBenhDao.laythongtinkb(makb, dvtt);
    }

    @ApiOperation("load thong tin bac si dieu tri ")
    @RequestMapping(value = "kham-benh/loadthongtinbacsidieutri", method = RequestMethod.POST)
    public @ResponseBody
    String loadthongtinbacsidieutri(@RequestParam(value = "mabacsi") String mabacsi) {
        return khamBenhDao.thongtinbacsikhambenh(mabacsi);
    }

    @ApiOperation("load thong tin toa thuoc lsk ")
    @RequestMapping(value = "/thongtintoathuoc_lskham", method = RequestMethod.POST)
    public @ResponseBody
    List thongtintoathuoc_lskham(@RequestParam(value = "makhambenh") String makhambenh, @RequestParam(value = "dvtt") String dvtt) {
        return khamBenhDao.thongtintoathuoc(makhambenh, dvtt);
    }

    @ApiOperation("load chi tiet toa thuoc ngoai tru")
    @RequestMapping(value = "/chitiettoathuocngoatru",  method = RequestMethod.POST)
    public @ResponseBody
    List chitiettoathuocngoaitru(@RequestParam(value = "matt") String matt, @RequestParam(value = "nghiepvu") String nghiepvu, @RequestParam(value = "dvtt") String dvtt) {
        return khamBenhDao.chitiettoathuocngoaitru(matt, dvtt, nghiepvu);
    }

    @ApiOperation("Danh sach lich su kham")
    @RequestMapping(value = "/tiep-nhan/danhsachlichsukham", method = RequestMethod.GET)
    public @ResponseBody
    List danhsachlichsukham(@RequestParam(value = "mabenhnhan") String mabenhnhan, @RequestParam(value = "tungay") String tungay, @RequestParam(value = "denngay") String denngay) {
        return khamBenhDao.danhsachlichsukham(mabenhnhan, tungay, denngay);
    }

    @ApiOperation("Danh sach lich su kham hgi ")
    @RequestMapping(value = "/tiep-nhan/danhsachlichsukhamkham_hgi", method = RequestMethod.GET)
    public @ResponseBody
    List danhsachlichsukham_hgi(@RequestParam(value = "mabenhnhan") String mabenhnhan, @RequestParam(value = "tungay") String tungay, @RequestParam(value = "denngay") String denngay) {
        return khamBenhDao.danhsachlichsukham_hgi(mabenhnhan, tungay, denngay);
    }

    @ApiOperation("Thong tin benh nhan kcb ")
    @RequestMapping(value = "/tiep-nhan/thongtinbenhnhan_lskham", method = RequestMethod.GET)
    public @ResponseBody
    List thongtinbenhnhan_lskham(@RequestParam(value = "dvtt", required = false, defaultValue = "") String dvtt,
                                 @RequestParam(value = "makhambenh") String makhambenh
    ) {
        return khamBenhDao.thongtinbenhnhan(dvtt, makhambenh);

    }
    @ApiOperation("Danh sach benh nhan theo don vi")
    @RequestMapping(value = "/kham-benh/danhsachbenhnhanchuakham_theodonvi", method = RequestMethod.GET)
    public @ResponseBody
    List danhsachbenhnhanchuakham_theodonvi(@RequestParam(value = "tungay") String tungay,
                                            @RequestParam(value = "denngay") String denngay,
                                            @RequestParam(value = "dvtt") String dvtt,
                                            @RequestParam(value = "khoa") String khoa,
                                            @RequestParam(value = "hinhthuc") String hinhthuc,
                                            @RequestParam(value = "phongbenh") String phongbenh,
                                            @RequestParam(value = "madonvi") String madonvi,
                                            @RequestParam(value = "khamsk") String khamsk
    ) {
        return khamBenhDao.danhsachbenhnhan_chuakham_theodonvi(tungay, denngay, dvtt, khoa, hinhthuc, phongbenh, madonvi, khamsk);
    }

    @ApiOperation("Danh sach benh nhan theo don vi")
    @RequestMapping(value = "/kham-benh/danhsachbenhnhandangkham_theodonvi", method = RequestMethod.GET)
    public @ResponseBody
    List danhsachbenhnhandangkham_theodonvi(@RequestParam(value = "tungay") String tungay,
                                            @RequestParam(value = "denngay") String denngay,
                                            @RequestParam(value = "dvtt") String dvtt,
                                            @RequestParam(value = "khoa") String khoa,
                                            @RequestParam(value = "hinhthuc") String hinhthuc,
                                            @RequestParam(value = "phongbenh") String phongbenh,
                                            @RequestParam(value = "madonvi") String madonvi,
                                            @RequestParam(value = "khamsk") String khamsk
    ) {
        return khamBenhDao.danhsachbenhnhan_dangkham_theodonvi(tungay, denngay, dvtt, khoa, hinhthuc, phongbenh, madonvi, khamsk);
    }

    @ApiOperation("Danh sach benh nhan theo don vi")
    @RequestMapping(value = "/kham-benh/danhsachbenhnhanhtkham_theodonvi", method = RequestMethod.GET)
    public @ResponseBody
    List danhsachbenhnhanhtkham_theodonvi(@RequestParam(value = "tungay") String tungay,
                                            @RequestParam(value = "denngay") String denngay,
                                            @RequestParam(value = "dvtt") String dvtt,
                                            @RequestParam(value = "khoa") String khoa,
                                            @RequestParam(value = "hinhthuc") String hinhthuc,
                                            @RequestParam(value = "phongbenh") String phongbenh,
                                            @RequestParam(value = "madonvi") String madonvi,
                                            @RequestParam(value = "khamsk") String khamsk
    ) {
        return khamBenhDao.danhsachbenhnhan_hoantatkham_theodonvi(tungay, denngay, dvtt, khoa, hinhthuc, phongbenh, madonvi, khamsk);
    }

    @RequestMapping(value = "kham-benh/inbaocaosoluongthuckham")
    public void inbaocaosoluongthuckham(@RequestParam(value = "tungay") String tungay
        , @RequestParam(value = "denngay") String denngay
        , @RequestParam(value = "dvtt") String dvtt
        , @RequestParam(value = "khoa") String khoa
        , @RequestParam(value = "tenkhoa") String tenkhoa
        , @RequestParam(value = "phongbenh") String phongbenh
        , @RequestParam(value = "tenphong") String tenphong
        , @RequestParam(value = "donvi") String donvi
        , @RequestParam(value = "loai") String loai
        , @RequestParam(value = "khamsk") String khamsk
        , @RequestParam(value = "loaibc") String loaibc
        , HttpServletResponse response, HttpServletRequest request) {
        try {

            String ngaythangnam = new SimpleDateFormat("yyyy-MM-dd").format(new java.util.Date());
            String arr_ngay[] = ngaythangnam.split("-");
            Map parameters = new HashMap();

            parameters.put("tungay", tungay);
            parameters.put("denngay", denngay);
            parameters.put("dvtt", dvtt);
            parameters.put("makhoa", khoa);
            parameters.put("tenkhoa", tenkhoa);
            parameters.put("maphong", phongbenh);
            parameters.put("tenphong", tenphong);
            String donviquanlytructiep = "SỞ Y TẾ ";
//            if (!tsht.tendonviquanlytructiep.equals("")) {
//                donviquanlytructiep = tsht.tendonviquanlytructiep.toUpperCase();
//            }
            parameters.put("tensoyte", "");
            parameters.put("tenbenhvien", "");
            parameters.put("tungaydenngay", "");
            parameters.put("ngay", arr_ngay[2]);
            parameters.put("thang", arr_ngay[1]);
            parameters.put("nam", arr_ngay[0]);
            parameters.put("madonvi", donvi);
            parameters.put("kham_sk", khamsk);
            parameters.put("nguoilapbaocao","");
            File reportFile;
            if (loaibc.equals("0")) {
                // KGG thêm report mẫu báo cáo tình hình khám bệnh tổng hợp
//                String s_dvtt = arr[2];
//                String duong_dan = KGGUtil.findFileReport(khambenhDAO, s_dvtt, "91033", "/WEB-INF/pages/baocao/rp_khambenh.jasper");
//                reportFile = new File(request.getSession().getServletContext().getRealPath("" + duong_dan + ""));
            reportFile = new ClassPathResource("/jasper.baocao/rp_khambenh.jasper").getFile();
            } else {
            reportFile = new ClassPathResource("/jasper.baocao/rp_khambenh_rutgon.jasper").getFile();
            }
            if(loai.equals("0")){
                JasperHelper.printReport("xls", reportFile, parameters, DataSourceUtils.getConnection(dataSourceKhamBenh), response);
            } else {
                JasperHelper.printReport("pdf", reportFile, parameters, DataSourceUtils.getConnection(dataSourceKhamBenh), response);
            }
        } catch (Exception ex) {

        }
    }

    @RequestMapping(value = "/kham-benh/indanhsachbenhnhantheottkham_theodonvi")
    public void indanhsachbenhnhantheottkham_theodonvi(@RequestParam(value = "tungay") String tungay
        , @RequestParam(value = "denngay") String denngay
        , @RequestParam(value = "dvtt") String dvtt
        , @RequestParam(value = "khoa") String khoa
        , @RequestParam(value = "tenkhoa") String tenkhoa
        , @RequestParam(value = "phongbenh") String phongbenh
        , @RequestParam(value = "tenphong") String tenphong
        , @RequestParam(value = "donvi") String donvi
        , @RequestParam(value = "loai") String loai
        , @RequestParam(value = "khamsk") String khamsk
        , @RequestParam(value = "hinhthuc") String hinhthuc
        , @RequestParam(value = "trangthai") String trangthai
        , HttpServletResponse response, HttpServletRequest request) {
        try {
//            String arr[] = url.split("```");
//            Thamsohethong tsht = (Thamsohethong) request.getSession().getAttribute("Sess_Thamso");
            String tenbenhvien = "";
            String tieude = "";
            String ngaythangnam = new SimpleDateFormat("yyyy-MM-dd").format(new java.util.Date());
            String arr_ngay[] = ngaythangnam.split("-");
            Map parameters = new HashMap();

            parameters.put("tungay", tungay);
            parameters.put("denngay", denngay);
            parameters.put("dvtt", dvtt);
            parameters.put("makhoa", khoa);

            String donviquanlytructiep = "SỞ Y TẾ ";

            parameters.put("tensoyte", donviquanlytructiep);
            parameters.put("tenbenhvien", tenbenhvien);
            parameters.put("tungaydenngay", tieude);
            parameters.put("ngay", arr_ngay[2]);
            parameters.put("thang", arr_ngay[1]);
            parameters.put("nam", arr_ngay[0]);
            parameters.put("nguoilapbaocao", "");
            parameters.put("hinhthucxem", hinhthuc);
            parameters.put("tenkhoa", tenkhoa);
            parameters.put("maphong", phongbenh);
            parameters.put("tenphong", tenphong);
            parameters.put("madonvi", donvi);
            parameters.put("kham_sk", khamsk);
            File reportFile;
            if (trangthai.equals("0")) {
                reportFile = new ClassPathResource("/jasper.baocao/rp_dsbnchuakham.jasper").getFile();
            } else if (trangthai.equals("1")) {
                reportFile = new ClassPathResource("/jasper.baocao/rp_dsbndangkham.jasper").getFile();
            } else {
                reportFile = new ClassPathResource("/jasper.baocao/rp_dsbnhoantatkham.jasper").getFile();
            }
            if(loai.equals("0")){
                JasperHelper.printReport("xls", reportFile, parameters, DataSourceUtils.getConnection(dataSourceKhamBenh), response);
            } else {
                JasperHelper.printReport("pdf", reportFile, parameters, DataSourceUtils.getConnection(dataSourceKhamBenh), response);
            }
        } catch (Exception ex) {
        }
    }

    @RequestMapping(value = {"/kham-benh/guismsnhaclich"}, method = {org.springframework.web.bind.annotation.RequestMethod.GET})
    @ResponseBody public String guismsuongsinhno(@RequestParam("maBenhNhan") String maBenhNhan,
                                                 @RequestParam("tenBenhNhan") String tenBenhNhan,
                                                 @RequestParam("soDienThoai") String soDienThoai,
                                                 @RequestParam("ngayTaiKham") String ngayTaiKham,
                                                 @RequestParam("tenBenhVien") String tenBenhVien) {
        String noidung = tenBenhVien+ ": Kính mời anh/chị " + tenBenhNhan + " đến tái khám ngày " + ngayTaiKham;
        String sdt = soDienThoai;
        khamBenhDao.updateSoDienThoai(maBenhNhan, soDienThoai);
        String rp = "-1";
        if (sdt == "") {
            return "-1";
        } else {
            String kt = sdt.substring(0, 1);
            if (kt.equals("0")) {
                sdt = "84" + sdt.substring(1);
            }
            String RequestId = "1adfa";
            String LabelID = "19885";
            String ContractTypeID = "1";
            String ContractID = "1670";
            String TemplateID = "76083";
            String[] Params = { noidung, "1" };
            String ScheduleTime = "";
            String MobileList = sdt;
            String IstelCosub = "0";
            String AgentID = "330";
            String APIUser = "BO-YTE-KM";
            String APIPass = "123456";
            String Username = "BO-YTE-KM";
            SendSMS sms = new SendSMS();
            rp = sms.sendByList(RequestId, LabelID, TemplateID, IstelCosub, ContractTypeID, ScheduleTime, MobileList, AgentID, APIUser, APIPass, Username, ContractID, Params);
            rp = rp.replaceAll("</RPLY>", "<SMS>"+noidung+"</SMS></RPLY>");
        }
        return rp;
    }
}
