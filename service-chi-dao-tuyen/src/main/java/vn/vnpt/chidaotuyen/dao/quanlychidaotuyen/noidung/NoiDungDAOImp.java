package vn.vnpt.chidaotuyen.dao.quanlychidaotuyen.noidung;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.util.LinkedCaseInsensitiveMap;
import vn.vnpt.chidaotuyen.Obj.quanlychidaotuyen.NoiDungObj;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.List;

@Repository
public class NoiDungDAOImp implements NoiDungDAO {
    @Autowired
    private DataSource dataSource;

    @Override
    public List layDanhSachNoiDung() {
        String sql = "CALL DanhSachNoiDung()";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql);
        ArrayList noiDungObjList = new ArrayList();
        for (int i = 0; i < t.size(); i++) {
            Object newtmp = t.get(i);
            LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
            NoiDungObj noiDungObj = new NoiDungObj();
            noiDungObj.maNoiDung = Long.parseLong(map.get("ma_noi_dung").toString());
            noiDungObj.noiDung = map.get("noi_dung").toString();
            noiDungObj.viTri = Long.parseLong(map.get("vi_tri").toString());
            noiDungObj.trangThai = Long.parseLong(map.get("trang_thai").toString());
            noiDungObj.nguoiTao = Long.parseLong(map.get("nguoi_tao").toString());
            noiDungObjList.add(noiDungObj);
        }
        return noiDungObjList;
    }

    @Override
    public List danhSachNoiDungGiam(String fieldname, String type) {
        String sql = "CALL SapXepNoiDungGiam(?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForList(sql, new Object[]{fieldname, type});
    }

    @Override
    public List danhSachNoiDungTang(String fieldname, String type) {
        String sql = "CALL SapXepNoiDungTang(?, ?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForList(sql, new Object[]{fieldname, type});
    }

    @Override
    public void capNhatNoiDung(NoiDungObj obj) {
        try {
            String sql = "CALL CapNhatNoiDung(?,?,?,?,?)";
            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            jdbcTemplate.update(sql, new Object[]{
                obj.maNoiDung,
                obj.noiDung,
                obj.viTri,
                obj.trangThai,
                obj.nguoiTao
            });
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void themNoiDung(NoiDungObj obj) {
        try {
            String sql = "CALL ThemNoiDung(?,?,?,?)";
            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            jdbcTemplate.update(sql, new Object[]{
                obj.noiDung,
                obj.viTri,
                obj.trangThai,
                obj.nguoiTao
            });
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void xoaNoiDung(long maNoiDung) {
        String sql = "CALL XoaNoiDung(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        try {
            jdbcTemplate.update(sql, maNoiDung);
        }
        catch (Exception e) {
            throw e;
        }
    }

    @Override
    public List layDanhSachNoiDungTheoTen(String noidung) {
        String sql = "CALL DanhSachNoiDungTheoTen(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql, new Object[] {noidung});
        ArrayList noiDungObjList = new ArrayList();
        for (int i = 0; i < t.size(); i++) {
            Object newtmp = t.get(i);
            LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
            NoiDungObj noiDungObj = new NoiDungObj();
            noiDungObj.maNoiDung = Long.parseLong(map.get("ma_noi_dung").toString());
            noiDungObj.noiDung = map.get("noi_dung").toString();
            noiDungObj.viTri = Long.parseLong(map.get("vi_tri").toString());
            noiDungObj.trangThai = Long.parseLong(map.get("trang_thai").toString());
            noiDungObj.nguoiTao = Long.parseLong(map.get("nguoi_tao").toString());
            noiDungObjList.add(noiDungObj);
        }
        return noiDungObjList;
    }

    @Override
    public NoiDungObj layNoiDung(long maNoiDung) {
        String sql = "CALL DanhSachNoiDungTheoMa(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List tmp = jdbcTemplate.queryForList(sql,new Object[] {maNoiDung});
        Object newtmp = tmp.get(0);
        LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
        NoiDungObj noiDungObj = new NoiDungObj();
        noiDungObj.maNoiDung = Long.parseLong(map.get("ma_noi_dung").toString());
        noiDungObj.noiDung = map.get("noi_dung").toString();
        noiDungObj.viTri = Long.parseLong(map.get("vi_tri").toString());
        noiDungObj.trangThai = Long.parseLong(map.get("trang_thai").toString());
        noiDungObj.nguoiTao = Long.parseLong(map.get("nguoi_tao").toString());
        return noiDungObj;
    }
}
