package vn.vnpt.chidaotuyen.dao.quanlynckh.vanbanapdunglaudai;

import vn.vnpt.chidaotuyen.Obj.quanlynckh.VanBanApDungLauDaiObj;

import java.util.List;

public interface VanBanApDungLauDaiDAO {
    public List getDanhSachVanBanApDungLauDai(String maDonVi, Long nam, int trangThai);
    public List getDanhSachVanBanApDungLauDaiTheoTen(String tenDeTai, String maDonVi, Long nam, int trangThai);
    public VanBanApDungLauDaiObj getVanBanApDungLauDai(Long maDeTai);
    public void updateVanBanApDungLauDai(VanBanApDungLauDaiObj obj);
}
