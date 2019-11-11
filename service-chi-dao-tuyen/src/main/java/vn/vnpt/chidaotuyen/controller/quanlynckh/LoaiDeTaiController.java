package vn.vnpt.chidaotuyen.controller.quanlynckh;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import vn.vnpt.chidaotuyen.dao.quanlynckh.loaidetai.LoaiDeTaiDAO;
import vn.vnpt.chidaotuyen.Obj.quanlynckh.LoaiDeTaiObj;

import java.util.List;

@RestController
@RequestMapping("/api")
@Api(value = "LoaiDeTaiController", description = "Danh mục loại đề tài Controller")
public class LoaiDeTaiController {
    @Autowired
    private LoaiDeTaiDAO loaiDeTaiDAO;

    @ApiOperation("Lấy danh sách loại đề tài")
    @RequestMapping(value = "loai-de-tai/lay-danh-sach-loai-de-tai",
                    produces = "application/json; charset=utf-8",
                    method = RequestMethod.GET)
    public @ResponseBody
    List getDanhSachLoaiDeTai()
    {
        return loaiDeTaiDAO.getDanhSachLoaiDeTai();
    }

    @ApiOperation("Lấy danh sách loại đề tài theo tên")
    @RequestMapping(value = "loai-de-tai/lay-danh-sach-loai-de-tai-theo-ten", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List getDanhSachLoaiDeTaiTheoTen(@RequestParam(value = "loaiDeTai", required = false) String loaiDeTai)
    {
        return loaiDeTaiDAO.getDanhSachLoaiDeTaiTheoTen(loaiDeTai);
    }

    @ApiOperation("Lấy loại đề tài")
    @RequestMapping(value = "loai-de-tai/lay-loai-de-tai", method = RequestMethod.GET)
    public @ResponseBody
    LoaiDeTaiObj getLoaiDeTai(@RequestParam(value = "maLoaiDeTai", required = false) String maLoaiDeTai)
    {
        return loaiDeTaiDAO.getLoaiDeTai(Long.parseLong(maLoaiDeTai));
    }

    @ApiOperation("Thêm loại đề tài")
    @RequestMapping(value = "loai-de-tai/them-moi-loai-de-tai", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void addLoaiDeTai(@RequestBody LoaiDeTaiObj obj)
    {
        loaiDeTaiDAO.addLoaiDeTai(obj);
    }

    @ApiOperation("Cập nhật loại đề tài")
    @RequestMapping(value = "loai-de-tai/cap-nhat-loai-de-tai", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void updateLoaiDeTai(@RequestBody LoaiDeTaiObj obj)
    {
        loaiDeTaiDAO.updateLoaiDeTai(obj);
    }

    @ApiOperation("Xóa loại đề tài")
    @RequestMapping(value = "loai-de-tai/xoa", produces = "application/json; charset=utf-8", method = RequestMethod.DELETE)
    void deleteLoaiDeTai(@RequestParam(value = "maLoaiDeTai") String maLoaiDeTai)
    {
        loaiDeTaiDAO.deleteLoaiDeTai(Long.parseLong(maLoaiDeTai));
    }
}
