import React, { Component } from 'react';
import { Button, Table, Row, Badge } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField, AvFeedback, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

export class MainIndex extends Component {

    render() {
        return (<table style={ { width: '100%', marginLeft: '1%', marginRight: '' } }>
            {
                localStorage.getItem('tai_khoan') !== null && localStorage.getItem('tai_khoan') !== undefined ?
                    (
                        localStorage.getItem('phan_quyen') === '1' || localStorage.getItem('phan_quyen') === '2' ? (
                            localStorage.getItem('phan_quyen') === '1' ? (
                                <tbody>
                                <tr style={ { height: '300px' } }>
                                    <td style={ { width: '25%' } }>
                                        <Link style={ { textDecoration: 'none' } } to="/hinh-thuc"><div style={ { backgroundColor: '#3377ff', color: 'white',
                                            width: '90%', height: '250px', paddingTop: '15%', paddingBottom: '20%', textAlign: 'center', borderBottom: '6px solid #003366',
                                            borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px', fontSize: 'larger' } }>
                                            <FontAwesomeIcon style={ { fontSize: '100px' } } icon="wrench"/><br /><br />Hình thức chỉ đạo tuyến</div></Link>
                                    </td>
                                    <td style={ { width: '25%' } }>
                                        <Link style={ { textDecoration: 'none' } } to="/loai-cdt"><div style={ { backgroundColor: '#003399', color: 'white',
                                            width: '90%', height: '250px', paddingTop: '15%', paddingBottom: '20%', textAlign: 'center' , borderBottom: '6px solid #00004d',
                                            borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px', fontSize: 'larger' } }>
                                            <FontAwesomeIcon style={ { fontSize: '100px' } } icon="clock"/><br /><br />Loại chỉ đạo tuyến</div></Link>
                                    </td>
                                    <td style={ { width: '25%' } }>
                                        <Link style={ { textDecoration: 'none' } } to="/noi-dung"><div style={ { backgroundColor: '#3377ff', color: 'white',
                                            width: '90%', height: '250px', paddingTop: '15%'
                                            , paddingBottom: '20%', textAlign: 'center', borderBottom: '6px solid #003366',
                                            borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px', fontSize: 'larger'} }>
                                            <FontAwesomeIcon style={ { fontSize: '100px' } } icon="sign-out-alt"/><br /><br />Nội dung chỉ đạo tuyến</div></Link>
                                    </td>
                                    <td style={ { width: '25%' } }>
                                        <Link style={ { textDecoration: 'none' } } to="/doi-tuong"><div style={ { backgroundColor: '#003399', color: 'white',
                                            width: '90%', height: '250px', paddingTop: '15%'
                                            , paddingBottom: '20%', textAlign: 'center', borderBottom: '6px solid #00004d',
                                            borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px', fontSize: 'larger' } }>
                                            <FontAwesomeIcon style={ { fontSize: '100px' } } icon="sign-in-alt"/><br /><br />Đối tượng tiếp nhận chỉ đạo tuyến</div></Link>
                                    </td>
                                </tr>
                                <tr style={ { height: '300px' } }>
                                    <td style={ { width: '25%' } }>
                                        <Link style={ { textDecoration: 'none' } } to="/danh-gia"><div style={ { backgroundColor: '#003399', color: 'white',
                                            width: '90%', height: '250px', paddingTop: '15%'
                                            , paddingBottom: '20%', textAlign: 'center', borderBottom: '6px solid #00004d',
                                            borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px', fontSize: 'larger' } }>
                                            <FontAwesomeIcon style={ { fontSize: '100px' } } icon="road"/><br /><br />Đánh giá chỉ đạo tuyến</div></Link>
                                    </td>
                                    <td style={ { width: '25%' } }>
                                        <Link style={ { textDecoration: 'none' } } to="/van-ban"><div style={ { backgroundColor: '#3377ff', color: 'white',
                                            width: '90%', height: '250px', paddingTop: '15%'
                                            , paddingBottom: '20%', textAlign: 'center', borderBottom: '6px solid #003366',
                                            borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px', fontSize: 'larger' } }>
                                            <FontAwesomeIcon style={ { fontSize: '100px' } } icon="user"/><br /><br />Văn bản chỉ đạo tuyến</div></Link>
                                    </td>
                                    <td style={ { width: '25%' } }>
                                        <Link style={ { textDecoration: 'none' } } to="/ke-hoach"><div style={ { backgroundColor: '#003399', color: 'white',
                                            width: '90%', height: '250px', paddingTop: '15%'
                                            , paddingBottom: '20%', textAlign: 'center', borderBottom: '6px solid #00004d',
                                            borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px', fontSize: 'larger' } }>
                                            <FontAwesomeIcon style={ { fontSize: '100px' } } icon="heart"/><br /><br />Kế hoạch chỉ đạo tuyến</div></Link>
                                    </td>
                                    <td style={ { width: '25%' } }>
                                        <Link style={ { textDecoration: 'none' } } to="/cdt"><div style={ { backgroundColor: '#3377ff', color: 'white', width: '90%', height: '250px', paddingTop: '15%'
                                            , paddingBottom: '20%', textAlign: 'center', borderBottom: '6px solid #003366',
                                            borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px', fontSize: 'larger' } }>
                                            <FontAwesomeIcon style={ { fontSize: '100px' } } icon="list"/><br /><br />Chỉ đạo tuyến</div></Link>
                                    </td>
                                </tr>
                                <tr style={ { height: '300px' } }>
                                    <td style={ { width: '25%' } }>
                                        <Link style={ { textDecoration: 'none' } } to="/thong-ke"><div style={ { backgroundColor: '#3377ff', color: 'white',
                                            width: '90%', height: '250px', paddingTop: '15%'
                                            , paddingBottom: '20%', textAlign: 'center', borderBottom: '6px solid #003366',
                                            borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px', fontSize: 'larger' } }>
                                            <FontAwesomeIcon style={ { fontSize: '100px' } } icon="user"/><br /><br />Thống kê, báo cáo</div></Link>
                                    </td>
                                </tr>
                                </tbody>
                            ) : (
                                <tbody>
                                <tr style={ { height: '300px' } }>
                                    <td style={ { width: '25%' } }>
                                        <Link style={ { textDecoration: 'none' } } to="/cdt"><div style={ { backgroundColor: '#003399', color: 'white', width: '90%', height: '250px', paddingTop: '15%'
                                            , paddingBottom: '20%', textAlign: 'center', borderBottom: '6px solid #003366',
                                            borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px', fontSize: 'larger' } }>
                                            <FontAwesomeIcon style={ { fontSize: '100px' } } icon="list"/><br /><br />Chỉ đạo tuyến</div></Link>
                                    </td>
                                    <td style={ { width: '25%' } }>
                                        <Link style={ { textDecoration: 'none' } } to="/thong-ke"><div style={ { backgroundColor: '#3377ff', color: 'white',
                                            width: '90%', height: '250px', paddingTop: '15%'
                                            , paddingBottom: '20%', textAlign: 'center', borderBottom: '6px solid #003366',
                                            borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px', fontSize: 'larger' } }>
                                            <FontAwesomeIcon style={ { fontSize: '100px' } } icon="user"/><br /><br />Thống kê, báo cáo</div></Link>
                                    </td>
                                    <td/>
                                </tr>
                                </tbody>
                            )
                        ) : (
                            localStorage.getItem('phan_quyen') === '3' ? (
                                <tbody>
                                    <tr style={ { height: '300px' } }>
                                        <td style={ { width: '25%' } }>
                                            <Link style={ { textDecoration: 'none' } } to="/quan-ly-nckh/chuc-vu"><div style={ { backgroundColor: '#003399', color: 'white',
                                                width: '90%', height: '250px', paddingTop: '15%'
                                                , paddingBottom: '20%', textAlign: 'center', borderBottom: '6px solid #00004d',
                                                borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px', fontSize: 'larger' } }>
                                                <FontAwesomeIcon style={ { fontSize: '100px' } } icon="road"/><br /><br />Chức vụ trong hội đồng NCKH</div></Link>
                                        </td>
                                        <td style={ { width: '25%' } }>
                                            <Link style={ { textDecoration: 'none' } } to="/quan-ly-nckh/chu-the-de-tai"><div style={ { backgroundColor: '#3377ff', color: 'white',
                                                width: '90%', height: '250px', paddingTop: '15%'
                                                , paddingBottom: '20%', textAlign: 'center', borderBottom: '6px solid #003366',
                                                borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px', fontSize: 'larger' } }>
                                                <FontAwesomeIcon style={ { fontSize: '100px' } } icon="user"/><br /><br />Chủ thể đề tài</div></Link>
                                        </td>
                                        <td style={ { width: '25%' } }>
                                            <Link style={ { textDecoration: 'none' } } to="/quan-ly-nckh/hang-de-tai"><div style={ { backgroundColor: '#003399', color: 'white',
                                                width: '90%', height: '250px', paddingTop: '15%'
                                                , paddingBottom: '20%', textAlign: 'center', borderBottom: '6px solid #00004d',
                                                borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px', fontSize: 'larger' } }>
                                                <FontAwesomeIcon style={ { fontSize: '100px' } } icon="heart"/><br /><br />Hạng đề tài</div></Link>
                                        </td>
                                        <td style={ { width: '25%' } }>
                                            <Link style={ { textDecoration: 'none' } } to="/quan-ly-nckh/loai-de-tai"><div style={ { backgroundColor: '#3377ff', color: 'white',
                                                width: '90%', height: '250px', paddingTop: '15%', paddingBottom: '20%', textAlign: 'center', borderBottom: '6px solid #003366',
                                                borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px', fontSize: 'larger' } }>
                                                <FontAwesomeIcon style={ { fontSize: '100px' } } icon="list"/><br /><br />Loại đề tài</div></Link>
                                        </td>
                                    </tr>
                                    <tr style={ { height: '300px' } }>
                                        <td style={ { width: '25%' } }>
                                            <Link style={ { textDecoration: 'none' } } to="/quan-ly-nckh/nhom-de-tai"><div style={ { backgroundColor: '#3377ff', color: 'white',
                                                width: '90%', height: '250px', paddingTop: '15%'
                                                , paddingBottom: '20%', textAlign: 'center', borderBottom: '6px solid #003366',
                                                borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px', fontSize: 'larger' } }>
                                                <FontAwesomeIcon style={ { fontSize: '100px' } } icon="heart"/><br /><br />Nhóm đề tài</div></Link>
                                        </td>
                                        <td style={ { width: '25%' } }>
                                            <Link style={ { textDecoration: 'none' } } to="/quan-ly-nckh/ke-hoach-de-tai"><div style={ { backgroundColor: '#003399', color: 'white',
                                                width: '90%', height: '250px', paddingTop: '15%'
                                                , paddingBottom: '20%', textAlign: 'center', borderBottom: '6px solid #00004d',
                                                borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px', fontSize: 'larger' } }>
                                                <FontAwesomeIcon style={ { fontSize: '100px' } } icon="heart"/><br /><br />Kế hoạch đề tài</div></Link>
                                        </td>
                                    </tr>
                                </tbody>
                            ) : (
                                localStorage.getItem('phan_quyen') === '4' ? (
                                    <tbody>
                                    <tr style={ { height: '300px' } }>
                                        <td style={ { width: '25%' } }>
                                            <Link style={ { textDecoration: 'none' } } to="/quan-ly-nckh/de-tai-dang-ky"><div style={ { backgroundColor: '#3377ff', color: 'white',
                                                width: '90%', height: '250px', paddingTop: '15%'
                                                , paddingBottom: '20%', textAlign: 'center', borderBottom: '6px solid #003366',
                                                borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px', fontSize: 'larger' } }>
                                                <FontAwesomeIcon style={ { fontSize: '100px' } } icon="heart"/><br /><br />Đề tài NCKH</div></Link>
                                        </td>
                                        <td style={ { width: '25%' } }>
                                            <Link style={ { textDecoration: 'none' } } to="/quan-ly-nckh/xet-duyet-de-tai"><div style={ { backgroundColor: '#003399', color: 'white',
                                                width: '90%', height: '250px', paddingTop: '15%'
                                                , paddingBottom: '20%', textAlign: 'center', borderBottom: '6px solid #00004d',
                                                borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px', fontSize: 'larger' } }>
                                                <FontAwesomeIcon style={ { fontSize: '100px' } } icon="wrench"/><br /><br />Xét duyệt đề tài</div></Link>
                                        </td>
                                        <td style={ { width: '25%' } }>
                                            <Link style={ { textDecoration: 'none' } } to="/quan-ly-nckh/thong-ke"><div style={ { backgroundColor: '#3377ff', color: 'white',
                                                width: '90%', height: '250px', paddingTop: '15%'
                                                , paddingBottom: '20%', textAlign: 'center', borderBottom: '6px solid #003366',
                                                borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px', fontSize: 'larger' } }>
                                                <FontAwesomeIcon style={ { fontSize: '100px' } } icon="heart"/><br /><br />Thống kê, báo cáo</div></Link>
                                        </td>
                                    </tr>
                                    </tbody>

                                ) : (
                                    localStorage.getItem('phan_quyen') === '5' ? (
                                        <tbody>
                                        <tr style={ { height: '300px' } }>
                                            <td style={ { width: '25%' } }>
                                                <Link style={ { textDecoration: 'none' } } to="/quan-ly-nckh/xet-duyet-de-cuong"><div style={ { backgroundColor: '#003399', color: 'white',
                                                    width: '90%', height: '250px', paddingTop: '15%'
                                                    , paddingBottom: '20%', textAlign: 'center', borderBottom: '6px solid #00004d',
                                                    borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px', fontSize: 'larger' } }>
                                                    <FontAwesomeIcon style={ { fontSize: '100px' } } icon="heart"/><br /><br />Xét duyệt đề cương</div></Link>
                                            </td>
                                            <td style={ { width: '25%' } }>
                                                <Link style={ { textDecoration: 'none' } } to="/quan-ly-nckh/xet-duyet-bao-cao-tong-ket"><div style={ { backgroundColor: '#3377ff', color: 'white',
                                                    width: '90%', height: '250px', paddingTop: '15%'
                                                    , paddingBottom: '20%', textAlign: 'center', borderBottom: '6px solid #003366',
                                                    borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px', fontSize: 'larger' } }>
                                                    <FontAwesomeIcon style={ { fontSize: '100px' } } icon="heart"/><br /><br />Xét duyệt báo cáo tổng kết</div></Link>
                                            </td>
                                            <td style={ { width: '25%' } }>
                                                <Link style={ { textDecoration: 'none' } } to="/quan-ly-nckh/de-tai-nam"><div style={ { backgroundColor: '#003399', color: 'white',
                                                    width: '90%', height: '250px', paddingTop: '15%'
                                                    , paddingBottom: '20%', textAlign: 'center', borderBottom: '6px solid #00004d',
                                                    borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px', fontSize: 'larger' } }>
                                                    <FontAwesomeIcon style={ { fontSize: '100px' } } icon="heart"/><br /><br />Đề tài năm</div></Link>
                                            </td>
                                            <td style={ { width: '25%' } }>
                                                <Link style={ { textDecoration: 'none' } } to="/quan-ly-nckh/xet-duyet-de-tai-don-vi"><div style={ { backgroundColor: '#3377ff', color: 'white',
                                                    width: '90%', height: '250px', paddingTop: '15%'
                                                    , paddingBottom: '20%', textAlign: 'center', borderBottom: '6px solid #003366',
                                                    borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px', fontSize: 'larger' } }>
                                                    <FontAwesomeIcon style={ { fontSize: '100px' } } icon="heart"/><br /><br />Xét duyệt đề tài đơn vị</div></Link>
                                            </td>
                                        </tr>
                                        <tr style={ { height: '300px' } }>
                                            <td style={ { width: '25%' } }>
                                                <Link style={ { textDecoration: 'none' } } to="/quan-ly-nckh/xet-duyet-de-tai-ung-dung-cho-don-vi"><div style={ { backgroundColor: '#3377ff', color: 'white',
                                                    width: '90%', height: '250px', paddingTop: '15%'
                                                    , paddingBottom: '20%', textAlign: 'center', borderBottom: '6px solid #003366',
                                                    borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px', fontSize: 'larger' } }>
                                                    <FontAwesomeIcon style={ { fontSize: '100px' } } icon="heart"/><br /><br />Xét duyệt đề tài ứng dụng cho đơn vị</div></Link>
                                            </td>
                                            <td style={ { width: '25%' } }>
                                                <Link style={ { textDecoration: 'none' } } to="/quan-ly-nckh/thong-ke"><div style={ { backgroundColor: '#3377ff', color: 'white',
                                                    width: '90%', height: '250px', paddingTop: '15%'
                                                    , paddingBottom: '20%', textAlign: 'center', borderBottom: '6px solid #003366',
                                                    borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px', fontSize: 'larger' } }>
                                                    <FontAwesomeIcon style={ { fontSize: '100px' } } icon="heart"/><br /><br />Thống kê, báo cáo</div></Link>
                                            </td>
                                        </tr>
                                        </tbody>
                                    ) : (
                                        localStorage.getItem('phan_quyen') === '6' ? (
                                            <tbody>
                                                <tr style={ { height: '300px' } }>
                                                    <td style={ { width: '25%' } }>
                                                        <Link style={ { textDecoration: 'none' } } to="/quan-ly-nckh/bien-ban-ke-hoach-de-tai-ung-dung-cho-don-vi">
                                                            <div style={ { backgroundColor: '#003399', color: 'white', width: '90%', height: '250px', paddingTop: '15%'
                                                                , paddingBottom: '20%', textAlign: 'center', borderBottom: '6px solid #00004d',
                                                                borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px', fontSize: 'larger' } }>
                                                                <FontAwesomeIcon style={ { fontSize: '100px' } } icon="heart"/><br /><br />Biên bản kế hoạch đề tài ứng dụng cho đơn vị</div></Link>
                                                    </td>
                                                    <td style={ { width: '25%' } }>
                                                        <Link style={ { textDecoration: 'none' } } to="/quan-ly-nckh/bao-cao-quy-nam-de-tai"><div style={ { backgroundColor: '#3377ff', color: 'white',
                                                            width: '90%', height: '250px', paddingTop: '15%'
                                                            , paddingBottom: '20%', textAlign: 'center', borderBottom: '6px solid #003366',
                                                            borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px', fontSize: 'larger' } }>
                                                            <FontAwesomeIcon style={ { fontSize: '100px' } } icon="heart"/><br /><br />Báo cáo quý năm đề tài</div></Link>
                                                    </td>
                                                    <td style={ { width: '25%' } }>
                                                        <Link style={ { textDecoration: 'none' } } to="/quan-ly-nckh/van-ban-ap-dung-lau-dai">
                                                            <div style={ { backgroundColor: '#003399', color: 'white', width: '90%', height: '250px', paddingTop: '15%'
                                                                , paddingBottom: '20%', textAlign: 'center', borderBottom: '6px solid #00004d',
                                                                borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px', fontSize: 'larger' } }>
                                                                <FontAwesomeIcon style={ { fontSize: '100px' } } icon="heart"/><br /><br />Văn bản áp dụng lâu dài</div></Link>
                                                    </td>
                                                    <td style={ { width: '25%' } }>
                                                        <Link style={ { textDecoration: 'none' } } to="/quan-ly-nckh/van-ban-chap-thuan-ap-dung-lau-dai">
                                                            <div style={ { backgroundColor: '#003399', color: 'white', width: '90%', height: '250px', paddingTop: '15%'
                                                                , paddingBottom: '20%', textAlign: 'center', borderBottom: '6px solid #00004d',
                                                                borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px', fontSize: 'larger' } }>
                                                                <FontAwesomeIcon style={ { fontSize: '100px' } } icon="heart"/><br /><br />Văn bản chấp thuận áp dụng lâu dài</div></Link>
                                                    </td>
                                                </tr>
                                            <tr style={ { height: '300px' } }>
                                                <td style={ { width: '25%' } }>
                                                    <Link style={ { textDecoration: 'none' } } to="/quan-ly-nckh/thong-ke"><div style={ { backgroundColor: '#3377ff', color: 'white',
                                                        width: '90%', height: '250px', paddingTop: '15%'
                                                        , paddingBottom: '20%', textAlign: 'center', borderBottom: '6px solid #003366',
                                                        borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px', fontSize: 'larger' } }>
                                                        <FontAwesomeIcon style={ { fontSize: '100px' } } icon="heart"/><br /><br />Thống kê, báo cáo</div></Link>
                                                </td>
                                            </tr>
                                            </tbody>
                                        ) : (
                                            <div/>
                                        )
                                    )
                                )
                            )
                        )
                    ) : (
                        <div/>
                    // <div style={ { textAlign: 'center', fontSize: 'xx-large', color: 'Red' } }>
                    //     VNPT
                    // </div>
                    )
            }
        </table>);
    }
}

export default MainIndex;
