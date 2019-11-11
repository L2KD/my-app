package vn.vnpt.quanlynckh.dao.chuthe;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.util.LinkedCaseInsensitiveMap;
import vn.vnpt.quanlynckh.obj.ChuTheObj;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.List;

@Repository
public class ChuTheDAOImp implements ChuTheDAO {
    @Autowired
    private DataSource dataSource;

    @Override
    public List getDanhSachChuThe() {
        String sql = "CALL LayDanhSachChuThe()";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql);
        ArrayList loaiDeTaiObjList = new ArrayList();
        for (int i = 0; i < t.size(); i++) {
            Object newtmp = t.get(i);
            LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
            ChuTheObj loaiDeTaiObj = new ChuTheObj();
            loaiDeTaiObj.maChuThe = Long.parseLong(map.get("ma_chu_the").toString());
            loaiDeTaiObj.chuTheDeTai = map.get("chu_the_de_tai").toString();
            loaiDeTaiObj.viTri = Long.parseLong(map.get("vi_tri").toString());
            loaiDeTaiObj.trangThai = Long.parseLong(map.get("trang_thai").toString());
            loaiDeTaiObjList.add(loaiDeTaiObj);
        }
        return loaiDeTaiObjList;
    }

    @Override
    public ChuTheObj getChuThe(Long maChuThe) {
        String sql = "CALL LayChuTheTheoMa()";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql);
        try
        {
            t.get(0);
        }
        catch (Exception ex)
        {
            return new ChuTheObj();
        }
        Object newtmp = t.get(0);
        LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
        ChuTheObj loaiDeTaiObj = new ChuTheObj();
        loaiDeTaiObj.maChuThe = Long.parseLong(map.get("ma_chu_the").toString());
        loaiDeTaiObj.chuTheDeTai = map.get("chu_the_de_tai").toString();
        loaiDeTaiObj.viTri = Long.parseLong(map.get("vi_tri").toString());
        loaiDeTaiObj.trangThai = Long.parseLong(map.get("trang_thai").toString());
        return loaiDeTaiObj;
    }

    @Override
    public void addChuThe(ChuTheObj obj) {
        try {
            String sql = "CALL ThemMoiChuThe(?,?,?)";
            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            jdbcTemplate.update(sql, new Object[]{
                obj.chuTheDeTai,
                obj.viTri,
                obj.trangThai
            });
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void updateChuThe(ChuTheObj obj) {
        try {
            String sql = "CALL CapNhatChuThe(?,?,?,?)";
            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            jdbcTemplate.update(sql, new Object[]{
                obj.maChuThe,
                obj.chuTheDeTai,
                obj.viTri,
                obj.trangThai
            });
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void deleteChuThe(Long maChuThe) {
        String sql = "CALL XoaChuThe(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        try {
            jdbcTemplate.update(sql, maChuThe);
        }
        catch (Exception e) {
            throw e;
        }
    }
}
