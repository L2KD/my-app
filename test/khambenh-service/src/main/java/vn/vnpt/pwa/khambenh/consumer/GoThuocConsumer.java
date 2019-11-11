package vn.vnpt.pwa.khambenh.consumer;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.text.SimpleDateFormat;
import java.util.Map;
//
//
@Component
public class GoThuocConsumer {
//    @Autowired
////    XuatDuocDAO xuatDuocDAO;
//    @RabbitListener(queues = "CHECK_TAO_TOA_THUOC_QUEUE")
//    public void receiveToaToaThuocMessage(Message messageIn){
//       try {
//           String message = new String(messageIn.getBody());
//           Map data = new Gson().fromJson(message, Map.class);
////           xuatDuocDAO.taoToaThuocNgoaiTru(data.get("idTiepNhan").toString(), data.get("dvtt").toString(), data.get("ngayRaToa").toString(),
////               data.get("maPhongKham").toString(), data.get("maPhongKham").toString(), data.get("hoTen").toString(), data.get("phanTramBH").toString(),
////               data.get("tuoi").toString(), data.get("maBenhNhan").toString(), data.get("namHienTai").toString(),
////               data.get("tenPhongKham").toString(), data.get("soVaoVien").toString());
//           System.out.print(data);
//       }
//       catch (Exception e) {
//           System.out.print(e);
//       }
//    }
//
////    @RabbitListener(queues = "THEM_THUOC_QUEUE")
////    public void receiveThemThuocMessage(Message messageIn){
////        try {
////            String message = new String(messageIn.getBody());
////            Gson gson = new Gson();
////            JsonObject data = new Gson().fromJson(message, JsonObject.class);
////            ToaThuoc tt = gson.fromJson(data.get("toaThuocMSObj"), ToaThuoc.class);
////            gson.toJson(tt);
////            data.get("toaThuocMSObj");
////            String capCuu = data.get("capCuu").toString();
////            String tenBacSy = data.get("tenBacSy").toString();
//////            String thamSo323 = data.get("thamSo323").toString().equals("") ? "0" : data.get("thamSo323").toString();
////            String thamSo323 = "0";
////            String thamSo40041 = data.get("thamSo40041").toString().equals("") ? "0" : data.get("thamSo40041").toString();
////            String thamSo68 = data.get("thamSo68").toString().equals("") ? "0" : data.get("thamSo68").toString();
////            String thamSo73 = data.get("thamSo73").toString().equals("") ? "0" : data.get("thamSo73").toString();
////            String thamSo74 = data.get("thamSo74").toString().equals("") ? "0" : data.get("thamSo74").toString();
////            String thamSo8218075 = data.get("thamSo8218075").toString().equals("") ? "0" : data.get("thamSo8218075").toString();
////
////            int phongBan = Integer.parseInt(data.get("maPhong").toString());
////            int tachToaDichVu = Integer.parseInt(data.get("tachToaDichVu").toString());
////            System.out.println(data);
////            System.out.println(tt);
////            String ngayKB = data.get("ngayKB").toString();
//////            xuatDuocDAO.themThuocNgoaiTru(toaThuoc, Integer.parseInt(data.get("maPhong").toString()),data.get("capCuu").toString());
////            String ngayhientai = new SimpleDateFormat("yyyy-MM-dd").format(new java.util.Date());
////
////            tt.hienThiDonGia = data.get("thamSo82112").toString();
////            tt.idTiepNhan = tt.maToaThuoc.replaceFirst("tt_", "");
////            tt.maKhamBenh = "kb_" + tt.idTiepNhan;
////            tt.ngayHienTai = ngayKB;
////            tt.daThanhToan = "0";
////            tt.user = tt.maBacSi + "-" + tenBacSy;
////                if ((thamSo40041.equals("1")) && (tt.nghiepVu.equals("noitru_toadichvu") || tt.nghiepVu.equals("ba_ngoaitru_toadichvu") || tt.nghiepVu.equals("ngoaitru_toadichvu"))) {
////                    xuatDuocDAO.tachToaDichVu(tt, tachToaDichVu);
////                }
////            if (Integer.parseInt(tt.coBHYT) > 0 && thamSo74.equals("0")) {
////                tt.daThanhToan = xuatDuocDAO.kiemTraPhieuThanhToanDaTT(tt.dvtt, tt.ngayRaToa, tt.maBenhNhan, tt.maKhamBenh, tt.soVaoVien);
////                if (!thamSo68.equals("1") && !thamSo8218075.equals("1")) {
////                    if (Integer.parseInt(tt.daThanhToan) > 0) {
//////                        return "4";
////                    }
////                }
////            }
////            String kiemtrahethong = "0";
////            kiemtrahethong = xuatDuocDAO.kiemTraXuatThuocNgoaiTru(tt.dvtt, tt.maToaThuoc, tt.nghiepVu, tt.ngayRaToa, tt.maBenhNhan, tt.soVaoVien,thamSo323);
////            if (!kiemtrahethong.equals("0")) {
//////                return "5";
////            }
////            if ("".equals(tt.soPhieu)) {
////                if (thamSo73.equals("0")) {
////                    kiemtrahethong = xuatDuocDAO.kiemTraThuocTrung(tt.dvtt, tt.maToaThuoc, tt.nghiepVu, tt.ngayRaToa, tt.maBenhNhan, tt.maVatTu, tt.soVaoVien);
////                    if (!kiemtrahethong.equals("0")) {
//////                        return "3";
////                    }
////                }
////            }
////            String kq;
////            if (ngayhientai.equals(ngayKB)) {
////                kq = xuatDuocDAO.themThuocNgoaiTru(tt, phongBan, capCuu);
////            } else {
////                kq = xuatDuocDAO.themThuocNgoaiTruTraiNgay(tt, phongBan, capCuu);
////            }
////
////        }
////        catch (Exception e) {
////            e.printStackTrace();
////        }
////    }
//
}
