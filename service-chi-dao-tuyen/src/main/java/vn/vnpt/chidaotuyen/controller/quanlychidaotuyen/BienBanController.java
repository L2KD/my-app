package vn.vnpt.chidaotuyen.controller.quanlychidaotuyen;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import vn.vnpt.chidaotuyen.Obj.quanlychidaotuyen.ChiDaoTuyen.BienBanObj;
import vn.vnpt.chidaotuyen.dao.quanlychidaotuyen.ChiDaoTuyen.BienBanDAO;

@RestController
@RequestMapping("/api")
@Api(value = "BienBanController", description = "Danh mục biên bản chỉ đạo tuyến Controller")
public class BienBanController {
    @Autowired
    private BienBanDAO bienBanDAO;

    @ApiOperation("Lấy biên bản chỉ đạo tuyến")
    @RequestMapping(value = "cdt/lay-bien-ban", method = RequestMethod.GET)
    public @ResponseBody
    BienBanObj getBienBan(@RequestParam(value = "maCDT", required = false) String maCDT)
    {
        return bienBanDAO.getBienBan(Long.parseLong(maCDT));
    }

    @ApiOperation("Thêm biên bản chỉ đạo tuyến")
    @RequestMapping(value = "cdt/them-moi-bien-ban-cdt", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void addBienBanCDT(@RequestBody BienBanObj bb)
    {
        bb.nguoiTao = Long.parseLong("1");
        bienBanDAO.addBienBan(bb);
    }

    @ApiOperation("Cập nhật biên bản chỉ đạo tuyến")
    @RequestMapping(value = "cdt/cap-nhat-bien-ban-cdt", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void updateBienBanCDT(@RequestBody BienBanObj bb)
    {
        bb.nguoiTao = Long.parseLong("1");
        bienBanDAO.updateBienBan(bb);
    }
}
