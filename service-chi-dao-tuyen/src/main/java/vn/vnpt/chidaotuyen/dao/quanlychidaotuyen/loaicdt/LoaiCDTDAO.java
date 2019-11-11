package vn.vnpt.chidaotuyen.dao.quanlychidaotuyen.loaicdt;

import vn.vnpt.chidaotuyen.Obj.quanlychidaotuyen.LoaiCDTObj;

import java.util.List;

public interface LoaiCDTDAO {
        public List layDanhSachLoaiCDT();
        public List danhSachLoaiCDTGiam(String FieldName, String type);
        public List danhSachLoaiCDTTang(String FieldName, String type);

        public void themLoaiCDT(LoaiCDTObj obj);
        public void capNhatLoaiCDT(LoaiCDTObj obj);
        public void xoaLoaiCDT(long maLoaiCDT);

        public List layDanhSachLoaiCDTTheoTen(String nameLike);

        public LoaiCDTObj layLoaiCDT(long maLoaiCDT);
}
