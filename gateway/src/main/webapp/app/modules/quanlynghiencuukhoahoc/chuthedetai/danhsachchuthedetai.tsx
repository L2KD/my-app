import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table, Row, Badge } from 'reactstrap';
import {
    ICrudGetAllAction,
    ICrudPutAction,
    TextFormat,
    JhiPagination,
    getPaginationItemsNumber,
    getSortState,
    IPaginationBaseState
} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { getDanhSachChuThe, getDanhSachChuTheTheoTen, updateChuThe } from './chuthedetai.reducer';
import { IRootState } from 'app/shared/reducers';
import { IChuThe } from 'app/modules/quanlynghiencuukhoahoc/chuthedetai/chuthedetai.model';

export interface IHienThiDanhSachChuTheProps extends StateProps, DispatchProps, RouteComponentProps<{}> {}

export interface IChuTheState extends IPaginationBaseState {
    currentPage: any;
    maxPage: any;
    arrChuThe: IChuThe[];
    findName: any;
    up: any;
}

export class DanhSachChuTheDeTai extends React.Component<IHienThiDanhSachChuTheProps, IChuTheState> {
    state: IChuTheState = {
        ...getSortState(this.props.location, ITEMS_PER_PAGE),
        currentPage: 1,
        maxPage: 1,
        arrChuThe: [],
        findName: '',
        up: 0
    };

    componentDidMount() {
        this.props.getDanhSachChuThe();
    }

