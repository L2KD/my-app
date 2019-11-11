package vn.vnpt.chidaotuyen.dao;

import vn.vnpt.chidaotuyen.Obj.TaiKhoanObj;

public interface TaiKhoanDAO {
    public TaiKhoanObj getThongTinTaiKhoan(String taiKhoan, String matKhau);
    public int checkLogin( String taiKhoan, String matKhau);
}
