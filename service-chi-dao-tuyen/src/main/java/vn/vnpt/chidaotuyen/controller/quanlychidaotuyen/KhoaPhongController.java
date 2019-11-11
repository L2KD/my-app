package vn.vnpt.chidaotuyen.controller.quanlychidaotuyen;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import vn.vnpt.chidaotuyen.dao.quanlychidaotuyen.khoaphong.KhoaPhongDAO;

import java.util.List;

@RestController
@RequestMapping("/api")
@Api(value = "KhoaPhongController", description = "Danh mục khoa phòng Controller")
public class KhoaPhongController {
    @Autowired
    private KhoaPhongDAO khoaPhongDAO;

    @ApiOperation("Lấy danh sách khoa phòng theo đơn vị")
    @RequestMapping(value = "khoa-phong/lay-danh-sach-khoa-phong-theo-don-vi", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List getDanhSachKhoaPhongTheoDonVi(@RequestParam(value = "maDonVi", required = false) String maDonVi)
    {
        return khoaPhongDAO.getDanhSachKhoaPhongTheoDonVi(maDonVi);
    }
}
