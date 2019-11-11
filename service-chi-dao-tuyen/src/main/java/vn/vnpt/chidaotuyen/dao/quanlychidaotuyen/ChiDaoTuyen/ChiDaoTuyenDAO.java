package vn.vnpt.chidaotuyen.dao.quanlychidaotuyen.ChiDaoTuyen;

import vn.vnpt.chidaotuyen.Obj.quanlychidaotuyen.ChiDaoTuyen.*;

import java.util.List;

public interface ChiDaoTuyenDAO {
    public List getDanhSachNamCDT(); // Lấy danh sách năm của chỉ đạo tuyến
    public List getDanhSachDonViTiepNhan(String maDonVi); // Lấy danh sách đơn vị tiếp nhận của chỉ đạo tuyến
    public List getDanhSachCDT_Theo_DonVi_Nam_KeHoach(String maDonVi, Long nam, Long maKeHoach);
    public List getDanhSachCDT_Theo_DonVi_Nam(String maDonVi, Long nam);
    public ChiDaoTuyenObj getCDT(long maCDT); // Lấy thông tin của 1 chỉ đạo tuyến theo mã chỉ đạo tuyến
    public Long getMaCDTMax(); // Lấy mã CDT lớn nhất
    public List getAllCDT();
    public void addCDT(ChiDaoTuyenObj obj); // thêm mới chỉ đạo tuyến
    public void addCDT_NoiDung(long maCDT, long maNoiDung); // thêm mới chỉ đạo tuyến - nội dung
    public void addCDT_DoiTuong(long maCDT, long maDoiTuong); // thêm mới chỉ đạo tuyến - đối tượng
    public void addCDT_CaNhan_PhuTrach(long maCDT, long maNhanVien); // thêm mới chỉ đạo tuyến - cá nhân phụ trách
    public void addCDT_CaNhan_TiepNhan(long maCDT, long maNhanVien); // thêm mới chỉ đạo tuyến - cá nhân tiếp nhận
    public void deleteCDT_NoiDung(long maCDT);
    public void deleteCDT_DoiTuong(long maCDT);
    public void deleteCDT_CaNhan_PhuTrach(long maCDT);
    public void deleteCDT_CaNhan_TiepNhan(long maCDT);
    public void updateCDT(ChiDaoTuyenObj obj); // Cập nhật thông tin chỉ đạo tuyến
    public void deleteCDT(long maCDT); // Xóa chỉ đạo tuyến

    // Phục vụ cho phần sửa chỉ đạo tuyến

    public  List getDanhSachCDT_NoiDung_TheoMa(Long maCDT);
    public  List getDanhSachCDT_DoiTuong_TheoMa(Long maCDT);
    public  List getDanhSachCDT_CaNhan_PhuTrach_TheoMa(Long maCDT);
    public  List getDanhSachCDT_CaNhan_TiepNhan_TheoMa(Long maCDT);
}