    componentWillReceiveProps(nextProps: Readonly<IHienThiDanhSachChuTheProps>, nextContext: any): void {
        const value = [];
        nextProps.ds_chu_the.map((ele, i) => {
            value.push(ele);
        });
        this.setState({ arrChuThe: value,
            maxPage: nextProps.ds_chu_the.length % 10 > 0 ? parseInt((nextProps.ds_chu_the.length / 10 + 1).toString(), 10) :
                nextProps.ds_chu_the.length === 0 ? 1 : parseInt((nextProps.ds_chu_the.length / 10).toString(), 10)
        });
        if (this.state.maxPage < 1) {
            this.setState({ maxPage: 1 });
        }
        const trang = this.state.currentPage;
        const size = nextProps.ds_chu_the.length;
        if (size < 10) {
            this.setState({ arrChuThe: value });
        } else if ((trang - 1) * 10 > size) {
            this.setState({ arrChuThe: nextProps.ds_chu_the.slice(size - size % 10, size + 1) });
        } else if (trang * 10 > size) {
            this.setState({ arrChuThe: nextProps.ds_chu_the.slice((trang - 1) * 10, size + 1) });
        } else {
            this.setState({ arrChuThe: nextProps.ds_chu_the.slice((trang - 1) * 10, trang * 10) });
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
        const size = this.props.ds_chu_the.length;
        if (size < 10) {
            this.setState({ arrChuThe: this.state.arrChuThe });
        } else if ((trang - 1) * 10 > size) {
            this.setState({ arrChuThe: this.props.ds_chu_the.slice(size - size % 10, size + 1) });
        } else if (trang * 10 > size) {
            this.setState({ arrChuThe: this.props.ds_chu_the.slice((trang - 1) * 10, size + 1) });
        } else {
            this.setState({ arrChuThe: this.props.ds_chu_the.slice((trang - 1) * 10, trang * 10) });
        }
    }

    sortDanhSach = (key, type) => () => {
        let temp = this.state.arrChuThe;
        if (key === 1) {
            // key:  1: noi dung     2: vi_tri     3: trang_thai
            // type: 1: tăng              2: giảm
            // sắp xếp theo tên
            if (type === 1) {
                temp = this.state.arrChuThe.sort((a, b) => (a.chuTheDeTai > b.chuTheDeTai) ? 1 : ((b.chuTheDeTai > a.chuTheDeTai) ? -1 : 0));
            } else {
                temp = this.state.arrChuThe.sort((a, b) => (a.chuTheDeTai < b.chuTheDeTai) ? 1 : ((b.chuTheDeTai < a.chuTheDeTai) ? -1 : 0));
            }
        } else if (key === 2) {
            if (type === 1) {
                temp = this.state.arrChuThe.sort((a, b) => (a.viTri > b.viTri) ? 1 : ((b.viTri > a.viTri) ? -1 : 0));
            } else {
                temp = this.state.arrChuThe.sort((a, b) => (a.viTri < b.viTri) ? 1 : ((b.viTri < a.viTri) ? -1 : 0));
            }
        } else if (key === 3) {
            if (type === 1) {
                temp = this.state.arrChuThe.sort((a, b) => (a.trangThai > b.trangThai) ? 1 : ((b.trangThai > a.trangThai) ? -1 : 0));
            } else {
                temp = this.state.arrChuThe.sort((a, b) => (a.trangThai < b.trangThai) ? 1 : ((b.trangThai < a.trangThai) ? -1 : 0));
            }
        }
        this.setState({ arrChuThe: temp, up: type === 0 ? 1 : 0 });
    };

    onChangeFindName = e => {
        this.setState({ findName: e.target.value });
    }

    onClickFindName = e => {
        this.props.getDanhSachChuTheTheoTen(this.state.findName);
    }

    onKeyPressFindName = e => {
        if (e.charCode === 13) {
            this.props.getDanhSachChuTheTheoTen(this.state.findName);
        }
    }

    toggleActive = chuThe => () => {
        this.props.updateChuThe({
            ...chuThe,
            trangThai: chuThe.trangThai === 0 ? 1 : 0
        });
    };

    render() {
        const { ds_chu_the, match, totalItems } = this.props;
        return (
            <div>
                <h2 id="user-management-page-heading">
                    Danh sách chủ thể đề tài
                    <Link to={`${match.url}/them-moi`} className="btn btn-primary float-right jh-create-entity">
                        <FontAwesomeIcon icon="plus" /> Thêm mới chủ thể đề tài
                    </Link>
                </h2>
                <Row>
                    <input placeholder="Nhập tên chủ thể đề tài cần tìm..."
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
                            Mã chủ thể đề tài
                        </th>
                        <th className="hand" onClick={this.sortDanhSach(1, this.state.up)}>
                            Tên chủ thể đề tài
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
                        this.state.arrChuThe.map((chuThe, i) => (
                            <tr id={ chuThe.maChuThe.toString() } key={`user-${i}`}>
                                <td>{chuThe.maChuThe}</td>
                                <td>{chuThe.chuTheDeTai}</td>
                                <td>{chuThe.viTri}</td>
                                <td>
                                    {chuThe.trangThai === 1 ? (
                                        <Button color="success" onClick={this.toggleActive(chuThe)}>
                                            Hoạt động
                                        </Button>
                                    ) : (
                                        <Button color="danger" onClick={this.toggleActive(chuThe)}>
                                            Không hoạt động
                                        </Button>
                                    )}
                                </td>
                                <td className="text-right">
                                    <div className="btn-group flex-btn-group-container">
                                        <Button tag={Link} to={`${match.url}/${chuThe.maChuThe}`} color="info" size="sm">
                                            <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">Xem</span>
                                        </Button>
                                        <Button tag={Link} to={`${match.url}/${chuThe.maChuThe}/them-moi`} color="primary" size="sm">
                                            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Sửa</span>
                                        </Button>
                                        <Button
                                            tag={Link}
                                            to={`${match.url}/${chuThe.maChuThe}/xoa`}
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
    ds_chu_the: storeState.chuthe.ds_chu_the,
    totalItems: storeState.chuthe.totalItems
});

const mapDispatchToProps = { getDanhSachChuThe, getDanhSachChuTheTheoTen, updateChuThe };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DanhSachChuTheDeTai);
