package vn.vnpt.chidaotuyen.dao.quanlynckh.detainam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.util.LinkedCaseInsensitiveMap;
import vn.vnpt.chidaotuyen.Obj.quanlychidaotuyen.NhanVienObj;
import vn.vnpt.chidaotuyen.Obj.quanlynckh.DeTaiNamObj;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Repository
public class DeTaiNamDAOImp implements DeTaiNamDAO {

    @Autowired
    private DataSource dataSource;
    
    @Override
    public List getDanhSachDeTaiNam(String maDonVi, Long nam, int trangThai) {
        String sql = "CALL LayDanhSachDeTaiNam(?,?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql, new Object[]{maDonVi, nam, trangThai});
        ArrayList deTaiNamObjList = new ArrayList();
        for (int i = 0; i < t.size(); i++) {
            Object newtmp = t.get(i);
            LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
            DeTaiNamObj deTaiNamObj = new DeTaiNamObj();
            deTaiNamObj.maDeTai = Long.parseLong(map.get("ma_de_tai").toString());
            deTaiNamObj.nam = Long.parseLong(map.get("nam").toString());
            deTaiNamObj.tenDeTai = map.get("ten_de_tai").toString();
            deTaiNamObj.trangThai = Integer.parseInt(map.get("trang_thai").toString());
            deTaiNamObj.loaiDeTai = Long.parseLong(map.get("loai_de_tai").toString());
            deTaiNamObj.hangDeTai = Long.parseLong(map.get("hang_de_tai").toString());
            deTaiNamObj.nhomDeTai = Long.parseLong(map.get("nhom_de_tai").toString());
            deTaiNamObj.chuThe = Long.parseLong(map.get("chu_the").toString());
            deTaiNamObj.chuNhiem = Long.parseLong(map.get("chu_nhiem").toString());
            deTaiNamObj.tenLoaiDeTai = map.get("ten_loai_de_tai").toString();
            deTaiNamObj.tenHangDeTai = map.get("ten_hang_de_tai").toString();
            deTaiNamObj.tenNhomDeTai = map.get("ten_nhom_de_tai").toString();
            deTaiNamObj.tenChuThe = map.get("ten_chu_the").toString();
            deTaiNamObj.tenChuNhiem = map.get("ten_chu_nhiem").toString();
            deTaiNamObj.donVi = map.get("don_vi").toString();
            deTaiNamObjList.add(deTaiNamObj);
        }
        return deTaiNamObjList;
    }

    @Override
    public List getDanhSachDeTaiNamTheoTen(String tenDeTai, String maDonVi, Long nam, int trangThai) {
        String sql = "CALL LayDanhSachDeTaiNamTheoTen(?,?,?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql, new Object[]{tenDeTai, maDonVi, nam, trangThai});
        ArrayList deTaiNamObjList = new ArrayList();
        for (int i = 0; i < t.size(); i++) {
            Object newtmp = t.get(i);
            LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
            DeTaiNamObj deTaiNamObj = new DeTaiNamObj();
            deTaiNamObj.maDeTai = Long.parseLong(map.get("ma_de_tai").toString());
            deTaiNamObj.nam = Long.parseLong(map.get("nam").toString());
            deTaiNamObj.tenDeTai = map.get("ten_de_tai").toString();
            deTaiNamObj.trangThai = Integer.parseInt(map.get("trang_thai").toString());
            deTaiNamObj.loaiDeTai = Long.parseLong(map.get("loai_de_tai").toString());
            deTaiNamObj.hangDeTai = Long.parseLong(map.get("hang_de_tai").toString());
            deTaiNamObj.nhomDeTai = Long.parseLong(map.get("nhom_de_tai").toString());
            deTaiNamObj.chuThe = Long.parseLong(map.get("chu_the").toString());
            deTaiNamObj.chuNhiem = Long.parseLong(map.get("chu_nhiem").toString());
            deTaiNamObj.tenLoaiDeTai = map.get("ten_loai_de_tai").toString();
            deTaiNamObj.tenHangDeTai = map.get("ten_hang_de_tai").toString();
            deTaiNamObj.tenNhomDeTai = map.get("ten_nhom_de_tai").toString();
            deTaiNamObj.tenChuThe = map.get("ten_chu_the").toString();
            deTaiNamObj.tenChuNhiem = map.get("ten_chu_nhiem").toString();
            deTaiNamObj.donVi = map.get("don_vi").toString();
            deTaiNamObjList.add(deTaiNamObj);
        }
        return deTaiNamObjList;
    }

