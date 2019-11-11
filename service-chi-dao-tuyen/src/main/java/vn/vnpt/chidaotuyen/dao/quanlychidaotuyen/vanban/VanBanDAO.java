package vn.vnpt.chidaotuyen.dao.quanlychidaotuyen.vanban;

import vn.vnpt.chidaotuyen.Obj.quanlychidaotuyen.CoQuanBanHanhObj;
import vn.vnpt.chidaotuyen.Obj.quanlychidaotuyen.DonViObj;
import vn.vnpt.chidaotuyen.Obj.quanlychidaotuyen.TinhThanhObj;
import vn.vnpt.chidaotuyen.Obj.quanlychidaotuyen.VanBanObj;

import java.util.List;

public interface VanBanDAO {
    public List getDanhSachTinh();
    public List getDanhSachDonVi(Long maTinh);
    public List getDanhSachNamVanBan();
    public List getDanhSachCoQuanBanHanh();
    public TinhThanhObj getTinhThanh(long maTinhThanh);
    public DonViObj getDonVi(String maDonVi);
    public CoQuanBanHanhObj getCoQuanBanHanh(long maCoQuan);
    public List getDanhSachVanBanTheoDonVi_Nam(String donVi, String nam);
    public VanBanObj getVanBan(long maVanBan);
    //public List danhSachVanBanGiam(String FieldName, String type);
    //public List danhSachVanBanTang(String FieldName, String type);
    public void addVanBan(VanBanObj obj);
    public void updateVanBan(VanBanObj obj);
    public void deleteVanBan(long maVanBan);
    public List getDanhSachVanBanTheoNoidungTrichYeu_DonVi_Nam(String noiDungTrichYeu, String donVi, Long nam);
    public List getDanhSachVanBanIn(String coQuanBanHanh, String donVi);
}
