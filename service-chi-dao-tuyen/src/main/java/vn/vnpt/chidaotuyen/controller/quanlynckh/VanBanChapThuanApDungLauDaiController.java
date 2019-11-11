package vn.vnpt.chidaotuyen.controller.quanlynckh;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import vn.vnpt.chidaotuyen.Obj.quanlynckh.VanBanApDungLauDaiObj;
import vn.vnpt.chidaotuyen.Obj.quanlynckh.VanBanChapThuanApDungLauDaiObj;
import vn.vnpt.chidaotuyen.dao.quanlynckh.vanbanchapthuanapdunglaudai.VanBanChapThuanApDungLauDaiDAO;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.util.List;

@RestController
@RequestMapping("/api")
@Api(value = "VanBanChapThuanApDungLauDaiController", description = "Danh mục văn bản áp dụng lâu dài Controller")
public class VanBanChapThuanApDungLauDaiController {
    @Autowired
    private VanBanChapThuanApDungLauDaiDAO vanBanChapThuanApDungLauDaiDAO;

    @ApiOperation("Lấy danh sách văn bản chấp thuận áp dụng lâu dài")
    @RequestMapping(value = "van-ban-chap-thuan-ap-dung-lau-dai/lay-danh-sach-van-ban-chap-thuan-ap-dung-lau-dai", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List getDanhSachVanBanChapThuanApDungLauDai(@RequestParam(value = "donVi", required = false) String donVi,
                                       @RequestParam(value = "nam", required = false) String nam,
                                       @RequestParam(value = "trangThai", required = false) String trangThai)
    {
        return vanBanChapThuanApDungLauDaiDAO.getDanhSachVanBanChapThuanApDungLauDai(donVi, Long.parseLong(nam), Integer.parseInt(trangThai));
    }
    @ApiOperation("Lấy danh sách văn bản chấp thuận áp dụng lâu dài theo tên")
    @RequestMapping(value = "van-ban-chap-thuan-ap-dung-lau-dai/lay-danh-sach-van-ban-chap-thuan-ap-dung-lau-dai-theo-ten-don-vi-nam-trang-thai", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List getDanhSachVanBanChapThuanApDungLauDaiTheoTen(@RequestParam(value = "tenDeTai", required = false) String tenDeTai,
        @RequestParam(value = "donVi", required = false) String donVi,
                                       @RequestParam(value = "nam", required = false) String nam,
                                       @RequestParam(value = "trangThai", required = false) String trangThai)
    {
        return vanBanChapThuanApDungLauDaiDAO.getDanhSachVanBanChapThuanApDungLauDaiTheoTen(tenDeTai, donVi, Long.parseLong(nam), Integer.parseInt(trangThai));
    }

    @ApiOperation("Lấy văn bản áp dụng lâu dài")
    @RequestMapping(value = "van-ban-chap-thuan-ap-dung-lau-dai/lay-van-ban-chap-thuan-ap-dung-lau-dai", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    VanBanChapThuanApDungLauDaiObj getBaoCaoQuyNamDeTai(@RequestParam("maDeTai") String maDeTai)
    {
        return vanBanChapThuanApDungLauDaiDAO.getVanBanChapThuanApDungLauDai(Long.parseLong(maDeTai));
    }

    @ApiOperation("Cập nhật văn bản chấp thuận áp dụng lâu dài")
    @RequestMapping(value = "van-ban-chap-thuan-ap-dung-lau-dai/cap-nhat-van-ban-chap-thuan-ap-dung-lau-dai", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void updateVanBanChapThuanApDungLauDai(@RequestBody VanBanChapThuanApDungLauDaiObj obj)
    {
        vanBanChapThuanApDungLauDaiDAO.updateVanBanChapThuanApDungLauDai(obj);
    }

    @ApiOperation("Upload tập tin văn bản chấp thuận áp dụng lâu dài")
    @RequestMapping(value = "van-ban-chap-thuan-ap-dung-lau-dai/upload-van-ban-chap-thuan-ap-dung-lau-dai", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void uploadVanBanChapThuanApDungLauDai(@RequestParam("tap_tin") MultipartFile tap_tin)
    {
        if (!tap_tin.isEmpty()) {
            try {
                byte[] bytes = tap_tin.getBytes();
                String rootPath = System.getProperty("user.dir");
                File dir = new File(rootPath + File.separator + "service-chi-dao-tuyen" + File.separator + "src" + File.separator + "uploadFolder" + File.separator + "quanlynckh"+ File.separator + "vanbanchapthuanapdunglaudai");
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
