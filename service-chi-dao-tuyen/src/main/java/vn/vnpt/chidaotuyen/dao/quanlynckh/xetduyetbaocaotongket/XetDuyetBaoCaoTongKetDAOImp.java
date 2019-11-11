package vn.vnpt.chidaotuyen.dao.quanlynckh.xetduyetbaocaotongket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.util.LinkedCaseInsensitiveMap;
import vn.vnpt.chidaotuyen.Obj.quanlynckh.XetDuyetBaoCaoTongKetObj;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.List;

@Repository
public class XetDuyetBaoCaoTongKetDAOImp implements XetDuyetBaoCaoTongKetDAO {
    @Autowired
    private DataSource dataSource;

    @Override
    public List getDanhSachXetDuyetBaoCaoTongKet(String maDonVi, Long nam, int trangThai) {
        String sql = "CALL LayDanhSachXetDuyetBaoCaoTongKet(?,?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql, new Object[]{maDonVi, nam, trangThai});
        ArrayList xetDuyetBaoCaoTongKetObjList = new ArrayList();
        for (int i = 0; i < t.size(); i++) {
            Object newtmp = t.get(i);
            LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
            XetDuyetBaoCaoTongKetObj xetDuyetBaoCaoTongKetObj = new XetDuyetBaoCaoTongKetObj();
            xetDuyetBaoCaoTongKetObj.maDeTai = Long.parseLong(map.get("ma_de_tai").toString());
            xetDuyetBaoCaoTongKetObj.tenDeTai = map.get("ten_de_tai").toString();
            xetDuyetBaoCaoTongKetObj.tenDonVi = map.get("ten_don_vi").toString();
            xetDuyetBaoCaoTongKetObj.donVi = map.get("don_vi").toString();
            xetDuyetBaoCaoTongKetObj.ngayDangKy = map.get("ngay_dang_ky").toString();
            xetDuyetBaoCaoTongKetObj.trangThai = Integer.parseInt(map.get("trang_thai").toString());
            xetDuyetBaoCaoTongKetObj.noiDungGopY = map.get("noi_dung_gop_y") == null ? "" : map.get("noi_dung_gop_y").toString();
            xetDuyetBaoCaoTongKetObj.ngayXetDuyet = map.get("ngay_xet_duyet") == null ? "" : map.get("ngay_xet_duyet").toString();
            xetDuyetBaoCaoTongKetObj.xetDuyet = Integer.parseInt(map.get("xet_duyet").toString());
            xetDuyetBaoCaoTongKetObj.tapTin =  map.get("tap_tin") == null ? "" : map.get("tap_tin").toString();
            xetDuyetBaoCaoTongKetObjList.add(xetDuyetBaoCaoTongKetObj);
        }
        return xetDuyetBaoCaoTongKetObjList;
    }
    @Override
    public List getDanhSachXetDuyetBaoCaoTongKetTheoTen(String tenDeTai, String maDonVi, Long nam, int trangThai) {
        String sql = "CALL LayDanhSachXetDuyetBaoCaoTongKetTheoTen(?,?,?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql, new Object[]{tenDeTai, maDonVi, nam, trangThai});
        ArrayList xetDuyetBaoCaoTongKetObjList = new ArrayList();
        for (int i = 0; i < t.size(); i++) {
            Object newtmp = t.get(i);
            LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
            XetDuyetBaoCaoTongKetObj xetDuyetBaoCaoTongKetObj = new XetDuyetBaoCaoTongKetObj();
            xetDuyetBaoCaoTongKetObj.maDeTai = Long.parseLong(map.get("ma_de_tai").toString());
            xetDuyetBaoCaoTongKetObj.tenDeTai = map.get("ten_de_tai").toString();
            xetDuyetBaoCaoTongKetObj.tenDonVi = map.get("ten_don_vi").toString();
            xetDuyetBaoCaoTongKetObj.donVi = map.get("don_vi").toString();
            xetDuyetBaoCaoTongKetObj.ngayDangKy = map.get("ngay_dang_ky").toString();
            xetDuyetBaoCaoTongKetObj.trangThai = Integer.parseInt(map.get("trang_thai").toString());
            xetDuyetBaoCaoTongKetObj.noiDungGopY = map.get("noi_dung_gop_y") == null ? "" : map.get("noi_dung_gop_y").toString();
            xetDuyetBaoCaoTongKetObj.ngayXetDuyet = map.get("ngay_xet_duyet") == null ? "" : map.get("ngay_xet_duyet").toString();
            xetDuyetBaoCaoTongKetObj.xetDuyet = Integer.parseInt(map.get("xet_duyet").toString());
            xetDuyetBaoCaoTongKetObj.tapTin =  map.get("tap_tin") == null ? "" : map.get("tap_tin").toString();
            xetDuyetBaoCaoTongKetObjList.add(xetDuyetBaoCaoTongKetObj);
        }
        return xetDuyetBaoCaoTongKetObjList;
    }

    @Override
    public XetDuyetBaoCaoTongKetObj getXetDuyetBaoCaoTongKet(Long maDeTai) {
        String sql = "CALL LayXetDuyetBaoCaoTongKet(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql, maDeTai);
        try
        {
            t.get(0);
        }
        catch (Exception ex)
        {
            return new XetDuyetBaoCaoTongKetObj();
        }
        Object newtmp = t.get(0);
        LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
        XetDuyetBaoCaoTongKetObj xetDuyetBaoCaoTongKetObj = new XetDuyetBaoCaoTongKetObj();
        xetDuyetBaoCaoTongKetObj.maDeTai = Long.parseLong(map.get("ma_de_tai").toString());
        xetDuyetBaoCaoTongKetObj.donVi = map.get("don_vi").toString();
        xetDuyetBaoCaoTongKetObj.noiDungGopY = map.get("noi_dung_gop_y") == null ? "" : map.get("noi_dung_gop_y").toString();
        xetDuyetBaoCaoTongKetObj.ngayDangKy = map.get("ngay_dang_ky").toString();
        xetDuyetBaoCaoTongKetObj.ngayXetDuyet = map.get("ngay_xet_duyet") == null ? "" : map.get("ngay_xet_duyet").toString();
        xetDuyetBaoCaoTongKetObj.trangThai = Integer.parseInt(map.get("trang_thai").toString());
        xetDuyetBaoCaoTongKetObj.xetDuyet = Integer.parseInt(map.get("xet_duyet").toString());
        xetDuyetBaoCaoTongKetObj.tenDonVi = map.get("ten_don_vi").toString();
        xetDuyetBaoCaoTongKetObj.tenDeTai = map.get("ten_de_tai").toString();
        xetDuyetBaoCaoTongKetObj.tapTin = map.get("tap_tin") == null ? "" : map.get("tap_tin").toString();
        return xetDuyetBaoCaoTongKetObj;
    }

    @Override
    public void updateXetDuyetBaoCaoTongKet(XetDuyetBaoCaoTongKetObj obj) {
        try {
            String sql = "CALL CapNhatXetDuyetBaoCaoTongKet(?,?,?,?,?)";
            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            jdbcTemplate.update(sql, new Object[]{
                obj.maDeTai,
                obj.noiDungGopY,
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
