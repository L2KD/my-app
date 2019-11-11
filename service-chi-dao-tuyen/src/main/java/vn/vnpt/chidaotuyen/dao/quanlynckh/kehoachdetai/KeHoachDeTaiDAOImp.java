package vn.vnpt.chidaotuyen.dao.quanlynckh.kehoachdetai;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.util.LinkedCaseInsensitiveMap;
import vn.vnpt.chidaotuyen.Obj.quanlynckh.KeHoachDeTaiObj;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.List;

@Repository
public class KeHoachDeTaiDAOImp implements KeHoachDeTaiDAO {
    @Autowired
    private DataSource dataSource;

    @Override
    public List getDanhSachNamKeHoachDeTai() {
        String sql = "CALL LayDanhSachNamKeHoachDeTai()";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql);
        return jdbcTemplate.queryForList(sql);
    }

    @Override
    public List getDanhSachKeHoachDeTai(String donVi, long nam) {
        String sql = "CALL LayDanhSachKeHoachDeTai(?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql, new Object[]{donVi, nam});
        ArrayList keHoachObjList = new ArrayList();
        for (int i = 0; i < t.size(); i++) {
            Object newtmp = t.get(i);
            LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
            KeHoachDeTaiObj keHoachDeTaiObj = new KeHoachDeTaiObj();
            keHoachDeTaiObj.maKeHoachDeTai = Long.parseLong(map.get("ma_ke_hoach").toString());
            keHoachDeTaiObj.nam = Long.parseLong(map.get("nam").toString());
            keHoachDeTaiObj.donVi = map.get("don_vi").toString();
            keHoachDeTaiObj.keHoachDeTai = map.get("ke_hoach_de_tai").toString();
            keHoachDeTaiObj.noiDungTrichYeu = map.get("noi_dung_trich_yeu").toString();
            keHoachDeTaiObj.tapTin = map.get("tap_tin").toString();
            keHoachObjList.add(keHoachDeTaiObj);
        }
        return keHoachObjList;
    }

    @Override
    public List getDanhSachNamKeHoachDeTaiTheoKeHoach_DonVi_Nam(String keHoach, String donVi, Long nam) {
        String sql = "CALL DanhSachKeHoachDeTaiTheoKeHoach_DonVi_Nam(?,?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql, new Object[]{keHoach, donVi, nam});
        ArrayList keHoachObjList = new ArrayList();
        for (int i = 0; i < t.size(); i++) {
            Object newtmp = t.get(i);
            LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
            KeHoachDeTaiObj keHoachDeTaiObj = new KeHoachDeTaiObj();
            keHoachDeTaiObj.maKeHoachDeTai = Long.parseLong(map.get("ma_ke_hoach").toString());
            keHoachDeTaiObj.nam = Long.parseLong(map.get("nam").toString());
            keHoachDeTaiObj.donVi = map.get("don_vi").toString();
            keHoachDeTaiObj.keHoachDeTai = map.get("ke_hoach_de_tai").toString();
            keHoachDeTaiObj.noiDungTrichYeu = map.get("noi_dung_trich_yeu").toString();
            keHoachDeTaiObj.tapTin = map.get("tap_tin").toString();
            keHoachObjList.add(keHoachDeTaiObj);
        }
        return keHoachObjList;
    }

    @Override
    public KeHoachDeTaiObj getKeHoachdeTai(Long maKeHoach) {
        String sql = "CALL LayKeHoachDeTai(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql, maKeHoach);
        try
        {
            t.get(0);
        }
        catch (Exception ex)
        {
            return new KeHoachDeTaiObj();
        }
        Object newtmp = t.get(0);
        LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
        KeHoachDeTaiObj keHoachDeTaiObj = new KeHoachDeTaiObj();
        keHoachDeTaiObj.maKeHoachDeTai = Long.parseLong(map.get("ma_ke_hoach").toString());
        keHoachDeTaiObj.nam = Long.parseLong(map.get("nam").toString());
        keHoachDeTaiObj.donVi = map.get("don_vi").toString();
        keHoachDeTaiObj.keHoachDeTai = map.get("ke_hoach_de_tai").toString();
        keHoachDeTaiObj.noiDungTrichYeu = map.get("noi_dung_trich_yeu").toString();
        keHoachDeTaiObj.tapTin = map.get("tap_tin").toString();
        return keHoachDeTaiObj;
    }

    @Override
    public void addKeHoachDeTai(KeHoachDeTaiObj obj) {
        try {
            String sql = "CALL ThemKeHoachDeTai(?,?,?,?,?)";
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
    public void updateKeHoachDeTai(KeHoachDeTaiObj obj) {
        try {
            String sql = "CALL CapNhatKeHoachDeTai(?,?,?,?,?,?)";
            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            jdbcTemplate.update(sql, new Object[]{
                obj.maKeHoachDeTai,
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
    public void deleteKeHoachDeTai(Long maKeHoach) {
        String sql = "CALL XoaKeHoachDeTai(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        try {
            jdbcTemplate.update(sql, maKeHoach);
        }
        catch (Exception e) {
            throw e;
        }
    }
}
