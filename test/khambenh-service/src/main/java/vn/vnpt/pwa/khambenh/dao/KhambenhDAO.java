package vn.vnpt.pwa.khambenh.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import vn.vnpt.pwa.khambenh.object.BaoCaoObj;
import vn.vnpt.pwa.khambenh.object.KhambenhObj;
import vn.vnpt.pwa.khambenh.object.ToaThuocMSObj;
import vn.vnpt.pwa.khambenh.object.ToathuocObj;

public interface KhambenhDAO {
    public List laydstheophong_phanchia(int maPhongKham, int trangThai, String dvtt, int tsKhamNgoaiLoc67, int tsBnMienPhiKbhKhongCanDongTien820343,int batBuocDongTien70,int chuyenPhongKoBh89194,int bhytTraiTuyenVanKham96126,int goiSoHinhAnh91100,int tsKhamCapCuu94434,int tsBantManTinh9401022);
    public String noitru_select_tennoidangky(String noiDangKy);
    public String songayconbhyt_svv(String idTiepNhan, String dvtt, String soVaoVien);
    public List loadthongtinkb_svv(String maKb, String dvtt, String soVaoVien);
    public String laysophieuthanhtoan_svv_moi(String maKhamBenh, String dvtt, String dieuTriChuyenKhoa, int soVaoVien);
    public List laythongtintoathuoc_svv(String maKb, String soVaoVien,String dvtt);
    public List chitiettoathuocngoaitru_svv(String maTt, String dvtt, String nghiepVu, String soVaoVien/*, String soPhieu, String ma, String theoDv, String soPhieuTtPt, String maTtPt*/);
    public String queryForString(String sql, Object[] arr);
    public Map thongtinkbc_select_hk_svv(int soVaoVien, String dvtt);
    public Map themkhambenh_giamtai(KhambenhObj kb);
    public void luukhambenh_svv(KhambenhObj kb);
    public List laymotabenhly(String icd);
    public List ds_icd_thuongdung(String dvtt, String maNhanVien);
    public String kiemtrabenhmantinh_benhnhan(String dvtt, String icd);
    public String kb_ngt_cpk_cctt_tt37_svv(String dvtt, String idtiepnhan, String sottbv, String maphonght,
                                           String sottht, String maphongcd, String nhanvienchuyen, String khongthutien, String sovaovien, String madv, String thamsodinhdangten);
    public void luuthongtintoathuoc(KhambenhObj kb);
    public void icd_thuongdung_insert(String maBenhLy, String icd, String moTa, String maNhanVien, String dvtt);
    public String agg_kt_cls_ngoai(String dvtt, String idTiepNhan);
    public String laytrangthaikham_svv(String idTiepNhan, String dvtt, String soVaoVien);
    public String hoantatkham_giamtai(KhambenhObj obj);
    public List laydanhsachICD();
    public int laysoluong_vattu(String dvtt, String makhovt, String search);
    public List danhsach_vattu(String dvtt, String makhovt, String search, String sidx, String sord, int limit, int start, int total,String loaivattu);
    public String khambenh_ngoaitru_chitiettoathuoc_kt_ptt_datt(String dvtt, String ngayratoa, String mabenhnhan, String makhambenh, int sovaovien);
    public String khambenh_ngoaitru_chitiettoathuoc_kt_xuatthuoc(String dvtt, String matoathuoc, String nghiepvu, String ngayratoa, String mabenhnhan, int sovaovien);
    public String khambenh_ngoaitru_chitiettoathuoc_kt_trung(
        String dvtt, String matoathuoc, String nghiepvu, String ngayratoa, String mabenhnhan, int mavattu, int sovaovien
    );
    public String themtoathuocngoaitru_gt_new(ToaThuocMSObj tt);
    public String xoachitiettoathuoc_gt(ToaThuocMSObj tt);

    public Map queryForMap(String sql, Object[] arr);

    public String layhotenbacsi(String mabacsi, String dvtt) ;


    public Map hienthibangin_ptt_GT(String dvtt, String sophieu, String makhambenh, String sovaovien) ;


    public Map hienthibangin_GT(String dvtt, String sophieu, String makhambenh, String ptt_dieutrichuyenkhoa, String dotdieutrichuyenkhoa, String sovaovien, String lammoitthc, String thamsolaythongtin_lenbaocao_bangb1) ;

    public Map hienthibangin_chandoan_GT(String dvtt, String sophieu, String makhambenh, String ptt_dieutrichuyenkhoa, String dotdieutrichuyenkhoa);


    public Map hienthithongtinkhambenh(String makb, String dvtt);

    public Map layphongban_tuphongbenh(String maphongbenh);

    public String laysophieuthanhtoan(String makhambenh, String dvtt, String dieutrichuyenkhoa);

    public List laythongtinkb(String makb, String dvtt);

    public String thongtinbacsikhambenh(String mabacsi);

    public List thongtintoathuoc(String dvtt, String makhambenh);

    public List chitiettoathuocngoaitru(String matt, String dvtt, String nghiepvu);

    public List danhsachlichsukham(String mabenhnhan, String tungay, String denngay);

    public List danhsachlichsukham_hgi(String mabenhnhan, String tungay, String denngay);

    public List thongtinbenhnhan(String dvtt,String makhambenh);

    public List danhsach_donvi(String dvtt);

    public List danhsach_phongban(String dvtt);

    public List danhsach_phongbenh(String khoa);

    public List xembaocaokhambenh(BaoCaoObj obj);

    public List danhsachbenhnhan_chuakham_theodonvi(String tungay, String denngay, String dvtt, String makhoa, String hinhthucxem, String phongbenh, String madonvi, String kham_sk);

    public List danhsachbenhnhan_dangkham_theodonvi(String tungay, String denngay, String dvtt, String makhoa, String hinhthucxem, String phongbenh, String madonvi, String kham_sk);

    public List danhsachbenhnhan_hoantatkham_theodonvi(String tungay, String denngay, String dvtt, String makhoa, String hinhthucxem, String phongbenh, String madonvi, String kham_sk);

    public void updateSoDienThoai(String maBenhNhan, String sdt);

}
