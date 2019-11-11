package vn.vnpt.pwa.khambenh.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Repository;
import org.springframework.jdbc.core.JdbcTemplate;
import vn.vnpt.pwa.khambenh.object.BaoCaoObj;
import vn.vnpt.pwa.khambenh.object.KhambenhObj;
import vn.vnpt.pwa.khambenh.object.ToaThuocMSObj;
import vn.vnpt.pwa.khambenh.object.ToathuocObj;

import javax.sql.DataSource;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

@Repository
//@Transactional
public class KhambenhDAOImp implements KhambenhDAO {
    @Autowired
    private DataSource dataSource;

    @Override
    public List loadthongtinkb_svv(String maKb, String dvtt, String soVaoVien) {
        String sql = "call kb_ngt_lttkb(?,?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForList(sql, new Object[]{maKb, dvtt, soVaoVien});
    }

    @Override
    public List chitiettoathuocngoaitru_svv(String maTT, String dvtt, String nghiepVu, String soVaoVien/*, String soPhieu, String ma, String theoDv, String soPhieuTtPt, String maTtPt*/) {
        String sql = "call kb_ngt_toa_select_mtt_svv(?,?,?,?)";
//        String sql = "call kb_ngt_toa_select_mtt_svv(?,?,?,?,?,?,?,?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForList(sql, new Object[]{maTT, dvtt, nghiepVu, soVaoVien/*, soPhieu, ma, theoDv, soPhieuTtPt, maTtPt*/});
    }

    @Override
    public List laythongtintoathuoc_svv(String maKb, String soVaoVien, String dvtt) {
        String sql = "call kb_ngt_ltttt_svv(?,?,?)#c,s,s,l";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForList(sql, new Object[]{maKb, dvtt, soVaoVien});
    }

    @Override
    public String laysophieuthanhtoan_svv_moi(String maKhamBenh, String dvtt, String dieuTriChuyenKhoa, int soVaoVien) {
        String sql = "call kb_nt_sl_sptt_svv_moi(?,?,?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForObject(sql, new Object[]{maKhamBenh, dvtt, dieuTriChuyenKhoa, soVaoVien}, String.class);
    }

    @Override
    public String songayconbhyt_svv(String idTiepNhan, String dvtt, String soVaoVien) {
        String sql = "call kb_ngt_select_snconbhyt_svv(?,?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForObject(sql, new Object[]{idTiepNhan, dvtt, soVaoVien}, String.class);
    }

    @Override
    public String noitru_select_tennoidangky(String noiDangKy) {
        String sql = "call not_tnh_laynoidangkykcb_f(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForObject(sql, new Object[]{noiDangKy}, String.class);
    }

    @Override
    public List laydstheophong_phanchia(int maPhongKham, int trangThai, String dvtt, int tsKhamNgoaiLoc67, int tsBnMienPhiKbhKhongCanDongTien820343, int batBuocDongTien70, int chuyenPhongKoBh89194, int bhytTraiTuyenVanKham96126, int goiSoHinhAnh91100, int tsKhamCapCuu94434, int tsBantManTinh9401022) {
        String sql = "call kb_ngt_select_theophong_pc(?,?,?,?,?,?,?,?,?,?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForList(sql, new Object[]{maPhongKham, trangThai, dvtt, tsKhamNgoaiLoc67, tsBnMienPhiKbhKhongCanDongTien820343, batBuocDongTien70, chuyenPhongKoBh89194, bhytTraiTuyenVanKham96126, goiSoHinhAnh91100, tsKhamCapCuu94434, tsBantManTinh9401022});
    }

    @Override
    public String queryForString(String sql, Object[] arr) {
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForObject(sql, arr, String.class);
    }

    @Override
    public Map queryForMap(String sql, Object[] arr) {
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForMap(sql, arr);
    }

