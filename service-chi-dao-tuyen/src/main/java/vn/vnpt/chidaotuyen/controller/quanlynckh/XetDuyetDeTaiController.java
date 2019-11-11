package vn.vnpt.chidaotuyen.controller.quanlynckh;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import vn.vnpt.chidaotuyen.Obj.quanlynckh.XetDuyetDeTaiObj;
import vn.vnpt.chidaotuyen.dao.quanlynckh.xetduyetdetai.XetDuyetDeTaiDAO;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@Api(value = "XetDuyetDeTaiController", description = "Danh mục xét duyệt đề tài Controller")
public class XetDuyetDeTaiController {
    @Autowired
    private XetDuyetDeTaiDAO xetDuyetDeTaiDAO;

    @ApiOperation("Lấy danh sách xét duyệt đề tài")
    @RequestMapping(value = "xet-duyet-de-tai/lay-danh-sach-xet-duyet-de-tai", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List getDanhSachXetDuyetDeTai(@RequestParam(value = "donVi", required = false) String donVi,
                                  @RequestParam(value = "nam", required = false) String nam,
                                  @RequestParam(value = "trangThai", required = false) String trangThai)
    {
        return xetDuyetDeTaiDAO.getDanhSachXetDuyetDeTai(donVi, Long.parseLong(nam), Integer.parseInt(trangThai));
    }
    @ApiOperation("Lấy danh sách xét duyệt đề tài theo tên")
    @RequestMapping(value = "xet-duyet-de-tai/lay-danh-sach-xet-duyet-de-tai-theo-ten-don-vi-nam-trang-thai", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List getDanhSachXetDuyetDeTai(@RequestParam(value = "tenDeTai", required = false) String tenDeTai,
                                  @RequestParam(value = "donVi", required = false) String donVi,
                                  @RequestParam(value = "nam", required = false) String nam,
                                  @RequestParam(value = "trangThai", required = false) String trangThai)
    {
        return xetDuyetDeTaiDAO.getDanhSachXetDuyetDeTaiTheoTen(tenDeTai, donVi, Long.parseLong(nam), Integer.parseInt(trangThai));
    }

    @ApiOperation("Lấy xét duyệt đề tài")
    @RequestMapping(value = "xet-duyet-de-tai/lay-xet-duyet-de-tai", method = RequestMethod.GET)
    public @ResponseBody
    XetDuyetDeTaiObj getXetDuyetDeTai(@RequestParam(value = "maDeTai", required = false) String maDeTai)
    {
        return xetDuyetDeTaiDAO.getXetDuyetDeTai(Long.parseLong(maDeTai));
    }

    @ApiOperation("Cập nhật xét duyệt đề tài")
    @RequestMapping(value = "xet-duyet-de-tai/cap-nhat-xet-duyet-de-tai", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void updateXetDuyetDeTai(@RequestBody XetDuyetDeTaiObj obj)
    {
        xetDuyetDeTaiDAO.updateXetDuyetDeTai(obj);
    }

    @ApiOperation("Upload xét duyệt đề tài")
    @RequestMapping(value = "xet-duyet-de-tai/upload-xet-duyet-de-tai", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void uploadKHDT(@RequestParam("tap_tin") MultipartFile tap_tin)
    {
        if (!tap_tin.isEmpty()) {
            try {
                byte[] bytes = tap_tin.getBytes();
                String rootPath = System.getProperty("user.dir");
                File dir = new File(rootPath + File.separator + "service-chi-dao-tuyen" + File.separator + "src" + File.separator + "uploadFolder" + File.separator + "quanlynckh"+ File.separator + "xetduyetdetai");
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

    @RequestMapping(value = "xet-duyet-de-tai/download-xet-duyet-de-tai", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public void downloadTapTin(@RequestParam(value = "tap_tin", required = false) String tap_tin,
                               HttpServletResponse response) {
        try {
            String rootPath = System.getProperty("user.dir");
            File dir = new File(rootPath + File.separator + "service-chi-dao-tuyen" + File.separator + "src" + File.separator + "uploadFolder" + File.separator + "quanlynckh"+ File.separator + "xetduyetdetai");
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
