import React, { Component } from 'react';
import { Button, Table, Row, Badge } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField, AvFeedback, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

export class DanhSachThongKe extends Component {

    render() {
        return (<table style={ { width: '100%', marginLeft: '1%', marginRight: '' } }>
            {
                localStorage.getItem('phan_quyen') === '1' ? (
                    <tbody>
                    <tr style={ { height: '300px' } }>
                        <td style={ { width: '25%' } }>
                            <Link style={ { textDecoration: 'none' } } to="/thong-ke/thong-ke-van-ban"><div style={ { backgroundColor: '#3377ff', color: 'white',
                                width: '90%', height: '250px', paddingTop: '15%', paddingBottom: '20%', textAlign: 'center', borderBottom: '6px solid #003366',
                                borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px', fontSize: 'larger' } }>
                                <FontAwesomeIcon style={ { fontSize: '100px' } } icon="wrench"/><br /><br />Thống kê văn bản</div></Link>
                        </td>
                        <td style={ { width: '25%' } }>
                            <Link style={ { textDecoration: 'none' } } to="/thong-ke/thong-ke-ke-hoach"><div style={ { backgroundColor: '#003399', color: 'white',
                                width: '90%', height: '250px', paddingTop: '15%', paddingBottom: '20%', textAlign: 'center' , borderBottom: '6px solid #00004d',
                                borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px', fontSize: 'larger' } }>
                                <FontAwesomeIcon style={ { fontSize: '100px' } } icon="clock"/><br /><br />Thống kê kế hoạch chỉ đạo tuyến</div></Link>
                        </td>
                        <td style={ { width: '25%' } }>
                            <Link style={ { textDecoration: 'none' } } to="/thong-ke/thong-ke-cdt"><div style={ { backgroundColor: '#3377ff', color: 'white',
                                width: '90%', height: '250px', paddingTop: '15%'
                                , paddingBottom: '20%', textAlign: 'center', borderBottom: '6px solid #003366',
                                borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px', fontSize: 'larger'} }>
                                <FontAwesomeIcon style={ { fontSize: '100px' } } icon="sign-out-alt"/><br /><br />Thống kê chỉ đạo tuyến</div></Link>
                        </td>
                    </tr>
                    </tbody>
                ) : (
                    <tbody>
                    <tr style={ { height: '300px' } }>
                        <td style={ { width: '25%' } }>
                            <Link style={ { textDecoration: 'none' } } to="/thong-ke/thong-ke-cdt"><div style={ { backgroundColor: '#3377ff', color: 'white',
                                width: '90%', height: '250px', paddingTop: '15%'
                                , paddingBottom: '20%', textAlign: 'center', borderBottom: '6px solid #003366',
                                borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px', fontSize: 'larger'} }>
                                <FontAwesomeIcon style={ { fontSize: '100px' } } icon="sign-out-alt"/><br /><br />Thống kê chỉ đạo tuyến</div></Link>
                        </td>
                        <td style={ { width: '25%' } }/>
                        <td style={ { width: '25%' } }/>
                    </tr>
                    </tbody>
                )
            }
        </table>);
    }
}

export default DanhSachThongKe;
