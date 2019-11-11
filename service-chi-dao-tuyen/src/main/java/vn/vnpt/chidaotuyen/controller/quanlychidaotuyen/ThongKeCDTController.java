package vn.vnpt.chidaotuyen.controller.quanlychidaotuyen;

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
public class ThongKeCDTController {
    @Autowired
    DataSource dataSource;

    @GetMapping("thong-ke/in-ds-van-ban")
    public void inDanhSachVanBan(@RequestParam(value = "coQuanBanHanh", required = false) String coquanbanhanh,
                                 @RequestParam(value = "donVi", required = false) String donvi,
                                 HttpServletRequest request, HttpServletResponse response) {
        try {
            Map parameters = new HashMap();
            parameters.put("coquanbanhanh", coquanbanhanh);
            parameters.put("donvi", donvi);
            File reportFile;
            reportFile = new ClassPathResource("/report_chidaotuyen/report_vanban.jasper").getFile();
            JasperHelper.printReport("pdf", reportFile, parameters, DataSourceUtils.getConnection(dataSource), response);
        }
        catch (Exception ex)
        {
            ex.printStackTrace();
        }
    }

    @GetMapping("thong-ke/in-ds-ke-hoach")
    public void inDanhSachKeHoach(@RequestParam(value = "donVi", required = false) String donVi,
                                 @RequestParam(value = "nam", required = false) String nam,
                                 HttpServletRequest request, HttpServletResponse response) {
        try {
            Map parameters = new HashMap();
            parameters.put("donvi", donVi);
            parameters.put("nam", nam);
            File reportFile;
            reportFile = new ClassPathResource("/report_chidaotuyen/report_kehoach.jasper").getFile();
            JasperHelper.printReport("pdf", reportFile, parameters, DataSourceUtils.getConnection(dataSource), response);
        }
        catch (Exception ex)
        {
            ex.printStackTrace();
        }
    }

    @GetMapping("thong-ke/in-ds-cdt")
    public void inDanhSachCDT(@RequestParam(value = "donVi", required = false) String donVi,
                              @RequestParam(value = "nam", required = false) String nam,
                                  HttpServletRequest request, HttpServletResponse response) {
        try {
            Map parameters = new HashMap();
            parameters.put("donvi", donVi);
            parameters.put("nam", nam);
            File reportFile;
            reportFile = new ClassPathResource("/report_chidaotuyen/report_cdt.jasper").getFile();
            JasperHelper.printReport("pdf", reportFile, parameters, DataSourceUtils.getConnection(dataSource), response);
        }
        catch (Exception ex)
        {
            ex.printStackTrace();
        }
    }
}
