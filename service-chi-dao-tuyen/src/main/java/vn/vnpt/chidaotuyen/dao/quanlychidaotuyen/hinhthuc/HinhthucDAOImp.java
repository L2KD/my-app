package vn.vnpt.chidaotuyen.dao.quanlychidaotuyen.hinhthuc;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.util.LinkedCaseInsensitiveMap;
import vn.vnpt.chidaotuyen.Obj.quanlychidaotuyen.HinhThucObj;

import javax.sql.DataSource;
import java.util.List;

@Repository
public class HinhthucDAOImp implements HinhThucDAO {
    @Autowired
    private DataSource dataSource;

    @Override
    public List layDanhSachHinhThuc() {
        String sql = "CALL DanhSachHinhThuc()";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List arrListHinhThuc = jdbcTemplate.queryForList(sql);
        /*
        * size = 34
        * trang 1: 0  --> 9  : (trang - 1) * 10 --> (trang) * 10 - 1
        * trang 2: 10 --> 19 : (trang -1) * 10 --> (trang) * 10 - 1
        * trang 4: 30 --> 34 : (trang -1) *10 --> (trang) * 10 - 1
        * */
            /*if (arrListHinhThuc.size() < 10)
                return arrListHinhThuc;
            else if ((trang - 1) * 10 > arrListHinhThuc.size())
                return arrListHinhThuc.subList((int) (arrListHinhThuc.size() - arrListHinhThuc.size() % 10), arrListHinhThuc.size());
            else if (trang * 10 > arrListHinhThuc.size())
                return arrListHinhThuc.subList((int) (trang - 1) * 10, arrListHinhThuc.size());
            else
                return arrListHinhThuc.subList((int) (trang - 1) * 10, (int) (trang * 10));*/
            return arrListHinhThuc;
    }

    @Override
    public List danhSachHinhThucGiam(String fieldname, String type) {
        String sql = "CALL SapXepHinhThucGiam(?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForList(sql, new Object[]{fieldname, type});
    }

    @Override
    public List danhSachHinhThucTang(String fieldname, String type) {
        String sql = "CALL SapXepHinhThucTang(?, ?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForList(sql, new Object[]{fieldname, type});
    }

    @Override
    public void capNhatHinhThuc(HinhThucObj obj) {
        try {
            String sql = "CALL CapNhatHinhThuc(?,?,?,?,?)";
            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            jdbcTemplate.update(sql, new Object[]{
                obj.ma_hinh_thuc,
                obj.ten_hinh_thuc,
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
    public void themHinhThuc(HinhThucObj obj) {
        try {
            String sql = "CALL ThemHinhThuc(?,?,?,?)";
            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            jdbcTemplate.update(sql, new Object[]{
                obj.ten_hinh_thuc,
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
    public void xoaHinhThuc(long maHinhThuc) {
        String sql = "CALL XoaHinhThuc(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        try {
            jdbcTemplate.update(sql, maHinhThuc);
        }
        catch (Exception e) {
            throw e;
        }
    }

    @Override
    public List layDanhSachHinhThucTheoTen(String tenHinhThuc) {
        String sql = "CALL DanhSachHinhThucTheoTen(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForList(sql, tenHinhThuc);
    }

//    @Override
//    public HinhThucObj layHinhThuc(long maHinhThuc) {
//        String sql = "CALL DanhSachHinhThucTheoMa(?)";
//        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
//        return jdbcTemplate.queryForList(sql, maHinhThuc);
//        return (HinhThucObj)jdbcTemplate.queryForObject(sql, new Object[] { maHinhThuc }, new BeanPropertyRowMapper(HinhThucObj.class));
//    }

    @Override
    public HinhThucObj layHinhThuc(long maHinhThuc) {
        String sql = "CALL DanhSachHinhThucTheoMa(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);

        List tmp = jdbcTemplate.queryForList(sql,new Object[] {maHinhThuc});
        Object newtmp = tmp.get(0);
        LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
        HinhThucObj hinhThucObj = new HinhThucObj();
        hinhThucObj.ma_hinh_thuc = Long.parseLong(map.get("ma_hinh_thuc").toString());
        hinhThucObj.ten_hinh_thuc = map.get("ten_hinh_thuc").toString();
        hinhThucObj.vi_tri = Long.parseLong(map.get("vi_tri").toString());
        hinhThucObj.trang_thai = Long.parseLong(map.get("trang_thai").toString());
        hinhThucObj.nguoi_tao = Long.parseLong(map.get("nguoi_tao").toString());
        return hinhThucObj;
        //System.out.println((HinhThucObj)jdbcTemplate.queryForObject(sql, new Object[] { maHinhThuc }, new BeanPropertyRowMapper(HinhThucObj.class)));
        //return (HinhThucObj)jdbcTemplate.queryForObject(sql, new Object[] { maHinhThuc }, new BeanPropertyRowMapper(HinhThucObj.class));
    }
}
