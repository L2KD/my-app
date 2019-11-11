package vn.vnpt.chidaotuyen.dao.quanlychidaotuyen.doituong;

import vn.vnpt.chidaotuyen.Obj.quanlychidaotuyen.DoiTuongObj;

import java.util.List;

public interface DoiTuongDAO {
        public List layDanhSachDoiTuong();
        public List danhSachDoiTuongGiam(String FieldName, String type);
        public List danhSachDoiTuongTang(String FieldName, String type);

        public void themDoiTuong(DoiTuongObj obj);
        public void capNhatDoiTuong(DoiTuongObj obj);
        public void xoaDoiTuong(long maDoiTuong);

        public List layDanhSachDoiTuongTheoTen(String tenDoiTuong);

        public DoiTuongObj layDoiTuong(long maDoiTuong);
}
