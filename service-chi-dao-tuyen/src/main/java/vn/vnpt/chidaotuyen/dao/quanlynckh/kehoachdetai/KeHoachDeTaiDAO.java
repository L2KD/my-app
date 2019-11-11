package vn.vnpt.chidaotuyen.dao.quanlynckh.kehoachdetai;

import vn.vnpt.chidaotuyen.Obj.quanlynckh.KeHoachDeTaiObj;

import java.util.List;

public interface KeHoachDeTaiDAO {
    public List getDanhSachNamKeHoachDeTai();
    public List getDanhSachNamKeHoachDeTaiTheoKeHoach_DonVi_Nam(String keHoach, String donVi, Long nam);
    public List getDanhSachKeHoachDeTai(String donVi, long nam);
    public KeHoachDeTaiObj getKeHoachdeTai(Long maKeHoach);
    public void addKeHoachDeTai(KeHoachDeTaiObj obj);
    public void updateKeHoachDeTai(KeHoachDeTaiObj obj);
    public void deleteKeHoachDeTai(Long maKeHoach);
}
