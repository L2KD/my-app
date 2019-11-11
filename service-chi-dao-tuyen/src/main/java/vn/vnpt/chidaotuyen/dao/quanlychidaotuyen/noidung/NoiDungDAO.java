package vn.vnpt.chidaotuyen.dao.quanlychidaotuyen.noidung;

import vn.vnpt.chidaotuyen.Obj.quanlychidaotuyen.NoiDungObj;

import java.util.List;

public interface NoiDungDAO {
        public List layDanhSachNoiDung();
        public List danhSachNoiDungGiam(String FieldName, String type);
        public List danhSachNoiDungTang(String FieldName, String type);

        public void themNoiDung(NoiDungObj obj);
        public void capNhatNoiDung(NoiDungObj obj);
        public void xoaNoiDung(long maNoiDung);

        public List layDanhSachNoiDungTheoTen(String nameLike);

        public NoiDungObj layNoiDung(long maNoiDung);
}
