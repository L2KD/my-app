package vn.vnpt.chidaotuyen.controller.quanlynckh;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import vn.vnpt.chidaotuyen.dao.quanlynckh.kehoachdetai.KeHoachDeTaiDAO;
import vn.vnpt.chidaotuyen.Obj.quanlynckh.KeHoachDeTaiObj;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@Api(value = "KeHoachDeTaiController", description = "Danh mục kế hoạch Controller")
public class KeHoachDeTaiController {
    @Autowired
    private KeHoachDeTaiDAO keHoachDAO;

    @ApiOperation("Lấy danh sách kế hoạch đề tài")
    @RequestMapping(value = "ke-hoach-de-tai/lay-danh-sach-ke-hoach-de-tai", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List getDanhSachKeHoach(@RequestParam(value = "donVi", required = false) String donVi, @RequestParam(value = "nam", required = false) String nam)
    {
        return keHoachDAO.getDanhSachKeHoachDeTai(donVi, Long.parseLong(nam));
    }

    @ApiOperation("Lấy danh sách kế hoạch đề tài theo kế hoạch - đơn vị - năm")
    @RequestMapping(value = "ke-hoach-de-tai/lay-danh-sach-ke-hoach-de-tai-theo-ke-hoach-don-vi-nam", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List getDanhSachKeHoachTheoKeHoach_donVi_Nam(@RequestParam(value = "donVi", required = false) String donVi,
                                                 @RequestParam(value = "nam", required = false) String nam,
                                                 @RequestParam(value = "keHoach", required = false) String keHoach)
    {
        return keHoachDAO.getDanhSachNamKeHoachDeTaiTheoKeHoach_DonVi_Nam(keHoach, donVi, Long.parseLong(nam));
    }

    @ApiOperation("Lấy danh sách năm kế hoạch đề tài")
    @RequestMapping(value = "ke-hoach-de-tai/lay-danh-sach-nam-ke-hoach-de-tai", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List getDanhSachNamKeHoach()
    {
        return keHoachDAO.getDanhSachNamKeHoachDeTai();
    }

    @ApiOperation("Lấy kế hoạch")
    @RequestMapping(value = "ke-hoach-de-tai/lay-ke-hoach-de-tai", method = RequestMethod.GET)
    public @ResponseBody
    KeHoachDeTaiObj getKeHoach(@RequestParam(value = "maKeHoachDeTai", required = false) String maKeHoach)
    {
        return keHoachDAO.getKeHoachdeTai(Long.parseLong(maKeHoach));
    }

    @ApiOperation("Thêm kế hoạch")
    @RequestMapping(value = "ke-hoach-de-tai/them-moi-ke-hoach-de-tai", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void addKeHoach(@RequestBody KeHoachDeTaiObj obj)
    {
        keHoachDAO.addKeHoachDeTai(obj);
    }

    @ApiOperation("Cập nhật kế hoạch")
    @RequestMapping(value = "ke-hoach-de-tai/cap-nhat-ke-hoach-de-tai", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void updateKeHoach(@RequestBody KeHoachDeTaiObj obj)
    {
        keHoachDAO.updateKeHoachDeTai(obj);
    }

    @ApiOperation("Xóa kế hoạch")
    @RequestMapping(value = "ke-hoach-de-tai/xoa", produces = "application/json; charset=utf-8", method = RequestMethod.DELETE)
    void deleteKeHoach(@RequestParam(value = "maKeHoachDeTai") String maKeHoach)
    {
        keHoachDAO.deleteKeHoachDeTai(Long.parseLong(maKeHoach));
    }

    @ApiOperation("Upload kế hoạch đề tài")
    @RequestMapping(value = "ke-hoach-de-tai/upload-ke-hoach-de-tai", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void uploadKHDT(@RequestParam("tap_tin") MultipartFile tap_tin)
    {
        if (!tap_tin.isEmpty()) {
            try {
                byte[] bytes = tap_tin.getBytes();
                String rootPath = System.getProperty("user.dir");
                File dir = new File(rootPath + File.separator + "service-chi-dao-tuyen" + File.separator + "src" + File.separator + "uploadFolder" + File.separator + "quanlynckh"+ File.separator + "kehoachdetai");
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

    @RequestMapping(value = "ke-hoach-de-tai/download-ke-hoach-de-tai", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public void downloadTapTin(@RequestParam(value = "tap_tin", required = false) String tap_tin,
                               HttpServletResponse response) {
        try {
            String rootPath = System.getProperty("user.dir");
            File dir = new File(rootPath + File.separator + "service-chi-dao-tuyen" + File.separator + "src" + File.separator + "uploadFolder" + File.separator + "quanlynckh"+ File.separator + "kehoachdetai");
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
