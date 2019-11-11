package vn.vnpt.pwa.khambenh.controller.xetnghiem;

import com.zaxxer.hikari.HikariDataSource;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
//import jreport.report.util.JasperHelperMySQL;
import jreport.report.util.JasperHelperMySQL;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.DataSourceUtils;
import org.springframework.web.bind.annotation.*;
import vn.vnpt.pwa.khambenh.dao.KhambenhDAO;
import vn.vnpt.pwa.khambenh.dao.xetnghiem.XetNghiemDAO;
import vn.vnpt.pwa.khambenh.object.XetNghiemObj;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@RequestMapping("/api")
@Api(value = "XetNghiemController", description = "Xet nghiem controller")
public class XetNghiemController {
    @Autowired
    XetNghiemDAO xetNghiemDAO;
    @Autowired
    KhambenhDAO khambenhDAO;
    @Autowired
    HikariDataSource dataSource;

    @ApiOperation("Them chi dinh xet nghiem")
    @RequestMapping(value = "xet-nghiem/them-chidinh-xetnghiem", method = RequestMethod.POST)
    public @ResponseBody
    List themchidinh_xetnghiem(@RequestBody XetNghiemObj xetNghiemObj) {
        //XetnghiemObj xn = new XetnghiemObj();
        //Thamsohethong tsht = (Thamsohethong) session.getAttribute("Sess_Thamso");
        //xn.ngaychidinh = arr[3] + " " + new SimpleDateFormat("HH:mm:ss").format(new java.util.Date());

        xetNghiemObj.ngayChiDinh = xetNghiemObj.ngayChiDinh + " " + new SimpleDateFormat("HH:mm:ss").format(new Date());
        //String soPhieuXN = null;
        List sophieu = xetNghiemDAO.xetNghiemInsertBangCha(xetNghiemObj);
            /*if (tsht.KETNOIRABBITMQ.equals("1")) {
                try {
                    soPhieuXN = ((LinkedCaseInsensitiveMap) sophieu.get(0)).get("SO_PHIEU_XN").toString();
                    Map<String, Object> ketquathemphieu = (Map) sophieu.get(0);
                    if ((ketquathemphieu.get("SAISOT").toString()).equals("0")) {
                        Map thongtinbenhnhan = xetnghiemDAO.thongtinbenhnhan(xn.sovaovien, Integer.parseInt(xn.mabenhnhan));
                        PhieuXetNghiemObj phieuXetNghiem = new PhieuXetNghiemObj(Integer.parseInt(xn.mabenhnhan),
                            thongtinbenhnhan.get("TEN_BENH_NHAN") == null ? null : thongtinbenhnhan.get("TEN_BENH_NHAN").toString(),
                            xn.sovaovien, 0,
                            xn.capcuu.equals("0") ? false : true,
                            thongtinbenhnhan.get("TUOI") == null ? 0 : Integer.parseInt(thongtinbenhnhan.get("TUOI").toString()) ,
                            thongtinbenhnhan.get("GIOI_TINH") == null ? 0 : Integer.parseInt(thongtinbenhnhan.get("GIOI_TINH").toString()) ,
                            JODA_DATE_FORMAT.print(new DateTime(xn.ngaychidinh.replace(" ","T"))), 1,
                            ketquathemphieu.get("SO_PHIEU_XN") == null ? null : ketquathemphieu.get("SO_PHIEU_XN").toString(),
                            Integer.parseInt(ketquathemphieu.get("STT_HANGNGAY") == null ? "0" : ketquathemphieu.get("STT_HANGNGAY").toString()),
                            thongtinbenhnhan.get("DIA_CHI") == null ? null : thongtinbenhnhan.get("DIA_CHI").toString(), Integer.parseInt(xn.phongcd),
                            thongtinbenhnhan.get("ICD") == null ? null : thongtinbenhnhan.get("ICD").toString(), Integer.parseInt(xn.nguoichidinh),
                            xn.cobhyt.equals("0") ? false : true,
                            thongtinbenhnhan.get("SO_THE_BHYT") == null ? null : thongtinbenhnhan.get("SO_THE_BHYT").toString(),
                            session.getAttribute("Sess_PhongBan").toString(),
                            Integer.parseInt(xn.maphongxn == null ? "0" : (xn.maphongxn.equals("") ? "0" : xn.maphongxn)),
                            Integer.parseInt(dvtt)
                        );
                        Gson gson = new Gson();
                        String yourJsonString = gson.toJson(phieuXetNghiem);
                        producerService.produceMessage(dvtt,soPhieuXN,"themchidinh_xetnghiem",yourJsonString, "TAOPHIEUXN_EXCHANGE", "KEY_CREATE.@@.##.DR1");
                    }
                } catch (Exception ex) {
                    lichSuGuiDao.save(new LichSuGui("10.82.14.147",xn.dvtt,"themchidinh_xetnghiem" , "TAOPHIEUXN_EXCHANGE" , "KEY_CREATE.@@.##.DR1", soPhieuXN, "KHONG THE TAO MESSAGE", ex.getMessage() ));
                }
            }*/
            /*LichsusudungObj objls = new LichsusudungObj(xn.dvtt, "Thêm phiếu xét nghiệm " + sophieu,
                session.getAttribute("Sess_UserID").toString() + "-" + session.getAttribute("Sess_User"), "Thêm phiếu");
            LichsusudungDAO.them_lichsusudung(objls);*/
        return sophieu;
    }

