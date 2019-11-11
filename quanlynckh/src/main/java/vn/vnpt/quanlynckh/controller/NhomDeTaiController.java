package vn.vnpt.quanlynckh.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import vn.vnpt.quanlynckh.dao.nhomdetai.NhomDeTaiDAO;
import vn.vnpt.quanlynckh.obj.NhomDeTaiObj;

import java.util.List;

@RestController
@RequestMapping("/api")
@Api(value = "NhomDeTaiController", description = "Danh mục nhóm đề tài Controller")
public class NhomDeTaiController {
    @Autowired
    private NhomDeTaiDAO nhomDeTaiDAO;

    @ApiOperation("Lấy danh sách nhóm đề tài")
    @RequestMapping(value = "nhom-de-tai/lay-danh-sach-nhom-de-tai", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List getDanhSachNhomDeTai()
    {
        return nhomDeTaiDAO.getDanhSachNhomDeTai();
    }

    @ApiOperation("Lấy nhóm đề tài")
    @RequestMapping(value = "nhom-de-tai/lay-nhom-de-tai", method = RequestMethod.GET)
    public @ResponseBody
    NhomDeTaiObj getNhomDeTai(@RequestParam(value = "maNhomDeTai", required = false) String maNhomDeTai)
    {
        return nhomDeTaiDAO.getNhomDeTai(Long.parseLong(maNhomDeTai));
    }

    @ApiOperation("Thêm nhóm đề tài")
    @RequestMapping(value = "nhom-de-tai/them-moi-nhom-de-tai", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void addNhomDeTai(@RequestBody NhomDeTaiObj obj)
    {
        nhomDeTaiDAO.addNhomDeTai(obj);
    }

    @ApiOperation("Cập nhật nhóm đề tài")
    @RequestMapping(value = "nhom-de-tai/cap-nhat-nhom-de-tai", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void updateNhomDeTai(@RequestBody NhomDeTaiObj obj)
    {
        nhomDeTaiDAO.updateNhomDeTai(obj);
    }

    @ApiOperation("Xóa nhóm đề tài")
    @RequestMapping(value = "nhom-de-tai/xoa", produces = "application/json; charset=utf-8", method = RequestMethod.DELETE)
    void deleteNhomDeTai(@RequestParam(value = "maNhomDeTai") String maNhomDeTai)
    {
        nhomDeTaiDAO.deleteNhomDeTai(Long.parseLong(maNhomDeTai));
    }
}
