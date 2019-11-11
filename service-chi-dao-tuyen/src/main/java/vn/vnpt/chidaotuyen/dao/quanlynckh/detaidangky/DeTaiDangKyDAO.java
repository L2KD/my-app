package vn.vnpt.chidaotuyen.dao.quanlynckh.detaidangky;

import vn.vnpt.chidaotuyen.Obj.quanlynckh.DeTaiDangKyObj;

import java.util.List;

public interface DeTaiDangKyDAO {
    public List getDanhSachDeTaiDangKy(String donVi, long nam);
    public List getDanhSachDeTaiDangKyTheoTen(String tenDeTai, String donVi, long nam);
    public DeTaiDangKyObj getDeTaiDangKy(Long maDeTai);
    public void addDeTaiDangKyKhoaPhong(long maDeTai, String maKhoaPhong);
    public void addDeTaiDangKy(DeTaiDangKyObj obj);
    public void updateDeTaiDangKy(DeTaiDangKyObj obj);
    public void deleteDeTaiDangKy(Long maDeTai);
    public void deleteDeTaiDangKyKhoaPhong(Long maDeTai);
    public List getDanhSachKhoaPhongThucHienDeTaiDangKy(Long maDeTai);
    public Long getMaDeTaiDangKyMax();
}
