import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table, Row, Badge } from 'reactstrap';
import {
    getSortState,
    IPaginationBaseState
} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { getDanhSachChucVu, getDanhSachChucVuTheoTen, updateChucVu } from './chucvu.reducer';
import { IRootState } from 'app/shared/reducers';
import { IChucVu } from 'app/modules/quanlynghiencuukhoahoc/chucvu/chucvu.model';

export interface IHienThiDanhSachChucVuProps extends StateProps, DispatchProps, RouteComponentProps<{}> {}

export interface IChucVuState extends IPaginationBaseState {
    arrChucVu: IChucVu[];
    currentPage: any;
    maxPage: any;
    findName: any;
    up: any;
}

export class DanhSachChucVu extends React.Component<IHienThiDanhSachChucVuProps, IChucVuState> {
    state: IChucVuState = {
        ...getSortState(this.props.location, ITEMS_PER_PAGE),
        arrChucVu: [],
        currentPage: 1,
        maxPage: 1,
        findName: '',
        up: 0
    };

    componentDidMount() {
        this.props.getDanhSachChucVu();
    }

    componentWillReceiveProps(nextProps: Readonly<IHienThiDanhSachChucVuProps>, nextContext: any): void {
        const value = [];
        nextProps.ds_chuc_vu.map((ele, i) => {
            value.push(ele);
        });
        this.setState({ arrChucVu: value,
            maxPage: nextProps.ds_chuc_vu.length % 10 > 0 ? parseInt((nextProps.ds_chuc_vu.length / 10 + 1).toString(), 10) :
                nextProps.ds_chuc_vu.length === 0 ? 1 : parseInt((nextProps.ds_chuc_vu.length / 10).toString(), 10)
        });
        if (this.state.maxPage < 1) {
            this.setState({ maxPage: 1 });
        }
        const trang = this.state.currentPage;
        const size = nextProps.ds_chuc_vu.length;
        if (size < 10) {
            this.setState({ arrChucVu: value });
        } else if ((trang - 1) * 10 > size) {
            this.setState({ arrChucVu: nextProps.ds_chuc_vu.slice(size - size % 10, size + 1) });
        } else if (trang * 10 > size) {
            this.setState({ arrChucVu: nextProps.ds_chuc_vu.slice((trang - 1) * 10, size + 1) });
        } else {
            this.setState({ arrChucVu: nextProps.ds_chuc_vu.slice((trang - 1) * 10, trang * 10) });
        }
    }

    onChangeTrang = e => {
        if (e.target.value < 1) {
            this.setState({ currentPage: 1 });
        } else if (e.target.value >= this.state.maxPage) {
            this.setState({ currentPage: this.state.maxPage });
        } else {
            this.setState({ currentPage: e.target.value });
        }
    }
    onClickDenTrang = e => {
        const trang = this.state.currentPage;
        const size = this.props.ds_chuc_vu.length;
        if (size < 10) {
            this.setState({ arrChucVu: this.state.arrChucVu });
        } else if ((trang - 1) * 10 > size) {
            this.setState({ arrChucVu: this.props.ds_chuc_vu.slice(size - size % 10, size + 1) });
        } else if (trang * 10 > size) {
            this.setState({ arrChucVu: this.props.ds_chuc_vu.slice((trang - 1) * 10, size + 1) });
        } else {
            this.setState({ arrChucVu: this.props.ds_chuc_vu.slice((trang - 1) * 10, trang * 10) });
        }
    }

    sortDanhSach = (key, type) => () => {
        let temp = this.state.arrChucVu;
        if (key === 1) {
            // key:  1: ten_chuc_vu     2: vi_tri     3: trang_thai
            // type: 1: tăng              2: giảm
            // sắp xếp theo tên
            if (type === 1) {
                temp = this.state.arrChucVu.sort((a, b) => (a.chucVu > b.chucVu) ? 1 : ((b.chucVu > a.chucVu) ? -1 : 0));
            } else {
                temp = this.state.arrChucVu.sort((a, b) => (a.chucVu < b.chucVu) ? 1 : ((b.chucVu < a.chucVu) ? -1 : 0));
            }
        } else if (key === 2) {
            if (type === 1) {
                temp = this.state.arrChucVu.sort((a, b) => (a.viTri > b.viTri) ? 1 : ((b.viTri > a.viTri) ? -1 : 0));
            } else {
                temp = this.state.arrChucVu.sort((a, b) => (a.viTri < b.viTri) ? 1 : ((b.viTri < a.viTri) ? -1 : 0));
            }
        } else if (key === 3) {
            if (type === 1) {
                temp = this.state.arrChucVu.sort((a, b) => (a.trangThai > b.trangThai) ? 1 : ((b.trangThai > a.trangThai) ? -1 : 0));
            } else {
                temp = this.state.arrChucVu.sort((a, b) => (a.trangThai < b.trangThai) ? 1 : ((b.trangThai < a.trangThai) ? -1 : 0));
            }
        }
        this.setState({ arrChucVu: temp, up: type === 0 ? 1 : 0 });
    };

