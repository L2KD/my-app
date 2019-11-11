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
import { getDanhSachTinhThanh, getDanhSachVanBanTheoNoiDungTrichYeu_DonVi_Nam, getDanhSachDonVi, getDanhSachNam,
    getDanhSachVanBan, getVanBan, updateVanBan, printDSVB, reset } from './vanban.reducer';
import { IRootState } from 'app/shared/reducers';
import { IVanBan } from 'app/modules/quanlychidaotuyen/vanban/vanban.model';

export interface IHienThiDanhSachVanBanProps extends StateProps, DispatchProps, RouteComponentProps<{
    tinhthanh: string, donvi: string, nam: string}> {}

export interface IVanBanState extends IPaginationBaseState {
    ma_tinh_thanh: string;
    ma_don_vi: string;
    nam_vb: string;
    ds_nam: any;
    currentPage: any;
    maxPage: any;
    arrVanBan: IVanBan[];
    findName: any;
    up: any;
}

export class DanhSachVanBan extends React.Component<IHienThiDanhSachVanBanProps, IVanBanState, HTMLElement> {
    state: IVanBanState = {
        ...getSortState(this.props.location, ITEMS_PER_PAGE),
        ma_tinh_thanh: this.props.match.params.tinhthanh,
        ma_don_vi: this.props.match.params.donvi,
        nam_vb: this.props.match.params.nam,
        ds_nam: [],
        currentPage: 1,
        maxPage: 1,
        arrVanBan: [],
        findName: '',
        up: 0
    };

    componentWillUnmount(): void {
        this.props.reset();
    }

    componentWillReceiveProps(nextProps: Readonly<IHienThiDanhSachVanBanProps>, nextContext: any): void {
        const value = [];
        nextProps.ds_van_ban.map((ele, i) => {
            value.push(ele);
        });
        this.setState({ arrVanBan: value,
            maxPage: nextProps.ds_van_ban.length % 10 > 0 ? parseInt((nextProps.ds_van_ban.length / 10 + 1).toString(), 10) :
                nextProps.ds_van_ban.length === 0 ? 1 : parseInt((nextProps.ds_van_ban.length / 10).toString(), 10)
        });
        if (this.state.maxPage < 1) {
            this.setState({ maxPage: 1 });
        }
        const trang = this.state.currentPage;
        const size = nextProps.ds_van_ban.length;
        if (size < 10) {
            this.setState({ arrVanBan: value });
        } else if ((trang - 1) * 10 > size) {
            this.setState({ arrVanBan: nextProps.ds_van_ban.slice(size - size % 10, size + 1) });
        } else if (trang * 10 > size) {
            this.setState({ arrVanBan: nextProps.ds_van_ban.slice((trang - 1) * 10, size + 1) });
        } else {
            this.setState({ arrVanBan: nextProps.ds_van_ban.slice((trang - 1) * 10, trang * 10) });
        }
    }

    componentDidMount() {
        this.props.reset();
        this.props.getDanhSachTinhThanh();
        if (this.props.match.params.tinhthanh !== undefined) {
            this.props.getDanhSachDonVi(this.props.match.params.tinhthanh);
        }
        if (this.props.match.params.tinhthanh !== undefined && this.props.match.params.donvi !== undefined && this.props.match.params.nam !== undefined) {
            this.props.getDanhSachVanBan(this.props.match.params.donvi, this.props.match.params.nam);
        }
        const year = new Date().getFullYear();
        const val = [];
        for (let i = year - 5; i <= year + 5; i++) {
            val.push(i);
        }
        this.setState({ ds_nam: val });
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
        const size = this.props.ds_van_ban.length;
        if (size < 10) {
            this.setState({ arrVanBan: this.state.arrVanBan });
        } else if ((trang - 1) * 10 > size) {
            this.setState({ arrVanBan: this.props.ds_van_ban.slice(size - size % 10, size + 1) });
        } else if (trang * 10 > size) {
            this.setState({ arrVanBan: this.props.ds_van_ban.slice((trang - 1) * 10, size + 1) });
        } else {
            this.setState({ arrVanBan: this.props.ds_van_ban.slice((trang - 1) * 10, trang * 10) });
        }
    }

