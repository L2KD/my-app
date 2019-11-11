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
import { getDanhSachXetDuyetBaoCaoTongKet, getDanhSachXetDuyetBaoCaoTongKetTheoTen_DonVi_Nam_TrangThai,
    getDanhSachDonVi, getDanhSachTinhThanh, reset } from './xetduyetbaocaotongket.reducer';
import { IRootState } from 'app/shared/reducers';
import { IXetDuyetBaoCaoTongKet } from 'app/modules/quanlynghiencuukhoahoc/xetduyetbaocaotongket/xetduyetbaocaotongket.model';

export interface IHienThiDanhSachXetDuyetBaoCaoTongKetProps extends StateProps, DispatchProps, RouteComponentProps<{
    tinhthanh: string, donvi: string, nam: string, trangthai: string
}> {}

export interface IXetDuyetBaoCaoTongKetState extends IPaginationBaseState {
    ma_tinh_thanh: string;
    ma_don_vi: string;
    nam_xd: string;
    ds_nam: any;
    trang_thai: any;
    arrXetDuyetBaoCaoTongKet: IXetDuyetBaoCaoTongKet[];
    currentPage: any;
    maxPage: any;
    findName: any;
    up: any;
}

export class DanhSachXetDuyetBaoCaoTongKet extends React.Component<IHienThiDanhSachXetDuyetBaoCaoTongKetProps, IXetDuyetBaoCaoTongKetState> {
    state: IXetDuyetBaoCaoTongKetState = {
        ...getSortState(this.props.location, ITEMS_PER_PAGE),
        ma_tinh_thanh: this.props.match.params.tinhthanh,
        ma_don_vi: this.props.match.params.donvi,
        nam_xd: this.props.match.params.nam,
        ds_nam: [],
        trang_thai: this.props.match.params.trangthai,
        arrXetDuyetBaoCaoTongKet: [],
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
        if (!(this.props.match.params.tinhthanh === undefined)) {
            this.props.getDanhSachDonVi(this.props.match.params.tinhthanh);
        }
        if (!(this.props.match.params.donvi === undefined) && !(this.props.match.params.nam === undefined) &&
            !(this.props.match.params.trangthai === undefined)) {
            this.props.getDanhSachXetDuyetBaoCaoTongKet(this.props.match.params.donvi, this.props.match.params.nam, this.props.match.params.trangthai);
        }
        const year = new Date().getFullYear();
        const val = [];
        for (let i = year - 5; i <= year + 5; i++) {
            val.push(i);
        }
        this.setState({ ds_nam: val });
    }

