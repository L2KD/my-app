package vn.vnpt.pwa.khambenh.dao.cdha;

import org.json.JSONObject;
import vn.vnpt.pwa.khambenh.object.CDHAObj;

import java.util.List;

public interface ChanDoanHinhAnhDAO {
    public List cdhaInsertBangCha(CDHAObj cdhaObj);

    public List cdhaHienThiDsCDHA(CDHAObj cdhaObj);

    public List cdhaHienThiPhieuCDHA(CDHAObj cdhaObj);

    public List cdhaHienThiDsCDHADaChon(CDHAObj cdhaObj);

    public void cdhaDeleteCacChiTiet(CDHAObj cdhaObj);

    public void cdhaUpdateBangCha(CDHAObj cdhaObj);

    public void themChiCinhCDHAObjChiTietDongLoat(CDHAObj cdhaObj, List<String> listMaDV, List<String> listSLDV, List<String> listGIA, List<String> listTHANHTIEN, List<String> listGIABH, List<String> listGIAKBH);

    public String cdhaDeleteBangCha(CDHAObj cdhaObj);
}
