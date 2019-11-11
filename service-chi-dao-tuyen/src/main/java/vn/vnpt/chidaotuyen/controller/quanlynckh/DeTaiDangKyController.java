package vn.vnpt.chidaotuyen.controller.quanlynckh;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import vn.vnpt.chidaotuyen.Obj.quanlynckh.DeTaiDangKyObj;
import vn.vnpt.chidaotuyen.dao.quanlynckh.detaidangky.DeTaiDangKyDAO;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@Api(value = "DeTaiDangKyController", description = "Danh mục đề tài đăng ký Controller")
public class DeTaiDangKyController {
    @Autowired
    private DeTaiDangKyDAO deTaiDAO;

    @ApiOperation("Lấy danh sách đề tài đăng ký")
    @RequestMapping(value = "de-tai-dang-ky/lay-danh-sach-de-tai-dang-ky", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List getDanhSachDeTaiDangKy(@RequestParam(value = "donVi", required = false) String donVi, @RequestParam(value = "nam", required = false) String nam)
    {
        return deTaiDAO.getDanhSachDeTaiDangKy(donVi, Long.parseLong(nam));
    }

    @ApiOperation("Lấy danh sách đề tài đăng ký theo tên")
    @RequestMapping(value = "de-tai-dang-ky/lay-danh-sach-de-tai-dang-ky-theo-ten-don-vi-nam", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List getDanhSachDeTaiDangKy(@RequestParam(value = "tenDeTai", required = false) String tenDeTai,
                                @RequestParam(value = "donVi", required = false) String donVi,
                                @RequestParam(value = "nam", required = false) String nam)
    {
        return deTaiDAO.getDanhSachDeTaiDangKyTheoTen(tenDeTai, donVi, Long.parseLong(nam));
    }

    @ApiOperation("Lấy đề tài đăng ký")
    @RequestMapping(value = "de-tai-dang-ky/lay-de-tai-dang-ky", method = RequestMethod.GET)
    public @ResponseBody
    DeTaiDangKyObj getDeTaiDangKy(@RequestParam(value = "maDeTai", required = false) String maDeTai)
    {
        return deTaiDAO.getDeTaiDangKy(Long.parseLong(maDeTai));
    }

    @ApiOperation("Thêm đề tài đăng ký")
    @RequestMapping(value = "de-tai-dang-ky/them-moi-de-tai-dang-ky", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void addDeTaiDangKy(@RequestBody DeTaiDangKyObj obj)
    {
        deTaiDAO.addDeTaiDangKy(obj);
    }

    @ApiOperation("Cập nhật đề tài đăng ký")
    @RequestMapping(value = "de-tai-dang-ky/cap-nhat-de-tai-dang-ky", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void updateDeTaiDangKy(@RequestBody DeTaiDangKyObj obj)
    {
        deTaiDAO.updateDeTaiDangKy(obj);
    }

    @ApiOperation("Xóa đề tài đăng ký")
    @RequestMapping(value = "de-tai-dang-ky/xoa", produces = "application/json; charset=utf-8", method = RequestMethod.DELETE)
    void deleteDeTaiDangKy(@RequestParam(value = "maDeTai", required = false) String maDeTai)
    {
        deTaiDAO.deleteDeTaiDangKy(Long.parseLong(maDeTai));
    }

    @ApiOperation("Upload đề tài đăng ký")
    @RequestMapping(value = "de-tai-dang-ky/upload-de-tai-dang-ky", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void uploadKHDT(@RequestParam("tap_tin") MultipartFile tap_tin)
    {
        if (!tap_tin.isEmpty()) {
            try {
                byte[] bytes = tap_tin.getBytes();
                String rootPath = System.getProperty("user.dir");
                File dir = new File(rootPath + File.separator + "service-chi-dao-tuyen" + File.separator + "src" + File.separator + "uploadFolder" + File.separator + "quanlynckh"+ File.separator + "detaidangky");
                if (!dir.exists())
                    dir.mkdirs();
                File serverFile = new File(dir.getAbsolutePath()
                    + File.separator + tap_tin.getOriginalFilename());
                BufferedOutputStream stream = new BufferedOutputStream(
                    new FileOutputStream(serverFile));
                stream.write(bytes);
                stream.close();

            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        else {
            System.out.println("Lỗi tập tin  rỗng");
        }
    }

    @RequestMapping(value = "de-tai-dang-ky/download-de-tai-dang-ky", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public void downloadTapTin(@RequestParam(value = "tap_tin", required = false) String tap_tin,
                               HttpServletResponse response) {
        try {
            String rootPath = System.getProperty("user.dir");
            File dir = new File(rootPath + File.separator + "service-chi-dao-tuyen" + File.separator + "src" + File.separator + "uploadFolder" + File.separator + "quanlynckh"+ File.separator + "detaidangky");
            String tapTin = dir + File.separator + tap_tin;
            // get your file as InputStream
            InputStream is = new FileInputStream(tapTin);
            // copy it to response's OutputStream
            org.apache.commons.io.IOUtils.copy(is, response.getOutputStream());
            response.flushBuffer();
        } catch (IOException ex) {
            // log.info("Error writing file to output stream. Filename was '{}'", fileName, ex);
            throw new RuntimeException("IOError writing file to output stream");
        }
    }

                                            /* ĐỀ TÀI ĐĂNG KÝ KHOA PHÒNG*/

    @ApiOperation("Thêm đề tài đăng ký khoa phòng")
    @RequestMapping(value = "de-tai-dang-ky/them-moi-de-tai-dang-ky-khoa-phong", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void addDeTaiDangKyKhoaPhong(@RequestParam(value="maDeTai", required = false) String maDeTai,
                                 @RequestParam(value="maKhoaPhong", required = false) String maKhoaPhong)
    {
        deTaiDAO.addDeTaiDangKyKhoaPhong(Long.parseLong(maDeTai), maKhoaPhong);
    }

    @ApiOperation("Xóa đề tài đăng ký khoa phòng")
    @RequestMapping(value = "de-tai-dang-ky/xoa-de-tai-dang-ky-khoa-phong", produces = "application/json; charset=utf-8", method = RequestMethod.DELETE)
    void deleteDeTaiDangKyKhoaPhong(@RequestParam(value = "maDeTai", required = false) String maDeTai)
    {
        deTaiDAO.deleteDeTaiDangKyKhoaPhong(Long.parseLong(maDeTai));
    }

    @ApiOperation("Lấy danh sách khoa phòng đề tài đăng ký")
    @RequestMapping(value = "de-tai-dang-ky/lay-danh-sach-khoa-phong-de-tai-dang-ky", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List getDanhSachKhoaPhongDeTaiDangKy(@RequestParam(value = "maDeTai", required = false) String maDeTai)
    {
        return deTaiDAO.getDanhSachKhoaPhongThucHienDeTaiDangKy(Long.parseLong(maDeTai));
    }

    @ApiOperation("Lấy max mã đề tài đăng ký")
    @RequestMapping(value = "de-tai-dang-ky/lay-ma-de-tai-max", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    Long getMaCDTMax()
    {
        return deTaiDAO.getMaDeTaiDangKyMax();
    }
}
