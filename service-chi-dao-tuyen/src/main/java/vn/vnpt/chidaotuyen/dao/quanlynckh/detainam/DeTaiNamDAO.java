package vn.vnpt.chidaotuyen.dao.quanlynckh.detainam;

import vn.vnpt.chidaotuyen.Obj.quanlynckh.DeTaiNamObj;

import java.util.List;

public interface DeTaiNamDAO {
    public List getDanhSachDeTaiNam(String maDonVi, Long nam, int trangThai);
    public List getDanhSachDeTaiNamTheoTen(String tenDeTai, String maDonVi, Long nam, int trangThai);
    public List getDanhSachNguoiThucHien(Long maDeTai);
    public DeTaiNamObj getDeTaiNam(Long maDeTai);
    public void updateDeTaiNam(DeTaiNamObj obj);
    public void deleteDeTaiNam_NguoiThucHien(Long maDeTai);
    public void addDeTaiNam_NguoiThucHien(Long maDeTai, Long maNhanVien);
}
