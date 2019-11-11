package vn.vnpt.chidaotuyen.dao.quanlynckh.xetduyetdetaiungdungchodonvi;

import vn.vnpt.chidaotuyen.Obj.quanlynckh.XetDuyetDeTaiUngDungChoDonViObj;

import java.util.List;

public interface XetDuyetDeTaiUngDungChoDonViDAO {
    public List getDanhSachXetDuyetDeTaiUngDungChoDonVi(String maDonVi, Long nam, int trangThai);
    public List getDanhSachXetDuyetDeTaiUngDungChoDonViTheoTen(String tenDeTai, String maDonVi, Long nam, int trangThai);
    public XetDuyetDeTaiUngDungChoDonViObj getXetDuyetDeTaiUngDungChoDonVi(Long maDeTai);
    public void updateXetDuyetDeTaiUngDungChoDonVi(XetDuyetDeTaiUngDungChoDonViObj obj);
}
