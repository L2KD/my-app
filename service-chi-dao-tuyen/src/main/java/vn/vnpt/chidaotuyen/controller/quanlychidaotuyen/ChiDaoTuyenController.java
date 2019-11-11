package vn.vnpt.chidaotuyen.controller.quanlychidaotuyen;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import vn.vnpt.chidaotuyen.Obj.quanlychidaotuyen.ChiDaoTuyen.*;
import vn.vnpt.chidaotuyen.dao.quanlychidaotuyen.ChiDaoTuyen.ChiDaoTuyenDAO;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@Api(value = "ChiDaoTuyenController", description = "Danh mục chỉ đạo tuyến Controller")
public class ChiDaoTuyenController {
    @Autowired
    private ChiDaoTuyenDAO chiDaoTuyenDAO;

    @ApiOperation("Lấy danh sách năm")
    @RequestMapping(value = "cdt/lay-danh-sach-nam", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List getDanhSachNamCDT()
    {
        return chiDaoTuyenDAO.getDanhSachNamCDT();
    }

    @ApiOperation("Lấy danh sách đơn vị tiếp nhận")
    @RequestMapping(value = "cdt/lay-danh-sach-don-vi-tiep-nhan", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List getDanhSachDonViTiepNhan(@RequestParam(value = "maDonVi", required = false) String maDonVi)
    {
        return chiDaoTuyenDAO.getDanhSachDonViTiepNhan(maDonVi);
    }

    @ApiOperation("Lấy max mã chỉ đạo tuyến")
    @RequestMapping(value = "cdt/lay-max", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    Long getMaCDTMax()
    {
        return chiDaoTuyenDAO.getMaCDTMax();
    }

    @ApiOperation("Lấy danh sách chỉ đạo tuyến theo năm, đơn vị, kế hoạch")
    @RequestMapping(value = "cdt/lay-danh-sach-cdt-theo-donvi-nam-kehoach", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List danhSachCDTTheoDonVi_Nam_KeHoach(@RequestParam(value = "maDonVi", required = false) String maDonVi,
                                          @RequestParam(value = "nam", required = false) String nam,
                                          @RequestParam(value = "maKeHoach", required = false) String maKeHoach)
    {
        return chiDaoTuyenDAO.getDanhSachCDT_Theo_DonVi_Nam_KeHoach(maDonVi, Long.parseLong(nam), Long.parseLong(maKeHoach));
    }
    @ApiOperation("Lấy danh sách chỉ đạo tuyến theo năm, đơn vị")
    @RequestMapping(value = "cdt/lay-danh-sach-cdt-theo-donvi-nam", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List danhSachCDTTheoDonVi_Nam(@RequestParam(value = "maDonVi", required = false) String maDonVi,
                                          @RequestParam(value = "nam", required = false) String nam)
    {
        return chiDaoTuyenDAO.getDanhSachCDT_Theo_DonVi_Nam(maDonVi, Long.parseLong(nam));
    }

    @ApiOperation("Lấy danh sách chỉ đạo tuyến All")
    @RequestMapping(value = "cdt/lay-danh-sach-cdt-all", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List danhSachCDT_all()
    {
        return chiDaoTuyenDAO.getAllCDT();
    }

    @ApiOperation("Lấy chỉ đạo tuyến")
    @RequestMapping(value = "cdt/lay-cdt", method = RequestMethod.GET)
    public @ResponseBody
    ChiDaoTuyenObj getCDT(@RequestParam(value = "maCDT", required = false) String maCDT)
    {
        return chiDaoTuyenDAO.getCDT(Long.parseLong(maCDT));
    }

    @ApiOperation("Thêm chỉ đạo tuyến")
    @RequestMapping(value = "cdt/them-moi-cdt", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void addCDT(@RequestBody ChiDaoTuyenObj cdt)
    {
        cdt.nguoiTao = Long.parseLong("1");
        chiDaoTuyenDAO.addCDT(cdt);
    }

    @ApiOperation("Cập nhật chỉ đạo tuyến")
    @RequestMapping(value = "cdt/cap-nhat-cdt", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void updateCDT(@RequestBody ChiDaoTuyenObj cdt)
    {
        cdt.nguoiTao = Long.parseLong("1");
        chiDaoTuyenDAO.updateCDT(cdt);
    }

    @ApiOperation("Xóa chỉ đạo tuyến")
    @RequestMapping(value = "cdt/xoa", produces = "application/json; charset=utf-8", method = RequestMethod.DELETE)
    void deleteCDT(@RequestParam(value = "maCDT", required = false) String maCDT)
    {
        chiDaoTuyenDAO.deleteCDT(Long.parseLong(maCDT));
    }

    @ApiOperation("Xóa chỉ đạo tuyến - nội dung")
    @RequestMapping(value = "cdt/xoa-cdt-noi-dung", produces = "application/json; charset=utf-8", method = RequestMethod.DELETE)
    void deleteCDT_NoiDung(@RequestParam(value = "maCDT", required = false) String maCDT)
    {
        chiDaoTuyenDAO.deleteCDT_NoiDung(Long.parseLong(maCDT));
    }

    @ApiOperation("Thêm chỉ đạo tuyến - nội dung")
    @RequestMapping(value = "cdt/them-moi-cdt-noi-dung", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void addCDT_NoiDung(@RequestParam(value="maCDT", required = false) String maCDT,
                        @RequestParam(value="maNoiDung", required = false) String maNoiDung)
    {
        chiDaoTuyenDAO.addCDT_NoiDung(Long.parseLong(maCDT), Long.parseLong(maNoiDung));
    }

    @ApiOperation("Xóa chỉ đạo tuyến - đối tượng")
    @RequestMapping(value = "cdt/xoa-cdt-doi-tuong", produces = "application/json; charset=utf-8", method = RequestMethod.DELETE)
    void deleteCDT_DoiTuong(@RequestParam(value = "maCDT", required = false) String maCDT)
    {
        chiDaoTuyenDAO.deleteCDT_DoiTuong(Long.parseLong(maCDT));
    }

    @ApiOperation("Thêm chỉ đạo tuyến - đối tượng")
    @RequestMapping(value = "cdt/them-moi-cdt-doi-tuong", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void addCDT_DoiTuong(@RequestParam(value="maCDT", required = false) String maCDT,
                         @RequestParam(value="maDoiTuong", required = false) String maDoiTuong)
    {
        chiDaoTuyenDAO.addCDT_DoiTuong(Long.parseLong(maCDT), Long.parseLong(maDoiTuong));
    }

    @ApiOperation("Xóa chỉ đạo tuyến - cá nhân phụ trách")
    @RequestMapping(value = "cdt/xoa-cdt-ca-nhan-phu-trach", produces = "application/json; charset=utf-8", method = RequestMethod.DELETE)
    void deleteCDT_CaNhan_PhuTrach(@RequestParam(value = "maCDT", required = false) String maCDT)
    {
        chiDaoTuyenDAO.deleteCDT_CaNhan_PhuTrach(Long.parseLong(maCDT));
    }

    @ApiOperation("Thêm chỉ đạo tuyến - cá nhân phụ trách")
    @RequestMapping(value = "cdt/them-moi-cdt-ca-nhan-phu-trach", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void addCDT_CaNhan_PhuTrach(@RequestParam(value="maCDT", required = false) String maCDT,
                                @RequestParam(value="maNhanVien", required = false) String maNhanVien)
    {
        chiDaoTuyenDAO.addCDT_CaNhan_PhuTrach(Long.parseLong(maCDT), Long.parseLong(maNhanVien));
    }

    @ApiOperation("Xóa chỉ đạo tuyến - cá nhân tiếp nhận")
    @RequestMapping(value = "cdt/xoa-cdt-ca-nhan-tiep-nhan", produces = "application/json; charset=utf-8", method = RequestMethod.DELETE)
    void deleteCDT_CaNhan_TiepNhan(@RequestParam(value = "maCDT") String maCDT)
    {
        chiDaoTuyenDAO.deleteCDT_CaNhan_TiepNhan(Long.parseLong(maCDT));
    }

    @ApiOperation("Thêm chỉ đạo tuyến - cá nhân tiếp nhận")
    @RequestMapping(value = "cdt/them-moi-cdt-ca-nhan-tiep-nhan", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void addCDT_CaNhan_TiepNhan(@RequestParam(value="maCDT", required = false) String maCDT,
                                @RequestParam(value="maNhanVien", required = false) String maNhanVien)
    {
        chiDaoTuyenDAO.addCDT_CaNhan_TiepNhan(Long.parseLong(maCDT), Long.parseLong(maNhanVien));
    }

    @ApiOperation("Upload chỉ đạo tuyến")
    @RequestMapping(value = "cdt/upload-cdt", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void uploadCDT(@RequestParam("tap_tin") MultipartFile tap_tin)
    {
        if (!tap_tin.isEmpty()) {
            try {
                byte[] bytes = tap_tin.getBytes();
                // Creating the directory to store file
                String rootPath = System.getProperty("user.dir"); // Get current user directory.
                File dir = new File(rootPath + File.separator + "service-chi-dao-tuyen" + File.separator + "src" + File.separator + "uploadFolder" + File.separator + "chidaotuyen");
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

    @RequestMapping(value = "cdt/download-cdt", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public void downloadTapTin(@RequestParam(value = "tap_tin", required = false) String tap_tin,
                               HttpServletResponse response) {
        try {
            String rootPath = System.getProperty("user.dir");
            File dir = new File(rootPath + File.separator + "service-chi-dao-tuyen" + File.separator + "src" + File.separator + "uploadFolder" + File.separator + "chidaotuyen");
            String tapTin = dir + File.separator + tap_tin;
            InputStream is = new FileInputStream(tapTin);
            org.apache.commons.io.IOUtils.copy(is, response.getOutputStream());
            response.flushBuffer();
        } catch (IOException ex) {
            throw new RuntimeException("IOError writing file to output stream");
        }
    }

    // Phục vụ cho phần sửa chỉ đạo tuyến

    @ApiOperation("Lấy danh sách chỉ đạo tuyến - nội dung")
    @RequestMapping(value = "cdt/lay-danh-sach-cdt-noi-dung", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List getDanhSachCDT_NoiDung_TheoMa(@RequestParam(value = "maCDT", required = false) String maCDT)
    {
        return chiDaoTuyenDAO.getDanhSachCDT_NoiDung_TheoMa(Long.parseLong(maCDT));
    }

    @ApiOperation("Lấy danh sách chỉ đạo tuyến - đối tượng")
    @RequestMapping(value = "cdt/lay-danh-sach-cdt-doi-tuong", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List getDanhSachCDT_DoiTuong_TheoMa(@RequestParam(value = "maCDT", required = false) String maCDT)
    {
        return chiDaoTuyenDAO.getDanhSachCDT_DoiTuong_TheoMa(Long.parseLong(maCDT));
    }

    @ApiOperation("Lấy danh sách chỉ đạo tuyến - cá nhân phụ trách")
    @RequestMapping(value = "cdt/lay-danh-sach-cdt-ca-nhan-phu-trach", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List getDanhSachCDT_CaNhan_PhuTrach_TheoMa(@RequestParam(value = "maCDT", required = false) String maCDT)
    {
        return chiDaoTuyenDAO.getDanhSachCDT_CaNhan_PhuTrach_TheoMa(Long.parseLong(maCDT));
    }

    @ApiOperation("Lấy danh sách chỉ đạo tuyến - cá nhân tiếp nhận")
    @RequestMapping(value = "cdt/lay-danh-sach-cdt-ca-nhan-tiep-nhan", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List getDanhSachCDT_CaNhan_TiepNhan_TheoMa(@RequestParam(value = "maCDT", required = false) String maCDT)
    {
        return chiDaoTuyenDAO.getDanhSachCDT_CaNhan_TiepNhan_TheoMa(Long.parseLong(maCDT));
    }


}
