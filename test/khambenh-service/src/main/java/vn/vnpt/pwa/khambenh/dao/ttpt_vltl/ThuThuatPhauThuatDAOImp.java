package vn.vnpt.pwa.khambenh.dao.ttpt_vltl;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import vn.vnpt.pwa.khambenh.object.TTPT_VLTLObj;

import javax.sql.DataSource;
import java.util.List;
import java.util.Map;

@Repository
public class ThuThuatPhauThuatDAOImp implements ThuThuatPhauThuatDAO {
    @Autowired
    DataSource dataSource;
    @Override
    public List ttptInsertBangCha(TTPT_VLTLObj ttpt) {

        String sql = "call his_cls.kb_ngt_cddv_ins_bang_cha_svv_F(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForList(sql, new Object[]{
            ttpt.maKhamBenh,
            ttpt.maPhongDV,
            ttpt.dvtt,
            ttpt.maLoaiDV,
            ttpt.bacsiDieuTri,
            ttpt.phongChiDinh,
            ttpt.coBhyt,
            ttpt.chuyenKhoa,
            ttpt.chiTietChuyenKhoa,
            ttpt.nguoiChiDinh,
            ttpt.ngayChiDinh,
            ttpt.soVaoVien,
            ttpt.maBenhNhan,
            ttpt.capCuu,
            ttpt.giamDinhVien
        });
    }

    @Override
    public List ttptHienThiDSDichVu(TTPT_VLTLObj ttpt) {
        //String sql = "call his_cls.kb_ngt_cddv_ht_luoi_chung(?,?,?,?,?,?,?,?)#c,l,s,s,s,s,s,l,l";
        String sql = "call his_cls.KB_NGT_CDDV_HT_LUOI_CH_MOI(?,?,?,?,?,?,?,?,?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List<Map<String, Object>> list = jdbcTemplate.queryForList(sql, new Object[]{
            ttpt.bhytKhongChi,
            ttpt.dvtt,
            ttpt.soPhieu,
            ttpt.maLoaiDV,
            ttpt.chuyenKhoa,
            ttpt.chiTietChuyenKhoa,
            ttpt.chonBangGiaCuLienKe,
            ttpt.soVaoVien,
            ttpt.loaiBoGia0Dong,
            ttpt.phanTheoGioiTinh
        });

        sql = "SELECT * FROM his_dm.DM_LOAI_DICH_VU_KHAM";
        List<Map<String, Object>> listLoaiHinh = jdbcTemplate.queryForList(sql);

        for (Map<String, Object> dv : list) {
            try {
                Object maNhomDv = dv.get("MA_NHOM_DV");
                for (Map<String, Object> loaiHinh : listLoaiHinh) {
                    Object maLoaiHinh = loaiHinh.get("MA_LOAIHINH");
                    Object tenLoaiHinh = loaiHinh.get("TEN_LOAIHINH");
                    if (maNhomDv.equals(maLoaiHinh)) {
                        dv.put("TEN_LOAIHINH", tenLoaiHinh);
                    }
                }
                if (!dv.containsKey("TEN_LOAIHINH"))
                    dv.put("TEN_LOAIHINH", "");
            } catch (Exception e) {
                e.printStackTrace();
                continue;
            }
        }
        return list;

    }

    @Override
    public List ttptHienThiDSLoaiDichVu(String dvtt) {
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        String sql = "SELECT ma_loai_dich_vu as maLoaiDichVu, ten_loai_dich_vu as tenLoaiDichVu, dvtt, hoatdong as hoatDong, uutien as uuTien, ma_hethong as maHeThong " +
            "FROM his_dm.DM_LOAI_DICH_VU_KHAM where dvtt = " + dvtt + " order by uutien";
        List<Map<String, Object>> listLoaiDichVu = jdbcTemplate.queryForList(sql);
        return listLoaiDichVu;
    }

    @Override
    public List ttptHienThiDSPhieu(TTPT_VLTLObj ttpt) {
        String sql = "call his_cls.kb_ngt_cddv_select_phieu_svv(?,?,?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForList(sql, new Object[]{
            ttpt.maKhamBenh,
            ttpt.dvtt,
            ttpt.ngayChiDinh,
            ttpt.soVaoVien
        });
    }

    @Override
    public List ttptHienThiDSDichVuDaChon(TTPT_VLTLObj ttpt) {
        String sql = "call his_cls.AGG_KB_NGT_PTTT_LUOI_DACHON_F(?,?,?,?,?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForList(sql, new Object[]{
            ttpt.bhytKhongChi,
            ttpt.dvtt,
            ttpt.soPhieu,
            ttpt.maLoaiDV,
            ttpt.chuyenKhoa,
            ttpt.chiTietChuyenKhoa
        });
    }
    @Override
    public void ttptDeleteCacChiTiet(TTPT_VLTLObj ttpt) {
        String sql = "call his_cls.kb_ngoaitru_cddv_dl_cacct_svv(?,?,?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        jdbcTemplate.update(sql, new Object[]{
            ttpt.soPhieu,
            ttpt.dvtt,
            ttpt.maDVStr,
            ttpt.soVaoVien
        });
    }
    @Override
    public void ttptUpdateBangCha(TTPT_VLTLObj ttpt) {
        String sql = "call his_cls.kb_nt_cddv_update_bangcha_svv(?,?,?,?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        jdbcTemplate.update(sql, new Object[]{
            ttpt.soVaoVien,
            ttpt.dvtt,
            ttpt.soPhieu,
            ttpt.capCuu,
            ttpt.maKhamBenh
        });
    }

    @Override
    public void themChiDinhTtptChiTietDongLoat(TTPT_VLTLObj ttptVltlObj, List<String> listMaDV, List<String> listSLDV, List<String> listGIA, List<String> listTHANHTIEN, List<String> listGIABH, List<String> listGIAKBH) {
        String sql = "call his_cls.KB_NGT_CDDV_INS_CT_DL_MOI(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        jdbcTemplate.update(sql, new Object[]{
            ttptVltlObj.soPhieu,
            listMaDV.toString().replaceAll("\\[", "").replaceAll("]", ""),
            ttptVltlObj.dvtt,
            listSLDV.toString().replaceAll("\\[", "").replaceAll("]", ""),
            listGIA.toString().replaceAll("\\[", "").replaceAll("]", ""),
            listTHANHTIEN.toString().replaceAll("\\[", "").replaceAll("]", ""),
            ttptVltlObj.bhytKhongChi,
            ttptVltlObj.maBenhNhan,
            ttptVltlObj.soPhieuThanhToan,
            ttptVltlObj.idTiepNhan,
            ttptVltlObj.maKhamBenh,
            ttptVltlObj.ngayChiDinh,
            ttptVltlObj.soVaoVien,
            listGIABH.toString().replaceAll("\\[", "").replaceAll("]", ""),
            listGIAKBH.toString().replaceAll("\\[", "").replaceAll("]", ""),
            ttptVltlObj.soLuongLamTron2ThapPhan
        });
    }

    @Override
    public String ttptDeleteBangCha(TTPT_VLTLObj ttpt) {
        String sql = "call his_cls.kb_nt_cddv_delete_bangcha_svv(?,?,?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForObject(sql, new Object[]{
            ttpt.maKhamBenh,
            ttpt.soPhieu,
            ttpt.dvtt,
            ttpt.soVaoVien
        }, String.class);
    }
}
