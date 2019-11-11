package vn.vnpt.quanlynckh.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import vn.vnpt.quanlynckh.dao.kehoachdetai.KeHoachDAO;
import vn.vnpt.quanlynckh.obj.KeHoachObj;

import java.util.List;

@RestController
@RequestMapping("/api")
@Api(value = "KeHoachController", description = "Danh mục kế hoạch Controller")
public class KeHoachController {
    @Autowired
    private KeHoachDAO keHoachDAO;

    @ApiOperation("Lấy danh sách kế hoạch")
    @RequestMapping(value = "ke-hoach/lay-danh-sach-ke-hoach", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List getDanhSachKeHoach()
    {
        return keHoachDAO.getDanhSachKeHoach();
    }

    @ApiOperation("Lấy kế hoạch")
    @RequestMapping(value = "ke-hoach/lay-ke-hoach", method = RequestMethod.GET)
    public @ResponseBody
    KeHoachObj getKeHoach(@RequestParam(value = "maKeHoach", required = false) String maKeHoach)
    {
        return keHoachDAO.getKeHoach(Long.parseLong(maKeHoach));
    }

    @ApiOperation("Thêm kế hoạch")
    @RequestMapping(value = "ke-hoach/them-moi-ke-hoach", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void addKeHoach(@RequestBody KeHoachObj obj)
    {
        keHoachDAO.addKeHoach(obj);
    }

    @ApiOperation("Cập nhật kế hoạch")
    @RequestMapping(value = "ke-hoach/cap-nhat-ke-hoach", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void updateKeHoach(@RequestBody KeHoachObj obj)
    {
        keHoachDAO.updateKeHoach(obj);
    }

    @ApiOperation("Xóa kế hoạch")
    @RequestMapping(value = "ke-hoach/xoa", produces = "application/json; charset=utf-8", method = RequestMethod.DELETE)
    void deleteKeHoach(@RequestParam(value = "maKeHoach") String maKeHoach)
    {
        keHoachDAO.deleteKeHoach(Long.parseLong(maKeHoach));
    }
}
