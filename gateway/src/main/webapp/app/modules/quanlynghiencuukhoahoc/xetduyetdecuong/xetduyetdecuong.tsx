import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Label, Row, Col } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField, AvFeedback, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getXetDuyetDeCuong, uploadDeCuongXetDuyetDeCuong, uploadBienBanXetDuyetDeCuong, updateXetDuyetDeCuong, reset } from './xetduyetdecuong.reducer';
import { IRootState } from 'app/shared/reducers';
import { IKhoaPhong } from 'app/modules/khoaphong/khoaphong.model';

export interface IXetDuyetDeCuongProps extends StateProps, DispatchProps, RouteComponentProps<{
    xetduyetdecuong: string, tinhthanh: string, donvi: string, nam: string, trangthai: string }> {}

export class XetDuyetDeCuong extends React.Component<IXetDuyetDeCuongProps> {
    state = {
        tap_tin_de_cuong: '',
        tap_tin_bien_ban: ''
    };
    componentDidMount() {
        this.props.getXetDuyetDeCuong(this.props.match.params.xetduyetdecuong);
    }

    componentWillUnmount() {
        this.props.reset();
    }

    componentWillReceiveProps(nextProps: Readonly<IXetDuyetDeCuongProps>, nextContext: any): void {
        this.setState({ tap_tin_de_cuong: nextProps.xetduyetdecuong.tapTinDeCuong, tap_tin_bien_ban: nextProps.xetduyetdecuong.tapTinBienBan });
    }

    luuXetDuyetDeCuong = (event, values) => {
        this.props.updateXetDuyetDeCuong(values, values.donVi, values.ngayDangKy.substring(0, 4), values.trangThai);
        this.props.history.push(`/quan-ly-nckh/xet-duyet-de-cuong/${this.props.match.params.tinhthanh}/${this.props.match.params.donvi}/${this.props.match.params.nam}/${this.props.match.params.trangthai}`);
    };
    uploadFileDeCuongXetDuyetDeCuong = e => {
        const data = new FormData();
        const file = e.target.files[0];
        data.append('tap_tin', e.target.files[0]);
        this.setState({ tap_tin_de_cuong: file.name });
        this.props.uploadDeCuongXetDuyetDeCuong(data);
    }
    uploadFileBienBanXetDuyetDeCuong = e => {
        const data = new FormData();
        const file = e.target.files[0];
        data.append('tap_tin', e.target.files[0]);
        this.setState({ tap_tin_bien_ban: file.name });
        this.props.uploadBienBanXetDuyetDeCuong(data);
    }
    handleOnClickChonTapTinDeCuong = (event: React.MouseEvent<HTMLElement>) => {
        if (document.getElementById('filedecuong') !== null) {
            document.getElementById('filedecuong').click();
        }
    }
    handleOnClickChonTapTinBienBan = (event: React.MouseEvent<HTMLElement>) => {
        if (document.getElementById('filebienban') !== null) {
            document.getElementById('filebienban').click();
        }
    }
    troVeDanhSach = () => {
        this.props.history.goBack();
    }

