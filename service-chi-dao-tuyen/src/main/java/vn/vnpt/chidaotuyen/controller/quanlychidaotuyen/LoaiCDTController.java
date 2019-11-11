package vn.vnpt.chidaotuyen.controller.quanlychidaotuyen;

// import com.zaxxer.hikari.HikariDataSource;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import vn.vnpt.chidaotuyen.Obj.quanlychidaotuyen.LoaiCDTObj;
import vn.vnpt.chidaotuyen.dao.quanlychidaotuyen.loaicdt.LoaiCDTDAO;

import java.util.List;

@RestController
@RequestMapping("/api")
@Api(value = "LoaiCDTController", description = "Danh mục loại cdt Controller")
public class LoaiCDTController {
    @Autowired
    private LoaiCDTDAO loaiCDTDAO;

    @ApiOperation("Lấy danh sách loại chỉ đạo tuyến")
    @RequestMapping(value = "loai-cdt/lay-danh-sach-loai-cdt", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List danhSachLoaiCDT()
    {
        return loaiCDTDAO.layDanhSachLoaiCDT();
    }

    @ApiOperation("Lấy danh sách loại chỉ đạo tuyến có tên giống với")
    @RequestMapping(value = "loai-cdt/lay-danh-sach-loai-cdt-theo-ten", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List danhSachLoaiCDT_Giong(
        @RequestParam(value = "tenLoaiCDT", required = false) String tenLoaiCDT
    )
    {
        return loaiCDTDAO.layDanhSachLoaiCDTTheoTen(tenLoaiCDT);
    }

    @ApiOperation("Lấy loại chỉ đạo tuyến")
    @RequestMapping(value = "loai-cdt/lay-loai-cdt", method = RequestMethod.GET)
    public @ResponseBody
    LoaiCDTObj layLoaiCDT(@RequestParam(value = "ma_loai_cdt", required = false) String ma_loai_cdt)
    {
        return loaiCDTDAO.layLoaiCDT(Long.parseLong(ma_loai_cdt));
    }

    @ApiOperation("Cập nhật loại chỉ đạo tuyến")
    @RequestMapping(value = "loai-cdt/cap-nhat-loai-cdt", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void capNhatLoaiCDT(@RequestBody LoaiCDTObj ht)
    {
        ht.nguoi_tao = 1;
        loaiCDTDAO.capNhatLoaiCDT(ht);
    }

    @ApiOperation("Thêm loại chỉ đạo tuyến")
    @RequestMapping(value = "loai-cdt/them-moi-loai-cdt", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void themLoaiCDT(@RequestBody LoaiCDTObj ht)
    {
        ht.nguoi_tao = 1;
        loaiCDTDAO.themLoaiCDT(ht);
    }

    //    @ApiOperation("Xóa loại chỉ đạo tuyến")
//    @RequestMapping(value = "loai-cdt/{ma_loai_cdt}/xoa", produces = "application/json; charset=utf-8", method = RequestMethod.DELETE)
//    void xoaLoaiCDT(@PathVariable String ma_loai_cdt)
//    {
//        loaiCDTDAO.xoaLoaiCDT(Long.parseLong(ma_loai_cdt));
//    }
    @ApiOperation("Xóa loại chỉ đạo tuyến")
    @RequestMapping(value = "loai-cdt/xoa", produces = "application/json; charset=utf-8", method = RequestMethod.DELETE)
    void XoaLoaiCDT(@RequestParam(value = "ma_loai_cdt") String ma_loai_cdt)
    {
        loaiCDTDAO.xoaLoaiCDT(Long.parseLong(ma_loai_cdt));
    }
}