    @Override
    public List getDanhSachNguoiThucHien(Long maDeTai) {
        String sql = "CALL LayDanhSachDeTaiNam_NguoiThucHien(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql, new Object[]{maDeTai});
        ArrayList nhanVienObjList = new ArrayList();
        for (int i = 0; i < t.size(); i++) {
            Object newtmp = t.get(i);
            LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
            NhanVienObj nhanVienObj = new NhanVienObj();
            nhanVienObj.maNhanVien = Long.parseLong(map.get("ma_nhan_vien").toString());
            nhanVienObj.tenNhanVien = map.get("ten_nhan_vien").toString();
            nhanVienObjList.add(nhanVienObj);
        }
        return nhanVienObjList;
    }

    @Override
    public DeTaiNamObj getDeTaiNam(Long maDeTai) {
        String sql = "CALL LayDeTaiNam(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql, maDeTai);
        try
        {
            t.get(0);
        }
        catch (Exception ex)
        {
            return new DeTaiNamObj();
        }
        Object newtmp = t.get(0);
        LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
        DeTaiNamObj deTaiNamObj = new DeTaiNamObj();
        deTaiNamObj.maDeTai = Long.parseLong(map.get("ma_de_tai").toString());
        deTaiNamObj.nam = Long.parseLong(map.get("nam").toString());
        deTaiNamObj.tenDeTai = map.get("ten_de_tai").toString();
        deTaiNamObj.trangThai = Integer.parseInt(map.get("trang_thai").toString());
        deTaiNamObj.loaiDeTai = Long.parseLong(map.get("loai_de_tai").toString());
        deTaiNamObj.hangDeTai = Long.parseLong(map.get("hang_de_tai").toString());
        deTaiNamObj.nhomDeTai = Long.parseLong(map.get("nhom_de_tai").toString());
        deTaiNamObj.chuThe = Long.parseLong(map.get("chu_the").toString());
        deTaiNamObj.chuNhiem = Long.parseLong(map.get("chu_nhiem").toString());
        deTaiNamObj.tenLoaiDeTai = map.get("ten_loai_de_tai").toString();
        deTaiNamObj.tenHangDeTai = map.get("ten_hang_de_tai").toString();
        deTaiNamObj.tenNhomDeTai = map.get("ten_nhom_de_tai").toString();
        deTaiNamObj.tenChuThe = map.get("ten_chu_the").toString();
        deTaiNamObj.tenChuNhiem = map.get("ten_chu_nhiem").toString();
        deTaiNamObj.donVi = map.get("don_vi").toString();
        return deTaiNamObj;
    }

    @Override
    public void updateDeTaiNam(DeTaiNamObj obj) {
        try {
            String sql = "CALL CapNhatDeTaiNam(?,?,?,?,?,?,?)";
            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            jdbcTemplate.update(sql, new Object[]{
                obj.maDeTai,
                obj.nam,
                obj.loaiDeTai,
                obj.hangDeTai,
                obj.nhomDeTai,
                obj.chuThe,
                obj.chuNhiem
            });
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void deleteDeTaiNam_NguoiThucHien(Long maDeTai) {
        String sql = "CALL XoaDeTaiNam_NguoiThucHien(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        try {
            jdbcTemplate.update(sql, maDeTai);
        }
        catch (Exception e) {
            throw e;
        }
    }

    @Override
    public void addDeTaiNam_NguoiThucHien(Long maDeTai, Long maNhanVien) {
        Date date = new Date();
        try {
            String sql = "CALL ThemDeTaiNam_NguoiThucHien(?,?,?)";
            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            jdbcTemplate.update(sql, new Object[]{
                maDeTai,
                maNhanVien,
                "Updated: " + date
            });
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }
}
