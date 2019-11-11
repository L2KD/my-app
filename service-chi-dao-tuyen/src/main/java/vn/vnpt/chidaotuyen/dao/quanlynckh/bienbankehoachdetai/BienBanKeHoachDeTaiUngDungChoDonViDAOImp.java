package vn.vnpt.chidaotuyen.dao.quanlynckh.bienbankehoachdetai;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.util.LinkedCaseInsensitiveMap;
import vn.vnpt.chidaotuyen.Obj.quanlynckh.BaoCaoQuyNamDeTaiObj;
import vn.vnpt.chidaotuyen.Obj.quanlynckh.BienBanKeHoachDeTaiObj;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.List;

@Repository
public class BienBanKeHoachDeTaiUngDungChoDonViDAOImp implements BienBanKeHoachDeTaiUngDungChoDonViDAO {
    @Autowired
    private DataSource dataSource;

    @Override
    public List getDanhSachBienBanKeHoachDeTaiUngDungChoDonVi(String maDonVi, Long nam, int trangThai) {
        String sql = "CALL LayDanhSachBienBanKeHoachDeTaiUngDungChoDonVi(?,?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql, new Object[]{maDonVi, nam, trangThai});
        ArrayList bienBanKeHoachDeTaiObjList = new ArrayList();
        for (int i = 0; i < t.size(); i++) {
            Object newtmp = t.get(i);
            LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
            BienBanKeHoachDeTaiObj bienBanKeHoachDeTaiObj = new BienBanKeHoachDeTaiObj();
            bienBanKeHoachDeTaiObj.maDeTai = Long.parseLong(map.get("ma_de_tai").toString());
            bienBanKeHoachDeTaiObj.trangThai = Integer.parseInt(map.get("trang_thai").toString());
            bienBanKeHoachDeTaiObj.tapTin = map.get("tap_tin") == null ? "" : map.get("tap_tin").toString();
            bienBanKeHoachDeTaiObj.tenDeTai = map.get("ten_de_tai").toString();
            bienBanKeHoachDeTaiObj.tenHangDeTai = map.get("ten_hang_de_tai").toString();
            bienBanKeHoachDeTaiObj.tenNhomDeTai = map.get("ten_nhom_de_tai").toString();
            bienBanKeHoachDeTaiObj.tenLoaiDeTai = map.get("ten_loai_de_tai").toString();
            bienBanKeHoachDeTaiObj.tenChuThe = map.get("ten_chu_the").toString();
            bienBanKeHoachDeTaiObjList.add(bienBanKeHoachDeTaiObj);
        }
        return bienBanKeHoachDeTaiObjList;
    }
    @Override
    public List getDanhSachBienBanKeHoachDeTaiUngDungChoDonViTheoTen(String tenDeTai, String maDonVi, Long nam, int trangThai) {
        String sql = "CALL LayDanhSachBienBanKeHoachDeTaiUngDungChoDonViTheoTen(?,?,?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql, new Object[]{tenDeTai, maDonVi, nam, trangThai});
        ArrayList bienBanKeHoachDeTaiObjList = new ArrayList();
        for (int i = 0; i < t.size(); i++) {
            Object newtmp = t.get(i);
            LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
            BienBanKeHoachDeTaiObj bienBanKeHoachDeTaiObj = new BienBanKeHoachDeTaiObj();
            bienBanKeHoachDeTaiObj.maDeTai = Long.parseLong(map.get("ma_de_tai").toString());
            bienBanKeHoachDeTaiObj.trangThai = Integer.parseInt(map.get("trang_thai").toString());
            bienBanKeHoachDeTaiObj.tapTin = map.get("tap_tin") == null ? "" : map.get("tap_tin").toString();
            bienBanKeHoachDeTaiObj.tenDeTai = map.get("ten_de_tai").toString();
            bienBanKeHoachDeTaiObj.tenHangDeTai = map.get("ten_hang_de_tai").toString();
            bienBanKeHoachDeTaiObj.tenNhomDeTai = map.get("ten_nhom_de_tai").toString();
            bienBanKeHoachDeTaiObj.tenLoaiDeTai = map.get("ten_loai_de_tai").toString();
            bienBanKeHoachDeTaiObj.tenChuThe = map.get("ten_chu_the").toString();
            bienBanKeHoachDeTaiObjList.add(bienBanKeHoachDeTaiObj);
        }
        return bienBanKeHoachDeTaiObjList;
    }

    @Override
    public BienBanKeHoachDeTaiObj getBienBienKeHoachDeTaiUngDungChoDonVi(Long maDeTai) {
        String sql = "CALL LayBienBanKeHoachDeTaiUngDungChoDonVi(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql, new Object[]{maDeTai});
        try
        {
            t.get(0);
        }
        catch (Exception ex)
        {
            return new BienBanKeHoachDeTaiObj();
        }
        Object newtmp = t.get(0);
        LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
        BienBanKeHoachDeTaiObj bienBanKeHoachDeTaiObj = new BienBanKeHoachDeTaiObj();
        bienBanKeHoachDeTaiObj.maDeTai = Long.parseLong(map.get("ma_de_tai").toString());
        bienBanKeHoachDeTaiObj.trangThai = Integer.parseInt(map.get("trang_thai").toString());
        bienBanKeHoachDeTaiObj.tapTin = map.get("tap_tin") == null ? "" : map.get("tap_tin").toString();
        return bienBanKeHoachDeTaiObj;
    }

    @Override
    public void updateBienBanKeHoachDeTaiUngDungChoDonVi(BienBanKeHoachDeTaiObj obj) {
        try {
            String sql = "CALL CapNhatBienBanKeHoachDeTaiUngDungChoDonVi(?,?)";
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
