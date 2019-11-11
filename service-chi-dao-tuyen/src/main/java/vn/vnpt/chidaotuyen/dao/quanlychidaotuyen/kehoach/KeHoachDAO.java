package vn.vnpt.chidaotuyen.dao.quanlychidaotuyen.kehoach;

import vn.vnpt.chidaotuyen.Obj.quanlychidaotuyen.KeHoachCDT.*;

import java.util.List;

public interface KeHoachDAO {
    public List getDanhSachNamKeHoach();
    public List getDanhSachVanBanTheoKeHoach(long makh);
    public List getDanhSachKeHoachTheoDonVi_Nam(String donVi, String nam);
    public KeHoachCDTObj getKeHoach(long maKeHoach);
    public Long getMaKeHoachMax();
    public void addKeHoach(KeHoachCDTObj obj);
    public void addChiTietKeHoach(long makehoach, long mavb);
    public void updateKeHoach(KeHoachCDTObj obj);
    public void deleteKeHoach(long maKeHoach);
    public void deleteChiTietKeHoach(long maKeHoach);
    public List getDanhSachKeHoachTheoNoidungTrichYeu_DonVi_Nam(String noiDungTrichYeu, String donVi, Long nam);
}
