package vn.vnpt.chidaotuyen.dao.quanlynckh.hangdetai;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.util.LinkedCaseInsensitiveMap;
import vn.vnpt.chidaotuyen.Obj.quanlynckh.HangDeTaiObj;

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
        ArrayList hangDeTaiObjList = new ArrayList();
        for (int i = 0; i < t.size(); i++) {
            Object newtmp = t.get(i);
            LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
            HangDeTaiObj hangDeTaiObj = new HangDeTaiObj();
            hangDeTaiObj.maHangDeTai = Long.parseLong(map.get("ma_hang_de_tai").toString());
            hangDeTaiObj.hangDeTai = map.get("hang_de_tai").toString();
            hangDeTaiObj.viTri = Long.parseLong(map.get("vi_tri").toString());
            hangDeTaiObj.trangThai = Integer.parseInt(map.get("trang_thai").toString());
            hangDeTaiObjList.add(hangDeTaiObj);
        }
        return hangDeTaiObjList;
    }

    @Override
    public List getDanhSachHangDeTaiTheoTen(String hangDeTai) {
        String sql = "CALL LayDanhSachHangDeTaiTheoTen(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql, new Object[]{hangDeTai});
        ArrayList hangDeTaiObjList = new ArrayList();
        for (int i = 0; i < t.size(); i++) {
            Object newtmp = t.get(i);
            LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
            HangDeTaiObj hangDeTaiObj = new HangDeTaiObj();
            hangDeTaiObj.maHangDeTai = Long.parseLong(map.get("ma_hang_de_tai").toString());
            hangDeTaiObj.hangDeTai = map.get("hang_de_tai").toString();
            hangDeTaiObj.viTri = Long.parseLong(map.get("vi_tri").toString());
            hangDeTaiObj.trangThai = Integer.parseInt(map.get("trang_thai").toString());
            hangDeTaiObjList.add(hangDeTaiObj);
        }
        return hangDeTaiObjList;
    }

    @Override
    public HangDeTaiObj getHangDeTai(Long maHangDeTai) {
        String sql = "CALL LayHangDeTai(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql, new Object[]{ maHangDeTai });
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
        HangDeTaiObj hangDeTaiObj = new HangDeTaiObj();
        hangDeTaiObj.maHangDeTai = Long.parseLong(map.get("ma_hang_de_tai").toString());
        hangDeTaiObj.hangDeTai = map.get("hang_de_tai").toString();
        hangDeTaiObj.viTri = Long.parseLong(map.get("vi_tri").toString());
        hangDeTaiObj.trangThai = Integer.parseInt(map.get("trang_thai").toString());
        return hangDeTaiObj;
    }

    @Override
    public void addHangDeTai(HangDeTaiObj obj) {
        try {
            String sql = "CALL ThemHangDeTai(?,?,?)";
            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            jdbcTemplate.update(sql, new Object[]{
                obj.hangDeTai,
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
                obj.hangDeTai,
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
