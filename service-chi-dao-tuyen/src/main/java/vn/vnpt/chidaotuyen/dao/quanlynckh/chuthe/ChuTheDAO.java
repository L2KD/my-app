package vn.vnpt.chidaotuyen.dao.quanlynckh.chuthe;

import vn.vnpt.chidaotuyen.Obj.quanlynckh.ChuTheObj;

import java.util.List;

public interface ChuTheDAO {
    public List getDanhSachChuThe();
    public List getDanhSachChuTheTheoTen(String chuTheDeTai);
    public ChuTheObj getChuThe(Long maChuThe);
    public void addChuThe(ChuTheObj obj);
    public void updateChuThe(ChuTheObj obj);
    public void deleteChuThe(Long maChuThe);
}
