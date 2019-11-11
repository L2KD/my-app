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
import { layDanhSachHinhThuc, layDanhSachHinhThucTheoTen, capNhatHinhThuc } from './HinhThuc.reducer';
import { IRootState } from 'app/shared/reducers';
import { IHinhThuc } from 'app/modules/quanlychidaotuyen/hinhthuc/HinhThuc.model';
import setPrototypeOf = Reflect.setPrototypeOf;

export interface IHienThiDanhSachHinhThucProps extends StateProps, DispatchProps, RouteComponentProps<{}> {}

export interface IHinhThucState extends IPaginationBaseState {
    currentPage: any;
    maxPage: any;
    arrHinhThuc: IHinhThuc[];
    findName: any;
    up: any;
}

export class DanhSachHinhThuc extends React.Component<IHienThiDanhSachHinhThucProps, IHinhThucState> {
    state: IHinhThucState = {
        ...getSortState(this.props.location, ITEMS_PER_PAGE),
        currentPage: 1,
        maxPage: 1,
        arrHinhThuc: [],
        findName: '',
        up: 0
    };

    componentDidMount() {
        this.props.layDanhSachHinhThuc();
        // alert(localStorage.getItem('tai_khoan'));
    }

    componentWillReceiveProps(nextProps: Readonly<IHienThiDanhSachHinhThucProps>, nextContext: any): void {
        const value = [];
        nextProps.ds_hinhthuc.map((ele, i) => {
            value.push(ele);
        });
        this.setState({ arrHinhThuc: value,
            maxPage: nextProps.ds_hinhthuc.length % 10 > 0 ? parseInt((nextProps.ds_hinhthuc.length / 10 + 1).toString(), 10) :
                nextProps.ds_hinhthuc.length === 0 ? 1 : parseInt((nextProps.ds_hinhthuc.length / 10).toString(), 10)
        });
        if (this.state.maxPage < 1) {
            this.setState({ maxPage: 1 });
        }
        const trang = this.state.currentPage;
        const size = nextProps.ds_hinhthuc.length;
        if (size < 10) {
            this.setState({ arrHinhThuc: value });
        } else if ((trang - 1) * 10 > size) {
            this.setState({ arrHinhThuc: nextProps.ds_hinhthuc.slice(size - size % 10, size + 1) });
        } else if (trang * 10 > size) {
            this.setState({ arrHinhThuc: nextProps.ds_hinhthuc.slice((trang - 1) * 10, size + 1) });
        } else {
            this.setState({ arrHinhThuc: nextProps.ds_hinhthuc.slice((trang - 1) * 10, trang * 10) });
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
        const size = this.props.ds_hinhthuc.length;
        if (size < 10) {
            this.setState({ arrHinhThuc: this.state.arrHinhThuc });
        } else if ((trang - 1) * 10 > size) {
            this.setState({ arrHinhThuc: this.props.ds_hinhthuc.slice(size - size % 10, size + 1) });
        } else if (trang * 10 > size) {
            this.setState({ arrHinhThuc: this.props.ds_hinhthuc.slice((trang - 1) * 10, size + 1) });
        } else {
            this.setState({ arrHinhThuc: this.props.ds_hinhthuc.slice((trang - 1) * 10, trang * 10) });
        }
    }

    sortDanhSach = (key, type) => () => {
        let temp = this.state.arrHinhThuc;
        if (key === 1) {
            // key:  1: ten_hinh_thuc     2: vi_tri     3: trang_thai
            // type: 1: tăng              2: giảm
            // sắp xếp theo tên
            if (type === 1) {
                temp = this.state.arrHinhThuc.sort((a, b) => (a.ten_hinh_thuc > b.ten_hinh_thuc) ? 1 : ((b.ten_hinh_thuc > a.ten_hinh_thuc) ? -1 : 0));
            } else {
                temp = this.state.arrHinhThuc.sort((a, b) => (a.ten_hinh_thuc < b.ten_hinh_thuc) ? 1 : ((b.ten_hinh_thuc < a.ten_hinh_thuc) ? -1 : 0));
            }
        } else if (key === 2) {
            if (type === 1) {
                temp = this.state.arrHinhThuc.sort((a, b) => (a.vi_tri > b.vi_tri) ? 1 : ((b.vi_tri > a.vi_tri) ? -1 : 0));
            } else {
                temp = this.state.arrHinhThuc.sort((a, b) => (a.vi_tri < b.vi_tri) ? 1 : ((b.vi_tri < a.vi_tri) ? -1 : 0));
            }
        } else if (key === 3) {
            if (type === 1) {
                temp = this.state.arrHinhThuc.sort((a, b) => (a.trang_thai > b.trang_thai) ? 1 : ((b.trang_thai > a.trang_thai) ? -1 : 0));
            } else {
                temp = this.state.arrHinhThuc.sort((a, b) => (a.trang_thai < b.trang_thai) ? 1 : ((b.trang_thai < a.trang_thai) ? -1 : 0));
            }
        }
        this.setState({ arrHinhThuc: temp, up: type === 0 ? 1 : 0 });
    };

    onChangeFindName = e => {
        this.setState({ findName: e.target.value });
    }

    onClickFindName = e => {
        this.props.layDanhSachHinhThucTheoTen(this.state.findName);
    }

    onKeyPressFindName = e => {
        if (e.charCode === 13) {
            this.props.layDanhSachHinhThucTheoTen(this.state.findName);
        }
    }

    toggleActive = hinhThuc => () => {
        this.props.capNhatHinhThuc({
            ...hinhThuc,
            trang_thai: hinhThuc.trang_thai === 0 ? 1 : 0
        });
    };

    render() {
        const { ds_hinhthuc, match, totalItems } = this.props;
        return (
            <div>
                <h2 id="user-management-page-heading">
                    Danh sách hình thức chỉ đạo tuyến
                    <Link to={`${match.url}/them-moi`} className="btn btn-primary float-right jh-create-entity">
                        <FontAwesomeIcon icon="plus" /> Thêm mới hình thức
                    </Link>
                </h2>
                <Row>
                    <input placeholder="Nhập tên hình thức cần tìm..."
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
                            Mã hình thức
                        </th>
                        <th className="hand" onClick={this.sortDanhSach(1, this.state.up)}>
                            Tên hình thức
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
                        this.state.arrHinhThuc.map((hinhthuc, i) => (
                        <tr key={`user-${i}`}>
                            <td>{hinhthuc.ma_hinh_thuc}</td>
                            <td>{hinhthuc.ten_hinh_thuc}</td>
                            <td>{hinhthuc.vi_tri}</td>
                            <td>
                                {hinhthuc.trang_thai === 1 ? (
                                    <Button color="success" onClick={this.toggleActive(hinhthuc)}>
                                        Hoạt động
                                    </Button>
                                ) : (
                                    <Button color="danger" onClick={this.toggleActive(hinhthuc)}>
                                        Không hoạt động
                                    </Button>
                                )}
                            </td>
                            <td className="text-right">
                                <div className="btn-group flex-btn-group-container">
                                    <Button tag={Link} to={`${match.url}/${hinhthuc.ma_hinh_thuc}`} color="info" size="sm">
                                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">Xem</span>
                                    </Button>
                                    <Button tag={Link} to={`${match.url}/${hinhthuc.ma_hinh_thuc}/them-moi`} color="primary" size="sm">
                                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Sửa</span>
                                    </Button>
                                    <Button
                                        tag={Link}
                                        to={`${match.url}/${hinhthuc.ma_hinh_thuc}/xoa`}
                                        color="danger"
                                        size="sm"
                                        // disabled={account.login === user.login}
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
    ds_hinhthuc: storeState.hinhthuc.ds_hinh_thuc,
    taikhoan: storeState.taikhoan.tai_khoan,
    totalItems: storeState.hinhthuc.totalItems
});

const mapDispatchToProps = { layDanhSachHinhThuc, layDanhSachHinhThucTheoTen, capNhatHinhThuc };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DanhSachHinhThuc);
