package vn.vnpt.chidaotuyen.controller.quanlychidaotuyen;

// import com.zaxxer.hikari.HikariDataSource;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import vn.vnpt.chidaotuyen.Obj.quanlychidaotuyen.NoiDungObj;
import vn.vnpt.chidaotuyen.dao.quanlychidaotuyen.noidung.NoiDungDAO;

import java.util.List;

@RestController
@RequestMapping("/api")
@Api(value = "NoiDungController", description = "Danh mục nội dung Controller")
public class NoiDungController {
    @Autowired
    private NoiDungDAO noiDungDAO;

    @ApiOperation("Lấy danh sách nội dung chỉ đạo tuyến")
    @RequestMapping(value = "noi-dung/lay-danh-sach-noi-dung", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List danhSachNoiDung()
    {
        return noiDungDAO.layDanhSachNoiDung();
    }

    @ApiOperation("Lấy danh sách nội dung có tên giống với")
    @RequestMapping(value = "noi-dung/lay-danh-sach-noi-dung-theo-ten", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List danhSachNoiDung_Giong(
        @RequestParam(value = "noiDung", required = false) String noiDung
    )
    {
        return noiDungDAO.layDanhSachNoiDungTheoTen(noiDung);
    }

    @ApiOperation("Lấy nội dung")
    @RequestMapping(value = "noi-dung/lay-noi-dung", method = RequestMethod.GET)
    public @ResponseBody
    NoiDungObj layNoiDung(@RequestParam(value = "ma_noi_dung", required = false) String ma_noi_dung)
    {
        return noiDungDAO.layNoiDung(Long.parseLong(ma_noi_dung));
    }

    @ApiOperation("Cập nhật nội dung")
    @RequestMapping(value = "noi-dung/cap-nhat-noi-dung", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void capNhatNoiDung(@RequestBody NoiDungObj nd)
    {
        nd.nguoiTao = 1;
        noiDungDAO.capNhatNoiDung(nd);
    }

    @ApiOperation("Thêm nội dung")
    @RequestMapping(value = "noi-dung/them-moi-noi-dung", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void themNoiDung(@RequestBody NoiDungObj nd)
    {
        nd.nguoiTao = 1;
        noiDungDAO.themNoiDung(nd);
    }

    @ApiOperation("Xóa nội dung")
    @RequestMapping(value = "noi-dung/xoa", produces = "application/json; charset=utf-8", method = RequestMethod.DELETE)
    void XoaHinhThuc(@RequestParam(value = "ma_noi_dung") String ma_noi_dung)
    {
        noiDungDAO.xoaNoiDung(Long.parseLong(ma_noi_dung));
    }
}
