package vn.vnpt.chidaotuyen.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.util.LinkedCaseInsensitiveMap;
import vn.vnpt.chidaotuyen.Obj.TaiKhoanObj;

import javax.sql.DataSource;
import java.util.List;

@Repository
public class TaiKhoanDAOImp implements TaiKhoanDAO {

    @Autowired
    private DataSource dataSource;

    @Override
    public int checkLogin(String taiKhoan, String matKhau) {
        String sql = "SELECT * FROM TAI_KHOAN WHERE tai_khoan = ? AND mat_khau = ?";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql, new Object[]{taiKhoan, matKhau});
        if (t.size() >= 1)
            return 1;
        return 0;
    }

    @Override
    public TaiKhoanObj getThongTinTaiKhoan(String taiKhoan, String matKhau) {
        String sql = "CALL LayThongTinTaiKhoan(?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql, new Object[]{taiKhoan, matKhau});
        try
        {
            t.get(0);
        }
        catch (Exception ex)
        {
            return new TaiKhoanObj();
        }
        Object newtmp = t.get(0);
        LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
        TaiKhoanObj taiKhoanObj = new TaiKhoanObj();
        taiKhoanObj.maNhanVien = Long.parseLong(map.get("ma_nhan_vien").toString());
        taiKhoanObj.taiKhoan = map.get("tai_khoan").toString();
        taiKhoanObj.matKhau = map.get("mat_khau").toString();
        taiKhoanObj.phanQuyen = Long.parseLong(map.get("phan_quyen").toString());
        taiKhoanObj.tenNhanVien = map.get("ten_nhan_vien").toString();
        return taiKhoanObj;
    }
}
