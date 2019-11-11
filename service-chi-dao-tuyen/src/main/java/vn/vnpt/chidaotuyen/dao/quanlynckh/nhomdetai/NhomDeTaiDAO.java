package vn.vnpt.chidaotuyen.dao.quanlynckh.nhomdetai;

import vn.vnpt.chidaotuyen.Obj.quanlynckh.NhomDeTaiObj;

import java.util.List;

public interface NhomDeTaiDAO {
    public List getDanhSachNhomDeTai();
    public List getDanhSachNhomDeTaiTheoTen(String nhomDeTai);
    public NhomDeTaiObj getNhomDeTai(Long maNhomDeTai);
    public void addNhomDeTai(NhomDeTaiObj obj);
    public void updateNhomDeTai(NhomDeTaiObj obj);
    public void deleteNhomDeTai(Long maNhomDeTai);
}