    sortDanhSach = (key, type) => () => {
        let temp = this.state.arrVanBan;
        if (key === 1) {
            // key:  1: ten_hinh_thuc     2: vi_tri     3: trang_thai
            // type: 1: tăng              2: giảm
            // sắp xếp theo tên
            if (type === 1) {
                temp = this.state.arrVanBan.sort((a, b) => (a.noiDungTrichYeu > b.noiDungTrichYeu) ? 1 : ((b.noiDungTrichYeu > a.noiDungTrichYeu) ? -1 : 0));
            } else {
                temp = this.state.arrVanBan.sort((a, b) => (a.noiDungTrichYeu < b.noiDungTrichYeu) ? 1 : ((b.noiDungTrichYeu < a.noiDungTrichYeu) ? -1 : 0));
            }
        } else if (key === 2) {
            if (type === 1) {
                temp = this.state.arrVanBan.sort((a, b) => (a.tenCoQuan > b.tenCoQuan) ? 1 : ((b.tenCoQuan > a.tenCoQuan) ? -1 : 0));
            } else {
                temp = this.state.arrVanBan.sort((a, b) => (a.tenCoQuan < b.tenCoQuan) ? 1 : ((b.tenCoQuan < a.tenCoQuan) ? -1 : 0));
            }
        } else if (key === 3) {
            if (type === 1) {
                temp = this.state.arrVanBan.sort((a, b) => (a.ngayBanHanh > b.ngayBanHanh) ? 1 : ((b.ngayBanHanh > a.ngayBanHanh) ? -1 : 0));
            } else {
                temp = this.state.arrVanBan.sort((a, b) => (a.ngayBanHanh < b.ngayBanHanh) ? 1 : ((b.ngayBanHanh < a.ngayBanHanh) ? -1 : 0));
            }
        } else if (key === 4) {
            if (type === 1) {
                temp = this.state.arrVanBan.sort((a, b) => (a.soCongVan > b.soCongVan) ? 1 : ((b.soCongVan > a.soCongVan) ? -1 : 0));
            } else {
                temp = this.state.arrVanBan.sort((a, b) => (a.soCongVan < b.soCongVan) ? 1 : ((b.soCongVan < a.soCongVan) ? -1 : 0));
            }
        } else if (key === 5) {
            if (type === 1) {
                temp = this.state.arrVanBan.sort((a, b) => (a.tapTin > b.tapTin) ? 1 : ((b.tapTin > a.tapTin) ? -1 : 0));
            } else {
                temp = this.state.arrVanBan.sort((a, b) => (a.tapTin < b.tapTin) ? 1 : ((b.tapTin < a.tapTin) ? -1 : 0));
            }
        } else if (key === 6) {
            if (type === 1) {
                temp = this.state.arrVanBan.sort((a, b) => (a.trangThai > b.trangThai) ? 1 : ((b.trangThai > a.trangThai) ? -1 : 0));
            } else {
                temp = this.state.arrVanBan.sort((a, b) => (a.trangThai < b.trangThai) ? 1 : ((b.trangThai < a.trangThai) ? -1 : 0));
            }
        }
        this.setState({ arrVanBan: temp, up: type === 0 ? 1 : 0 });
    };

    onChangeFindName = e => {
        this.setState({ findName: e.target.value });
    }

    onClickFindName = e => {
        this.props.getDanhSachVanBanTheoNoiDungTrichYeu_DonVi_Nam(this.state.findName, this.state.ma_don_vi, this.state.nam_vb);
    }

    onKeyPressFindName = e => {
        if (e.charCode === 13) {
            this.props.getDanhSachVanBanTheoNoiDungTrichYeu_DonVi_Nam(this.state.findName, this.state.ma_don_vi, this.state.nam_vb);
        }
    }

    handleSelectTinhThanh = (event: React.FormEvent<HTMLSelectElement>) => {
        const element = event.target as HTMLSelectElement;
        this.setState({ ma_tinh_thanh: element.value });
        this.props.getDanhSachDonVi(element.value);
        // this.props.getDanhSachVanBan(this.state.ma_don_vi, this.state.nam_vb);
    }

    handleSelectDonVi = (event: React.FormEvent<HTMLSelectElement>) => {
        const element = event.target as HTMLSelectElement;
        this.setState({ ma_don_vi: element.value });
        // this.props.getDanhSachVanBan(element.value, this.state.nam_vb);
    }

    handleSelectNam = (event: React.FormEvent<HTMLSelectElement>) => {
        const element = event.target as HTMLSelectElement;
        this.setState({ nam_vb: element.value });
        this.props.getDanhSachVanBan(this.state.ma_don_vi, element.value);
    }

