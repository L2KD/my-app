package vn.vnpt.chidaotuyen.controller.quanlychidaotuyen;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import vn.vnpt.chidaotuyen.dao.quanlychidaotuyen.dashboard.DashBoardTongSoObj;
import vn.vnpt.chidaotuyen.dao.quanlychidaotuyen.dashboard.IDashBoardDAO;

import java.util.List;

@RestController
@RequestMapping("/api")
@Api(value = "DashBoardController", description = "Danh mục dashboard Controller")
public class DashBoardController {
    @Autowired
    private IDashBoardDAO dashBoardDAO;

    @ApiOperation("Lấy danh sách cdt all")
    @RequestMapping(value = "dashboard/get-cdt-all", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List getAllCDT()
    {
        return dashBoardDAO.getDanhSachCDTAll();
    }

    @ApiOperation("Lấy danh sách cdt all")
    @RequestMapping(value = "dashboard/get-tong-so-all", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    DashBoardTongSoObj getDanhSachTongSo()
    {
        return dashBoardDAO.getTongSo();
    }
}
