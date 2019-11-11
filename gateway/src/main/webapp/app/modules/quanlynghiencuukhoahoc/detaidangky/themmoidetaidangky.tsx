import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Label, Row, Col } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField, AvFeedback, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getDeTaiDangKy, getDanhSachDonVi, getDanhSachKhoaPhong, getDanhSachKhoaPhongDeTai,
    getMaxMaDeTaiDangKy, uploadDeTaiDangKy, addDeTaiDangKy_1, updateDeTaiDangKy_1, reset } from './detaidangky.reducer';
import { IRootState } from 'app/shared/reducers';
import { IKhoaPhong } from 'app/modules/khoaphong/khoaphong.model';

export interface IThemMoiDeTaiDangKyProps extends StateProps, DispatchProps, RouteComponentProps<{
    detaidangky: string, tinhthanh: string, donvi: string, nam: string }> {}

export interface IThemMoiDeTaiDangKyState {
    isNew: boolean;
    tinhthanh: any;
    donvi: any;
    tap_tin: any;
    ds_khoa_phong: IKhoaPhong[];
}

export class ThemDeTaiDangKy extends React.Component<IThemMoiDeTaiDangKyProps, IThemMoiDeTaiDangKyState> {
    state: IThemMoiDeTaiDangKyState = {
        isNew: !this.props.match.params || !this.props.match.params.detaidangky,
        tinhthanh: this.props.match.params.tinhthanh,
        donvi: this.props.match.params.donvi,
        tap_tin: '',
        ds_khoa_phong: []
    };

    componentDidMount() {
        this.props.getMaxMaDeTaiDangKy(0);
        this.props.getDanhSachDonVi(this.state.tinhthanh);
        if (this.state.isNew) {
            this.props.reset();
        } else {
            this.props.getDeTaiDangKy(this.props.match.params.detaidangky);
            this.props.getDanhSachKhoaPhong(this.props.match.params.donvi);
            this.props.getDanhSachKhoaPhongDeTai(this.props.match.params.detaidangky);
        }
    }

    componentWillReceiveProps(nextProps: Readonly<IThemMoiDeTaiDangKyProps>, nextContext: any): void {
        this.setState({ ds_khoa_phong: nextProps.ds_khoa_phong_de_tai.concat(), tap_tin: nextProps.detaidangky.tapTin });
    }

    componentWillUnmount() {
        this.props.reset();
    }

    luuDeTaiDangKy = (event, values) => {
        if (this.state.isNew) {
            if (!(this.state.ds_khoa_phong === null) || !(this.state.ds_khoa_phong === undefined)) {
                this.props.addDeTaiDangKy_1(values, this.props.max_ma + 1, this.state.ds_khoa_phong);
            }
        } else {
            this.props.updateDeTaiDangKy_1(values, this.state.ds_khoa_phong);
        }
        this.props.history.push(`/quan-ly-nckh/de-tai-dang-ky/${this.props.match.params.tinhthanh}/${this.props.match.params.donvi}/${this.props.match.params.nam}`);
    };

