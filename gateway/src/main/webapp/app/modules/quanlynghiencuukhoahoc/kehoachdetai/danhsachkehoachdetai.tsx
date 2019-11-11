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
import { getDanhSachKeHoachDeTai, getDanhSachKeHoachDeTaiTheoKeHoach_DonVi_Nam,
    getDanhSachDonVi, getDanhSachTinhThanh, getDanhSachNamKH, reset } from './kehoachdetai.reducer';
import { IRootState } from 'app/shared/reducers';
import { IKeHoachDeTai } from 'app/modules/quanlynghiencuukhoahoc/kehoachdetai/kehoachdetai.model';

export interface IHienThiDanhSachKeHoachDeTaiProps extends StateProps, DispatchProps, RouteComponentProps<{
    tinhthanh: string, donvi: string, nam: string}> {}

export interface IKeHoachState extends IPaginationBaseState {
    ma_tinh_thanh: string;
    ma_don_vi: string;
    nam_kh: string;
    ds_nam: any;
    arrKeHoachDeTai: IKeHoachDeTai[];
    currentPage: any;
    maxPage: any;
    findName: any;
    up: any;
}

export class DanhSachKeHoachDeTai extends React.Component<IHienThiDanhSachKeHoachDeTaiProps, IKeHoachState> {
    state: IKeHoachState = {
        ...getSortState(this.props.location, ITEMS_PER_PAGE),
        ma_tinh_thanh: this.props.match.params.tinhthanh,
        ma_don_vi: this.props.match.params.donvi,
        nam_kh: this.props.match.params.nam,
        ds_nam: [],
        arrKeHoachDeTai: [],
        currentPage: 1,
        maxPage: 1,
        findName: '',
        up: 0
    };

    componentWillUnmount(): void {
        this.props.reset();
    }

