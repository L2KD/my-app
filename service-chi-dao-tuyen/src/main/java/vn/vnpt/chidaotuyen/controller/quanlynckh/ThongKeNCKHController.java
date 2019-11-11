package vn.vnpt.chidaotuyen.controller.quanlynckh;

import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.DataSourceUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import vn.vnpt.chidaotuyen.jreport.jreport.JasperHelper;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import java.io.File;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@Api(value = "ThongKeController", description = "Thống kê controller")
public class ThongKeNCKHController {

    @Autowired
    DataSource dataSource;

    @GetMapping("thong-ke-nckh/in-ds-de-tai-dang-ky")
    public void inDanhSachDeTaiDangKy(@RequestParam(value = "donVi", required = false) String donVi,
                                 @RequestParam(value = "nam", required = false) String nam,
                                 HttpServletRequest request, HttpServletResponse response) {
        try {
            Map parameters = new HashMap();
            parameters.put("donvi", donVi);
            parameters.put("nam", nam);
            File reportFile;
            reportFile = new ClassPathResource("/report_nckh/report_detaidangky.jasper").getFile();
            JasperHelper.printReport("pdf", reportFile, parameters, DataSourceUtils.getConnection(dataSource), response);
        }
        catch (Exception ex)
        {
            ex.printStackTrace();
        }
    }

    @GetMapping("thong-ke-nckh/in-ds-de-tai-nam")
    public void inDanhSachDeTaiNam(@RequestParam(value = "donVi", required = false) String donVi,
                                  @RequestParam(value = "nam", required = false) String nam,
                                  HttpServletRequest request, HttpServletResponse response) {
        try {
            Map parameters = new HashMap();
            parameters.put("donvi", donVi);
            parameters.put("nam", nam);
            File reportFile;
            reportFile = new ClassPathResource("/report_nckh/report_detainam.jasper").getFile();
            JasperHelper.printReport("pdf", reportFile, parameters, DataSourceUtils.getConnection(dataSource), response);
        }
        catch (Exception ex)
        {
            ex.printStackTrace();
        }
    }

    @GetMapping("thong-ke-nckh/in-ds-de-tai-ung-dung-cho-don-vi")
    public void inDanhSachDeTaiUngDungChoDonVi(@RequestParam(value = "donVi", required = false) String donVi,
                              @RequestParam(value = "nam", required = false) String nam,
                              HttpServletRequest request, HttpServletResponse response) {
        try {
            Map parameters = new HashMap();
            parameters.put("donvi", donVi);
            parameters.put("nam", nam);
            File reportFile;
            reportFile = new ClassPathResource("/report_nckh/report_detaiungdungdonvi.jasper").getFile();
            JasperHelper.printReport("pdf", reportFile, parameters, DataSourceUtils.getConnection(dataSource), response);
        }
        catch (Exception ex)
        {
            ex.printStackTrace();
        }
    }
}