    @ApiOperation("Lay danh sach chi dinh xet nghiem")
    @RequestMapping(value = "xet-nghiem//laydanhsach-xetnghiem", method = RequestMethod.POST)
    public @ResponseBody
    List laydanhsach_xetnghiem_svv(@RequestBody XetNghiemObj xetNghiemObj,
                                   @RequestParam(value = "phanLoaiGioiTinh", required = false, defaultValue = " ") String phan_loai_gioi_tinh
    ) {
        //XetnghiemObj xn = new XetnghiemObj();
        //Thamsohethong tsht = (Thamsohethong) session.getAttribute("Sess_Thamso");
        /*String[] arr = url.split("```");
        xn.bhytkhongchi = arr[0];
        xn.dvtt = tsht.matinh_khbv;
        xn.sophieuxn = arr[1];
        xn.chonbanggiacu_lienke = arr[2];
        xn.maphongxn = arr[3];
        xn.sovaovien = Integer.parseInt(arr[5]);*/
        if (phan_loai_gioi_tinh.equals("Nam")) {
            xetNghiemObj.phanTheoGioiTinh = "1";
        } else if (phan_loai_gioi_tinh.equals("Nữ")) {
            xetNghiemObj.phanTheoGioiTinh = "0";
        } else {
            xetNghiemObj.phanTheoGioiTinh = "-1";
        }
        //xn.bogia0dong = tsht.bogia0dongchidinhcls;
        return xetNghiemDAO.xetNghiemHienThiDSXetNghiem(xetNghiemObj);
    }

    @ApiOperation("Lay danh sach chi dinh xet nghiem da chon")
    @RequestMapping(value = "xet-nghiem/laydanhsach-xetnghiem-dachon", method = RequestMethod.POST)
    public @ResponseBody
    List laydanhsach_xetnghiem_dachon(@RequestBody XetNghiemObj xetNghiemObj) {
        /*XetnghiemObj xn = new XetnghiemObj();
        String[] arr = url.split("```");
        xn.bhytkhongchi = arr[0];
        xn.dvtt = arr[1];
        xn.sophieuxn = arr[2];*/
        return xetNghiemDAO.xetNghiemHienThiDSXetNghiemDaChon(xetNghiemObj);
    }

    @ApiOperation("Lay danh sach phieu chi dinh xet nghiem")
    @RequestMapping(value = "xet-nghiem/laydanhsach-phieuxetnghiem", method = RequestMethod.POST)
    public @ResponseBody
    List laydanhsach_phieuxetnghiem_svv(@RequestBody XetNghiemObj xetNghiemObj) {
        /*XetnghiemObj xn = new XetnghiemObj();
        Thamsohethong tsht = (Thamsohethong) session.getAttribute("Sess_Thamso");
        String[] arr = url.split("```");
        xn.makhambenh = arr[0];
        xn.dvtt = tsht.matinh_khbv;
        xn.ngaychidinh = arr[1];
        xn.sovaovien = Integer.parseInt(arr[2]);*/
        return xetNghiemDAO.xetNghiemHienThiPhieuXetNghiem(xetNghiemObj);
    }

