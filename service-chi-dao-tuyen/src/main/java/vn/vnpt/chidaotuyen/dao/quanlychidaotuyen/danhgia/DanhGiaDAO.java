package vn.vnpt.chidaotuyen.dao.quanlychidaotuyen.danhgia;

import vn.vnpt.chidaotuyen.Obj.quanlychidaotuyen.DanhGiaObj;
import vn.vnpt.chidaotuyen.Obj.quanlychidaotuyen.LoaiCDTObj;

import java.util.List;

public interface DanhGiaDAO {
    public List layDanhSachDanhGiaTheoLoai(String loai_cdt);
    public List layDanhSachLoaiCDTDanhGia();
    public List danhSachDanhGiaGiam(String FieldName, String type);
    public List danhSachDanhGiaTang(String FieldName, String type);

    public void themDanhGia(DanhGiaObj obj);
    public void capNhatDanhGia(DanhGiaObj obj);
    public void xoaDanhGia(long maDanhGia);

    public List layDanhSachDanhGiaTheoTenVaLoai(String tenDanhGia, Long maLoaiCDT);

    public DanhGiaObj layDanhGia(long maDanhGia);

    public LoaiCDTObj layLoaiCDTDanhGia(long maLoaiCDT);
}
