package vn.vnpt.chidaotuyen.dao.quanlychidaotuyen.danhgia;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.util.LinkedCaseInsensitiveMap;
import vn.vnpt.chidaotuyen.Obj.quanlychidaotuyen.DanhGiaObj;
import vn.vnpt.chidaotuyen.Obj.quanlychidaotuyen.LoaiCDTObj;

import javax.sql.DataSource;
import java.util.List;

@Repository
public class DanhGiaDAOImp implements DanhGiaDAO {
    @Autowired
    private DataSource dataSource;

    @Override
    public List layDanhSachDanhGiaTheoLoai(String loai_cdt) {
        String sql = "CALL DanhSachDanhGiaTheoLoai(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForList(sql, new Object []{loai_cdt});
    }

    @Override
    public List layDanhSachLoaiCDTDanhGia() {
        String sql = "CALL DanhSachLoaiCDTDanhGia()";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql);
        return jdbcTemplate.queryForList(sql);
    }

    @Override
    public List danhSachDanhGiaGiam(String fieldname, String type) {
        String sql = "CALL SapXepDanhGiaGiam(?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForList(sql, new Object[]{fieldname, type});
    }

    @Override
    public List danhSachDanhGiaTang(String fieldname, String type) {
        String sql = "CALL SapXepDanhGiaTang(?, ?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForList(sql, new Object[]{fieldname, type});
    }

    @Override
    public void capNhatDanhGia(DanhGiaObj obj) {
        try {
            String sql = "CALL CapNhatDanhGia(?,?,?,?,?,?)";
            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            jdbcTemplate.update(sql, new Object[]{
                obj.ma_danh_gia,
                obj.loai_cdt,
                obj.danh_gia_cdt,
                obj.vi_tri,
                obj.trang_thai,
                obj.nguoi_tao
            });
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void themDanhGia(DanhGiaObj obj) {
        try {
            String sql = "CALL ThemDanhGia(?,?,?,?,?)";
            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            jdbcTemplate.update(sql, new Object[]{
                obj.loai_cdt,
                obj.danh_gia_cdt,
                obj.vi_tri,
                obj.trang_thai,
                obj.nguoi_tao
            });
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void xoaDanhGia(long maDanhGia) {
        String sql = "CALL XoaDanhGia(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        try {
            jdbcTemplate.update(sql, maDanhGia);
        }
        catch (Exception e) {
            throw e;
        }
    }

    @Override
    public List layDanhSachDanhGiaTheoTenVaLoai(String tenDanhGia, Long maLoaiCDT) {
        String sql = "CALL DanhSachDanhGiaTheoTenVaLoai(?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForList(sql, new Object[] { tenDanhGia, maLoaiCDT });
    }

//    @Override
//    public DanhGiaObj layDanhGia(long maDanhGia) {
//        String sql = "CALL DanhSachDanhGiaTheoMa(?)";
//        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
//        return jdbcTemplate.queryForList(sql, maDanhGia);
//        return (DanhGiaObj)jdbcTemplate.queryForObject(sql, new Object[] { maDanhGia }, new BeanPropertyRowMapper(DanhGiaObj.class));
//    }

    @Override
    public DanhGiaObj layDanhGia(long maDanhGia) {
        String sql = "CALL LayDanhGiaTheoMa(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);

        List tmp = jdbcTemplate.queryForList(sql,new Object[] {maDanhGia});
        Object newtmp = tmp.get(0);
        LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
        DanhGiaObj danhGiaObj = new DanhGiaObj();
        danhGiaObj.ma_danh_gia = Long.parseLong(map.get("ma_danh_gia").toString());
        danhGiaObj.loai_cdt = Long.parseLong(map.get("loai_cdt").toString());
        danhGiaObj.danh_gia_cdt = map.get("danh_gia_cdt").toString();
        danhGiaObj.vi_tri = Long.parseLong(map.get("vi_tri").toString());
        danhGiaObj.trang_thai = Long.parseLong(map.get("trang_thai").toString());
        danhGiaObj.nguoi_tao = Long.parseLong(map.get("nguoi_tao").toString());
        return danhGiaObj;
        //System.out.println((DanhGiaObj)jdbcTemplate.queryForObject(sql, new Object[] { maDanhGia }, new BeanPropertyRowMapper(DanhGiaObj.class)));
        //return (DanhGiaObj)jdbcTemplate.queryForObject(sql, new Object[] { maDanhGia }, new BeanPropertyRowMapper(DanhGiaObj.class));
    }

    @Override
    public LoaiCDTObj layLoaiCDTDanhGia(long maLoaiCDT) {
        String sql = "CALL LayLoaiCDT(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List tmp = jdbcTemplate.queryForList(sql,new Object[] {maLoaiCDT});
        Object newtmp = tmp.get(0);
        LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
        LoaiCDTObj loaiCDTObj = new LoaiCDTObj();
        loaiCDTObj.ma_loai_cdt = Long.parseLong(map.get("ma_loai_cdt").toString());
        loaiCDTObj.ten_loai_cdt = map.get("ten_loai_cdt").toString();
        return loaiCDTObj;
    }
}
