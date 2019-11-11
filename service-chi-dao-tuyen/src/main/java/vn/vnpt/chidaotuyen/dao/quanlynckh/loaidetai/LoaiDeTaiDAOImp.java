package vn.vnpt.chidaotuyen.dao.quanlynckh.loaidetai;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.util.LinkedCaseInsensitiveMap;
import vn.vnpt.chidaotuyen.Obj.quanlynckh.LoaiDeTaiObj;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.List;

@Repository
public class LoaiDeTaiDAOImp implements LoaiDeTaiDAO {

    @Autowired
    private DataSource dataSource;

    @Override
    public List getDanhSachLoaiDeTai() {
        String sql = "CALL LayDanhSachLoaiDeTai()";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql);
        ArrayList loaiDeTaiObjList = new ArrayList();
        for (int i = 0; i < t.size(); i++) {
            Object newtmp = t.get(i);
            LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
            LoaiDeTaiObj loaiDeTaiObj = new LoaiDeTaiObj();
            loaiDeTaiObj.maLoaiDeTai = Long.parseLong(map.get("ma_loai_de_tai").toString());
            loaiDeTaiObj.loaiDeTai = map.get("loai_de_tai").toString();
            loaiDeTaiObj.viTri = Long.parseLong(map.get("vi_tri").toString());
            loaiDeTaiObj.trangThai = Integer.parseInt(map.get("trang_thai").toString());
            loaiDeTaiObjList.add(loaiDeTaiObj);
        }
        return loaiDeTaiObjList;
    }

    @Override
    public List getDanhSachLoaiDeTaiTheoTen(String loaiDeTai) {
        String sql = "CALL LayDanhSachLoaiDeTaiTheoTen(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql, new Object[]{loaiDeTai});
        ArrayList loaiDeTaiObjList = new ArrayList();
        for (int i = 0; i < t.size(); i++) {
            Object newtmp = t.get(i);
            LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
            LoaiDeTaiObj loaiDeTaiObj = new LoaiDeTaiObj();
            loaiDeTaiObj.maLoaiDeTai = Long.parseLong(map.get("ma_loai_de_tai").toString());
            loaiDeTaiObj.loaiDeTai = map.get("loai_de_tai").toString();
            loaiDeTaiObj.viTri = Long.parseLong(map.get("vi_tri").toString());
            loaiDeTaiObj.trangThai = Integer.parseInt(map.get("trang_thai").toString());
            loaiDeTaiObjList.add(loaiDeTaiObj);
        }
        return loaiDeTaiObjList;
    }

    @Override
    public LoaiDeTaiObj getLoaiDeTai(Long maLoaiDeTai) {
        String sql = "CALL LayLoaiDeTai(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql, new Object[]{ maLoaiDeTai });
        try
        {
            t.get(0);
        }
        catch (Exception ex)
        {
            return new LoaiDeTaiObj();
        }
        Object newtmp = t.get(0);
        LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
        LoaiDeTaiObj loaiDeTaiObj = new LoaiDeTaiObj();
        loaiDeTaiObj.maLoaiDeTai = Long.parseLong(map.get("ma_loai_de_tai").toString());
        loaiDeTaiObj.loaiDeTai = map.get("loai_de_tai").toString();
        loaiDeTaiObj.viTri = Long.parseLong(map.get("vi_tri").toString());
        loaiDeTaiObj.trangThai = Integer.parseInt(map.get("trang_thai").toString());
        return loaiDeTaiObj;
    }

    @Override
    public void addLoaiDeTai(LoaiDeTaiObj obj) {
        try {
            String sql = "CALL ThemLoaiDeTai(?,?,?)";
            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            jdbcTemplate.update(sql, new Object[]{
                obj.loaiDeTai,
                obj.viTri,
                obj.trangThai
            });
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void updateLoaiDeTai(LoaiDeTaiObj obj) {
        try {
            String sql = "CALL CapNhatLoaiDeTai(?,?,?,?)";
            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            jdbcTemplate.update(sql, new Object[]{
                obj.maLoaiDeTai,
                obj.loaiDeTai,
                obj.viTri,
                obj.trangThai
            });
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void deleteLoaiDeTai(Long maLoaiDeTai) {
        String sql = "CALL XoaLoaiDeTai(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        try {
            jdbcTemplate.update(sql, maLoaiDeTai);
        }
        catch (Exception e) {
            throw e;
        }
    }
}
