package vn.vnpt.chidaotuyen.dao.quanlynckh.chuthe;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.util.LinkedCaseInsensitiveMap;
import vn.vnpt.chidaotuyen.Obj.quanlynckh.ChuTheObj;

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
        ArrayList chuTheDeTaiObjList = new ArrayList();
        for (int i = 0; i < t.size(); i++) {
            Object newtmp = t.get(i);
            LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
            ChuTheObj chuTheDeTaiObj = new ChuTheObj();
            chuTheDeTaiObj.maChuThe = Long.parseLong(map.get("ma_chu_the").toString());
            chuTheDeTaiObj.chuTheDeTai = map.get("chu_the_de_tai").toString();
            chuTheDeTaiObj.viTri = Long.parseLong(map.get("vi_tri").toString());
            chuTheDeTaiObj.trangThai = Integer.parseInt(map.get("trang_thai").toString());
            chuTheDeTaiObjList.add(chuTheDeTaiObj);
        }
        return chuTheDeTaiObjList;
    }

    @Override
    public List getDanhSachChuTheTheoTen(String chuTheDeTai) {
        String sql = "CALL LayDanhSachChuTheTheoTen(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql, new Object[]{chuTheDeTai});
        ArrayList chuTheDeTaiObjList = new ArrayList();
        for (int i = 0; i < t.size(); i++) {
            Object newtmp = t.get(i);
            LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
            ChuTheObj chuTheDeTaiObj = new ChuTheObj();
            chuTheDeTaiObj.maChuThe = Long.parseLong(map.get("ma_chu_the").toString());
            chuTheDeTaiObj.chuTheDeTai = map.get("chu_the_de_tai").toString();
            chuTheDeTaiObj.viTri = Long.parseLong(map.get("vi_tri").toString());
            chuTheDeTaiObj.trangThai = Integer.parseInt(map.get("trang_thai").toString());
            chuTheDeTaiObjList.add(chuTheDeTaiObj);
        }
        return chuTheDeTaiObjList;
    }

    @Override
    public ChuTheObj getChuThe(Long maChuThe) {
        String sql = "CALL LayChuThe(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql, new Object[]{ maChuThe });
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
        ChuTheObj chuTheDeTaiObj = new ChuTheObj();
        chuTheDeTaiObj.maChuThe = Long.parseLong(map.get("ma_chu_the").toString());
        chuTheDeTaiObj.chuTheDeTai = map.get("chu_the_de_tai").toString();
        chuTheDeTaiObj.viTri = Long.parseLong(map.get("vi_tri").toString());
        chuTheDeTaiObj.trangThai = Integer.parseInt(map.get("trang_thai").toString());
        return chuTheDeTaiObj;
    }

    @Override
    public void addChuThe(ChuTheObj obj) {
        try {
            String sql = "CALL ThemChuThe(?,?,?)";
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
