package vn.vnpt.chidaotuyen.controller.quanlynckh;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import vn.vnpt.chidaotuyen.dao.quanlynckh.chucvuhoidong.ChucVuHoiDongDAO;
import vn.vnpt.chidaotuyen.Obj.quanlynckh.ChucVuHoiDongObj;

import java.util.List;

@RestController
@RequestMapping("/api")
@Api(value = "ChucVuController", description = "Danh mục chức vụ Controller")
public class ChucVuHoiDongController {
    @Autowired
    private ChucVuHoiDongDAO chucVuHoiDongDAO;

    @ApiOperation("Lấy danh sách chức vụ")
    @RequestMapping(value = "chuc-vu/lay-danh-sach-chuc-vu", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List getDanhSachChucVu()
    {
        return chucVuHoiDongDAO.getDanhSachChucVu();
    }

    @ApiOperation("Lấy danh sách chức vụ theo tên")
    @RequestMapping(value = "chuc-vu/lay-danh-sach-chuc-vu-theo-ten", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List getDanhSachChucVuTheoTen(@RequestParam(value = "chucVu", required = false) String chucVu)
    {
        return chucVuHoiDongDAO.getDanhSachChucVuTheoTen(chucVu);
    }

    @ApiOperation("Lấy chức vụ")
    @RequestMapping(value = "chuc-vu/lay-chuc-vu", method = RequestMethod.GET)
    public @ResponseBody
    ChucVuHoiDongObj getChucVu(@RequestParam(value = "maChucVu", required = false) String maChucVu)
    {
        return chucVuHoiDongDAO.getChucVu(Long.parseLong(maChucVu));
    }

    @ApiOperation("Thêm chức vụ")
    @RequestMapping(value = "chuc-vu/them-moi-chuc-vu", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void addChucVu(@RequestBody ChucVuHoiDongObj obj)
    {
        chucVuHoiDongDAO.addChucVu(obj);
    }

    @ApiOperation("Cập nhật chức vụ")
    @RequestMapping(value = "chuc-vu/cap-nhat-chuc-vu", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void updateChucVu(@RequestBody ChucVuHoiDongObj obj)
    {
        chucVuHoiDongDAO.updateChucVu(obj);
    }

    @ApiOperation("Xóa chức vụ")
    @RequestMapping(value = "chuc-vu/xoa", produces = "application/json; charset=utf-8", method = RequestMethod.DELETE)
    void deleteChucVu(@RequestParam(value = "maChucVu") String maChucVu)
    {
        chucVuHoiDongDAO.deleteChucVu(Long.parseLong(maChucVu));
    }
}