    render() {
        const isInvalid = false;
        const { xetduyetdecuong, loading, updating } = this.props;
        return (
            <div>
                <Row className="justify-content-center">
                    <Col md="8">
                        <h1>Cập nhật xét duyệt đề cương</h1>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md="8">
                        <AvForm onValidSubmit={this.luuXetDuyetDeCuong}>
                            {xetduyetdecuong.maDeTai ? (
                                <AvGroup hidden>
                                    <Label for="id">Mã xét duyệt đề cương</Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                             type="text" className="form-control" name="maDeTai" readOnly value={xetduyetdecuong.maDeTai} />
                                </AvGroup>
                            ) : null}
                            <AvGroup>
                                <Label style={ { fontWeight: 900 } }>Tên đề tài/sáng kiến</Label>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                    readOnly
                                    type="text"
                                    className="form-control"
                                    name="tenDeTai"
                                    value={xetduyetdecuong.tenDeTai}
                                />
                            </AvGroup>
                            <AvGroup>
                                <Label style={ { fontWeight: 900 } }>Ngày đăng ký</Label>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                    readOnly
                                    type="date"
                                    className="form-control"
                                    name="ngayDangKy"
                                    value={xetduyetdecuong.ngayDangKy}
                                />
                            </AvGroup>
                            <AvGroup>
                                <Label style={ { fontWeight: 900 } }>Ngày xét duyệt <span style={{ color: 'red' }}>*</span></Label>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                    type="date"
                                    className="form-control"
                                    name="ngayXetDuyet"
                                    value={xetduyetdecuong.ngayXetDuyet !== '' ? xetduyetdecuong.ngayXetDuyet :
                                        new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate()}
                                />
                            </AvGroup>
                            <AvGroup>
                                <Label style={ { fontWeight: 900 } }>Nội dung góp ý</Label>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                    type="text"
                                    className="form-control"
                                    name="noiDungGopY"
                                    value={xetduyetdecuong.noiDungGopY}
                                />
                            </AvGroup>
                            <AvGroup>
                                <Label style={ { fontWeight: 900 } }>Xét duyệt <span style={{ color: 'red' }}>*</span></Label>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                    required
                                    type="select"
                                    className="form-control"
                                    name="xetDuyet"
                                         validate={{
                                             required: {
                                                 value: true,
                                                 errorMessage: 'Chưa chọn xét duyệt đề cương'
                                             }
                                         }}
                                    value={ xetduyetdecuong.xetDuyet }
                                >
                                    <option value="">--Chọn xét duyệt</option>
                                    <option value={1}>Duyệt</option>
                                    <option value={2}>Không duyệt</option>
                                </AvField>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                         name="trangThai" hidden value={xetduyetdecuong.trangThai}/>
                            </AvGroup>
                            <AvGroup>
                                <Label style = { { fontWeight: 900 } }>Chọn tập tin đề cương của đề tài (Nhấn nút chọn tập tin để chọn tập tin đề cương)</Label>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                         hidden name="filedecuong" id="filedecuong" type="file" onChange={this.uploadFileDeCuongXetDuyetDeCuong}/>
                                <Row>
                                    <Col>
                                        <AvField style={ { width: '100%', fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                 readOnly
                                                 type="text"
                                                 className="form-control"
                                                 name="tapTinDeCuong"
                                                 value={this.state.tap_tin_de_cuong}
                                        />
                                    </Col>
                                    <Col>
                                        <Button style={ { color: 'white', backgroundColor: '#0066ff', borderStyle: 'none' } } onClick={this.handleOnClickChonTapTinDeCuong}>
                                            <span className="d-none d-md-inline">Chọn tập tin</span>
                                        </Button>
                                    </Col>
                                </Row>
                            </AvGroup>
                            <AvGroup>
                                <Label style = { { fontWeight: 900 } }>Chọn tập tin biên bản xét duyệt đề cương (Nhấn nút chọn tập tin để chọn tập tin biên bản)</Label>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                         hidden name="filebienban" id="filebienban" type="file" onChange={this.uploadFileBienBanXetDuyetDeCuong}/>
                                <Row>
                                    <Col>
                                        <AvField style={ { width: '100%', fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                 readOnly
                                                 type="text"
                                                 className="form-control"
                                                 name="tapTinBienBan"
                                                 value={this.state.tap_tin_bien_ban}
                                        />
                                    </Col>
                                    <Col>
                                        <Button style={ { color: 'white', backgroundColor: '#0066ff', borderStyle: 'none' } } onClick={this.handleOnClickChonTapTinBienBan}>
                                            <span className="d-none d-md-inline">Chọn tập tin</span>
                                        </Button>
                                    </Col>
                                </Row>
                            </AvGroup>
                            <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                hidden
                                type="text"
                                className="form-control"
                                name="donVi"
                                value={xetduyetdecuong.donVi}
                            />
                            <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                hidden
                                type="text"
                                className="form-control"
                                name="trangThai"
                                value={xetduyetdecuong.trangThai}
                            />
                            <Button tag={Link}
                                    to={`/quan-ly-nckh/xet-duyet-de-cuong/${this.props.match.params.tinhthanh}/${this.props.match.params.donvi}/${this.props.match.params.nam}/${this.props.match.params.trangthai}`}
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
    xetduyetdecuong: storeState.xetduyetdecuong.xet_duyet_de_cuong,
    loading: storeState.xetduyetdecuong.loading,
    updating: storeState.xetduyetdecuong.updating
});

const mapDispatchToProps = { getXetDuyetDeCuong, uploadDeCuongXetDuyetDeCuong, uploadBienBanXetDuyetDeCuong, updateXetDuyetDeCuong, reset };
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(XetDuyetDeCuong);
