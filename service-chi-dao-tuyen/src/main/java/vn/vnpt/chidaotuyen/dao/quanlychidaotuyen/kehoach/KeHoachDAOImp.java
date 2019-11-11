package vn.vnpt.chidaotuyen.dao.quanlychidaotuyen.kehoach;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.util.LinkedCaseInsensitiveMap;
import vn.vnpt.chidaotuyen.Obj.quanlychidaotuyen.KeHoachCDT.KeHoachCDTObj;
import vn.vnpt.chidaotuyen.Obj.quanlychidaotuyen.VanBanObj;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Repository
public class KeHoachDAOImp implements KeHoachDAO {

    @Autowired
    private DataSource dataSource;

    @Override
    public List getDanhSachNamKeHoach() {
        String sql = "CALL LayDanhSachNamKeHoach()";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql);
        return jdbcTemplate.queryForList(sql);
    }

    @Override
    public List getDanhSachVanBanTheoKeHoach(long makh) {
        String sql = "CALL LayDanhSachVanBanTheoKeHoach(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql, new Object []{makh});
        ArrayList vanBanObjList = new ArrayList();
        for (int i = 0; i < t.size(); i++) {
            Object newtmp = t.get(i);
            LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
            VanBanObj vanBanObj = new VanBanObj();
            vanBanObj.maVanBan = Long.parseLong(map.get("ma_van_ban").toString());
            vanBanObj.noiDungTrichYeu = map.get("noi_dung_trich_yeu").toString();
            vanBanObjList.add(vanBanObj);
        }
        return vanBanObjList;
    }

    @Override
    public List getDanhSachKeHoachTheoDonVi_Nam(String donVi, String nam) {
        String sql = "CALL LayDanhSachKeHoachTheoDonVi_Nam(?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql, new Object []{donVi, nam});
        ArrayList keHoachObjList = new ArrayList();
        for (int i = 0; i < t.size(); i++) {
            Object newtmp = t.get(i);
            LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
            KeHoachCDTObj keHoachCDTObj = new KeHoachCDTObj();
            keHoachCDTObj.maKeHoach = Long.parseLong(map.get("ma_ke_hoach").toString());
            keHoachCDTObj.donVi = map.get("don_vi").toString();
            keHoachCDTObj.noiDungTrichYeu = map.get("noi_dung_trich_yeu").toString();
            keHoachCDTObj.ngayBanHanh = map.get("ngay_ban_hanh").toString();
            keHoachCDTObj.tapTin = map.get("tap_tin").toString();
            keHoachCDTObj.nguoiTao = Long.parseLong(map.get("nguoi_tao").toString());
            keHoachObjList.add(keHoachCDTObj);
        }
        return keHoachObjList;
    }

    @Override
    public KeHoachCDTObj getKeHoach(long maKeHoach) {
        String sql = "CALL LayKeHoachTheoMa(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List tmp = jdbcTemplate.queryForList(sql, new Object[] {maKeHoach});
        Object newtmp = tmp.get(0);
        LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
        KeHoachCDTObj keHoachCDTObj = new KeHoachCDTObj();
        keHoachCDTObj.maKeHoach = Long.parseLong(map.get("ma_ke_hoach").toString());
        keHoachCDTObj.donVi = map.get("don_vi").toString();
        keHoachCDTObj.noiDungTrichYeu = map.get("noi_dung_trich_yeu").toString();
        keHoachCDTObj.ngayBanHanh = map.get("ngay_ban_hanh").toString();
        keHoachCDTObj.tapTin = map.get("tap_tin").toString();
        keHoachCDTObj.nguoiTao = Long.parseLong(map.get("nguoi_tao").toString());
        return keHoachCDTObj;
    }

    @Override
    public void addKeHoach(KeHoachCDTObj obj) {
        try {
            String sql = "CALL ThemMoiKeHoach(?,?,?,?,?)";
            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            jdbcTemplate.update(sql, new Object[]{
                obj.donVi,
                obj.noiDungTrichYeu,
                obj.ngayBanHanh,
                obj.tapTin,
                obj.nguoiTao
            });
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public Long getMaKeHoachMax()
    {
        String sql = "CALL LayMaKeHoachMax()";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql);
        Long kq = Long.parseLong("0");
        Object newtmp = t.get(0);
        LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
        kq = Long.parseLong(map.get("max_ma_ke_hoach").toString());
        return kq;
    }

    @Override
    public void addChiTietKeHoach(long makh, long mavb) {
        Date date = new Date();
        try {
            String sql = "CALL ThemMoiChiTietKeHoach(?,?,?)";
            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            jdbcTemplate.update(sql, new Object[]{
                makh,
                mavb,
                "Updated: " + date
            });
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void updateKeHoach(KeHoachCDTObj obj) {
        try {
            String sql = "CALL CapNhatKeHoach(?,?,?,?,?,?)";
            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            jdbcTemplate.update(sql, new Object[]{
                obj.maKeHoach,
                obj.donVi,
                obj.noiDungTrichYeu,
                obj.ngayBanHanh,
                obj.tapTin,
                obj.nguoiTao
            });
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void deleteKeHoach(long maKeHoach) {
        String sql = "CALL XoaKeHoach(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        try {
            jdbcTemplate.update(sql, maKeHoach);
        }
        catch (Exception e) {
            throw e;
        }
    }

    @Override
    public void deleteChiTietKeHoach(long maKeHoach) {
        String sql = "CALL XoaChiTietKeHoach(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        try {
            jdbcTemplate.update(sql, maKeHoach);
        }
        catch (Exception e) {
            throw e;
        }
    }

    @Override
    public List getDanhSachKeHoachTheoNoidungTrichYeu_DonVi_Nam(String noiDungTrichYeu, String donVi, Long nam) {
        String sql = "CALL LayDanhSachKeHoachTheoNoidungTrichYeu_DonVi_Nam(?,?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql, new Object []{ noiDungTrichYeu, donVi, nam});
        ArrayList keHoachObjList = new ArrayList();
        for (int i = 0; i < t.size(); i++) {
            Object newtmp = t.get(i);
            LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
            KeHoachCDTObj keHoachCDTObj = new KeHoachCDTObj();
            keHoachCDTObj.maKeHoach = Long.parseLong(map.get("ma_ke_hoach").toString());
            keHoachCDTObj.donVi = map.get("don_vi").toString();
            keHoachCDTObj.noiDungTrichYeu = map.get("noi_dung_trich_yeu").toString();
            keHoachCDTObj.ngayBanHanh = map.get("ngay_ban_hanh").toString();
            keHoachCDTObj.tapTin = map.get("tap_tin").toString();
            keHoachCDTObj.nguoiTao = Long.parseLong(map.get("nguoi_tao").toString());
            keHoachObjList.add(keHoachCDTObj);
        }
        return keHoachObjList;
    }
}
