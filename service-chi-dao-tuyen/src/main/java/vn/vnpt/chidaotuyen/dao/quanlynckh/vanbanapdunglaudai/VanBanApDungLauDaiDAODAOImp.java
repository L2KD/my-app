package vn.vnpt.chidaotuyen.dao.quanlynckh.vanbanapdunglaudai;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.util.LinkedCaseInsensitiveMap;
import vn.vnpt.chidaotuyen.Obj.quanlynckh.BaoCaoQuyNamDeTaiObj;
import vn.vnpt.chidaotuyen.Obj.quanlynckh.BienBanKeHoachDeTaiObj;
import vn.vnpt.chidaotuyen.Obj.quanlynckh.VanBanApDungLauDaiObj;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.List;

@Repository
public class VanBanApDungLauDaiDAODAOImp implements VanBanApDungLauDaiDAO {
    @Autowired
    private DataSource dataSource;

    @Override
    public List getDanhSachVanBanApDungLauDai(String maDonVi, Long nam, int trangThai) {
        String sql = "CALL LayDanhSachVanBanApDungLauDai(?,?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql, new Object[]{maDonVi, nam, trangThai});
        ArrayList vanBanApDungLauDaiObjList = new ArrayList();
        for (int i = 0; i < t.size(); i++) {
            Object newtmp = t.get(i);
            LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
            VanBanApDungLauDaiObj vanBanApDungLauDaiObj = new VanBanApDungLauDaiObj();
            vanBanApDungLauDaiObj.maDeTai = Long.parseLong(map.get("ma_de_tai").toString());
            vanBanApDungLauDaiObj.trangThai = Integer.parseInt(map.get("trang_thai").toString());
            vanBanApDungLauDaiObj.tapTin = map.get("tap_tin") == null ? "" : map.get("tap_tin").toString();
            vanBanApDungLauDaiObj.tenDeTai = map.get("ten_de_tai").toString();
            vanBanApDungLauDaiObj.tenHangDeTai = map.get("ten_hang_de_tai").toString();
            vanBanApDungLauDaiObj.tenNhomDeTai = map.get("ten_nhom_de_tai").toString();
            vanBanApDungLauDaiObj.tenLoaiDeTai = map.get("ten_loai_de_tai").toString();
            vanBanApDungLauDaiObj.tenChuThe = map.get("ten_chu_the").toString();
            vanBanApDungLauDaiObjList.add(vanBanApDungLauDaiObj);
        }
        return vanBanApDungLauDaiObjList;
    }
    @Override
    public List getDanhSachVanBanApDungLauDaiTheoTen(String tenDeTai, String maDonVi, Long nam, int trangThai) {
        String sql = "CALL LayDanhSachVanBanApDungLauDaiTheoTen(?,?,?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql, new Object[]{tenDeTai, maDonVi, nam, trangThai});
        ArrayList vanBanApDungLauDaiObjList = new ArrayList();
        for (int i = 0; i < t.size(); i++) {
            Object newtmp = t.get(i);
            LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
            VanBanApDungLauDaiObj vanBanApDungLauDaiObj = new VanBanApDungLauDaiObj();
            vanBanApDungLauDaiObj.maDeTai = Long.parseLong(map.get("ma_de_tai").toString());
            vanBanApDungLauDaiObj.trangThai = Integer.parseInt(map.get("trang_thai").toString());
            vanBanApDungLauDaiObj.tapTin = map.get("tap_tin") == null ? "" : map.get("tap_tin").toString();
            vanBanApDungLauDaiObj.tenDeTai = map.get("ten_de_tai").toString();
            vanBanApDungLauDaiObj.tenHangDeTai = map.get("ten_hang_de_tai").toString();
            vanBanApDungLauDaiObj.tenNhomDeTai = map.get("ten_nhom_de_tai").toString();
            vanBanApDungLauDaiObj.tenLoaiDeTai = map.get("ten_loai_de_tai").toString();
            vanBanApDungLauDaiObj.tenChuThe = map.get("ten_chu_the").toString();
            vanBanApDungLauDaiObjList.add(vanBanApDungLauDaiObj);
        }
        return vanBanApDungLauDaiObjList;
    }

    @Override
    public VanBanApDungLauDaiObj getVanBanApDungLauDai(Long maDeTai) {
        String sql = "CALL LayVanBanApDungLauDai(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql, new Object[]{maDeTai});
        try
        {
            t.get(0);
        }
        catch (Exception ex)
        {
            return new VanBanApDungLauDaiObj();
        }
        Object newtmp = t.get(0);
        LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
        VanBanApDungLauDaiObj vanBanApDungLauDaiObj = new VanBanApDungLauDaiObj();
        vanBanApDungLauDaiObj.maDeTai = Long.parseLong(map.get("ma_de_tai").toString());
        vanBanApDungLauDaiObj.trangThai = Integer.parseInt(map.get("trang_thai").toString());
        vanBanApDungLauDaiObj.tapTin = map.get("tap_tin") == null ? "" : map.get("tap_tin").toString();
        return vanBanApDungLauDaiObj;
    }

    @Override
    public void updateVanBanApDungLauDai(VanBanApDungLauDaiObj obj) {
        try {
            String sql = "CALL CapNhatVanBanApDungLauDai(?,?)";
            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            jdbcTemplate.update(sql, new Object[]{
                obj.maDeTai,
                obj.tapTin
            });
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }
}
