package vn.vnpt.chidaotuyen.dao.quanlychidaotuyen.ChiDaoTuyen;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.util.LinkedCaseInsensitiveMap;
import vn.vnpt.chidaotuyen.Obj.quanlychidaotuyen.ChiDaoTuyen.*;
import vn.vnpt.chidaotuyen.Obj.quanlychidaotuyen.DoiTuongObj;
import vn.vnpt.chidaotuyen.Obj.quanlychidaotuyen.DonViObj;
import vn.vnpt.chidaotuyen.Obj.quanlychidaotuyen.NhanVienObj;
import vn.vnpt.chidaotuyen.Obj.quanlychidaotuyen.NoiDungObj;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Repository
public class ChiDaoTuyenDAOImp implements ChiDaoTuyenDAO{

    @Autowired
    private DataSource dataSource;

    @Override
    public List getDanhSachNamCDT() {
        String sql = "CALL LayDanhSachNamCDT()";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql);
        return jdbcTemplate.queryForList(sql);
    }

    @Override
    public List getDanhSachDonViTiepNhan(String maDonVi) {
        String sql = "CALL LayDanhSachDonViTiepNhan(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql, new Object []{ maDonVi });
        ArrayList donViTiepNhanList = new ArrayList();
        for (int i = 0; i < t.size(); i++) {
            Object newtmp = t.get(i);
            LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
            DonViObj donViObj = new DonViObj();
            donViObj.maDonVi = map.get("ma_don_vi").toString();
            donViObj.tenDonVi = map.get("ten_don_vi").toString();
            donViTiepNhanList.add(donViObj);
        }
        return donViTiepNhanList;
    }

    @Override
    public List getDanhSachCDT_Theo_DonVi_Nam_KeHoach(String maDonVi, Long nam, Long maKeHoach) {
        String sql = "CALL LayDanhSachCDT_Theo_DonVi_Nam_KeHoach(?,?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql, new Object []{ maDonVi, nam, maKeHoach });
        ArrayList chiDaoTuyenObjList = new ArrayList();
        for (int i = 0; i < t.size(); i++) {
            Object newtmp = t.get(i);
            LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
            ChiDaoTuyenObj chiDaoTuyenObj = new ChiDaoTuyenObj();
            chiDaoTuyenObj.maCDT = Long.parseLong(map.get("ma_cdt").toString());
            chiDaoTuyenObj.ngayThucHien = map.get("ngay_thuc_hien").toString();
            chiDaoTuyenObj.nam = Long.parseLong(map.get("nam").toString());
            chiDaoTuyenObj.donVi = map.get("don_vi").toString();
            chiDaoTuyenObj.keHoach = Long.parseLong(map.get("ke_hoach").toString());
            chiDaoTuyenObj.hinhThuc = Long.parseLong(map.get("hinh_thuc").toString());
            chiDaoTuyenObj.loaiCDT = Long.parseLong(map.get("loai_cdt").toString());
            chiDaoTuyenObj.truongDoan = Long.parseLong(map.get("truong_doan").toString());
            chiDaoTuyenObj.thuKi = Long.parseLong(map.get("thu_ki").toString());
            chiDaoTuyenObj.donViTiepNhan = map.get("don_vi_tiep_nhan").toString();
            chiDaoTuyenObj.nguoiDaiDien = Long.parseLong(map.get("nguoi_dai_dien").toString());
            chiDaoTuyenObj.trangThai = Integer.parseInt(map.get("trang_thai").toString());
            chiDaoTuyenObj.tapTin = map.get("tap_tin").toString();
            chiDaoTuyenObj.nguoiTao = Long.parseLong(map.get("nguoi_tao").toString());
            chiDaoTuyenObj.tenDonVi = map.get("ten_don_vi").toString();
            chiDaoTuyenObj.noiDungTrichYeu = map.get("noi_dung_trich_yeu").toString();
            chiDaoTuyenObj.tenHinhThuc = map.get("ten_hinh_thuc").toString();
            chiDaoTuyenObj.tenLoaiCDT = map.get("ten_loai_cdt").toString();
            chiDaoTuyenObj.tenDonViTiepNhan = map.get("ten_don_vi_tiep_nhan").toString();
            chiDaoTuyenObj.soNguoiTiepNhan = Long.parseLong(map.get("so_nguoi_tiep_nhan").toString());
            chiDaoTuyenObj.khoaPhong = map.get("khoa_phong").toString();
            chiDaoTuyenObj.tenNguoiDaiDien = map.get("ten_nguoi_dai_dien").toString();
            chiDaoTuyenObj.tenKhoaPhong = map.get("ten_khoa_phong").toString();
            chiDaoTuyenObjList.add(chiDaoTuyenObj);
        }
        return chiDaoTuyenObjList;
    }
    @Override
    public List getDanhSachCDT_Theo_DonVi_Nam(String maDonVi, Long nam) {
        String sql = "CALL LayDanhSachCDT_Theo_DonVi_Nam(?,?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql, new Object []{ maDonVi, nam });
        ArrayList chiDaoTuyenObjList = new ArrayList();
        for (int i = 0; i < t.size(); i++) {
            Object newtmp = t.get(i);
            LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
            ChiDaoTuyenObj chiDaoTuyenObj = new ChiDaoTuyenObj();
            chiDaoTuyenObj.maCDT = Long.parseLong(map.get("ma_cdt").toString());
            chiDaoTuyenObj.ngayThucHien = map.get("ngay_thuc_hien").toString();
            chiDaoTuyenObj.nam = Long.parseLong(map.get("nam").toString());
            chiDaoTuyenObj.donVi = map.get("don_vi").toString();
            chiDaoTuyenObj.keHoach = Long.parseLong(map.get("ke_hoach").toString());
            chiDaoTuyenObj.hinhThuc = Long.parseLong(map.get("hinh_thuc").toString());
            chiDaoTuyenObj.loaiCDT = Long.parseLong(map.get("loai_cdt").toString());
            chiDaoTuyenObj.truongDoan = Long.parseLong(map.get("truong_doan").toString());
            chiDaoTuyenObj.thuKi = Long.parseLong(map.get("thu_ki").toString());
            chiDaoTuyenObj.donViTiepNhan = map.get("don_vi_tiep_nhan").toString();
            chiDaoTuyenObj.nguoiDaiDien = Long.parseLong(map.get("nguoi_dai_dien").toString());
            chiDaoTuyenObj.trangThai = Integer.parseInt(map.get("trang_thai").toString());
            chiDaoTuyenObj.tapTin = map.get("tap_tin").toString();
            chiDaoTuyenObj.nguoiTao = Long.parseLong(map.get("nguoi_tao").toString());
            chiDaoTuyenObj.tenDonVi = map.get("ten_don_vi").toString();
            chiDaoTuyenObj.noiDungTrichYeu = map.get("noi_dung_trich_yeu").toString();
            chiDaoTuyenObj.tenHinhThuc = map.get("ten_hinh_thuc").toString();
            chiDaoTuyenObj.tenLoaiCDT = map.get("ten_loai_cdt").toString();
            chiDaoTuyenObj.tenDonViTiepNhan = map.get("ten_don_vi_tiep_nhan").toString();
            chiDaoTuyenObj.soNguoiTiepNhan = Long.parseLong(map.get("so_nguoi_tiep_nhan").toString());
            chiDaoTuyenObj.khoaPhong = map.get("khoa_phong").toString();
            chiDaoTuyenObj.tenNguoiDaiDien = map.get("ten_nguoi_dai_dien").toString();
            chiDaoTuyenObj.tenKhoaPhong = map.get("ten_khoa_phong").toString();
            chiDaoTuyenObjList.add(chiDaoTuyenObj);
        }
        return chiDaoTuyenObjList;
    }

    @Override
    public List getAllCDT() {
        String sql = "CALL LayDanhSachCDT_All()";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql);
        ArrayList chiDaoTuyenObjList = new ArrayList();
        for (int i = 0; i < t.size(); i++) {
            Object newtmp = t.get(i);
            LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
            ChiDaoTuyenObj chiDaoTuyenObj = new ChiDaoTuyenObj();
            chiDaoTuyenObj.maCDT = Long.parseLong(map.get("ma_cdt").toString());
            chiDaoTuyenObj.ngayThucHien = map.get("ngay_thuc_hien").toString();
            chiDaoTuyenObj.nam = Long.parseLong(map.get("nam").toString());
            chiDaoTuyenObj.donVi = map.get("don_vi").toString();
            chiDaoTuyenObj.keHoach = Long.parseLong(map.get("ke_hoach").toString());
            chiDaoTuyenObj.hinhThuc = Long.parseLong(map.get("hinh_thuc").toString());
            chiDaoTuyenObj.loaiCDT = Long.parseLong(map.get("loai_cdt").toString());
            chiDaoTuyenObj.truongDoan = Long.parseLong(map.get("truong_doan").toString());
            chiDaoTuyenObj.thuKi = Long.parseLong(map.get("thu_ki").toString());
            chiDaoTuyenObj.donViTiepNhan = map.get("don_vi_tiep_nhan").toString();
            chiDaoTuyenObj.nguoiDaiDien = Long.parseLong(map.get("nguoi_dai_dien").toString());
            chiDaoTuyenObj.trangThai = Integer.parseInt(map.get("trang_thai").toString());
            chiDaoTuyenObj.tapTin = map.get("tap_tin").toString();
            chiDaoTuyenObj.nguoiTao = Long.parseLong(map.get("nguoi_tao").toString());
            chiDaoTuyenObj.tenDonVi = map.get("ten_don_vi").toString();
            chiDaoTuyenObj.noiDungTrichYeu = map.get("noi_dung_trich_yeu").toString();
            chiDaoTuyenObj.tenHinhThuc = map.get("ten_hinh_thuc").toString();
            chiDaoTuyenObj.tenLoaiCDT = map.get("ten_loai_cdt").toString();
            chiDaoTuyenObj.tenDonViTiepNhan = map.get("ten_don_vi_tiep_nhan").toString();
            chiDaoTuyenObj.soNguoiTiepNhan = Long.parseLong(map.get("so_nguoi_tiep_nhan").toString());
            chiDaoTuyenObj.khoaPhong = map.get("khoa_phong").toString();
            chiDaoTuyenObjList.add(chiDaoTuyenObj);
        }
        return chiDaoTuyenObjList;
    }

    @Override
    public ChiDaoTuyenObj getCDT(long maCDT) {
        String sql = "CALL LayCDTTheoMa(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List tmp = jdbcTemplate.queryForList(sql, new Object[] { maCDT });
        Object newtmp = tmp.get(0);
        LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
        ChiDaoTuyenObj chiDaoTuyenObj = new ChiDaoTuyenObj();
        chiDaoTuyenObj.maCDT = Long.parseLong(map.get("ma_cdt").toString());
        chiDaoTuyenObj.ngayThucHien = map.get("ngay_thuc_hien").toString();
        chiDaoTuyenObj.nam = Long.parseLong(map.get("nam").toString());
        chiDaoTuyenObj.donVi = map.get("don_vi").toString();
        chiDaoTuyenObj.keHoach = Long.parseLong(map.get("ke_hoach").toString());
        chiDaoTuyenObj.hinhThuc = Long.parseLong(map.get("hinh_thuc").toString());
        chiDaoTuyenObj.loaiCDT = Long.parseLong(map.get("loai_cdt").toString());
        chiDaoTuyenObj.truongDoan = Long.parseLong(map.get("truong_doan").toString());
        chiDaoTuyenObj.thuKi = Long.parseLong(map.get("thu_ki").toString());
        chiDaoTuyenObj.donViTiepNhan = map.get("don_vi_tiep_nhan").toString();
        chiDaoTuyenObj.nguoiDaiDien = Long.parseLong(map.get("nguoi_dai_dien").toString());
        chiDaoTuyenObj.trangThai = Integer.parseInt(map.get("trang_thai").toString());
        chiDaoTuyenObj.tapTin = map.get("tap_tin").toString();
        chiDaoTuyenObj.nguoiTao = Long.parseLong(map.get("nguoi_tao").toString());
        chiDaoTuyenObj.tenDonVi = map.get("ten_don_vi").toString();
        chiDaoTuyenObj.noiDungTrichYeu = map.get("noi_dung_trich_yeu").toString();
        chiDaoTuyenObj.tenHinhThuc = map.get("ten_hinh_thuc").toString();
        chiDaoTuyenObj.tenLoaiCDT = map.get("ten_loai_cdt").toString();
        chiDaoTuyenObj.tenDonViTiepNhan = map.get("ten_don_vi_tiep_nhan").toString();
        chiDaoTuyenObj.soNguoiTiepNhan = Long.parseLong(map.get("so_nguoi_tiep_nhan").toString());
        chiDaoTuyenObj.khoaPhong = map.get("khoa_phong").toString();
        chiDaoTuyenObj.tenNguoiDaiDien = map.get("ten_nguoi_dai_dien").toString();
        chiDaoTuyenObj.tenKhoaPhong = map.get("ten_khoa_phong").toString();
        return chiDaoTuyenObj;
    }

    @Override
    public Long getMaCDTMax()
    {
        String sql = "CALL LayMaCDTMax()";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql);
        Long kq = Long.parseLong("0");
        Object newtmp = t.get(0);
        LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
        kq = Long.parseLong(map.get("max_ma_cdt").toString());
        return kq;
    }

    @Override
    public void addCDT(ChiDaoTuyenObj obj) {
        try {
            String sql = "CALL ThemMoiCDT(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            jdbcTemplate.update(sql, new Object[]{
                obj.ngayThucHien,
                obj.nam,
                obj.donVi,
                obj.keHoach,
                obj.hinhThuc,
                obj.loaiCDT,
                obj.truongDoan,
                obj.thuKi,
                obj.donViTiepNhan,
                obj.nguoiDaiDien,
                obj.trangThai,
                obj.tapTin,
                obj.nguoiTao,
                obj.soNguoiTiepNhan,
                obj.khoaPhong
            });
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void deleteCDT_NoiDung(long maCDT) {
        String sql = "CALL XoaCDT_NoiDung(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        try {
            jdbcTemplate.update(sql, maCDT);
        }
        catch (Exception e) {
            throw e;
        }
    }

    @Override
    public void addCDT_NoiDung(long maCDT, long maNoiDung) {
        Date date = new Date();
        try {
            String sql = "CALL ThemMoiCDT_NoiDung(?,?,?)";
            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            jdbcTemplate.update(sql, new Object[]{
                maCDT,
                maNoiDung,
                "Updated: " + date
            });
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void deleteCDT_DoiTuong(long maCDT) {
        String sql = "CALL XoaCDT_DoiTuong_TiepNhan(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        try {
            jdbcTemplate.update(sql, maCDT);
        }
        catch (Exception e) {
            throw e;
        }
    }

    @Override
    public void addCDT_DoiTuong(long maCDT, long maDoiTuong) {
        Date date = new Date();
        try {
            String sql = "CALL ThemMoiCDT_DoiTuong_TiepNhan(?,?,?)";
            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            jdbcTemplate.update(sql, new Object[]{
                maCDT,
                maDoiTuong,
                "Updated: " + date
            });
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void deleteCDT_CaNhan_PhuTrach(long maCDT) {
        String sql = "CALL XoaCDT_CaNhan_PhuTrach(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        try {
            jdbcTemplate.update(sql, maCDT);
        }
        catch (Exception e) {
            throw e;
        }
    }

    @Override
    public void addCDT_CaNhan_PhuTrach(long maCDT, long maNhanVien) {
        Date date = new Date();
        try {
            String sql = "CALL ThemMoiCDT_CaNhan_PhuTrach(?,?,?)";
            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            jdbcTemplate.update(sql, new Object[]{
                maCDT,
                maNhanVien,
                "Updated: " + date
            });
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void deleteCDT_CaNhan_TiepNhan(long maCDT) {
        String sql = "CALL XoaCDT_CaNhan_TiepNhan(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        try {
            jdbcTemplate.update(sql, maCDT);
        }
        catch (Exception e) {
            throw e;
        }
    }

    @Override
    public void addCDT_CaNhan_TiepNhan(long maCDT, long maNhanVien) {
        Date date = new Date();
        try {
            String sql = "CALL ThemMoiCDT_CaNhan_TiepNhan(?,?,?)";
            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            jdbcTemplate.update(sql, new Object[]{
                maCDT,
                maNhanVien,
                "Updated: " + date
            });
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void updateCDT(ChiDaoTuyenObj obj) {
        try {
            String sql = "CALL CapNhatCDT(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            jdbcTemplate.update(sql, new Object[]{
                obj.maCDT,
                obj.nam,
                obj.ngayThucHien,
                obj.donVi,
                obj.keHoach,
                obj.hinhThuc,
                obj.loaiCDT,
                obj.truongDoan,
                obj.thuKi,
                obj.donViTiepNhan,
                obj.nguoiDaiDien,
                obj.tapTin,
                obj.nguoiTao,
                obj.soNguoiTiepNhan,
                obj.khoaPhong
            });
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void deleteCDT(long maCDT) {
        String sql = "CALL XoaCDT(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        try {
            jdbcTemplate.update(sql, maCDT);
        }
        catch (Exception e) {
            throw e;
        }
    }

    // Phục vụ cho phần sửa chỉ đạo tuyến

    @Override
    public List getDanhSachCDT_NoiDung_TheoMa(Long maCDT) {
        String sql = "CALL LayDanhSachCDT_NoiDung_TheoMa(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql, new Object []{ maCDT });
        ArrayList noiDungObjList = new ArrayList();
        for (int i = 0; i < t.size(); i++) {
            Object newtmp = t.get(i);
            LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
            NoiDungObj noiDungObj = new NoiDungObj();
            noiDungObj.maNoiDung = Long.parseLong(map.get("ma_noi_dung").toString());
            noiDungObj.noiDung = map.get("noi_dung").toString();
            noiDungObjList.add(noiDungObj);
        }
        return noiDungObjList;
    }

    @Override
    public List getDanhSachCDT_DoiTuong_TheoMa(Long maCDT) {
        String sql = "CALL LayDanhSachCDT_DoiTuong_TheoMa(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql, new Object []{ maCDT });
        ArrayList doiTuongObjList = new ArrayList();
        for (int i = 0; i < t.size(); i++) {
            Object newtmp = t.get(i);
            LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
            DoiTuongObj doiTuongObj = new DoiTuongObj();
            doiTuongObj.maDoiTuong = Long.parseLong(map.get("ma_doi_tuong").toString());
            doiTuongObj.tenDoiTuong = map.get("ten_doi_tuong").toString();
            doiTuongObjList.add(doiTuongObj);
        }
        return doiTuongObjList;
    }

    @Override
    public List getDanhSachCDT_CaNhan_PhuTrach_TheoMa(Long maCDT) {
        String sql = "CALL LayDanhSachCDT_CaNhan_PhuTrach_TheoMa(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql, new Object []{ maCDT });
        ArrayList nhanVienObjList = new ArrayList();
        for (int i = 0; i < t.size(); i++) {
            Object newtmp = t.get(i);
            LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
            NhanVienObj nhanVienObj = new NhanVienObj();
            nhanVienObj.maNhanVien = Long.parseLong(map.get("ma_nhan_vien").toString());
            nhanVienObj.tenNhanVien = map.get("ten_nhan_vien").toString();
            nhanVienObjList.add(nhanVienObj);
        }
        return nhanVienObjList;
    }

    @Override
    public List getDanhSachCDT_CaNhan_TiepNhan_TheoMa(Long maCDT) {
        String sql = "CALL LayDanhSachCDT_CaNhan_TiepNhan_TheoMa(?)";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql, new Object []{ maCDT });
        ArrayList nhanVienObjList = new ArrayList();
        for (int i = 0; i < t.size(); i++) {
            Object newtmp = t.get(i);
            LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
            NhanVienObj nhanVienObj = new NhanVienObj();
            nhanVienObj.maNhanVien = Long.parseLong(map.get("ma_nhan_vien").toString());
            nhanVienObj.tenNhanVien = map.get("ten_nhan_vien").toString();
            nhanVienObjList.add(nhanVienObj);
        }
        return nhanVienObjList;
    }
}
