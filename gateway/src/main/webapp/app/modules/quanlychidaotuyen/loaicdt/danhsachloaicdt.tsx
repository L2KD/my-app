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
import { layDanhSachLoaiCDT, layDanhSachLoaiCDTTheoTen, capNhatLoaiCDT } from './loaicdt.reducer';
import { IRootState } from 'app/shared/reducers';
import { ILoaiCDT } from 'app/modules/quanlychidaotuyen/loaicdt/loaicdt.model';

export interface IHienThiDanhSachLoaiCDTProps extends StateProps, DispatchProps, RouteComponentProps<{}> {}

export interface ILoaiCDTState extends IPaginationBaseState {
    currentPage: any;
    maxPage: any;
    arrLoaiCDT: ILoaiCDT[];
    findName: any;
    up: any;
}

export class DanhSachLoaiCDT extends React.Component<IHienThiDanhSachLoaiCDTProps, ILoaiCDTState> {
    state: ILoaiCDTState = {
        ...getSortState(this.props.location, ITEMS_PER_PAGE),
        currentPage: 1, maxPage: 1,
        arrLoaiCDT: [],
        findName: '',
        up: 0
    };

    componentDidMount() {
        this.props.layDanhSachLoaiCDT();
    }

    componentWillReceiveProps(nextProps: Readonly<IHienThiDanhSachLoaiCDTProps>, nextContext: any): void {
        const value = [];
        nextProps.ds_loaicdt.map((ele, i) => {
            value.push(ele);
        });
        this.setState({ arrLoaiCDT: value,
            maxPage: nextProps.ds_loaicdt.length % 10 > 0 ? parseInt((nextProps.ds_loaicdt.length / 10 + 1).toString(), 10) :
                nextProps.ds_loaicdt.length === 0 ? 1 : parseInt((nextProps.ds_loaicdt.length / 10).toString(), 10)
        });
        if (this.state.maxPage < 1) {
            this.setState({ maxPage: 1 });
        }
        const trang = this.state.currentPage;
        const size = nextProps.ds_loaicdt.length;
        if (size < 10) {
            this.setState({ arrLoaiCDT: value });
        } else if ((trang - 1) * 10 > size) {
            this.setState({ arrLoaiCDT: nextProps.ds_loaicdt.slice(size - size % 10, size) });
        } else if (trang * 10 > size) {
            this.setState({ arrLoaiCDT: nextProps.ds_loaicdt.slice((trang - 1) * 10, size) });
        } else {
            this.setState({ arrLoaiCDT: nextProps.ds_loaicdt.slice((trang - 1) * 10, trang * 10) });
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
        const size = this.props.ds_loaicdt.length;
        if (size < 10) {
            this.setState({ arrLoaiCDT: this.state.arrLoaiCDT });
        } else if ((trang - 1) * 10 > size) {
            this.setState({ arrLoaiCDT: this.props.ds_loaicdt.slice(size - size % 10, size + 1) });
        } else if (trang * 10 > size) {
            this.setState({ arrLoaiCDT: this.props.ds_loaicdt.slice((trang - 1) * 10, size) });
        } else {
            this.setState({ arrLoaiCDT: this.props.ds_loaicdt.slice((trang - 1) * 10, trang * 10) });
        }
    }

    sortDanhSach = (key, type) => () => {
        let temp = this.state.arrLoaiCDT;
        if (key === 1) {
            // key:  1: ten_loai_cdt     2: vi_tri     3: trang_thai
            // type: 1: tăng              2: giảm
            // sắp xếp theo tên
            temp = type === 1 ? this.state.arrLoaiCDT.sort((a, b) => (a.ten_loai_cdt > b.ten_loai_cdt) ? 1 :
                ((b.ten_loai_cdt > a.ten_loai_cdt) ? -1 : 0)) : this.state.arrLoaiCDT.sort((a, b) => (a.ten_loai_cdt < b.ten_loai_cdt) ? 1 :
                ((b.ten_loai_cdt < a.ten_loai_cdt) ? -1 : 0));
        }
        this.setState({ arrLoaiCDT: temp, up: type === 0 ? 1 : 0 });
    };

    onChangeFindName = e => {
        this.setState({ findName: e.target.value });
    }

    onClickFindName = e => {
        this.props.layDanhSachLoaiCDTTheoTen(this.state.findName);
    }

    onKeyPressFindName = e => {
        if (e.charCode === 13) {
            this.props.layDanhSachLoaiCDTTheoTen(this.state.findName);
        }
    }

    toggleActive = loaiCDT => () => {
        this.props.capNhatLoaiCDT({
            ...loaiCDT,
            trang_thai: loaiCDT.trang_thai === 0 ? 1 : 0
        });
    };

    render() {
        const { ds_loaicdt, match, totalItems } = this.props;
        return (
            <div>
                <h2 id="user-management-page-heading">
                    Danh sách loại chỉ đạo tuyến
                    <Link to={`${match.url}/them-moi`} className="btn btn-primary float-right jh-create-entity">
                        <FontAwesomeIcon icon="plus" /> Thêm mới loại chỉ đạo tuyến
                    </Link>
                </h2>
                <Row>
                    <input placeholder="Nhập tên loại chỉ đạo tuyến cần tìm"
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
                            Mã loại chỉ đạo tuyến
                        </th>
                        <th className="hand" onClick={this.sortDanhSach(1, this.state.up)}>
                            Tên loại chỉ đạo tuyến
                            &nbsp;
                            <FontAwesomeIcon icon="sort" style={ { color: '#0066ff' } }/>
                        </th>
                        <th />
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.arrLoaiCDT.map((loaicdt, i) => (
                        <tr id={ loaicdt.ma_loai_cdt.toString() } key={`loai_cdt-${i}`}>
                            <td>{loaicdt.ma_loai_cdt}</td>
                            <td>{loaicdt.ten_loai_cdt}</td>
                            <td className="text-right">
                                <div className="btn-group flex-btn-group-container">
                                    <Button tag={Link} to={`${match.url}/${loaicdt.ma_loai_cdt}`} color="info" size="sm">
                                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">Xem</span>
                                    </Button>
                                    <Button tag={Link} to={`${match.url}/${loaicdt.ma_loai_cdt}/them-moi`} color="primary" size="sm">
                                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Sửa</span>
                                    </Button>
                                    <Button
                                        tag={Link}
                                        to={`${match.url}/${loaicdt.ma_loai_cdt}/xoa`}
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
    ds_loaicdt: storeState.loaicdt.ds_loai_cdt,
    totalItems: storeState.loaicdt.totalItems
});

const mapDispatchToProps = { layDanhSachLoaiCDT, layDanhSachLoaiCDTTheoTen, capNhatLoaiCDT };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DanhSachLoaiCDT);
