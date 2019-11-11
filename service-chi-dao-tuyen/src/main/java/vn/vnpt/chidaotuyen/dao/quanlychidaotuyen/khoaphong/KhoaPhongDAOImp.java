package vn.vnpt.chidaotuyen.dao.quanlychidaotuyen.khoaphong;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.util.LinkedCaseInsensitiveMap;
import vn.vnpt.chidaotuyen.Obj.quanlychidaotuyen.KhoaPhongObj;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.List;

@Repository
public class KhoaPhongDAOImp implements KhoaPhongDAO {
    @Autowired
    private DataSource dataSource;

    @Override
    public List getDanhSachKhoaPhongTheoDonVi(String maDonVi) {
        String sql = "CALL LayDanhSachKhoaPhongTheoDonVi(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql, new Object []{maDonVi});
        ArrayList khoaPhongObjList = new ArrayList();
        for (int i = 0; i < t.size(); i++) {
            Object newtmp = t.get(i);
            LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
            KhoaPhongObj khoaPhongObj = new KhoaPhongObj();
            khoaPhongObj.maKhoaPhong = map.get("ma_khoa_phong").toString();
            khoaPhongObj.tenKhoaPhong = map.get("ten_khoa_phong").toString();
            khoaPhongObj.maDonVi = Long.parseLong(map.get("ma_don_vi").toString());
            khoaPhongObj.capKhoaPhong = Integer.parseInt(map.get("cap_khoa_phong").toString());
            khoaPhongObj.kyHieuKhoaPhong = map.get("ky_hieu_khoa_phong").toString();
            khoaPhongObj.soDienThoai = map.get("so_dien_thoai").toString();
            khoaPhongObjList.add(khoaPhongObj);
        }
        return khoaPhongObjList;
    }
}
