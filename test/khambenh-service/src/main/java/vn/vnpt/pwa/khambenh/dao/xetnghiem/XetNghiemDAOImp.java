package vn.vnpt.pwa.khambenh.dao.xetnghiem;

import org.codehaus.jettison.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import vn.vnpt.pwa.khambenh.object.XetNghiemObj;

import javax.sql.DataSource;
import java.util.List;

@Repository
public class XetNghiemDAOImp implements XetNghiemDAO {
    @Autowired
    private DataSource dataSource;

    public List xetNghiemInsertBangCha(XetNghiemObj xn) {
        String sql = "call his_cls.KB_NT_XN_insert_bang_cha_svv(?,?,?,?,?,?,?,?,?,?,?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForList(sql, new Object[]{
            xn.maKhamBenh,
            xn.dvtt,
            xn.maPhongXN,
            xn.bacSiDieuTri,
            xn.nguoiChiDinh,
            xn.phongCD,
            xn.coBhyt,
            xn.ngayChiDinh,
            xn.soVaoVien,
            xn.maBenhNhan,
            xn.capCuu,
            xn.giamDinhVien
        });
    }

    @Override
    public List xetNghiemHienThiDSXetNghiem(XetNghiemObj xn) {
        //String sql = "call his_cls.KB_NT_XN_GET_chung_phogxn(?,?,?,?,?,?)#c,l,s,s,l,l,l";
        String sql = "call his_cls.KB_NT_XN_GET_CH_PHOGXN_MOI(?,?,?,?,?,?,?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForList(sql, new Object[]{
            xn.bhytKhongChi,
            xn.dvtt,
            xn.soPhieuXN,
            xn.chonBangGiaCuLienKe,
            xn.maPhongXN,
            xn.soVaoVien,
            xn.boGia0Dong,
            xn.phanTheoGioiTinh
        });
    }

    public List xetNghiemHienThiDSXetNghiemDaChon(XetNghiemObj xn) {
        String sql = "call his_cls.AGG_KB_NGT_XN_LUOICHON_F(?,?,?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForList(sql, new Object[]{
            xn.bhytKhongChi,
            xn.dvtt,
            xn.soPhieuXN,
            0
        });
    }

    public List xetNghiemHienThiPhieuXetNghiem(XetNghiemObj xn) {

        String sql = "call his_cls.KB_NT_XN_GET_phieu_svv(?,?,?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForList(sql, new Object[]{
            xn.maKhamBenh,
            xn.dvtt,
            xn.ngayChiDinh,
            xn.soVaoVien
        });
    }

    public String xetNghiemDeleteCacChiTiet(XetNghiemObj xn) {
        String sql = "call his_cls.KB_NT_XN_DL_CCT_svv(?,?,?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForObject(sql, new Object[]{
            xn.soPhieuXN,
            xn.dvtt,
            xn.maxnStr,
            xn.soVaoVien
        }, String.class);
    }

    public void xetNghiemUpdateBangCha(XetNghiemObj xn){
        String sql = "call his_cls.KB_NT_XN_update_bangcha_svv(?,?,?,?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        jdbcTemplate.update(sql, new Object[]{
            xn.soVaoVien,
            xn.dvtt,
            xn.soPhieuXN,
            xn.capCuu,
            xn.maKhamBenh
        });
    }

    public void themChiDinhXNChiTietDongLoat(XetNghiemObj xetNghiemObj, List<String> listMaDV, List<String> listSLDV, List<String> listGia, List<String> listThanhTien, List<String> listGiaBH, List<String> listGiaKBH){
        String sql = "call his_cls.KB_NGT_XN_INS_CHITIET_DL_MOI(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        jdbcTemplate.update(sql, new Object[]{
            xetNghiemObj.soPhieuXN,
            listMaDV.toString().replaceAll("\\[", "").replaceAll("]", ""),
            xetNghiemObj.dvtt,
            listSLDV.toString().replaceAll("\\[", "").replaceAll("]", ""),
            listGia.toString().replaceAll("\\[", "").replaceAll("]", ""),
            listThanhTien.toString().replaceAll("\\[", "").replaceAll("]", ""),
            xetNghiemObj.bhytKhongChi,
            xetNghiemObj.maBenhNhan,
            xetNghiemObj.soPhieuThanhToan,
            xetNghiemObj.idTiepNhan,
            xetNghiemObj.maKhamBenh,
            xetNghiemObj.ngayChiDinh,
            xetNghiemObj.soVaoVien,
            listGiaBH.toString().replaceAll("\\[", "").replaceAll("]", ""),
            listGiaKBH.toString().replaceAll("\\[", "").replaceAll("]", ""),
            xetNghiemObj.soLuongLamTron2ThapPhan
        });
    }

    public String xetNghiemDeleteBangCha(XetNghiemObj xn){
        String sql = "call his_cls.KB_NT_XT_delete_bangcha_svv(?,?,?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForObject(sql, new Object[]{
            xn.maKhamBenh,
            xn.soPhieuXN,
            xn.dvtt,
            xn.soVaoVien
        }, String.class);
    }
}
