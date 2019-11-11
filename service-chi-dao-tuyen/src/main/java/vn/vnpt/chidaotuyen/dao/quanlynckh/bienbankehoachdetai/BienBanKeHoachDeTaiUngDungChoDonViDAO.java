package vn.vnpt.chidaotuyen.dao.quanlynckh.bienbankehoachdetai;

import vn.vnpt.chidaotuyen.Obj.quanlynckh.BienBanKeHoachDeTaiObj;

import java.util.List;

public interface BienBanKeHoachDeTaiUngDungChoDonViDAO {
    public List getDanhSachBienBanKeHoachDeTaiUngDungChoDonVi(String maDonVi, Long nam, int trangThai);
    public List getDanhSachBienBanKeHoachDeTaiUngDungChoDonViTheoTen(String tenDeTai, String maDonVi, Long nam, int trangThai);
    public BienBanKeHoachDeTaiObj getBienBienKeHoachDeTaiUngDungChoDonVi(Long maDeTai);
    public void updateBienBanKeHoachDeTaiUngDungChoDonVi(BienBanKeHoachDeTaiObj obj);
}
