package vn.vnpt.chidaotuyen.controller.quanlychidaotuyen;

import java.io.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DataSourceUtils;
import org.springframework.util.LinkedCaseInsensitiveMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import vn.vnpt.chidaotuyen.Obj.quanlychidaotuyen.CoQuanBanHanhObj;
import vn.vnpt.chidaotuyen.Obj.quanlychidaotuyen.DonViObj;
import vn.vnpt.chidaotuyen.Obj.quanlychidaotuyen.TinhThanhObj;
import vn.vnpt.chidaotuyen.Obj.quanlychidaotuyen.VanBanObj;
import vn.vnpt.chidaotuyen.dao.quanlychidaotuyen.vanban.VanBanDAO;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import net.sf.jasperreports.engine.JasperPrintManager;
import vn.vnpt.chidaotuyen.jreport.jreport.JasperHelper;

@RestController
@RequestMapping("/api")
@Api(value = "VanBanController", description = "Danh mục van ban Controller")
public class VanBanController {
    @Autowired
    DataSource dataSource;

    @Autowired
    private VanBanDAO vanBanDAO;

    private static final Logger logger = LoggerFactory
        .getLogger(VanBanController.class);

    @RequestMapping(value = "van-ban/uploadFile", method = RequestMethod.POST)
    public @ResponseBody
    String uploadFileHandler(@RequestParam("name") String name,
                             @RequestParam("file") MultipartFile file) {
        if (!file.isEmpty()) {
            try {
                byte[] bytes = file.getBytes();

                // Creating the directory to store file
                String rootPath = System.getProperty("user.dir");
                File dir = new File(rootPath + File.separator + "service-chi-dao-tuyen" + File.separator + "src" + File.separator + "uploadFolder");
                if (!dir.exists())
                    dir.mkdirs();

                String fileExtension = file.getOriginalFilename();
                // Create the file on server
                File serverFile = new File(dir.getAbsolutePath()
                    + File.separator + name + fileExtension.substring(fileExtension.lastIndexOf('.')));
                BufferedOutputStream stream = new BufferedOutputStream(
                    new FileOutputStream(serverFile));
                stream.write(bytes);
                stream.close();

                logger.info("Server File Location="
                    + serverFile.getAbsolutePath());
                return "You successfully uploaded file=" + name + fileExtension.substring(fileExtension.lastIndexOf('.'));
            } catch (Exception e) {
                return "You failed to upload " + name + " => " + e.getMessage();
            }
        } else {
            return "You failed to upload " + name
                + " because the file was empty.";
        }
    }

