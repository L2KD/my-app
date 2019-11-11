package vn.vnpt.chidaotuyen.dao.quanlychidaotuyen.nhanvien;

import java.util.List;

public interface NhanVienDAO {
    public List getDanhSachNhanVienTheoKhoaPhong(String maKhoaPhong);
    public List getDanhSachNhanVienTheoDonVi(String maDonVi);
}
