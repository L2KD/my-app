package vn.vnpt.pwa.khambenh.dao.xetnghiem;

import org.codehaus.jettison.json.JSONObject;
import vn.vnpt.pwa.khambenh.object.XetNghiemObj;

import java.util.List;

public interface XetNghiemDAO {

    public List xetNghiemInsertBangCha(XetNghiemObj xn);

    public List xetNghiemHienThiDSXetNghiem(XetNghiemObj xn);

    public List xetNghiemHienThiDSXetNghiemDaChon(XetNghiemObj xn);

    public List xetNghiemHienThiPhieuXetNghiem(XetNghiemObj xn);

    public String xetNghiemDeleteCacChiTiet(XetNghiemObj xn);

    public void xetNghiemUpdateBangCha(XetNghiemObj xn);

    public void themChiDinhXNChiTietDongLoat(XetNghiemObj xetNghiemObj, List<String> listMaDV, List<String> listSLDV, List<String> listGia, List<String> listThanhTien, List<String> listGiaBH, List<String> listGiaKBH);

    public String xetNghiemDeleteBangCha(XetNghiemObj xn);
}
