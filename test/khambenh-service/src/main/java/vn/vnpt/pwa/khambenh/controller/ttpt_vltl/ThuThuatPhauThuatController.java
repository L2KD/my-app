package vn.vnpt.pwa.khambenh.controller.ttpt_vltl;

import com.zaxxer.hikari.HikariDataSource;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import jreport.report.util.JasperHelperMySQL;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.DataSourceUtils;
import org.springframework.web.bind.annotation.*;
import vn.vnpt.pwa.khambenh.dao.KhambenhDAO;
import vn.vnpt.pwa.khambenh.dao.ttpt_vltl.ThuThuatPhauThuatDAO;
import vn.vnpt.pwa.khambenh.object.TTPT_VLTLObj;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@Api(value = "XetNghiemController", description = "Thu thuat phau thuat controller")
public class ThuThuatPhauThuatController {
    @Autowired
    ThuThuatPhauThuatDAO thuThuatPhauThuatDAO;
    @Autowired
    HikariDataSource dataSource;
    @Autowired
    KhambenhDAO khambenhDAO;
    @ApiOperation("Them chi dinh thu thuat phau thuat bang cha")
    @RequestMapping(value = "kham-benh/them-chi-dinh-ttpt", method = RequestMethod.POST)
    public @ResponseBody
    List themchidinh_ttpt(@RequestBody TTPT_VLTLObj ttptVltlObj) {
        /*TTPTObj ttpt = new TTPTObj();
        Thamsohethong tsht = (Thamsohethong) session.getAttribute("Sess_Thamso");
        String dvtt = session.getAttribute("Sess_DVTT").toString();
        String[] arr = url.split("```");
        ttpt.makhambenh = arr[0];
        ttpt.maphongdv = arr[1];
        ttpt.dvtt = session.getAttribute("Sess_DVTT").toString();
        ttpt.maloaidv = arr[2];
        ttpt.bacsidieutri = session.getAttribute("Sess_UserID").toString();
        ttpt.phongchidinh = session.getAttribute("Sess_Phong").toString();
        ttpt.cobhyt = arr[3];
        ttpt.chuyenkhoa = arr[4];
        ttpt.chitietchuyenkhoa = arr[5];
        ttpt.nguoichidinh = session.getAttribute("Sess_UserID").toString();*/
        ttptVltlObj.ngayChiDinh = ttptVltlObj.ngayChiDinh + " " + new SimpleDateFormat("HH:mm:ss").format(new java.util.Date());
        /*ttpt.mabenhnhan = arr[7];
        ttpt.sovaovien = Integer.parseInt(arr[8]);
        ttpt.capcuu = arr[9];
        ttpt.giamdinhvien = arr[10];
        if (dvtt.equals("87128")) {
            ttpt.bacsidieutri = arr[11];
            List sophieu = thuThuatPhauThuatDAO .ttpt_insert_bangcha(ttpt);
            LichsusudungObj objls = new LichsusudungObj(ttpt.dvtt, "Thêm phiếu thủ thuật phẫu thuật " + sophieu, session.getAttribute("Sess_UserID").toString() + "-" + session.getAttribute("Sess_User"), "Thêm phiếu");
            LichsusudungDAO.them_lichsusudung(objls);
            return sophieu;
        } else {
            List sophieu = thuThuatPhauThuatDAO .ttpt_insert_bangcha(ttpt);
            LichsusudungObj objls = new LichsusudungObj(ttpt.dvtt, "Thêm phiếu thủ thuật phẫu thuật " + sophieu, session.getAttribute("Sess_UserID").toString() + "-" + session.getAttribute("Sess_User"), "Thêm phiếu");
            LichsusudungDAO.them_lichsusudung(objls);
            return sophieu;
        }*/
        return thuThuatPhauThuatDAO.ttptInsertBangCha(ttptVltlObj);
    }

