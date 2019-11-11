import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Label, Row, Col } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField, AvFeedback, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getDanhSachDonVi, getDanhSachKeHoach, getDanhSachNam, getDanhSachHinhThuc,
    getDanhSachLoaiCDT, getDanhSachNoiDung, getDanhSachDonViTiepNhan, getDanhSachDoiTuong,
    getDanhSachKhoaPhong, getDanhSachNhanVien, getDanhSachNhanVienTiepNhan,
    uploadCDT, getMaxMaCDT, getCDT, addCDT, updateCDT, reset } from './cdt.reducer';
import { IRootState } from 'src/main/webapp/app/shared/reducers';
import { INhanVien } from 'app/modules/nhanvien/nhanvien.model';
import { INoiDung } from 'src/main/webapp/app/modules/quanlychidaotuyen/noidung/noidung.model';
import { IDoiTuong } from 'src/main/webapp/app/modules/quanlychidaotuyen/doituongtiepnhan/doituong.model';

export interface IThemMoiCDTProps extends StateProps, DispatchProps, RouteComponentProps<{ cdt: string, don_vi: string, ma_tinh_thanh: string, nam: string }> {}

export interface IThemMoiCDTState {
    isNew: boolean;
    tap_tin: any;
    max_ma_cdt: any;
    loai_cdt: any;
    hinh_thuc: any;
    tinh_thanh: any;
    don_vi: any;
    don_vi_tiep_nhan: any;
    nam: any;
    khoa_phong: any;
    ds_ca_nhan: INhanVien[];
    ds_noi_dung: INoiDung[];
    ds_doi_tuong: IDoiTuong[];
    ds_ca_nhan_tiep_nhan: INhanVien[];
}

export class ThemCDT extends React.Component<IThemMoiCDTProps, IThemMoiCDTState> {
    state: IThemMoiCDTState = {
        isNew: !this.props.match.params || !this.props.match.params.cdt,
        tap_tin: '',
        max_ma_cdt: '',
        loai_cdt: '',
        hinh_thuc: '',
        don_vi: this.props.match.params.don_vi,
        don_vi_tiep_nhan: '',
        tinh_thanh: this.props.match.params.ma_tinh_thanh,
        nam: this.props.match.params.nam,
        khoa_phong: '',
        ds_ca_nhan: [],
        ds_noi_dung: [],
        ds_doi_tuong: [],
        ds_ca_nhan_tiep_nhan: []
    };

    componentDidMount() {
        this.props.getMaxMa(1);
        this.props.getDanhSachDonVi(this.props.match.params.ma_tinh_thanh);
        this.props.getDanhSachNam();
        this.props.getDanhSachLoaiCDT();
        this.props.getDanhSachHinhThuc();
        this.props.getDanhSachNoiDung();
        // this.props.getDanhSachDonViTiepNhan();
        this.props.getDanhSachDoiTuong();
        // this.props.getDanhSachKhoaPhong();
        if (this.state.isNew) {
            this.props.reset();
        } else {
            this.props.getCDT(this.props.match.params.cdt);
        }
    }

    componentWillUnmount() {
        this.props.reset();
    }