    componentWillReceiveProps(nextProps: Readonly<IHienThiDanhSachXetDuyetBaoCaoTongKetProps>, nextContext: any): void {
        const value = [];
        nextProps.ds_xet_duyet_bao_cao_tong_ket.map((ele, i) => {
            value.push(ele);
        });
        this.setState({ arrXetDuyetBaoCaoTongKet: value,
            maxPage: nextProps.ds_xet_duyet_bao_cao_tong_ket.length % 10 > 0 ? parseInt((nextProps.ds_xet_duyet_bao_cao_tong_ket.length / 10 + 1).toString(), 10) :
                nextProps.ds_xet_duyet_bao_cao_tong_ket.length === 0 ? 1 : parseInt((nextProps.ds_xet_duyet_bao_cao_tong_ket.length / 10).toString(), 10)
        });
        if (this.state.maxPage < 1) {
            this.setState({ maxPage: 1 });
        }
        const trang = this.state.currentPage;
        const size = nextProps.ds_xet_duyet_bao_cao_tong_ket.length;
        if (size < 10) {
            this.setState({ arrXetDuyetBaoCaoTongKet: value });
        } else if ((trang - 1) * 10 > size) {
            this.setState({ arrXetDuyetBaoCaoTongKet: nextProps.ds_xet_duyet_bao_cao_tong_ket.slice(size - size % 10, size + 1) });
        } else if (trang * 10 > size) {
            this.setState({ arrXetDuyetBaoCaoTongKet: nextProps.ds_xet_duyet_bao_cao_tong_ket.slice((trang - 1) * 10, size + 1) });
        } else {
            this.setState({ arrXetDuyetBaoCaoTongKet: nextProps.ds_xet_duyet_bao_cao_tong_ket.slice((trang - 1) * 10, trang * 10) });
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
        const size = this.props.ds_xet_duyet_bao_cao_tong_ket.length;
        if (size < 10) {
            this.setState({ arrXetDuyetBaoCaoTongKet: this.state.arrXetDuyetBaoCaoTongKet });
        } else if ((trang - 1) * 10 > size) {
            this.setState({ arrXetDuyetBaoCaoTongKet: this.props.ds_xet_duyet_bao_cao_tong_ket.slice(size - size % 10, size + 1) });
        } else if (trang * 10 > size) {
            this.setState({ arrXetDuyetBaoCaoTongKet: this.props.ds_xet_duyet_bao_cao_tong_ket.slice((trang - 1) * 10, size + 1) });
        } else {
            this.setState({ arrXetDuyetBaoCaoTongKet: this.props.ds_xet_duyet_bao_cao_tong_ket.slice((trang - 1) * 10, trang * 10) });
        }
    }

    sortDanhSach = (key, type) => () => {
        let temp = this.state.arrXetDuyetBaoCaoTongKet;
        if (key === 1) {
            if (type === 1) {
                temp = this.state.arrXetDuyetBaoCaoTongKet.sort((a, b) => (a.tenDeTai > b.tenDeTai) ? 1 : ((b.tenDeTai > a.tenDeTai) ? -1 : 0));
            } else {
                temp = this.state.arrXetDuyetBaoCaoTongKet.sort((a, b) => (a.tenDeTai < b.tenDeTai) ? 1 : ((b.tenDeTai < a.tenDeTai) ? -1 : 0));
            }
        } else if (key === 2) {
            if (type === 1) {
                temp = this.state.arrXetDuyetBaoCaoTongKet.sort((a, b) => (a.noiDungGopY > b.noiDungGopY) ? 1 : ((b.noiDungGopY > a.noiDungGopY) ? -1 : 0));
            } else {
                temp = this.state.arrXetDuyetBaoCaoTongKet.sort((a, b) => (a.noiDungGopY < b.noiDungGopY) ? 1 : ((b.noiDungGopY < a.noiDungGopY) ? -1 : 0));
            }
        } else if (key === 3) {
            if (type === 1) {
                temp = this.state.arrXetDuyetBaoCaoTongKet.sort((a, b) => (a.ngayXetDuyet > b.ngayXetDuyet) ? 1 : ((b.ngayXetDuyet > a.ngayXetDuyet) ? -1 : 0));
            } else {
                temp = this.state.arrXetDuyetBaoCaoTongKet.sort((a, b) => (a.ngayXetDuyet < b.ngayXetDuyet) ? 1 : ((b.ngayXetDuyet < a.ngayXetDuyet) ? -1 : 0));
            }
        } else if (key === 4) {
            if (type === 1) {
                temp = this.state.arrXetDuyetBaoCaoTongKet.sort((a, b) => (a.ngayDangKy > b.ngayDangKy) ? 1 : ((b.ngayDangKy > a.ngayDangKy) ? -1 : 0));
            } else {
                temp = this.state.arrXetDuyetBaoCaoTongKet.sort((a, b) => (a.ngayDangKy < b.ngayDangKy) ? 1 : ((b.ngayDangKy < a.ngayDangKy) ? -1 : 0));
            }
        } else if (key === 5) {
            if (type === 1) {
                temp = this.state.arrXetDuyetBaoCaoTongKet.sort((a, b) => (a.trangThai > b.trangThai) ? 1 : ((b.trangThai > a.trangThai) ? -1 : 0));
            } else {
                temp = this.state.arrXetDuyetBaoCaoTongKet.sort((a, b) => (a.trangThai < b.trangThai) ? 1 : ((b.trangThai < a.trangThai) ? -1 : 0));
            }
        } else if (key === 6) {
            if (type === 1) {
                temp = this.state.arrXetDuyetBaoCaoTongKet.sort((a, b) => (a.xetDuyet > b.xetDuyet) ? 1 : ((b.xetDuyet > a.xetDuyet) ? -1 : 0));
            } else {
                temp = this.state.arrXetDuyetBaoCaoTongKet.sort((a, b) => (a.xetDuyet < b.xetDuyet) ? 1 : ((b.xetDuyet < a.xetDuyet) ? -1 : 0));
            }
        }
        this.setState({ arrXetDuyetBaoCaoTongKet: temp, up: type === 0 ? 1 : 0 });
    };

    onChangeFindName = e => {
        this.setState({ findName: e.target.value });
    }

    onClickFindName = e => {
        this.props.getDanhSachXetDuyetBaoCaoTongKetTheoTen_DonVi_Nam_TrangThai(this.state.findName, this.state.ma_don_vi, this.state.nam_xd, this.state.trang_thai);
    }

    onKeyPressFindName = e => {
        if (e.charCode === 13) {
            this.props.getDanhSachXetDuyetBaoCaoTongKetTheoTen_DonVi_Nam_TrangThai(this.state.findName, this.state.ma_don_vi, this.state.nam_xd, this.state.trang_thai);
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
    }

    handleSelectNam = (event: React.FormEvent<HTMLSelectElement>) => {
        const element = event.target as HTMLSelectElement;
        this.setState({ nam_xd: element.value });
    }
    handleSelectTrangThai = (event: React.FormEvent<HTMLSelectElement>) => {
        const element = event.target as HTMLSelectElement;
        this.setState({ trang_thai: element.value });
        if (!(element.value === '-1')) {
            this.layDanhSachXetDuyetBaoCaoTongKet(this.state.ma_don_vi, this.state.nam_xd, element.value);
        }
    }
    layDanhSachXetDuyetBaoCaoTongKet = (donvi: any, nam: any, trangthai: any) => {
        // const { activePage, itemsPerPage, sort, order } = this.state;
        this.props.getDanhSachXetDuyetBaoCaoTongKet(donvi, nam, trangthai);
    };

    render() {
        const { ds_xet_duyet_bao_cao_tong_ket, ds_tinh_thanh, ds_don_vi, match, totalItems } = this.props;
        function TinhTrangDuyet(trangThai: number) {
            if (trangThai === 1) {
                return (<span style={ { color: 'white', borderRadius: '5px', padding: '1px', backgroundColor: 'green' } }>Duyệt</span>);
            } else if (trangThai === 2) {
                return (<span style={ { color: 'white', borderRadius: '5px', padding: '1px', backgroundColor: 'gray' } }>Không duyệt</span>);
            } else if (trangThai === 3) {
                return (<span style={ { color: 'white', borderRadius: '5px', padding: '1px', backgroundColor: 'blue' } }>Chờ duyệt</span>);
            }
        }
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
                                    <option value="1">Đã xét duyệt đề cương</option>
                                    <option value="2">Đã xét duyệt báo cáo tổng kết</option>
                                </select>
                            </div>
                        </td>
                    </tr>
                    <br />
                </table>
                <h2 id="user-management-page-heading">
                    Danh sách xét duyệt bác cáo tổng kết
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
                            Nội dung góp ý
                            &nbsp;
                            <FontAwesomeIcon icon="sort" style={ { color: '#0066ff' } }/>
                        </th>
                        <th className="hand" onClick={this.sortDanhSach(3, this.state.up)}>
                            Ngày xét duyệt
                            &nbsp;
                            <FontAwesomeIcon icon="sort" style={ { color: '#0066ff' } }/>
                        </th>
                        <th className="hand" onClick={this.sortDanhSach(4, this.state.up)}>
                            Ngày đăng ký
                            &nbsp;
                            <FontAwesomeIcon icon="sort" style={ { color: '#0066ff' } }/>
                        </th>
                        <th className="hand" onClick={this.sortDanhSach(5, this.state.up)}>
                            Trạng thái
                            &nbsp;
                            <FontAwesomeIcon icon="sort" style={ { color: '#0066ff' } }/>
                        </th>
                        <th className="hand" onClick={this.sortDanhSach(6, this.state.up)}>
                            Duyệt
                            &nbsp;
                            <FontAwesomeIcon icon="sort" style={ { color: '#0066ff' } }/>
                        </th>
                        <th />
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.arrXetDuyetBaoCaoTongKet.map((xetDuyetBaoCaoTongKet, i) => (
                            <tr>
                                <td>{xetDuyetBaoCaoTongKet.tenDeTai}</td>
                                <td>{xetDuyetBaoCaoTongKet.noiDungGopY}</td>
                                <td>{xetDuyetBaoCaoTongKet.ngayXetDuyet}</td>
                                <td>{xetDuyetBaoCaoTongKet.ngayDangKy}</td>
                                <td>
                                    {
                                        xetDuyetBaoCaoTongKet.trangThai === 1 ?
                                            (<span style={ { color: 'white', borderRadius: '5px', padding: '1px', backgroundColor: 'blue' } }>Đã xét duyệt đề cương</span>) :
                                            (<span style={ { color: 'white', borderRadius: '5px', padding: '1px', backgroundColor: 'green' } }>Đã xét duyệt báo cáo tổng kết</span>)
                                    }
                                </td>
                                <td>
                                    {
                                        // TinhTrangDuyet(xetDuyetBaoCaoTongKet.xetDuyet)
                                        xetDuyetBaoCaoTongKet.xetDuyet.toString() === '1' ?
                                            (<span style={ { color: 'white', borderRadius: '5px', padding: '1px', backgroundColor: 'green' } }>Duyệt</span>) :
                                            (
                                                xetDuyetBaoCaoTongKet.xetDuyet.toString() === '2' ?
                                                    (<span style={ { color: 'white', borderRadius: '5px', padding: '1px', backgroundColor: 'gray' } }>Không duyệt</span>) :
                                                    (<span style={ { color: 'white', borderRadius: '5px', padding: '1px', backgroundColor: 'blue' } }>Chờ duyệt</span>)
                                            )
                                    }
                                </td>
                                <td className="text-right">
                                    <div className="btn-group flex-btn-group-container">
                                        <Button tag={Link}
                                                to={`/quan-ly-nckh/xet-duyet-bao-cao-tong-ket/${xetDuyetBaoCaoTongKet.maDeTai}/${this.state.ma_tinh_thanh}/${this.state.ma_don_vi}/${this.state.nam_xd}/${this.state.trang_thai}`}
                                                color="info" size="sm">
                                            <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">Xem</span>
                                        </Button>
                                        <Button tag={Link}
                                                to={`/quan-ly-nckh/xet-duyet-bao-cao-tong-ket/${xetDuyetBaoCaoTongKet.maDeTai}/xet-duyet/${this.state.ma_tinh_thanh}/${this.state.ma_don_vi}/${this.state.nam_xd}/${this.state.trang_thai}`}
                                                color="primary" size="sm">
                                            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Xét duyệt</span>
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
    ds_xet_duyet_bao_cao_tong_ket: storeState.xetduyetbaocaotongket.ds_xet_duyet_bao_cao_tong_ket,
    ds_tinh_thanh: storeState.xetduyetbaocaotongket.ds_tinh_thanh,
    ds_don_vi: storeState.xetduyetbaocaotongket.ds_don_vi,
    totalItems: storeState.xetduyetbaocaotongket.totalItems
});

const mapDispatchToProps = { getDanhSachXetDuyetBaoCaoTongKet, getDanhSachDonVi, getDanhSachXetDuyetBaoCaoTongKetTheoTen_DonVi_Nam_TrangThai,
    getDanhSachTinhThanh, reset };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DanhSachXetDuyetBaoCaoTongKet);
