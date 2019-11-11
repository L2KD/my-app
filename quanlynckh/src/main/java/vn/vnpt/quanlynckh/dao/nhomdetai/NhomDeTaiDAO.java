package vn.vnpt.quanlynckh.dao.nhomdetai;

import vn.vnpt.quanlynckh.obj.NhomDeTaiObj;

import java.util.List;

public interface NhomDeTaiDAO {
    public List getDanhSachNhomDeTai();
    public NhomDeTaiObj getNhomDeTai(Long maNhomDeTai);
    public void addNhomDeTai(NhomDeTaiObj obj);
    public void updateNhomDeTai(NhomDeTaiObj obj);
    public void deleteNhomDeTai(Long maNhomDeTai);
}
