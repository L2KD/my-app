package vn.vnpt.quanlynckh.dao.hangdetai;

import vn.vnpt.quanlynckh.obj.HangDeTaiObj;

import java.util.List;

public interface HangDeTaiDAO {
    public List getDanhSachHangDeTai();
    public HangDeTaiObj getHangDeTai(Long maHangDeTai);
    public void addHangDeTai(HangDeTaiObj obj);
    public void updateHangDeTai(HangDeTaiObj obj);
    public void deleteHangDeTai(Long maHangDeTai);
}
