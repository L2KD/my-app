package vn.vnpt.quanlynckh.dao.hangdetai;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.util.LinkedCaseInsensitiveMap;
import vn.vnpt.quanlynckh.obj.HangDeTaiObj;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.List;

@Repository
public class HangDeTaiDAOImp implements HangDeTaiDAO {
    @Autowired
    private DataSource dataSource;

    @Override
    public List getDanhSachHangDeTai() {
        String sql = "CALL LayDanhSachHangDeTai()";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql);
        ArrayList loaiDeTaiObjList = new ArrayList();
        for (int i = 0; i < t.size(); i++) {
            Object newtmp = t.get(i);
            LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
            HangDeTaiObj loaiDeTaiObj = new HangDeTaiObj();
            loaiDeTaiObj.maHangDeTai = Long.parseLong(map.get("ma_hang_de_tai").toString());
            loaiDeTaiObj.HangDeTai = map.get("hang_de_tai").toString();
            loaiDeTaiObj.viTri = Long.parseLong(map.get("vi_tri").toString());
            loaiDeTaiObj.trangThai = Long.parseLong(map.get("trang_thai").toString());
            loaiDeTaiObjList.add(loaiDeTaiObj);
        }
        return loaiDeTaiObjList;
    }

    @Override
    public HangDeTaiObj getHangDeTai(Long maHangDeTai) {
        String sql = "CALL LayHangDeTaiTheoMa()";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql);
        try
        {
            t.get(0);
        }
        catch (Exception ex)
        {
            return new HangDeTaiObj();
        }
        Object newtmp = t.get(0);
        LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
        HangDeTaiObj loaiDeTaiObj = new HangDeTaiObj();
        loaiDeTaiObj.maHangDeTai = Long.parseLong(map.get("ma_hang_de_tai").toString());
        loaiDeTaiObj.HangDeTai = map.get("hang_de_tai").toString();
        loaiDeTaiObj.viTri = Long.parseLong(map.get("vi_tri").toString());
        loaiDeTaiObj.trangThai = Long.parseLong(map.get("trang_thai").toString());
        return loaiDeTaiObj;
    }

    @Override
    public void addHangDeTai(HangDeTaiObj obj) {
        try {
            String sql = "CALL ThemMoiHangDeTai(?,?,?)";
            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            jdbcTemplate.update(sql, new Object[]{
                obj.HangDeTai,
                obj.viTri,
                obj.trangThai
            });
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void updateHangDeTai(HangDeTaiObj obj) {
        try {
            String sql = "CALL CapNhatHangDeTai(?,?,?,?)";
            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            jdbcTemplate.update(sql, new Object[]{
                obj.maHangDeTai,
                obj.HangDeTai,
                obj.viTri,
                obj.trangThai
            });
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void deleteHangDeTai(Long maHangDeTai) {
        String sql = "CALL XoaHangDeTai(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        try {
            jdbcTemplate.update(sql, maHangDeTai);
        }
        catch (Exception e) {
            throw e;
        }
    }
}
