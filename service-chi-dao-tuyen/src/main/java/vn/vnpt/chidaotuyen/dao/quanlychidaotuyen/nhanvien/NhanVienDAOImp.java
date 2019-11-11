package vn.vnpt.chidaotuyen.dao.quanlychidaotuyen.nhanvien;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.util.LinkedCaseInsensitiveMap;
import vn.vnpt.chidaotuyen.Obj.quanlychidaotuyen.NhanVienObj;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.List;

@Repository
public class NhanVienDAOImp implements NhanVienDAO {
    @Autowired
    private DataSource dataSource;

    @Override
    public List getDanhSachNhanVienTheoKhoaPhong(String maKhoaPhong) {
        String sql = "CALL LayDanhSachNhanVienTheoKhoaPhong(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql, new Object []{maKhoaPhong});
        ArrayList nhanVienObjList = new ArrayList();
        for (int i = 0; i < t.size(); i++) {
            Object newtmp = t.get(i);
            LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
            NhanVienObj nhanVienObj = new NhanVienObj();
            nhanVienObj.maNhanVien = Long.parseLong(map.get("ma_nhan_vien").toString());
            nhanVienObj.tenNhanVien = map.get("ten_nhan_vien").toString();
            nhanVienObj.khoaPhong = map.get("khoa_phong").toString();
            /*etc*/
            nhanVienObjList.add(nhanVienObj);
        }
        return nhanVienObjList;
    }

    @Override
    public List getDanhSachNhanVienTheoDonVi(String maDonVi) {
        String sql = "CALL LayDanhSachNhanVienTheoDonVi(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql, new Object []{maDonVi});
        ArrayList nhanVienObjList = new ArrayList();
        for (int i = 0; i < t.size(); i++) {
            Object newtmp = t.get(i);
            LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
            NhanVienObj nhanVienObj = new NhanVienObj();
            nhanVienObj.maNhanVien = Long.parseLong(map.get("ma_nhan_vien").toString());
            nhanVienObj.tenNhanVien = map.get("ten_nhan_vien").toString();
            nhanVienObj.khoaPhong = map.get("khoa_phong").toString();
            /*etc*/
            nhanVienObjList.add(nhanVienObj);
        }
        return nhanVienObjList;
    }
}
