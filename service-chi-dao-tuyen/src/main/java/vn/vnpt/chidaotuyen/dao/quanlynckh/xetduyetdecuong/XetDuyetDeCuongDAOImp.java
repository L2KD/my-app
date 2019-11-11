package vn.vnpt.chidaotuyen.dao.quanlynckh.xetduyetdecuong;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.util.LinkedCaseInsensitiveMap;
import vn.vnpt.chidaotuyen.Obj.quanlynckh.XetDuyetDeCuongObj;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.List;

@Repository
public class XetDuyetDeCuongDAOImp implements XetDuyetDeCuongDAO {
    @Autowired
    private DataSource dataSource;

    @Override
    public List getDanhSachXetDuyetDeCuong(String maDonVi, Long nam, int trangThai) {
        String sql = "CALL LayDanhSachXetDuyetDeCuong(?,?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql, new Object[]{maDonVi, nam, trangThai});
        ArrayList xetDuyetDeCuongObjList = new ArrayList();
        for (int i = 0; i < t.size(); i++) {
            Object newtmp = t.get(i);
            LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
            XetDuyetDeCuongObj xetDuyetDeCuongObj = new XetDuyetDeCuongObj();
            xetDuyetDeCuongObj.maDeTai = Long.parseLong(map.get("ma_de_tai").toString());
            xetDuyetDeCuongObj.tenDeTai = map.get("ten_de_tai").toString();
            xetDuyetDeCuongObj.tenDonVi = map.get("ten_don_vi").toString();
            xetDuyetDeCuongObj.donVi = map.get("don_vi").toString();
            xetDuyetDeCuongObj.ngayDangKy = map.get("ngay_dang_ky").toString();
            xetDuyetDeCuongObj.trangThai = Integer.parseInt(map.get("trang_thai").toString());
            xetDuyetDeCuongObj.noiDungGopY = map.get("noi_dung_gop_y") == null ? "" : map.get("noi_dung_gop_y").toString();
            xetDuyetDeCuongObj.ngayXetDuyet = map.get("ngay_xet_duyet") == null ? "" : map.get("ngay_xet_duyet").toString();
            xetDuyetDeCuongObj.xetDuyet = map.get("xet_duyet").toString();
            xetDuyetDeCuongObj.tapTinDeCuong =  map.get("tap_tin_de_cuong") == null ? "" : map.get("tap_tin_de_cuong").toString();
            xetDuyetDeCuongObj.tapTinBienBan =  map.get("tap_tin_bien_ban") == null ? "" : map.get("tap_tin_bien_ban").toString();
            xetDuyetDeCuongObjList.add(xetDuyetDeCuongObj);
        }
        return xetDuyetDeCuongObjList;
    }
    @Override
    public List getDanhSachXetDuyetDeCuongTheoTen(String tenDeTai, String maDonVi, Long nam, int trangThai) {
        String sql = "CALL LayDanhSachXetDuyetDeCuongTheoTen(?,?,?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql, new Object[]{tenDeTai, maDonVi, nam, trangThai});
        ArrayList xetDuyetDeCuongObjList = new ArrayList();
        for (int i = 0; i < t.size(); i++) {
            Object newtmp = t.get(i);
            LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
            XetDuyetDeCuongObj xetDuyetDeCuongObj = new XetDuyetDeCuongObj();
            xetDuyetDeCuongObj.maDeTai = Long.parseLong(map.get("ma_de_tai").toString());
            xetDuyetDeCuongObj.tenDeTai = map.get("ten_de_tai").toString();
            xetDuyetDeCuongObj.tenDonVi = map.get("ten_don_vi").toString();
            xetDuyetDeCuongObj.donVi = map.get("don_vi").toString();
            xetDuyetDeCuongObj.ngayDangKy = map.get("ngay_dang_ky").toString();
            xetDuyetDeCuongObj.trangThai = Integer.parseInt(map.get("trang_thai").toString());
            xetDuyetDeCuongObj.noiDungGopY = map.get("noi_dung_gop_y") == null ? "" : map.get("noi_dung_gop_y").toString();
            xetDuyetDeCuongObj.ngayXetDuyet = map.get("ngay_xet_duyet") == null ? "" : map.get("ngay_xet_duyet").toString();
            xetDuyetDeCuongObj.xetDuyet = map.get("xet_duyet").toString();
            xetDuyetDeCuongObj.tapTinDeCuong =  map.get("tap_tin_de_cuong") == null ? "" : map.get("tap_tin_de_cuong").toString();
            xetDuyetDeCuongObj.tapTinBienBan =  map.get("tap_tin_bien_ban") == null ? "" : map.get("tap_tin_bien_ban").toString();
            xetDuyetDeCuongObjList.add(xetDuyetDeCuongObj);
        }
        return xetDuyetDeCuongObjList;
    }

    @Override
    public XetDuyetDeCuongObj getXetDuyetDeCuong(Long maDeCuong) {
        String sql = "CALL LayXetDuyetDeCuong(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql, maDeCuong);
        try
        {
            t.get(0);
        }
        catch (Exception ex)
        {
            return new XetDuyetDeCuongObj();
        }
        Object newtmp = t.get(0);
        LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
        XetDuyetDeCuongObj xetDuyetDeCuongObj = new XetDuyetDeCuongObj();
        xetDuyetDeCuongObj.maDeTai = Long.parseLong(map.get("ma_de_tai").toString());
        xetDuyetDeCuongObj.tenDeTai = map.get("ten_de_tai").toString();
        xetDuyetDeCuongObj.tenDonVi = map.get("ten_don_vi").toString();
        xetDuyetDeCuongObj.donVi = map.get("don_vi").toString();
        xetDuyetDeCuongObj.ngayDangKy = map.get("ngay_dang_ky").toString();
        xetDuyetDeCuongObj.trangThai = Integer.parseInt(map.get("trang_thai").toString());
        xetDuyetDeCuongObj.noiDungGopY = map.get("noi_dung_gop_y") == null ? "" : map.get("noi_dung_gop_y").toString();
        xetDuyetDeCuongObj.ngayXetDuyet = map.get("ngay_xet_duyet") == null ? "" : map.get("ngay_xet_duyet").toString();
        xetDuyetDeCuongObj.xetDuyet = map.get("xet_duyet").toString();
        xetDuyetDeCuongObj.tapTinDeCuong =  map.get("tap_tin_de_cuong") == null ? "" : map.get("tap_tin_de_cuong").toString();
        xetDuyetDeCuongObj.tapTinBienBan =  map.get("tap_tin_bien_ban") == null ? "" : map.get("tap_tin_bien_ban").toString();
        return xetDuyetDeCuongObj;
    }

    @Override
    public void updateXetDuyetDeCuong(XetDuyetDeCuongObj obj) {
        try {
            String sql = "CALL CapNhatXetDuyetDeCuong(?,?,?,?,?,?)";
            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            jdbcTemplate.update(sql, new Object[]{
                obj.maDeTai,
                obj.noiDungGopY,
                obj.ngayXetDuyet,
                obj.xetDuyet,
                obj.tapTinDeCuong,
                obj.tapTinBienBan
            });
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }
}
