package vn.vnpt.quanlynckh.dao.chucvu;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.util.LinkedCaseInsensitiveMap;
import vn.vnpt.quanlynckh.obj.ChucVuObj;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.List;

@Repository
public class ChucVuDAOImp implements ChucVuDAO {
    @Autowired
    private DataSource dataSource;

    @Override
    public List getDanhSachChucVu() {
        String sql = "CALL LayDanhSachChucVu()";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql);
        ArrayList loaiDeTaiObjList = new ArrayList();
        for (int i = 0; i < t.size(); i++) {
            Object newtmp = t.get(i);
            LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
            ChucVuObj loaiDeTaiObj = new ChucVuObj();
            loaiDeTaiObj.maChucVu = Long.parseLong(map.get("ma_chuc_vu").toString());
            loaiDeTaiObj.tenChucVu = map.get("ten_chuc_vu").toString();
            loaiDeTaiObj.viTri = Long.parseLong(map.get("vi_tri").toString());
            loaiDeTaiObj.trangThai = Long.parseLong(map.get("trang_thai").toString());
            loaiDeTaiObjList.add(loaiDeTaiObj);
        }
        return loaiDeTaiObjList;
    }

    @Override
    public ChucVuObj getChucVu(Long maChucVu) {
        String sql = "CALL LayChucVuTheoMa()";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql);
        try
        {
            t.get(0);
        }
        catch (Exception ex)
        {
            return new ChucVuObj();
        }
        Object newtmp = t.get(0);
        LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
        ChucVuObj loaiDeTaiObj = new ChucVuObj();
        loaiDeTaiObj.maChucVu = Long.parseLong(map.get("ma_chuc_vu").toString());
        loaiDeTaiObj.tenChucVu = map.get("ten_chuc_vu").toString();
        loaiDeTaiObj.viTri = Long.parseLong(map.get("vi_tri").toString());
        loaiDeTaiObj.trangThai = Long.parseLong(map.get("trang_thai").toString());
        return loaiDeTaiObj;
    }

    @Override
    public void addChucVu(ChucVuObj obj) {
        try {
            String sql = "CALL ThemMoiChucVu(?,?,?)";
            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            jdbcTemplate.update(sql, new Object[]{
                obj.tenChucVu,
                obj.viTri,
                obj.trangThai
            });
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void updateChucVu(ChucVuObj obj) {
        try {
            String sql = "CALL CapNhatChucVu(?,?,?,?)";
            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            jdbcTemplate.update(sql, new Object[]{
                obj.maChucVu,
                obj.tenChucVu,
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
        String sql = "CALL XoaChucVu(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        try {
            jdbcTemplate.update(sql, maChucVu);
        }
        catch (Exception e) {
            throw e;
        }
    }
}
