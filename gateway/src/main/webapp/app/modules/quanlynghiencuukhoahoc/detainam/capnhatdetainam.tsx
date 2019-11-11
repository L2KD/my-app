import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Label, Row, Col } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField, AvFeedback, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getDanhSachLoaiDeTai, getDanhSachHangDeTai, getDanhSachNhomDeTai, getDanhSachNhanVien,
    getDanhSachChuThe, getDanhSachNguoiThucHien, getDeTaiNam, updateDeTaiNam } from 'app/modules/quanlynghiencuukhoahoc/detainam/detainam.reducer';
import { IRootState } from 'app/shared/reducers';
import { ILoaiDeTai } from 'app/modules/quanlynghiencuukhoahoc/loaidetai/loaidetai.model';
import { IHangDeTai } from 'app/modules/quanlynghiencuukhoahoc/hangdetai/hangdetai.model';
import { INhomDeTai } from 'app/modules/quanlynghiencuukhoahoc/nhomdetai/nhomdetai.model';
import { INhanVien } from 'app/modules/nhanvien/nhanvien.model';

export interface ICapNhatDeTaiNamProps extends StateProps, DispatchProps, RouteComponentProps<{
    detainam: string, tinhthanh: string, donvi: string, nam: string, trangthai: string }> {}

export interface ICapNhatDeTaiState {
    tinhthanh: any;
    donvi: any;
    taptin: any;
    ds_nguoi_thuc_hien: INhanVien[];
    ds_nam: any;
}

export class ThemDeTaiNam extends React.Component<ICapNhatDeTaiNamProps, ICapNhatDeTaiState> {
    state: ICapNhatDeTaiState = {
        tinhthanh: this.props.match.params.tinhthanh,
        donvi: this.props.match.params.donvi,
        taptin: '',
        ds_nguoi_thuc_hien: [],
        ds_nam: []
    };
    componentWillMount() {
        this.props.getDanhSachNguoiThucHien(this.props.match.params.detainam);
    }

    componentDidMount() {
        // this.props.getMaxMaDeTaiNam(0);
        this.props.getDeTaiNam(this.props.match.params.detainam);
        this.props.getDanhSachLoaiDeTai();
        this.props.getDanhSachHangDeTai();
        this.props.getDanhSachNhomDeTai();
        this.props.getDanhSachChuThe();
        this.props.getDanhSachNhanVien(this.props.match.params.donvi);

        const year = new Date().getFullYear();
        const val = [];
        for (let i = year - 5; i <= year + 5; i++) {
            val.push(i);
        }
        this.setState({ ds_nam: val });
    }

    componentWillReceiveProps() {
        this.setState({ ds_nguoi_thuc_hien: this.props.ds_nguoi_thuc_hien.concat() });
    }

    // componentWillUnmount() {
    //     this.props.reset();
    // }

