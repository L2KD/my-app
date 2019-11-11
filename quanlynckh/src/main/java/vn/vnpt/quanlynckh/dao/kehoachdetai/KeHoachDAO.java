package vn.vnpt.quanlynckh.dao.kehoachdetai;

import vn.vnpt.quanlynckh.obj.KeHoachObj;

import java.util.List;

public interface KeHoachDAO {
    public List getDanhSachKeHoach();
    public KeHoachObj getKeHoach(Long maKeHoach);
    public void addKeHoach(KeHoachObj obj);
    public void updateKeHoach(KeHoachObj obj);
    public void deleteKeHoach(Long maKeHoach);
}
