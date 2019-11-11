package vn.vnpt.chidaotuyen.controller.quanlynckh;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import vn.vnpt.chidaotuyen.Obj.quanlynckh.BienBanKeHoachDeTaiObj;
import vn.vnpt.chidaotuyen.dao.quanlynckh.bienbankehoachdetai.BienBanKeHoachDeTaiUngDungChoDonViDAO;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.util.List;

@RestController
@RequestMapping("/api")
@Api(value = "BienBanKeHoachDeTaiUngDungChoDonViController", description = "Danh mục xét duyệt đề tài ứng dụng cho đơn vị Controller")
public class BienBanKeHoachDeTaiController {
    @Autowired
    private BienBanKeHoachDeTaiUngDungChoDonViDAO bienBanKeHoachDeTaiUngDungChoDonViDAO;

    @ApiOperation("Lấy danh sách biên bản kế hoạch đề tài ứng dụng cho đơn vị")
    @RequestMapping(value = "bien-ban-ke-hoach-de-tai-ung-dung-cho-don-vi/lay-danh-sach-bien-ban-ke-hoach-de-tai-ung-dung-cho-don-vi", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List getDanhSachBienBanKeHoachDeTaiUngDungChoDonVi( @RequestParam(value = "donVi", required = false) String donVi,
                                                        @RequestParam(value = "nam", required = false) String nam,
                                                        @RequestParam(value = "trangThai", required = false) String trangThai)
    {
        return bienBanKeHoachDeTaiUngDungChoDonViDAO.getDanhSachBienBanKeHoachDeTaiUngDungChoDonVi(donVi, Long.parseLong(nam), Integer.parseInt(trangThai));
    }
    @ApiOperation("Lấy danh sách biên bản kế hoạch đề tài ứng dụng cho đơn vị theo tên")
    @RequestMapping(value = "bien-ban-ke-hoach-de-tai-ung-dung-cho-don-vi/lay-danh-sach-bien-ban-ke-hoach-de-tai-ung-dung-cho-don-vi-theo-ten-don-vi-nam-trang-thai", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List getDanhSachBienBanKeHoachDeTaiUngDungChoDonViTheoTen(@RequestParam(value = "tenDeTai", required = false) String tenDeTai,
                                                        @RequestParam(value = "donVi", required = false) String donVi,
                                                        @RequestParam(value = "nam", required = false) String nam,
                                                        @RequestParam(value = "trangThai", required = false) String trangThai)
    {
        return bienBanKeHoachDeTaiUngDungChoDonViDAO.getDanhSachBienBanKeHoachDeTaiUngDungChoDonViTheoTen(tenDeTai, donVi, Long.parseLong(nam), Integer.parseInt(trangThai));
    }

    @ApiOperation("Lấy biên bản kế hoạch đề tài ứng dụng cho đơn vị")
    @RequestMapping(value = "bien-ban-ke-hoach-de-tai-ung-dung-cho-don-vi/lay-bien-ban-ke-hoach-de-tai-ung-dung-cho-don-vi", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    BienBanKeHoachDeTaiObj getBaoCaoQuyNamDeTai(@RequestParam("maDeTai") String maDeTai)
    {
        return bienBanKeHoachDeTaiUngDungChoDonViDAO.getBienBienKeHoachDeTaiUngDungChoDonVi(Long.parseLong(maDeTai));
    }

    @ApiOperation("Cập nhật biên bản kế hoạch đề tài ứng dụng cho đơn vị")
    @RequestMapping(value = "bien-ban-ke-hoach-de-tai-ung-dung-cho-don-vi/cap-nhat-bien-ban-ke-hoach-de-tai-ung-dung-cho-don-vi", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void updateBienBanKeHoachDeTaiUngDungChoDonVi(@RequestBody BienBanKeHoachDeTaiObj obj)
    {
        bienBanKeHoachDeTaiUngDungChoDonViDAO.updateBienBanKeHoachDeTaiUngDungChoDonVi(obj);
    }

    @ApiOperation("Upload tập tin biên bản kế hoạch đề tài ứng dụng cho đơn vị")
    @RequestMapping(value = "bien-ban-ke-hoach-de-tai-ung-dung-cho-don-vi/upload-bien-ban-ke-hoach-de-tai-ung-dung-cho-don-vi", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void uploadDeCuong(@RequestParam("tap_tin") MultipartFile tap_tin)
    {
        if (!tap_tin.isEmpty()) {
            try {
                byte[] bytes = tap_tin.getBytes();
                String rootPath = System.getProperty("user.dir");
                File dir = new File(rootPath + File.separator + "service-chi-dao-tuyen" + File.separator + "src" + File.separator + "uploadFolder" + File.separator + "quanlynckh"+ File.separator + "bienbankehoachdetaiungdungchodonvi");
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
}
