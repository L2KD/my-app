package vn.vnpt.chidaotuyen.dao.quanlynckh.xetduyetdetaidonvi;

import vn.vnpt.chidaotuyen.Obj.quanlynckh.XetDuyetDeTaiDonViObj;

import java.util.List;

public interface XetDuyetDeTaiDonViDAO {
    public List getDanhSachXetDuyetDeTaiDonVi(String maDonVi, Long nam, int trangThai);
    public List getDanhSachXetDuyetDeTaiDonViTheoTen(String tenDeTai, String maDonVi, Long nam, int trangThai);
    public XetDuyetDeTaiDonViObj getXetDuyetDeTaiDonVi(Long maDeTai);
    public void updateXetDuyetDeTaiDonVi(XetDuyetDeTaiDonViObj obj);
}
