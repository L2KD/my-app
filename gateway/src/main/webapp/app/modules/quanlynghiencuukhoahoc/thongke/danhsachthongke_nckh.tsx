import React, { Component } from 'react';
import { Button, Table, Row, Badge } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField, AvFeedback, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

export class DanhSachThongKeNCKH extends Component {
    render() {
        return (<table style={ { width: '100%', marginLeft: '1%', marginRight: '' } }>
            {
                localStorage.getItem('phan_quyen') === '4' ? (
                    <>
                        <tbody>
                            <tr style={ { height: '50%' } }>
                                <td style={ { width: '25%' } }>
                                    <Link style={ { textDecoration: 'none' } } to="/quan-ly-nckh/thong-ke/thong-ke-de-tai-dang-ky">
                                        <div style={ { backgroundColor: '#3377ff', color: 'white',
                                            width: '20%', paddingTop: '5px', paddingBottom: '5px', textAlign: 'center', borderBottom: '6px solid #003366',
                                            borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px', fontSize: 'larger' } }>
                                            <FontAwesomeIcon style={ { fontSize: '100px' } } icon="wrench"/>
                                            <br /><br />Thống kê đề tài đăng ký hàng năm
                                        </div>
                                    </Link>
                                </td>
                            </tr>
                        </tbody>
                    </>
                ) : (
                    localStorage.getItem('phan_quyen') === '5' || localStorage.getItem('phan_quyen') === '6' ? (
                        <>
                            <tbody>
                            <tr style={ { height: '300px' } }>
                                <td style={ { width: '25%' } }>
                                    <Link style={ { textDecoration: 'none' } } to="/quan-ly-nckh/thong-ke/thong-ke-de-tai-dang-ky"><div style={ { backgroundColor: '#3377ff', color: 'white',
                                        width: '90%', height: '250px', paddingTop: '15%', paddingBottom: '20%', textAlign: 'center', borderBottom: '6px solid #003366',
                                        borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px', fontSize: 'larger' } }>
                                        <FontAwesomeIcon style={ { fontSize: '100px' } } icon="wrench"/><br /><br />Thống kê đề tài đăng ký hàng năm</div></Link>
                                </td>
                                <td style={ { width: '25%' } }>
                                    <Link style={ { textDecoration: 'none' } } to="/quan-ly-nckh/thong-ke/thong-ke-de-tai-nam"><div style={ { backgroundColor: '#003399', color: 'white',
                                        width: '90%', height: '250px', paddingTop: '15%', paddingBottom: '20%', textAlign: 'center' , borderBottom: '6px solid #00004d',
                                        borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px', fontSize: 'larger' } }>
                                        <FontAwesomeIcon style={ { fontSize: '100px' } } icon="clock"/><br /><br />Thống kê đề tài năm</div></Link>
                                </td>
                                <td style={ { width: '25%' } }>
                                    <Link style={ { textDecoration: 'none' } } to="/quan-ly-nckh/thong-ke/thong-ke-de-tai-ung-dung-cho-don-vi">
                                        <div style={ { backgroundColor: '#3377ff', color: 'white',
                                            width: '90%', height: '250px', paddingTop: '15%'
                                            , paddingBottom: '20%', textAlign: 'center', borderBottom: '6px solid #003366',
                                            borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px', fontSize: 'larger'} }>
                                            <FontAwesomeIcon style={ { fontSize: '100px' } } icon="sign-out-alt"/><br /><br />Thống kê đề tài ứng dụng cho đơn vị</div></Link>
                                </td>
                            </tr>
                            </tbody>
                        </>
                    ) : (
                        <></>
                    )
                )
            }
        </table>);
    }
}

export default DanhSachThongKeNCKH;
