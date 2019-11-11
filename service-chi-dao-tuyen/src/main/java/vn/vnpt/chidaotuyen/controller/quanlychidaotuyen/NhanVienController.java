package vn.vnpt.chidaotuyen.controller.quanlychidaotuyen;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import vn.vnpt.chidaotuyen.dao.quanlychidaotuyen.nhanvien.NhanVienDAO;

import java.util.List;

@RestController
@RequestMapping("/api")
@Api(value = "NhanVienController", description = "Danh mục nhân viên Controller")
public class NhanVienController {
    @Autowired
    private NhanVienDAO nhanVienDAO;

    @ApiOperation("Lấy danh sách khoa phòng theo đơn vị")
    @RequestMapping(value = "nhan-vien/lay-danh-sach-nhan-vien-theo-khoa-phong", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List getDanhSachNhanVienTheoKhoaPhong(@RequestParam(value = "maKhoaPhong", required = false) String maKhoaPhong)
    {
        return nhanVienDAO.getDanhSachNhanVienTheoKhoaPhong(maKhoaPhong);
    }

    @ApiOperation("Lấy danh sách khoa phòng theo đơn vị")
    @RequestMapping(value = "nhan-vien/lay-danh-sach-nhan-vien-theo-don-vi", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List getDanhSachNhanVienTheoDonVi(@RequestParam(value = "maDonVi", required = false) String maDonVi)
    {
        return nhanVienDAO.getDanhSachNhanVienTheoDonVi(maDonVi);
    }
}

