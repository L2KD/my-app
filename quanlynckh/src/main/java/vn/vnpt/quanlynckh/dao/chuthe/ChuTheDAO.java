package vn.vnpt.quanlynckh.dao.chuthe;

import vn.vnpt.quanlynckh.obj.ChuTheObj;

import java.util.List;

public interface ChuTheDAO {
    public List getDanhSachChuThe();
    public ChuTheObj getChuThe(Long maChuThe);
    public void addChuThe(ChuTheObj obj);
    public void updateChuThe(ChuTheObj obj);
    public void deleteChuThe(Long maChuThe);
}