    onChangeFindName = e => {
        this.setState({ findName: e.target.value });
    }

    onClickFindName = e => {
        this.props.getDanhSachChucVuTheoTen(this.state.findName);
    }

    onKeyPressFindName = e => {
        if (e.charCode === 13) {
            this.props.getDanhSachChucVuTheoTen(this.state.findName);
        }
    }

    toggleActive = chucVu => () => {
        this.props.updateChucVu({
            ...chucVu,
            trangThai: chucVu.trangThai === 0 ? 1 : 0
        });
    };

    render() {
        const { ds_chuc_vu, match, totalItems } = this.props;
        return (
            <div>
                <h2 id="user-management-page-heading">
                    Danh sách chức vụ trong hội đồng
                    <Link to={`${match.url}/them-moi`} className="btn btn-primary float-right jh-create-entity">
                        <FontAwesomeIcon icon="plus" /> Thêm mới chức vụ
                    </Link>
                </h2>
                <Row>
                    <input placeholder="Nhập tên chức vụ cần tìm..."
                           style={ { width: '40%', marginLeft: '55%', borderRadius: '5px', borderColor: '#0066ff', paddingLeft: '5px' } }
                           onKeyPress={this.onKeyPressFindName}
                           onChange={this.onChangeFindName}
                    />
                    &nbsp;
                    <Button color="info" style={ { transform: 'rotate(180deg)', float: 'right' } } onClick={this.onClickFindName}>
                        {/*<span className="d-none d-md-inline">Đến</span>*/}
                        <FontAwesomeIcon icon="arrow-left" />
                    </Button>
                </Row>
                <br/>
                <Table responsive striped>
                    <thead>
                    <tr>
                        <th className="hand">
                            Mã chức vụ
                        </th>
                        <th className="hand" onClick={this.sortDanhSach(1, this.state.up)}>
                            Tên chức vụ
                            &nbsp;
                            <FontAwesomeIcon icon="sort" style={ { color: '#0066ff' } }/>
                        </th>
                        <th className="hand" onClick={this.sortDanhSach(2, this.state.up)}>
                            Vị trí
                            &nbsp;
                            <FontAwesomeIcon icon="sort" style={ { color: '#0066ff' } }/>
                        </th>
                        <th className="hand" onClick={this.sortDanhSach(3, this.state.up)}>
                            Trạng thái
                            &nbsp;
                            <FontAwesomeIcon icon="sort" style={ { color: '#0066ff' } }/>
                        </th>
                        <th />
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.arrChucVu.map((chucVu, i) => (
                            <tr id={ chucVu.maChucVu.toString() } key={`user-${i}`}>
                                <td>{chucVu.maChucVu}</td>
                                <td>{chucVu.chucVu}</td>
                                <td>{chucVu.viTri}</td>
                                <td>
                                    {chucVu.trangThai === 1 ? (
                                        <Button color="success" onClick={this.toggleActive(chucVu)}>
                                            Hoạt động
                                        </Button>
                                    ) : (
                                        <Button color="danger" onClick={this.toggleActive(chucVu)}>
                                            Không hoạt động
                                        </Button>
                                    )}
                                </td>
                                <td className="text-right">
                                    <div className="btn-group flex-btn-group-container">
                                        <Button tag={Link} to={`${match.url}/${chucVu.maChucVu}`} color="info" size="sm">
                                            <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">Xem</span>
                                        </Button>
                                        <Button tag={Link} to={`${match.url}/${chucVu.maChucVu}/them-moi`} color="primary" size="sm">
                                            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Sửa</span>
                                        </Button>
                                        <Button
                                            tag={Link}
                                            to={`${match.url}/${chucVu.maChucVu}/xoa`}
                                            color="danger"
                                            size="sm"
                                        >
                                            <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Xóa</span>
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Row className="justify-content-center">
                    <span style={ { fontSize: 'x-large' } }>Đến trang:</span>
                    &nbsp;
                    <input style={ { width: '50px', fontSize: 'large', borderColor: '#0066ff', borderRadius: '5px', padding: '5px' } }
                           type="number" onChange={this.onChangeTrang} value={this.state.currentPage}/>
                    &nbsp;
                    <span style={ { fontSize: 'x-large' } }>/</span>
                    &nbsp;
                    <span style={ { fontSize: 'x-large' } }>{ this.state.maxPage }</span>
                    &nbsp;
                    <Button color="info" style={ { transform: 'rotate(180deg)' } } onClick={this.onClickDenTrang}>
                        <FontAwesomeIcon icon="arrow-left" />
                    </Button>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (storeState: IRootState) => ({
    ds_chuc_vu: storeState.chucvu.ds_chuc_vu,
    totalItems: storeState.chucvu.totalItems
});

const mapDispatchToProps = { getDanhSachChucVu, getDanhSachChucVuTheoTen, updateChucVu };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DanhSachChucVu);
