package vn.vnpt.chidaotuyen.dao.quanlynckh.baocaoquynamdetai;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.util.LinkedCaseInsensitiveMap;
import vn.vnpt.chidaotuyen.Obj.quanlynckh.BaoCaoQuyNamDeTaiObj;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.List;

@Repository
public class BaoCaoQuyNamDeTaiDAOImp implements BaoCaoQuyNamDeTaiDAO {
    @Autowired
    private DataSource dataSource;

    @Override
    public List getDanhSachBaoCaoQuyNamDeTai(String maDonVi, Long nam, int trangThai) {
        String sql = "CALL LayDanhSachBaoCaoQuyNam(?,?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql, new Object[]{maDonVi, nam, trangThai});
        ArrayList baoCaoQuyNamDeTaiObjList = new ArrayList();
        for (int i = 0; i < t.size(); i++) {
            Object newtmp = t.get(i);
            LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
            BaoCaoQuyNamDeTaiObj baoCaoQuyNamDeTaiObj = new BaoCaoQuyNamDeTaiObj();
            baoCaoQuyNamDeTaiObj.maDeTai = Long.parseLong(map.get("ma_de_tai").toString());
            baoCaoQuyNamDeTaiObj.trangThai = Integer.parseInt(map.get("trang_thai").toString());
            baoCaoQuyNamDeTaiObj.tapTinBaoCaoQuy1 = map.get("tap_tin_bao_cao_quy_1") == null ? "" : map.get("tap_tin_bao_cao_quy_1").toString();
            baoCaoQuyNamDeTaiObj.tapTinBaoCaoQuy2 = map.get("tap_tin_bao_cao_quy_2") == null ? "" : map.get("tap_tin_bao_cao_quy_2").toString();
            baoCaoQuyNamDeTaiObj.tapTinBaoCaoQuy3 = map.get("tap_tin_bao_cao_quy_3") == null ? "" : map.get("tap_tin_bao_cao_quy_3").toString();
            baoCaoQuyNamDeTaiObj.tapTinBaoCaoQuy4 = map.get("tap_tin_bao_cao_quy_4") == null ? "" : map.get("tap_tin_bao_cao_quy_4").toString();
            baoCaoQuyNamDeTaiObj.tapTinBaoCaoNam = map.get("tap_tin_bao_cao_nam") == null ? "" : map.get("tap_tin_bao_cao_nam").toString();
            baoCaoQuyNamDeTaiObj.tenDeTai = map.get("ten_de_tai").toString();
            baoCaoQuyNamDeTaiObj.tenHangDeTai = map.get("ten_hang_de_tai").toString();
            baoCaoQuyNamDeTaiObj.tenNhomDeTai = map.get("ten_nhom_de_tai").toString();
            baoCaoQuyNamDeTaiObj.tenLoaiDeTai = map.get("ten_loai_de_tai").toString();
            baoCaoQuyNamDeTaiObj.tenChuThe = map.get("ten_chu_the").toString();
            baoCaoQuyNamDeTaiObjList.add(baoCaoQuyNamDeTaiObj);
        }
        return baoCaoQuyNamDeTaiObjList;
    }
    @Override
    public List getDanhSachBaoCaoQuyNamDeTaiTheoTen(String tenDeTai, String maDonVi, Long nam, int trangThai) {
        String sql = "CALL LayDanhSachBaoCaoQuyNamTheoTen(?,?,?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql, new Object[]{tenDeTai, maDonVi, nam, trangThai});
        ArrayList baoCaoQuyNamDeTaiObjList = new ArrayList();
        for (int i = 0; i < t.size(); i++) {
            Object newtmp = t.get(i);
            LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
            BaoCaoQuyNamDeTaiObj baoCaoQuyNamDeTaiObj = new BaoCaoQuyNamDeTaiObj();
            baoCaoQuyNamDeTaiObj.maDeTai = Long.parseLong(map.get("ma_de_tai").toString());
            baoCaoQuyNamDeTaiObj.trangThai = Integer.parseInt(map.get("trang_thai").toString());
            baoCaoQuyNamDeTaiObj.tapTinBaoCaoQuy1 = map.get("tap_tin_bao_cao_quy_1") == null ? "" : map.get("tap_tin_bao_cao_quy_1").toString();
            baoCaoQuyNamDeTaiObj.tapTinBaoCaoQuy2 = map.get("tap_tin_bao_cao_quy_2") == null ? "" : map.get("tap_tin_bao_cao_quy_2").toString();
            baoCaoQuyNamDeTaiObj.tapTinBaoCaoQuy3 = map.get("tap_tin_bao_cao_quy_3") == null ? "" : map.get("tap_tin_bao_cao_quy_3").toString();
            baoCaoQuyNamDeTaiObj.tapTinBaoCaoQuy4 = map.get("tap_tin_bao_cao_quy_4") == null ? "" : map.get("tap_tin_bao_cao_quy_4").toString();
            baoCaoQuyNamDeTaiObj.tapTinBaoCaoNam = map.get("tap_tin_bao_cao_nam") == null ? "" : map.get("tap_tin_bao_cao_nam").toString();
            baoCaoQuyNamDeTaiObj.tenDeTai = map.get("ten_de_tai").toString();
            baoCaoQuyNamDeTaiObj.tenHangDeTai = map.get("ten_hang_de_tai").toString();
            baoCaoQuyNamDeTaiObj.tenNhomDeTai = map.get("ten_nhom_de_tai").toString();
            baoCaoQuyNamDeTaiObj.tenLoaiDeTai = map.get("ten_loai_de_tai").toString();
            baoCaoQuyNamDeTaiObj.tenChuThe = map.get("ten_chu_the").toString();
            baoCaoQuyNamDeTaiObjList.add(baoCaoQuyNamDeTaiObj);
        }
        return baoCaoQuyNamDeTaiObjList;
    }

