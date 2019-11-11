package vn.vnpt.chidaotuyen.dao.quanlynckh.detaidangky;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.util.LinkedCaseInsensitiveMap;
import vn.vnpt.chidaotuyen.Obj.quanlychidaotuyen.KhoaPhongObj;
import vn.vnpt.chidaotuyen.Obj.quanlynckh.DeTaiDangKyObj;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Repository
public class DeTaiDangKyDAOImp implements DeTaiDangKyDAO {
    
    @Autowired
    private DataSource dataSource;

    @Override
    public List getDanhSachDeTaiDangKy(String donVi, long nam) {
        String sql = "CALL LayDanhSachDeTaiDangKy(?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql, new Object[]{donVi, nam});
        ArrayList deTaiObjList = new ArrayList();
        for (int i = 0; i < t.size(); i++) {
            Object newtmp = t.get(i);
            LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
            DeTaiDangKyObj deTaiDeTaiObj = new DeTaiDangKyObj();
            deTaiDeTaiObj.maDeTai = Long.parseLong(map.get("ma_de_tai").toString());
            deTaiDeTaiObj.donVi = map.get("don_vi").toString();
            deTaiDeTaiObj.tenDeTai = map.get("ten_de_tai").toString();
            deTaiDeTaiObj.ngayDangKy = map.get("ngay_dang_ky").toString();
            deTaiDeTaiObj.khoaPhongChuNhiem = map.get("khoa_phong_chu_nhiem").toString();
            deTaiDeTaiObj.tapTin = map.get("tap_tin").toString();
            deTaiObjList.add(deTaiDeTaiObj);
        }
        return deTaiObjList;
    }

    @Override
    public List getDanhSachDeTaiDangKyTheoTen(String tenDeTai, String donVi, long nam) {
        String sql = "CALL LayDanhSachDeTaiDangKyTheoTen(?, ?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql, new Object[]{tenDeTai, donVi, nam});
        ArrayList deTaiObjList = new ArrayList();
        for (int i = 0; i < t.size(); i++) {
            Object newtmp = t.get(i);
            LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
            DeTaiDangKyObj deTaiDeTaiObj = new DeTaiDangKyObj();
            deTaiDeTaiObj.maDeTai = Long.parseLong(map.get("ma_de_tai").toString());
            deTaiDeTaiObj.donVi = map.get("don_vi").toString();
            deTaiDeTaiObj.tenDeTai = map.get("ten_de_tai").toString();
            deTaiDeTaiObj.ngayDangKy = map.get("ngay_dang_ky").toString();
            deTaiDeTaiObj.khoaPhongChuNhiem = map.get("khoa_phong_chu_nhiem").toString();
            deTaiDeTaiObj.tapTin = map.get("tap_tin").toString();
            deTaiObjList.add(deTaiDeTaiObj);
        }
        return deTaiObjList;
    }

    @Override
    public DeTaiDangKyObj getDeTaiDangKy(Long maDeTai) {
        String sql = "CALL LayDeTaiDangKy(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql, maDeTai);
        try
        {
            t.get(0);
        }
        catch (Exception ex)
        {
            return new DeTaiDangKyObj();
        }
        Object newtmp = t.get(0);
        LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
        DeTaiDangKyObj deTaiDeTaiObj = new DeTaiDangKyObj();
        deTaiDeTaiObj.maDeTai = Long.parseLong(map.get("ma_de_tai").toString());
        deTaiDeTaiObj.donVi = map.get("don_vi").toString();
        deTaiDeTaiObj.tenDeTai = map.get("ten_de_tai").toString();
        deTaiDeTaiObj.ngayDangKy = map.get("ngay_dang_ky").toString();
        deTaiDeTaiObj.khoaPhongChuNhiem = map.get("khoa_phong_chu_nhiem").toString();
        deTaiDeTaiObj.tapTin = map.get("tap_tin").toString();
        deTaiDeTaiObj.tenDonVi = map.get("ten_don_vi").toString();
        deTaiDeTaiObj.tenKhoaPhongChuNhiem = map.get("ten_khoa_phong_chu_nhiem").toString();
        return deTaiDeTaiObj;
    }

    @Override
    public void addDeTaiDangKy(DeTaiDangKyObj obj) {
        try {
            String sql = "CALL ThemDeTaiDangKy(?,?,?,?,?)";
            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            jdbcTemplate.update(sql, new Object[]{
                obj.donVi,
                obj.tenDeTai,
                obj.ngayDangKy,
                obj.khoaPhongChuNhiem,
                obj.tapTin
            });
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void addDeTaiDangKyKhoaPhong(long maDeTai, String maKhoaPhong) {
        Date date = new Date();
        try {
            String sql = "CALL ThemDeTaiDangKyKhoaPhong(?,?,?)";
            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            jdbcTemplate.update(sql, new Object[]{
                maDeTai,
                maKhoaPhong,
                "updated on " + date
            });
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void updateDeTaiDangKy(DeTaiDangKyObj obj) {
        try {
            String sql = "CALL CapNhatDeTaiDangKy(?,?,?,?,?,?)";
            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            jdbcTemplate.update(sql, new Object[]{
                obj.maDeTai,
                obj.donVi,
                obj.tenDeTai,
                obj.ngayDangKy,
                obj.khoaPhongChuNhiem,
                obj.tapTin
            });
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void deleteDeTaiDangKy(Long maDeTai) {
        String sql = "CALL XoaDeTaiDangKy(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        try {
            jdbcTemplate.update(sql, maDeTai);
        }
        catch (Exception e) {
            throw e;
        }
    }

    @Override
    public void deleteDeTaiDangKyKhoaPhong(Long maDeTai) {
        String sql = "CALL XoaDeTaiDangKyKhoaPhong(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        try {
            jdbcTemplate.update(sql, maDeTai);
        }
        catch (Exception e) {
            throw e;
        }
    }

    @Override
    public List getDanhSachKhoaPhongThucHienDeTaiDangKy(Long maDeTai) {
        String sql = "CALL LayDanhSachKhoaPhongThucHienDeTaiDangKy(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql, new Object[]{maDeTai});
        ArrayList khoaPhongObjList = new ArrayList();
        for (int i = 0; i < t.size(); i++) {
            Object newtmp = t.get(i);
            LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
            KhoaPhongObj khoaPhongObj = new KhoaPhongObj();
            khoaPhongObj.maKhoaPhong = map.get("ma_khoa_phong").toString();
            khoaPhongObj.tenKhoaPhong = map.get("ten_khoa_phong").toString();
            khoaPhongObjList.add(khoaPhongObj);
        }
        return khoaPhongObjList;
    }

    @Override
    public Long getMaDeTaiDangKyMax()
    {
        String sql = "CALL LayMaDeTaiMax()";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql);
        Long kq = Long.parseLong("0");
        try {
            t.get(0);
        }
        catch (Exception e){
            return Long.parseLong("0");
        }
        Object newtmp = t.get(0);
        LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
        kq = Long.parseLong(map.get("max_ma_de_tai").toString());
        return kq;
    }
}
