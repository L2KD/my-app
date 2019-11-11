import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Label, Row, Col } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField, AvFeedback, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getXetDuyetBaoCaoTongKet, uploadXetDuyetBaoCaoTongKet, updateXetDuyetBaoCaoTongKet, reset } from './xetduyetbaocaotongket.reducer';
import { IRootState } from 'app/shared/reducers';
import { IKhoaPhong } from 'app/modules/khoaphong/khoaphong.model';

export interface IXetDyetBaoCaoTongKetProps extends StateProps, DispatchProps, RouteComponentProps<{
    xetduyetbaocaotongket: string, tinhthanh: string, donvi: string, nam: string, trangthai: string }> {}

export class XetDyetBaoCaoTongKet extends React.Component<IXetDyetBaoCaoTongKetProps> {
    state = {
        tap_tin: ''
    };
    componentDidMount() {
        this.props.getXetDuyetBaoCaoTongKet(this.props.match.params.xetduyetbaocaotongket);
    }

    componentWillUnmount() {
        this.props.reset();
    }
    componentWillReceiveProps(nextProps: Readonly<IXetDyetBaoCaoTongKetProps>, nextContext: any): void {
        this.setState({ tap_tin: nextProps.xetduyetbaocaotongket.tapTin });
    }

    luuXetDyetBaoCaoTongKet = (event, values) => {
        this.props.updateXetDuyetBaoCaoTongKet(values, values.donVi, values.ngayDangKy.substring(0, 4), values.trangThai);
        this.props.history.push(`/quan-ly-nckh/xet-duyet-bao-cao-tong-ket/${this.props.match.params.tinhthanh}/${this.props.match.params.donvi}/${this.props.match.params.nam}/${this.props.match.params.trangthai}`);
    };
    handleOnClickChonTapTinBaoCaoTongKet = (event: React.MouseEvent<HTMLElement>) => {
        if (document.getElementById('filexetduyet') !== null) {
            document.getElementById('filexetduyet').click();
        }
    }
    uploadFileXetDyetBaoCaoTongKet = e => {
        const data = new FormData();
        const file = e.target.files[0];
        data.append('tap_tin', e.target.files[0]);
        this.setState({ tap_tin: file.name });
        this.props.uploadXetDuyetBaoCaoTongKet(data);
    }
    troVeDanhSach = () => {
        this.props.history.goBack();
    }

    render() {
        const isInvalid = false;
        const { xetduyetbaocaotongket, loading, updating } = this.props;
        return (
            <div>
                <Row className="justify-content-center">
                    <Col md="8">
                        <h1>Cập nhật xét duyệt đề tài</h1>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md="8">
                        <AvForm onValidSubmit={this.luuXetDyetBaoCaoTongKet}>
                            {xetduyetbaocaotongket.maDeTai ? (
                                <AvGroup hidden>
                                    <Label for="id">Mã xét duyệt đề tài</Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                             type="text" className="form-control" name="maDeTai" readOnly value={xetduyetbaocaotongket.maDeTai} />
                                </AvGroup>
                            ) : null}
                            <AvGroup>
                                <Label style={ { fontWeight: 900 } }>Tên đề tài/sáng kiến</Label>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                    readOnly
                                    type="text"
                                    className="form-control"
                                    name="tenDeTai"
                                    value={xetduyetbaocaotongket.tenDeTai}
                                />
                            </AvGroup>
                            <AvGroup>
                                <Label style={ { fontWeight: 900 } }>Ngày đăng ký</Label>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                    readOnly
                                    type="date"
                                    className="form-control"
                                    name="ngayDangKy"
                                    value={xetduyetbaocaotongket.ngayDangKy}
                                />
                            </AvGroup>
                            <AvGroup>
                                <Label style={ { fontWeight: 900 } }>Ngày xét duyệt <span style={{ color: 'red' }}>*</span></Label>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                    type="date"
                                    className="form-control"
                                    name="ngayXetDuyet"
                                         validate={{
                                             required: {
                                                 value: true,
                                                 errorMessage: 'Chưa chọn ngày xét duyệt.'
                                             }
                                         }}
                                    value={xetduyetbaocaotongket.ngayXetDuyet !== '' ? xetduyetbaocaotongket.ngayXetDuyet :
                                        new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate()}
                                />
                            </AvGroup>
                            <AvGroup>
                                <Label style={ { fontWeight: 900 } }>Nội dung góp ý</Label>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                    type="text"
                                    className="form-control"
                                    name="noiDungGopY"
                                    value={xetduyetbaocaotongket.noiDungGopY}
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
                                                 errorMessage: 'Chưa chọn xét duyệt.'
                                             }
                                         }}
                                    value={ xetduyetbaocaotongket.xetDuyet }
                                >
                                    <option value="">--Chọn xét duyệt</option>
                                    <option value={1}>Duyệt</option>
                                    <option value={2}>Không duyệt</option>
                                </AvField>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                         name="trangThai" hidden value={xetduyetbaocaotongket.trangThai}/>
                            </AvGroup>
                            <AvGroup>
                                <Label style = { { fontWeight: 900 } }>Chọn tập tin biên bản xét duyệt báo cáo tổng kết (Nhấn nút chọn tập tin để chọn tập tin xét duyệt)</Label>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                         hidden name="filexetduyet" id="filexetduyet" type="file" onChange={this.uploadFileXetDyetBaoCaoTongKet}/>
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
                                        <Button style={ { color: 'white', backgroundColor: '#0066ff', borderStyle: 'none' } } onClick={this.handleOnClickChonTapTinBaoCaoTongKet}>
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
                                value={xetduyetbaocaotongket.donVi}
                            />
                            <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                hidden
                                type="text"
                                className="form-control"
                                name="trangThai"
                                value={xetduyetbaocaotongket.trangThai}
                            />
                            <Button tag={Link}
                                    to={`/quan-ly-nckh/xet-duyet-bao-cao-tong-ket/${this.props.match.params.tinhthanh}/${this.props.match.params.donvi}/${this.props.match.params.nam}/${this.props.match.params.trangthai}`}
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
    xetduyetbaocaotongket: storeState.xetduyetbaocaotongket.xet_duyet_bao_cao_tong_ket,
    loading: storeState.xetduyetbaocaotongket.loading,
    updating: storeState.xetduyetbaocaotongket.updating
});

const mapDispatchToProps = { getXetDuyetBaoCaoTongKet, uploadXetDuyetBaoCaoTongKet, updateXetDuyetBaoCaoTongKet, reset };
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(XetDyetBaoCaoTongKet);
