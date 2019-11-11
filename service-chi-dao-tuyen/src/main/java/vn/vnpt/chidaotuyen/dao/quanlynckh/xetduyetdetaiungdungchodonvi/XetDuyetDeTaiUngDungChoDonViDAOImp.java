package vn.vnpt.chidaotuyen.dao.quanlynckh.xetduyetdetaiungdungchodonvi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.util.LinkedCaseInsensitiveMap;
import vn.vnpt.chidaotuyen.Obj.quanlynckh.XetDuyetDeTaiUngDungChoDonViObj;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.List;

@Repository
public class XetDuyetDeTaiUngDungChoDonViDAOImp implements XetDuyetDeTaiUngDungChoDonViDAO{
    @Autowired
    private DataSource dataSource;

    @Override
    public List getDanhSachXetDuyetDeTaiUngDungChoDonVi(String maDonVi, Long nam, int trangThai) {
        String sql = "CALL LayDanhSachXetDuyetDeTaiUngDungChoDonVi(?,?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql, new Object[]{maDonVi, nam, trangThai});
        ArrayList xetDuyetDeTaiDonViObjList = new ArrayList();
        for (int i = 0; i < t.size(); i++) {
            Object newtmp = t.get(i);
            LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
            XetDuyetDeTaiUngDungChoDonViObj xetDuyetDeTaiDonViObj = new XetDuyetDeTaiUngDungChoDonViObj();
            xetDuyetDeTaiDonViObj.maDeTai = Long.parseLong(map.get("ma_de_tai").toString());
            xetDuyetDeTaiDonViObj.trangThai = Integer.parseInt(map.get("trang_thai").toString());
            xetDuyetDeTaiDonViObj.noiDungGopY = map.get("noi_dung_gop_y") == null ? "" : map.get("noi_dung_gop_y").toString();
            xetDuyetDeTaiDonViObj.ngayXetDuyet = map.get("ngay_xet_duyet") == null ? "" : map.get("ngay_xet_duyet").toString();
            xetDuyetDeTaiDonViObj.xetDuyet = Integer.parseInt(map.get("xet_duyet").toString());
            xetDuyetDeTaiDonViObj.tapTin = map.get("tap_tin") == null ? "" : map.get("tap_tin").toString();
            xetDuyetDeTaiDonViObj.tenDeTai = map.get("ten_de_tai").toString();
            xetDuyetDeTaiDonViObj.tenHangDeTai = map.get("ten_hang_de_tai").toString();
            xetDuyetDeTaiDonViObj.tenNhomDeTai = map.get("ten_nhom_de_tai").toString();
            xetDuyetDeTaiDonViObj.tenLoaiDeTai = map.get("ten_loai_de_tai").toString();
            xetDuyetDeTaiDonViObj.tenChuThe = map.get("ten_chu_the").toString();
            xetDuyetDeTaiDonViObj.donVi = map.get("don_vi").toString();
            xetDuyetDeTaiDonViObjList.add(xetDuyetDeTaiDonViObj);
        }
        return xetDuyetDeTaiDonViObjList;
    }
    @Override
    public List getDanhSachXetDuyetDeTaiUngDungChoDonViTheoTen(String tenDeTai, String maDonVi, Long nam, int trangThai) {
        String sql = "CALL LayDanhSachXetDuyetDeTaiUngDungChoDonViTheoTen(?,?,?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql, new Object[]{tenDeTai, maDonVi, nam, trangThai});
        ArrayList xetDuyetDeTaiDonViObjList = new ArrayList();
        for (int i = 0; i < t.size(); i++) {
            Object newtmp = t.get(i);
            LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
            XetDuyetDeTaiUngDungChoDonViObj xetDuyetDeTaiDonViObj = new XetDuyetDeTaiUngDungChoDonViObj();
            xetDuyetDeTaiDonViObj.maDeTai = Long.parseLong(map.get("ma_de_tai").toString());
            xetDuyetDeTaiDonViObj.trangThai = Integer.parseInt(map.get("trang_thai").toString());
            xetDuyetDeTaiDonViObj.noiDungGopY = map.get("noi_dung_gop_y") == null ? "" : map.get("noi_dung_gop_y").toString();
            xetDuyetDeTaiDonViObj.ngayXetDuyet = map.get("ngay_xet_duyet") == null ? "" : map.get("ngay_xet_duyet").toString();
            xetDuyetDeTaiDonViObj.xetDuyet = Integer.parseInt(map.get("xet_duyet").toString());
            xetDuyetDeTaiDonViObj.tapTin = map.get("tap_tin") == null ? "" : map.get("tap_tin").toString();
            xetDuyetDeTaiDonViObj.tenDeTai = map.get("ten_de_tai").toString();
            xetDuyetDeTaiDonViObj.tenHangDeTai = map.get("ten_hang_de_tai").toString();
            xetDuyetDeTaiDonViObj.tenNhomDeTai = map.get("ten_nhom_de_tai").toString();
            xetDuyetDeTaiDonViObj.tenLoaiDeTai = map.get("ten_loai_de_tai").toString();
            xetDuyetDeTaiDonViObj.tenChuThe = map.get("ten_chu_the").toString();
            xetDuyetDeTaiDonViObj.donVi = map.get("don_vi").toString();
            xetDuyetDeTaiDonViObjList.add(xetDuyetDeTaiDonViObj);
        }
        return xetDuyetDeTaiDonViObjList;
    }