    handleMultiSelectCaNhanPhuTrach = e => {
        const options = e.target.options;
        const value = [];
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push({ maNhanVien: options[i].value, tenNhanVien: options[i].text });
            }
        }
        this.setState({ ds_ca_nhan: value });
    }

    handleMultiSelectNoiDung = e => {
        const options = e.target.options;
        const value = [];
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push({ maNoiDung: options[i].value, noiDung: options[i].text });
            }
        }
        this.setState({ ds_noi_dung: value });
    }
    handleMultiSelectDoiTuong = e => {
        const options = e.target.options;
        const value = [];
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push({ maDoiTuong: options[i].value, tenDoiTuong: options[i].text });
            }
        }
        this.setState({ ds_doi_tuong: value });
    }

    handleMultiSelectCaNhanTiepNhan = e => {
        const options = e.target.options;
        const value = [];
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push({ maNhanVien: options[i].value, tenNhanVien: options[i].text });
            }
        }
        this.setState({ ds_ca_nhan_tiep_nhan: value });
    }

    onChange = e => {
        const data = new FormData();
        const file = e.target.files[0];
        data.append('tap_tin', e.target.files[0]);
        this.setState({ tap_tin: file.name });
        this.props.uploadCDT(data);
    }

    luuKH = (event, values) => {
        if (this.state.isNew) {
            // this.props.addCDT_1(values, this.props.maxma + 1, this.state.vb);
            // this.state.vb.map((ele, i) => {
            //     this.props.addChiTietCDT(this.props.maxma + 1, ele);
            // });
        } else {
            this.props.updateCDT(values);
        }
        this.troVeDanhSach();
    }

    handleSelectKhoaPhong = (event: React.FormEvent<HTMLSelectElement>) => {
        const element = event.target as HTMLSelectElement;
        this.setState({ khoa_phong: element.value });
        if (!(element.value === '-1')) {
            this.props.getDanhSachNhanVien(element.value);
        }
    }

    handleSelectNam = (event: React.FormEvent<HTMLSelectElement>) => {
        const element = event.target as HTMLSelectElement;
        this.setState({ nam: element.value });
    }
    handleSelectDonVi = (event: React.FormEvent<HTMLSelectElement>) => {
        const element = event.target as HTMLSelectElement;
        this.setState({ don_vi: element.value });
        if (!(element.value === '-1')) {
            this.props.getDanhSachKeHoach(element.value, this.state.nam);
            this.props.getDanhSachKhoaPhong(element.value);
            this.props.getDanhSachDonViTiepNhan(element.value);
            // this.props.getDanhSachNhanVien(element.value);
        }
    }
    handleSelectDonViTiepNhan = (event: React.FormEvent<HTMLSelectElement>) => {
        const element = event.target as HTMLSelectElement;
        this.setState({ don_vi_tiep_nhan: element.value });
        if (!(element.value === '-1')) {
            this.props.getDanhSachNhanVienTiepNhan(element.value);
        }
    }
    luuCDT = (event, values) => {
        if (this.state.isNew) {
            this.props.addCDT(values);
        } else {
            this.props.updateCDT(values);
        }
        this.troVeDanhSach();
    };

    troVeDanhSach = () => {
        this.props.history.goBack();
    }

    render() {
        const isInvalid = false;
        const { ds_don_vi, ds_hinh_thuc, ds_don_vi_tiep_nhan,
            ds_loai_cdt, ds_noi_dung, ds_doi_tuong, ds_nam, ds_ke_hoach,
            ds_khoa_phong, ds_nhan_vien, ds_nhan_vien_tiep_nhan, cdt, updating } = this.props;
        return (
            <div>
                <Row className="justify-content-center">
                    <Col md="5">
                        {this.state.isNew ? (<h1>Thêm mới chỉ đạo tuyến</h1>) : (<h1>Cập nhật kế hoạch</h1>)}
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md="5">
                        <AvForm onValidSubmit={ this.luuKH }>
                            {cdt.maCDT ? (
                                <AvGroup>
                                    <Label for="id">Mã chỉ đạo tuyến</Label>
                                    <AvField type="text" className="form-control" name="maCDT" required readOnly value={cdt.maCDT} />
                                </AvGroup>
                            ) : null}
                            <Row md="5">
                                <Col>
                                    <AvGroup>
                                        <label style={ { fontWeight: 900 } }>Năm</label>
                                        <AvField type="select" name="nam" required onChange={this.handleSelectNam}
                                                 validate={{
                                                     value: '-1',
                                                     errorMessage: 'Chua chon nam'
                                                 }}>
                                            <option value="-1">--Chọn năm</option>
                                            {
                                                ds_nam.map((ele, i) => (
                                                    <option key={ele.nam} value={ ele.nam }>
                                                        {ele.nam}
                                                    </option>
                                                ))}
                                            }
                                        </AvField>
                                    </AvGroup>
                                </Col>
                                <Col>
                                    <AvGroup>
                                        <label style={ { fontWeight: 900 } }>Ngày thực hiện</label>
                                        <AvField type="date" name="ngayThucHien" required value={cdt.ngayThucHien}/>
                                    </AvGroup>
                                </Col>
                            </Row>
                            {
                                this.state.isNew ? (
                                    <AvGroup>
                                        <label style={ { fontWeight: 900 } }>Đơn vị</label>
                                        <AvField type="select" name="donVi" onChange={this.handleSelectDonVi} required>
                                            <option>--Chọn đơn vị</option>
                                            {
                                                ds_don_vi.map((ele, i) => (
                                                    <option key={ele.maDonVi} value={ ele.maDonVi }>
                                                        {ele.tenDonVi}
                                                    </option>
                                                ))}
                                            }
                                        </AvField>
                                    </AvGroup>
                                ) : (
                                    <AvGroup>
                                        <label style={ { fontWeight: 900 } }>Đơn vị</label>
                                        <AvField type="select" name="donVi" onChange={this.handleSelectDonVi} value={ cdt.donVi }>
                                            {
                                                ds_don_vi.map((ele, i) => (
                                                    <option key={ele.maDonVi} value={ ele.maDonVi }>
                                                        {ele.tenDonVi}
                                                    </option>
                                                ))}
                                            }
                                        </AvField>
                                    </AvGroup>
                                )
                            }
                            {
                                this.state.isNew ? (
                                    <AvGroup>
                                        <label style={ { fontWeight: 900 } }>Kế hoạch</label>
                                        <AvField type="select" name="keHoach" required>
                                            <option value="-1">--Chọn kế hoạch</option>
                                            {
                                                ds_ke_hoach.map((ele, i) => (
                                                    <option key={ele.maKeHoach} value={ ele.maKeHoach }>
                                                        {ele.noiDungTrichYeu}
                                                    </option>
                                                ))}
                                            }
                                        </AvField>
                                    </AvGroup>
                                ) : (
                                    <AvGroup>
                                        <label style={ { fontWeight: 900 } }>Kế hoạch</label>
                                        <AvField type="select" name="keHoach" value={ cdt.keHoach }>
                                            {
                                                ds_ke_hoach.map((ele, i) => (
                                                    <option key={ele.maKeHoach} value={ ele.maKeHoach }>
                                                        {ele.noiDungTrichYeu}
                                                    </option>
                                                ))}
                                            }
                                        </AvField>
                                    </AvGroup>
                                )
                            }
                            {
                                this.state.isNew ? (
                                    <AvGroup>
                                        <label style={ { fontWeight: 900 } }>Hình thức chỉ đạo tuyến</label>
                                        <AvField type="select" name="keHoach" required>
                                            <option value="null">--Chọn hình thức chỉ đạo tuyến</option>
                                            {
                                                ds_hinh_thuc.map((ele, i) => (
                                                    <option key={ele.ma_hinh_thuc} value={ ele.ma_hinh_thuc }>
                                                        {ele.ten_hinh_thuc}
                                                    </option>
                                                ))}
                                            }
                                        </AvField>
                                    </AvGroup>
                                ) : (
                                    <AvGroup>
                                        <label style={ { fontWeight: 900 } }>Hình thức chỉ đạo tuyến</label>
                                        <AvField type="select" name="donVi" value={ cdt.donVi }>
                                            {
                                                ds_hinh_thuc.map((ele, i) => (
                                                    <option key={ele.ma_hinh_thuc} value={ ele.ma_hinh_thuc }>
                                                        {ele.ten_hinh_thuc}
                                                    </option>
                                                ))}
                                            }
                                        </AvField>
                                    </AvGroup>
                                )
                            }
                            {
                                this.state.isNew ? (
                                    <AvGroup>
                                        <label style={ { fontWeight: 900 } }>Loại chỉ đạo tuyến</label>
                                        <AvField type="select" name="loaiCDT" required>
                                            <option value="-1">--Chọn loại chỉ đạo tuyến</option>
                                            {
                                                ds_loai_cdt.map((ele, i) => (
                                                    <option key={ele.ma_loai_cdt} value={ ele.ma_loai_cdt }>
                                                        {ele.ten_loai_cdt}
                                                    </option>
                                                ))}
                                            }
                                        </AvField>
                                    </AvGroup>
                                ) : (
                                    <AvGroup>
                                        <label style={ { fontWeight: 900 } }>Loại chỉ đạo tuyến</label>
                                        <AvField type="select" name="donVi" value={ cdt.loaiCDT }>
                                            {
                                                ds_loai_cdt.map((ele, i) => (
                                                    <option key={ele.ma_loai_cdt} value={ ele.ma_loai_cdt }>
                                                        {ele.ten_loai_cdt}
                                                    </option>
                                                ))}
                                            }
                                        </AvField>
                                    </AvGroup>
                                )
                            }
                            <AvGroup>
                                <Label style={ { fontWeight: 900 } }>Nội dung chỉ đạo tuyến</Label>
                                <AvField style={ { fontSize: 'smaller' } } readOnly name="noi_dung" value={this.state.ds_noi_dung.values} required/>
                                <AvField type="select" name="noiDung" multiple onChange={this.handleMultiSelectNoiDung}>
                                    {
                                        ds_noi_dung.map((ele, i) => (
                                            <option key={ele.maNoiDung} value={ ele.maNoiDung }>{ ele.noiDung }</option>
                                        ))
                                    }
                                </AvField>
                            </AvGroup>
                            {
                                this.state.isNew ? (
                                    <AvGroup>
                                        <label style={ { fontWeight: 900 } }>Đơn vị tiếp nhận</label>
                                        <AvField type="select" name="donViTiepNhan" onChange={this.handleSelectDonViTiepNhan} required>
                                            <option value="-1">--Chọn đơn vị tiếp nhận</option>
                                            {
                                                ds_don_vi_tiep_nhan.map((ele, i) => (
                                                    <option key={ele.maDonVi} value={ ele.maDonVi }>
                                                        {ele.tenDonVi}
                                                    </option>
                                                ))}
                                            }
                                        </AvField>
                                    </AvGroup>
                                ) : (
                                    <AvGroup>
                                        <label style={ { fontWeight: 900 } }>Đơn vị tiếp nhận</label>
                                        <AvField type="select" name="donViTiepNhan" value={ cdt.donViTiepNhan }>
                                            {
                                                ds_don_vi_tiep_nhan.map((ele, i) => (
                                                    <option key={ele.maDonVi} value={ ele.maDonVi }>
                                                        {ele.tenDonVi}
                                                    </option>
                                                ))}
                                            }
                                        </AvField>
                                    </AvGroup>
                                )
                            }
                            <AvGroup>
                                <Label style={ { fontWeight: 900 } }>Đối tượng tiếp nhận</Label>
                                <AvField style={ { fontSize: 'smaller' } } readOnly name="noi_dung" value={this.state.ds_doi_tuong.values} required/>
                                <AvField type="select" name="noidung" multiple onChange={this.handleMultiSelectDoiTuong}>
                                    {
                                        ds_doi_tuong.map((ele, i) => (
                                            <option key={ele.maDoiTuong} value={ ele.maDoiTuong }>{ ele.tenDoiTuong }</option>
                                        ))
                                    }
                                </AvField>
                            </AvGroup>
                            <AvGroup>
                                <AvField
                                    hidden
                                    type="text"
                                    className="form-control"
                                    name="tapTin"
                                    value={this.state.tap_tin}
                                />
                            </AvGroup>

                            <Button tag={Link} to="/cdt" replace color="info">
                                <FontAwesomeIcon icon="arrow-left" />
                                &nbsp;
                                <span className="d-none d-md-inline">Trở về</span>
                            </Button>
                            &nbsp;
                            <Button color="primary" type="submit" disabled={isInvalid || updating}>
                                <FontAwesomeIcon icon="save" />
                                &nbsp; Lưu
                            </Button>
                        </AvForm>
                    </Col>
                    <Col md="1"/>
                    <Col md="5">
                        <AvForm onValidSubmit={ this.luuKH }>
                            <AvGroup>
                                <Label style={ { fontWeight: 900 } }>Khoa phòng</Label>
                                <AvField type="select" name="noidung" onChange={this.handleSelectKhoaPhong}>
                                    <option value="-1">--Chọn khoa phòng</option>
                                    {
                                        ds_khoa_phong.map((ele, i) => (
                                            <option key={ele.maKhoaPhong} value={ ele.maKhoaPhong }>{ ele.tenKhoaPhong }</option>
                                        ))
                                    }
                                </AvField>
                            </AvGroup>
                            <AvGroup>
                                <Label style={ { fontWeight: 900 } }>Cá nhân phụ trách</Label>
                                <AvField style={ { fontSize: 'smaller' } } readOnly name="noi_dung" value={this.state.ds_ca_nhan.values} required/>
                                <AvField type="select" name="nhanvien" multiple onChange={this.handleMultiSelectCaNhanPhuTrach}>
                                    {
                                        ds_nhan_vien.map((ele, i) => (
                                            <option key={ele.maNhanVien} value={ ele.maNhanVien }>{ ele.tenNhanVien }</option>
                                        ))
                                    }
                                </AvField>
                            </AvGroup>
                            {
                                this.state.isNew ? (
                                    <AvGroup>
                                        <label style={ { fontWeight: 900 } }>Trưởng đoàn</label>
                                        <AvField type="select" name="truongDoan" required>
                                            <option value="-1">--Chọn trưởng đoàn</option>
                                            {
                                                this.state.ds_ca_nhan.map((ele, i) => (
                                                    <option key={ele.maNhanVien} value={ ele.maNhanVien }>
                                                        {ele.tenNhanVien}
                                                    </option>
                                                ))}
                                            }
                                        </AvField>
                                    </AvGroup>
                                ) : (
                                    <AvGroup>
                                        <label style={ { fontWeight: 900 } }>Trưởng đoàn</label>
                                        <AvField type="select" name="truongDoan" value={ cdt.truongDoan }>
                                            {
                                                this.state.ds_ca_nhan.map((ele, i) => (
                                                    <option key={ele.maNhanVien} value={ ele.maNhanVien }>
                                                        {ele.tenNhanVien}
                                                    </option>
                                                ))}
                                            }
                                        </AvField>
                                    </AvGroup>
                                )
                            }
                            {
                                this.state.isNew ? (
                                    <AvGroup>
                                        <label style={ { fontWeight: 900 } }>Thư ký</label>
                                        <AvField type="select" name="thuKi" required>
                                            <option value="-1">--Chọn thư ký</option>
                                            {
                                                this.state.ds_ca_nhan.map((ele, i) => (
                                                    <option key={ele.maNhanVien} value={ ele.maNhanVien }>
                                                        {ele.tenNhanVien}
                                                    </option>
                                                ))}
                                            }
                                        </AvField>
                                    </AvGroup>
                                ) : (
                                    <AvGroup>
                                        <label style={ { fontWeight: 900 } }>Thư ký</label>
                                        <AvField type="select" name="thuKi" value={ cdt.thuKi }>
                                            {
                                                this.state.ds_ca_nhan.map((ele, i) => (
                                                    <option key={ele.maNhanVien} value={ ele.maNhanVien }>
                                                        {ele.maNhanVien}
                                                    </option>
                                                ))}
                                            }
                                        </AvField>
                                    </AvGroup>
                                )
                            }
                            <AvGroup>
                                <label style={ { fontWeight: 900 } }>Số người tiếp nhận</label>
                                <AvField type="number" name="soNguoiTiepNhan" required value={cdt.soNguoiTiepNhan}/>
                            </AvGroup>
                            <AvGroup>
                                <Label style={ { fontWeight: 900 } }>Người tiếp nhận</Label>
                                <AvField style={ { fontSize: 'smaller' } } readOnly name="nguoiTiepNhan" value={this.state.ds_ca_nhan_tiep_nhan.values} required/>
                                <AvField type="select" name="noidung" multiple onChange={this.handleMultiSelectCaNhanTiepNhan}>
                                    {
                                        ds_nhan_vien_tiep_nhan.map((ele, i) => (
                                            <option key={ele.maNhanVien} value={ ele.maNhanVien }>{ ele.tenNhanVien }</option>
                                        ))
                                    }
                                </AvField>
                            </AvGroup>
                            {
                                this.state.isNew ? (
                                    <AvGroup>
                                        <label style={ { fontWeight: 900 } }>Người đại diện</label>
                                        <AvField type="select" name="donVi" required>
                                            <option value="null">--Chọn người đại diện</option>
                                            {
                                                this.state.ds_ca_nhan_tiep_nhan.map((ele, i) => (
                                                    <option key={ele.maNhanVien} value={ ele.maNhanVien }>
                                                        {ele.tenNhanVien}
                                                    </option>
                                                ))}
                                            }
                                        </AvField>
                                    </AvGroup>
                                ) : (
                                    <AvGroup>
                                        <label style={ { fontWeight: 900 } }>Người đại diện</label>
                                        <AvField type="select" name="nguoiDaiDien" value={ cdt.nguoiDaiDien }>
                                            {
                                                this.state.ds_ca_nhan_tiep_nhan.map((ele, i) => (
                                                    <option key={ele.maNhanVien} value={ ele.maNhanVien }>
                                                        {ele.tenNhanVien}
                                                    </option>
                                                ))}
                                            }
                                        </AvField>
                                    </AvGroup>
                                )
                            }
                            <input style={ { paddingLeft: '10px' } } type="file" onChange={this.onChange}/>
                            <AvGroup>
                                <AvField
                                    hidden
                                    type="text"
                                    className="form-control"
                                    name="tapTin"
                                    value={this.state.tap_tin}
                                />
                            </AvGroup>
                        </AvForm>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (storeState: IRootState) => ({
    maxma: storeState.cdt.max_ma,
    cdt: storeState.cdt.cdt,
    ds_loai_cdt: storeState.cdt.ds_loai_cdt,
    ds_hinh_thuc: storeState.cdt.ds_hinh_thuc,
    ds_noi_dung: storeState.cdt.ds_noi_dung,
    ds_doi_tuong: storeState.cdt.ds_doi_tuong,
    ds_khoa_phong: storeState.cdt.ds_khoa_phong,
    ds_nhan_vien: storeState.cdt.ds_nhan_vien,
    ds_nhan_vien_tiep_nhan: storeState.cdt.ds_nhan_vien_tiep_nhan,
    ds_don_vi: storeState.cdt.ds_don_vi,
    ds_don_vi_tiep_nhan: storeState.cdt.ds_don_vi_tiep_nhan,
    ds_nam: storeState.cdt.ds_nam,
    ds_ke_hoach: storeState.cdt.ds_ke_hoach,
    // loading: storeState.cdt.loading,
    updating: storeState.cdt.updating
});

const mapDispatchToProps = { getDanhSachDonVi, getDanhSachKeHoach, getDanhSachNam,
    getDanhSachHinhThuc, getDanhSachNoiDung, getDanhSachLoaiCDT, getMaxMa: getMaxMaCDT, uploadCDT,
    getCDT, addCDT, updateCDT, reset, getDanhSachDonViTiepNhan, getDanhSachDoiTuong,
    getDanhSachKhoaPhong, getDanhSachNhanVien, getDanhSachNhanVienTiepNhan };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ThemCDT);
