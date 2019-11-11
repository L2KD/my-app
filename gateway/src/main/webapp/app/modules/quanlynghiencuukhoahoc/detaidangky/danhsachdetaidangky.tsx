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
import { getDanhSachDeTaiDangKy, getDanhSachDeTaiDangKyTheoTen_DonVi_Nam, getDanhSachDonVi,
    getDanhSachTinhThanh, reset } from './detaidangky.reducer';
import { IRootState } from 'app/shared/reducers';
import { IDeTaiDangKy } from 'app/modules/quanlynghiencuukhoahoc/detaidangky/detaidangky.model';

export interface IHienThiDanhSachDeTaiDangKyProps extends StateProps, DispatchProps, RouteComponentProps<{
    tinhthanh: string, donvi: string, nam: string
}> {}

export interface IKeHoachState extends IPaginationBaseState {
    ma_tinh_thanh: string;
    ma_don_vi: string;
    ds_nam: any;
    nam_dt: any;
    arrDeTaiDangKy: IDeTaiDangKy[];
    currentPage: any;
    maxPage: any;
    findName: any;
    up: any;
}

export class DanhSachDeTaiDangKy extends React.Component<IHienThiDanhSachDeTaiDangKyProps, IKeHoachState> {
    state: IKeHoachState = {
        ...getSortState(this.props.location, ITEMS_PER_PAGE),
        ma_tinh_thanh: this.props.match.params.tinhthanh,
        ma_don_vi: this.props.match.params.donvi,
        ds_nam: [],
        nam_dt: this.props.match.params.nam,
        arrDeTaiDangKy: [],
        currentPage: 1,
        maxPage: 1,
        findName: '',
        up: 0
    };

    componentWillUnmount(): void {
        this.props.reset();
    }

