package vn.vnpt.chidaotuyen.dao.quanlynckh.baocaoquynamdetai;

import vn.vnpt.chidaotuyen.Obj.quanlynckh.BaoCaoQuyNamDeTaiObj;

import java.util.List;

public interface BaoCaoQuyNamDeTaiDAO {
    public List getDanhSachBaoCaoQuyNamDeTai(String maDonVi, Long nam, int trangThai);
    public List getDanhSachBaoCaoQuyNamDeTaiTheoTen(String tenDeTai, String maDonVi, Long nam, int trangThai);
    public BaoCaoQuyNamDeTaiObj getBaoCaoQuyNamDeTai(Long maDeTai);
    public void updateBaoCaoQuyNamDeTai(BaoCaoQuyNamDeTaiObj obj);
}
