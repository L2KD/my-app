package vn.vnpt.pwa.khambenh.controller.cdha;

import com.zaxxer.hikari.HikariDataSource;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import jreport.report.util.JasperHelperMySQL;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.query.JRQueryExecuterFactory;
import net.sf.jasperreports.engine.util.JRLoader;
import net.sf.jasperreports.engine.util.JRProperties;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DataSourceUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpStatusCodeException;
import vn.vnpt.pwa.khambenh.dao.KhambenhDAO;
import vn.vnpt.pwa.khambenh.dao.cdha.ChanDoanHinhAnhDAO;
import vn.vnpt.pwa.khambenh.object.CDHAObj;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.sql.DataSource;
import java.io.File;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@RequestMapping("/api")
@Api(value = "ChanDoanHinhAnhController", description = "Chan doan hinh anh controller")
public class ChanDoanHinhAnhController {
    @Autowired
    ChanDoanHinhAnhDAO chanDoanHinhAnhDAO;
    @Autowired
    HikariDataSource dataSource;
    @Autowired
    KhambenhDAO khambenhDAO;
    @ApiOperation("Them chi dinh cdha")
    @RequestMapping(value = "/cdha/them-chidinh-cdha", method = RequestMethod.POST)
    public @ResponseBody
    List themchidinh_cdha(@RequestBody CDHAObj cdhaObj) {
        /*CDHAObj cdha = new CDHAObj();
        Thamsohethong tsht = (Thamsohethong) session.getAttribute("Sess_Thamso");
        String dvtt = session.getAttribute("Sess_DVTT").toString();
        String[] arr = url.split("```");
        cdha.makhambenh = arr[0];
        cdha.dvtt = tsht.matinh_khbv;
        cdha.maphongcdha = arr[1];
        cdha.bacsidt = session.getAttribute("Sess_UserID").toString();
        cdha.nguoichidinh = session.getAttribute("Sess_UserID").toString();
        cdha.phongchidinh = session.getAttribute("Sess_Phong").toString();
        cdha.cobhyt = arr[2];*/
        cdhaObj.ngayChiDinh = cdhaObj.ngayChiDinh + " " + new SimpleDateFormat("HH:mm:ss").format(new java.util.Date());
        /*cdha.mabenhnhan = arr[4];
        cdha.sovaovien = Integer.parseInt(arr[5]);
        cdha.capcuu = arr[6];
        cdha.giamdinhvien_cdha = arr[7];*/
        List sophieu = chanDoanHinhAnhDAO.cdhaInsertBangCha(cdhaObj);
        //LichsusudungObj objls = new LichsusudungObj(cdha.dvtt, "Thêm phiếu chuẩn đoán hình ảnh " + sophieu, session.getAttribute("Sess_UserID").toString() + "-" + session.getAttribute("Sess_User"), "Thêm phiếu");
        //LichsusudungDAO.them_lichsusudung(objls);
        return sophieu;
    }

    @ApiOperation("Lay danh sach cdha")
    @RequestMapping(value = "cdha/lay-danhsach-cdha", method = RequestMethod.POST)
    public @ResponseBody
    List laydanhsach_cdha_svv(@RequestBody CDHAObj cdhaObj,
                              @RequestParam(value = "phanLoaiGioiTinh", required = false, defaultValue = " ") String phanLoaiGioiTinh) {
        /*CDHAObj cdha = new CDHAObj();
        Thamsohethong tsht = (Thamsohethong) session.getAttribute("Sess_Thamso");
        String[] arr = url.split("```");
        cdha.bhytkhongchi = arr[0];
        cdha.dvtt = tsht.matinh_khbv;
        cdha.sophieucdha = arr[1];
        cdha.maphongcdha = arr[2];
        cdha.chonbanggiacu_lienke = arr[3];
        cdha.sovaovien = Integer.parseInt(arr[5]);*/
        if (phanLoaiGioiTinh.equals("Nam")) {
            cdhaObj.phanTheoGioiTinh = "1";
        } else if (phanLoaiGioiTinh.equals("Nữ")) {
            cdhaObj.phanTheoGioiTinh = "0";
        } else {
            cdhaObj.phanTheoGioiTinh = "-1";
        }
        /*cdha.loaibogia0dong = tsht.bogia0dongchidinhcls;*/
        return chanDoanHinhAnhDAO.cdhaHienThiDsCDHA(cdhaObj);
    }

