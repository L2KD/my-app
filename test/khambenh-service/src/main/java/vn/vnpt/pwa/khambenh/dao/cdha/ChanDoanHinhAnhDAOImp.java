package vn.vnpt.pwa.khambenh.dao.cdha;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import vn.vnpt.pwa.khambenh.object.CDHAObj;

import javax.sql.DataSource;
import java.util.List;
import java.util.Map;

@Repository
public class ChanDoanHinhAnhDAOImp implements ChanDoanHinhAnhDAO {
    
    @Autowired
    DataSource dataSource;
    public List cdhaInsertBangCha(CDHAObj cdhaObj){
        String sql = "call his_cls.KB_NT_cdha_insert_bang_cha_svv(?,?,?,?,?,?,?,?,?,?,?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForList(sql, new Object[]{
            cdhaObj.maKhamBenh,
            cdhaObj.dvtt,
            cdhaObj.maPhongCDHA,
            cdhaObj.bacSiDT,
            cdhaObj.nguoiChiDinh,
            cdhaObj.phongChiDinh,
            cdhaObj.coBhyt,
            cdhaObj.ngayChiDinh,
            cdhaObj.soVaoVien,
            cdhaObj.maBenhNhan,
            cdhaObj.capCuu,
            cdhaObj.giamDinhVien
        });
    }

    public List cdhaHienThiDsCDHA(CDHAObj cdhaObj){
        String sql = "call his_cls.KB_NT_CDHA_GET_CH_MOI(?,?,?,?,?,?,?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForList(sql, new Object[]{
            cdhaObj.bhytKhongChi,
            cdhaObj.dvtt,
            cdhaObj.soPhieuCDHA,
            cdhaObj.maPhongCDHA,
            cdhaObj.chonBangGiaCuLienKe,
            cdhaObj.soVaoVien,
            cdhaObj.loaiBoGia0Dong,
            cdhaObj.phanTheoGioiTinh

        });
    }

    public List cdhaHienThiPhieuCDHA(CDHAObj cdhaObj){
        String sql = "call his_cls.KB_NT_cdha_select_phieu_svv(?,?,?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForList(sql, new Object[]{
            cdhaObj.maKhamBenh,
            cdhaObj.dvtt,
            cdhaObj.ngayChiDinh,
            cdhaObj.soVaoVien
        });
    }

    public List cdhaHienThiDsCDHADaChon(CDHAObj cdhaObj){
        String sql = "call his_cls.AGG_KB_NGT_CDHA_LUOI_DACHON_F(?,?,?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForList(sql, new Object[]{
            cdhaObj.bhytKhongChi,
            cdhaObj.dvtt,
            cdhaObj.soPhieuCDHA,
            cdhaObj.soVaoVien
        });
    }

    public void cdhaDeleteCacChiTiet(CDHAObj cdhaObj){
        String sql = "call his_cls.kb_nt_cdha_delete_cct_svv(?,?,?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        jdbcTemplate.update(sql, new Object[]{
            cdhaObj.soPhieuCDHA,
            cdhaObj.dvtt,
            cdhaObj.maCDHAStr,
            cdhaObj.soVaoVien
        });
    }

    public void cdhaUpdateBangCha(CDHAObj cdhaObj){
        String sql = "call his_cls.KB_NT_cdha_update_bangcha_svv(?,?,?,?,?)#l,l,s,s,l,s";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        jdbcTemplate.update(sql, new Object[]{
            cdhaObj.soVaoVien,
            cdhaObj.dvtt,
            cdhaObj.soPhieuCDHA,
            cdhaObj.capCuu,
            cdhaObj.maKhamBenh
        });
    }

    public void themChiCinhCDHAObjChiTietDongLoat(CDHAObj cdhaObj, List<String> listMaDV,
                                                  List<String> listSLDV, List<String> listGIA,
                                                  List<String> listTHANHTIEN, List<String> listGIABH,
                                                  List<String> listGIAKBH){
        String sql = "call his_cls.KB_NGT_CDHA_INS_CHITIET_DL_MOI(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        jdbcTemplate.update(sql, new Object[]{
            cdhaObj.soPhieuCDHA,
            listMaDV.toString().replaceAll("\\[", "").replaceAll("]", ""),
            cdhaObj.dvtt,
            listSLDV.toString().replaceAll("\\[", "").replaceAll("]", ""),
            listGIA.toString().replaceAll("\\[", "").replaceAll("]", ""),
            listTHANHTIEN.toString().replaceAll("\\[", "").replaceAll("]", ""),
            cdhaObj.bhytKhongChi,
            cdhaObj.maBenhNhan,
            cdhaObj.soPhieuThanhToan,
            cdhaObj.idTiepNhan,
            cdhaObj.maKhamBenh,
            cdhaObj.ngayChiDinh,
            cdhaObj.soVaoVien,
            listGIABH.toString().replaceAll("\\[", "").replaceAll("]", ""),
            listGIAKBH.toString().replaceAll("\\[", "").replaceAll("]", ""),
            cdhaObj.nguoiChiDinh,
            cdhaObj.soLuongLamTron2ThapPhan
        });
    }

    public String cdhaDeleteBangCha(CDHAObj cdhaObj){
        String sql = "call his_cls.KB_NT_cdha_delete_bangcha_svv(?,?,?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate.queryForObject(sql, new Object[]{
            cdhaObj.maKhamBenh,
            cdhaObj.soPhieuCDHA,
            cdhaObj.dvtt,
            cdhaObj.soVaoVien
        }, String.class);
    }
}
