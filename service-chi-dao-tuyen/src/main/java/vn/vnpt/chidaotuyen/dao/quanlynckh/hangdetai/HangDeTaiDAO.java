package vn.vnpt.chidaotuyen.dao.quanlynckh.hangdetai;

import vn.vnpt.chidaotuyen.Obj.quanlynckh.HangDeTaiObj;

import java.util.List;

public interface HangDeTaiDAO {
    public List getDanhSachHangDeTai();
    public List getDanhSachHangDeTaiTheoTen(String hangDeTai);
    public HangDeTaiObj getHangDeTai(Long maHangDeTai);
    public void addHangDeTai(HangDeTaiObj obj);
    public void updateHangDeTai(HangDeTaiObj obj);
    public void deleteHangDeTai(Long maHangDeTai);
}
