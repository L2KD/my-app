package vn.vnpt.chidaotuyen.dao.quanlychidaotuyen.loaicdt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.util.LinkedCaseInsensitiveMap;
import vn.vnpt.chidaotuyen.Obj.quanlychidaotuyen.LoaiCDTObj;

import javax.sql.DataSource;
import java.util.List;

@Repository
public class LoaiCDTDAOImp implements LoaiCDTDAO {
    @Autowired
    private DataSource dataSource;

    @Override
    public List layDanhSachLoaiCDT() {
        String sql = "CALL DanhSachLoaiCDT()";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForList(sql);
    }

    @Override
    public List danhSachLoaiCDTGiam(String fieldname, String type) {
        String sql = "CALL SapXepLoaiCDTGiam(?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForList(sql, new Object[]{fieldname, type});
    }

    @Override
    public List danhSachLoaiCDTTang(String fieldname, String type) {
        String sql = "CALL SapXepLoaiCDTTang(?, ?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForList(sql, new Object[]{fieldname, type});
    }

    @Override
    public void capNhatLoaiCDT(LoaiCDTObj obj) {
        try {
            String sql = "CALL CapNhatLoaiCDT(?,?,?)";
            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            jdbcTemplate.update(sql, new Object[]{
                obj.ma_loai_cdt,
                obj.ten_loai_cdt,
                //obj.vi_tri,
                //obj.trang_thai,
                obj.nguoi_tao
            });
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void themLoaiCDT(LoaiCDTObj obj) {
        try {
            String sql = "CALL ThemLoaiCDT(?,?)";
            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            jdbcTemplate.update(sql, new Object[]{
                obj.ten_loai_cdt,
                //obj.vi_tri,
                //obj.trang_thai,
                obj.nguoi_tao
            });
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void xoaLoaiCDT(long maLoaiCDT) {
        String sql = "CALL XoaLoaiCDT(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        try {
            jdbcTemplate.update(sql, maLoaiCDT);
        }
        catch (Exception e) {
            throw e;
        }
    }

    @Override
    public List layDanhSachLoaiCDTTheoTen(String tenLoaiCDT) {
        String sql = "CALL DanhSachLoaiCDTTheoTen(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForList(sql, tenLoaiCDT);
    }

//    @Override
//    public LoaiCDTObj layLoaiCDT(long maLoaiCDT) {
//        String sql = "CALL DanhSachLoaiCDTTheoMa(?)";
//        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
//        return jdbcTemplate.queryForList(sql, maLoaiCDT);
//        return (LoaiCDTObj)jdbcTemplate.queryForObject(sql, new Object[] { maLoaiCDT }, new BeanPropertyRowMapper(LoaiCDTObj.class));
//    }

    @Override
    public LoaiCDTObj layLoaiCDT(long maLoaiCDT) {
        String sql = "CALL DanhSachLoaiCDTTheoMa(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);

        List tmp = jdbcTemplate.queryForList(sql,new Object[] {maLoaiCDT});
        Object newtmp = tmp.get(0);
        LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
        LoaiCDTObj loaiCDTObj = new LoaiCDTObj();
        loaiCDTObj.ma_loai_cdt = Long.parseLong(map.get("ma_loai_cdt").toString());
        loaiCDTObj.ten_loai_cdt = map.get("ten_loai_cdt").toString();
        //loaiCDTObj.vi_tri = Long.parseLong(map.get("vi_tri").toString());
        //loaiCDTObj.trang_thai = Long.parseLong(map.get("trang_thai").toString());
        loaiCDTObj.nguoi_tao = Long.parseLong(map.get("nguoi_tao").toString());
        return loaiCDTObj;
        //System.out.println((LoaiCDTObj)jdbcTemplate.queryForObject(sql, new Object[] { maLoaiCDT }, new BeanPropertyRowMapper(LoaiCDTObj.class)));
        //return (LoaiCDTObj)jdbcTemplate.queryForObject(sql, new Object[] { maLoaiCDT }, new BeanPropertyRowMapper(LoaiCDTObj.class));
    }
}
