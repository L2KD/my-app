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
    uploadCDT, getMaxMaCDT, getCDT, addCDT_1, updateCDT_1, reset,
    getDanhSachCDT_NoiDung, getDanhSachCDT_DoiTuong, getDanhSachCDT_CaNhan_PhuTrach,
    getDanhSachCDT_CaNhan_TiepNhan } from './cdt.reducer';
import { IRootState } from 'app/shared/reducers';
import { INhanVien } from 'app/modules/nhanvien/nhanvien.model';
import { INoiDung } from 'app/modules/quanlychidaotuyen/noidung/noidung.model';
import { IDoiTuong } from 'app/modules/quanlychidaotuyen/doituongtiepnhan/doituong.model';

export interface ISuaCDTProps extends StateProps, DispatchProps, RouteComponentProps<{ cdt: string,
    donvi: string, tinhthanh: string, nam: string, kehoach: string, khoaphong: string,
    donvitiepnhan: string }> {}

export interface ISuaCDTState {
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
    ds_nam: any;
}

export class SuaCDT extends React.Component<ISuaCDTProps, ISuaCDTState> {
    state: ISuaCDTState = {
        isNew: !this.props.match.params || !this.props.match.params.cdt,
        tap_tin: '',
        max_ma_cdt: '',
        loai_cdt: '',
        hinh_thuc: '',
        don_vi: this.props.match.params.donvi,
        don_vi_tiep_nhan: '',
        tinh_thanh: this.props.match.params.tinhthanh,
        nam: this.props.match.params.nam,
        khoa_phong: this.props.match.params.khoaphong,
        ds_ca_nhan: [],
        ds_noi_dung: [],
        ds_doi_tuong: [],
        ds_ca_nhan_tiep_nhan: [],
        ds_nam: []
    };

    componentDidMount() {
        this.props.getDanhSachDonVi(this.props.match.params.tinhthanh);
        this.props.getDanhSachLoaiCDT();
        this.props.getDanhSachHinhThuc();
        this.props.getDanhSachNoiDung();
        this.props.getDanhSachDoiTuong();
        // this.props.getDanhSachNhanVien(this.props.match.params.khoaphong);
        this.props.getDanhSachCDT_NoiDung(this.props.match.params.cdt);
        this.props.getDanhSachCDT_DoiTuong(this.props.match.params.cdt);
        this.props.getDanhSachCDT_CaNhan_PhuTrach(this.props.match.params.cdt);
        this.props.getDanhSachCDT_CaNhan_TiepNhan(this.props.match.params.cdt);
        if (this.state.isNew) {
            this.props.reset();
        } else {
            this.props.getCDT(this.props.match.params.cdt);
        }
        setTimeout(100);
        this.props.getDanhSachNhanVien(this.props.match.params.khoaphong);
        this.props.getDanhSachKeHoach(this.props.match.params.donvi, this.props.match.params.nam);
        this.props.getDanhSachKhoaPhong(this.props.match.params.donvi);
        this.props.getDanhSachDonViTiepNhan(this.props.match.params.donvi);
        this.props.getDanhSachNhanVienTiepNhan(this.props.match.params.donvitiepnhan);

        const year = new Date().getFullYear();
        const val = [];
        for (let i = year - 5; i <= year + 5; i++) {
            val.push(i);
        }
        this.setState({ ds_nam: val });
    }

    componentWillUnmount() {
        this.props.reset();
    }

