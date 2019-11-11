package vn.vnpt.chidaotuyen.controller.quanlychidaotuyen;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
// import org.hibernate.annotations.Parameter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import vn.vnpt.chidaotuyen.Obj.quanlychidaotuyen.HinhThucObj;
import vn.vnpt.chidaotuyen.dao.quanlychidaotuyen.hinhthuc.HinhThucDAO;

import java.util.List;

@RestController
@RequestMapping("/api")
@Api(value = "HinhThucController", description = "Danh mục hình thức Controller")
public class HinhThucController {
    @Autowired
    private HinhThucDAO hinhThucDAO;

    @ApiOperation("Lấy danh sách hình thức")
    @RequestMapping(value = "hinh-thuc/lay-danh-sach-hinh-thuc",
                    produces = "application/json; charset=utf-8",
                    method = RequestMethod.GET)
    public @ResponseBody
    List danhSachHinhThuc()
    {
        return hinhThucDAO.layDanhSachHinhThuc();
    }

    @ApiOperation("Lấy danh sách hình thức có tên giống với")
    @RequestMapping(value = "hinh-thuc/lay-danh-sach-hinh-thuc-theo-ten", produces = "application/json; charset=utf-8",
                    method = RequestMethod.GET)
    public @ResponseBody
    List danhSachHinhThuc_Giong(
        @RequestParam(value = "tenHinhThuc", required = false) String tenHinhThuc
    )
    {
        return hinhThucDAO.layDanhSachHinhThucTheoTen(tenHinhThuc);
    }

    @ApiOperation("Lấy hình thức")
    @RequestMapping(value = "hinh-thuc/lay-hinh-thuc", method = RequestMethod.GET)
    public @ResponseBody
    HinhThucObj layHinhThuc(@RequestParam(value = "ma_hinh_thuc", required = false) String ma_hinh_thuc)
    {
        return hinhThucDAO.layHinhThuc(Long.parseLong(ma_hinh_thuc));
    }

    @ApiOperation("Cập nhật hình thức")
    @RequestMapping(value = "hinh-thuc/cap-nhat-hinh-thuc", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void capNhatHinhThuc(@RequestBody HinhThucObj ht)
    {
        ht.nguoi_tao = 1;
        hinhThucDAO.capNhatHinhThuc(ht);
    }

    @ApiOperation("Thêm hình thức")
    @RequestMapping(value = "hinh-thuc/them-moi-hinh-thuc", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void themHinhThuc(@RequestBody HinhThucObj ht)
    {
        ht.nguoi_tao = 1;
        hinhThucDAO.themHinhThuc(ht);
    }

//    @ApiOperation("Xóa hình thức")
//    @RequestMapping(value = "hinh-thuc/{ma_hinh_thuc}/xoa", produces = "application/json; charset=utf-8", method = RequestMethod.DELETE)
//    void xoaHinhThuc(@PathVariable String ma_hinh_thuc)
//    {
//        hinhThucDAO.xoaHinhThuc(Long.parseLong(ma_hinh_thuc));
//    }
    @ApiOperation("Xóa hình thức")
    @RequestMapping(value = "hinh-thuc/xoa", produces = "application/json; charset=utf-8", method = RequestMethod.DELETE)
    void XoaHinhThuc(@RequestParam(value = "ma_hinh_thuc") String ma_hinh_thuc)
    {
        hinhThucDAO.xoaHinhThuc(Long.parseLong(ma_hinh_thuc));
    }
}
