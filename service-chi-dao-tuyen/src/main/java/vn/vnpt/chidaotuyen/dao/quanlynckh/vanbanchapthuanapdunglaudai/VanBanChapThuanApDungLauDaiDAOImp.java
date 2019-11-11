package vn.vnpt.chidaotuyen.dao.quanlynckh.vanbanchapthuanapdunglaudai;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.util.LinkedCaseInsensitiveMap;
import vn.vnpt.chidaotuyen.Obj.quanlynckh.BienBanKeHoachDeTaiObj;
import vn.vnpt.chidaotuyen.Obj.quanlynckh.VanBanApDungLauDaiObj;
import vn.vnpt.chidaotuyen.Obj.quanlynckh.VanBanChapThuanApDungLauDaiObj;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.List;

@Repository
public class VanBanChapThuanApDungLauDaiDAOImp implements VanBanChapThuanApDungLauDaiDAO {
    @Autowired
    private DataSource dataSource;

    @Override
    public List getDanhSachVanBanChapThuanApDungLauDai(String maDonVi, Long nam, int trangThai) {
        String sql = "CALL LayDanhSachVanBanChapThuanApDungLauDai(?,?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql, new Object[]{maDonVi, nam, trangThai});
        ArrayList vanBanChapThuanApDungLauDaiObjList = new ArrayList();
        for (int i = 0; i < t.size(); i++) {
            Object newtmp = t.get(i);
            LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
            VanBanChapThuanApDungLauDaiObj vanBanChapThuanApDungLauDaiObj = new VanBanChapThuanApDungLauDaiObj();
            vanBanChapThuanApDungLauDaiObj.maDeTai = Long.parseLong(map.get("ma_de_tai").toString());
            vanBanChapThuanApDungLauDaiObj.trangThai = Integer.parseInt(map.get("trang_thai").toString());
            vanBanChapThuanApDungLauDaiObj.tapTin = map.get("tap_tin") == null ? "" : map.get("tap_tin").toString();
            vanBanChapThuanApDungLauDaiObj.tenDeTai = map.get("ten_de_tai").toString();
            vanBanChapThuanApDungLauDaiObj.tenHangDeTai = map.get("ten_hang_de_tai").toString();
            vanBanChapThuanApDungLauDaiObj.tenNhomDeTai = map.get("ten_nhom_de_tai").toString();
            vanBanChapThuanApDungLauDaiObj.tenLoaiDeTai = map.get("ten_loai_de_tai").toString();
            vanBanChapThuanApDungLauDaiObj.tenChuThe = map.get("ten_chu_the").toString();
            vanBanChapThuanApDungLauDaiObjList.add(vanBanChapThuanApDungLauDaiObj);
        }
        return vanBanChapThuanApDungLauDaiObjList;
    }
    @Override
    public List getDanhSachVanBanChapThuanApDungLauDaiTheoTen(String tenDeTai, String maDonVi, Long nam, int trangThai) {
        String sql = "CALL LayDanhSachVanBanChapThuanApDungLauDaiTheoTen(?,?,?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql, new Object[]{tenDeTai, maDonVi, nam, trangThai});
        ArrayList vanBanChapThuanApDungLauDaiObjList = new ArrayList();
        for (int i = 0; i < t.size(); i++) {
            Object newtmp = t.get(i);
            LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
            VanBanChapThuanApDungLauDaiObj vanBanChapThuanApDungLauDaiObj = new VanBanChapThuanApDungLauDaiObj();
            vanBanChapThuanApDungLauDaiObj.maDeTai = Long.parseLong(map.get("ma_de_tai").toString());
            vanBanChapThuanApDungLauDaiObj.trangThai = Integer.parseInt(map.get("trang_thai").toString());
            vanBanChapThuanApDungLauDaiObj.tapTin = map.get("tap_tin") == null ? "" : map.get("tap_tin").toString();
            vanBanChapThuanApDungLauDaiObj.tenDeTai = map.get("ten_de_tai").toString();
            vanBanChapThuanApDungLauDaiObj.tenHangDeTai = map.get("ten_hang_de_tai").toString();
            vanBanChapThuanApDungLauDaiObj.tenNhomDeTai = map.get("ten_nhom_de_tai").toString();
            vanBanChapThuanApDungLauDaiObj.tenLoaiDeTai = map.get("ten_loai_de_tai").toString();
            vanBanChapThuanApDungLauDaiObj.tenChuThe = map.get("ten_chu_the").toString();
            vanBanChapThuanApDungLauDaiObjList.add(vanBanChapThuanApDungLauDaiObj);
        }
        return vanBanChapThuanApDungLauDaiObjList;
    }

    @Override
    public VanBanChapThuanApDungLauDaiObj getVanBanChapThuanApDungLauDai(Long maDeTai) {
        String sql = "CALL LayVanBanChapThuanApDungLauDai(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql, new Object[]{maDeTai});
        try
        {
            t.get(0);
        }
        catch (Exception ex)
        {
            return new VanBanChapThuanApDungLauDaiObj();
        }
        Object newtmp = t.get(0);
        LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
        VanBanChapThuanApDungLauDaiObj vanBanChapThuanApDungLauDaiObj = new VanBanChapThuanApDungLauDaiObj();
        vanBanChapThuanApDungLauDaiObj.maDeTai = Long.parseLong(map.get("ma_de_tai").toString());
        vanBanChapThuanApDungLauDaiObj.trangThai = Integer.parseInt(map.get("trang_thai").toString());
        vanBanChapThuanApDungLauDaiObj.tapTin = map.get("tap_tin") == null ? "" : map.get("tap_tin").toString();
        return vanBanChapThuanApDungLauDaiObj;
    }

    @Override
    public void updateVanBanChapThuanApDungLauDai(VanBanChapThuanApDungLauDaiObj obj) {
        try {
            String sql = "CALL CapNhatVanBanChapThuanApDungLauDai(?,?)";
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
