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
import { layDanhSachDanhGia, layDanhSachDanhGiaTheoTenVaLoai, capNhatDanhGia, layDanhSachLoaiCDTDanhGia } from './danhgia.reducer';
import { IRootState } from 'app/shared/reducers';
import { IDanhGia } from 'app/modules/quanlychidaotuyen/danhgia/danhgia.model';

export interface IHienThiDanhSachDanhGiaProps extends StateProps, DispatchProps, RouteComponentProps<{ loaicdt: string}> {}

export interface IDanhGiaState extends IPaginationBaseState {
    ma_loai_cdt: string;
    currentPage: any;
    maxPage: any;
    arrDanhGia: IDanhGia[];
    findName: any;
    up: any;
}

export class DanhSachDanhGia extends React.Component<IHienThiDanhSachDanhGiaProps, IDanhGiaState, HTMLElement> {
    state: IDanhGiaState = {
        ...getSortState(this.props.location, ITEMS_PER_PAGE),
        ma_loai_cdt: this.props.match.params.loaicdt === undefined ? '-1' : this.props.match.params.loaicdt,
        currentPage: 1,
        maxPage: 1,
        arrDanhGia: [],
        findName: '',
        up: 0
    };

    componentDidMount() {
        this.props.layDanhSachLoaiCDTDanhGia();
        if (this.props.match.params.loaicdt !== undefined) {
            this.props.layDanhSachDanhGia(this.props.match.params.loaicdt);
        }
    }

