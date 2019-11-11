package vn.vnpt.chidaotuyen.dao.quanlychidaotuyen.dashboard;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.util.LinkedCaseInsensitiveMap;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.List;

@Repository
public class DashBoardDAOImp implements IDashBoardDAO {
    @Autowired
    private DataSource dataSource;

    @Override
    public List getDanhSachCDTAll() {
        String sql = "CALL LayDanhSachCDT_All()";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql);
        ArrayList dashBoardCDTObjList = new ArrayList();
        for (int i = 0; i < t.size(); i++) {
            Object newtmp = t.get(i);
            LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
            DashBoardCDTObj dashBoardCDTObj = new DashBoardCDTObj();
            dashBoardCDTObj.tenDonVi = map.get("ten_don_vi").toString();
            dashBoardCDTObj.soLuongCDT = Long.parseLong(map.get("so_luong_cdt").toString());
            dashBoardCDTObjList.add(dashBoardCDTObj);
        }
        return dashBoardCDTObjList;
    }

    @Override
    public DashBoardTongSoObj getTongSo() {
        String sql = "CALL LayDanhSachTongSo_All()";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql);
        Object newtmp = t.get(0);
        LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
        DashBoardTongSoObj dashBoardTongSoObj = new DashBoardTongSoObj();
        dashBoardTongSoObj.tongSoVanBan = Long.parseLong(map.get("tong_so_van_ban").toString());
        dashBoardTongSoObj.tongSoKeHoach = Long.parseLong(map.get("tong_so_ke_hoach").toString());
        dashBoardTongSoObj.tongSoCDT = Long.parseLong(map.get("tong_so_cdt").toString());
        return dashBoardTongSoObj;
    }
}
