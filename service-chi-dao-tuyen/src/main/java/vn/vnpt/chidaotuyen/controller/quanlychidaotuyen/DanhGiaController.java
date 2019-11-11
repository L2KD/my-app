package vn.vnpt.chidaotuyen.controller.quanlychidaotuyen;

// import com.zaxxer.hikari.HikariDataSource;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import vn.vnpt.chidaotuyen.Obj.quanlychidaotuyen.DanhGiaObj;
import vn.vnpt.chidaotuyen.Obj.quanlychidaotuyen.LoaiCDTObj;
import vn.vnpt.chidaotuyen.dao.quanlychidaotuyen.danhgia.DanhGiaDAO;

import java.util.List;

@RestController
@RequestMapping("/api")
@Api(value = "DanhGiaController", description = "Danh mục đánh giá Controller")
public class DanhGiaController {
    @Autowired
    private DanhGiaDAO danhGiaDAO;

    @ApiOperation("Lấy danh sách loại cdt đánh giá")
    @RequestMapping(value = "danh-gia/lay-danh-sach-loai-cdt-danh-gia", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List danhSachLoaiCDTDanhGia()
    {
        return danhGiaDAO.layDanhSachLoaiCDTDanhGia();
    }

    @ApiOperation("Lấy danh sách đánh giá")
    @RequestMapping(value = "danh-gia/lay-danh-sach-danh-gia-theo-loai", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List danhSachDanhGiaTheoLoai(@RequestParam(value = "loai_cdt", required = false) String loai_cdt)
    {
        return danhGiaDAO.layDanhSachDanhGiaTheoLoai(loai_cdt);
    }

    @ApiOperation("Lấy loại cdt đánh giá")
    @RequestMapping(value = "danh-gia/lay-loai-cdt", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    LoaiCDTObj layLoaiCDTDanhGia(@RequestParam(value = "ma_loai_cdt", required = false) String ma_loai_cdt)
    {
        return danhGiaDAO.layLoaiCDTDanhGia(Long.parseLong(ma_loai_cdt));
    }

    @ApiOperation("Lấy danh sách đánh giá có tên giống với")
    @RequestMapping(value = "danh-gia/lay-danh-sach-danh-gia-theo-ten-va-loai", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List danhSachDanhGia_Giong(
        @RequestParam(value = "tenDanhGia", required = false) String tenDanhGia,
        @RequestParam(value = "maLoaiCDT", required = false) String maLoaiCDT
    )
    {
        return danhGiaDAO.layDanhSachDanhGiaTheoTenVaLoai(tenDanhGia, Long.parseLong(maLoaiCDT));
    }

    @ApiOperation("Lấy đánh giá")
    @RequestMapping(value = "danh-gia/lay-danh-gia", method = RequestMethod.GET)
    public @ResponseBody
    DanhGiaObj layDanhGia(@RequestParam(value = "ma_danh_gia", required = false) String ma_danh_gia)
    {
        return danhGiaDAO.layDanhGia(Long.parseLong(ma_danh_gia));
    }

    @ApiOperation("Cập nhật đánh giá")
    @RequestMapping(value = "danh-gia/cap-nhat-danh-gia", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void capNhatDanhGia(@RequestBody DanhGiaObj dg)
    {
        dg.nguoi_tao = 1;
        danhGiaDAO.capNhatDanhGia(dg);
    }

    @ApiOperation("Thêm đánh giá")
    @RequestMapping(value = "danh-gia/them-moi-danh-gia", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void themDanhGia(@RequestBody DanhGiaObj dg)
    {
        dg.nguoi_tao = 1;
        danhGiaDAO.themDanhGia(dg);
    }
    
    @ApiOperation("Xóa đánh giá")
    @RequestMapping(value = "danh-gia/xoa", produces = "application/json; charset=utf-8", method = RequestMethod.DELETE)
    void XoaDanhGia(@RequestParam(value = "ma_danh_gia") String ma_danh_gia)
    {
        danhGiaDAO.xoaDanhGia(Long.parseLong(ma_danh_gia));
    }
}