    @ApiOperation("Xoa cac chi dinh xet nghiem")
    @RequestMapping(value = "xet-nghiem/xetnghiem-delete-cacchitiet", method = RequestMethod.POST)
    public @ResponseBody
    void xetnghiem_delete_cacchitiet_svv(@RequestBody XetNghiemObj xetNghiemObj) {
        /*Thamsohethong tsht = (Thamsohethong) session.getAttribute("Sess_Thamso");
        XetnghiemObj xn = new XetnghiemObj();
        xn.sophieuxn = sophieu;
        xn.sovaovien = Integer.parseInt(sovaovien);
        xn.dvtt = dvtt;
        xn.maxn_str = url;*/
        String maxn_daxoa = xetNghiemDAO.xetNghiemDeleteCacChiTiet(xetNghiemObj);

        /*if (tsht.KETNOIRABBITMQ.equals("1")) {
            try {
                if (maxn_daxoa != null) {
                    if (maxn_daxoa.length() > 6) {
                        maxn_daxoa = maxn_daxoa.substring(0, maxn_daxoa.length() - 7);
                        List<String> maxn_daxoa_array = Arrays.asList(maxn_daxoa.split("!!!!!!"));
                        List<Integer> List_maxn =maxn_daxoa_array.stream().map(Integer::parseInt).collect(Collectors.toList());
                        ChiDinhXetNghiemObj ChiDinhXetNghiem = new ChiDinhXetNghiemObj(xn.dvtt, xn.sovaovien, 0, xn.sophieuxn, List_maxn, false, 1);
                        Gson gson = new Gson();
                        String yourJsonString = gson.toJson(ChiDinhXetNghiem);
                        producerService.produceMessage(xn.dvtt,ChiDinhXetNghiem.getSoPhieu(),"xetnghiem_delete_cacchitiet_svv",yourJsonString, "XOACHIDINH_EXCHANGE", "KEY_DELETE.@@.##.DR1");
                    }
                }
            } catch (Exception ex) {
                lichSuGuiDao.save(new LichSuGui("10.82.14.147", xn.dvtt, "xetnghiem_delete_cacchitiet_svv" , "XOACHIDINH_EXCHANGE" , "KEY_DELETE.@@.##.DR1",  xn.sophieuxn, "KHONG THE TAO MESSAGE",ex.getMessage() ));
            }
        }*/
    }

    @ApiOperation("Update thong tin phieu xet nghiem")
    @RequestMapping(value = "xet-nghiem/xetnghiem-update-bangcha", method = RequestMethod.POST)
    public @ResponseBody
    void xetnghiem_update_bangcha_svv(@RequestBody XetNghiemObj xetNghiemObj) {
        /*XetnghiemObj xn = new XetnghiemObj();
        url = URLDecoder.decode(url, "UTF-8");
        String[] arr = url.split("```");
        xn.sovaovien = Integer.parseInt(arr[0]);
        xn.dvtt = arr[1];
        xn.sophieuxn = arr[2];
        xn.capcuu = arr[3];
        xn.makhambenh = arr[4];*/
        xetNghiemDAO.xetNghiemUpdateBangCha(xetNghiemObj);
    }

    @ApiOperation("Them cac chi dinh xet nghiem dong loat")
    @RequestMapping(value = "xet-nghiem/themchidinh-xnchitiet-dongloat", method = RequestMethod.POST)
    public @ResponseBody
    void themchidinh_xnchitiet_svv_dongloat_moi(
        @RequestBody XetNghiemObj xetNghiemObj,
        @RequestParam(value = "list_object_dichvu") String list_object_dichvu) throws ParseException {
        //Thamsohethong tsht = (Thamsohethong) session.getAttribute("Sess_Thamso");
        JSONArray jsonArr = new JSONArray(list_object_dichvu);
        List<String> ListMaDV = new ArrayList<String>();
        List<String> ListSLDV = new ArrayList<String>();
        List<String> ListGIA = new ArrayList<String>();
        List<String> ListTHANHTIEN = new ArrayList<String>();
        List<String> ListGIABH = new ArrayList<String>();
        List<String> ListGIAKBH = new ArrayList<String>();
        for (int i = 0; i < jsonArr.length(); i++) {
            JSONObject jsonObj = jsonArr.getJSONObject(i);
            ListMaDV.add(jsonObj.get("madv").toString());
            ListSLDV.add(jsonObj.get("sl").toString());
            ListGIA.add(jsonObj.get("giadv").toString());
            ListTHANHTIEN.add(jsonObj.get("thanhtien").toString());
            ListGIABH.add(jsonObj.get("giadv_bhyt").toString());
            ListGIAKBH.add(jsonObj.get("giadv_kbhyt").toString());
        }

        xetNghiemDAO.themChiDinhXNChiTietDongLoat(xetNghiemObj,
            ListMaDV, ListSLDV, ListGIA, ListTHANHTIEN, ListGIABH, ListGIAKBH);
        /*if (tsht.KETNOIRABBITMQ.equals("1")) {
            try {
                List<Integer> List_maxn = ListMaDV.stream().map(Integer::parseInt).collect(Collectors.toList());
                ChiDinhXetNghiemObj ChiDinhXetNghiem = new ChiDinhXetNghiemObj(dvtt, Integer.parseInt(arr_tong_insert.getString("sovaovien")),
                    0, arr_tong_insert.getString("sophieu"), List_maxn, true, 1);
                Gson gson = new Gson();
                String yourJsonString = gson.toJson(ChiDinhXetNghiem);
                producerService.produceMessage(dvtt, ChiDinhXetNghiem.getSoPhieu(), "themchidinh_xnchitiet_svv_dongloat_moi", yourJsonString, "THEMCHIDINH_EXCHANGE", "KEY_ADD.@@.##.DR1");
            } catch (Exception ex) {
                lichSuGuiDao.save(new LichSuGui("10.82.14.147", dvtt, "themchidinh_xnchitiet_svv_dongloat_moi", "THEMCHIDINH_EXCHANGE", "KEY_ADD.@@.##.DR1", arr_tong_insert.getString("sophieu"), "KHONG THE TAO MESSAGE", ex.getMessage()));
            }
        }*/
    }

