package vn.vnpt.chidaotuyen.jreport.jreport;

import java.io.File;
import java.io.Writer;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Iterator;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.JRException;

import net.sf.jasperreports.engine.JRExporter;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.export.HtmlEx;
import net.sf.jasperreports.engine.export.JRPdfExporter;
import net.sf.jasperreports.engine.export.JRRtfExporter;
import net.sf.jasperreports.engine.export.JRXlsExporter;
import net.sf.jasperreports.engine.export.ooxml.JRXlsxExporter;
import net.sf.jasperreports.engine.query.JRQueryExecuterFactory;
import net.sf.jasperreports.engine.util.JRLoader;
// import net.sf.jasperreports.engine.util.JRProperties;
import net.sf.jasperreports.export.SimpleExporterInput;
import net.sf.jasperreports.export.SimpleOutputStreamExporterOutput;
import net.sf.jasperreports.export.SimpleWriterExporterOutput;
import net.sf.jasperreports.export.WriterExporterOutput;
import org.springframework.jdbc.core.JdbcTemplate;
public class JasperHelper extends JdbcTemplate {
    public static void printPDF(String jasperFile, Map parameters, Connection cnn, HttpServletResponse response) {
        printReport("pdf", jasperFile, parameters, cnn, response);
    }

    public static void printXLS(String jasperFile, Map parameters, Connection cnn, HttpServletResponse response) {
        printReport("xls", jasperFile, parameters, cnn, response);
    }

    public static void printXLSX(String jasperFile, Map parameters, Connection cnn, HttpServletResponse response) {
        printReport("xlsx", jasperFile, parameters, cnn, response);
    }

    public static void printRTF(String jasperFile, Map parameters, Connection cnn, HttpServletResponse response) {
        printReport("rtf", jasperFile, parameters, cnn, response);
    }

    public static void printReport(String exportType, String jasperFile, Map parameters, Connection cnn, HttpServletResponse response) {
        printReport(exportType, new File(jasperFile), parameters, cnn, response);
    }

    public static void printReport(String exportType, String jasperFile, Map parameters, JRDataSource dataSource, HttpServletResponse response) {
        try {
            File reportFile = new File(jasperFile);
            JasperReport jasperReport = (JasperReport) JRLoader.loadObject(reportFile);
            String fileName = reportFile.getName();
            printReport(exportType, jasperReport, fileName, parameters, dataSource, response);
        } catch (Exception ex) {
            Logger.getLogger(JasperHelper.class.getName()).log(Level.SEVERE, null, ex);
        }

    }

