package vn.vnpt.chidaotuyen.controller.quanlynckh;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import vn.vnpt.chidaotuyen.Obj.quanlynckh.XetDuyetDeTaiUngDungChoDonViObj;
import vn.vnpt.chidaotuyen.dao.quanlynckh.xetduyetdetaiungdungchodonvi.XetDuyetDeTaiUngDungChoDonViDAO;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@Api(value = "XetDuyetDeTaiUngDungChoDonViController", description = "Danh mục xét duyệt đề tài ứng dụng cho đơn vị Controller")
public class XetDuyetDeTaiUngDungChoDonViController {
    @Autowired
    private XetDuyetDeTaiUngDungChoDonViDAO xetDuyetDeTaiUngDungChoDonViDAO;

    @ApiOperation("Lấy danh sách xét duyệt đề tài ứng dụng cho đơn vị")
    @RequestMapping(value = "xet-duyet-de-tai-ung-dung-cho-don-vi/lay-danh-sach-xet-duyet-de-tai-ung-dung-cho-don-vi", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List getDanhSachXetDuyetDeTaiUngDungChoDonVi(@RequestParam(value = "donVi", required = false) String donVi,
                                       @RequestParam(value = "nam", required = false) String nam,
                                       @RequestParam(value = "trangThai", required = false) String trangThai)
    {
        return xetDuyetDeTaiUngDungChoDonViDAO.getDanhSachXetDuyetDeTaiUngDungChoDonVi(donVi, Long.parseLong(nam), Integer.parseInt(trangThai));
    }
    @ApiOperation("Lấy danh sách xét duyệt đề tài ứng dụng cho đơn vị theo tên")
    @RequestMapping(value = "xet-duyet-de-tai-ung-dung-cho-don-vi/lay-danh-sach-xet-duyet-de-tai-ung-dung-cho-don-vi-theo-ten-don-vi-nam-trang-thai", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List getDanhSachXetDuyetDeTaiUngDungChoDonViTheoTen(@RequestParam(value = "tenDeTai", required = false) String tenDeTai,
        @RequestParam(value = "donVi", required = false) String donVi,
                                       @RequestParam(value = "nam", required = false) String nam,
                                       @RequestParam(value = "trangThai", required = false) String trangThai)
    {
        return xetDuyetDeTaiUngDungChoDonViDAO.getDanhSachXetDuyetDeTaiUngDungChoDonViTheoTen(tenDeTai, donVi, Long.parseLong(nam), Integer.parseInt(trangThai));
    }

    @ApiOperation("Lấy xét duyệt đề tài ứng dụng cho đơn vị")
    @RequestMapping(value = "xet-duyet-de-tai-ung-dung-cho-don-vi/lay-xet-duyet-de-tai-ung-dung-cho-don-vi", method = RequestMethod.GET)
    public @ResponseBody
    XetDuyetDeTaiUngDungChoDonViObj getXetDuyetDeTaiUngDungChoDonVi(@RequestParam(value = "maDeTai", required = false) String maDeTai)
    {
        return xetDuyetDeTaiUngDungChoDonViDAO.getXetDuyetDeTaiUngDungChoDonVi(Long.parseLong(maDeTai));
    }

    @ApiOperation("Cập nhật xét duyệt đề tài ứng dụng cho đơn vị")
    @RequestMapping(value = "xet-duyet-de-tai-ung-dung-cho-don-vi/cap-nhat-xet-duyet-de-tai-ung-dung-cho-don-vi", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void updateXetDuyetDeTaiUngDungChoDonVi(@RequestBody XetDuyetDeTaiUngDungChoDonViObj obj)
    {
        xetDuyetDeTaiUngDungChoDonViDAO.updateXetDuyetDeTaiUngDungChoDonVi(obj);
    }

    @ApiOperation("Upload tập tin biên bản xét duyệt đề tài ứng dụng cho đơn vị")
    @RequestMapping(value = "xet-duyet-de-tai-ung-dung-cho-don-vi/upload-bien-ban-xet-duyet-de-tai-ung-dung-cho-don-vi", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void uploadDeCuong(@RequestParam("tap_tin") MultipartFile tap_tin)
    {
        if (!tap_tin.isEmpty()) {
            try {
                byte[] bytes = tap_tin.getBytes();
                String rootPath = System.getProperty("user.dir");
                File dir = new File(rootPath + File.separator + "service-chi-dao-tuyen" + File.separator + "src" + File.separator + "uploadFolder" + File.separator + "quanlynckh"+ File.separator + "xetduyetdetaiungdungchodonvi");
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

    @RequestMapping(value = "xet-duyet-de-tai-ung-dung-cho-don-vi/upload-bien-ban-xet-duyet-de-tai-ung-dung-cho-don-vi", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public void downloadTapTin(@RequestParam(value = "tap_tin", required = false) String tap_tin,
                               HttpServletResponse response) {
        try {
            String rootPath = System.getProperty("user.dir");
            File dir = new File(rootPath + File.separator + "service-chi-dao-tuyen" + File.separator + "src" + File.separator + "uploadFolder" + File.separator + "quanlynckh"+ File.separator + "xetduyetdetaiungdungchodonvi");
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
