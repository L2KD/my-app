package vn.vnpt.chidaotuyen.dao.quanlychidaotuyen.dashboard;

import org.springframework.stereotype.Repository;

import java.util.List;

public interface IDashBoardDAO {
    public List getDanhSachCDTAll();
    public DashBoardTongSoObj getTongSo();
}
