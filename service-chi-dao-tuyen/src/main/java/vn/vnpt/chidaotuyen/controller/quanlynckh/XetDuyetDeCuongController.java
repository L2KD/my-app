package vn.vnpt.chidaotuyen.controller.quanlynckh;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import vn.vnpt.chidaotuyen.Obj.quanlynckh.XetDuyetDeCuongObj;
import vn.vnpt.chidaotuyen.dao.quanlynckh.xetduyetdecuong.XetDuyetDeCuongDAO;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@Api(value = "XetDuyetDeCuongController", description = "Danh mục xét duyệt đề cương Controller")
public class XetDuyetDeCuongController {
    @Autowired
    private XetDuyetDeCuongDAO xetDuyetDeTaiDAO;

    @ApiOperation("Lấy danh sách xét duyệt đề cương")
    @RequestMapping(value = "xet-duyet-de-cuong/lay-danh-sach-xet-duyet-de-cuong", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List getDanhSachXetDuyetDeCuong(@RequestParam(value = "donVi", required = false) String donVi,
                                  @RequestParam(value = "nam", required = false) String nam,
                                  @RequestParam(value = "trangThai", required = false) String trangThai)
    {
        return xetDuyetDeTaiDAO.getDanhSachXetDuyetDeCuong(donVi, Long.parseLong(nam), Integer.parseInt(trangThai));
    }
    @ApiOperation("Lấy danh sách xét duyệt đề cương theo tên")
    @RequestMapping(value = "xet-duyet-de-cuong/lay-danh-sach-xet-duyet-de-cuong-theo-ten-don-vi-nam-trang-thai", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List getDanhSachXetDuyetDeCuongTheoTen(@RequestParam(value = "tenDeTai", required = false) String tenDeTai,
                                    @RequestParam(value = "donVi", required = false) String donVi,
                                    @RequestParam(value = "nam", required = false) String nam,
                                    @RequestParam(value = "trangThai", required = false) String trangThai)
    {
        return xetDuyetDeTaiDAO.getDanhSachXetDuyetDeCuongTheoTen(tenDeTai, donVi, Long.parseLong(nam), Integer.parseInt(trangThai));
    }

    @ApiOperation("Lấy xét duyệt đề cương")
    @RequestMapping(value = "xet-duyet-de-cuong/lay-xet-duyet-de-cuong", method = RequestMethod.GET)
    public @ResponseBody
    XetDuyetDeCuongObj getXetDuyetDeCuong(@RequestParam(value = "maDeTai", required = false) String maDeTai)
    {
        return xetDuyetDeTaiDAO.getXetDuyetDeCuong(Long.parseLong(maDeTai));
    }

    @ApiOperation("Cập nhật xét duyệt đề cương")
    @RequestMapping(value = "xet-duyet-de-cuong/cap-nhat-xet-duyet-de-cuong", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void updateXetDuyetDeCuong(@RequestBody XetDuyetDeCuongObj obj)
    {
        xetDuyetDeTaiDAO.updateXetDuyetDeCuong(obj);
    }

    @ApiOperation("Upload tập tin đề cương")
    @RequestMapping(value = "xet-duyet-de-cuong/upload-de-cuong-xet-duyet-de-cuong", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void uploadDeCuong(@RequestParam("tap_tin") MultipartFile tap_tin)
    {
        if (!tap_tin.isEmpty()) {
            try {
                byte[] bytes = tap_tin.getBytes();
                String rootPath = System.getProperty("user.dir");
                File dir = new File(rootPath + File.separator + "service-chi-dao-tuyen" + File.separator + "src" + File.separator + "uploadFolder" + File.separator + "quanlynckh"+ File.separator + "xetduyetdecuong" + File.separator + "decuong");
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

    @ApiOperation("Upload tập tin đề cương")
    @RequestMapping(value = "xet-duyet-de-cuong/upload-bien-ban-xet-duyet-de-cuong", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void uploadBienBan(@RequestParam("tap_tin") MultipartFile tap_tin)
    {
        if (!tap_tin.isEmpty()) {
            try {
                byte[] bytes = tap_tin.getBytes();
                String rootPath = System.getProperty("user.dir");
                File dir = new File(rootPath + File.separator + "service-chi-dao-tuyen" + File.separator + "src" + File.separator + "uploadFolder" + File.separator + "quanlynckh"+ File.separator + "xetduyetdecuong" + File.separator + "bienban");
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

    @RequestMapping(value = "xet-duyet-de-cuong/download-de-cuong-xet-duyet-de-cuong", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public void downloadTapTin(@RequestParam(value = "tap_tin", required = false) String tap_tin,
                               HttpServletResponse response) {
        try {
            String rootPath = System.getProperty("user.dir");
            File dir = new File(rootPath + File.separator + "service-chi-dao-tuyen" + File.separator + "src" + File.separator + "uploadFolder" + File.separator + "quanlynckh"+ File.separator + "xetduyetdecuong" + File.separator + "decuong");
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

    @RequestMapping(value = "xet-duyet-de-cuong/download-bien-ban-xet-duyet-de-cuong", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public void downloadTapTin1(@RequestParam(value = "tap_tin", required = false) String tap_tin,
                               HttpServletResponse response) {
        try {
            String rootPath = System.getProperty("user.dir");
            File dir = new File(rootPath + File.separator + "service-chi-dao-tuyen" + File.separator + "src" + File.separator + "uploadFolder" + File.separator + "quanlynckh"+ File.separator + "xetduyetdecuong" + File.separator + "bienban");
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
}