    @ApiOperation("Lay danh sach phieu cdha")
    @RequestMapping(value = "cdha/lay-danhsach-phieucdha", method = RequestMethod.POST)
    public @ResponseBody
    List laydanhsach_phieucdha_svv(@RequestBody CDHAObj cdhaObj) {
        /*CDHAObj cdha = new CDHAObj();
        Thamsohethong tsht = (Thamsohethong) session.getAttribute("Sess_Thamso");
        String[] arr = url.split("```");
        cdha.makhambenh = arr[0];
        cdha.dvtt = tsht.matinh_khbv;
        cdha.ngaychidinh = arr[1];
        cdha.sovaovien = Integer.parseInt(arr[2]);*/
        return chanDoanHinhAnhDAO.cdhaHienThiPhieuCDHA(cdhaObj);
    }

    @ApiOperation("Lay danh sach cdha da chon")
    @RequestMapping(value = "cdha/lay-danhsach-cdha-dachon", method = RequestMethod.POST)
    public @ResponseBody
    List laydanhsach_cdha_dachon(@RequestBody CDHAObj cdhaObj) {
        /*CDHAObj cdha = new CDHAObj();
        String[] arr = url.split("```");
        cdha.bhytkhongchi = arr[0];
        cdha.dvtt = arr[1];
        cdha.sophieucdha = arr[2];
        cdha.sovaovien = Integer.parseInt(arr[3]);*/
        return chanDoanHinhAnhDAO.cdhaHienThiDsCDHADaChon(cdhaObj);
    }

    @ApiOperation("Xoa danh sach cdha chi tiet")
    @RequestMapping(value = "cdha/cdha-delete-cacchitiet", method = RequestMethod.POST)
    public @ResponseBody
    String cdha_delete_cacchitiet(@RequestBody CDHAObj cdhaObj,
                                  @RequestParam(value = "arr_ris", required = false) String arr_ris) {
        chanDoanHinhAnhDAO.cdhaDeleteCacChiTiet(cdhaObj);
        return "0";
    }

    @ApiOperation("Cap nhat bang cha cdha")
    @RequestMapping(value = "cdha/cdha-update-bangcha", method = RequestMethod.POST)
    public @ResponseBody
    void cdha_update_bangcha_svv(@RequestBody CDHAObj cdhaObj) {
        /*CDHAObj cdha = new CDHAObj();
        url = URLDecoder.decode(url, "UTF-8");
        String[] arr = url.split("```");
        cdha.sovaovien = Integer.parseInt(arr[0]);
        cdha.sophieucdha = arr[2];
        cdha.dvtt = arr[1];
        cdha.capcuu = arr[3];
        cdha.makhambenh = arr[4];*/
        chanDoanHinhAnhDAO.cdhaUpdateBangCha(cdhaObj);
    }

    @ApiOperation("Them cdha chi tiet dong loat")
    @RequestMapping(value = "cdha/them-chidinh-cdha-chitiet-dongloat", method = RequestMethod.POST)
    public @ResponseBody
    void themchidinh_xnchitiet_svv_dongloat_moi(
        @RequestBody CDHAObj cdhaObj,
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
        chanDoanHinhAnhDAO.themChiCinhCDHAObjChiTietDongLoat(cdhaObj,
            ListMaDV, ListSLDV, ListGIA, ListTHANHTIEN, ListGIABH, ListGIAKBH);
    }