    @ApiOperation("Lấy danh sách tỉnh thành")
    @RequestMapping(value = "van-ban/lay-danh-sach-tinh-thanh", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List getDanhSachTinhThanh()
    {
        return vanBanDAO.getDanhSachTinh();
    }

    @ApiOperation("Lấy danh sách đơn vị")
    @RequestMapping(value = "van-ban/lay-danh-sach-don-vi-theo-tinh", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List getDanhSachDonVi(@RequestParam(value = "ma_tinh_thanh", required = false) String ma_tinh_thanh)
    {
        return vanBanDAO.getDanhSachDonVi(Long.parseLong(ma_tinh_thanh));
    }

    @ApiOperation("Lấy danh sách năm")
    @RequestMapping(value = "van-ban/lay-danh-sach-nam", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List getDanhSachNam()
    {
        return vanBanDAO.getDanhSachNamVanBan();
    }

    @ApiOperation("Lấy danh sách cơ quan ban hành")
    @RequestMapping(value = "van-ban/lay-danh-sach-co-quan-ban-hanh", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List getDanhSachCoQuanBanHanh()
    {
        return vanBanDAO.getDanhSachCoQuanBanHanh();
    }

    @ApiOperation("Lấy danh sách văn bản chỉ đạo tuyến")
    @RequestMapping(value = "van-ban/lay-danh-sach-van-ban-theo-donvi-nam", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List danhSachVanBanTheoDonVi_Nam(@RequestParam(value = "ma_don_vi", required = false) String ma_don_vi,
                                 @RequestParam(value = "nam", required = false) String nam)
    {
        return vanBanDAO.getDanhSachVanBanTheoDonVi_Nam(ma_don_vi, nam);
    }

    @ApiOperation("Lấy danh sách văn bản chỉ đạo tuyến theo nội dung trích yếu - đơn vị - năm")
    @RequestMapping(value = "van-ban/lay-danh-sach-van-ban-theo-ndty-donvi-nam", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List danhSachVanBanTheoNoiDungTrichYeu_DonVi_Nam(@RequestParam(value = "noiDungTrichYeu", required = false) String noiDungTrichYeu,
                                                     @RequestParam(value = "maDonVi", required = false) String madonVi,
                                                     @RequestParam(value = "nam", required = false) String nam)
    {
        return vanBanDAO.getDanhSachVanBanTheoNoidungTrichYeu_DonVi_Nam(noiDungTrichYeu, madonVi, Long.parseLong(nam));
    }

    @ApiOperation("Lấy văn bản chỉ đạo tuyến")
    @RequestMapping(value = "van-ban/lay-van-ban", method = RequestMethod.GET)
    public @ResponseBody
    VanBanObj getVanBan(@RequestParam(value = "ma_van_ban", required = false) String ma_van_ban)
    {
        return vanBanDAO.getVanBan(Long.parseLong(ma_van_ban));
    }

    @ApiOperation("Lấy tỉnh thành chỉ đạo tuyến")
    @RequestMapping(value = "van-ban/lay-tinh-thanh", method = RequestMethod.GET)
    public @ResponseBody
    TinhThanhObj getTinhThanh(@RequestParam(value = "ma_tinh_thanh", required = false) String ma_tinh_thanh)
    {
        return vanBanDAO.getTinhThanh(Long.parseLong(ma_tinh_thanh));
    }

    @ApiOperation("Lấy đơn vị chỉ đạo tuyến")
    @RequestMapping(value = "van-ban/lay-don-vi", method = RequestMethod.GET)
    public @ResponseBody
    DonViObj getDonVi(@RequestParam(value = "ma_don_vi", required = false) String ma_don_vi)
    {
        return vanBanDAO.getDonVi(ma_don_vi);
    }

    @ApiOperation("Lấy cơ quan ban hành chỉ đạo tuyến")
    @RequestMapping(value = "van-ban/lay-co-quan-ban-hanh", method = RequestMethod.GET)
    public @ResponseBody
    CoQuanBanHanhObj getCoQuanBanHanh(@RequestParam(value = "ma_co_quan", required = false) String ma_co_quan)
    {
        return vanBanDAO.getCoQuanBanHanh(Long.parseLong(ma_co_quan));
    }

    @ApiOperation("Thêm văn bản")
    @RequestMapping(value = "van-ban/them-moi-van-ban", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void addVanBan(@RequestBody VanBanObj vb)
    {
        vb.nguoiTao = 1;
        /*String tentep = vb.tapTin.substring(0, vb.tapTin.lastIndexOf('.'));
        String morong = vb.tapTin.substring(vb.tapTin.lastIndexOf('.'));
        vb.tapTin = tentep + "_" +  vb.donVi + vb.coQuanBanHanh + vb.ngayBanHanh + "_" + vb.maVanBan;
        vb.tapTin += morong;*/
        vanBanDAO.addVanBan(vb);
    }

    @ApiOperation("Cập nhật văn bản")
    @RequestMapping(value = "van-ban/cap-nhat-van-ban", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void updateVanBan(@RequestBody VanBanObj vb)
    {
        vb.nguoiTao = 1;
        /*String tentep = vb.tapTin.substring(0, vb.tapTin.lastIndexOf('.'));
        String morong = vb.tapTin.substring(vb.tapTin.lastIndexOf('.'));
        vb.tapTin = tentep +  vb.donVi + vb.coQuanBanHanh + vb.ngayBanHanh + "_" + vb.maVanBan;
        vb.tapTin += morong;*/
        vanBanDAO.updateVanBan(vb);
    }

    @ApiOperation("Upload văn bản chỉ đạo tuyến")
    @RequestMapping(value = "van-ban/upload-van-ban", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void uploadVanBan(@RequestParam("tap_tin") MultipartFile tap_tin)
    {
        if (!tap_tin.isEmpty()) {
            try {
                byte[] bytes = tap_tin.getBytes();
                // Creating the directory to store file
                String rootPath = System.getProperty("user.dir"); // Get current user directory.
                File dir = new File(rootPath + File.separator + "service-chi-dao-tuyen" + File.separator + "src" + File.separator + "uploadFolder" + File.separator + "vanbancdt");
                if (!dir.exists())
                    dir.mkdirs(); //Create new folder

                // Create the file on server
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

//    @RequestMapping(value = "/download1", method = RequestMethod.GET)
//    public void download1(HttpServletResponse response) throws IOException {
//        try {
//            String rootPath = System.getProperty("user.dir"); // Get current user directory.
//            File dir = new File(rootPath + File.separator + "service-chi-dao-tuyen" + File.separator + "src" + File.separator + "uploadFolder" + File.separator + "vanbancdt");
//            if (!dir.exists())
//                dir.mkdirs(); //Create new folder
//
//            // Create the file on server
//            File serverFile = new File(dir.getAbsolutePath()
//                + File.separator + tap_tin.getOriginalFilename());
//            File file = new File(context.getRealPath("/file/demo.txt"));
//            byte[] data = FileUtils.readFileToByteArray(file);
//            // Thiết lập thông tin trả về
//            response.setContentType("application/octet-stream");
//            response.setHeader("Content-disposition", "attachment; filename=" + file.getName());
//            response.setContentLength(data.length);
//            InputStream inputStream = new BufferedInputStream(new ByteArrayInputStream(data));
//            FileCopyUtils.copy(inputStream, response.getOutputStream());
//        } catch (Exception ex) {
//            ex.printStackTrace();
//        }
//    }

    @RequestMapping(value = "van-ban/download-van-ban", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public void downloadTapTin(@RequestParam(value = "tap_tin", required = false) String tap_tin,
                                  HttpServletResponse response) {
//        try {
//            String rootPath = System.getProperty("user.dir");
//            File dir = new File(rootPath + File.separator + "service-chi-dao-tuyen" + File.separator + "src" + File.separator + "uploadFolder" + File.separator + "vanbancdt");
//            String tapTin = dir + File.separator + tap_tin;
//            File downloadFile = new File(tapTin);
//            System.out.println(downloadFile);
//            response.setContentType("application/force-download");
//            response.setHeader("Content-Disposition", "attachment; filename=" + downloadFile.getName());
//            // File downloadFile = new ClassPathResource("/report_chidaotuyen/report_kehoach.jasper").getFile();
//            // JasperHelper.printReport("pdf", reportFile, parameters, DataSourceUtils.getConnection(dataSource), response);
//
//        }
//        catch (Exception ex)
//        {
//            ex.printStackTrace();
//        }


        try {
            String rootPath = System.getProperty("user.dir");
            File dir = new File(rootPath + File.separator + "service-chi-dao-tuyen" + File.separator + "src" + File.separator + "uploadFolder" + File.separator + "vanbancdt");
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

    @ApiOperation("Xóa văn bản")
    @RequestMapping(value = "van-ban/xoa", produces = "application/json; charset=utf-8", method = RequestMethod.DELETE)
    void XoaVanBan(@RequestParam(value = "ma_van_ban") String ma_van_ban)
    {
        vanBanDAO.deleteVanBan(Long.parseLong(ma_van_ban));
    }

    @RequestMapping(value = "van-ban/uploadMultipleFile", method = RequestMethod.POST)
    public @ResponseBody
    String uploadMultipleFileHandler(@RequestParam("name") String[] names,
                                     @RequestParam("file") MultipartFile[] files) {

        if (files.length != names.length)
            return "Mandatory information missing";

        String message = "";
        for (int i = 0; i < files.length; i++) {
            MultipartFile file = files[i];
            String name = names[i];
            try {
                byte[] bytes = file.getBytes();

                // Creating the directory to store file
                String rootPath = System.getProperty("catalina.home");
                File dir = new File(rootPath + File.separator + "tmpFiles");
                if (!dir.exists())
                    dir.mkdirs();

                // Create the file on server
                File serverFile = new File(dir.getAbsolutePath()
                    + File.separator + name);
                BufferedOutputStream stream = new BufferedOutputStream(
                    new FileOutputStream(serverFile));
                stream.write(bytes);
                stream.close();

                logger.info("Server File Location="
                    + serverFile.getAbsolutePath());
                message = message + "You successfully uploaded file=" + name
                    + "<br />";
            } catch (Exception e) {
                return "You failed to upload " + name + " => " + e.getMessage();
            }
        }
        return message;
    }
}