    @ApiOperation("Lay danh sach thu thuat phau thuat")
    @RequestMapping(value = "kham-benh/lay-danh-sach-ttpt-svv", method = RequestMethod.POST)
    public @ResponseBody
    List laydanhsach_dichvu_svv(@RequestBody TTPT_VLTLObj ttptVltlObj,
                                @RequestParam(value = "phanLoaiGioiTinh", required = false, defaultValue = " ") String phanLoaiGioiTinh) {
        /*TTPTObj ttpt = new TTPTObj();
        Thamsohethong tsht = (Thamsohethong) session.getAttribute("Sess_Thamso");
        String[] arr = url.split("```");
        ttpt.bhyt_khongchi = arr[0];
        ttpt.dvtt = session.getAttribute("Sess_DVTT").toString();
        ttpt.sophieu = arr[1];
        ttpt.maloaidv = arr[2];
        ttpt.chuyenkhoa = arr[3];
        ttpt.chitietchuyenkhoa = arr[4];
        ttpt.chonbanggiacu_lienke = arr[5];
        ttpt.sovaovien = Integer.parseInt(arr[6]);*/
        if (phanLoaiGioiTinh.equals("Nam")) {
            ttptVltlObj.phanTheoGioiTinh = "1";
        } else if (phanLoaiGioiTinh.equals("Nữ")) {
            ttptVltlObj.phanTheoGioiTinh = "0";
        } else {
            ttptVltlObj.phanTheoGioiTinh = "-1";
        }
        /*ttpt.loaibogia0dong = tsht.bogia0dongchidinhcls;*/
        //System.out.println(ttpt.bhyt_khongchi+ttpt.dvtt+ttpt.sophieu+ttpt.chuyenkhoa+ttpt.chitietchuyenkhoa);
        return thuThuatPhauThuatDAO.ttptHienThiDSDichVu(ttptVltlObj);
    }

    @ApiOperation("Lay danh sach loai thu thuat phau thuat")
    @RequestMapping(value = "kham-benh/lay-danh-sach-loai-ttpt-svv", method = RequestMethod.GET)
    public @ResponseBody
    List laydanhsach_dichvu_svv(@RequestParam(value = "dvtt") String dvtt) {
        return thuThuatPhauThuatDAO.ttptHienThiDSLoaiDichVu(dvtt);
    }

    @ApiOperation("Lay danh sach phieu chi dinh dich vu")
    @RequestMapping(value = "kham-benh/lay-danh-sach-phieu-dich-vu-svv", method = RequestMethod.POST)
    public @ResponseBody
    List laydanhsach_phieudichvu_svv(@RequestBody TTPT_VLTLObj ttptVltlObj ) {
        /*TTPTObj ttpt = new TTPTObj();
        Thamsohethong tsht = (Thamsohethong) session.getAttribute("Sess_Thamso");
        String[] arr = url.split("```");
        ttpt.makhambenh = arr[0];
        ttpt.dvtt = session.getAttribute("Sess_DVTT").toString();
        ttpt.ngaychidinh = arr[1];
        ttpt.sovaovien = Integer.parseInt(arr[2]);*/

        return thuThuatPhauThuatDAO.ttptHienThiDSPhieu(ttptVltlObj);
    }

    @ApiOperation("Lay danh sach thu thuat phau thuat da chon")
    @RequestMapping(value = "kham-benh/lay-danh-sach-ttpt-dachon", method = RequestMethod.POST)
    public @ResponseBody
    List laydanhsach_cdha_dachon(@RequestBody TTPT_VLTLObj ttptVltlObj ) {
        /*TTPTObj ttpt = new TTPTObj();
        String[] arr = url.split("```");
        ttpt.bhyt_khongchi = arr[0];
        ttpt.dvtt = arr[1];
        ttpt.sophieu = arr[2];
        ttpt.maloaidv = arr[3];
        ttpt.chuyenkhoa = arr[4];
        ttpt.chitietchuyenkhoa = arr[5];*/
        return thuThuatPhauThuatDAO .ttptHienThiDSDichVuDaChon(ttptVltlObj);
    }

    @ApiOperation("Xoa chi tiet thu thuat phau thuat")
    @RequestMapping(value = "kham-benh/ttpt-delete-cac-chi-tiet-svv",method = RequestMethod.POST)
    public @ResponseBody
    void ttpt_delete_cacchitiet(@RequestBody TTPT_VLTLObj ttptVltlObj) throws UnsupportedEncodingException {
        /*url = URLDecoder.decode(url, "UTF-8");
        String[] arr_cls = url.split("```");
        for (String s : arr_cls) {
            TTPTObj ttpt = new TTPTObj();
            ttpt.sophieu = sophieu;
            ttpt.madv_str = s;
            ttpt.dvtt = dvtt;
            ttpt.sovaovien = Integer.parseInt(sovaovien);
            thuThuatPhauThuatDAO .ttpt_delete_cacchitiet_svv(ttptVltlObj);
        }*/
        thuThuatPhauThuatDAO.ttptDeleteCacChiTiet(ttptVltlObj);
    }