    componentDidMount() {
        // this.layDanhSachDeTaiDangKy();
        this.props.getDanhSachTinhThanh();
        if (this.props.match.params.tinhthanh !== undefined) {
            this.props.getDanhSachDonVi(this.props.match.params.tinhthanh);
        }
        if (this.props.match.params.tinhthanh !== undefined && this.props.match.params.donvi !== undefined &&
            this.props.match.params.nam !== undefined) {
            this.props.getDanhSachDeTaiDangKy(this.props.match.params.donvi, this.props.match.params.nam);
        }
        const year = new Date().getFullYear();
        const val = [];
        for (let i = year - 5; i <= year + 5; i++) {
            val.push(i);
        }
        this.setState({ ds_nam: val });
    }
    componentWillReceiveProps(nextProps: Readonly<IHienThiDanhSachDeTaiDangKyProps>, nextContext: any): void {
        const value = [];
        nextProps.ds_de_tai_dang_ky.map((ele, i) => {
            value.push(ele);
        });
        this.setState({ arrDeTaiDangKy: value,
            maxPage: nextProps.ds_de_tai_dang_ky.length % 10 > 0 ? parseInt((nextProps.ds_de_tai_dang_ky.length / 10 + 1).toString(), 10) :
                nextProps.ds_de_tai_dang_ky.length === 0 ? 1 : parseInt((nextProps.ds_de_tai_dang_ky.length / 10).toString(), 10)
        });
        if (this.state.maxPage < 1) {
            this.setState({ maxPage: 1 });
        }
        const trang = this.state.currentPage;
        const size = nextProps.ds_de_tai_dang_ky.length;
        if (size < 10) {
            this.setState({ arrDeTaiDangKy: value });
        } else if ((trang - 1) * 10 > size) {
            this.setState({ arrDeTaiDangKy: nextProps.ds_de_tai_dang_ky.slice(size - size % 10, size + 1) });
        } else if (trang * 10 > size) {
            this.setState({ arrDeTaiDangKy: nextProps.ds_de_tai_dang_ky.slice((trang - 1) * 10, size + 1) });
        } else {
            this.setState({ arrDeTaiDangKy: nextProps.ds_de_tai_dang_ky.slice((trang - 1) * 10, trang * 10) });
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
        const size = this.props.ds_de_tai_dang_ky.length;
        if (size < 10) {
            this.setState({ arrDeTaiDangKy: this.state.arrDeTaiDangKy });
        } else if ((trang - 1) * 10 > size) {
            this.setState({ arrDeTaiDangKy: this.props.ds_de_tai_dang_ky.slice(size - size % 10, size + 1) });
        } else if (trang * 10 > size) {
            this.setState({ arrDeTaiDangKy: this.props.ds_de_tai_dang_ky.slice((trang - 1) * 10, size + 1) });
        } else {
            this.setState({ arrDeTaiDangKy: this.props.ds_de_tai_dang_ky.slice((trang - 1) * 10, trang * 10) });
        }
    }

    sortDanhSach = (key, type) => () => {
        let temp = this.state.arrDeTaiDangKy;
        if (key === 1) {
            // key:  1: Noi_dung_trich_yeu     2: ngay_ban_hanh     3: tap_tin
            // type: 1: tăng              2: giảm
            // sắp xếp theo tên
            if (type === 1) {
                temp = this.state.arrDeTaiDangKy.sort((a, b) => (a.tenDeTai > b.tenDeTai) ? 1 : ((b.tenDeTai > a.tenDeTai) ? -1 : 0));
            } else {
                temp = this.state.arrDeTaiDangKy.sort((a, b) => (a.tenDeTai < b.tenDeTai) ? 1 : ((b.tenDeTai < a.tenDeTai) ? -1 : 0));
            }
        } else if (key === 2) {
            if (type === 1) {
                temp = this.state.arrDeTaiDangKy.sort((a, b) => (a.ngayDangKy > b.ngayDangKy) ? 1 : ((b.ngayDangKy > a.ngayDangKy) ? -1 : 0));
            } else {
                temp = this.state.arrDeTaiDangKy.sort((a, b) => (a.ngayDangKy < b.ngayDangKy) ? 1 : ((b.ngayDangKy < a.ngayDangKy) ? -1 : 0));
            }
        } else if (key === 3) {
            if (type === 1) {
                temp = this.state.arrDeTaiDangKy.sort((a, b) => (a.tapTin > b.tapTin) ? 1 : ((b.tapTin > a.tapTin) ? -1 : 0));
            } else {
                temp = this.state.arrDeTaiDangKy.sort((a, b) => (a.tapTin < b.tapTin) ? 1 : ((b.tapTin < a.tapTin) ? -1 : 0));
            }
        }
        this.setState({ arrDeTaiDangKy: temp, up: type === 0 ? 1 : 0 });
    };

    onChangeFindName = e => {
        this.setState({ findName: e.target.value });
    }

    onClickFindName = e => {
        this.props.getDanhSachDeTaiDangKyTheoTen_DonVi_Nam(this.state.findName, this.state.ma_don_vi, this.state.nam_dt);
    }

    onKeyPressFindName = e => {
        if (e.charCode === 13) {
            this.props.getDanhSachDeTaiDangKyTheoTen_DonVi_Nam(this.state.findName, this.state.ma_don_vi, this.state.nam_dt);
        }
    }

    handleSelectTinhThanh = (event: React.FormEvent<HTMLSelectElement>) => {
        const element = event.target as HTMLSelectElement;
        this.setState({ ma_tinh_thanh: element.value });
        this.props.getDanhSachDonVi(element.value);
        /*if (!(element.value === '-1')) {
            this.layDanhSachDeTaiDangKy(this.state.ma_don_vi, this.state.nam_kh);
        }*/
    }

    handleSelectDonVi = (event: React.FormEvent<HTMLSelectElement>) => {
        const element = event.target as HTMLSelectElement;
        this.setState({ ma_don_vi: element.value });
        /*if (!(this.state.nam_kh === '-1')) {
            this.layDanhSachDeTaiDangKy(element.value, this.state.nam_kh);
        }*/
        if (!(this.state.nam_dt === undefined || this.state.nam_dt === null || this.state.nam_dt === '' || this.state.nam_dt === '-1')) {
            this.layDanhSachDeTaiDangKy(element.value, this.state.nam_dt);
        }
    }

    handleSelectNam = (event: React.FormEvent<HTMLSelectElement>) => {
        const element = event.target as HTMLSelectElement;
        this.setState({ nam_dt: element.value });
        if (!(element.value === '-1')) {
            this.layDanhSachDeTaiDangKy(this.state.ma_don_vi, element.value);
        }
    }
    layDanhSachDeTaiDangKy = (donvi: any, nam: any) => {
        // const { activePage, itemsPerPage, sort, order } = this.state;
        this.props.getDanhSachDeTaiDangKy(donvi, nam);
    };

    render() {
        const { ds_de_tai_dang_ky, ds_tinh_thanh, ds_don_vi, match, totalItems } = this.props;
        return (
            <div>
                <table style={ { width: '100%' } }>
                    <tr>
                        <td>
                            <div>
                                <label style={ { fontWeight: 'bold' } }>Tỉnh thành</label>&nbsp;
                                <select style={ { borderColor: '#0066ff', borderRadius: '5px', width: 150 } }
                                        id="maTinhThanh" onChange={ this.handleSelectTinhThanh } value={this.state.ma_tinh_thanh}>
                                    <option value="-1" selected>--Chọn tỉnh thành</option>{
                                    ds_tinh_thanh.map((tinhthanh, i) => (
                                        <option key={tinhthanh.maTinhThanh} value={ tinhthanh.maTinhThanh }>
                                            {tinhthanh.tenTinhThanh}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </td>
                        <td>
                            <div>
                                <label style={ { fontWeight: 'bold' } }>Đơn vị</label>&nbsp;
                                <select style={ { borderColor: '#0066ff', borderRadius: '5px', width: 350 } }
                                        id="donVi" onChange={ this.handleSelectDonVi } value={this.state.ma_don_vi}>
                                    <option value="-1" selected>--Chọn đơn vị</option>
                                    {
                                        ds_don_vi.map((donvi, i) => (
                                            <option key={donvi.maDonVi} value={ donvi.maDonVi }>
                                                {donvi.tenDonVi}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </td>
                        <td>
                            <div>
                                <label style={ { fontWeight: 'bold' } }>Năm</label>&nbsp;
                                <select style={ { borderColor: '#0066ff', borderRadius: '5px', width: 150 } }
                                        id="nam" onChange={ this.handleSelectNam } value={this.state.nam_dt}>
                                    <option value="-1" selected>--Chọn năm</option>
                                    {
                                        this.state.ds_nam.map((nam, i) => (
                                            <option key={nam} value={ nam }>
                                                {nam}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </td>
                    </tr>
                    <br />
                </table>
                <h2 id="user-management-page-heading">
                    Danh sách đề tài đăng ký
                    <Link to={`/quan-ly-nckh/de-tai-dang-ky/them-moi/${this.state.ma_tinh_thanh}/${this.state.ma_don_vi}/${this.state.nam_dt}`}
                          className="btn btn-primary float-right jh-create-entity">
                        <FontAwesomeIcon icon="plus" /> Thêm mới đề tài đăng ký
                    </Link>
                </h2>
                <Row>
                    <input placeholder="Nhập tên đề tài cần tìm..."
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
                        <th className="hand" onClick={this.sortDanhSach(1, this.state.up)}>
                            Tên đề tài
                            &nbsp;
                            <FontAwesomeIcon icon="sort" style={ { color: '#0066ff' } }/>
                        </th>
                        <th className="hand" onClick={this.sortDanhSach(2, this.state.up)}>
                            Ngày đăng ký
                            &nbsp;
                            <FontAwesomeIcon icon="sort" style={ { color: '#0066ff' } }/>
                        </th>
                        <th className="hand" onClick={this.sortDanhSach(3, this.state.up)}>
                            Tập tin
                            &nbsp;
                            <FontAwesomeIcon icon="sort" style={ { color: '#0066ff' } }/>
                        </th>
                        <th />
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.arrDeTaiDangKy.map((deTaiDangKy, i) => (
                            <tr>
                                <td>{deTaiDangKy.tenDeTai}</td>
                                <td>{deTaiDangKy.ngayDangKy}</td>
                                <td>{deTaiDangKy.tapTin}</td>
                                <td className="text-right">
                                    <div className="btn-group flex-btn-group-container">
                                        <Button tag={Link} to={`/quan-ly-nckh/de-tai-dang-ky/xem/${deTaiDangKy.maDeTai}/${this.state.ma_tinh_thanh}/${this.state.ma_don_vi}/${this.state.nam_dt}`} color="info" size="sm">
                                            <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">Xem</span>
                                        </Button>
                                        <Button tag={Link}
                                                to={`/quan-ly-nckh/de-tai-dang-ky/${deTaiDangKy.maDeTai}/them-moi/${this.state.ma_tinh_thanh}/${deTaiDangKy.donVi}/${this.state.nam_dt}`}
                                                color="primary" size="sm">
                                            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Sửa</span>
                                        </Button>
                                        <Button
                                            tag={Link}
                                            to={`/quan-ly-nckh/de-tai-dang-ky/${deTaiDangKy.maDeTai}/xoa/${deTaiDangKy.donVi}/${deTaiDangKy.ngayDangKy.substring(0, 4)}`}
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
                    <input style={ { width: '50px', fontSize: 'large', borderColor: '#0066ff', borderRadius: '5px' } }
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
    ds_de_tai_dang_ky: storeState.detaidangky.ds_de_tai_dang_ky,
    ds_tinh_thanh: storeState.detaidangky.ds_tinh_thanh,
    ds_don_vi: storeState.detaidangky.ds_don_vi,
    totalItems: storeState.detaidangky.totalItems
});

const mapDispatchToProps = { getDanhSachDeTaiDangKy, getDanhSachDeTaiDangKyTheoTen_DonVi_Nam,
    getDanhSachDonVi, getDanhSachTinhThanh, reset };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DanhSachDeTaiDangKy);
