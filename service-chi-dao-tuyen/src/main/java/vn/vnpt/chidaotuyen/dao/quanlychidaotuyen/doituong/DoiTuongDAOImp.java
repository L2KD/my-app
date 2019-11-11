package vn.vnpt.chidaotuyen.dao.quanlychidaotuyen.doituong;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.util.LinkedCaseInsensitiveMap;
import vn.vnpt.chidaotuyen.Obj.quanlychidaotuyen.DoiTuongObj;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.List;

@Repository
public class DoiTuongDAOImp implements DoiTuongDAO {
    @Autowired
    private DataSource dataSource;

    @Override
    public List layDanhSachDoiTuong() {
        String sql = "CALL DanhSachDoiTuong()";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql);
        ArrayList doiTuongObjList = new ArrayList();
        for (int i = 0; i < t.size(); i++) {
            Object newtmp = t.get(i);
            LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
            DoiTuongObj doiTuongObj = new DoiTuongObj();
            doiTuongObj.maDoiTuong = Long.parseLong(map.get("ma_doi_tuong").toString());
            doiTuongObj.tenDoiTuong = map.get("ten_doi_tuong").toString();
            doiTuongObj.viTri = Long.parseLong(map.get("vi_tri").toString());
            doiTuongObj.trangThai = Long.parseLong(map.get("trang_thai").toString());
            doiTuongObj.nguoiTao = Long.parseLong(map.get("nguoi_tao").toString());
            doiTuongObjList.add(doiTuongObj);
        }
        return doiTuongObjList;
    }

    @Override
    public List danhSachDoiTuongGiam(String fieldname, String type) {
        String sql = "CALL SapXepDoiTuongGiam(?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForList(sql, new Object[]{fieldname, type});
    }

    @Override
    public List danhSachDoiTuongTang(String fieldname, String type) {
        String sql = "CALL SapXepDoiTuongTang(?, ?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForList(sql, new Object[]{fieldname, type});
    }

    @Override
    public void capNhatDoiTuong(DoiTuongObj obj) {
        try {
            String sql = "CALL CapNhatDoiTuong(?,?,?,?,?)";
            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            jdbcTemplate.update(sql, new Object[]{
                obj.maDoiTuong,
                obj.tenDoiTuong,
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
    public void themDoiTuong(DoiTuongObj obj) {
        try {
            String sql = "CALL ThemDoiTuong(?,?,?,?)";
            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            jdbcTemplate.update(sql, new Object[]{
                obj.tenDoiTuong,
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
    public void xoaDoiTuong(long maDoiTuong) {
        String sql = "CALL XoaDoiTuong(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        try {
            jdbcTemplate.update(sql, maDoiTuong);
        }
        catch (Exception e) {
            throw e;
        }
    }

    @Override
    public List layDanhSachDoiTuongTheoTen(String tenDoiTuong) {
        String sql = "CALL DanhSachDoiTuongTheoTen(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql, new Object[]{tenDoiTuong});
        ArrayList doiTuongObjList = new ArrayList();
        for (int i = 0; i < t.size(); i++) {
            Object newtmp = t.get(i);
            LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
            DoiTuongObj doiTuongObj = new DoiTuongObj();
            doiTuongObj.maDoiTuong = Long.parseLong(map.get("ma_doi_tuong").toString());
            doiTuongObj.tenDoiTuong = map.get("ten_doi_tuong").toString();
            doiTuongObj.viTri = Long.parseLong(map.get("vi_tri").toString());
            doiTuongObj.trangThai = Long.parseLong(map.get("trang_thai").toString());
            doiTuongObj.nguoiTao = Long.parseLong(map.get("nguoi_tao").toString());
            doiTuongObjList.add(doiTuongObj);
        }
        return doiTuongObjList;
    }

//    @Override
//    public DoiTuongObj layDoiTuong(long maDoiTuong) {
//        String sql = "CALL DanhSachDoiTuongTheoMa(?)";
//        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
//        return jdbcTemplate.queryForList(sql, maDoiTuong);
//        return (DoiTuongObj)jdbcTemplate.queryForObject(sql, new Object[] { maDoiTuong }, new BeanPropertyRowMapper(DoiTuongObj.class));
//    }

    @Override
    public DoiTuongObj layDoiTuong(long maDoiTuong) {
        String sql = "CALL DanhSachDoiTuongTheoMa(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);

        List tmp = jdbcTemplate.queryForList(sql,new Object[] {maDoiTuong});
        Object newtmp = tmp.get(0);
        LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
        DoiTuongObj doiTuongObj = new DoiTuongObj();
        doiTuongObj.maDoiTuong = Long.parseLong(map.get("ma_doi_tuong").toString());
        doiTuongObj.tenDoiTuong = map.get("ten_doi_tuong").toString();
        doiTuongObj.viTri = Long.parseLong(map.get("vi_tri").toString());
        doiTuongObj.trangThai = Long.parseLong(map.get("trang_thai").toString());
        doiTuongObj.nguoiTao = Long.parseLong(map.get("nguoi_tao").toString());
        return doiTuongObj;
        //System.out.println((DoiTuongObj)jdbcTemplate.queryForObject(sql, new Object[] { maDoiTuong }, new BeanPropertyRowMapper(DoiTuongObj.class)));
        //return (DoiTuongObj)jdbcTemplate.queryForObject(sql, new Object[] { maDoiTuong }, new BeanPropertyRowMapper(DoiTuongObj.class));
    }
}
