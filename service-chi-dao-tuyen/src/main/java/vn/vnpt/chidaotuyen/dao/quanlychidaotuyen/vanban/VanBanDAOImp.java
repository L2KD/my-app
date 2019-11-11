package vn.vnpt.chidaotuyen.dao.quanlychidaotuyen.vanban;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.util.LinkedCaseInsensitiveMap;
import vn.vnpt.chidaotuyen.Obj.quanlychidaotuyen.CoQuanBanHanhObj;
import vn.vnpt.chidaotuyen.Obj.quanlychidaotuyen.DonViObj;
import vn.vnpt.chidaotuyen.Obj.quanlychidaotuyen.TinhThanhObj;
import vn.vnpt.chidaotuyen.Obj.quanlychidaotuyen.VanBanObj;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.List;

@Repository
public class VanBanDAOImp implements VanBanDAO {
    @Autowired
    private DataSource dataSource;

    @Override
    public List getDanhSachTinh() {
        String sql = "CALL LayDanhSachTinhThanh()";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql);
        ArrayList tinhThanhObjList = new ArrayList();
        for (int i = 0; i < t.size(); i++) {
            Object newtmp = t.get(i);
            LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
            TinhThanhObj tinhThanhObj = new TinhThanhObj();
            tinhThanhObj.maTinhThanh = Long.parseLong(map.get("ma_tinh_thanh").toString());
            tinhThanhObj.tenTinhThanh = map.get("ten_tinh_thanh").toString();
            tinhThanhObjList.add(tinhThanhObj);
        }
        return tinhThanhObjList;
    }

    @Override
    public List getDanhSachDonVi(Long maTinh) {
        String sql = "CALL LayDanhSachDonViTheoTinh(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql, new Object []{maTinh});
        ArrayList donViObjList = new ArrayList();
        for (int i = 0; i < t.size(); i++) {
            Object newtmp = t.get(i);
            LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
            DonViObj donViObj = new DonViObj();
            donViObj.maDonVi = map.get("ma_don_vi").toString();
            donViObj.tenDonVi = map.get("ten_don_vi").toString();
            donViObjList.add(donViObj);
        }
        return donViObjList;
    }

    @Override
    public List getDanhSachNamVanBan() {
        String sql = "CALL LayDanhSachNamVanBan()";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql);
        return jdbcTemplate.queryForList(sql);
    }

    @Override
    public List getDanhSachCoQuanBanHanh() {
        String sql = "CALL LayDanhSachCoQuanBanHanh()";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql);
        ArrayList coQuanBanHanhObjList = new ArrayList();
        for (int i = 0; i < t.size(); i++) {
            Object newtmp = t.get(i);
            LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
            CoQuanBanHanhObj coQuanBanHanhObj = new CoQuanBanHanhObj();
            coQuanBanHanhObj.maCoQuanBanHanh = Long.parseLong(map.get("ma_co_quan_ban_hanh").toString());
            coQuanBanHanhObj.tenCoQuan = map.get("ten_co_quan").toString();
            coQuanBanHanhObjList.add(coQuanBanHanhObj);
        }
        return coQuanBanHanhObjList;
    }

    @Override
    public List getDanhSachVanBanTheoDonVi_Nam(String donVi, String nam) {
        String sql = "CALL LayDanhSachVanBanTheoDonVi_Nam(?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql, new Object []{donVi, nam});
        ArrayList vanBanObjList = new ArrayList();
        for (int i = 0; i < t.size(); i++) {
            Object newtmp = t.get(i);
            LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
            VanBanObj vanBanObj = new VanBanObj();
            vanBanObj.maVanBan = Long.parseLong(map.get("ma_van_ban").toString());
            vanBanObj.donVi = map.get("don_vi").toString();
            vanBanObj.coQuanBanHanh = Long.parseLong(map.get("co_quan_ban_hanh").toString());
            vanBanObj.noiDungTrichYeu = map.get("noi_dung_trich_yeu").toString();
            vanBanObj.ngayBanHanh = map.get("ngay_ban_hanh").toString();
            vanBanObj.soCongVan = map.get("so_cong_van").toString();
            vanBanObj.tapTin = map.get("tap_tin").toString();
            vanBanObj.trangThai = Integer.parseInt(map.get("trang_thai").toString());
            vanBanObj.nguoiTao = Long.parseLong(map.get("nguoi_tao").toString());
            vanBanObj.tenCoQuan = map.get("ten_co_quan").toString();
            vanBanObjList.add(vanBanObj);
        }
        return vanBanObjList;
    }

    @Override
    public TinhThanhObj getTinhThanh(long maTinhThanh) {
        String sql = "CALL LayTinhThanhTheoMa(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List tmp = jdbcTemplate.queryForList(sql, new Object[] {maTinhThanh});
        Object newtmp = tmp.get(0);
        LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
        TinhThanhObj tinhThanhObj = new TinhThanhObj();
        tinhThanhObj.maTinhThanh = Long.parseLong(map.get("ma_tinh_thanh").toString());
        tinhThanhObj.tenTinhThanh = map.get("ten_tinh_thanh").toString();
        return tinhThanhObj;
    }

    @Override
    public DonViObj getDonVi(String maDonVi) {
        String sql = "CALL LayTinhThanhTheoMa(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List tmp = jdbcTemplate.queryForList(sql, new Object[] {maDonVi});
        Object newtmp = tmp.get(0);
        LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
        DonViObj donViObj = new DonViObj();
        donViObj.maDonVi = map.get("ma_don_vi").toString();
        donViObj.tenDonVi = map.get("ten_don_vi").toString();
        return donViObj;
    }

    @Override
    public CoQuanBanHanhObj getCoQuanBanHanh(long maCoQuan) {
        String sql = "CALL LayDanhSachCoQuanBanHanh(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List tmp = jdbcTemplate.queryForList(sql, new Object[] {maCoQuan});
        Object newtmp = tmp.get(0);
        LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
        CoQuanBanHanhObj coQuanBanHanhObj = new CoQuanBanHanhObj();
        coQuanBanHanhObj.maCoQuanBanHanh = Long.parseLong(map.get("ma_co_quan_ban_hanh").toString());
        coQuanBanHanhObj.tenCoQuan = map.get("ten_co_quan").toString();
        return coQuanBanHanhObj;
    }

    @Override
    public VanBanObj getVanBan(long maVanBan) {
        String sql = "CALL LayVanBanTheoMa(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List tmp = jdbcTemplate.queryForList(sql, new Object[] {maVanBan});
        Object newtmp = tmp.get(0);
        LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
        VanBanObj vanBanObj = new VanBanObj();
        vanBanObj.maVanBan = Long.parseLong(map.get("ma_van_ban").toString());
        vanBanObj.donVi = map.get("don_vi").toString();
        vanBanObj.coQuanBanHanh = Long.parseLong(map.get("co_quan_ban_hanh").toString());
        vanBanObj.noiDungTrichYeu = map.get("noi_dung_trich_yeu").toString();
        vanBanObj.ngayBanHanh = map.get("ngay_ban_hanh").toString();
        vanBanObj.soCongVan = map.get("so_cong_van").toString();
        vanBanObj.tapTin = map.get("tap_tin").toString();
        vanBanObj.trangThai = Integer.parseInt(map.get("trang_thai").toString());
        vanBanObj.nguoiTao = Long.parseLong(map.get("nguoi_tao").toString());
        return vanBanObj;
    }

    /*@Override
    public List danhSachVanBanGiam(String fieldname, String type) {
        String sql = "CALL SapXepVanBanGiam(?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForList(sql, new Object[]{fieldname, type});
    }

    @Override
    public List danhSachVanBanTang(String fieldname, String type) {
        String sql = "CALL SapXepVanBanTang(?, ?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForList(sql, new Object[]{fieldname, type});
    }*/

    @Override
    public void addVanBan(VanBanObj obj) {
        try {
            String sql = "CALL ThemMoiVanBan(?,?,?,?,?,?,?,?)";
            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            jdbcTemplate.update(sql, new Object[]{
                obj.donVi,
                obj.coQuanBanHanh,
                obj.noiDungTrichYeu,
                obj.ngayBanHanh,
                obj.soCongVan,
                obj.tapTin,
                obj.trangThai,
                obj.nguoiTao
            });
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void updateVanBan(VanBanObj obj) {
        try {
            String sql = "CALL CapNhatVanBan(?,?,?,?,?,?,?,?,?)";
            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            jdbcTemplate.update(sql, new Object[]{
                obj.maVanBan,
                obj.donVi,
                obj.coQuanBanHanh,
                obj.noiDungTrichYeu,
                obj.ngayBanHanh,
                obj.soCongVan,
                obj.tapTin,
                obj.trangThai,
                obj.nguoiTao
            });
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void deleteVanBan(long maVanBan) {
        String sql = "CALL XoaVanBan(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        try {
            jdbcTemplate.update(sql, maVanBan);
        }
        catch (Exception e) {
            throw e;
        }
    }

    @Override
    public List getDanhSachVanBanTheoNoidungTrichYeu_DonVi_Nam(String noiDungTrichYeu, String donVi, Long nam) {
        String sql = "CALL LayDanhSachVanBanTheoNoidungTrichYeu_DonVi_Nam(?,?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql, new Object []{noiDungTrichYeu, donVi, nam});
        ArrayList vanBanObjList = new ArrayList();
        for (int i = 0; i < t.size(); i++) {
            Object newtmp = t.get(i);
            LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
            VanBanObj vanBanObj = new VanBanObj();
            vanBanObj.maVanBan = Long.parseLong(map.get("ma_van_ban").toString());
            vanBanObj.donVi = map.get("don_vi").toString();
            vanBanObj.coQuanBanHanh = Long.parseLong(map.get("co_quan_ban_hanh").toString());
            vanBanObj.noiDungTrichYeu = map.get("noi_dung_trich_yeu").toString();
            vanBanObj.ngayBanHanh = map.get("ngay_ban_hanh").toString();
            vanBanObj.soCongVan = map.get("so_cong_van").toString();
            vanBanObj.tapTin = map.get("tap_tin").toString();
            vanBanObj.trangThai = Integer.parseInt(map.get("trang_thai").toString());
            vanBanObj.nguoiTao = Long.parseLong(map.get("nguoi_tao").toString());
            vanBanObj.tenCoQuan = map.get("ten_co_quan").toString();
            vanBanObjList.add(vanBanObj);
        }
        return vanBanObjList;
    }

//    @Override
//    public VanBanObj getVanBan(long maVanBan) {
//        String sql = "CALL DanhSachVanBanTheoMa(?)";
//        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
//        return jdbcTemplate.queryForList(sql, maVanBan);
//        return (VanBanObj)jdbcTemplate.queryForObject(sql, new Object[] { maVanBan }, new BeanPropertyRowMapper(VanBanObj.class));
//    }

    @Override
    public List getDanhSachVanBanIn(String coQuanBanHanh, String donVi) {
        String sql = "CALL LayDanhSachVanBanIn(?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql, new Object []{coQuanBanHanh, donVi});
        ArrayList vanBanObjList = new ArrayList();
        for (int i = 0; i < t.size(); i++) {
            Object newtmp = t.get(i);
            LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
            VanBanObj vanBanObj = new VanBanObj();
            vanBanObj.maVanBan = Long.parseLong(map.get("ma_van_ban").toString());
            vanBanObj.donVi = map.get("don_vi").toString();
            vanBanObj.coQuanBanHanh = Long.parseLong(map.get("co_quan_ban_hanh").toString());
            vanBanObj.noiDungTrichYeu = map.get("noi_dung_trich_yeu").toString();
            vanBanObj.ngayBanHanh = map.get("ngay_ban_hanh").toString();
            vanBanObj.soCongVan = map.get("so_cong_van").toString();
            vanBanObj.tapTin = map.get("tap_tin").toString();
            vanBanObj.trangThai = Integer.parseInt(map.get("trang_thai").toString());
            vanBanObj.nguoiTao = Long.parseLong(map.get("nguoi_tao").toString());
            vanBanObjList.add(vanBanObj);
        }
        return vanBanObjList;
    }
}
