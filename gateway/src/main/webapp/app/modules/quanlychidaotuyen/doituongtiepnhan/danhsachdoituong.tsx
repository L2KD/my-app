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
import { layDanhSachDoiTuong, layDanhSachDoiTuongTheoTen, capNhatDoiTuong } from './doituong.reducer';
import { IRootState } from 'app/shared/reducers';
import { IDoiTuong } from 'app/modules/quanlychidaotuyen/doituongtiepnhan/doituong.model';

export interface IHienThiDanhSachDoiTuongProps extends StateProps, DispatchProps, RouteComponentProps<{}> {}

export interface IDoiTuongState extends IPaginationBaseState {
    currentPage: any;
    maxPage: any;
    arrDoiTuong: IDoiTuong[];
    findName: any;
    up: any;
}

export class DanhSachDoiTuong extends React.Component<IHienThiDanhSachDoiTuongProps, IDoiTuongState> {
    state: IDoiTuongState = {
        ...getSortState(this.props.location, ITEMS_PER_PAGE),
        currentPage: 1,
        maxPage: 1,
        arrDoiTuong: [],
        findName: '',
        up: 0
    };

    componentDidMount() {
        this.props.layDanhSachDoiTuong();
    }
    componentWillReceiveProps(nextProps: Readonly<IHienThiDanhSachDoiTuongProps>, nextContext: any): void {
        const value = [];
        nextProps.ds_doituong.map((ele, i) => {
            value.push(ele);
        });
        this.setState({ arrDoiTuong: value,
            maxPage: nextProps.ds_doituong.length % 10 > 0 ? parseInt((nextProps.ds_doituong.length / 10 + 1).toString(), 10) :
                nextProps.ds_doituong.length === 0 ? 1 : parseInt((nextProps.ds_doituong.length / 10).toString(), 10)
        });
        if (this.state.maxPage < 1) {
            this.setState({ maxPage: 1 });
        }
        const trang = this.state.currentPage;
        const size = nextProps.ds_doituong.length;
        if (size < 10) {
            this.setState({ arrDoiTuong: value });
        } else if ((trang - 1) * 10 > size) {
            this.setState({ arrDoiTuong: nextProps.ds_doituong.slice(size - size % 10, size + 1) });
        } else if (trang * 10 > size) {
            this.setState({ arrDoiTuong: nextProps.ds_doituong.slice((trang - 1) * 10, size + 1) });
        } else {
            this.setState({ arrDoiTuong: nextProps.ds_doituong.slice((trang - 1) * 10, trang * 10) });
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
        const size = this.props.ds_doituong.length;
        if (size < 10) {
            this.setState({ arrDoiTuong: this.state.arrDoiTuong });
        } else if ((trang - 1) * 10 > size) {
            this.setState({ arrDoiTuong: this.props.ds_doituong.slice(size - size % 10, size + 1) });
        } else if (trang * 10 > size) {
            this.setState({ arrDoiTuong: this.props.ds_doituong.slice((trang - 1) * 10, size + 1) });
        } else {
            this.setState({ arrDoiTuong: this.props.ds_doituong.slice((trang - 1) * 10, trang * 10) });
        }
    }

    sortDanhSach = (key, type) => () => {
        let temp = this.state.arrDoiTuong;
        if (key === 1) {
            // key:  1: ten doi tuong     2: vi_tri     3: trang_thai
            // type: 1: tăng              2: giảm
            // sắp xếp theo tên
            if (type === 1) {
                temp = this.state.arrDoiTuong.sort((a, b) => (a.tenDoiTuong > b.tenDoiTuong) ? 1 : ((b.tenDoiTuong > a.tenDoiTuong) ? -1 : 0));
            } else {
                temp = this.state.arrDoiTuong.sort((a, b) => (a.tenDoiTuong < b.tenDoiTuong) ? 1 : ((b.tenDoiTuong < a.tenDoiTuong) ? -1 : 0));
            }
        } else if (key === 2) {
            if (type === 1) {
                temp = this.state.arrDoiTuong.sort((a, b) => (a.viTri > b.viTri) ? 1 : ((b.viTri > a.viTri) ? -1 : 0));
            } else {
                temp = this.state.arrDoiTuong.sort((a, b) => (a.viTri < b.viTri) ? 1 : ((b.viTri < a.viTri) ? -1 : 0));
            }
        } else if (key === 3) {
            if (type === 1) {
                temp = this.state.arrDoiTuong.sort((a, b) => (a.trangThai > b.trangThai) ? 1 : ((b.trangThai > a.trangThai) ? -1 : 0));
            } else {
                temp = this.state.arrDoiTuong.sort((a, b) => (a.trangThai < b.trangThai) ? 1 : ((b.trangThai < a.trangThai) ? -1 : 0));
            }
        }
        this.setState({ arrDoiTuong: temp, up: type === 0 ? 1 : 0 });
    };

    onChangeFindName = e => {
        this.setState({ findName: e.target.value });
    }

    onClickFindName = e => {
        this.props.layDanhSachDoiTuongTheoTen(this.state.findName);
    }

    onKeyPressFindName = e => {
        if (e.charCode === 13) {
            this.props.layDanhSachDoiTuongTheoTen(this.state.findName);
        }
    }

    toggleActive = doiTuong => () => {
        this.props.capNhatDoiTuong({
            ...doiTuong,
            trangThai: doiTuong.trangThai === 0 ? 1 : 0
        });
    };

    render() {
        const { ds_doituong, match, totalItems } = this.props;
        return (
            <div>
                <h2 id="user-management-page-heading">
                    Danh sách đối tượng tiếp nhận chỉ đạo tuyến
                    <Link to={`${match.url}/them-moi`} className="btn btn-primary float-right jh-create-entity">
                        <FontAwesomeIcon icon="plus" /> Thêm mới đối tượng tiếp nhận chỉ đạo tuyến
                    </Link>
                </h2>
                <Row>
                    <input placeholder="Nhập tên đối tượng chỉ đạo tuyến cần tìm..."
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
                            Mã đối tượng tiếp nhận chỉ đạo tuyến
                        </th>
                        <th className="hand" onClick={this.sortDanhSach(1, this.state.up)}>
                            Tên đối tượng tiếp nhận chỉ đạo tuyến
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
                        this.state.arrDoiTuong.map((doituong, i) => (
                        <tr key={`doi_tuong-${i}`}>
                            <td>{doituong.maDoiTuong}</td>
                            <td>{doituong.tenDoiTuong}</td>
                            <td>{doituong.viTri}</td>
                            <td>
                                {doituong.trangThai === 1 ? (
                                    <Button color="success" onClick={this.toggleActive(doituong)}>
                                        Hoạt động
                                    </Button>
                                ) : (
                                    <Button color="danger" onClick={this.toggleActive(doituong)}>
                                        Không hoạt động
                                    </Button>
                                )}
                            </td>
                            <td className="text-right">
                                <div className="btn-group flex-btn-group-container">
                                    <Button tag={Link} to={`${match.url}/${doituong.maDoiTuong}`} color="info" size="sm">
                                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">Xem</span>
                                    </Button>
                                    <Button tag={Link} to={`${match.url}/${doituong.maDoiTuong}/them-moi`} color="primary" size="sm">
                                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Sửa</span>
                                    </Button>
                                    <Button
                                        tag={Link}
                                        to={`${match.url}/${doituong.maDoiTuong}/xoa`}
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
    ds_doituong: storeState.doituong.ds_doi_tuong,
    totalItems: storeState.doituong.totalItems
});

const mapDispatchToProps = { layDanhSachDoiTuong, layDanhSachDoiTuongTheoTen, capNhatDoiTuong };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DanhSachDoiTuong);
