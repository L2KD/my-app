package vn.vnpt.chidaotuyen.controller.quanlychidaotuyen;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import vn.vnpt.chidaotuyen.Obj.quanlychidaotuyen.DoiTuongObj;
import vn.vnpt.chidaotuyen.dao.quanlychidaotuyen.doituong.DoiTuongDAO;

import java.util.List;

@RestController
@RequestMapping("/api")
@Api(value = "DoiTuongController", description = "Danh mục đối tượng tiếp nhận Controller")
public class DoiTuongController {
    @Autowired
    private DoiTuongDAO noiDungDAO;

    @ApiOperation("Lấy danh sách đối tượng chỉ đạo tuyến")
    @RequestMapping(value = "doi-tuong/lay-danh-sach-doi-tuong", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List danhSachDoiTuong()
    {
        return noiDungDAO.layDanhSachDoiTuong();
    }

    @ApiOperation("Lấy danh sách đối tượng có tên giống với")
    @RequestMapping(value = "doi-tuong/lay-danh-sach-doi-tuong-theo-ten", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List danhSachDoiTuong_Giong(
        @RequestParam(value = "tenDoiTuong", required = false) String tenDoiTuong
    )
    {
        return noiDungDAO.layDanhSachDoiTuongTheoTen(tenDoiTuong);
    }

    @ApiOperation("Lấy đối tượng")
    @RequestMapping(value = "doi-tuong/lay-doi-tuong", method = RequestMethod.GET)
    public @ResponseBody
    DoiTuongObj layDoiTuong(@RequestParam(value = "ma_doi_tuong", required = false) String ma_doi_tuong)
    {
        return noiDungDAO.layDoiTuong(Long.parseLong(ma_doi_tuong));
    }

    @ApiOperation("Cập nhật đối tượng")
    @RequestMapping(value = "doi-tuong/cap-nhat-doi-tuong", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void capNhatDoiTuong(@RequestBody DoiTuongObj dt)
    {
        dt.nguoiTao = 1;
        noiDungDAO.capNhatDoiTuong(dt);
    }

    @ApiOperation("Thêm đối tượng")
    @RequestMapping(value = "doi-tuong/them-moi-doi-tuong", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void themDoiTuong(@RequestBody DoiTuongObj dt)
    {
        dt.nguoiTao = 1;
        noiDungDAO.themDoiTuong(dt);
    }

    @ApiOperation("Xóa đối tượng")
    @RequestMapping(value = "doi-tuong/xoa", produces = "application/json; charset=utf-8", method = RequestMethod.DELETE)
    void XoaHinhThuc(@RequestParam(value = "ma_doi_tuong") String ma_doi_tuong)
    {
        noiDungDAO.xoaDoiTuong(Long.parseLong(ma_doi_tuong));
    }
}
