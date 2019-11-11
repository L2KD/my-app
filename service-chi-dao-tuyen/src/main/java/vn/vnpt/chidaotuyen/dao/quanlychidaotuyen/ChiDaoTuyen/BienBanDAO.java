package vn.vnpt.chidaotuyen.dao.quanlychidaotuyen.ChiDaoTuyen;

import vn.vnpt.chidaotuyen.Obj.quanlychidaotuyen.ChiDaoTuyen.BienBanObj;

public interface BienBanDAO {
    public BienBanObj getBienBan(Long maCDT);
    public void addBienBan(BienBanObj obj);
    public void updateBienBan(BienBanObj obj);
}
