package vn.vnpt.chidaotuyen.dao.quanlynckh.xetduyetdetai;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.util.LinkedCaseInsensitiveMap;
import vn.vnpt.chidaotuyen.Obj.quanlynckh.XetDuyetDeTaiObj;
import vn.vnpt.chidaotuyen.Obj.quanlynckh.XetDuyetDeTaiObj;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.List;

@Repository
public class XetDuyetDeTaiDAOImp implements XetDuyetDeTaiDAO {
    @Autowired
    private DataSource dataSource;

    @Override
    public List getDanhSachXetDuyetDeTai(String maDonVi, Long nam, int trangThai) {
        String sql = "CALL LayDanhSachXetDuyetDeTai(?,?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql, new Object[]{maDonVi, nam, trangThai});
        ArrayList xetDuyetDeTaiObjList = new ArrayList();
        for (int i = 0; i < t.size(); i++) {
            Object newtmp = t.get(i);
            LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
            XetDuyetDeTaiObj xetDuyetDeTaiObj = new XetDuyetDeTaiObj();
            xetDuyetDeTaiObj.maDeTai = Long.parseLong(map.get("ma_de_tai").toString());
            xetDuyetDeTaiObj.tenDeTai = map.get("ten_de_tai").toString();
            xetDuyetDeTaiObj.tenDonVi = map.get("ten_don_vi").toString();
            xetDuyetDeTaiObj.donVi = map.get("don_vi").toString();
            xetDuyetDeTaiObj.ngayDangKy = map.get("ngay_dang_ky").toString();
            xetDuyetDeTaiObj.trangThai = Integer.parseInt(map.get("trang_thai").toString());
            xetDuyetDeTaiObj.yKienDanhGia = map.get("y_kien_danh_gia") == null ? "" : map.get("y_kien_danh_gia").toString();
            xetDuyetDeTaiObj.ngayXetDuyet = map.get("ngay_xet_duyet") == null ? "" : map.get("ngay_xet_duyet").toString();
            xetDuyetDeTaiObj.xetDuyet = Integer.parseInt(map.get("xet_duyet").toString());
            xetDuyetDeTaiObj.tapTin =  map.get("tap_tin") == null ? "" : map.get("tap_tin").toString();
            xetDuyetDeTaiObjList.add(xetDuyetDeTaiObj);
        }
        return xetDuyetDeTaiObjList;
    }

    @Override
    public List getDanhSachXetDuyetDeTaiTheoTen(String tenDeTai, String maDonVi, Long nam, int trangThai) {
        String sql = "CALL LayDanhSachXetDuyetDeTaiTheoTen(?,?,?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql, new Object[]{tenDeTai, maDonVi, nam, trangThai});
        ArrayList xetDuyetDeTaiObjList = new ArrayList();
        for (int i = 0; i < t.size(); i++) {
            Object newtmp = t.get(i);
            LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
            XetDuyetDeTaiObj xetDuyetDeTaiObj = new XetDuyetDeTaiObj();
            xetDuyetDeTaiObj.maDeTai = Long.parseLong(map.get("ma_de_tai").toString());
            xetDuyetDeTaiObj.tenDeTai = map.get("ten_de_tai").toString();
            xetDuyetDeTaiObj.tenDonVi = map.get("ten_don_vi").toString();
            xetDuyetDeTaiObj.donVi = map.get("don_vi").toString();
            xetDuyetDeTaiObj.ngayDangKy = map.get("ngay_dang_ky").toString();
            xetDuyetDeTaiObj.trangThai = Integer.parseInt(map.get("trang_thai").toString());
            xetDuyetDeTaiObj.yKienDanhGia = map.get("y_kien_danh_gia") == null ? "" : map.get("y_kien_danh_gia").toString();
            xetDuyetDeTaiObj.ngayXetDuyet = map.get("ngay_xet_duyet") == null ? "" : map.get("ngay_xet_duyet").toString();
            xetDuyetDeTaiObj.xetDuyet = Integer.parseInt(map.get("xet_duyet").toString());
            xetDuyetDeTaiObj.tapTin =  map.get("tap_tin") == null ? "" : map.get("tap_tin").toString();
            xetDuyetDeTaiObjList.add(xetDuyetDeTaiObj);
        }
        return xetDuyetDeTaiObjList;
    }

    @Override
    public XetDuyetDeTaiObj getXetDuyetDeTai(Long maDeTai) {
        String sql = "CALL LayXetDuyetDeTai(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql, maDeTai);
        try
        {
            t.get(0);
        }
        catch (Exception ex)
        {
            return new XetDuyetDeTaiObj();
        }
        Object newtmp = t.get(0);
        LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
        XetDuyetDeTaiObj xetDuyetDeTaiObj = new XetDuyetDeTaiObj();
        xetDuyetDeTaiObj.maDeTai = Long.parseLong(map.get("ma_de_tai").toString());
        xetDuyetDeTaiObj.donVi = map.get("don_vi").toString();
        xetDuyetDeTaiObj.yKienDanhGia = map.get("y_kien_danh_gia") == null ? "" : map.get("y_kien_danh_gia").toString();
        xetDuyetDeTaiObj.ngayDangKy = map.get("ngay_dang_ky").toString();
        xetDuyetDeTaiObj.ngayXetDuyet = map.get("ngay_xet_duyet") == null ? "" : map.get("ngay_xet_duyet").toString();
        xetDuyetDeTaiObj.trangThai = Integer.parseInt(map.get("trang_thai").toString());
        xetDuyetDeTaiObj.xetDuyet = Integer.parseInt(map.get("xet_duyet").toString());
        xetDuyetDeTaiObj.tenDonVi = map.get("ten_don_vi").toString();
        xetDuyetDeTaiObj.tenDeTai = map.get("ten_de_tai").toString();
        xetDuyetDeTaiObj.tapTin = map.get("tap_tin") == null ? "" : map.get("tap_tin").toString();
        return xetDuyetDeTaiObj;
    }

    @Override
    public void updateXetDuyetDeTai(XetDuyetDeTaiObj obj) {
        try {
            String sql = "CALL CapNhatXetDuyetDeTai(?,?,?,?,?)";
            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            jdbcTemplate.update(sql, new Object[]{
                obj.maDeTai,
                obj.yKienDanhGia,
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
