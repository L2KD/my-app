package vn.vnpt.chidaotuyen.dao.quanlynckh.xetduyetbaocaotongket;

import vn.vnpt.chidaotuyen.Obj.quanlynckh.XetDuyetBaoCaoTongKetObj;
import vn.vnpt.chidaotuyen.Obj.quanlynckh.XetDuyetDeTaiObj;

import java.util.List;

public interface XetDuyetBaoCaoTongKetDAO {
    public List getDanhSachXetDuyetBaoCaoTongKet(String maDonVi, Long nam, int trangThai);
    public List getDanhSachXetDuyetBaoCaoTongKetTheoTen(String tenDeTai, String maDonVi, Long nam, int trangThai);
    public XetDuyetBaoCaoTongKetObj getXetDuyetBaoCaoTongKet(Long maDeTai);
    public void updateXetDuyetBaoCaoTongKet(XetDuyetBaoCaoTongKetObj obj);
}
