package vn.vnpt.chidaotuyen.dao.quanlynckh.vanbanchapthuanapdunglaudai;

import vn.vnpt.chidaotuyen.Obj.quanlynckh.VanBanChapThuanApDungLauDaiObj;

import java.util.List;

public interface VanBanChapThuanApDungLauDaiDAO {
    public List getDanhSachVanBanChapThuanApDungLauDai(String maDonVi, Long nam, int trangThai);
    public List getDanhSachVanBanChapThuanApDungLauDaiTheoTen(String tenDeTai, String maDonVi, Long nam, int trangThai);
    public VanBanChapThuanApDungLauDaiObj getVanBanChapThuanApDungLauDai(Long maDeTai);
    public void updateVanBanChapThuanApDungLauDai(VanBanChapThuanApDungLauDaiObj obj);
}