    @ApiOperation("Update thong tin phieu cha")
    @RequestMapping(value = "kham_benh/ttpt-update-bang-cha-svv",method = RequestMethod.POST)
    public @ResponseBody
    void ttpt_update_bangcha_svv(@RequestBody TTPT_VLTLObj ttptVltlObj) throws UnsupportedEncodingException {
        /*TTPTObj ttpt = new TTPTObj();
        url = URLDecoder.decode(url, "UTF-8");
        String[] arr = url.split("```");
        ttpt.sovaovien = Integer.parseInt(arr[0]);
        ttpt.sophieu = arr[2];
        ttpt.dvtt = arr[1];
        ttpt.capcuu = arr[3];
        ttpt.makhambenh = arr[4];*/
        thuThuatPhauThuatDAO .ttptUpdateBangCha(ttptVltlObj);
    }

    @ApiOperation("Them chi dinh ttpt chi tiet dong loat")
    @RequestMapping(value = "kham-benh/them-chi-dinh-ttpt-chi-tiet-svv-dong-loat-moi",method = RequestMethod.POST)
    public @ResponseBody
    void themchidinh_ttptchitiet_svv_dongloat_moi(
        @RequestBody TTPT_VLTLObj ttptVltlObj,
        @RequestParam(value = "list_object_dichvu") String list_object_dichvu ) throws ParseException {
       // Thamsohethong tsht = (Thamsohethong) session.getAttribute("Sess_Thamso");
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

        thuThuatPhauThuatDAO.themChiDinhTtptChiTietDongLoat(ttptVltlObj,
            ListMaDV, ListSLDV, ListGIA, ListTHANHTIEN, ListGIABH, ListGIAKBH);
    }

    @ApiOperation("Xoa phieu thu thuat phau thuat")
    @RequestMapping(value = "kham-benh/xoa-phieu-ttpt-svv",method = RequestMethod.POST)
    public @ResponseBody
    String xoaphieu_ttpt_svv(@RequestBody TTPT_VLTLObj ttptVltlObj ) {
        /*TTPTObj ttpt = new TTPTObj();
        Thamsohethong tsht = (Thamsohethong) session.getAttribute("Sess_Thamso");
        String[] arr = url.split("```");
        ttpt.makhambenh = arr[0];
        ttpt.sophieu = arr[1];
        ttpt.dvtt = session.getAttribute("Sess_DVTT").toString();
        ttpt.sovaovien = Integer.parseInt(arr[2]);
        LichsusudungObj objls = new LichsusudungObj(ttpt.dvtt, "Xóa phiếu thủ thuật phẫu thuật " + ttpt.sophieu, session.getAttribute("Sess_UserID").toString() + "-" + session.getAttribute("Sess_User"), "Xóa phiếu");
        LichsusudungDAO.them_lichsusudung(objls);*/
        return thuThuatPhauThuatDAO .ttptDeleteBangCha(ttptVltlObj);
    }

