package vn.vnpt.pwa.khambenh.dao.ttpt_vltl;

import vn.vnpt.pwa.khambenh.object.TTPT_VLTLObj;

import java.util.List;

public interface ThuThuatPhauThuatDAO {
    public List ttptInsertBangCha(TTPT_VLTLObj ttpt);

    public List ttptHienThiDSDichVu(TTPT_VLTLObj ttpt);

    public List ttptHienThiDSLoaiDichVu(String dvtt);

    public List ttptHienThiDSPhieu(TTPT_VLTLObj ttpt);

    public List ttptHienThiDSDichVuDaChon(TTPT_VLTLObj ttpt);

    public void ttptDeleteCacChiTiet(TTPT_VLTLObj ttpt);

    public void ttptUpdateBangCha(TTPT_VLTLObj ttpt);

    public void themChiDinhTtptChiTietDongLoat(TTPT_VLTLObj ttptVltlObj, List<String> listMaDV, List<String> listSLDV, List<String> listGIA, List<String> listTHANHTIEN, List<String> listGIABH, List<String> listGIAKBH);

    public String ttptDeleteBangCha(TTPT_VLTLObj ttpt);

}