    @ApiOperation("Them cdha chi tiet dong loat")
    @RequestMapping(value = "cdha/xoa-phieu-cdha", method = RequestMethod.POST)
    public @ResponseBody
    String xoaphieu_cdha_svv(@RequestBody CDHAObj cdhaObj) {
        return chanDoanHinhAnhDAO.cdhaDeleteBangCha(cdhaObj);

    }
    @ApiOperation("In phieu cdha")
    @RequestMapping(value = "/inphieucdha", method = RequestMethod.GET)
    public @ResponseBody
    void inphieucdha(@RequestParam(value = "makb") String makb,
                     @RequestParam(value = "sovaovien") String sovaovien,
                     @RequestParam(value = "bhytkhongchi") String bhytkhongchi,
                     @RequestParam(value = "sophieucdha") String sophieucdha,
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
        // xử lý in toa thuốc!
        try {
            sophieu = khambenhDAO.laysophieuthanhtoan(sovaovien, dvtt, "0");
        } catch (Exception e) {
            sophieu = khambenhDAO.laysophieuthanhtoan(sovaovien, dvtt, "1");
        }
        //Thamsohethong tsht = (Thamsohethong) request.getSession().getAttribute("Sess_Thamso");
        Map parameters = new HashMap();
        String sql = " select SOVAOVIEN,ifnull(DIEUTRICHUYENKHOA,0) as DIEUTRICHUYENKHOA,ifnull(DOTDIEUTRIDAUTIEN,0) as DOTDIEUTRIDAUTIEN,NGAY_THANH_TOAN " +
            "from his_kb_ngt.kb_phieuthanhtoan  where SOPHIEUTHANHTOAN = ? and DVTT = ?";
        Map map_temp = khambenhDAO.queryForMap(sql, new Object[]{sophieu, dvtt});
//        String sovaovien = map_temp.get("sovaovien").toString();
        String dotdieutrichuyenkhoa = map_temp.get("DIEUTRICHUYENKHOA").toString();
        String ptt_dieutrichuyenkhoa = map_temp.get("DOTDIEUTRIDAUTIEN").toString();
        //List<Map<String, Object>> thongtin = khambenhDAO.hienthibangin(dvtt, sophieu);
        Map<String, Object> map = khambenhDAO.hienthibangin_GT(dvtt, sophieu, makb, ptt_dieutrichuyenkhoa, dotdieutrichuyenkhoa, sovaovien, "0","0");

        //List<Map<String, Object>> thongtin_ptt = khambenhDAO.hienthibangin_ptt(dvtt, sophieu);
        Map<String, Object> map_ptt = khambenhDAO.hienthibangin_ptt_GT(dvtt, sophieu, makb, sovaovien);

        // chẩn đoán
        String chandoan_icd = "";
        Map<String, Object> map_chandoan = khambenhDAO.hienthibangin_chandoan_GT(dvtt, sophieu, makb, ptt_dieutrichuyenkhoa, dotdieutrichuyenkhoa);
        if (!map_chandoan.isEmpty()) {
            String Chandoan = map_chandoan.get("CHANDOAN").toString();
            String ICD = map_chandoan.get("ICD").toString();
            String chandoan_bacsi = map_chandoan.get("CHANDOANBACSI").toString();
            if (!chandoan_bacsi.trim().equals("")) {
                Chandoan = chandoan_bacsi;
            }
            chandoan_icd = ICD + " - " + Chandoan;
        }

        // thông tin khám bệnh
        //List<Map<String, Object>> thongtin_khambenh = khambenhDAO.hienthithongtinkhambenh(makb, dvtt);
        Map<String, Object> map_khambenh = khambenhDAO.hienthithongtinkhambenh(makb, dvtt);
//        String maphongbenh = request.getSession().getAttribute("Sess_Phong").toString();

        //List<Map<String, Object>> thongtin_phongban = khambenhDAO.layphongban_tuphongbenh(maphongbenh);
        Map<String, Object> map_phongban = khambenhDAO.layphongban_tuphongbenh(maphongbenh);

        String tenphongban = map_phongban.get("TEN_PHONGBAN").toString();
        String tenphongbenh = map_phongban.get("TEN_PHONG_BENH").toString();
        // chẩn đoán

        String Sophieuthanhtoan = map_ptt.get("SOPHIEUTHANHTOAN").toString();
        String mabenhnhan = map.get("MA_BENH_NHAN").toString();
        String hotenbenhnhan = map.get("TEN_BENH_NHAN").toString();
        String thangtuoi = map.get("THANG") + "";
        String cannang = map.get("CANNANG") + "";
        String ngaysinh = map.get("NGAY_SINH").toString();
        String ngaytiepnhan = map.get("THOI_GIAN_TIEP_NHAN").toString();
        // TGG - Thanh - 2/7/2017 - Tinh lai truong tuoiht theo cong thuc khac
        // begin
        String sqlCallFuncTuoiHienThi = "select his_bhxh.hienthi_tuoi_benhnhan_2_2(?,?) from dual";
        String tuoiht = khambenhDAO.queryForString(sqlCallFuncTuoiHienThi, new Object[]{ngaysinh, ngaytiepnhan});
        // end
        String[] arr_ns = ngaysinh.split("-");
        String namsinh = arr_ns[0];
        String diachi = map.get("DIA_CHI").toString();
        String sodienthoai = map.get("SO_DIEN_THOAI").toString();

        // thẻ bhyt
        //String the = map.get("SO_THE_BHYT").toString();
        //String manoikcbbandau = map.get("NOIDANGKY_KCB").toString();
        //String sql_ntn = "select TEN_NOITIEPNHAN from his_public_list.dm_noi_tiep_nhan where MA_NOITIEPNHAN=?";
        //String tennoikcbbandau = khambenhDAO.queryForString(sql_ntn, new Object[]{manoikcbbandau});
        //String noikcbbandau = manoikcbbandau + " - " + tennoikcbbandau;
        String manoidangky = "";
        String tennoikcbbandau = "";
        String noikcbbandau = "";
        String the = map.get("SO_THE_BHYT").toString();
        manoidangky = map.get("NOIDANGKY_KCB").toString();
        String soCMT = map.get("CMTND").toString();
        if (!the.trim().equals("")) {
            String sql_ntn = "select ifnull(TEN_NOITIEPNHAN,'')from his_dm.dm_noi_tiep_nhan where MA_NOITIEPNHAN=?";
            tennoikcbbandau = khambenhDAO.queryForString(sql_ntn, new Object[]{manoidangky});
            noikcbbandau = manoidangky + " - " + tennoikcbbandau;
        }
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
        /// thông tin mạch huyết áp
        String trieuchungls = map_khambenh.get("TRIEUCHUNGLS") == null ? "" : map_khambenh.get("TRIEUCHUNGLS").toString();
        String mach = map_khambenh.get("MACH") == null ? "" : map_khambenh.get("MACH").toString();
        String huyetapcao = map_khambenh.get("HUYETAPCAO") == null ? "" : map_khambenh.get("HUYETAPCAO").toString();
        String huyetapthap = map_khambenh.get("HUYETAPTHAP") == null ? "" : map_khambenh.get("HUYETAPTHAP").toString();
        String thannhiet = map_khambenh.get("NHIETDO") == null ? "" : map_khambenh.get("NHIETDO").toString();
        //HGI TGGDEV-30363 18-05-2018 THÊM NGÀY TRẢ KẾT QUẢ
//        sql = "select nvl(BAC_SI_DIEU_TRI,0) as BAC_SI_DIEU_TRI, nvl(NGUOI_CHI_DINH,0) as NGUOI_CHI_DINH, to_char(NGAY_TAO, 'yyyy-mm-dd') as NGAY_TAO, to_char(NGAY_CHI_DINH, 'dd/MM/yyyy  HH:mm:ss') as tgchidinh, to_char(NGAY_TRA_KETQUA, 'yyyy-mm-dd') as NGAY_TRA_KETQUA  from KB_CD_CDHA where DVTT=? and SO_PHIEU_CDHA=?";
        sql = "select ifnull(BAC_SI_DIEU_TRI,0) as BAC_SI_DIEU_TRI, ifnull(NGUOI_CHI_DINH,0) as NGUOI_CHI_DINH, DATE_FORMAT(NGAY_TAO, '%Y-%m-%d') as NGAY_TAO,ifnull(STT_HANGNGAY,0) as stt_hangngay, DATE_FORMAT(NGAY_CHI_DINH, '%m/%d/%Y %H:%i:%s') as tgchidinh from his_cls.KB_CD_CDHA where DVTT=? and SO_PHIEU_CDHA=?";
        //HGI TGGDEV-30363 END 18-05-2018 THÊM NGÀY TRẢ KẾT QUẢ
        Map map_tt = khambenhDAO.queryForMap(sql, new Object[]{dvtt, sophieucdha});
        String ngayin = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss").format(new java.util.Date());
        parameters.put("ngayin", ngayin);
        String ngaykham_tk = map_tt.get("NGAY_TAO").toString();
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
//        String nguoichidinh = khambenhDAO.layhotenbacsi(map_tt.get("NGUOI_CHI_DINH").toString(), dvtt);
        String nguoichidinh = "";
        try {
            khambenhDAO.layhotenbacsi(map_tt.get("NGUOI_CHI_DINH").toString(), dvtt);
        }catch (Exception e){
            nguoichidinh = "";
        }
        String[] arr_nk = ngaykham_tk.split("-");
        String ngaylapbangke = arr_nk[2];
        String thanglapbangke = arr_nk[1];
        String namlapbangke = arr_nk[0];
        String nam = (Boolean.parseBoolean(map.get("GIOI_TINH").toString()) == true) ? "x" : "";
        String gioitinh = (Boolean.parseBoolean(map.get("GIOI_TINH").toString()) == true) ? "Nam" : "Nữ";
        String nu = (Boolean.parseBoolean(map.get("GIOI_TINH").toString()) == false) ? "x" : "";
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
        parameters.put("nguoichidinh", nguoichidinh);
        parameters.put("trieuchungls", trieuchungls);
        parameters.put("sohoso", chuoithucte);
        parameters.put("tenbenhvien", tenbenhvien.toUpperCase());
        parameters.put("tenkhoakham", tenphongban);
        parameters.put("tenphongkham", tenphongbenh);
        parameters.put("hovaten", hotenbenhnhan);
        parameters.put("namsinh", namsinh);
        parameters.put("diachi", diachi);
        parameters.put("sodienthoai", sodienthoai);
        parameters.put("mach", mach);
        parameters.put("huyetap_tren", huyetapcao);
        parameters.put("huyetap_duoi", huyetapthap);
        parameters.put("thannhiet", thannhiet);
        parameters.put("thangtuoi", thangtuoi);
        parameters.put("cannang", cannang);
//       parameters.put("canlamsang", ""); /////////////////------------
        parameters.put("chandoan", chandoan_icd);
        parameters.put("sophieu", Sophieuthanhtoan);
        parameters.put("ngay", ngaylapbangke);
        parameters.put("thang", thanglapbangke);
        parameters.put("nam", namlapbangke);
        parameters.put("bacsidieutri", tenbacsi);
        parameters.put("masonguoibenh", mabenhnhan);
        parameters.put("mathe_2kytudau", mathe_2kytudau);
        parameters.put("mathe_kythu3", mathe_kythu3);
        parameters.put("the45", mathekytu_45);
        parameters.put("the67", mathe_67);
        parameters.put("the8910", mathe_8910);
        parameters.put("mathe_5kytucuoi", mathe_5kytucuoi);
        parameters.put("dvtt", dvtt);
        parameters.put("bhytkhongchi", bhytkhongchi);
        parameters.put("sophieucdha", sophieucdha);
        parameters.put("gioitinh_nam", nam);
        parameters.put("gioitinh_nu", nu);
        parameters.put("makhambenh", makb);
        parameters.put("noikcbandau", noikcbbandau);
        parameters.put("ngaychidinh", ngaykham_tk);
        parameters.put("idtiepnhan", makb.replaceFirst("kb_", ""));
        parameters.put("mabenhnhan", mabenhnhan);
        parameters.put("sovaovien", sovaovien);
        parameters.put("thutiennhieunac", "0"/*tsht.thanhtoanvienphinhieunac*/);
//        String sql1 = "SELECT  group_concat(ifnull(ct.ghichu_chidinh,'') SEPARATOR ' ' )  " +
//            "FROM his_cls.kb_cd_cdha_CT ct  WHERE ct.dvtt = ? and ct.SO_PHIEU_CDHA = ?";
        String sql1 = "SELECT  group_concat(ifnull(ct.ghichu_chidinh,'') SEPARATOR ' ' )  " +
            "FROM his_cls.kb_cd_cdha_CT ct  WHERE ct.dvtt = ? and ct.SO_PHIEU_CDHA = ?";
        String ghichuchidinh = khambenhDAO.queryForString(sql1, new Object[]{dvtt,sophieucdha });
        parameters.put("ghichuchidinh", ghichuchidinh);
        String path = "/jasper.xetnghiem/logo_pksannhi.jpg";
        File file_hinhanh = new ClassPathResource(path).getFile();
        String path_hinhanh =  file_hinhanh.getPath();//new File(request.getSession().getServletContext().getRealPath("/WEB-INF/pages/Canlamsang/logo_pksannhi.jpg")).getPath();
        parameters.put("hinhanh", path_hinhanh);
        String tieudequanly = tendonviquanlytructiep;
        if (tieudequanly.equals("")) {
            tieudequanly = "Sở Y Tế " + tinh;
        }
        parameters.put("soytetg", tieudequanly);
        /*String sub1 = new File(request.getSession().getServletContext().getRealPath("/WEB-INF/pages/Khambenh/cls_phieukhamgdvchuyenkhoalamsang_sub1_cdha.jasper")).getPath();
        String sub2 = new File(request.getSession().getServletContext().getRealPath("/WEB-INF/pages/Khambenh/cls_phieukhamgdvchuyenkhoalamsang_sub_xn.jasper")).getPath();
        parameters.put("sub1", sub1);
        parameters.put("sub2", sub2);*/
        parameters.put("gioitinh", gioitinh);
        parameters.put("tentrungtam", tenbenhvien + " " +tinh);
        parameters.put("CMTND", soCMT);
        File reportFile;
        parameters.put("tuoiht", tuoiht);
        //HGI TGGDEV-30363 18-05-2018
        String chieucao = map_ptt.get("CHIEUCAO") == null ? "" : map_ptt.get("CHIEUCAO").toString();
        String cannang_hgi = map_ptt.get("CANNANG") == null ? "" : map_ptt.get("CANNANG").toString();
        String gioitinh_hgi = (Boolean.parseBoolean(map.get("GIOI_TINH").toString()) == true) ? "1" : "0";
        String ngaynhap_kq = map_tt.get("NGAY_TRA_KETQUA") == null ? "" : map_tt.get("NGAY_TRA_KETQUA").toString();
        String matinh_12 = "", matinh_345 = "";
        matinh_12 = (manoidangky == null || manoidangky.equals(" ")) ? "" : manoidangky.substring(0, 2);
        matinh_345 = (manoidangky == null || manoidangky.equals(" ")) ? "" : manoidangky.substring(2, 5);
        String[] arr_kq;
        String ngay_kq = "    ", thang_kq = "    ", nam_kq = "    ";
        if (!ngaynhap_kq.equals("")) {
            arr_kq = ngaynhap_kq.split("-");
            ngay_kq = arr_kq[2];
            thang_kq = arr_kq[1];
            nam_kq = arr_kq[0];
        }
        parameters.put("matinh_12", matinh_12);
        parameters.put("matinh_345", matinh_345);
        parameters.put("trieuchung", trieuchungls);
        parameters.put("noikcbbandau", noikcbbandau);
        parameters.put("tentinh", tieudequanly.toUpperCase());
        parameters.put("hotennguoibenh", hotenbenhnhan);
        parameters.put("tuoi", tuoiht);
        parameters.put("chieucao", chieucao);
        parameters.put("cannang_hgi", cannang_hgi);
        parameters.put("gioitinh_hgi", gioitinh_hgi);
        parameters.put("ngay_kq", ngay_kq);
        parameters.put("thang_kq", thang_kq);
        parameters.put("nam_kq", nam_kq);
        parameters.put("noitru", noitru);
        /*parameters.put("SubDir", request.getSession().getServletContext().getRealPath("") + "/WEB-INF/pages/haugiang/reports");
        //END HGI TGGDEV-30363 18-05-2018
        //Begin - An Giang - Huỳnh Bảo Khánh - điều chỉnh ngày 13/12/2016
        String reportFile1 = "";
        String reportFile2 = "";
        String reportFile3 = "";
        String reportFile4 = "";
        if(dvtt.equals("12001")){
            reportFile1 = new File(request.getSession().getServletContext().getRealPath("/WEB-INF/pages/Khambenh/cls_phieuchidinhcdha_sieuam.jasper")).getPath();
            reportFile2 = new File(request.getSession().getServletContext().getRealPath("/WEB-INF/pages/Khambenh/cls_phieuchidinhcdha_noisoi.jasper")).getPath();
            reportFile3 = new File(request.getSession().getServletContext().getRealPath("/WEB-INF/pages/Khambenh/cls_phieuchidinhcdha_xquang.jasper")).getPath();
            reportFile4 = new File(request.getSession().getServletContext().getRealPath("/WEB-INF/pages/Khambenh/cls_phieuchidinhcdha_dientim.jasper")).getPath();
        }
        parameters.put("sub1", reportFile1);
        parameters.put("sub2", reportFile2);
        parameters.put("sub3", reportFile3);
        parameters.put("sub4", reportFile4);*/
        if (tt.equals("0")) {
            //--Lấy đường dẫn report, nếu không có dùng report mặc định
            String pathFile = "/jasper.cdha/cls_phieuchidinhcdha.jasper";
            reportFile = new ClassPathResource(pathFile).getFile();
        } else {
            //--Lấy đường dẫn report, nếu không có dùng report mặc định
            String pathFile = "/jasper.cdha/cls_phieuchidinhcdha_all.jasper";
            reportFile = new ClassPathResource(pathFile).getFile();
        }
        //JasperPrint print = JasperFillManager.fillReport(fileName, parameters, DataSourceUtils.getConnection(dataSourceMNG));

        //String path = request.getSession().getServletContext().getRealPath("/WEB-INF/store_files/");
        JasperHelperMySQL.printReport("pdf", reportFile, parameters, DataSourceUtils.getConnection(dataSource), response);
    }
}
