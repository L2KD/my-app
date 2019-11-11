package vn.vnpt.quanlynckh.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import vn.vnpt.quanlynckh.dao.chucvu.ChucVuDAO;
import vn.vnpt.quanlynckh.obj.ChucVuObj;

import java.util.List;

@RestController
@RequestMapping("/api")
@Api(value = "ChucVuController", description = "Danh mục chức vụ Controller")
public class ChucVuController {
    @Autowired
    private ChucVuDAO chucVuDAO;

    @ApiOperation("Lấy danh sách chức vụ")
    @RequestMapping(value = "chuc-vu/lay-danh-sach-chuc-vu", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List getDanhSachChucVu()
    {
        return chucVuDAO.getDanhSachChucVu();
    }

    @ApiOperation("Lấy chức vụ")
    @RequestMapping(value = "chuc-vu/lay-chuc-vu", method = RequestMethod.GET)
    public @ResponseBody
    ChucVuObj getChucVu(@RequestParam(value = "maChucVu", required = false) String maChucVu)
    {
        return chucVuDAO.getChucVu(Long.parseLong(maChucVu));
    }

    @ApiOperation("Thêm chức vụ")
    @RequestMapping(value = "chuc-vu/them-moi-chuc-vu", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void addChucVu(@RequestBody ChucVuObj obj)
    {
        chucVuDAO.addChucVu(obj);
    }

    @ApiOperation("Cập nhật chức vụ")
    @RequestMapping(value = "chuc-vu/cap-nhat-chuc-vu", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void updateChucVu(@RequestBody ChucVuObj obj)
    {
        chucVuDAO.updateChucVu(obj);
    }

    @ApiOperation("Xóa chức vụ")
    @RequestMapping(value = "chuc-vu/xoa", produces = "application/json; charset=utf-8", method = RequestMethod.DELETE)
    void deleteChucVu(@RequestParam(value = "maChucVu") String maChucVu)
    {
        chucVuDAO.deleteChucVu(Long.parseLong(maChucVu));
    }
}
