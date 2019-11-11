package vn.vnpt.quanlynckh.dao.chucvu;

import vn.vnpt.quanlynckh.obj.ChucVuObj;

import java.util.List;

public interface ChucVuDAO {
    public List getDanhSachChucVu();
    public ChucVuObj getChucVu(Long maChucVu);
    public void addChucVu(ChucVuObj obj);
    public void updateChucVu(ChucVuObj obj);
    public void deleteChucVu(Long maChucVu);
}