    @Override
    public BaoCaoQuyNamDeTaiObj getBaoCaoQuyNamDeTai(Long maDeTai) {
        String sql = "CALL LayBaoCaoQuyNam(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql, new Object[]{maDeTai});
        try
        {
            t.get(0);
        }
        catch (Exception ex)
        {
            return new BaoCaoQuyNamDeTaiObj();
        }
            Object newtmp = t.get(0);
            LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
            BaoCaoQuyNamDeTaiObj baoCaoQuyNamDeTaiObj = new BaoCaoQuyNamDeTaiObj();
            baoCaoQuyNamDeTaiObj.maDeTai = Long.parseLong(map.get("ma_de_tai").toString());
            baoCaoQuyNamDeTaiObj.trangThai = Integer.parseInt(map.get("trang_thai").toString());
            baoCaoQuyNamDeTaiObj.tapTinBaoCaoQuy1 = map.get("tap_tin_bao_cao_quy_1") == null ? "" : map.get("tap_tin_bao_cao_quy_1").toString();
            baoCaoQuyNamDeTaiObj.tapTinBaoCaoQuy2 = map.get("tap_tin_bao_cao_quy_2") == null ? "" : map.get("tap_tin_bao_cao_quy_2").toString();
            baoCaoQuyNamDeTaiObj.tapTinBaoCaoQuy3 = map.get("tap_tin_bao_cao_quy_3") == null ? "" : map.get("tap_tin_bao_cao_quy_3").toString();
            baoCaoQuyNamDeTaiObj.tapTinBaoCaoQuy4 = map.get("tap_tin_bao_cao_quy_4") == null ? "" : map.get("tap_tin_bao_cao_quy_4").toString();
            baoCaoQuyNamDeTaiObj.tapTinBaoCaoNam = map.get("tap_tin_bao_cao_nam") == null ? "" : map.get("tap_tin_bao_cao_nam").toString();
        return baoCaoQuyNamDeTaiObj;
    }

    @Override
    public void updateBaoCaoQuyNamDeTai(BaoCaoQuyNamDeTaiObj obj) {
        try {
            String sql = "CALL CapNhatBaoCaoQuyNam(?,?,?,?,?,?)";
            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            jdbcTemplate.update(sql, new Object[]{
                obj.maDeTai,
                obj.tapTinBaoCaoQuy1,
                obj.tapTinBaoCaoQuy2,
                obj.tapTinBaoCaoQuy3,
                obj.tapTinBaoCaoQuy4,
                obj.tapTinBaoCaoNam,
            });
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }
}
