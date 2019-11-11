package vn.vnpt.chidaotuyen.controller.quanlynckh;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import vn.vnpt.chidaotuyen.dao.quanlynckh.chuthe.ChuTheDAO;
import vn.vnpt.chidaotuyen.Obj.quanlynckh.ChuTheObj;

import java.util.List;

@RestController
@RequestMapping("/api")
@Api(value = "ChuTheController", description = "Danh mục chủ thể đề tài Controller")
public class ChuTheController {
    @Autowired
    private ChuTheDAO chuTheDAO;

    @ApiOperation("Lấy danh sách chủ thể")
    @RequestMapping(value = "chu-the/lay-danh-sach-chu-the", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List getDanhSachChuThe()
    {
        return chuTheDAO.getDanhSachChuThe();
    }

    @ApiOperation("Lấy danh sách chủ thể theo tên")
    @RequestMapping(value = "chu-the/lay-danh-sach-chu-the-theo-ten", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List getDanhSachChuTheTheoTen(@RequestParam(value = "chuTheDeTai") String chuTheDeTai)
    {
        return chuTheDAO.getDanhSachChuTheTheoTen(chuTheDeTai);
    }

    @ApiOperation("Lấy chủ thể")
    @RequestMapping(value = "chu-the/lay-chu-the", method = RequestMethod.GET)
    public @ResponseBody
    ChuTheObj getChuThe(@RequestParam(value = "maChuThe", required = false) String maChuThe)
    {
        return chuTheDAO.getChuThe(Long.parseLong(maChuThe));
    }

    @ApiOperation("Thêm chủ thể")
    @RequestMapping(value = "chu-the/them-moi-chu-the", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void addChuThe(@RequestBody ChuTheObj obj)
    {
        chuTheDAO.addChuThe(obj);
    }

    @ApiOperation("Cập nhật chủ thể")
    @RequestMapping(value = "chu-the/cap-nhat-chu-the", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void updateChuThe(@RequestBody ChuTheObj obj)
    {
        chuTheDAO.updateChuThe(obj);
    }

    @ApiOperation("Xóa chủ thể")
    @RequestMapping(value = "chu-the/xoa", produces = "application/json; charset=utf-8", method = RequestMethod.DELETE)
    void deleteChuThe(@RequestParam(value = "maChuThe") String maChuThe)
    {
        chuTheDAO.deleteChuThe(Long.parseLong(maChuThe));
    }
}
