package vn.vnpt.chidaotuyen.dao.quanlynckh.chucvuhoidong;

import vn.vnpt.chidaotuyen.Obj.quanlynckh.ChucVuHoiDongObj;

import java.util.List;

public interface ChucVuHoiDongDAO {
    public List getDanhSachChucVu();
    public List getDanhSachChucVuTheoTen(String chucVu);
    public ChucVuHoiDongObj getChucVu(Long maChucVu);
    public void addChucVu(ChucVuHoiDongObj obj);
    public void updateChucVu(ChucVuHoiDongObj obj);
    public void deleteChucVu(Long maChucVu);
}