    luuDeTaiNam = (event, values) => {
        this.props.updateDeTaiNam(values, this.props.match.params.trangthai, this.state.ds_nguoi_thuc_hien);
        this.props.history.push(`/quan-ly-nckh/de-tai-nam/${this.props.match.params.tinhthanh}/${this.props.match.params.donvi}/${this.props.match.params.nam}/${this.props.match.params.trangthai}`);
    }
    handleMultiSelectNguoiThucHien = e => {
        const options = e.target.options;
        const value = [];
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push({ maNhanVien: options[i].value, tenNhanVien: options[i].text });
            }
        }
        this.setState({ ds_nguoi_thuc_hien: value });
    }
    troVeDanhSach = () => {
        this.props.history.goBack();
    }

    render() {
        const isInvalid = false;
        const { detainam, ds_loai_de_tai, ds_hang_de_tai, ds_nhom_de_tai, ds_chu_the, ds_nhan_vien, loading, updating } = this.props;
        return (
            <div>
                <Row className="justify-content-center">
                    <Col md="8">
                        <h1>Cập nhật thông tin đề tài năm</h1>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md="8">
                        <AvForm onValidSubmit={this.luuDeTaiNam}>
                            {detainam.maDeTai ? (
                                <AvGroup hidden>
                                    <Label for="id">Mã đề tài năm</Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                             type="text" className="form-control" name="maDeTai" readOnly value={detainam.maDeTai} />
                                </AvGroup>
                            ) : null}
                            <AvGroup>
                                <Label style={ { fontWeight: 900 } }>Tên đề tài/sáng kiến</Label>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                    type="text"
                                    className="form-control"
                                    name="tenDeTai"
                                    readOnly
                                    value={detainam.tenDeTai}
                                />
                            </AvGroup>
                            <AvGroup>
                                <Label style={ { fontWeight: 900 } }>Năm công nhận đề tài năm<span style={{ color: 'red' }}>*</span></Label>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                         type="select"
                                         name="nam"
                                         required
                                         value={detainam.nam}
                                         validate={{
                                             required: {
                                                 value: true,
                                                 errorMessage: 'Chưa chọn năm công nhận đề tài.'
                                             }
                                         }}
                                >
                                    <option value="-1">--Chọn năm</option>
                                    {
                                        this.state.ds_nam.map((ele, i) => (
                                            <option key={ele} value={ ele }>
                                                {ele}
                                            </option>
                                        ))}
                                    }
                                </AvField>
                            </AvGroup>
                            <AvGroup>
                                <Label style={ { fontWeight: 900 } }>Loại đề tài <span style={{ color: 'red' }}>*</span></Label>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                         type="select"
                                         name="loaiDeTai"
                                         required
                                         value={detainam.loaiDeTai}
                                         validate={{
                                             required: {
                                                 value: true,
                                                 errorMessage: 'Chưa chọ loại đề tài.'
                                             }
                                         }}
                                >
                                    <option value="">--Chọn loại đề tài</option>
                                    {
                                        ds_loai_de_tai.map((ele, i) => (
                                            <option key={ele.maLoaiDeTai} value={ ele.maLoaiDeTai }>
                                                {ele.loaiDeTai}
                                            </option>
                                        ))}
                                    }
                                </AvField>
                            </AvGroup>
                            <AvGroup>
                                <Label style={ { fontWeight: 900 } }>Hạng đề tài <span style={{ color: 'red' }}>*</span></Label>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                         type="select"
                                         name="hangDeTai"
                                         required
                                         value={detainam.hangDeTai}
                                         validate={{
                                             required: {
                                                 value: true,
                                                 errorMessage: 'Chưa chọn phân hạng đề tài.'
                                             }
                                         }}
                                >
                                    <option value="">--Chọn hạng đề tài</option>
                                    {
                                        ds_hang_de_tai.map((ele, i) => (
                                            <option key={ele.maHangDeTai} value={ ele.maHangDeTai }>
                                                {ele.hangDeTai}
                                            </option>
                                        ))}
                                    }
                                </AvField>
                            </AvGroup>
                            <AvGroup>
                                <Label style={ { fontWeight: 900 } }>Chủ thể đề tài <span style={{ color: 'red' }}>*</span></Label>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                         type="select"
                                         name="chuThe"
                                         required
                                         value={detainam.nhomDeTai}
                                         validate={{
                                             required: {
                                                 value: true,
                                                 errorMessage: 'Chưa chọn chủ thể đề tài.'
                                             }
                                         }}
                                >
                                    <option value="">--Chọn chủ thể đề tài</option>
                                    {
                                        ds_chu_the.map((ele, i) => (
                                            <option key={ele.maChuThe} value={ ele.maChuThe }>
                                                {ele.chuTheDeTai}
                                            </option>
                                        ))}
                                    }
                                </AvField>
                            </AvGroup>
                            <AvGroup>
                                <Label style={ { fontWeight: 900 } }>Nhóm đề tài <span style={{ color: 'red' }}>*</span></Label>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                         type="select"
                                         name="nhomDeTai"
                                         required
                                         value={detainam.nhomDeTai}
                                         validate={{
                                             required: {
                                                 value: true,
                                                 errorMessage: 'Chưa chọn nhóm đề tài.'
                                             }
                                         }}
                                >
                                    <option value="">--Chọn nhóm đề tài</option>
                                    {
                                        ds_nhom_de_tai.map((ele, i) => (
                                            <option key={ele.maNhomDeTai} value={ ele.maNhomDeTai }>
                                                {ele.nhomDeTai}
                                            </option>
                                        ))}
                                    }
                                </AvField>
                            </AvGroup>
                            <AvGroup>
                                <Label style={ { fontWeight: 900 } }>Nhóm người thực hiện (Chọn danh sách người thực hiện)</Label>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } } readOnly name="dsNguoiThucHien"
                                         value={ this.state.ds_nguoi_thuc_hien.map((ele, i) => (ele.tenNhanVien))} required/>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                         type="select"
                                         name="nguoiThucHien"
                                         multiple
                                         onChange={this.handleMultiSelectNguoiThucHien}
                                         required
                                         validate={{
                                             required: {
                                                 value: true,
                                                 errorMessage: 'Chưa chọn người thực hiện.'
                                             }
                                         }}
                                >
                                    {
                                        ds_nhan_vien.map((ele, i) => (
                                            <option key={ele.maNhanVien} value={ ele.maNhanVien }>{ ele.tenNhanVien }</option>
                                        ))
                                    }
                                </AvField>
                            </AvGroup>
                            <AvGroup>
                                <Label style={ { fontWeight: 900 } }>Chủ nhiệm đề tài <span style={{ color: 'red' }}>*</span></Label>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                         type="select"
                                         name="chuNhiem"
                                         required
                                         value={detainam.chuNhiem}
                                         validate={{
                                             required: {
                                                 value: true,
                                                 errorMessage: 'Chưa chọn chủ nhiệm đề tài.'
                                             }
                                         }}
                                >
                                    <option value="">--Chọn chủ nhiệm đề tài</option>
                                    {
                                        this.state.ds_nguoi_thuc_hien.map((ele, i) => (
                                            <option key={ele.maNhanVien} value={ ele.maNhanVien }>
                                                {ele.tenNhanVien}
                                            </option>
                                        ))}
                                    }
                                </AvField>
                            </AvGroup>
                            <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                     hidden name="donVi" value={detainam.donVi}/>
                            <Button tag={Link}
                                    to={`/quan-ly-nckh/de-tai-nam/${this.props.match.params.tinhthanh}/${this.props.match.params.donvi}/${this.props.match.params.nam}/${this.props.match.params.trangthai}`}
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
                        </AvForm>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (storeState: IRootState) => ({
    detainam: storeState.detainam.de_tai_nam,
    ds_loai_de_tai: storeState.detainam.ds_loai_de_tai,
    ds_hang_de_tai: storeState.detainam.ds_hang_de_tai,
    ds_nhom_de_tai: storeState.detainam.ds_nhom_de_tai,
    ds_chu_the: storeState.detainam.ds_chu_the,
    ds_nhan_vien: storeState.detainam.ds_nhan_vien,
    ds_nguoi_thuc_hien: storeState.detainam.ds_nguoi_thuc_hien,
    max_ma: storeState.detainam.max_ma_de_tai,
    loading: storeState.detainam.loading,
    updating: storeState.detainam.updating
});

const mapDispatchToProps = { getDanhSachLoaiDeTai, getDanhSachHangDeTai, getDanhSachNhomDeTai, getDanhSachNhanVien,
    getDanhSachChuThe, getDanhSachNguoiThucHien, getDeTaiNam, updateDeTaiNam };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ThemDeTaiNam);
