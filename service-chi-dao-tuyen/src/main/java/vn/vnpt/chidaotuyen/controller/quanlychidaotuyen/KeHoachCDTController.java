package vn.vnpt.chidaotuyen.controller.quanlychidaotuyen;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import vn.vnpt.chidaotuyen.Obj.quanlychidaotuyen.KeHoachCDT.KeHoachCDTObj;
import vn.vnpt.chidaotuyen.dao.quanlychidaotuyen.kehoach.KeHoachDAO;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@Api(value = "KeHoachController", description = "Danh mục kế hoạch Controller")
public class KeHoachCDTController {
    @Autowired
    private KeHoachDAO keHoachDAO;

    @ApiOperation("Lấy danh sách năm")
    @RequestMapping(value = "ke-hoach/lay-danh-sach-nam", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List getDanhSachNamKeHoach()
    {
        return keHoachDAO.getDanhSachNamKeHoach();
    }

    @ApiOperation("Lấy danh sách văn bản theo kế hoạch chỉ đạo tuyến")
    @RequestMapping(value = "ke-hoach/lay-danh-sach-van-ban-theo-ke-hoach", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List getDanhSachVanBanTheoKeHoach(@RequestParam(value = "maKeHoach", required = false) String maKeHoach)
    {
        return keHoachDAO.getDanhSachVanBanTheoKeHoach(Long.parseLong(maKeHoach));
    }

    @ApiOperation("Lấy max mã kế hoạch")
    @RequestMapping(value = "ke-hoach/lay-max", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    Long getMaKeHoachMax()
    {
        return keHoachDAO.getMaKeHoachMax();
    }

    @ApiOperation("Lấy danh sách kế hoạch chỉ đạo tuyến")
    @RequestMapping(value = "ke-hoach/lay-danh-sach-ke-hoach-theo-donvi-nam", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List danhSachKeHoachTheoDonVi_Nam(@RequestParam(value = "maDonVi", required = false) String ma_don_vi,
                                      @RequestParam(value = "nam", required = false) String nam)
    {
        return keHoachDAO.getDanhSachKeHoachTheoDonVi_Nam(ma_don_vi, nam);
    }

    @ApiOperation("Lấy danh sách kế hoạch chỉ đạo tuyến theo nội dung trích yếu - đơn vị - năm")
    @RequestMapping(value = "ke-hoach/lay-danh-sach-ke-hoach-theo-ndty-donvi-nam", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List danhSachKeHoachTheoDonVi_Nam(@RequestParam(value = "noiDungTrichYeu", required = false) String noiDungTrichYeu,
                                      @RequestParam(value = "maDonVi", required = false) String maDonVi,
                                      @RequestParam(value = "nam", required = false) String nam)
    {
        return keHoachDAO.getDanhSachKeHoachTheoNoidungTrichYeu_DonVi_Nam(noiDungTrichYeu, maDonVi, Long.parseLong(nam));
    }

    @ApiOperation("Lấy kế hoạch chỉ đạo tuyến")
    @RequestMapping(value = "ke-hoach/lay-ke-hoach", method = RequestMethod.GET)
    public @ResponseBody
    KeHoachCDTObj getKeHoach(@RequestParam(value = "maKeHoach", required = false) String maKeHoach)
    {
        return keHoachDAO.getKeHoach(Long.parseLong(maKeHoach));
    }

    @ApiOperation("Thêm kế hoạch")
    @RequestMapping(value = "ke-hoach/them-moi-ke-hoach", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void addKeHoach(@RequestBody KeHoachCDTObj kh)
    {
        kh.nguoiTao = 1;
        keHoachDAO.addKeHoach(kh);
    }

    @ApiOperation("Thêm chi tiết kế hoạch")
    @RequestMapping(value = "ke-hoach/them-moi-chi-tiet-ke-hoach", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void addChiTietKeHoach(@RequestParam("maKeHoach") String maKeHoach,
                           @RequestParam("maVanBan") String maVanBan)
    {
        keHoachDAO.addChiTietKeHoach(Long.parseLong(maKeHoach), Long.parseLong(maVanBan));
    }

    @ApiOperation("Xóa chi tiết kế hoạch")
    @RequestMapping(value = "ke-hoach/xoa-chi-tiet-ke-hoach", produces = "application/json; charset=utf-8", method = RequestMethod.DELETE)
    void deleteChiTietKeHoach(@RequestParam(value = "maKeHoach", required = false) String maKeHoach){
        keHoachDAO.deleteChiTietKeHoach(Long.parseLong(maKeHoach));
    }

    @ApiOperation("Cập nhật kế hoạch")
    @RequestMapping(value = "ke-hoach/cap-nhat-ke-hoach", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void updateKeHoach(@RequestBody KeHoachCDTObj kh)
    {
        kh.nguoiTao = 1;
        keHoachDAO.updateKeHoach(kh);
    }

    @ApiOperation("Xóa kế hoạch")
    @RequestMapping(value = "ke-hoach/xoa", produces = "application/json; charset=utf-8", method = RequestMethod.DELETE)
    void deleteKeHoach(@RequestParam(value = "ma_ke_hoach") String ma_ke_hoach)
    {
        keHoachDAO.deleteKeHoach(Long.parseLong(ma_ke_hoach));
    }

    @ApiOperation("Upload kế hoạch chỉ đạo tuyến")
    @RequestMapping(value = "ke-hoach/upload-ke-hoach", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void uploadVanBan(@RequestParam("tap_tin") MultipartFile tap_tin)
    {
        if (!tap_tin.isEmpty()) {
            try {
                byte[] bytes = tap_tin.getBytes();
                // Creating the directory to store file
                String rootPath = System.getProperty("user.dir"); // Get current user directory.
                File dir = new File(rootPath + File.separator + "service-chi-dao-tuyen" + File.separator + "src" + File.separator + "uploadFolder" + File.separator + "kehoachcdt");
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

    @RequestMapping(value = "ke-hoach/download-ke-hoach", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public void downloadTapTin(@RequestParam(value = "tap_tin", required = false) String tap_tin,
                               HttpServletResponse response) {
        try {
            String rootPath = System.getProperty("user.dir");
            File dir = new File(rootPath + File.separator + "service-chi-dao-tuyen" + File.separator + "src" + File.separator + "uploadFolder" + File.separator + "kehoachcdt");
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