    @Override
    public XetDuyetDeTaiUngDungChoDonViObj getXetDuyetDeTaiUngDungChoDonVi(Long maDeCuong) {
        String sql = "CALL LayXetDuyetDeTaiUngDungChoDonVi(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql, maDeCuong);
        try
        {
            t.get(0);
        }
        catch (Exception ex)
        {
            return new XetDuyetDeTaiUngDungChoDonViObj();
        }
        Object newtmp = t.get(0);
        LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
        XetDuyetDeTaiUngDungChoDonViObj xetDuyetDeTaiDonViObj = new XetDuyetDeTaiUngDungChoDonViObj();
        xetDuyetDeTaiDonViObj.maDeTai = Long.parseLong(map.get("ma_de_tai").toString());
        xetDuyetDeTaiDonViObj.trangThai = Integer.parseInt(map.get("trang_thai").toString());
        xetDuyetDeTaiDonViObj.noiDungGopY = map.get("noi_dung_gop_y") == null ? "" : map.get("noi_dung_gop_y").toString();
        xetDuyetDeTaiDonViObj.ngayXetDuyet = map.get("ngay_xet_duyet") == null ? "" : map.get("ngay_xet_duyet").toString();
        xetDuyetDeTaiDonViObj.xetDuyet = Integer.parseInt(map.get("xet_duyet").toString());
        xetDuyetDeTaiDonViObj.tapTin = map.get("tap_tin") == null ? "" : map.get("tap_tin").toString();
        xetDuyetDeTaiDonViObj.tenDeTai = map.get("ten_de_tai").toString();
        xetDuyetDeTaiDonViObj.tenHangDeTai = map.get("ten_hang_de_tai").toString();
        xetDuyetDeTaiDonViObj.tenNhomDeTai = map.get("ten_nhom_de_tai").toString();
        xetDuyetDeTaiDonViObj.tenLoaiDeTai = map.get("ten_loai_de_tai").toString();
        xetDuyetDeTaiDonViObj.tenChuThe = map.get("ten_chu_the").toString();
        xetDuyetDeTaiDonViObj.donVi = map.get("don_vi").toString();
        return xetDuyetDeTaiDonViObj;
    }

    @Override
    public void updateXetDuyetDeTaiUngDungChoDonVi(XetDuyetDeTaiUngDungChoDonViObj obj) {
        try {
            String sql = "CALL CapNhatXetDuyetDeTaiUngDungChoDonVi(?,?,?,?)";
            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            jdbcTemplate.update(sql, new Object[]{
                obj.maDeTai,
                obj.ngayXetDuyet,
                obj.xetDuyet,
                obj.tapTin
            });
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }
}
