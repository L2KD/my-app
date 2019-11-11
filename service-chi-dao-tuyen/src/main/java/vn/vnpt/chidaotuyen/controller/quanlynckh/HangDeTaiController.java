package vn.vnpt.chidaotuyen.controller.quanlynckh;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import vn.vnpt.chidaotuyen.dao.quanlynckh.hangdetai.HangDeTaiDAO;
import vn.vnpt.chidaotuyen.Obj.quanlynckh.HangDeTaiObj;

import java.util.List;

@RestController
@RequestMapping("/api")
@Api(value = "HangDeTaiController", description = "Danh mục hạng đề tài Controller")
public class HangDeTaiController {
    @Autowired
    private HangDeTaiDAO hangDeTaiDAO;

    @ApiOperation("Lấy danh sách hạng đề tài")
    @RequestMapping(value = "hang-de-tai/lay-danh-sach-hang-de-tai", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List getDanhSachHangDeTai()
    {
        return hangDeTaiDAO.getDanhSachHangDeTai();
    }

    @ApiOperation("Lấy danh sách hạng đề tài theo tên")
    @RequestMapping(value = "hang-de-tai/lay-danh-sach-hang-de-tai-theo-ten", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List getDanhSachHangDeTaiTheoTen(@RequestParam(value = "hangDeTai", required = false) String hangDeTai)
    {
        return hangDeTaiDAO.getDanhSachHangDeTaiTheoTen(hangDeTai);
    }

    @ApiOperation("Lấy hạng đề tài")
    @RequestMapping(value = "hang-de-tai/lay-hang-de-tai", method = RequestMethod.GET)
    public @ResponseBody
    HangDeTaiObj getHangDeTai(@RequestParam(value = "maHangDeTai", required = false) String maHangDeTai)
    {
        return hangDeTaiDAO.getHangDeTai(Long.parseLong(maHangDeTai));
    }

    @ApiOperation("Thêm hạng đề tài")
    @RequestMapping(value = "hang-de-tai/them-moi-hang-de-tai", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void addHangDeTai(@RequestBody HangDeTaiObj obj)
    {
        hangDeTaiDAO.addHangDeTai(obj);
    }

    @ApiOperation("Cập nhật hạng đề tài")
    @RequestMapping(value = "hang-de-tai/cap-nhat-hang-de-tai", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void updateHangDeTai(@RequestBody HangDeTaiObj obj)
    {
        hangDeTaiDAO.updateHangDeTai(obj);
    }

    @ApiOperation("Xóa hạng đề tài")
    @RequestMapping(value = "hang-de-tai/xoa", produces = "application/json; charset=utf-8", method = RequestMethod.DELETE)
    void deleteHangDeTai(@RequestParam(value = "maHangDeTai") String maHangDeTai)
    {
        hangDeTaiDAO.deleteHangDeTai(Long.parseLong(maHangDeTai));
    }
}
