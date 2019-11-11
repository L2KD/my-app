package vn.vnpt.chidaotuyen.controller;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import vn.vnpt.chidaotuyen.Obj.TaiKhoanObj;
import vn.vnpt.chidaotuyen.dao.TaiKhoanDAO;

import java.util.List;

@RestController
@RequestMapping("/api")
@Api(value = "TaiKhoanController", description = "Tài khoản Controller")
public class TaiKhoanController {

    @Autowired
    private TaiKhoanDAO taiKhoanDAO;

    @ApiOperation("Đăng nhập")
    @RequestMapping(value = "tai-khoan/check", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    int checkLogin(@RequestParam(value = "taiKhoan", required = false) String taiKhoan,
                   @RequestParam(value = "matKhau", required = false) String matKhau)
    {
        return taiKhoanDAO.checkLogin(taiKhoan, matKhau);
    }

    @ApiOperation("Lấy thông tin tài khoản")
    @RequestMapping(value = "tai-khoan/lay-thong-tin-tai-khoan", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    TaiKhoanObj getThongTinTaiKhoan(@RequestParam(value = "taiKhoan", required = false) String taiKhoan,
                                    @RequestParam(value = "matKhau", required = false) String matKhau)
    {
        return taiKhoanDAO.getThongTinTaiKhoan(taiKhoan, matKhau);
    }
}
