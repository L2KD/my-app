package vn.vnpt.chidaotuyen.dao.quanlychidaotuyen.hinhthuc;

import vn.vnpt.chidaotuyen.Obj.quanlychidaotuyen.HinhThucObj;

import java.util.List;

public interface HinhThucDAO {
    public List layDanhSachHinhThuc();
    public List danhSachHinhThucGiam(String FieldName, String type);
    public List danhSachHinhThucTang(String FieldName, String type);

    public void themHinhThuc(HinhThucObj obj);
    public void capNhatHinhThuc(HinhThucObj obj);
    public void xoaHinhThuc(long maHinhThuc);

    public List layDanhSachHinhThucTheoTen(String nameLike);

    public HinhThucObj layHinhThuc(long maHinhThuc);
}
