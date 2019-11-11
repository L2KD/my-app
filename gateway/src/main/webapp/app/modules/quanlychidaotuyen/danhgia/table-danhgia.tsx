import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Table, Row, Badge } from 'reactstrap';

import { IDanhGia } from './danhgia.model';

export interface ITableDanhGiaProps { danhgia: IDanhGia; }

export class TableDanhGia extends Component<ITableDanhGiaProps, {}> {
    render() {
        return (
            <tr>
                <td>{this.props.danhgia.ma_danh_gia}</td>
                <td>{this.props.danhgia.danh_gia_cdt}</td>
                <td>{this.props.danhgia.vi_tri}</td>
                <td>
                    {this.props.danhgia.trang_thai === 1 ? (
                            'Hoạt động'
                    ) : (
                            'Không hoạt động'
                    )}
                </td>
                {/*<td className="text-right">*/}
                    {/*<div className="btn-group flex-btn-group-container">*/}
                        {/*<Button tag={Link} to={`${match.url}/${danhgia.ma_danh_gia}`} color="info" size="sm">*/}
                            {/*<FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">Xem</span>*/}
                        {/*</Button>*/}
                        {/*<Button tag={Link} to={`${match.url}/${danhgia.ma_danh_gia}/them-moi`} color="primary" size="sm">*/}
                            {/*<FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Sửa</span>*/}
                        {/*</Button>*/}
                        {/*<Button*/}
                            {/*tag={Link}*/}
                            {/*to={`${match.url}/${danhgia.ma_danh_gia}/xoa`}*/}
                            {/*color="danger"*/}
                            {/*size="sm"*/}
                            {/*// disabled={account.login === user.login}*/}
                        {/*>*/}
                            {/*<FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Xóa</span>*/}
                        {/*</Button>*/}
                    {/*</div>*/}
                {/*</td>*/}
            </tr>
        );
    }
}
