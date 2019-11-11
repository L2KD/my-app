package vn.vnpt.chidaotuyen.dao.quanlynckh.dashboard;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.util.LinkedCaseInsensitiveMap;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.List;

@Repository
public class DashBoardDeTaiDAOImp implements DashBoardDeTaiDAO {

    @Autowired
    private DataSource dataSource;

    @Override
    public List getDanhSachDeTaiAll() {
        String sql = "CALL LayDanhSachDeTai_All()";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql);
        ArrayList dashBoardDeTaiObjList = new ArrayList();
        for (int i = 0; i < t.size(); i++) {
            Object newtmp = t.get(i);
            LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
            DashBoardDeTaiObj dashBoardDeTaiObj = new DashBoardDeTaiObj();
            dashBoardDeTaiObj.nam = Long.parseLong(map.get("nam").toString());
            dashBoardDeTaiObj.soLuong = Long.parseLong(map.get("so_luong_de_tai").toString());
            dashBoardDeTaiObjList.add(dashBoardDeTaiObj);
        }
        return dashBoardDeTaiObjList;
    }
    @Override
    public DashBoardTongSoDeTaiObj getDanhSachTongSoDeTaiAll() {
        String sql = "CALL LayDanhSachTongSoDeTai_All()";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List t = jdbcTemplate.queryForList(sql);
        try {
            t.get(0);
        }
        catch (Exception ex) {
            ex.printStackTrace();
            return new DashBoardTongSoDeTaiObj();
        }
            Object newtmp = t.get(0);
            LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) newtmp;
        DashBoardTongSoDeTaiObj dashBoardTongSoDeTaiObj = new DashBoardTongSoDeTaiObj();
            dashBoardTongSoDeTaiObj.tongDeTaiDangKy = Long.parseLong(map.get("tong_de_tai_dang_ky").toString());
            dashBoardTongSoDeTaiObj.tongDeTaiNam = Long.parseLong(map.get("tong_de_tai_nam").toString());
            dashBoardTongSoDeTaiObj.tongDeTaiDonVi = Long.parseLong(map.get("tong_de_tai_don_vi").toString());
        return dashBoardTongSoDeTaiObj;
    }
}
