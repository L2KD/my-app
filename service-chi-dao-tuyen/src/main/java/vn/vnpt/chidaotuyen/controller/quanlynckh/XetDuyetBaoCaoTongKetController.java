package vn.vnpt.chidaotuyen.controller.quanlynckh;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import vn.vnpt.chidaotuyen.Obj.quanlynckh.XetDuyetBaoCaoTongKetObj;
import vn.vnpt.chidaotuyen.dao.quanlynckh.xetduyetbaocaotongket.XetDuyetBaoCaoTongKetDAO;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@Api(value = "XetDuyetBaoCaoTongKetController", description = "Danh mục xét duyệt báo cáo tổng kết Controller")
public class XetDuyetBaoCaoTongKetController {
    @Autowired
    private XetDuyetBaoCaoTongKetDAO xetDuyetBaoCaoTongKetDAO;

    @ApiOperation("Lấy danh sách xét duyệt báo cáo tổng kết")
    @RequestMapping(value = "xet-duyet-bao-cao-tong-ket/lay-danh-sach-xet-duyet-bao-cao-tong-ket", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List getDanhSachXetDuyetBaoCaoTongKet(@RequestParam(value = "donVi", required = false) String donVi,
                                  @RequestParam(value = "nam", required = false) String nam,
                                  @RequestParam(value = "trangThai", required = false) String trangThai)
    {
        return xetDuyetBaoCaoTongKetDAO.getDanhSachXetDuyetBaoCaoTongKet(donVi, Long.parseLong(nam), Integer.parseInt(trangThai));
    }
    @ApiOperation("Lấy danh sách xét duyệt báo cáo tổng kết theo tên")
    @RequestMapping(value = "xet-duyet-bao-cao-tong-ket/lay-danh-sach-xet-duyet-bao-cao-tong-ket-theo-ten-don-vi-nam-trang-thai", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List getDanhSachXetDuyetBaoCaoTongKetTheoTen(@RequestParam(value = "tenDeTai,", required = false) String tenDeTai,
                                                 @RequestParam(value = "donVi", required = false) String donVi,
                                                 @RequestParam(value = "nam", required = false) String nam,
                                                 @RequestParam(value = "trangThai", required = false) String trangThai)
    {
        return xetDuyetBaoCaoTongKetDAO.getDanhSachXetDuyetBaoCaoTongKetTheoTen(tenDeTai, donVi, Long.parseLong(nam), Integer.parseInt(trangThai));
    }

    @ApiOperation("Lấy xét duyệt báo cáo tổng kết")
    @RequestMapping(value = "xet-duyet-bao-cao-tong-ket/lay-xet-duyet-bao-cao-tong-ket", method = RequestMethod.GET)
    public @ResponseBody
    XetDuyetBaoCaoTongKetObj getXetDuyetBaoCaoTongKet(@RequestParam(value = "maDeTai", required = false) String maDeTai)
    {
        return xetDuyetBaoCaoTongKetDAO.getXetDuyetBaoCaoTongKet(Long.parseLong(maDeTai));
    }

    @ApiOperation("Cập nhật xét duyệt báo cáo tổng kết")
    @RequestMapping(value = "xet-duyet-bao-cao-tong-ket/cap-nhat-xet-duyet-bao-cao-tong-ket", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void updateXetDuyetBaoCaoTongKet(@RequestBody XetDuyetBaoCaoTongKetObj obj)
    {
        xetDuyetBaoCaoTongKetDAO.updateXetDuyetBaoCaoTongKet(obj);
    }

    @ApiOperation("Upload xét duyệt báo cáo tổng kết")
    @RequestMapping(value = "xet-duyet-bao-cao-tong-ket/upload-xet-duyet-bao-cao-tong-ket", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void uploadKHDT(@RequestParam("tap_tin") MultipartFile tap_tin)
    {
        if (!tap_tin.isEmpty()) {
            try {
                byte[] bytes = tap_tin.getBytes();
                String rootPath = System.getProperty("user.dir");
                File dir = new File(rootPath + File.separator + "service-chi-dao-tuyen" + File.separator + "src" + File.separator + "uploadFolder" + File.separator + "quanlynckh"+ File.separator + "xetduyetbaocaotonket");
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

    @ApiOperation("Upload biên bản xét duyệt báo cáo tổng kết")
    @RequestMapping(value = "xet-duyet-bao-cao-tong-ket/upload-bien-ban-xet-duyet-bao-cao-tong-ket", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void uploadBBXetDuyetBCTK(@RequestParam("tap_tin") MultipartFile tap_tin)
    {
        if (!tap_tin.isEmpty()) {
            try {
                byte[] bytes = tap_tin.getBytes();
                String rootPath = System.getProperty("user.dir");
                File dir = new File(rootPath + File.separator + "service-chi-dao-tuyen" + File.separator + "src" + File.separator + "uploadFolder" + File.separator + "quanlynckh" + File.separator + "xetduyetbaocaotongket" + File.separator + "bienban");
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

    @RequestMapping(value = "xet-duyet-bao-cao-tong-ket/download-xet-duyet-bao-cao-tong-ket", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public void downloadTapTin(@RequestParam(value = "tap_tin", required = false) String tap_tin,
                               HttpServletResponse response) {
        try {
            String rootPath = System.getProperty("user.dir");
            File dir = new File(rootPath + File.separator + "service-chi-dao-tuyen" + File.separator + "src" + File.separator + "uploadFolder" + File.separator + "quanlynckh"+ File.separator + "xetduyetbaocaotonket");
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
