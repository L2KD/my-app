package vn.vnpt.chidaotuyen.dao.quanlynckh.chucvuhoidong;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.util.LinkedCaseInsensitiveMap;
import vn.vnpt.chidaotuyen.Obj.quanlynckh.ChucVuHoiDongObj;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.List;

@Repository
public class ChucVuHoiDongDAOImp implements ChucVuHoiDongDAO {
    @Autowired
    private DataSource dataSource;

    @Override
    public List getDanhSachChucVu() {
        String sql = "CALL LayDanhSachChucVuHoiDong()";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql);
        ArrayList chucVuHoiDongObjList = new ArrayList();
        for (int i = 0; i < t.size(); i++) {
            Object newtmp = t.get(i);
            LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
            ChucVuHoiDongObj chucVuHoiDongObj = new ChucVuHoiDongObj();
            chucVuHoiDongObj.maChucVu = Long.parseLong(map.get("ma_chuc_vu").toString());
            chucVuHoiDongObj.chucVu = map.get("chuc_vu").toString();
            chucVuHoiDongObj.viTri = Long.parseLong(map.get("vi_tri").toString());
            chucVuHoiDongObj.trangThai = Integer.parseInt(map.get("trang_thai").toString());
            chucVuHoiDongObjList.add(chucVuHoiDongObj);
        }
        return chucVuHoiDongObjList;
    }

    @Override
    public List getDanhSachChucVuTheoTen(String chucVu) {
        String sql = "CALL LayDanhSachChucVuTheoTen(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql, new Object[]{chucVu});
        ArrayList chucVuHoiDongObjList = new ArrayList();
        for (int i = 0; i < t.size(); i++) {
            Object newtmp = t.get(i);
            LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
            ChucVuHoiDongObj chucVuHoiDongObj = new ChucVuHoiDongObj();
            chucVuHoiDongObj.maChucVu = Long.parseLong(map.get("ma_chuc_vu").toString());
            chucVuHoiDongObj.chucVu = map.get("chuc_vu").toString();
            chucVuHoiDongObj.viTri = Long.parseLong(map.get("vi_tri").toString());
            chucVuHoiDongObj.trangThai = Integer.parseInt(map.get("trang_thai").toString());
            chucVuHoiDongObjList.add(chucVuHoiDongObj);
        }
        return chucVuHoiDongObjList;
    }

    @Override
    public ChucVuHoiDongObj getChucVu(Long maChucVu) {
        String sql = "CALL LayChucVuHoiDong(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql, new Object[]{maChucVu});
        try
        {
            t.get(0);
        }
        catch (Exception ex)
        {
            return new ChucVuHoiDongObj();
        }
        Object newtmp = t.get(0);
        LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
        ChucVuHoiDongObj chucVuHoiDongObj = new ChucVuHoiDongObj();
        chucVuHoiDongObj.maChucVu = Long.parseLong(map.get("ma_chuc_vu").toString());
        chucVuHoiDongObj.chucVu = map.get("chuc_vu").toString();
        chucVuHoiDongObj.viTri = Long.parseLong(map.get("vi_tri").toString());
        chucVuHoiDongObj.trangThai = Integer.parseInt(map.get("trang_thai").toString());
        return chucVuHoiDongObj;
    }

    @Override
    public void addChucVu(ChucVuHoiDongObj obj) {
        try {
            String sql = "CALL ThemChucVuHoiDong(?,?,?)";
            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            jdbcTemplate.update(sql, new Object[]{
                obj.chucVu,
                obj.viTri,
                obj.trangThai
            });
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void updateChucVu(ChucVuHoiDongObj obj) {
        try {
            String sql = "CALL CapNhatChucVuHoiDong(?,?,?,?)";
            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            jdbcTemplate.update(sql, new Object[]{
                obj.maChucVu,
                obj.chucVu,
                obj.viTri,
                obj.trangThai
            });
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void deleteChucVu(Long maChucVu) {
        String sql = "CALL XoaChucVuHoiDong(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        try {
            jdbcTemplate.update(sql, maChucVu);
        }
        catch (Exception e) {
            throw e;
        }
    }
}
