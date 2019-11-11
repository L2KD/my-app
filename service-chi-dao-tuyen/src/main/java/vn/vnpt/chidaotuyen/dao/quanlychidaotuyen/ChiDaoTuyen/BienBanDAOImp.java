package vn.vnpt.chidaotuyen.dao.quanlychidaotuyen.ChiDaoTuyen;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.util.LinkedCaseInsensitiveMap;
import vn.vnpt.chidaotuyen.Obj.quanlychidaotuyen.ChiDaoTuyen.BienBanObj;

import javax.sql.DataSource;
import java.util.List;

@Repository
public class BienBanDAOImp implements BienBanDAO {
    @Autowired
    private DataSource dataSource;

    @Override
    public BienBanObj getBienBan(Long maCDT) {
        String sql = "CALL LayBienBan(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List tmp = jdbcTemplate.queryForList(sql, new Object[] { maCDT });
        try {
            tmp.get(0);
        }
        catch (Exception ex)
        {
            return new BienBanObj();
        }
        Object newtmp = tmp.get(0);
        LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
        BienBanObj bienBanObj = new BienBanObj();
        bienBanObj.maCDT = Long.parseLong(map.get("ma_cdt").toString());
        bienBanObj.danhGia = Long.parseLong(map.get("danh_gia").toString());
        bienBanObj.ngayBatDau = map.get("ngay_bat_dau").toString();
        bienBanObj.ngayKetThuc = map.get("ngay_ket_thuc").toString();
        bienBanObj.baoCaoKetQua = map.get("bao_cao_ket_qua") == null ? "" : map.get("bao_cao_ket_qua").toString();
        bienBanObj.thongBaoSaiSot = map.get("thong_bao_sai_sot") == null ? "" : map.get("thong_bao_sai_sot").toString();
        bienBanObj.deNghi = map.get("de_nghi") == null ? "" : map.get("de_nghi").toString();
        bienBanObj.dongGop = map.get("dong_gop") == null ? "" : map.get("dong_gop").toString();
        bienBanObj.nhuCau = map.get("nhu_cau") == null ? "" : map.get("nhu_cau").toString();
        bienBanObj.nguoiTao = Long.parseLong(map.get("nguoi_tao").toString());
        return bienBanObj;
    }

    @Override
    public void addBienBan(BienBanObj obj) {
        try {
            String sql = "CALL ThemBienBan(?,?,?,?,?,?,?,?,?,?)";
            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            jdbcTemplate.update(sql, new Object[]{
                obj.maCDT,
                obj.danhGia,
                obj.ngayBatDau,
                obj.ngayKetThuc,
                obj.baoCaoKetQua,
                obj.thongBaoSaiSot,
                obj.deNghi,
                obj.dongGop,
                obj.nhuCau,
                obj.nguoiTao
            });
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void updateBienBan(BienBanObj obj) {
        try {
            String sql = "CALL CapNhatBienBan(?,?,?,?,?,?,?,?,?,?)";
            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            jdbcTemplate.update(sql, new Object[]{
                obj.maCDT,
                obj.danhGia,
                obj.ngayBatDau,
                obj.ngayKetThuc,
                obj.baoCaoKetQua,
                obj.thongBaoSaiSot,
                obj.deNghi,
                obj.dongGop,
                obj.nhuCau,
                obj.nguoiTao
            });
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }
}
