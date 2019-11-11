package vn.vnpt.quanlynckh.dao.kehoachdetai;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.util.LinkedCaseInsensitiveMap;
import vn.vnpt.quanlynckh.obj.KeHoachObj;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.List;

@Repository
public class KeHoachDAOImp implements KeHoachDAO {
    @Autowired
    private DataSource dataSource;

    @Override
    public List getDanhSachKeHoach() {
        String sql = "CALL LayDanhSachKeHoach()";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql);
        ArrayList keHoachObjList = new ArrayList();
        for (int i = 0; i < t.size(); i++) {
            Object newtmp = t.get(i);
            LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
            KeHoachObj keHoachObj = new KeHoachObj();
            keHoachObj.maKeHoach = Long.parseLong(map.get("ma_ke_hoach").toString());
            keHoachObj.nam = Long.parseLong(map.get("nam").toString());
            keHoachObj.donVi = Long.parseLong(map.get("don_vi").toString());
            keHoachObj.keHoachDeTai = map.get("ke_hoach_de_tai").toString();
            keHoachObj.noiDungTrichYeu = map.get("noi_dung_trich_yeu").toString();
            keHoachObj.tapTin = map.get("tap_tin").toString();
            keHoachObjList.add(keHoachObj);
        }
        return keHoachObjList;
    }

    @Override
    public KeHoachObj getKeHoach(Long maKeHoach) {
        String sql = "CALL LayKeHoachTheoMa()";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql);
        try
        {
            t.get(0);
        }
        catch (Exception ex)
        {
            return new KeHoachObj();
        }
        Object newtmp = t.get(0);
        LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
        KeHoachObj keHoachObj = new KeHoachObj();
        keHoachObj.maKeHoach = Long.parseLong(map.get("ma_ke_hoach").toString());
        keHoachObj.nam = Long.parseLong(map.get("nam").toString());
        keHoachObj.donVi = Long.parseLong(map.get("don_vi").toString());
        keHoachObj.keHoachDeTai = map.get("ke_hoach_de_tai").toString();
        keHoachObj.noiDungTrichYeu = map.get("noi_dung_trich_yeu").toString();
        keHoachObj.tapTin = map.get("tap_tin").toString();
        return keHoachObj;
    }

    @Override
    public void addKeHoach(KeHoachObj obj) {
        try {
            String sql = "CALL ThemMoiKeHoach(?,?,?)";
            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            jdbcTemplate.update(sql, new Object[]{
                obj.nam,
                obj.donVi,
                obj.keHoachDeTai,
                obj.noiDungTrichYeu,
                obj.tapTin
            });
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void updateKeHoach(KeHoachObj obj) {
        try {
            String sql = "CALL CapNhatKeHoach(?,?,?,?)";
            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            jdbcTemplate.update(sql, new Object[]{
                obj.maKeHoach,
                obj.nam,
                obj.donVi,
                obj.keHoachDeTai,
                obj.noiDungTrichYeu,
                obj.tapTin
            });
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void deleteKeHoach(Long maKeHoach) {
        String sql = "CALL XoaKeHoach(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        try {
            jdbcTemplate.update(sql, maKeHoach);
        }
        catch (Exception e) {
            throw e;
        }
    }
}
