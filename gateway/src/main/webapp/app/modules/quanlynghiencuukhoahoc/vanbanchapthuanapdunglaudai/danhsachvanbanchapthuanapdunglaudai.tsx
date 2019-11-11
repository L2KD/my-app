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
import { getDanhSachVanBanChapThuanApDungLauDai, getDanhSachVanBanChapNhanApDungLauDaiTheoTen_DonVi_Nam_TrangThai, getDanhSachDonVi, getDanhSachTinhThanh } from './vanbanchapthuanapdunglaudai.reducer';
import { IRootState } from 'app/shared/reducers';
import { IVanBanChapThuanApDungLauDai } from 'app/modules/quanlynghiencuukhoahoc/vanbanchapthuanapdunglaudai/vanbanchapthuanapdunglaudai.model';

export interface IHienThiDanhSachVanBanChapThuanApDungLauDaiProps extends StateProps, DispatchProps, RouteComponentProps<{
    tinhthanh: string, donvi: string, nam: string, trangthai: string }> {}

export interface IVanBanChapThuanApDungLauDaiState extends IPaginationBaseState {
    ma_tinh_thanh: string;
    ma_don_vi: string;
    nam_xd: string;
    ds_nam: any;
    trang_thai: any;
    arrVanBanChapThuanApDungLauDai: IVanBanChapThuanApDungLauDai[];
    currentPage: any;
    maxPage: any;
    findName: any;
    up: any;
}

export class DanhSachVanBanChapThuanApDungLauDai extends React.Component<IHienThiDanhSachVanBanChapThuanApDungLauDaiProps, IVanBanChapThuanApDungLauDaiState> {
    state: IVanBanChapThuanApDungLauDaiState = {
        ...getSortState(this.props.location, ITEMS_PER_PAGE),
        ma_tinh_thanh: this.props.match.params.tinhthanh,
        ma_don_vi: this.props.match.params.donvi,
        nam_xd: this.props.match.params.nam,
        ds_nam: [],
        trang_thai: this.props.match.params.trangthai,
        arrVanBanChapThuanApDungLauDai: [],
        currentPage: 1,
        maxPage: 1,
        findName: '',
        up: 0
    };

