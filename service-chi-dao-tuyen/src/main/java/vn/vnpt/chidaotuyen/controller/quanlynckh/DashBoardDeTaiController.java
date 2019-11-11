package vn.vnpt.chidaotuyen.controller.quanlynckh;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import vn.vnpt.chidaotuyen.dao.quanlynckh.dashboard.DashBoardDeTaiDAO;
import vn.vnpt.chidaotuyen.dao.quanlynckh.dashboard.DashBoardTongSoDeTaiObj;

import java.util.List;

@RestController
@RequestMapping("/api")
@Api(value = "DashBoardController", description = "Danh mục dashboard Controller")
public class DashBoardDeTaiController {
    @Autowired
    private DashBoardDeTaiDAO dashBoardDeTaiDAO;

    @ApiOperation("Lấy danh sách đề tài all")
    @RequestMapping(value = "/dashboard/get-de-tai-all", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List getAllDeTai()
    {
        return dashBoardDeTaiDAO.getDanhSachDeTaiAll();
    }

    @ApiOperation("Lấy danh sách tổng số đề tài all")
    @RequestMapping(value = "/dashboard/get-tong-so-de-tai-all", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    DashBoardTongSoDeTaiObj getAllTongSoDeTai()
    {
        return dashBoardDeTaiDAO.getDanhSachTongSoDeTaiAll();
    }
}
