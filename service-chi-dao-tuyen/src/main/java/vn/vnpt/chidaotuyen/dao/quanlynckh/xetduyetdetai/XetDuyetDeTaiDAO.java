package vn.vnpt.chidaotuyen.dao.quanlynckh.xetduyetdetai;

import vn.vnpt.chidaotuyen.Obj.quanlynckh.XetDuyetDeTaiObj;

import java.util.List;

public interface XetDuyetDeTaiDAO {
    public List getDanhSachXetDuyetDeTai(String maDonVi, Long nam, int trangThai);
    public List getDanhSachXetDuyetDeTaiTheoTen(String tenDeTai, String maDonVi, Long nam, int trangThai);
    public XetDuyetDeTaiObj getXetDuyetDeTai(Long maDeTai);
    public void updateXetDuyetDeTai(XetDuyetDeTaiObj obj);
}