    @Override
    public Map thongtinkbc_select_hk_svv(int soVaoVien, String dvtt) {
        String sql = "call KB_NT_THONGTINKCB_SL_HK_SVV(?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForMap(sql, new Object[]{soVaoVien, dvtt});
    }

    @Override
    public Map themkhambenh_giamtai(KhambenhObj kb) {
        String sql = "call KB_NT_kham_insert_giamtai_svv(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForMap(sql, new Object[]{
            kb.idTiepNhan,
            kb.dvtt,
            kb.ngayRaToa,
            kb.maNv,
            kb.maPhongKham,
            kb.hoTen,
            kb.tiLeMienGiam,
            kb.tuoi,
            kb.pkCuoi,
            kb.soPhieu,
            kb.maKhamBenh,
            kb.maToaThuoc,
            kb.ngayGioKham,
            kb.maxTttLuyKe,
            kb.namKham,
            kb.ttKiemTra,
            kb.maBenhNhan,
            kb.soPhieuThanhToan,
            kb.canTrenBHYT,
            kb.namHienTai,
            kb.kyHieuGroup,
            kb.ngayHienTai,
            kb.thangHienTai,
            kb.congKham,
            kb.maPhongBan,
            kb.soVaoVien,
            kb.tsGdyk82832,
            kb.tsApDungCanTrenMoi90,
            kb.tsNgayApDungCanTren91,
            kb.tsSoBenhAnNhoNhatDauVao101
        });
    }

    @Override
    public void luukhambenh_svv(KhambenhObj kb) {
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss a", Locale.getDefault());
        String sql = "call KB_NT_kham_update_GT_svv(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        try {
            jdbcTemplate.update(sql, new Object[]{
                kb.maKhamBenh,
                kb.dvtt,
                kb.mach,
                kb.nhipTho,
                kb.nhietDo,
                kb.huyetApTren,
                kb.huyetApDuoi,
                kb.chieuCao,
                kb.canNang,
                kb.creaTiNin,
                kb.bmi,
                kb.doThanhThai,
                kb.kqiBm,
                kb.kqDoThanhThai,
                kb.trieuChungLs,
                kb.maBenhLy,
                kb.icd,
                kb.benhPhu,
                kb.huongGiaiQuyet,
                kb.soNgayHen,
                //kb.ngayhen,
                kb.ngayHen,
                kb.loiDanToaThuoc,
                kb.chanDoanTuyenTruoc,
                kb.lyDoChuyenTuyenTruoc,
                kb.idTiepNhan,
                kb.chanDoanYhct,
                kb.chanDoanNguyenNhan,
                kb.taiNanThuongTich,
                kb.tenBenhTheoBacSi,
                kb.ngayKham,
                kb.maBenhNhan,
                kb.soVaoVien,
                kb.vongBung,
                kb.nhomMau,
                kb.khangThe,
                kb.loiDanKham,
                kb.layTenBenhTheoBsTuDm
            });
        } catch (NumberFormatException e) {
            throw e;
        }
    }

    @Override
    public String kb_ngt_cpk_cctt_tt37_svv(String dvtt, String idtiepnhan, String sottbv, String maphonght,
                                           String sottht, String maphongcd, String nhanvienchuyen, String khongthutien, String sovaovien, String madv, String thamsodinhdangten) {
        String sql = "call KB_NGT_CPK_TT37_SVV(?,?,?,?,?,?,?,?,?,?,?)#s,s,s,l,l,l,l,l,l,l,l,l";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForObject(sql, new Object[]{dvtt, idtiepnhan, sottbv, maphonght, sottht, maphongcd, nhanvienchuyen, khongthutien, sovaovien, madv, thamsodinhdangten}, String.class);
    }

    @Override
    public List laymotabenhly(String icd) {
        String sql = "call kb_ngt_laymotabenhly_icd(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForList(sql, new Object[]{icd});
    }

    @Override
    public List danhsach_donvi(String dvtt) {
        String sql = "call BAOCAO_TN_HTTRAM_DV_F(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForList(sql, new Object[]{dvtt});
    }

    @Override
    public List danhsach_phongban(String dvtt) {
        String sql = "call BAOCAO_TN_SLPB_F(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForList(sql, new Object[]{dvtt});
    }

    @Override
    public List danhsach_phongbenh(String khoa) {
        String sql = "call BC_TN_load_KP(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForList(sql, new Object[]{khoa});
    }

    @Override
    public List xembaocaokhambenh(BaoCaoObj obj) {
        String sql = "call BC_SL_THUCKHAM_HTK_F(?,?,?,?,?,?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForList(sql, new Object[]{obj.tuNgay, obj.denNgay, obj.dvtt, obj.maKhoa, obj.maPhong, obj.maDonVi, obj.kSK});
    }

    @Override
    public List ds_icd_thuongdung(String dvtt, String maNhanVien) {
        String sql = "call kb_ngt_icd_bsthuongdung_sel(?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForList(sql, new Object[]{dvtt, maNhanVien});
    }

    @Override
    public String kiemtrabenhmantinh_benhnhan(String dvtt, String icd) {
        String sql = "call kb_ngt_kiemtra_benhmantinh(?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForObject(sql, new Object[]{dvtt, icd}, String.class);
    }

    @Override
    public void icd_thuongdung_insert(String maBenhLy, String icd, String moTa, String maNhanVien, String dvtt) {
        String sql = "call kb_ngt_icd_bsthuongdung_insert(?,?,?,?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        jdbcTemplate.update(sql, new Object[]{maBenhLy, icd, moTa, maNhanVien, dvtt});
    }

    @Override
    public void luuthongtintoathuoc(KhambenhObj kb) {
        String sql = "call kb_ngt_toa_capnhat(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);

        jdbcTemplate.update(sql, new Object[]{
            kb.maKhamBenh,
            kb.dvtt,
            kb.loiDanToaThuoc,
            kb.loiDanToaVatTu,
            kb.loiDanToaMuaNgoai,
            kb.loiDanToaMienPhi,
            kb.loiDanToaMuaTaiQuay,
            kb.loiDanToaDichVu,
            kb.loiDanToaDongY,
            kb.baiThuocDongY,
            kb.phepTriDongY,
            kb.soThanThuoc,
            kb.ngayKham,
            kb.tuNgay.equals("null") ? null : kb.tuNgay,
            kb.denNgay.equals("null") ? null : kb.denNgay
        });
    }

    @Override
    public String agg_kt_cls_ngoai(String dvtt, String idTiepNhan) {
        String sql = "call agg_le_kt_cls_ngoai(?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForObject(sql, new Object[]{dvtt, idTiepNhan}, String.class);
    }

    @Override
    public String laytrangthaikham_svv(String idTiepNhan, String dvtt, String soVaoVien) {
        String sql = "call kb_ngt_select_ttk_svv(?,?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForObject(sql, new Object[]{idTiepNhan, dvtt, soVaoVien}, String.class);
    }

    @Override
    public String hoantatkham_giamtai(KhambenhObj obj) {
        String sql = "call kb_ngt_update_htk_giamtai(?,?,?,?,?,?,?,?,?,?,?,?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForObject(sql, new Object[]{obj.dvtt, obj.maKhamBenh,
                obj.maPhongKham, obj.maPhongBan, obj.soPhieu,
                obj.idTiepNhan, obj.soPhieuThanhToan, obj.ngayGioKham, obj.maNv, obj.tsKhoaSoLieu89071, obj.tsTtXuatThuoc82025, obj.tsGdyk82832, obj.soVaoVien},
            String.class);
    }

    @Override
    public List laydanhsachICD() {
        String sql = "call getlisticd()";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForList(sql, new Object[]{});
    }

    @Override
    public int laysoluong_vattu(String dvtt, String makhovt, String search) {
        String sql = "call dc_sp_demtonkhohientai_kb(?,?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForObject(sql, new Object[]{dvtt, makhovt, search}, Integer.class);
    }

    @Override
    public List danhsach_vattu(String dvtt, String makhovt, String search, String sidx, String sord, int limit, int start, int total, String loaivattu) {
        String sql = "call DC_SP_LOADTONKHOHIENTAI_KB(?,?,?,?,?,?,?,?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForList(sql, new Object[]{dvtt, makhovt, search, sidx, sord, limit, start, total, loaivattu});
    }

    @Override
    public String khambenh_ngoaitru_chitiettoathuoc_kt_ptt_datt(
        String dvtt, String ngayratoa, String mabenhnhan, String makhambenh, int sovaovien
    ) {
        String sql = "call kb_ngt_cttt_kt_ptt_datt_svv_F(?,?,?,?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForObject(sql, new Object[]{dvtt, ngayratoa, mabenhnhan, makhambenh, sovaovien}, String.class);
    }

    @Override
    public String khambenh_ngoaitru_chitiettoathuoc_kt_xuatthuoc(
        String dvtt, String matoathuoc, String nghiepvu, String ngayratoa, String mabenhnhan, int sovaovien
    ) {
        String sql = "call kb_ngt_cttt_kt_xuatthuoc_svv_F(?,?,?,?,?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForObject(sql, new Object[]{dvtt, matoathuoc, nghiepvu, ngayratoa, mabenhnhan, sovaovien}, String.class);
    }

    @Override
    public String khambenh_ngoaitru_chitiettoathuoc_kt_trung(
        String dvtt, String matoathuoc, String nghiepvu, String ngayratoa, String mabenhnhan, int mavattu, int sovaovien
    ) {
        String sql = "call kb_ngt_cttt_kt_trung_svv_F(?,?,?,?,?,?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForObject(sql, new Object[]{dvtt, matoathuoc, nghiepvu, ngayratoa, mabenhnhan, mavattu, sovaovien}, String.class);
    }

    @Override
    public String themtoathuocngoaitru_gt_new(ToaThuocMSObj tt) {
        //LichsusudungObj objls = new LichsusudungObj(tt.dvtt, "Khám bệnh", tt.user, "Thêm vật tư cho bệnh nhân có svv " + tt.sovaovien + " nghiệp vụ " + tt.nghiepvu + " từ kho " + tt.makhovt, tt.mavt + "", tt.tenvt, tt.soluongthuclinh + "", tt.dongiabv + "", tt.sovaovien + "", "0", "0", tt.ngayratoa, tt.ngaykhambenh, tt.matoathuoc, "");
        //LichsusudungDAO.them_lichsusudung_duoc(objls);
        String sql;
        sql = "call KB_NT_CT_TTHUOC_INSERT_GT_NEW(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForObject(sql, new Object[]{
            tt.dvtt,
            tt.soPhieuTT,
            tt.maCDHA,
            tt.maToaThuoc,
            tt.maKho,
            tt.maVatTu,
            tt.tenVatTu,
            tt.hoatChat,
            tt.nghiepVu,
            tt.soLuong,
            tt.soLuongThucLinh,
            tt.donGiaBV,
            tt.donGiaBH,
            tt.thanhTien,
            tt.soNgay,
            tt.sang,
            tt.trua,
            tt.chieu,
            tt.toi,
            tt.ngayRaToa,
            tt.ghiChuToaThuoc,
            tt.maBacSi,
            tt.cachSuDung,
            tt.coBHYT,
            tt.namHienTai,
            tt.maBenhNhan,
            tt.soPhieuTT,
            tt.idTiepNhan,
            tt.maKhamBenh,
            tt.ngayHienTai,
            tt.daThanhToan,
            tt.soVaoVien,
            tt.maPhongRaThuoc,
            tt.capCuu,
            tt.maGoiDichVu,
            tt.maPhongRaThuoc,
            tt.soPhieuTTPT,
            tt.maTTPT,
            tt.soDKMuaNgoai,
            tt.keyQl,
            tt.soLoSanXuat,
            tt.ngaySanXuat,
            tt.soNhapKhoChiTiet
        }, String.class);
    }

    @Override
    public String xoachitiettoathuoc_gt(ToaThuocMSObj tt) {

        String sql = "call KB_NT_delete_CT_toathuoc_svv(?,?,?,?,?,?,?,?,?,?,?,?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForObject(sql, new Object[]{tt.sttToaThuoc,
            tt.maToaThuoc,
            tt.dvtt,
            tt.maKhamBenh,
            tt.soPhieuTT,
            tt.thanhTien,
            tt.maKho,
            tt.donGiaBV,
            tt.nghiepVu,
            tt.maVatTu,
            tt.soVaoVien,
            tt.soPhieu,
            tt.maCDHA
        }, String.class);
    }

    @Override
    public String layhotenbacsi(String mabacsi, String dvtt) {
        String sql = "call his_kb_ngt.KB_NGOAITRU_LAY_HOTENBACSI_F(?,?)";
        //String sql = "call KB_NT_GET_hotenbacsi(?,?)$s,s,s";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForObject(sql, new Object[]{mabacsi, dvtt}, String.class);
    }

    @Override
    public Map hienthibangin_ptt_GT(String dvtt, String sophieu, String makhambenh, String sovaovien) {
        String sql = "call his_bhxh.KB_NT_hienthibangin_BV01_svv(?,?,?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForMap(sql, new Object[]{dvtt, sophieu, makhambenh, sovaovien});
    }

    @Override
    public Map hienthibangin_GT(String dvtt, String sophieu, String makhambenh, String ptt_dieutrichuyenkhoa, String dotdieutrichuyenkhoa, String sovaovien, String lammoitthc, String thamsolaythongtin_lenbaocao_bangb1) {
        String sql = "call his_bhxh.KB_NT_hienthibangin_BV01_GT(?,?,?,?,?,?,?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForMap(sql, new Object[]{dvtt, sophieu, makhambenh, ptt_dieutrichuyenkhoa, dotdieutrichuyenkhoa, sovaovien, lammoitthc, thamsolaythongtin_lenbaocao_bangb1});
    }

    @Override
    public Map hienthibangin_chandoan_GT(String dvtt, String sophieu, String makhambenh, String ptt_dieutrichuyenkhoa, String dotdieutrichuyenkhoa) {
        try {
            String sql = "call his_bhxh.KB_NT_hienthibangin_CD_GT(?,?,?,?,?)";
            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            return jdbcTemplate.queryForMap(sql, new Object[]{dvtt, sophieu, makhambenh, ptt_dieutrichuyenkhoa, dotdieutrichuyenkhoa});
        } catch (DataAccessException e) {
            return new HashMap();
        }
    }

    @Override
    public Map hienthithongtinkhambenh(String makb, String dvtt) {
        String sql = "call his_kb_ngt.KB_NT_GET_thongtinkham(?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForMap(sql, new Object[]{makb, dvtt});
    }

    @Override
    public Map layphongban_tuphongbenh(String maphongbenh) {
        String sql = "call KBNGOAITRU_LAY_PBAN_BYPBENH_F(?)";
        //String sql = "call KB_NT_GET_phban_by_phbenh(?)#c,l";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForMap(sql, new Object[]{maphongbenh});
    }

    @Override
    public String laysophieuthanhtoan(String makhambenh, String dvtt, String dieutrichuyenkhoa) {
        String sql = "call his_kb_ngt.kb_nt_sl_sophieuthanhtoan(?,?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForObject(sql, new Object[]{makhambenh, dvtt, dieutrichuyenkhoa}, String.class);
    }

    @Override
    public List laythongtinkb(String makb, String dvtt) {
        String sql = "call kb_ngt_laythongtinkhambenh(?,?)#c,s,s";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForList(sql, new Object[]{makb, dvtt});
    }

    @Override
    public String thongtinbacsikhambenh(String mabacsi) {
        String sql = "call KB_NGOAITRU_LSK_TTBACSI_F(?)#c,s";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForObject(sql, new Object[]{mabacsi}, String.class);
    }

    @Override
    public List thongtintoathuoc(String makhambenh, String dvtt) {
        String sql = "call KB_NGOAITRU_LAYTTTOATHUOC_F(?,?)#c,s,s";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForList(sql, new Object[]{makhambenh, dvtt});
    }

    @Override
    public List chitiettoathuocngoaitru(String matt, String dvtt, String nghiepvu) {
        String sql = "call kb_ngt_toa_select_matoathuoc(?,?,?)#c,s,s,s";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForList(sql, new Object[]{matt, dvtt, nghiepvu});
    }

    @Override
    public List danhsachlichsukham_hgi(String mabenhnhan, String tungay, String denngay) {
        String sql = "call HGI_KB_NGOAITRU_LSKHAMBENH(?,?,?)#c,s,t,t";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForList(sql, new Object[]{mabenhnhan, tungay, denngay});
    }
    @Override
    public List danhsachlichsukham(String mabenhnhan, String tungay, String denngay) {
        String sql = "call KB_NGOAITRU_LSKHAMBENH_F(?,?,?)#c,l,t,t";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForList(sql, new Object[]{mabenhnhan, tungay, denngay});
    }

    @Override
    public List thongtinbenhnhan(String dvtt, String makhambenh) {
        String sql = "call KB_NGOAITRU_LSK_TTTBN_F(?,?)#c,s,s";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForList(sql, new Object[]{dvtt, makhambenh});
    }
    @Override
    public List danhsachbenhnhan_chuakham_theodonvi(String tungay, String denngay, String dvtt, String makhoa, String hinhthucxem, String phongbenh, String madonvi, String kham_sk) {
        String sql = "call baocao_dsbn_chuakham(?,?,?,?,?,?,?,?)#c,s,s,s,l,l,s,s,l";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForList(sql, new Object[]{tungay, denngay, dvtt, makhoa, hinhthucxem,phongbenh,madonvi,kham_sk});
    }

    @Override
    public List danhsachbenhnhan_dangkham_theodonvi(String tungay, String denngay, String dvtt, String makhoa, String hinhthucxem, String phongbenh, String madonvi, String kham_sk) {
        String sql = "call baocao_dsbnhan_dangkham(?,?,?,?,?,?,?,?)#c,s,s,s,l,l,s,s,l";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForList(sql, new Object[]{tungay, denngay, dvtt, makhoa, hinhthucxem,phongbenh,madonvi,kham_sk});
    }

    @Override
    public List danhsachbenhnhan_hoantatkham_theodonvi(String tungay, String denngay, String dvtt, String makhoa, String hinhthucxem, String phongbenh, String madonvi, String kham_sk) {
        String sql = "call baocao_dsbn_htkham(?,?,?,?,?,?,?,?)#c,s,s,s,l,l,s,s,l";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForList(sql, new Object[]{tungay, denngay, dvtt, makhoa, hinhthucxem,phongbenh,madonvi,kham_sk});
    }

    @Override
    public void updateSoDienThoai(String maBenhNhan, String sdt) {
//        String sql = "UPDATE HIS_BN_NK.DM_BENH_NHAN SET SO_DIEN_THOAI = " + sdt + " WHERE MA_BENH_NHAN = " + maBenhNhan;
        String sql = "UPDATE HIS_BN_NK.DM_BENH_NHAN SET SO_DIEN_THOAI = ? WHERE MA_BENH_NHAN = ?";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        jdbcTemplate.update(sql, new Object[]{sdt, maBenhNhan});
    }
}
