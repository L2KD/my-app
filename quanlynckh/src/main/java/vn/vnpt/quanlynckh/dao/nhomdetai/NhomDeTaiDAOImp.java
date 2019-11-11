package vn.vnpt.quanlynckh.dao.nhomdetai;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.util.LinkedCaseInsensitiveMap;
import vn.vnpt.quanlynckh.obj.NhomDeTaiObj;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.List;

@Repository
public class NhomDeTaiDAOImp implements NhomDeTaiDAO {
    @Autowired
    private DataSource dataSource;

    @Override
    public List getDanhSachNhomDeTai() {
        String sql = "CALL LayDanhSachNhomDeTai()";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql);
        ArrayList nhomDeTaiObjList = new ArrayList();
        for (int i = 0; i < t.size(); i++) {
            Object newtmp = t.get(i);
            LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
            NhomDeTaiObj nhomDeTaiObj = new NhomDeTaiObj();
            nhomDeTaiObj.maNhomDeTai = Long.parseLong(map.get("ma_nhom_de_tai").toString());
            nhomDeTaiObj.nhomDeTai = map.get("nhom_de_tai").toString();
            nhomDeTaiObj.viTri = Long.parseLong(map.get("vi_tri").toString());
            nhomDeTaiObj.trangThai = Long.parseLong(map.get("trang_thai").toString());
            nhomDeTaiObjList.add(nhomDeTaiObj);
        }
        return nhomDeTaiObjList;
    }

    @Override
    public NhomDeTaiObj getNhomDeTai(Long maNhomDeTai) {
        String sql = "CALL LayNhomDeTaiTheoMa()";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql);
        try
        {
            t.get(0);
        }
        catch (Exception ex)
        {
            return new NhomDeTaiObj();
        }
        Object newtmp = t.get(0);
        LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
        NhomDeTaiObj nhomDeTaiObj = new NhomDeTaiObj();
        nhomDeTaiObj.maNhomDeTai = Long.parseLong(map.get("ma_nhom_de_tai").toString());
        nhomDeTaiObj.nhomDeTai = map.get("nhom_de_tai").toString();
        nhomDeTaiObj.viTri = Long.parseLong(map.get("vi_tri").toString());
        nhomDeTaiObj.trangThai = Long.parseLong(map.get("trang_thai").toString());
        return nhomDeTaiObj;
    }

    @Override
    public void addNhomDeTai(NhomDeTaiObj obj) {
        try {
            String sql = "CALL ThemMoiNhomDeTai(?,?,?)";
            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            jdbcTemplate.update(sql, new Object[]{
                obj.nhomDeTai,
                obj.viTri,
                obj.trangThai
            });
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void updateNhomDeTai(NhomDeTaiObj obj) {
        try {
            String sql = "CALL CapNhatNhomDeTai(?,?,?,?)";
            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            jdbcTemplate.update(sql, new Object[]{
                obj.maNhomDeTai,
                obj.nhomDeTai,
                obj.viTri,
                obj.trangThai
            });
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void deleteNhomDeTai(Long maNhomDeTai) {
        String sql = "CALL XoaNhomDeTai(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        try {
            jdbcTemplate.update(sql, maNhomDeTai);
        }
        catch (Exception e) {
            throw e;
        }
    }
}