    public static void printReport(String exportType, File reportFile, Map parameters, Connection cnn, HttpServletResponse response) {
        try {
            printInfo(reportFile.getName(), parameters);  // Print line
            Connection conToUse = cnn;
            // Create close-suppressing Connection proxy, also preparing returned Statements.

            //File reportFile = new File(jasperFile);
            //String path = request.getSession().getServletContext().getRealPath("/WEB-INF/store_files/")+"/baocaongay" + "_" + arr[2] + date + ".pdf";
            //JasperDesign jasperDesign = JRXmlLoader.load(new File(request.getSession().getServletContext().getRealPath("/WEB-INF/pages/baocao/rp_baocaongay.jrxml")));
            //JasperReport jasperReport = JasperCompileManager.compileReport(jasperDesign);
            JasperReport jasperReport = (JasperReport) JRLoader.loadObject(reportFile);
            String fileName = reportFile.getName();
            printReport(exportType, jasperReport, fileName, parameters, cnn, response);
        } catch (Exception ex) {
            Logger.getLogger(JasperHelper.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public static void printReport(String exportType, String fileName, File reportFile, Map parameters, Connection cnn, HttpServletResponse response) throws SQLException {
        try {
            printInfo(fileName, parameters);  // Print line

            //File reportFile = new File(jasperFile);
            //String path = request.getSession().getServletContext().getRealPath("/WEB-INF/store_files/")+"/baocaongay" + "_" + arr[2] + date + ".pdf";
            //JasperDesign jasperDesign = JRXmlLoader.load(new File(request.getSession().getServletContext().getRealPath("/WEB-INF/pages/baocao/rp_baocaongay.jrxml")));
            //JasperReport jasperReport = JasperCompileManager.compileReport(jasperDesign);
            JasperReport jasperReport = (JasperReport) JRLoader.loadObject(reportFile);
            printReport(exportType, jasperReport, fileName, parameters, cnn, response);
        } catch (JRException | SQLException ex) {
            Logger.getLogger(JasperHelper.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public static void printReport(String exportType, JasperReport jasperReport, String fileName, Map parameters, JRDataSource dataSource, HttpServletResponse response) {
        try {
            JasperPrint print = JasperFillManager.fillReport(jasperReport, parameters, dataSource);
            fileName = fileName.substring(0, fileName.length() - 6) + exportType;
            response.setContentType("application/" + exportType);
            response.setHeader("Content-Disposition", "attachment; filename=" + fileName);
            if (exportType.equalsIgnoreCase("pdf")) {
                JRPdfExporter exporter = new JRPdfExporter();
                exporter.setExporterInput(new SimpleExporterInput(print));
                exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(response.getOutputStream()));
                exporter.exportReport();
            } else if (exportType.equalsIgnoreCase("xls")) {
                JRXlsExporter exporter = new JRXlsExporter();
                exporter.setExporterInput(new SimpleExporterInput(print));
                exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(response.getOutputStream()));
                exporter.exportReport();
            } else if (exportType.equalsIgnoreCase("xlsx")) {
                JRXlsxExporter exporter = new JRXlsxExporter();
                exporter.setExporterInput(new SimpleExporterInput(print));
                exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(response.getOutputStream()));
                exporter.exportReport();
            } else if (exportType.equalsIgnoreCase("rtf")) {
                JRRtfExporter exporter = new JRRtfExporter();
                exporter.setExporterInput(new SimpleExporterInput(print));
                exporter.setExporterOutput(new SimpleWriterExporterOutput(response.getOutputStream()));
                exporter.exportReport();
            }
        } catch (Exception ex) {
            Logger.getLogger(JasperHelper.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public static void printReport(String exportType, JasperReport jasperReport, String fileName, Map parameters, Connection cnn, HttpServletResponse response) throws SQLException {
        try {

            printInfo(fileName, parameters);  // Print line

            //File reportFile = new File(jasperFile);
            //String path = request.getSession().getServletContext().getRealPath("/WEB-INF/store_files/")+"/baocaongay" + "_" + arr[2] + date + ".pdf";
            //JasperDesign jasperDesign = JRXmlLoader.load(new File(request.getSession().getServletContext().getRealPath("/WEB-INF/pages/baocao/rp_baocaongay.jrxml")));
            //JasperReport jasperReport = JasperCompileManager.compileReport(jasperDesign);
            //JasperReport jasperReport = (JasperReport) JRLoader.loadObject(reportFile);
            // JRProperties.setProperty(JRQueryExecuterFactory.QUERY_EXECUTER_FACTORY_PREFIX + "plsql", "com.jaspersoft.jrx.query.PlSqlQueryExecuterFactory");

            //JasperCompileManager.compileReportToFile("D:\\JavaProject\\vnpt_his\\web_his\\WEB-INF\\pages\\baocao\\rp_baocaongay.jrxml", "D:\\JavaProject\\vnpt_his\\web_his\\WEB-INF\\pages\\baocao\\rp_baocaongay.jasper");
            jasperReport.setProperty("net.sf.jasperreports.query.executer.factory.plsql", "com.jaspersoft.jrx.query.PlSqlQueryExecuterFactory");
            jasperReport.setProperty("net.sf.jasperreports.default.pdf.font.name", "DejaVu Sans");
            jasperReport.setProperty("net.sf.jasperreports.default.pdf.encoding", "Identity-H");
            jasperReport.setProperty("net.sf.jasperreports.default.pdf.embedded", "true");
            //Maybe this too, but not positive

            JasperPrint print = JasperFillManager.fillReport(jasperReport, parameters, cnn);
            //File file = new File(path);

            //response.setContentLength(new Long(file.length()).intValue());
            //        fileName = fileName.substring(0, fileName.length() - 6) + exportType;
            // fileName = fileName.substring(0, fileName.length() - 7) + "_" +new java.util.Date().getTime()/1000 + "." + exportType;
            fileName = fileName + "." + exportType;
            System.out.println("exportType=" + exportType);
            System.out.println("fileName=" + fileName);
            response.setContentType("application/" + exportType);
            response.setHeader("Content-Disposition", "attachment; filename=" + fileName);
            if (exportType.equalsIgnoreCase("pdf")) {
                //response.setHeader("Content-disposition", "inline;filename=" + fileName); Tuan chu thich
                JRPdfExporter exporter = new JRPdfExporter();
                exporter.setExporterInput(new SimpleExporterInput(print));
                exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(response.getOutputStream()));
                exporter.exportReport();
            } else if (exportType.equalsIgnoreCase("xls")) {
                JRXlsExporter exporter = new JRXlsExporter();
                exporter.setExporterInput(new SimpleExporterInput(print));
                exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(response.getOutputStream()));
                exporter.exportReport();
            } else if (exportType.equalsIgnoreCase("xlsx")) {
                JRXlsxExporter exporter = new JRXlsxExporter();
                exporter.setExporterInput(new SimpleExporterInput(print));
                exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(response.getOutputStream()));
                exporter.exportReport();
            } else if (exportType.equalsIgnoreCase("rtf")) {
                JRRtfExporter exporter = new JRRtfExporter();
                exporter.setExporterInput(new SimpleExporterInput(print));
                exporter.setExporterOutput(new SimpleWriterExporterOutput(response.getOutputStream()));
                exporter.exportReport();
            }
        } catch (Exception ex) {
            Logger.getLogger(JasperHelper.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    private static void printInfo(String fileName, Map parameters) {
        // Debug start
        System.out.println("\nReport file name: " + fileName);
        Iterator entries = parameters.entrySet().iterator();

        while (entries.hasNext()) {
            Map.Entry thisEntry = (Map.Entry) entries.next();
            Object key = thisEntry.getKey();
            Object value = thisEntry.getValue();
            System.out.println("Param [" + key + "]: " + value);
        }
        System.out.println("End " + fileName + "\n");
        // Debug end
    }
}
