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
import { getDanhSachTinhThanh, getDanhSachDonVi, getDanhSachNam, getDanhSachKeHoach,
    getDanhSachCDT, getCDT, updateCDT, getDanhSachCDT_DonVi_Nam, reset } from './cdt.reducer';
import { IRootState } from 'app/shared/reducers';
import { ICDT } from 'app/modules/quanlychidaotuyen/chidaotuyen/cdt.model';

export interface IHienThiDanhSachCDTProps extends StateProps, DispatchProps, RouteComponentProps<{
    tinhthanh: string, donvi: string, nam: string, kehoach: string
}> {}

export interface ICDTState extends IPaginationBaseState {
    currentPage: any;
    maxPage: any;
    arrCDT: ICDT[];
    maTinhThanh: string;
    maDonVi: string;
    namCDT: string;
    maKeHoach: string;
    ds_nam: any;
    up: any;
}

export class DanhSachCDT extends React.Component<IHienThiDanhSachCDTProps, ICDTState, HTMLElement> {
    state: ICDTState = {
        ...getSortState(this.props.location, ITEMS_PER_PAGE),
        maTinhThanh: this.props.match.params.tinhthanh,
        maDonVi: this.props.match.params.donvi,
        namCDT: this.props.match.params.nam,
        maKeHoach: this.props.match.params.kehoach,
        ds_nam: [],
        arrCDT: [],
        currentPage: 1,
        maxPage: 1,
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
            this.props.getDanhSachKeHoach(this.props.match.params.donvi, this.props.match.params.nam);
        }
        if (this.props.match.params.tinhthanh !== undefined && this.props.match.params.donvi !== undefined &&
            this.props.match.params.nam !== undefined && this.props.match.params.kehoach !== undefined) {
            this.props.getDanhSachCDT(this.props.match.params.donvi, this.props.match.params.nam, this.props.match.params.kehoach);
        }
        const year = new Date().getFullYear();
        const val = [];
        for (let i = year - 5; i <= year + 5; i++) {
            val.push(i);
        }
        this.setState({ ds_nam: val });
    }
    componentWillReceiveProps(nextProps: Readonly<IHienThiDanhSachCDTProps>, nextContext: any): void {
        const value = [];
        nextProps.ds_cdt.map((ele, i) => {
            value.push(ele);
        });
        this.setState({ arrCDT: value,
            maxPage: nextProps.ds_cdt.length % 10 > 0 ? parseInt((nextProps.ds_cdt.length / 10 + 1).toString(), 10) :
                nextProps.ds_cdt.length === 0 ? 1 : parseInt((nextProps.ds_cdt.length / 10).toString(), 10)
        });
        if (this.state.maxPage < 1) {
            this.setState({ maxPage: 1 });
        }
        const trang = this.state.currentPage;
        const size = nextProps.ds_cdt.length;
        if (size < 10) {
            this.setState({ arrCDT: value });
        } else if ((trang - 1) * 10 > size) {
            this.setState({ arrCDT: nextProps.ds_cdt.slice(size - size % 10, size + 1) });
        } else if (trang * 10 > size) {
            this.setState({ arrCDT: nextProps.ds_cdt.slice((trang - 1) * 10, size + 1) });
        } else {
            this.setState({ arrCDT: nextProps.ds_cdt.slice((trang - 1) * 10, trang * 10) });
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
        const size = this.props.ds_cdt.length;
        if (size < 10) {
            this.setState({ arrCDT: this.state.arrCDT });
        } else if ((trang - 1) * 10 > size) {
            this.setState({ arrCDT: this.props.ds_cdt.slice(size - size % 10, size + 1) });
        } else if (trang * 10 > size) {
            this.setState({ arrCDT: this.props.ds_cdt.slice((trang - 1) * 10, size + 1) });
        } else {
            this.setState({ arrCDT: this.props.ds_cdt.slice((trang - 1) * 10, trang * 10) });
        }
    }

    sortDanhSach = (key, type) => () => {
        let temp = this.state.arrCDT;
        if (key === 1) {
            // key:  1: don_vi     2: don_vi_tiep_nhan     3: hinh_thuc     4: loai_cdt     5: ngay_thuc_hien      6: trang_thai
            // type: 1: tăng              2: giảm
            if (type === 1) {
                temp = this.state.arrCDT.sort((a, b) => (a.donVi > b.donVi) ? 1 : ((b.donVi > a.donVi) ? -1 : 0));
            } else {
                temp = this.state.arrCDT.sort((a, b) => (a.donVi < b.donVi) ? 1 : ((b.donVi < a.donVi) ? -1 : 0));
            }
        } else if (key === 2) {
            if (type === 1) {
                temp = this.state.arrCDT.sort((a, b) => (a.donViTiepNhan > b.donViTiepNhan) ? 1 : ((b.donViTiepNhan > a.donViTiepNhan) ? -1 : 0));
            } else {
                temp = this.state.arrCDT.sort((a, b) => (a.donViTiepNhan < b.donViTiepNhan) ? 1 : ((b.donViTiepNhan < a.donViTiepNhan) ? -1 : 0));
            }
        } else if (key === 3) {
            if (type === 1) {
                temp = this.state.arrCDT.sort((a, b) => (a.hinhThuc > b.hinhThuc) ? 1 : ((b.hinhThuc > a.hinhThuc) ? -1 : 0));
            } else {
                temp = this.state.arrCDT.sort((a, b) => (a.hinhThuc < b.hinhThuc) ? 1 : ((b.hinhThuc < a.hinhThuc) ? -1 : 0));
            }
        } else if (key === 4) {
            if (type === 1) {
                temp = this.state.arrCDT.sort((a, b) => (a.loaiCDT > b.loaiCDT) ? 1 : ((b.loaiCDT > a.loaiCDT) ? -1 : 0));
            } else {
                temp = this.state.arrCDT.sort((a, b) => (a.loaiCDT < b.loaiCDT) ? 1 : ((b.loaiCDT < a.loaiCDT) ? -1 : 0));
            }
        } else if (key === 5) {
            if (type === 1) {
                temp = this.state.arrCDT.sort((a, b) => (a.ngayThucHien > b.ngayThucHien) ? 1 : ((b.ngayThucHien > a.ngayThucHien) ? -1 : 0));
            } else {
                temp = this.state.arrCDT.sort((a, b) => (a.ngayThucHien < b.ngayThucHien) ? 1 : ((b.ngayThucHien < a.ngayThucHien) ? -1 : 0));
            }
        } else if (key === 6) {
            if (type === 1) {
                temp = this.state.arrCDT.sort((a, b) => (a.trangThai > b.trangThai) ? 1 : ((b.trangThai > a.trangThai) ? -1 : 0));
            } else {
                temp = this.state.arrCDT.sort((a, b) => (a.trangThai < b.trangThai) ? 1 : ((b.trangThai < a.trangThai) ? -1 : 0));
            }
        }
        this.setState({ arrCDT: temp, up: type === 0 ? 1 : 0 });
    };

    handleSelectTinhThanh = (event: React.FormEvent<HTMLSelectElement>) => {
        const element = event.target as HTMLSelectElement;
        this.setState({ maTinhThanh: element.value });
        if (!(element.value === '-1')) {
            this.props.getDanhSachDonVi(element.value);
        }
    }

    handleSelectDonVi = (event: React.FormEvent<HTMLSelectElement>) => {
        const element = event.target as HTMLSelectElement;
        this.setState({ maDonVi: element.value });
        if (!(this.state.namCDT === undefined || this.state.namCDT === null || this.state.namCDT === '' || this.state.namCDT === '-1')) {
            this.props.getDanhSachKeHoach(element.value, this.state.namCDT);
            if (!(this.state.maKeHoach === undefined || this.state.maKeHoach === null || this.state.maKeHoach === '' || this.state.maKeHoach === '-1')) {
                this.LayDanhSachCDT(element.value, this.state.namCDT, this.state.maKeHoach);
            }
        }
    }

    handleSelectNam = (event: React.FormEvent<HTMLSelectElement>) => {
        const element = event.target as HTMLSelectElement;
        this.setState({ namCDT: element.value });
        if (!(this.state.maDonVi === undefined || this.state.maDonVi === null || this.state.maDonVi === '' || this.state.maDonVi === '-1')) {
            this.props.getDanhSachKeHoach(this.state.maDonVi, element.value);
                if (!(this.state.maKeHoach === undefined || this.state.maKeHoach === null || this.state.maKeHoach === '' || this.state.maKeHoach === '-1')) {
                    this.LayDanhSachCDT(element.value, this.state.namCDT, this.state.maKeHoach);
                }
        }
    }

    handleSelectKeHoach = (event: React.FormEvent<HTMLSelectElement>) => {
        const element = event.target as HTMLSelectElement;
        this.setState({ maKeHoach: element.value });
        if (!(this.state.namCDT === undefined || this.state.namCDT === null || this.state.namCDT === '' || this.state.namCDT === '-1')) {
            if (!(this.state.maDonVi === undefined || this.state.maDonVi === null || this.state.maDonVi === '' || this.state.maDonVi === '-1')) {
                if (element.value !== '-1') {
                    this.LayDanhSachCDT(this.state.maDonVi, this.state.namCDT, element.value);
                }
            }
        }
    }

    LayDanhSachCDT = (donvi: any, nam: any, kehoach: any) => {
        const { activePage, itemsPerPage, sort, order } = this.state;
        this.props.getDanhSachCDT(donvi, nam, kehoach);
    };

    toggleActive = cdt => () => {
        this.props.updateCDT({
            ...cdt,
            trangThai: cdt.trangThai === 0 ? 1 : 0
        });
    };
    render() {
        const { ds_tinh_thanh, ds_don_vi, ds_ke_hoach, ds_cdt, match, totalItems } = this.props;
        return (
            <div>
                <table style={ { width: '100%' } }>
                    <tr>
                        <td>
                            <div>
                                <label style={ { width: '100px', fontWeight: 900 } }>Tỉnh thành</label>
                                <select style={ { borderColor: '#0066ff', borderRadius: '5px', width: 350 } }
                                        id="maTinhThanh" onChange={ this.handleSelectTinhThanh } value={this.state.maTinhThanh}>
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
                            <div style={ { paddingLeft: '20%', fontWeight: 900 } }>
                                <label style={ { width: '100px', fontWeight: 900 } }>Năm</label>
                                <select style={ { borderColor: '#0066ff', borderRadius: '5px', width: 350 } }
                                        id="nam" onChange={ this.handleSelectNam } value={this.state.namCDT}>
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
                    <tr>
                        <td style={ { paddingTop: '10px' } }>
                            <div>
                                <label style={ { width: '100px', fontWeight: 900 } }>Đơn vị</label>
                                <select style={ { borderColor: '#0066ff', borderRadius: '5px', width: 350 } }
                                        id="maDonVi" onChange={ this.handleSelectDonVi } value={this.state.maDonVi}>
                                    <option selected value="-1">--Chọn đơn vị</option>
                                    {
                                        ds_don_vi.map((donvi, i) => (
                                            <option key={donvi.maDonVi} value={ donvi.maDonVi }>
                                                {donvi.tenDonVi}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </td>
                                <td style={ { paddingTop: '10px' } }>
                                    <div style={ { paddingLeft: '20%' } }>
                                        <label style={ { width: '100px', fontWeight: 900 } }>Kế hoạch</label>
                                        <select style={ { borderColor: '#0066ff', borderRadius: '5px', width: 350 } }
                                                id="maKeHoach" onChange={ this.handleSelectKeHoach } value={this.state.maKeHoach}>
                                            <option selected value="-1">--Chọn kế hoạch</option>
                                            {
                                                ds_ke_hoach.map((kh, i) => (
                                                    <option key={ kh.maKeHoach } value={ kh.maKeHoach }>
                                                        { kh.noiDungTrichYeu }
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                </td>
                    </tr>
                    <br />
                </table>
                {
                    localStorage.getItem('phan_quyen') === '1' ? (
                        <h2>
                            <div style={{ float: 'right' }}>
                                <Link to={`/cdt/them-moi/${this.state.maTinhThanh}/${this.state.maDonVi}/${this.state.namCDT}/${this.state.maKeHoach}`}
                                      className="btn btn-primary float-right jh-create-entity">
                                    <FontAwesomeIcon icon="plus" /> Thêm mới chỉ đạo tuyến
                                </Link>
                            </div>
                        </h2>
                    ) : (
                        <></>
                    )
                }
                <br/>
                <h3>
                    <div style={{ float: 'left' }}>
                        Danh sách chỉ đạo tuyến
                    </div>
                </h3>
                <br/>
                <Table bordered responsive striped style={ { fontSize: 'small' } }>
                    <thead>
                    <tr>
                        <th className="hand" onClick={this.sortDanhSach(1, this.state.up)}>
                            Đơn vị
                        </th>
                        <th className="hand" onClick={this.sortDanhSach(2, this.state.up)}>
                            Đơn vị tiếp nhận
                            &nbsp;
                            <FontAwesomeIcon icon="sort" style={ { color: '#0066ff' } }/>
                        </th>
                        <th className="hand" onClick={this.sortDanhSach(3, this.state.up)}>
                            Hình thức chỉ đạo tuyến
                            &nbsp;
                            <FontAwesomeIcon icon="sort" style={ { color: '#0066ff' } }/>
                        </th>
                        <th className="hand" onClick={this.sortDanhSach(4, this.state.up)}>
                            Loại chỉ đạo tuyến
                            &nbsp;
                            <FontAwesomeIcon icon="sort" style={ { color: '#0066ff' } }/>
                        </th>
                        <th className="hand" onClick={this.sortDanhSach(5, this.state.up)}>
                            Ngày thực hiện
                            &nbsp;
                            <FontAwesomeIcon icon="sort" style={ { color: '#0066ff' } }/>
                        </th>
                        <th className="hand" onClick={this.sortDanhSach(6, this.state.up)}>
                            Trạng thái
                            &nbsp;
                            <FontAwesomeIcon icon="sort" style={ { color: '#0066ff' } }/>
                        </th>
                        <th />
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.arrCDT.map((cdt, i) => (
                        <tr key={`user-${i}`}>
                            <td>{cdt.tenDonVi}</td>
                            <td>{cdt.tenDonViTiepNhan}</td>
                            <td>{cdt.tenHinhThuc}</td>
                            <td>{cdt.tenLoaiCDT}</td>
                            <td>{cdt.ngayThucHien}</td>
                            <td>
                                <div style={ { textAlign: 'center' } }>
                                {
                                    cdt.trangThai === 0 ?
                                        (<span style={ { color: 'white', borderRadius: '5px', padding: '1px', backgroundColor: 'green' } }>Mới</span>) :
                                        (<span style={ { color: 'white', borderRadius: '5px', padding: '1px', backgroundColor: 'blue' } }>Đã cập nhật biên bản</span>)
                                }
                                </div>
                            </td>
                            <td className="text-right">
                                <div className="btn-group flex-btn-group-container">
                                    <Button tag={Link} to={`/cdt/xem/${cdt.maCDT}/${this.state.maTinhThanh}/${this.state.maDonVi}/${this.state.namCDT}/${this.state.maKeHoach}/${cdt.khoaPhong}/${cdt.donViTiepNhan}`} color="info" size="sm">
                                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">Xem</span>
                                    </Button>
                                    {
                                        localStorage.getItem('phan_quyen') === '1' ? (
                                            <>
                                                <Button tag={Link} to={`/cdt/sua/${cdt.maCDT}/${this.state.maTinhThanh}/${this.state.maDonVi}/${this.state.namCDT}/${this.state.maKeHoach}/${cdt.khoaPhong}/${cdt.donViTiepNhan}`}
                                                        color="primary" size="sm">
                                                    <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Sửa</span>
                                                </Button>
                                                <Button
                                                    tag={Link}
                                                    to={`/cdt/${cdt.maCDT}/xoa`}
                                                    color="danger"
                                                    size="sm"
                                                >
                                                    <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Xóa</span>
                                                </Button>
                                                <Button
                                                    tag={Link}
                                                    to={`/cdt/cap-nhat-bien-ban/${cdt.maCDT}/${cdt.loaiCDT}/${this.state.maTinhThanh}/${this.state.maDonVi}/${this.state.namCDT}/${this.state.maKeHoach}`}
                                                    color="warning"
                                                    size="sm"
                                                >
                                                    <FontAwesomeIcon icon="plus" /> <span className="d-none d-md-inline">Cập nhật biên bản</span>
                                                </Button>
                                            </>
                                        ) : (
                                        <div/>
                                        )
                                    }
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
    ds_tinh_thanh: storeState.cdt.ds_tinh_thanh,
    ds_don_vi: storeState.cdt.ds_don_vi,
    ds_nam: storeState.cdt.ds_nam,
    ds_ke_hoach: storeState.cdt.ds_ke_hoach,
    ds_cdt: storeState.cdt.ds_cdt,
    totalItems: storeState.cdt.totalItems
});

const mapDispatchToProps = { getDanhSachTinhThanh, getDanhSachDonVi, getDanhSachKeHoach,
    getDanhSachNam, getDanhSachCDT, getCDT, updateCDT, getDanhSachCDT_DonVi_Nam, reset };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DanhSachCDT);
