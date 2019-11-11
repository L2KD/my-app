package vn.vnpt.chidaotuyen.dao.quanlynckh.loaidetai;

import vn.vnpt.chidaotuyen.Obj.quanlynckh.LoaiDeTaiObj;

import java.util.List;

public interface LoaiDeTaiDAO {
    public List getDanhSachLoaiDeTai();
    public List getDanhSachLoaiDeTaiTheoTen(String loaiDeTai);
    public LoaiDeTaiObj getLoaiDeTai(Long maLoaiDeTai);
    public void addLoaiDeTai(LoaiDeTaiObj obj);
    public void updateLoaiDeTai(LoaiDeTaiObj obj);
    public void deleteLoaiDeTai(Long maLoaiDeTai);
}