    componentDidMount() {
        // this.layDanhSachVanBanChapThuanApDungLauDai();
        this.props.getDanhSachTinhThanh();
        if (!(this.props.match.params.tinhthanh === undefined)) {
            this.props.getDanhSachDonVi(this.props.match.params.tinhthanh);
        }
        if (!(this.props.match.params.donvi === undefined) && !(this.props.match.params.nam === undefined) &&
            !(this.props.match.params.trangthai === undefined)) {
            this.props.getDanhSachVanBanChapThuanApDungLauDai(this.props.match.params.donvi, this.props.match.params.nam, this.props.match.params.trangthai);
        }
        const year = new Date().getFullYear();
        const val = [];
        for (let i = year - 5; i <= year + 5; i++) {
            val.push(i);
        }
        this.setState({ ds_nam: val });
    }
    componentWillReceiveProps(nextProps: Readonly<IHienThiDanhSachVanBanChapThuanApDungLauDaiProps>, nextContext: any): void {
        const value = [];
        nextProps.ds_van_ban.map((ele, i) => {
            value.push(ele);
        });
        this.setState({ arrVanBanChapThuanApDungLauDai: value,
            maxPage: nextProps.ds_van_ban.length % 10 > 0 ? parseInt((nextProps.ds_van_ban.length / 10 + 1).toString(), 10) :
                nextProps.ds_van_ban.length === 0 ? 1 : parseInt((nextProps.ds_van_ban.length / 10).toString(), 10)
        });
        if (this.state.maxPage < 1) {
            this.setState({ maxPage: 1 });
        }
        const trang = this.state.currentPage;
        const size = nextProps.ds_van_ban.length;
        if (size < 10) {
            this.setState({ arrVanBanChapThuanApDungLauDai: value });
        } else if ((trang - 1) * 10 > size) {
            this.setState({ arrVanBanChapThuanApDungLauDai: nextProps.ds_van_ban.slice(size - size % 10, size + 1) });
        } else if (trang * 10 > size) {
            this.setState({ arrVanBanChapThuanApDungLauDai: nextProps.ds_van_ban.slice((trang - 1) * 10, size + 1) });
        } else {
            this.setState({ arrVanBanChapThuanApDungLauDai: nextProps.ds_van_ban.slice((trang - 1) * 10, trang * 10) });
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
        const size = this.props.ds_van_ban.length;
        if (size < 10) {
            this.setState({ arrVanBanChapThuanApDungLauDai: this.state.arrVanBanChapThuanApDungLauDai });
        } else if ((trang - 1) * 10 > size) {
            this.setState({ arrVanBanChapThuanApDungLauDai: this.props.ds_van_ban.slice(size - size % 10, size + 1) });
        } else if (trang * 10 > size) {
            this.setState({ arrVanBanChapThuanApDungLauDai: this.props.ds_van_ban.slice((trang - 1) * 10, size + 1) });
        } else {
            this.setState({ arrVanBanChapThuanApDungLauDai: this.props.ds_van_ban.slice((trang - 1) * 10, trang * 10) });
        }
    }

    sortDanhSach = (key, type) => () => {
        let temp = this.state.arrVanBanChapThuanApDungLauDai;
        if (key === 1) {
            if (type === 1) {
                temp = this.state.arrVanBanChapThuanApDungLauDai.sort((a, b) => (a.tenDeTai > b.tenDeTai) ? 1 : ((b.tenDeTai > a.tenDeTai) ? -1 : 0));
            } else {
                temp = this.state.arrVanBanChapThuanApDungLauDai.sort((a, b) => (a.tenDeTai < b.tenDeTai) ? 1 : ((b.tenDeTai < a.tenDeTai) ? -1 : 0));
            }
        } else if (key === 2) {
            if (type === 1) {
                temp = this.state.arrVanBanChapThuanApDungLauDai.sort((a, b) => (a.tenLoaiDeTai > b.tenLoaiDeTai) ? 1 : ((b.tenLoaiDeTai > a.tenLoaiDeTai) ? -1 : 0));
            } else {
                temp = this.state.arrVanBanChapThuanApDungLauDai.sort((a, b) => (a.tenLoaiDeTai < b.tenLoaiDeTai) ? 1 : ((b.tenLoaiDeTai < a.tenLoaiDeTai) ? -1 : 0));
            }
        } else if (key === 3) {
            if (type === 1) {
                temp = this.state.arrVanBanChapThuanApDungLauDai.sort((a, b) => (a.tenHangDeTai > b.tenHangDeTai) ? 1 : ((b.tenHangDeTai > a.tenHangDeTai) ? -1 : 0));
            } else {
                temp = this.state.arrVanBanChapThuanApDungLauDai.sort((a, b) => (a.tenHangDeTai < b.tenHangDeTai) ? 1 : ((b.tenHangDeTai < a.tenHangDeTai) ? -1 : 0));
            }
        } else if (key === 4) {
            if (type === 1) {
                temp = this.state.arrVanBanChapThuanApDungLauDai.sort((a, b) => (a.tenChuThe > b.tenChuThe) ? 1 : ((b.tenChuThe > a.tenChuThe) ? -1 : 0));
            } else {
                temp = this.state.arrVanBanChapThuanApDungLauDai.sort((a, b) => (a.tenChuThe < b.tenChuThe) ? 1 : ((b.tenChuThe < a.tenChuThe) ? -1 : 0));
            }
        } else if (key === 5) {
            if (type === 1) {
                temp = this.state.arrVanBanChapThuanApDungLauDai.sort((a, b) => (a.tenNhomDeTai > b.tenNhomDeTai) ? 1 : ((b.tenNhomDeTai > a.tenNhomDeTai) ? -1 : 0));
            } else {
                temp = this.state.arrVanBanChapThuanApDungLauDai.sort((a, b) => (a.tenNhomDeTai < b.tenNhomDeTai) ? 1 : ((b.tenNhomDeTai < a.tenNhomDeTai) ? -1 : 0));
            }
        } else if (key === 6) {
            if (type === 1) {
                temp = this.state.arrVanBanChapThuanApDungLauDai.sort((a, b) => (a.trangThai > b.trangThai) ? 1 : ((b.trangThai > a.trangThai) ? -1 : 0));
            } else {
                temp = this.state.arrVanBanChapThuanApDungLauDai.sort((a, b) => (a.trangThai < b.trangThai) ? 1 : ((b.trangThai < a.trangThai) ? -1 : 0));
            }
        } else if (key === 7) {
            if (type === 1) {
                temp = this.state.arrVanBanChapThuanApDungLauDai.sort((a, b) => (a.tapTin > b.tapTin) ? 1 : ((b.tapTin > a.tapTin) ? -1 : 0));
            } else {
                temp = this.state.arrVanBanChapThuanApDungLauDai.sort((a, b) => (a.tapTin < b.tapTin) ? 1 : ((b.tapTin < a.tapTin) ? -1 : 0));
            }
        }
        this.setState({ arrVanBanChapThuanApDungLauDai: temp, up: type === 0 ? 1 : 0 });
    };

    onChangeFindName = e => {
        this.setState({ findName: e.target.value });
    }

    onClickFindName = e => {
        this.props.getDanhSachVanBanChapNhanApDungLauDaiTheoTen_DonVi_Nam_TrangThai(this.state.findName, this.state.ma_don_vi, this.state.nam_xd, this.state.trang_thai);
    }

    onKeyPressFindName = e => {
        if (e.charCode === 13) {
            this.props.getDanhSachVanBanChapNhanApDungLauDaiTheoTen_DonVi_Nam_TrangThai(this.state.findName, this.state.ma_don_vi, this.state.nam_xd, this.state.trang_thai);
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
        if (!(this.state.nam_xd === undefined || this.state.nam_xd === null || this.state.nam_xd === '' || this.state.nam_xd === '-1')) {
            this.layDanhSachVanBanChapThuanApDungLauDai(element.value, this.state.nam_xd, this.state.trang_thai);
        }
    }

    handleSelectNam = (event: React.FormEvent<HTMLSelectElement>) => {
        const element = event.target as HTMLSelectElement;
        this.setState({ nam_xd: element.value });
        /*if (!(this.state.ma_don_vi === undefined || this.state.ma_don_vi === null || this.state.ma_don_vi === '' || this.state.ma_don_vi === '-1')) {
            this.layDanhSachVanBanChapThuanApDungLauDai(element.value, this.state.nam_xd, this.state.trang_thai);
        }*/
    }
    handleSelectTrangThai = (event: React.FormEvent<HTMLSelectElement>) => {
        const element = event.target as HTMLSelectElement;
        this.setState({ trang_thai: element.value });
        if (!(element.value === '-1')) {
            this.layDanhSachVanBanChapThuanApDungLauDai(this.state.ma_don_vi, this.state.nam_xd, element.value);
        }
    }
    layDanhSachVanBanChapThuanApDungLauDai = (donvi: any, nam: any, trangthai: any) => {
        // const { activePage, itemsPerPage, sort, order } = this.state;
        this.props.getDanhSachVanBanChapThuanApDungLauDai(donvi, nam, trangthai);
    };

    render() {
        const { ds_van_ban, ds_tinh_thanh, ds_don_vi, match, totalItems } = this.props;
        return (
            <div>
                <table style={ { width: '100%' } }>
                    <tr>
                        <td>
                            <div>
                                <label style={ { fontWeight: 'bold' } }>Tỉnh thành</label>&nbsp;
                                <select id="maTinhThanh" style={ { borderColor: '#0066ff', borderRadius: '5px', width: 150 } }
                                        onChange={ this.handleSelectTinhThanh } value={this.state.ma_tinh_thanh}>
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
                                <select id="donVi" style={ { borderColor: '#0066ff', borderRadius: '5px', width: 350 } }
                                        onChange={ this.handleSelectDonVi } value={this.state.ma_don_vi}>
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
                                <select id="nam" style={ { borderColor: '#0066ff', borderRadius: '5px', width: 150 } }
                                        onChange={ this.handleSelectNam } value={this.state.nam_xd}>
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
                        <td>
                            <div>
                                <label style={ { fontWeight: 'bold' } }>Trạng thái</label>&nbsp;
                                <select id="trangThai" style={ { borderColor: '#0066ff', borderRadius: '5px', width: 150 } }
                                        onChange={ this.handleSelectTrangThai } value={this.state.trang_thai}>
                                    <option value="-1" selected>--Chọn trạng thái</option>
                                    <option value="1">Đã cho phép đề tài ứng dụng cho đơn vị</option>
                                    <option value="2">Đã cập nhật biên bản kế hoạch</option>
                                </select>
                            </div>
                        </td>
                    </tr>
                    <br />
                </table>
                <h2 id="user-management-page-heading">
                    Danh sách đề tài ứng dụng tại đơn vị
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
                            Tên đề tài/sáng kiến
                            &nbsp;
                            <FontAwesomeIcon icon="sort" style={ { color: '#0066ff' } }/>
                        </th>
                        <th className="hand" onClick={this.sortDanhSach(2, this.state.up)}>
                            Loại đề tài
                            &nbsp;
                            <FontAwesomeIcon icon="sort" style={ { color: '#0066ff' } }/>
                        </th>
                        <th className="hand" onClick={this.sortDanhSach(3, this.state.up)}>
                            Hạng đề tài
                            &nbsp;
                            <FontAwesomeIcon icon="sort" style={ { color: '#0066ff' } }/>
                        </th>
                        <th className="hand" onClick={this.sortDanhSach(4, this.state.up)}>
                            Chủ thể
                            &nbsp;
                            <FontAwesomeIcon icon="sort" style={ { color: '#0066ff' } }/>
                        </th>
                        <th className="hand" onClick={this.sortDanhSach(5, this.state.up)}>
                            Nhóm đề tài
                            &nbsp;
                            <FontAwesomeIcon icon="sort" style={ { color: '#0066ff' } }/>
                        </th>
                        <th className="hand" onClick={this.sortDanhSach(6, this.state.up)}>
                            Trạng thái
                            &nbsp;
                            <FontAwesomeIcon icon="sort" style={ { color: '#0066ff' } }/>
                        </th>
                        <th style={ { width: '20%' } } className="hand" onClick={this.sortDanhSach(7, this.state.up)}>
                            Tập tin biên bản
                            &nbsp;
                            <FontAwesomeIcon icon="sort" style={ { color: '#0066ff' } }/>
                        </th>
                        <th />
                    </tr>
                    </thead>
                    <tbody>
                    {
                        ds_van_ban.map((vanBanChapThuanApDungLauDai, i) => (
                            <tr>
                                <td>{vanBanChapThuanApDungLauDai.tenDeTai}</td>
                                <td>{vanBanChapThuanApDungLauDai.tenLoaiDeTai}</td>
                                <td>{vanBanChapThuanApDungLauDai.tenHangDeTai}</td>
                                <td>{vanBanChapThuanApDungLauDai.tenChuThe}</td>
                                <td>{vanBanChapThuanApDungLauDai.tenNhomDeTai}</td>
                                <td style={ { width: '20%' } }>
                                    {
                                        vanBanChapThuanApDungLauDai.trangThai === 1 ?
                                            (<span style={ { color: 'white', borderRadius: '5px', padding: '1px', backgroundColor: 'blue' } }>
                                                Đã cho phép đề tài ứng dụng vào đơn vị</span>) :
                                            (<span style={ { color: 'white', borderRadius: '5px', padding: '1px', backgroundColor: 'green' } }>
                                                Đã cập nhật văn bản chấp thuận áp dụng lâu dài</span>)
                                    }
                                </td>
                                <td style={ { width: '10%' } }>
                                    {
                                        vanBanChapThuanApDungLauDai.tapTin
                                    }
                                </td>
                                <td className="text-right">
                                    <div className="btn-group flex-btn-group-container">
                                        <Button tag={Link} to={`/quan-ly-nckh/van-ban-chap-thuan-ap-dung-lau-dai/${vanBanChapThuanApDungLauDai.maDeTai}/${this.state.ma_don_vi}/${this.state.nam_xd}/${this.state.trang_thai}/cap-nhat-van-ban`} color="warning" size="sm">
                                            <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">Cập nhật biên bản</span>
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
    ds_van_ban: storeState.vanbanchapthuanapdunglaudai.ds_van_ban_chap_thuan_ap_dung_lau_dai,
    ds_tinh_thanh: storeState.vanbanchapthuanapdunglaudai.ds_tinh_thanh,
    ds_don_vi: storeState.vanbanchapthuanapdunglaudai.ds_don_vi,
    totalItems: storeState.vanbanchapthuanapdunglaudai.totalItems
});

const mapDispatchToProps = { getDanhSachVanBanChapThuanApDungLauDai, getDanhSachVanBanChapNhanApDungLauDaiTheoTen_DonVi_Nam_TrangThai, getDanhSachDonVi, getDanhSachTinhThanh };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DanhSachVanBanChapThuanApDungLauDai);
