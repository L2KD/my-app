package vn.vnpt.chidaotuyen.controller.quanlynckh;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import vn.vnpt.chidaotuyen.Obj.quanlynckh.DeTaiNamObj;
import vn.vnpt.chidaotuyen.dao.quanlynckh.detainam.DeTaiNamDAO;

import java.util.List;

@RestController
@RequestMapping("/api")
@Api(value = "DeTaiNamController", description = "Danh mục đề tài năm Controller")
public class DeTaiNamController {

    @Autowired
    private DeTaiNamDAO deTaiNamDAO;

    @ApiOperation("Lấy danh sách đề tài năm")
    @RequestMapping(value = "de-tai-nam/lay-danh-sach-de-tai-nam", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List getDanhSachDeTaiNam(@RequestParam(value = "donVi", required = false) String donVi,
                             @RequestParam(value = "nam", required = false) String nam,
                             @RequestParam(value = "trangThai", required = false) String trangThai)
    {
        return deTaiNamDAO.getDanhSachDeTaiNam(donVi, Long.parseLong(nam), Integer.parseInt(trangThai));
    }
    @ApiOperation("Lấy danh sách đề tài năm theo tên")
    @RequestMapping(value = "de-tai-nam/lay-danh-sach-de-tai-nam-theo-ten-don-vi-nam-trang-thai", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List getDanhSachDeTaiNam(@RequestParam(value = "tenDeTai", required = false) String tenDeTai,
                             @RequestParam(value = "donVi", required = false) String donVi,
                             @RequestParam(value = "nam", required = false) String nam,
                             @RequestParam(value = "trangThai", required = false) String trangThai)
    {
        return deTaiNamDAO.getDanhSachDeTaiNamTheoTen(tenDeTai, donVi, Long.parseLong(nam), Integer.parseInt(trangThai));
    }



    @ApiOperation("Lấy danh sách đề tài năm người thực hiện")
    @RequestMapping(value = "de-tai-nam/lay-danh-sach-nguoi-thuc-hien", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List getDanhSachNguoiThucHien(@RequestParam(value = "maDeTai", required = false) String maDeTai)
    {
        return deTaiNamDAO.getDanhSachNguoiThucHien(Long.parseLong(maDeTai));
    }

    @ApiOperation("Lấy đề tài năm")
    @RequestMapping(value = "de-tai-nam/lay-de-tai-nam", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    DeTaiNamObj getDanhSachDeTaiNam(@RequestParam(value = "maDeTai", required = false) String maDeTai)
    {
        return deTaiNamDAO.getDeTaiNam(Long.parseLong(maDeTai));
    }

    @ApiOperation("Thêm đề tài năm")
    @RequestMapping(value = "de-tai-nam/cap-nhat-de-tai-nam", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void updateDeTaiNam(@RequestBody DeTaiNamObj obj)
    {
        deTaiNamDAO.updateDeTaiNam(obj);
    }

    @ApiOperation("Xóa đề tài năm - người thực hiện")
    @RequestMapping(value = "de-tai-nam/xoa-de-tai-nam-nguoi-thuc-hien", produces = "application/json; charset=utf-8", method = RequestMethod.DELETE)
    void deleteDeTaiNam_NguoiThucHien(@RequestParam(value = "maDeTai", required = false) String maDeTai)
    {
        deTaiNamDAO.deleteDeTaiNam_NguoiThucHien(Long.parseLong(maDeTai));
    }

    @ApiOperation("Thêm đề tài năm - người thực hiện")
    @RequestMapping(value = "de-tai-nam/them-de-tai-nam-nguoi-thuc-hien", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void addDeTaiNam_NguoiThucHien(@RequestParam(value = "maDeTai", required = false) String maDeTai,
                                   @RequestParam(value = "maNhanVien", required = false) String maNhanVien)
    {
        deTaiNamDAO.addDeTaiNam_NguoiThucHien(Long.parseLong(maDeTai), Long.parseLong(maNhanVien));
    }
}