    componentDidMount() {
        this.props.getDanhSachTinhThanh();
        if (this.props.match.params.tinhthanh !== undefined) {
            this.props.getDanhSachDonVi(this.props.match.params.tinhthanh);
        }
        if (this.props.match.params.tinhthanh !== undefined && this.props.match.params.donvi !== undefined &&
            this.props.match.params.nam !== undefined) {
            this.props.getDanhSachKeHoachDeTai(this.props.match.params.donvi, this.props.match.params.nam);
        }
        const year = new Date().getFullYear();
        const val = [];
        for (let i = year - 5; i <= year + 5; i++) {
            val.push(i);
        }
        this.setState({ ds_nam: val, ma_tinh_thanh: this.props.match.params.tinhthanh,
            ma_don_vi: this.props.match.params.donvi, nam_kh: this.props.match.params.nam});
    }
    componentWillReceiveProps(nextProps: Readonly<IHienThiDanhSachKeHoachDeTaiProps>, nextContext: any): void {
        const value = [];
        nextProps.ds_ke_hoach_de_tai.map((ele, i) => {
            value.push(ele);
        });
        this.setState({ arrKeHoachDeTai: value,
            maxPage: nextProps.ds_ke_hoach_de_tai.length % 10 > 0 ? parseInt((nextProps.ds_ke_hoach_de_tai.length / 10 + 1).toString(), 10) :
                nextProps.ds_ke_hoach_de_tai.length === 0 ? 1 : parseInt((nextProps.ds_ke_hoach_de_tai.length / 10).toString(), 10)
        });
        if (this.state.maxPage < 1) {
            this.setState({ maxPage: 1 });
        }
        const trang = this.state.currentPage;
        const size = nextProps.ds_ke_hoach_de_tai.length;
        if (size < 10) {
            this.setState({ arrKeHoachDeTai: value });
        } else if ((trang - 1) * 10 > size) {
            this.setState({ arrKeHoachDeTai: nextProps.ds_ke_hoach_de_tai.slice(size - size % 10, size + 1) });
        } else if (trang * 10 > size) {
            this.setState({ arrKeHoachDeTai: nextProps.ds_ke_hoach_de_tai.slice((trang - 1) * 10, size + 1) });
        } else {
            this.setState({ arrKeHoachDeTai: nextProps.ds_ke_hoach_de_tai.slice((trang - 1) * 10, trang * 10) });
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
        const size = this.props.ds_ke_hoach_de_tai.length;
        if (size < 10) {
            this.setState({ arrKeHoachDeTai: this.state.arrKeHoachDeTai });
        } else if ((trang - 1) * 10 > size) {
            this.setState({ arrKeHoachDeTai: this.props.ds_ke_hoach_de_tai.slice(size - size % 10, size + 1) });
        } else if (trang * 10 > size) {
            this.setState({ arrKeHoachDeTai: this.props.ds_ke_hoach_de_tai.slice((trang - 1) * 10, size + 1) });
        } else {
            this.setState({ arrKeHoachDeTai: this.props.ds_ke_hoach_de_tai.slice((trang - 1) * 10, trang * 10) });
        }
    }

    sortDanhSach = (key, type) => () => {
        let temp = this.state.arrKeHoachDeTai;
        if (key === 1) {
            // key:  1: Noi_dung_trich_yeu     2: ngay_ban_hanh     3: tap_tin
            // type: 1: tăng              2: giảm
            // sắp xếp theo tên
            if (type === 1) {
                temp = this.state.arrKeHoachDeTai.sort((a, b) => (a.keHoachDeTai > b.keHoachDeTai) ? 1 : ((b.keHoachDeTai > a.keHoachDeTai) ? -1 : 0));
            } else {
                temp = this.state.arrKeHoachDeTai.sort((a, b) => (a.keHoachDeTai < b.keHoachDeTai) ? 1 : ((b.keHoachDeTai < a.keHoachDeTai) ? -1 : 0));
            }
        } else if (key === 2) {
            if (type === 1) {
                temp = this.state.arrKeHoachDeTai.sort((a, b) => (a.noiDungTrichYeu > b.noiDungTrichYeu) ? 1 : ((b.noiDungTrichYeu > a.noiDungTrichYeu) ? -1 : 0));
            } else {
                temp = this.state.arrKeHoachDeTai.sort((a, b) => (a.noiDungTrichYeu < b.noiDungTrichYeu) ? 1 : ((b.noiDungTrichYeu < a.noiDungTrichYeu) ? -1 : 0));
            }
        } else if (key === 3) {
            if (type === 1) {
                temp = this.state.arrKeHoachDeTai.sort((a, b) => (a.tapTin > b.tapTin) ? 1 : ((b.tapTin > a.tapTin) ? -1 : 0));
            } else {
                temp = this.state.arrKeHoachDeTai.sort((a, b) => (a.tapTin < b.tapTin) ? 1 : ((b.tapTin < a.tapTin) ? -1 : 0));
            }
        }
        this.setState({ arrKeHoachDeTai: temp, up: type === 0 ? 1 : 0 });
    };

    onChangeFindName = e => {
        this.setState({ findName: e.target.value });
    }

    onClickFindName = e => {
        this.props.getDanhSachKeHoachDeTaiTheoKeHoach_DonVi_Nam(this.state.findName, this.state.ma_don_vi, this.state.nam_kh);
    }

    onKeyPressFindName = e => {
        if (e.charCode === 13) {
            this.props.getDanhSachKeHoachDeTaiTheoKeHoach_DonVi_Nam(this.state.findName, this.state.ma_don_vi, this.state.nam_kh);
        }
    }

    handleSelectTinhThanh = (event: React.FormEvent<HTMLSelectElement>) => {
        const element = event.target as HTMLSelectElement;
        this.setState({ ma_tinh_thanh: element.value });
        this.props.getDanhSachDonVi(element.value);
    }

    handleSelectDonVi = (event: React.FormEvent<HTMLSelectElement>) => {
        const element = event.target as HTMLSelectElement;
        this.setState({ ma_don_vi: element.value });
        if (!(this.state.nam_kh === undefined || this.state.nam_kh === null || this.state.nam_kh === '' || this.state.nam_kh === '-1')) {
            this.layDanhSachKeHoachDeTai(element.value, this.state.nam_kh);
        }
    }

    handleSelectNam = (event: React.FormEvent<HTMLSelectElement>) => {
        const element = event.target as HTMLSelectElement;
        this.setState({ nam_kh: element.value });
        if (!(element.value === '-1')) {
            this.layDanhSachKeHoachDeTai(this.state.ma_don_vi, element.value);
        }
    }
    layDanhSachKeHoachDeTai = (donvi: any, nam: any) => {
        // const { activePage, itemsPerPage, sort, order } = this.state;
        this.props.getDanhSachKeHoachDeTai(donvi, nam);
    };

    render() {
        const { ds_ke_hoach_de_tai, ds_tinh_thanh, ds_don_vi, ds_nam_kh, match, totalItems } = this.props;
        return (
            <div>
                <table style={ { width: '100%' } }>
                    <tr>
                        <td>
                            <div>
                                <label style={ { fontWeight: 'bold' } }>Tỉnh thành</label>&nbsp;
                                <select style={ { borderColor: '#0066ff', borderRadius: '5px', width: 150 } } onChange={ this.handleSelectTinhThanh } value={this.state.ma_tinh_thanh}>
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
                                <select style={ { borderColor: '#0066ff', borderRadius: '5px', width: 350 } } id="donVi" onChange={ this.handleSelectDonVi } value={this.state.ma_don_vi}>
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
                                <select style={ { borderColor: '#0066ff', borderRadius: '5px', width: 120 } } id="nam" onChange={ this.handleSelectNam } value={this.state.nam_kh}>
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
                    Danh sách kế hoạch đề tài
                    <Link to={`/quan-ly-nckh/ke-hoach-de-tai/them-moi/${this.state.ma_tinh_thanh}/${this.state.ma_don_vi}/${this.state.nam_kh}`}
                          className="btn btn-primary float-right jh-create-entity">
                        <FontAwesomeIcon icon="plus" /> Thêm mới kế hoạch đề tài
                    </Link>
                </h2>
                <Row>
                    <input placeholder="Nhập kế hoạch đề tài cần tìm..."
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
                            Kế hoạch đề tài
                            &nbsp;
                            <FontAwesomeIcon icon="sort" style={ { color: '#0066ff' } }/>
                        </th>
                        <th className="hand" onClick={this.sortDanhSach(2, this.state.up)}>
                            Nội dung trích yếu
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
                        this.state.arrKeHoachDeTai.map((keHoachDeTai, i) => (
                            <tr>
                                <td>{keHoachDeTai.keHoachDeTai}</td>
                                <td>{keHoachDeTai.noiDungTrichYeu}</td>
                                <td>{keHoachDeTai.tapTin}</td>
                                <td className="text-right">
                                    <div className="btn-group flex-btn-group-container">
                                        <Button tag={Link} to={`/quan-ly-nckh/ke-hoach-de-tai/${keHoachDeTai.maKeHoachDeTai}/${this.state.ma_tinh_thanh}/${this.state.ma_don_vi}/${this.state.nam_kh}`} color="info" size="sm">
                                            <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">Xem</span>
                                        </Button>
                                        <Button tag={Link}
                                                to={`/quan-ly-nckh/ke-hoach-de-tai/${keHoachDeTai.maKeHoachDeTai}/them-moi/${this.state.ma_tinh_thanh}/${keHoachDeTai.donVi}/${keHoachDeTai.nam}`}
                                                color="primary" size="sm">
                                            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Sửa</span>
                                        </Button>
                                        <Button
                                            tag={Link}
                                            to={`/quan-ly-nckh/ke-hoach-de-tai/${keHoachDeTai.maKeHoachDeTai}/xoa/${this.state.ma_tinh_thanh}/${keHoachDeTai.donVi}/${keHoachDeTai.nam}`}
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
    ds_ke_hoach_de_tai: storeState.kehoachdetai.ds_ke_hoach_de_tai,
    ds_tinh_thanh: storeState.kehoachdetai.ds_tinh_thanh,
    ds_don_vi: storeState.kehoachdetai.ds_don_vi,
    ds_nam_kh: storeState.kehoachdetai.ds_nam_kh,
    totalItems: storeState.kehoachdetai.totalItems
});

const mapDispatchToProps = { getDanhSachKeHoachDeTai, getDanhSachKeHoachDeTaiTheoKeHoach_DonVi_Nam,
    getDanhSachDonVi, getDanhSachTinhThanh, getDanhSachNamKH, reset };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DanhSachKeHoachDeTai);