    handleSelectDonVi = (event: React.FormEvent<HTMLSelectElement>) => {
        const element = event.target as HTMLSelectElement;
        this.props.getDanhSachKhoaPhong(element.value);
    }
    handleMultiSelectKhoaPhongThucHien = e => {
        const options = e.target.options;
        const value = [];
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push({ maKhoaPhong: options[i].value, tenKhoaPhong: options[i].text });
            }
        }
        this.setState({ ds_khoa_phong: value });
    }
    uploadFileDeTaiDangKy = e => {
        const data = new FormData();
        const file = e.target.files[0];
        data.append('tap_tin', e.target.files[0]);
        this.setState({ tap_tin: file.name });
        this.props.uploadDeTaiDangKy(data);
    }

    handleOnClickChonTapTin = (event: React.MouseEvent<HTMLElement>) => {
        if (document.getElementById('filedetai') !== null) {
            document.getElementById('filedetai').click();
        }
    }
    troVeDanhSach = () => {
        this.props.history.goBack();
    }

    render() {
        const isInvalid = false;
        const { detaidangky, ds_don_vi, ds_khoa_phong, loading, updating } = this.props;
        return (
            <div>
                <Row className="justify-content-center">
                    <Col md="8">
                        {this.state.isNew ? (<h1>Thêm mới đề tài đăng ký</h1>) : (<h1>Cập nhật đề tài đăng ký</h1>)}
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md="8">
                            <AvForm onValidSubmit={this.luuDeTaiDangKy}>
                                {detaidangky.maDeTai ? (
                                <AvGroup hidden>
                                <Label for="id">Mã đề tài đăng ký</Label>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                         type="text" className="form-control" name="maDeTai" readOnly value={detaidangky.maDeTai} />
                                </AvGroup>
                                ) : null}
                                {
                                    this.state.isNew ? (
                                        <AvGroup>
                                            <Label style={ { fontWeight: 900 } }>Đơn vị <span style={{ color: 'red' }}>*</span></Label>
                                            <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                     type="select"
                                                     name="donVi"
                                                     onChange={this.handleSelectDonVi}
                                                     required
                                                     validate={{
                                                         required: {
                                                             value: true,
                                                             errorMessage: 'Chưa chọn đơn vị.'
                                                         }
                                                     }}
                                            >
                                                <option value="">--Chọn đơn vị</option>
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
                                            <Label style={ { fontWeight: 900 } }>Đơn vị <span style={{ color: 'red' }}>*</span></Label>
                                            <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                     type="select" name="donVi" value={ detaidangky.donVi }>
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
                                <AvGroup>
                                    <Label style={ { fontWeight: 900 } }>Tên đề tài/sáng kiến <span style={{ color: 'red' }}>*</span></Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                        type="text"
                                        className="form-control"
                                        name="tenDeTai"
                                        validate={{
                                            required: {
                                                value: true,
                                                errorMessage: 'Chưa nhập tên đề tài.'
                                            },
                                            minLength: {
                                                value: 1,
                                                errorMessage: 'Chưa nhập tên đề tài.'
                                            },
                                            maxLength: {
                                                value: 100,
                                                errorMessage: 'Tên đề tài không vượt quá 100 kí tự'
                                            }
                                        }}
                                        value={detaidangky.tenDeTai}
                                    />
                                </AvGroup>
                                <AvGroup>
                                    <Label style={ { fontWeight: 900 } }>Ngày đăng ký <span style={{ color: 'red' }}>*</span></Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                        type="date"
                                        className="form-control"
                                        name="ngayDangKy"
                                        validate={{
                                            required: {
                                                value: true,
                                                errorMessage: 'Chưa nhập ngày đăng ký.'
                                            }
                                        }}
                                        value={detaidangky.ngayDangKy}
                                    />
                                </AvGroup>
                                <AvGroup>
                                    <Label style={ { fontWeight: 900 } }>Khoa phòng thực hiện (Chọn danh sách khoa phòng thực hiện) <span style={{ color: 'red' }}>*</span></Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } } readOnly name="khoaPhong"
                                             value={ this.state.ds_khoa_phong.map((ele, i) => (ele.tenKhoaPhong))} required/>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                             type="select" name="khoaPhongThucHien" multiple onChange={this.handleMultiSelectKhoaPhongThucHien}>
                                        {
                                            ds_khoa_phong.map((ele, i) => (
                                                <option key={ele.maKhoaPhong} value={ ele.maKhoaPhong }>{ ele.tenKhoaPhong }</option>
                                            ))
                                        }
                                    </AvField>
                                </AvGroup>
                                {
                                    this.state.isNew ? (
                                        <AvGroup>
                                            <Label style={ { fontWeight: 900 } }>Khoa phòng chủ nhiệm <span style={{ color: 'red' }}>*</span></Label>
                                            <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                     type="select"
                                                     name="khoaPhongChuNhiem"
                                                     required
                                                     validate={{
                                                         required: {
                                                             value: true,
                                                             errorMessage: 'Chưa chọn khoa chủ nhiệm.'
                                                         }
                                                     }}
                                            >
                                                <option value="">--Chọn khoa phòng chủ nhiệm</option>
                                                {
                                                    this.state.ds_khoa_phong.map((ele, i) => (
                                                        <option key={ele.maKhoaPhong} value={ ele.maKhoaPhong }>
                                                            {ele.tenKhoaPhong}
                                                        </option>
                                                    ))}
                                                }
                                            </AvField>
                                        </AvGroup>
                                    ) : (
                                        <AvGroup>
                                            <label style={ { fontWeight: 900 } }>Khoa phòng chủ nhiệm <span style={{ color: 'red' }}>*</span></label>
                                            <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                     type="select" name="khoaPhongChuNhiem" value={ detaidangky.khoaPhongChuNhiem } required>
                                                {
                                                    this.state.ds_khoa_phong.map((ele, i) => (
                                                        <option key={ele.maKhoaPhong} value={ ele.maKhoaPhong }>
                                                            {ele.tenKhoaPhong}
                                                        </option>
                                                    ))}
                                                }
                                            </AvField>
                                        </AvGroup>
                                    )
                                }
                                <AvGroup>
                                    <Label style = { { fontWeight: 900 } }>Chọn tập tin đề tài(Nhấn nút chọn tập tin để chọn tập tin đề tài)</Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                             hidden name="filedetai" id="filedetai" type="file" onChange={this.uploadFileDeTaiDangKy}/>
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
                                <Button tag={Link} to={`/quan-ly-nckh/de-tai-dang-ky/${this.props.match.params.tinhthanh}/${this.props.match.params.donvi}/${this.props.match.params.nam}`} replace color="info">
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
    detaidangky: storeState.detaidangky.de_tai_dang_ky,
    ds_don_vi: storeState.detaidangky.ds_don_vi,
    ds_khoa_phong: storeState.detaidangky.ds_khoa_phong,
    ds_khoa_phong_de_tai: storeState.detaidangky.ds_khoa_phong_de_tai,
    max_ma: storeState.detaidangky.max_ma_de_tai,
    loading: storeState.detaidangky.loading,
    updating: storeState.detaidangky.updating
});

const mapDispatchToProps = { getDeTaiDangKy, getDanhSachDonVi, getDanhSachKhoaPhong, getDanhSachKhoaPhongDeTai,
    getMaxMaDeTaiDangKy, uploadDeTaiDangKy, addDeTaiDangKy_1, updateDeTaiDangKy_1, reset };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ThemDeTaiDangKy);
