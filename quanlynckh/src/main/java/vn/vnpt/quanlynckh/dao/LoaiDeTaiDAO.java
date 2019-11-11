package vn.vnpt.quanlynckh.dao;

import vn.vnpt.quanlynckh.obj.LoaiDeTaiObj;

import java.util.List;

public interface LoaiDeTaiDAO {
    public List getDanhSachLoaiDeTai();
    public LoaiDeTaiObj getLoaiDeTai(Long maLoaiDeTai);
    public void addLoaiDeTai(LoaiDeTaiObj obj);
    public void updateLoaiDeTai(LoaiDeTaiObj obj);
    public void deleteLoaiDeTai(Long maLoaiDeTai);
}