    componentWillReceiveProps(nextProps: Readonly<IHienThiDanhSachDanhGiaProps>, nextContext: any): void {
        const value = [];
        nextProps.ds_danh_gia.map((ele, i) => {
            value.push(ele);
        });
        this.setState({ arrDanhGia: value,
            maxPage: nextProps.ds_danh_gia.length % 10 > 0 ? parseInt((nextProps.ds_danh_gia.length / 10 + 1).toString(), 10) :
                nextProps.ds_danh_gia.length === 0 ? 1 : parseInt((nextProps.ds_danh_gia.length / 10).toString(), 10)
        });
        if (this.state.maxPage < 1) {
            this.setState({ maxPage: 1 });
        }
        const trang = this.state.currentPage;
        const size = nextProps.ds_danh_gia.length;
        if (size < 10) {
            this.setState({ arrDanhGia: value });
        } else if ((trang - 1) * 10 > size) {
            this.setState({ arrDanhGia: nextProps.ds_danh_gia.slice(size - size % 10, size + 1) });
        } else if (trang * 10 > size) {
            this.setState({ arrDanhGia: nextProps.ds_danh_gia.slice((trang - 1) * 10, size + 1) });
        } else {
            this.setState({ arrDanhGia: nextProps.ds_danh_gia.slice((trang - 1) * 10, trang * 10) });
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
        const size = this.props.ds_danh_gia.length;
        if (size < 10) {
            this.setState({ arrDanhGia: this.state.arrDanhGia });
        } else if ((trang - 1) * 10 > size) {
            this.setState({ arrDanhGia: this.props.ds_danh_gia.slice(size - size % 10, size + 1) });
        } else if (trang * 10 > size) {
            this.setState({ arrDanhGia: this.props.ds_danh_gia.slice((trang - 1) * 10, size + 1) });
        } else {
            this.setState({ arrDanhGia: this.props.ds_danh_gia.slice((trang - 1) * 10, trang * 10) });
        }
    }

    sortDanhSach = (key, type) => () => {
        let temp = this.state.arrDanhGia;
        if (key === 1) {
            // key:  1: danh_gia     2: vi_tri     3: trang_thai
            // type: 1: tăng              2: giảm
            // sắp xếp theo tên
            if (type === 1) {
                temp = this.state.arrDanhGia.sort((a, b) => (a.danh_gia_cdt > b.danh_gia_cdt) ? 1 : ((b.danh_gia_cdt > a.danh_gia_cdt) ? -1 : 0));
            } else {
                temp = this.state.arrDanhGia.sort((a, b) => (a.danh_gia_cdt < b.danh_gia_cdt) ? 1 : ((b.danh_gia_cdt < a.danh_gia_cdt) ? -1 : 0));
            }
        } else if (key === 2) {
            if (type === 1) {
                temp = this.state.arrDanhGia.sort((a, b) => (a.vi_tri > b.vi_tri) ? 1 : ((b.vi_tri > a.vi_tri) ? -1 : 0));
            } else {
                temp = this.state.arrDanhGia.sort((a, b) => (a.vi_tri < b.vi_tri) ? 1 : ((b.vi_tri < a.vi_tri) ? -1 : 0));
            }
        } else if (key === 3) {
            if (type === 1) {
                temp = this.state.arrDanhGia.sort((a, b) => (a.trang_thai > b.trang_thai) ? 1 : ((b.trang_thai > a.trang_thai) ? -1 : 0));
            } else {
                temp = this.state.arrDanhGia.sort((a, b) => (a.trang_thai < b.trang_thai) ? 1 : ((b.trang_thai < a.trang_thai) ? -1 : 0));
            }
        }
        this.setState({ arrDanhGia: temp, up: type === 0 ? 1 : 0 });
    };

    onChangeFindName = e => {
        this.setState({ findName: e.target.value });
    }

    onClickFindName = e => {
        this.props.layDanhSachDanhGiaTheoTenVaLoai(this.state.findName, this.state.ma_loai_cdt);
    }

    onKeyPressFindName = e => {
        if (e.charCode === 13) {
            this.props.layDanhSachDanhGiaTheoTenVaLoai(this.state.findName, this.state.ma_loai_cdt);
        }
    }

    handleSelectChange = (event: React.FormEvent<HTMLSelectElement>) => {
        const element = event.target as HTMLSelectElement;
        this.setState({ ma_loai_cdt: element.value });
        if (element.value !== '-1') {
            this.props.layDanhSachDanhGia(element.value);
        } else {
            this.setState({ arrDanhGia: [] });
        }
    }
    toggleActive = danhGia => () => {
        this.props.capNhatDanhGia({
            ...danhGia,
            trang_thai: danhGia.trang_thai === 0 ? 1 : 0
        });
    };
    disableLink = e => () => {
       e.preventDefault();
    }
    render() {
        const { ds_danh_gia, ds_loai_cdt, match, totalItems } = this.props;
        return (
            <div>
                <div>
                    <label style={ { fontWeight: 'bold' } }>Loại chỉ đạo tuyến</label>
                    &nbsp;
                    <select
                        style={ { borderColor: '#0066ff', borderRadius: '5px', width: 350 } }
                        id="loai_cdt" onChange={ this.handleSelectChange } value={this.state.ma_loai_cdt}>
                        <option value="-1">--Chọn loại chỉ đạo tuyến</option>
                        {
                            ds_loai_cdt.map((loaicdt, i) => (
                                <option key={loaicdt.ma_loai_cdt} value={ loaicdt.ma_loai_cdt }>
                                    {loaicdt.ten_loai_cdt}
                                </option>
                            ))}
                    </select>
                </div>
                <br/>
                <h2>
                        Danh sách đánh giá chỉ đạo tuyến
                    {
                        this.state.ma_loai_cdt !== '-1' ? (
                            <Link to={`/danh-gia/them-moi/${this.state.ma_loai_cdt}`}
                                  className="btn btn-primary float-right jh-create-entity">
                                <FontAwesomeIcon icon="plus" /> Thêm mới đánh giá
                            </Link>
                        ) : (
                            <Link to={`/danh-gia/them-moi/${this.state.ma_loai_cdt}`}
                                  className="btn btn-primary float-right jh-create-entity"
                                  onClick={ this.disableLink }
                                  style={{ cursor: 'default' }}
                            >
                                <FontAwesomeIcon icon="plus" /> Thêm mới đánh giá
                            </Link>
                        )
                    }

                </h2>
                <Row>
                    <input placeholder="Nhập thông tin đánh giá cần tìm..."
                           style={ { width: '40%', marginLeft: '55%', borderRadius: '5px', borderColor: '#0066ff', paddingLeft: '5px' } }
                           onKeyPress={this.onKeyPressFindName}
                           onChange={this.onChangeFindName}
                    />
                    &nbsp;
                    <Button color="info" style={ { transform: 'rotate(180deg)', float: 'right' } } onClick={this.onClickFindName}>
                        <FontAwesomeIcon icon="arrow-left" />
                    </Button>
                </Row>
                <br/>
                <Table responsive striped>
                    <thead>
                    <tr>
                        <th className="hand">
                            Mã đánh giá chỉ đạo tuyến
                        </th>
                        <th className="hand" onClick={this.sortDanhSach(1, this.state.up)}>
                            Đánh giá chỉ đạo tuyến
                            &nbsp;
                            <FontAwesomeIcon icon="sort" style={ { color: '#0066ff' } }/>
                        </th>
                        <th className="hand" onClick={this.sortDanhSach(2, this.state.up)}>
                            Vị trí đánh giá chỉ đạo tuyến
                            &nbsp;
                            <FontAwesomeIcon icon="sort" style={ { color: '#0066ff' } }/>
                        </th>
                        <th className="hand" onClick={this.sortDanhSach(3, this.state.up)}>
                            Trạng thái đánh giá chỉ đạo tuyến
                            &nbsp;
                            <FontAwesomeIcon icon="sort" style={ { color: '#0066ff' } }/>
                        </th>
                        <th />
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.arrDanhGia.map((danhgia, i) => (
                        <tr key={`user-${i}`}>
                            <td>{danhgia.ma_danh_gia}</td>
                            <td>{danhgia.danh_gia_cdt}</td>
                            <td>{danhgia.vi_tri}</td>
                            <td>
                                {danhgia.trang_thai === 1 ? (
                                    <Button color="success" onClick={this.toggleActive(danhgia)}>
                                        Hoạt động
                                    </Button>
                                ) : (
                                    <Button color="danger" onClick={this.toggleActive(danhgia)}>
                                        Không hoạt động
                                    </Button>
                                )}
                            </td>
                            <td className="text-right">
                                <div className="btn-group flex-btn-group-container">
                                    <Button tag={Link} to={`/danh-gia/xem/${danhgia.ma_danh_gia}/${danhgia.loai_cdt}`} color="info" size="sm">
                                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">Xem</span>
                                    </Button>
                                    <Button tag={Link} to={`/danh-gia/${danhgia.ma_danh_gia}/them-moi/${danhgia.loai_cdt}`} color="primary" size="sm">
                                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Sửa</span>
                                    </Button>
                                    <Button
                                        tag={Link}
                                        to={`/danh-gia/${danhgia.ma_danh_gia}/xoa-danh-gia`}
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
    ds_danh_gia: storeState.danhgia.ds_danh_gia,
    ds_loai_cdt: storeState.danhgia.ds_loai_cdt,
    totalItems: storeState.danhgia.totalItems
});

const mapDispatchToProps = { layDanhSachDanhGia, layDanhSachDanhGiaTheoTenVaLoai, layDanhSachLoaiCDTDanhGia, capNhatDanhGia };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DanhSachDanhGia);
