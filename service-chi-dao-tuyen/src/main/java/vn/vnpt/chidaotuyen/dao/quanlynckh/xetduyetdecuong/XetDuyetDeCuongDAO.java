package vn.vnpt.chidaotuyen.dao.quanlynckh.xetduyetdecuong;

import vn.vnpt.chidaotuyen.Obj.quanlynckh.XetDuyetDeCuongObj;

import java.util.List;

public interface XetDuyetDeCuongDAO {
    public List getDanhSachXetDuyetDeCuong(String maDonVi, Long nam, int trangThai);
    public List getDanhSachXetDuyetDeCuongTheoTen(String tenDeTai, String maDonVi, Long nam, int trangThai);
    public XetDuyetDeCuongObj getXetDuyetDeCuong(Long maDeCuong);
    public void updateXetDuyetDeCuong(XetDuyetDeCuongObj obj);
}