    componentWillReceiveProps(nextProps: Readonly<ISuaCDTProps>, nextContext: any): void {
        this.setState({
            ds_ca_nhan: nextProps.ds_cdt_canhan_phutrach.concat(),
            ds_ca_nhan_tiep_nhan: nextProps.ds_cdt_canhan_tiepnhan.concat(),
            tap_tin: nextProps.cdt.tapTin,
            ds_noi_dung: nextProps.ds_cdt_noidung.concat(),
            ds_doi_tuong: nextProps.ds_cdt_doituong.concat()
        });
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

    uploadTapTinCDT = e => {
        const data = new FormData();
        const file = e.target.files[0];
        data.append('tap_tin', e.target.files[0]);
        this.setState({ tap_tin: file.name });
        this.props.uploadCDT(data);
    }

    handleOnClickChonTapTin = (event: React.MouseEvent<HTMLElement>) => {
        if (document.getElementById('filecdt') !== null) {
            document.getElementById('filecdt').click();
        }
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
        this.setState({ ds_ca_nhan: [] });
    }
    handleSelectDonViTiepNhan = (event: React.FormEvent<HTMLSelectElement>) => {
        const element = event.target as HTMLSelectElement;
        this.setState({ don_vi_tiep_nhan: element.value });
        if (!(element.value === '-1')) {
            this.props.getDanhSachNhanVienTiepNhan(element.value);
        }
        this.setState({ ds_ca_nhan_tiep_nhan: [] });
    }
    luuCDT = (event, values) => {
            this.props.updateCDT_1(values, this.state.ds_noi_dung, this.state.ds_doi_tuong,
                this.state.ds_ca_nhan, this.state.ds_ca_nhan_tiep_nhan);
        this.props.history.push(`/cdt/${this.props.match.params.tinhthanh}/${values.donVi}/${values.nam}/${values.keHoach}`);
    };

    render() {
        const isInvalid = false;
        const { ds_don_vi, ds_hinh_thuc, ds_don_vi_tiep_nhan,
            ds_loai_cdt, ds_noi_dung, ds_doi_tuong, ds_ke_hoach,
            ds_khoa_phong, ds_nhan_vien, ds_nhan_vien_tiep_nhan, cdt, updating } = this.props;
        return (
            <div>
                <Row className="justify-content-center">
                    <Col md="5">
                        <h1>Cập nhật kế hoạch</h1>
                    </Col>
                </Row>
                <AvForm onValidSubmit={ this.luuCDT }>
                    <Row className="justify-content-center">
                        <Col md="5">
                            {/*{cdt.maCDT ? (*/}
                                <AvGroup hidden>
                                    <Label for="id">Mã chỉ đạo tuyến</Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                             type="text" className="form-control" name="maCDT" required readOnly value={cdt.maCDT} />
                                </AvGroup>
                            {/*) : null}*/}
                            <Row md="5">
                                <Col>
                                    <AvGroup>
                                        <label style={ { fontWeight: 900 } }>Năm</label>
                                        <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                 type="select"
                                                 name="nam"
                                                 required
                                                 onChange={this.handleSelectNam}
                                                 value={cdt.nam}>
                                            {
                                                this.state.ds_nam.map((ele, i) => (
                                                    <option key={ele} value={ ele }>
                                                        {ele}
                                                    </option>
                                                ))}
                                            }
                                        </AvField>
                                    </AvGroup>
                                </Col>
                                <Col>
                                    <AvGroup>
                                        <label style={ { fontWeight: 900 } }>Ngày thực hiện</label>
                                        <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                 type="date"
                                                 name="ngayThucHien"
                                                 required
                                                 validate={{
                                                     required: {
                                                         value: true,
                                                         errorMessage: 'Chưa chọn ngày thực hiện'
                                                     }
                                                 }}
                                                 value={cdt.ngayThucHien}/>
                                    </AvGroup>
                                </Col>
                            </Row>
                                    <AvGroup>
                                        <label style={ { fontWeight: 900 } }>Đơn vị</label>
                                        <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                 type="select"
                                                 name="donVi"
                                                 onChange={this.handleSelectDonVi}
                                                 value={ cdt.donVi }>
                                            {
                                                ds_don_vi.map((ele, i) => (
                                                    <option key={ele.maDonVi} value={ ele.maDonVi }>
                                                        {ele.tenDonVi}
                                                    </option>
                                                ))}
                                            }
                                        </AvField>
                                    </AvGroup>
                                    <AvGroup>
                                        <label style={ { fontWeight: 900 } }>Kế hoạch</label>
                                        <AvField required style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                 type="select" name="keHoach" value={ cdt.keHoach }>
                                            {
                                                ds_ke_hoach.map((ele, i) => (
                                                    <option key={ele.maKeHoach} value={ ele.maKeHoach }>
                                                        {ele.noiDungTrichYeu}
                                                    </option>
                                                ))}
                                            }
                                        </AvField>
                                    </AvGroup>
                                    <AvGroup>
                                        <label style={ { fontWeight: 900 } }>Hình thức chỉ đạo tuyến</label>
                                        <AvField required style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                 type="select" name="hinhThuc" value={ cdt.hinhThuc }>
                                            {
                                                ds_hinh_thuc.filter(hinhthuc => hinhthuc.trang_thai !== 0).map((ele, i) => (
                                                    <option key={ele.ma_hinh_thuc} value={ ele.ma_hinh_thuc }>
                                                        {ele.ten_hinh_thuc}
                                                    </option>
                                                ))}
                                            }
                                        </AvField>
                                    </AvGroup>
                                    <AvGroup>
                                        <label style={ { fontWeight: 900 } }>Loại chỉ đạo tuyến</label>
                                        <AvField required style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                 type="select" name="loaiCDT" value={ cdt.loaiCDT }>
                                            {
                                                ds_loai_cdt.map((ele, i) => (
                                                    <option key={ele.ma_loai_cdt} value={ ele.ma_loai_cdt }>
                                                        {ele.ten_loai_cdt}
                                                    </option>
                                                ))}
                                            }
                                        </AvField>
                                    </AvGroup>
                            <AvGroup>
                                <Label style={ { fontWeight: 900 } }>Nội dung chỉ đạo tuyến</Label>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                         readOnly name="noi_dung" value={ this.state.ds_noi_dung.map((ele, i) => (ele.noiDung))}/>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                         type="select" name="noiDung" multiple onChange={this.handleMultiSelectNoiDung}>
                                    {
                                        ds_noi_dung.filter(noidung => noidung.trangThai !== 0).map((ele, i) => (
                                            <option key={ele.maNoiDung} value={ ele.maNoiDung }>{ ele.noiDung }</option>
                                        ))
                                    }
                                </AvField>
                            </AvGroup>
                                    <AvGroup>
                                        <label style={ { fontWeight: 900 } }>Đơn vị tiếp nhận</label>
                                        <AvField required style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                 type="select" name="donViTiepNhan" value={ cdt.donViTiepNhan } onChange={this.handleSelectDonViTiepNhan}>
                                            {
                                                ds_don_vi_tiep_nhan.map((ele, i) => (
                                                    <option key={ele.maDonVi} value={ ele.maDonVi }>
                                                        {ele.tenDonVi}
                                                    </option>
                                                ))}
                                            }
                                        </AvField>
                                    </AvGroup>
                            <br/>
                            <AvGroup>
                                <Label style={ { fontWeight: 900 } }>Đối tượng tiếp nhận</Label>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                         readOnly name="noi_dung" value={ this.state.ds_doi_tuong.map((ele, i) => (ele.tenDoiTuong))}/>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                         type="select" name="doiTuong" multiple onChange={this.handleMultiSelectDoiTuong}>
                                    {
                                        ds_doi_tuong.filter(doituong => doituong.trangThai !== 0).map((ele, i) => (
                                            <option key={ele.maDoiTuong} value={ ele.maDoiTuong }>{ ele.tenDoiTuong }</option>
                                        ))
                                    }
                                </AvField>
                            </AvGroup>
                            <AvGroup>
                                <AvField required style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                    hidden
                                    type="text"
                                    className="form-control"
                                    name="tapTin"
                                    value={this.state.tap_tin}
                                />
                            </AvGroup>
                        </Col>
                    <Col md="1"/>
                    <Col md="6">
                            <AvGroup>
                                <Label style={ { fontWeight: 900 } }>Khoa phòng</Label>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                         type="select" name="khoaPhong" onChange={this.handleSelectKhoaPhong} value={cdt.khoaPhong}>
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
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                         readOnly name="noi_dung" value={ this.state.ds_ca_nhan.map((ele, i) => (ele.tenNhanVien))}/>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                         type="select" name="nhanVien" multiple onChange={this.handleMultiSelectCaNhanPhuTrach}>
                                    {
                                        ds_nhan_vien.map((ele, i) => (
                                            <option key={ele.maNhanVien} value={ ele.maNhanVien }>{ ele.tenNhanVien }</option>
                                        ))
                                    }
                                </AvField>
                            </AvGroup>
                                    <AvGroup>
                                        <label style={ { fontWeight: 900 } }>Trưởng đoàn</label>
                                        <AvField required style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                 type="select" name="truongDoan" value={ cdt.truongDoan }>
                                            {
                                                this.state.ds_ca_nhan.map((ele, i) => (
                                                    <option key={ele.maNhanVien} value={ ele.maNhanVien }>
                                                        {ele.tenNhanVien}
                                                    </option>
                                                ))}
                                            }
                                        </AvField>
                                    </AvGroup>
                                    <AvGroup>
                                        <label style={ { fontWeight: 900 } }>Thư ký</label>
                                        <AvField required style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                 type="select" name="thuKi" value={ cdt.thuKi }>
                                            {
                                                this.state.ds_ca_nhan.map((ele, i) => (
                                                    <option key={ele.maNhanVien} value={ ele.maNhanVien }>
                                                        {ele.tenNhanVien}
                                                    </option>
                                                ))}
                                            }
                                        </AvField>
                                    </AvGroup>
                            <AvGroup>
                                <label style={ { fontWeight: 900 } }>Số người tiếp nhận</label>
                                <AvField min={0} required style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                         type="number" name="soNguoiTiepNhan" value={cdt.soNguoiTiepNhan}/>
                            </AvGroup>
                            <AvGroup>
                                <Label style={ { fontWeight: 900 } }>Người tiếp nhận</Label>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } } readOnly name="nguoiTiepNhan"
                                         value={ this.state.ds_ca_nhan_tiep_nhan.map((ele, i) => (ele.tenNhanVien))} required/>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                         type="select" name="nguoiTiepNhan" multiple onChange={this.handleMultiSelectCaNhanTiepNhan}>
                                    {
                                        ds_nhan_vien_tiep_nhan.map((ele, i) => (
                                            <option key={ele.maNhanVien} value={ ele.maNhanVien }>{ ele.tenNhanVien }</option>
                                        ))
                                    }
                                </AvField>
                            </AvGroup>
                                    <AvGroup>
                                        <label style={ { fontWeight: 900 } }>Người đại diện</label>
                                        <AvField required style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                 type="select" name="nguoiDaiDien" value={ cdt.nguoiDaiDien }>
                                            {
                                                this.state.ds_ca_nhan_tiep_nhan.map((ele, i) => (
                                                    <option key={ele.maNhanVien} value={ ele.maNhanVien }>
                                                        {ele.tenNhanVien}
                                                    </option>
                                                ))}
                                            }
                                        </AvField>
                                    </AvGroup>
                        <AvGroup>
                            <Label style={ { fontWeight: 900 } }>Chọn tập tin chỉ đạo tuyến(Nhấn nút chọn tập tin để chọn tập tin)</Label>
                            <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } } hidden
                                     name="filecdt" id="filecdt" type="file" onChange={this.uploadTapTinCDT}/>
                            <Row>
                                <Col>
                                    <AvField style={ { width: '100%', fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                        readOnly
                                        type="text"
                                        className="form-control"
                                        name="tapTin"
                                        value={this.state.tap_tin}
                                    />
                                </Col>
                                <Col>
                                    <Button style={ { color: 'white', backgroundColor: '#0066ff', borderStyle: 'none' } } onClick={this.handleOnClickChonTapTin}>
                                        <span className="d-none d-md-inline">Chọn tập tin</span>
                                    </Button>
                                </Col>
                            </Row>
                        </AvGroup>
                        </Col>
                    </Row>
                    <Row/>
                    <Row className="justify-content-center" md="5">
                        <Button tag={Link}
                                to={`/cdt/${this.props.match.params.tinhthanh}/${this.props.match.params.donvi}/${this.props.match.params.nam}/${this.props.match.params.kehoach}`}
                                replace color="info">
                            <FontAwesomeIcon icon="arrow-left" />
                            &nbsp;
                            <span className="d-none d-md-inline">Trở về</span>
                        </Button>
                        &nbsp;
                        <Button color="primary" type="submit" disabled={isInvalid || updating}>
                            <FontAwesomeIcon icon="save" />
                            &nbsp; Lưu
                        </Button>
                    </Row>
                    </AvForm>
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
    ds_cdt_noidung: storeState.cdt.ds_cdt_noidung,
    ds_cdt_doituong: storeState.cdt.ds_cdt_doituong,
    ds_cdt_canhan_phutrach: storeState.cdt.ds_cdt_canhan_phutrach,
    ds_cdt_canhan_tiepnhan: storeState.cdt.ds_cdt_canhan_tiepnhan,
    updating: storeState.cdt.updating
});

const mapDispatchToProps = { getDanhSachDonVi, getDanhSachKeHoach, getDanhSachNam,
    getDanhSachHinhThuc, getDanhSachNoiDung, getDanhSachLoaiCDT, getMaxMa: getMaxMaCDT, uploadCDT,
    getCDT, addCDT_1, updateCDT_1, reset, getDanhSachDonViTiepNhan, getDanhSachDoiTuong,
    getDanhSachKhoaPhong, getDanhSachNhanVien, getDanhSachNhanVienTiepNhan,
    getDanhSachCDT_NoiDung, getDanhSachCDT_DoiTuong, getDanhSachCDT_CaNhan_PhuTrach,
    getDanhSachCDT_CaNhan_TiepNhan};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SuaCDT);