    @ApiOperation("Xoa phieu chi dinh xet nghiem")
    @RequestMapping(value = "xet-nghiem/xoaphieu-xn", method = RequestMethod.POST)
    public @ResponseBody
    String xetNghiemDeleteBangCha(@RequestBody XetNghiemObj xetNghiemObj) {
/*
        xn.makhambenh = arr[0];
        xn.sophieuxn = arr[1];
        xn.sovaovien = Integer.parseInt(arr[2]);
        xn.dvtt = tsht.matinh_khbv;*/
        /*LichsusudungObj objls = new LichsusudungObj(xn.dvtt, "Xóa phiếu xét nghiệm " + xn.sophieuxn,
            session.getAttribute("Sess_UserID").toString() + "-" + session.getAttribute("Sess_User"), "Xóa phiếu");
        LichsusudungDAO.them_lichsusudung(objls);*/
        String SAISOT = xetNghiemDAO.xetNghiemDeleteBangCha(xetNghiemObj);
        /*if (tsht.KETNOIRABBITMQ.equals("1")) {
            try {
                if (SAISOT.equals("0")) {
                    PhieuXetNghiemObj phieuXetNghiem = new PhieuXetNghiemObj(
                        xn.sovaovien,
                        0,
                        1,
                        xn.sophieuxn,
                        Integer.parseInt(xn.dvtt)
                    );
                    Gson gson = new Gson();
                    String yourJsonString = gson.toJson(phieuXetNghiem);
                    producerService.produceMessage(xn.dvtt,phieuXetNghiem.getSoPhieu(),"xoaphieu_xn_svv", yourJsonString, "XOAPHIEUXN_EXCHANGE", "KEY_DELETEPHIEU.@@.##.DR1");

                }
            } catch (Exception ex) {
                lichSuGuiDao.save(new LichSuGui("10.82.14.147",xn.dvtt,"xoaphieu_xn_svv" , "XOAPHIEUXN_EXCHANGE" , "KEY_DELETEPHIEU.@@.##.DR1",  xn.sophieuxn,"KHONG THE TAO MESSAGE", ex.getMessage() ));

            }
        }*/

        return SAISOT;
    }
    @ApiOperation("In phieu xet nghiem")
    @RequestMapping(value = "xet-nghiem/inphieuxetnghiem", method = RequestMethod.GET)
    public @ResponseBody
    void inphieuxetnghiem(@RequestParam(value = "makb") String makb,
                          @RequestParam(value = "sovaovien") String sovaovien,
                          @RequestParam(value = "bhytkhongchi") String bhytkhongchi,
                          @RequestParam(value = "sophieuxn") String sophieuxn,
                          @RequestParam(value = "dvtt") String dvtt,
                          @RequestParam(value = "sophieu") String sophieu,
                          @RequestParam(value = "tt") String tt,
                          @RequestParam(value = "ttbhytchi") String ttbhytchi,
                          @RequestParam(value = "tinh") String tinh,
                          @RequestParam(value = "tenbenhvien") String tenbenhvien,
                          @RequestParam(value = "tendonviquanlytructiep") String tendonviquanlytructiep,
                          @RequestParam(value = "maphongbenh") String maphongbenh,
                          @RequestParam(value = "user") String user,
                          HttpServletResponse response
    ) {
        try {
            String capcuu = "";
            String khongcapcuu = "";
            /*if(!arr[6].equals("")){
                khongcapcuu= "X";
            }else {
                capcuu = "X";
            }*/
            try {
                sophieu = khambenhDAO.laysophieuthanhtoan(sovaovien, dvtt, "0");
            } catch (Exception ex) {
                try {
                    sophieu = khambenhDAO.laysophieuthanhtoan(sovaovien, dvtt, "1");
                } catch (Exception ex1) {
                    sophieu = "";
                }
            }
            //Thamsohethong tsht = (Thamsohethong) request.getSession().getAttribute("Sess_Thamso");
            Map parameters = new HashMap();
            String sql = " select SOVAOVIEN,ifnull(DIEUTRICHUYENKHOA,0) as DIEUTRICHUYENKHOA,ifnull(DOTDIEUTRIDAUTIEN,0) as DOTDIEUTRIDAUTIEN,NGAY_THANH_TOAN " +
                "from his_kb_ngt.kb_phieuthanhtoan  where SOPHIEUTHANHTOAN = ? and DVTT = ?";
            Map map_temp = khambenhDAO.queryForMap(sql, new Object[]{sophieu, dvtt});
            sovaovien = map_temp.get("SOVAOVIEN").toString();
            String dotdieutrichuyenkhoa = map_temp.get("DIEUTRICHUYENKHOA").toString();
            String ptt_dieutrichuyenkhoa = map_temp.get("DOTDIEUTRIDAUTIEN").toString();
            // List<Map<String, Object>> thongtin =
            // khambenhDAO.hienthibangin(dvtt, sophieu);
            String thamsolaythongtin_lenbaocao_bangb1 = "0";
            Map<String, Object> map = khambenhDAO.hienthibangin_GT(dvtt, sophieu, makb, ptt_dieutrichuyenkhoa,
                dotdieutrichuyenkhoa, sovaovien, "0", thamsolaythongtin_lenbaocao_bangb1);

            // List<Map<String, Object>> thongtin_ptt =
            // khambenhDAO.hienthibangin_ptt(dvtt, sophieu);
            Map<String, Object> map_ptt = khambenhDAO.hienthibangin_ptt_GT(dvtt, sophieu, makb, sovaovien);

            String chandoan_icd = "";
            // List<Map<String, Object>> thongtin_chandoan =
            // khambenhDAO.hienthibangin_chandoan(dvtt, sophieu);
            Map<String, Object> map_chandoan = khambenhDAO.hienthibangin_chandoan_GT(dvtt, sophieu, makb,
                ptt_dieutrichuyenkhoa, dotdieutrichuyenkhoa);
            if (!map_chandoan.isEmpty()) {
                String Chandoan = map_chandoan.get("chandoan").toString();
                String ICD = map_chandoan.get("ICD").toString();
                parameters.put("ICD", ICD);
                String chandoan_bacsi = map_chandoan.get("chandoanbacsi").toString();
                if (!chandoan_bacsi.trim().equals("")) {
                    Chandoan = chandoan_bacsi;
                }
                if (dvtt.equals("14020")) {
                    chandoan_icd = Chandoan;
                } else {
                    chandoan_icd = ICD + " - " + Chandoan;
                }
            }
            // List<Map<String, Object>> thongtin_khambenh =
            // khambenhDAO.hienthithongtinkhambenh(makb, dvtt);
            Map<String, Object> map_khambenh = khambenhDAO.hienthithongtinkhambenh(makb, dvtt);

            // List<Map<String, Object>> thongtin_phongban =
            // khambenhDAO.layphongban_tuphongbenh(maphongbenh);
            Map<String, Object> map_phongban = khambenhDAO.layphongban_tuphongbenh(maphongbenh);
            String tenphongban = map_phongban.get("TEN_PHONGBAN").toString();
            String tenphongbenh = map_phongban.get("TEN_PHONG_BENH").toString();
            // cháº©n Ä‘oÃ¡n
            String Sophieuthanhtoan = map_ptt.get("SOPHIEUTHANHTOAN").toString();
            String mabenhnhan = map.get("MA_BENH_NHAN").toString();
            String hotenbenhnhan = map.get("TEN_BENH_NHAN").toString();
            String ngaysinh = map.get("NGAY_SINH").toString();
            String ngaytiepnhan = map.get("THOI_GIAN_TIEP_NHAN").toString();
            // TGG - Thanh - 2/7/2017 - Tinh lai truong tuoiht theo cong thuc
            // khac
            // begin
            String sqlCallFuncTuoiHienThi = "select his_bhxh.hienthi_tuoi_benhnhan_2_2(?,?) from dual";
            String tuoiht = khambenhDAO.queryForString(sqlCallFuncTuoiHienThi, new Object[]{ngaysinh, ngaytiepnhan});
            // end
            String[] arr_ns = ngaysinh.split("-");
            String namsinh = arr_ns[0];
            String diachi = map.get("DIA_CHI").toString();
            // tháº» bhyt
            String cannang = map.get("CANNANG") + "";
            String manoidangky = "";
            String tennoikcbbandau = "";
            String noikcbbandau = "";
            String the = map.get("SO_THE_BHYT").toString();
            String tungaystr = map.get("NGAY_BATDAU").toString();
            String denngaystr = map.get("NGAY_HETHAN").toString();


            manoidangky = map.get("NOIDANGKY_KCB").toString();
            String soCMT = map.get("CMTND").toString();
            if (!the.trim().equals("")) {
                String sql_ntn = "select ifnull(TEN_NOITIEPNHAN,'')from his_dm.dm_noi_tiep_nhan where MA_NOITIEPNHAN=?";
                tennoikcbbandau = khambenhDAO.queryForString(sql_ntn, new Object[]{manoidangky});
                noikcbbandau = manoidangky + " - " + tennoikcbbandau;
            }
            // String manoikcbbandau = map.get("NOIDANGKY_KCB").toString();
            // String sql_ntn = "select TEN_NOITIEPNHAN from
            // his_public_list.dm_noi_tiep_nhan where MA_NOITIEPNHAN=?";
            // String tennoikcbbandau = khambenhDAO.queryForString(sql_ntn, new
            // Object[]{manoikcbbandau});
            // String noikcbbandau = manoikcbbandau + " - " + tennoikcbbandau;
            String mathe_2kytudau;
            String mathe_kythu3;
            String mathekytu_45;
            String mathe_67;
            String mathe_8910;
            String mathe_5kytucuoi;
            if (the.trim().equals("") || bhytkhongchi.equals("1")) {
                mathe_2kytudau = "";
                mathe_kythu3 = "";
                mathekytu_45 = "";
                mathe_67 = "";
                mathe_8910 = "";
                mathe_5kytucuoi = "";
            } else {
                mathe_2kytudau = the.substring(0, 2);
                mathe_kythu3 = the.substring(2, 3);
                mathekytu_45 = the.substring(3, 5);
                mathe_67 = the.substring(5, 7);
                mathe_8910 = the.substring(7, 10);
                mathe_5kytucuoi = the.substring(10, 15);
            }
            // hậu giang lấy số bhyt cho phiếu tổng TGGDEV-30363
            String hienthibhyt_all = "0";//thamsodonviDAO.laythamso_donvi_motthamso(dvtt, "93143");
            if (hienthibhyt_all.equals("1") && tt.equals("1")) {
                mathe_2kytudau = the.substring(0, 2);
                mathe_kythu3 = the.substring(2, 3);
                mathekytu_45 = the.substring(3, 5);
                mathe_67 = the.substring(5, 7);
                mathe_8910 = the.substring(7, 10);
                mathe_5kytucuoi = the.substring(10, 15);
            }
            /// thÃ´ng tin máº¡ch huyáº¿t Ã¡p
            // String cannang = map_khambenh.get("CANNANG") +"";
            String trieuchungls = map_khambenh.get("TRIEUCHUNGLS") == null ? ""
                : map_khambenh.get("TRIEUCHUNGLS").toString();
            String mach = map_khambenh.get("MACH") == null ? "" : map_khambenh.get("MACH").toString();
            String huyetapcao = map_khambenh.get("HUYETAPCAO") == null ? "" : map_khambenh.get("HUYETAPCAO").toString();
            String huyetapthap = map_khambenh.get("HUYETAPTHAP") == null ? ""
                : map_khambenh.get("HUYETAPTHAP").toString();
            String thannhiet = map_khambenh.get("NHIETDO") == null ? "" : map_khambenh.get("NHIETDO").toString();
            sql = "select ifnull(BAC_SI_DIEU_TRI,0) as BAC_SI_DIEU_TRI, ifnull(NGUOI_CHI_DINH,0) as NGUOI_CHI_DINH, DATE_FORMAT(NGAY_TAO, '%Y-%m-%d') as NGAY_TAO,ifnull(STT_HANGNGAY,0) as stt_hangngay, DATE_FORMAT(NGAY_CHI_DINH, '%m/%d/%Y %H:%i:%s') as tgchidinh from his_cls.KB_CD_XET_NGHIEM where DVTT=? and SO_PHIEU_XN=?";
            Map map_tt = khambenhDAO.queryForMap(sql, new Object[]{dvtt, sophieuxn});
            String tgchidinh = map_tt.get("tgchidinh").toString();
            parameters.put("tgchidinh", tgchidinh);
            String ngayin = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss").format(new java.util.Date());
            parameters.put("ngayin", ngayin);
            String ngaykham_tk = map_tt.get("NGAY_TAO").toString();
            String[] arr_nk = ngaykham_tk.split("-");
            String ngaylapbangke = arr_nk[2];
            String thanglapbangke = arr_nk[1];
            String namlapbangke = arr_nk[0];
            String nam = (Boolean.parseBoolean(map.get("GIOI_TINH").toString()) == true) ? "x" : "";
            String gioitinh = (Boolean.parseBoolean(map.get("GIOI_TINH").toString()) == true) ? "Nam" : "Nữ";
            String nu = (Boolean.parseBoolean(map.get("GIOI_TINH").toString()) == false) ? "x" : "";
            String mabacsi = "";
            String khongintenbacsitrenphieucls = "0";
            if (khongintenbacsitrenphieucls.equals("0")) {
                mabacsi = map_tt.get("BAC_SI_DIEU_TRI").toString();
            } else {
                mabacsi = "";
            }
            String tenbacsi = "";
            if (!mabacsi.equals("")) {
                try {
                    tenbacsi = khambenhDAO.layhotenbacsi(mabacsi, dvtt);
                } catch (Exception e) {
                    tenbacsi = "";
                }
            }
            String nguoichidinh = "";
            try {
                khambenhDAO.layhotenbacsi(map_tt.get("NGUOI_CHI_DINH").toString(), dvtt);
            }catch (Exception e){
                nguoichidinh = "";
            }
            String stt_hangngay = map_tt.get("stt_hangngay").toString();
            String SID = "";
            SID = arr_nk[2] + arr_nk[1] + stt_hangngay;
            String lay_sid_bo_so_0 = "0";//thamsodonviDAO.laythamso_donvi_motthamso(dvtt, "92008");
            if (lay_sid_bo_so_0.equals("1")) {
                if (arr_nk[2].startsWith("0")) {
                    SID = arr_nk[2].substring(1, 2) + arr_nk[1] + stt_hangngay;
                }
            }
            // bugfix VNPTHIS-7353 lấy triệu chứng lâm sàng thay cho ICD chẩn đoán (nếu chưa chẩn đoán)
            String themtrieuchungls = "0";//thamsodonviDAO.laythamso_donvi_motthamso(dvtt, "94315");
            if (themtrieuchungls.equals("1") && (map_chandoan.get("ICD").toString().equals("") || map_chandoan.get("ICD").toString().equals(" "))) {
                chandoan_icd = trieuchungls;
            }
            // end bugfix VNPTHIS-7353 lấy triệu chứng lâm sàng thay cho ICD chẩn đoán (nếu chưa chẩn đoán)
            int sausotruoc = Sophieuthanhtoan.length();
            int vitrigach = sausotruoc - 5;
            int vitrinam = sausotruoc - 2;
            String chisonam = Sophieuthanhtoan.substring(vitrinam);
            String sothutuso = Sophieuthanhtoan.substring(0, vitrigach);
            String sothutu6so = "";
            switch (sothutuso.length()) {
                case 1: {
                    String chuoinoi = "00000";
                    sothutu6so = chuoinoi.concat(sothutuso);
                    break;
                }
                case 2: {
                    String chuoinoi = "0000";
                    sothutu6so = chuoinoi.concat(sothutuso);
                    break;
                }
                case 3: {
                    String chuoinoi = "000";
                    sothutu6so = chuoinoi.concat(sothutuso);
                    break;
                }
                case 4: {
                    String chuoinoi = "00";
                    sothutu6so = chuoinoi.concat(sothutuso);
                    break;
                }
                case 5: {
                    String chuoinoi = "0";
                    sothutu6so = chuoinoi.concat(sothutuso);
                    break;
                }
                case 6:
                    sothutu6so = sothutuso;
                    break;
                default:
                    break;
            }
            String chuoithucte = chisonam.concat(sothutu6so);
            parameters.put("trieuchungls", trieuchungls);
            parameters.put("sohoso", chuoithucte);
            parameters.put("tenbenhvien", tenbenhvien.toUpperCase());
            parameters.put("tenkhoakham", tenphongban);
            parameters.put("tenphongkham", tenphongbenh);
            parameters.put("hovaten", hotenbenhnhan);
            parameters.put("namsinh", namsinh);
            parameters.put("diachi", diachi);
            parameters.put("mach", mach);
            parameters.put("huyetap_tren", huyetapcao);
            parameters.put("huyetap_duoi", huyetapthap);
            parameters.put("thannhiet", thannhiet);
            String sql1 = "SELECT  group_concat(ifnull(ct.ghichu_chidinh,'') SEPARATOR ' ' )  " +
                "FROM his_cls.KB_CD_XET_NGHIEM_CHI_TIET ct  WHERE ct.dvtt = ? and ct.SO_PHIEU_XN = ?";
            String ghichuchidinh = khambenhDAO.queryForString(sql1, new Object[]{dvtt, sophieuxn});
            parameters.put("ghichuchidinh", ghichuchidinh);
            // parameters.put("cannang", cannang);
            // parameters.put("thangtuoi", thangtuoi);
            // parameters.put("canlamsang", ""); /////////////////------------
            parameters.put("chandoan", chandoan_icd);
            parameters.put("sophieu", Sophieuthanhtoan);
            parameters.put("ngay", ngaylapbangke);
            parameters.put("thang", thanglapbangke);
            parameters.put("nam", namlapbangke);
            parameters.put("bacsidieutri", tenbacsi);
            parameters.put("nguoichidinh", nguoichidinh);
            parameters.put("sovaovien", sovaovien);
            parameters.put("capcuu", capcuu);
            parameters.put("khongcapcuu", khongcapcuu);
            parameters.put("tungaystr", tungaystr);
            parameters.put("denngaystr", denngaystr);
            parameters.put("masonguoibenh", mabenhnhan);
            parameters.put("mathe_2kytudau", mathe_2kytudau);
            parameters.put("mathe_kythu3", mathe_kythu3);
            parameters.put("the45", mathekytu_45);
            parameters.put("the67", mathe_67);
            parameters.put("the8910", mathe_8910);
            parameters.put("mathe_5kytucuoi", mathe_5kytucuoi);
            parameters.put("dvtt", dvtt);
            parameters.put("bhytkhongchi", bhytkhongchi);
            parameters.put("sophieuxn", sophieuxn);
            parameters.put("gioitinh_nam", nam);
            parameters.put("gioitinh_nu", nu);
            parameters.put("makhambenh", makb);
            parameters.put("noikcbbandau", noikcbbandau);
            parameters.put("SID", SID);
            parameters.put("ngaychidinh", ngaykham_tk);
            parameters.put("idtiepnhan", makb.replaceFirst("kb_", ""));
            parameters.put("mabenhnhan", mabenhnhan);
            parameters.put("thutiennhieunac", "0");
            parameters.put("nguoiin", user);
            String path = "/jasper.xetnghiem/logo_pksannhi.jpg";
            File file_hinhanh = new ClassPathResource(path).getFile();
            String path_hinhanh = file_hinhanh.getPath();
            parameters.put("hinhanh", path_hinhanh);
            String tieudequanly = tendonviquanlytructiep;
            if (tieudequanly.equals("")) {
                tieudequanly = "Sở Y Tế " + tinh;
            }
            parameters.put("soytetg", tieudequanly);
            if (dvtt.equals("31020")) {
                parameters.put("bacsi", "Bác sĩ");
            } else {
                parameters.put("bacsi", "Bác sĩ điều trị");
            }
            File reportFile;
            // String tuoiht = map.get("TUOI_HT").toString();
            parameters.put("tuoiht", tuoiht);

            parameters.put("stt_dotdieutri", "0");
            //String sub1 = new ClassPathResource("/jasper/xetnghiem/cls_phieukhamgdvchuyenkhoalamsang_sub1_xn.jasper").getFile().getPath();
            //String sub2 = new ClassPathResource("/jasper/xetnghiem/cls_phieukhamgdvchuyenkhoalamsang_sub_xn.jasper").getFile().getPath();
            //parameters.put("sub1", sub1);
            //parameters.put("sub2", sub2);
            parameters.put("gioitinh", gioitinh);
            parameters.put("tentrungtam", tenbenhvien + " " +tinh);
            parameters.put("CMTND", soCMT);
            //String SubDir = new File(request.getSession().getServletContext().getRealPath("/WEB-INF/pages/haugiang/xetnghiem/")).getPath();
            //parameters.put("SubDir", SubDir);
            /*String reportFile1 = "";
            String reportFile2 = "";
            String reportFile3 = "";
            String reportFile4 = "";*/
            /*if (dvtt.equals("12001")) {
                reportFile1 = new File(request.getSession().getServletContext().getRealPath("/jasper/xetnghiem/cls_phieuchidinhxn_huyethoc.jasper")).getPath();
                reportFile2 = new File(request.getSession().getServletContext().getRealPath("/jasper/xetnghiem/cls_phieuchidinhxn_sinhhoa.jasper")).getPath();
                reportFile3 = new File(request.getSession().getServletContext().getRealPath("/jasper/xetnghiem/cls_phieuchidinhxn_nuoctieu.jasper")).getPath();
                reportFile4 = new File(request.getSession().getServletContext().getRealPath("/jasper/xetnghiem/cls_phieuchidinhxn_benhpham.jasper")).getPath();
            }
            parameters.put("sub1", reportFile1);
            parameters.put("sub2", reportFile2);
            parameters.put("sub3", reportFile3);
            parameters.put("sub4", reportFile4);*/
            // //Begin - An Giang - Huỳnh Bảo Khánh - điều chỉnh ngày 13/12/2016
            if (tt.equals("0")) {
                // --Lấy đường dẫn report, nếu không có dùng report mặc định
                String pathFile = "/jasper.xetnghiem/cls_phieuchidinhxn.jasper";
                reportFile = new ClassPathResource(pathFile).getFile();
                //reportFile = new File(request.getSession().getServletContext().getRealPath("/jasper/xetnghiem/cls_phieuchidinhxn.jasper"));
            } else {
                // --Lấy đường dẫn report, nếu không có dùng report mặc định
                String pathFile = "/jasper.xetnghiem/cls_phieuchidinhxn_all.jasper";
                reportFile = new ClassPathResource(pathFile).getFile();
            }

            // End - An Giang
            String fileName = reportFile.getPath();
            System.out.println(fileName);
            // String fileName = reportFile.getPath();
            // JasperPrint print = JasperFillManager.fillReport(fileName,
            // parameters, DataSourceUtils.getConnection(dataSourceMNG));
            // String path =
            // request.getSession().getServletContext().getRealPath("/WEB-INF/store_files/");
            //String taibaocaovemay = thamsodonviDAO.laythamso_donvi_motthamso(dvtt, "226");
            JasperHelperMySQL.printReport("pdf", reportFile, parameters, DataSourceUtils.getConnection(dataSource),
                response);
        } catch (Exception e) {

        }
    }
}
