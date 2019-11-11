package vn.vnpt.chidaotuyen.controller.quanlynckh;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import vn.vnpt.chidaotuyen.Obj.quanlynckh.BaoCaoQuyNamDeTaiObj;
import vn.vnpt.chidaotuyen.dao.quanlynckh.baocaoquynamdetai.BaoCaoQuyNamDeTaiDAO;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.util.List;

@RestController
@RequestMapping("/api")
@Api(value = "BaoCaoQuyNamDeTaiUngDungChoDonViController", description = "Danh mục xét duyệt đề tài ứng dụng cho đơn vị Controller")
public class BaoCaoQuyNamDeTaiController {
    @Autowired
    private BaoCaoQuyNamDeTaiDAO baoCaoQuyNamDeTaiDAO;

    @ApiOperation("Lấy danh sách báo cáo quý năm đề tài")
    @RequestMapping(value = "bao-cao-quy-nam-de-tai/lay-danh-sach-bao-cao-quy-nam-de-tai", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List getDanhSachBaoCaoQuyNamDeTaiUngDungChoDonVi(@RequestParam(value = "donVi", required = false) String donVi,
                                                       @RequestParam(value = "nam", required = false) String nam,
                                                       @RequestParam(value = "trangThai", required = false) String trangThai)
    {
        return baoCaoQuyNamDeTaiDAO.getDanhSachBaoCaoQuyNamDeTai(donVi, Long.parseLong(nam), Integer.parseInt(trangThai));
    }
    @ApiOperation("Lấy danh sách báo cáo quý năm đề tài theo tên")
    @RequestMapping(value = "bao-cao-quy-nam-de-tai/lay-danh-sach-bao-cao-quy-nam-de-tai-theo-ten-don-vi-nam-trang-thai", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    public @ResponseBody
    List getDanhSachBaoCaoQuyNamDeTaiUngDungChoDonViTheoTen(@RequestParam(value = "tenDeTai", required = false) String tenDeTai,
                                                        @RequestParam(value = "donVi", required = false) String donVi,
                                                       @RequestParam(value = "nam", required = false) String nam,
                                                       @RequestParam(value = "trangThai", required = false) String trangThai)
    {
        return baoCaoQuyNamDeTaiDAO.getDanhSachBaoCaoQuyNamDeTaiTheoTen(tenDeTai, donVi, Long.parseLong(nam), Integer.parseInt(trangThai));
    }

    @ApiOperation("Lấy báo cáo quý năm đề tài")
    @RequestMapping(value = "bao-cao-quy-nam-de-tai/lay-bao-cao-quy-nam-de-tai", produces = "application/json; charset=utf-8", method = RequestMethod.GET)
    BaoCaoQuyNamDeTaiObj getBaoCaoQuyNamDeTai(@RequestParam("maDeTai") String maDeTai)
    {
        return baoCaoQuyNamDeTaiDAO.getBaoCaoQuyNamDeTai(Long.parseLong(maDeTai));
    }

    @ApiOperation("Cập nhật báo cáo quý năm đề tài")
    @RequestMapping(value = "bao-cao-quy-nam-de-tai/cap-nhat-bao-cao-quy-nam-de-tai", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void updateBaoCaoQuyNamDeTaiUngDungChoDonVi(@RequestBody BaoCaoQuyNamDeTaiObj obj)
    {
        baoCaoQuyNamDeTaiDAO.updateBaoCaoQuyNamDeTai(obj);
    }

    @ApiOperation("Upload tập tin báo cáo quý năm đề tài - Quý 1")
    @RequestMapping(value = "bao-cao-quy-nam-de-tai/upload-bao-cao-quy-nam-de-tai-quy-1", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void uploadBaoCaoQuyNamDeTaiQuy1(@RequestParam("tap_tin") MultipartFile tap_tin)
    {
        if (!tap_tin.isEmpty()) {
            try {
                byte[] bytes = tap_tin.getBytes();
                String rootPath = System.getProperty("user.dir");
                File dir = new File(rootPath + File.separator + "service-chi-dao-tuyen" + File.separator + "src" + File.separator + "uploadFolder" + File.separator + "quanlynckh" + File.separator + "baocaoquynamdetai" + File.separator + "quy1");
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

    @ApiOperation("Upload tập tin báo cáo quý năm đề tài - Quý 1")
    @RequestMapping(value = "bao-cao-quy-nam-de-tai/upload-bao-cao-quy-nam-de-tai-quy-2", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void uploadBaoCaoQuyNamDeTaiQuy2(@RequestParam("tap_tin") MultipartFile tap_tin)
    {
        if (!tap_tin.isEmpty()) {
            try {
                byte[] bytes = tap_tin.getBytes();
                String rootPath = System.getProperty("user.dir");
                File dir = new File(rootPath + File.separator + "service-chi-dao-tuyen" + File.separator + "src" + File.separator + "uploadFolder" + File.separator + "quanlynckh" + File.separator + "baocaoquynamdetai" + File.separator + "quy2");
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

    @ApiOperation("Upload tập tin báo cáo quý năm đề tài - Quý 1")
    @RequestMapping(value = "bao-cao-quy-nam-de-tai/upload-bao-cao-quy-nam-de-tai-quy-3", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void uploadBaoCaoQuyNamDeTaiQuy3(@RequestParam("tap_tin") MultipartFile tap_tin)
    {
        if (!tap_tin.isEmpty()) {
            try {
                byte[] bytes = tap_tin.getBytes();
                String rootPath = System.getProperty("user.dir");
                File dir = new File(rootPath + File.separator + "service-chi-dao-tuyen" + File.separator + "src" + File.separator + "uploadFolder" + File.separator + "quanlynckh" + File.separator + "baocaoquynamdetai" + File.separator + "quy3");
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

    @ApiOperation("Upload tập tin báo cáo quý năm đề tài - Quý 1")
    @RequestMapping(value = "bao-cao-quy-nam-de-tai/upload-bao-cao-quy-nam-de-tai-quy-4", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void uploadBaoCaoQuyNamDeTaiQuy4(@RequestParam("tap_tin") MultipartFile tap_tin)
    {
        if (!tap_tin.isEmpty()) {
            try {
                byte[] bytes = tap_tin.getBytes();
                String rootPath = System.getProperty("user.dir");
                File dir = new File(rootPath + File.separator + "service-chi-dao-tuyen" + File.separator + "src" + File.separator + "uploadFolder" + File.separator + "quanlynckh" + File.separator + "baocaoquynamdetai" + File.separator + "quy4");
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

    @ApiOperation("Upload tập tin báo cáo quý năm đề tài - Quý 1")
    @RequestMapping(value = "bao-cao-quy-nam-de-tai/upload-bao-cao-quy-nam-de-tai-nam", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    void uploadBaoCaoQuyNamDeTaiNam(@RequestParam("tap_tin") MultipartFile tap_tin)
    {
        if (!tap_tin.isEmpty()) {
            try {
                byte[] bytes = tap_tin.getBytes();
                String rootPath = System.getProperty("user.dir");
                File dir = new File(rootPath + File.separator + "service-chi-dao-tuyen" + File.separator + "src" + File.separator + "uploadFolder" + File.separator + "quanlynckh" + File.separator + "baocaoquynamdetai" + File.separator + "baocaonam");
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