    toggleActive = vanBan => () => {
        this.props.updateVanBan({
            ...vanBan,
            trangThai: vanBan.trangThai === 0 ? 1 : 0
        });
    };
    render() {
        const { ds_tinh_thanh, ds_don_vi, ds_van_ban, match, totalItems } = this.props;
        return (
            <div>
                <table style={ { width: '100%' } }>
                    <tr>
                        <td>
                            <div>
                                <label style={ { fontWeight: 900 } }>Tỉnh thành</label>&nbsp;
                                <select style={ { borderColor: '#0066ff', borderRadius: '5px', width: 150 } } id="maTinhThanh"
                                        onChange={ this.handleSelectTinhThanh } value={this.state.ma_tinh_thanh}>
                                    <option value="-1">--Chọn tỉnh thành</option>
                                    {
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
                                <label style={ { fontWeight: 900 } }>Đơn vị</label>&nbsp;
                                <select style={ { borderColor: '#0066ff', borderRadius: '5px', width: 350 } }
                                        id="donVi" onChange={ this.handleSelectDonVi } value={this.state.ma_don_vi}>
                                    <option value="-1">--Chọn đơn vị</option>
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
                                <label style={ { fontWeight: 900 } }>Năm</label>&nbsp;
                                <select id="nam" style={ { borderColor: '#0066ff', borderRadius: '5px', width: 150 } }
                                        onChange={ this.handleSelectNam } value={this.state.nam_vb}>
                                    <option value="-1">--Chọn năm</option>
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
                <h2>
                        Danh sách văn bản chỉ đạo tuyến
                        <Link to={`/van-ban/them-moi/${this.state.ma_tinh_thanh}/${this.state.ma_don_vi}/${this.state.nam_vb}`} className="btn btn-primary float-right jh-create-entity">
                            <FontAwesomeIcon icon="plus" /> Thêm mới văn bản chỉ đạo tuyến
                        </Link>
                </h2>
                <Row>
                    <input placeholder="Nhập nội dung trích yếu cần tìm..."
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
                            Nội dung trích yếu
                            &nbsp;
                            <FontAwesomeIcon icon="sort" style={ { color: '#0066ff' } }/>
                        </th>
                        <th className="hand" onClick={this.sortDanhSach(1, this.state.up)}>
                            Cơ quan ban hành
                            &nbsp;
                            <FontAwesomeIcon icon="sort" style={ { color: '#0066ff' } }/>
                        </th>
                        <th className="hand" onClick={this.sortDanhSach(1, this.state.up)}>
                            Ngày ban hành
                            &nbsp;
                            <FontAwesomeIcon icon="sort" style={ { color: '#0066ff' } }/>
                        </th>
                        <th className="hand" onClick={this.sortDanhSach(1, this.state.up)}>
                            Số công văn
                            &nbsp;
                            <FontAwesomeIcon icon="sort" style={ { color: '#0066ff' } }/>
                        </th>
                        <th className="hand" onClick={this.sortDanhSach(1, this.state.up)}>
                            Tập tin
                            &nbsp;
                            <FontAwesomeIcon icon="sort" style={ { color: '#0066ff' } }/>
                        </th>
                        <th className="hand" onClick={this.sortDanhSach(1, this.state.up)}>
                            Trạng thái
                            &nbsp;
                            <FontAwesomeIcon icon="sort" style={ { color: '#0066ff' } }/>
                        </th>
                        <th />
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.arrVanBan.map((vanBan, i) => (
                        <tr key={`user-${i}`}>
                            <td>{vanBan.noiDungTrichYeu}</td>
                            <td>{vanBan.tenCoQuan}</td>
                            <td>{vanBan.ngayBanHanh}</td>
                            <td>{vanBan.soCongVan}</td>
                            <td>{vanBan.tapTin}</td>
                            <td>
                                {vanBan.trangThai === 1 ? (
                                    <Button color="success" onClick={this.toggleActive(vanBan)}>
                                        Hoạt động
                                    </Button>
                                ) : (
                                    <Button color="danger" onClick={this.toggleActive(vanBan)}>
                                        Không hoạt động
                                    </Button>
                                )}
                            </td>
                            <td className="text-right">
                                <div className="btn-group flex-btn-group-container">
                                    <Button tag={Link} to={`/van-ban/${vanBan.maVanBan}/${this.state.ma_tinh_thanh}/${this.state.ma_don_vi}/${this.state.nam_vb}`} color="info" size="sm">
                                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">Xem</span>
                                    </Button>
                                    <Button tag={Link} to={`/van-ban/${vanBan.maVanBan}/them-moi/${this.state.ma_tinh_thanh}/${this.state.ma_don_vi}/${this.state.nam_vb}`} color="primary" size="sm">
                                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Sửa</span>
                                    </Button>
                                    <Button
                                        tag={Link}
                                        to={`/van-ban/${vanBan.maVanBan}/xoa`}
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
    ds_tinh_thanh: storeState.vanban.ds_tinh_thanh,
    ds_don_vi: storeState.vanban.ds_don_vi,
    ds_nam: storeState.vanban.ds_nam,
    ds_van_ban: storeState.vanban.ds_van_ban,
    totalItems: storeState.vanban.totalItems
});

const mapDispatchToProps = { getDanhSachTinhThanh, getDanhSachVanBanTheoNoiDungTrichYeu_DonVi_Nam, getDanhSachDonVi,
    getDanhSachNam, getDanhSachVanBan, getVanBan, updateVanBan, printDSVB, reset };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DanhSachVanBan);