    @ApiOperation("In phieu thu thuat phau thuat")
    @RequestMapping(value = "ttpt/inphieuttpt", method = RequestMethod.GET)
    public @ResponseBody
    void inphieuttpt(@RequestParam(value = "makb") String makb,
                     @RequestParam(value = "sovaovien") String sovaovien,
                     @RequestParam(value = "maloai") String maloai,
                     @RequestParam(value = "machuyenkhoa") String machuyenkhoa,
                     @RequestParam(value = "machitietchuyenkhoa") String machitietchuyenkhoa,
                     @RequestParam(value = "bhytkhongchi") String bhytkhongchi,
                     @RequestParam(value = "sophieuttpt") String sophieuttpt,
                     @RequestParam(value = "dvtt") String dvtt,
                     @RequestParam(value = "sophieu") String sophieu,
                     @RequestParam(value = "tt") String tt,
                     @RequestParam(value = "ttbhytchi") String ttbhytchi,
                     @RequestParam(value = "tinh") String tinh,
                     @RequestParam(value = "tenbenhvien") String tenbenhvien,
                     @RequestParam(value = "tendonviquanlytructiep") String tendonviquanlytructiep,
                     @RequestParam(value = "noitru", required = false, defaultValue = "0") String noitru,
                     @RequestParam(value = "maphongbenh") String maphongbenh,
                     @RequestParam(value = "user") String user,
                     HttpServletResponse response) throws Exception {

        //Thamsohethong tsht = (Thamsohethong) request.getSession().getAttribute("Sess_Thamso");
        Map<String, Object> map_phongban = khambenhDAO.layphongban_tuphongbenh(maphongbenh);
        String tenphongban = map_phongban.get("TEN_PHONGBAN").toString();
        String tenphongbenh = map_phongban.get("TEN_PHONG_BENH").toString();
//        String maphongbenh = request.getSession().getAttribute("Sess_Phong").toString();
//        String tenphongbenh = request.getSession().getAttribute("Sess_TenPhong").toString();
        Map parameters = new HashMap();
        try {
            sophieu = khambenhDAO.laysophieuthanhtoan(sovaovien, dvtt, "0");
        } catch (Exception ex) {
            try {
                sophieu = khambenhDAO.laysophieuthanhtoan(sovaovien, dvtt, "1");
            } catch (Exception ex1) {
                sophieu = "";
            }
        }
        String sql = " select SOVAOVIEN,ifnull(DIEUTRICHUYENKHOA,0) as DIEUTRICHUYENKHOA,ifnull(DOTDIEUTRIDAUTIEN,0) as DOTDIEUTRIDAUTIEN,NGAY_THANH_TOAN " +
            "from his_kb_ngt.kb_phieuthanhtoan  where SOPHIEUTHANHTOAN = ? and DVTT = ?";
        Map map_temp = khambenhDAO.queryForMap(sql, new Object[]{sophieu, dvtt});
//        String sovaovien = map_temp.get("sovaovien").toString();
        String dotdieutrichuyenkhoa = map_temp.get("DIEUTRICHUYENKHOA").toString();
        String ptt_dieutrichuyenkhoa = map_temp.get("DOTDIEUTRIDAUTIEN").toString();
        Map<String, Object> map = khambenhDAO.hienthibangin_GT(dvtt, sophieu, makb, ptt_dieutrichuyenkhoa, dotdieutrichuyenkhoa, sovaovien, "0","0");
        //List<Map<String, Object>> thongtin_phongban = khambenhDAO.layphongban_tuphongbenh(maphongbenh);
//        Map<String, Object> map_phongban = khambenhDAO.layphongban_tuphongbenh(maphongbenh);
        // chẩn đoán
        Map<String, Object> map_chandoan = khambenhDAO.hienthibangin_chandoan_GT(dvtt, sophieu, makb, ptt_dieutrichuyenkhoa, dotdieutrichuyenkhoa);
        //List<Map<String, Object>> thongtin_chandoan = khambenhDAO.hienthibangin_chandoan(makb, request.getSession().getAttribute("Sess_DVTT").toString().toString());
        String chandoan = " ";
        if (!map_chandoan.isEmpty()) {
            //Map<String, Object> map_chandoan = thongtin_chandoan.get(0);
            String ICD = map_chandoan.get("ICD").toString();
            String Chandoan = map_chandoan.get("chandoan").toString();
            String chandoan_bacsi = map_chandoan.get("chandoanbacsi").toString();
            if (!chandoan_bacsi.trim().equals("")) {
                Chandoan = chandoan_bacsi;
            }
            chandoan = ICD + " - " + Chandoan;
        }

        /// map bảng kê vào
        String tenkhoakham = map_phongban.get("ten_phongban").toString();
        String makhambenh = map.get("MA_KHAM_BENH").toString();
        String hotenbenhnhan = map.get("TEN_BENH_NHAN").toString();
        String tuoi = map.get("TUOI_HT").toString();
        String diachi = map.get("DIA_CHI").toString();
        String thangtuoi = map.get("THANG") + "";
        String cannang = map.get("CANNANG") + "";
        String nam = (Boolean.parseBoolean(map.get("GIOI_TINH").toString()) == true) ? "x" : "";
        String nu = (Boolean.parseBoolean(map.get("GIOI_TINH").toString()) == false) ? "x" : "";

        Map<String, Object> map_khambenh = khambenhDAO.hienthithongtinkhambenh(makb, dvtt);
        String mach = map_khambenh.get("MACH") == null ? "" : map_khambenh.get("MACH").toString();
        String huyetapcao = map_khambenh.get("HUYETAPCAO") == null ? "" : map_khambenh.get("HUYETAPCAO").toString();
        String huyetapthap = map_khambenh.get("HUYETAPTHAP") == null ? ""
            : map_khambenh.get("HUYETAPTHAP").toString();
        String thannhiet = map_khambenh.get("NHIETDO") == null ? "" : map_khambenh.get("NHIETDO").toString();

        String the = map.get("SO_THE_BHYT").toString();
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
//        String bacsidieutri = request.getSession().getAttribute("Sess_User").toString();
        String bacsidieutri = user;
        String ngaykham = new SimpleDateFormat("yyyy-MM-dd").format(new java.util.Date());
        String[] arr_nk = ngaykham.split("-");
        String ngaylapbangke = arr_nk[2].substring(0, 2);
        String thanglapbangke = arr_nk[1].substring(0, 2);
        String namlapbangke = arr_nk[0].substring(0, 4);
        String mabenhnhan = map.get("MA_BENH_NHAN").toString();
        parameters.put("mach", mach);
        parameters.put("huyetap_tren", huyetapcao);
        parameters.put("huyetap_duoi", huyetapthap);
        parameters.put("thannhiet", thannhiet);
        parameters.put("tenbenhvien", tenbenhvien.toUpperCase());
        parameters.put("tenkhoakham", tenkhoakham);
        parameters.put("tenphongkham", tenphongbenh);
        parameters.put("makhambenh", makb);
        parameters.put("hovaten", hotenbenhnhan);
        parameters.put("tuoi", tuoi);
        parameters.put("diachi", diachi);
        parameters.put("gt_nam", nam);
        parameters.put("gt_nu", nu);
        parameters.put("the", the);
        parameters.put("thangtuoi", thangtuoi);
        parameters.put("cannang", cannang);
        parameters.put("mathe_2kytudau", mathe_2kytudau);
        parameters.put("mathe_kythu3", mathe_kythu3);
        parameters.put("the45", mathekytu_45);
        parameters.put("the67", mathe_67);
        parameters.put("the8910", mathe_8910);
        parameters.put("mathe_5kytucuoi", mathe_5kytucuoi);
        parameters.put("chandoan", chandoan);
        parameters.put("bacsidieutri", bacsidieutri);
        parameters.put("ngay", ngaylapbangke);
        parameters.put("thang", thanglapbangke);
        parameters.put("nam", namlapbangke);
        parameters.put("dvtt", dvtt);
        parameters.put("bhytkhongchi", bhytkhongchi);
        parameters.put("sophieu", sophieu);
        parameters.put("sophieuttpt", sophieuttpt);
        parameters.put("maloai", maloai);
        parameters.put("machuyenkhoa", machuyenkhoa);
        parameters.put("machitiet", machitietchuyenkhoa);
        parameters.put("masonguoibenh", mabenhnhan);
        String pathFile = "/jasper.ttpt/cls_phieuchidinhttpt.jasper";
        File reportFile = new ClassPathResource(pathFile).getFile();
        //File reportFile = new File(request.getSession().getServletContext().getRealPath("/WEB-INF/pages/Khambenh/cls_phieuchidinhttpt.jasper"));
        String fileName = reportFile.getPath();
        System.out.println(fileName);
        String enable_pdf = "1";
        if (enable_pdf.equals("0")) {
            JasperHelperMySQL.printReport("rtf", reportFile, parameters, DataSourceUtils.getConnection(dataSource), response);
        } else {
            JasperHelperMySQL.printReport("pdf", reportFile, parameters, DataSourceUtils.getConnection(dataSource), response);
        }
    }
}
