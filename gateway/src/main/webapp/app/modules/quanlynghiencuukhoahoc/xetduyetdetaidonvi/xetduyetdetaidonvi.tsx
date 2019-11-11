import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Label, Row, Col } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField, AvFeedback, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getXetDuyetDeTaiDonVi, uploadTapTinXetDuyetDeTaiDonVi, updateXetDuyetDeTaiDonVi, reset } from './xetduyetdetaidonvi.reducer';
import { IRootState } from 'app/shared/reducers';
import { IKhoaPhong } from 'app/modules/khoaphong/khoaphong.model';

export interface IXetDuyetDeTaiDonViProps extends StateProps, DispatchProps, RouteComponentProps<{ xetduyetdetaidonvi: string,
    tinhthanh: string, donvi: string, nam: string, trangthai: string}> {}

export class XetDuyetDeTaiDonVi extends React.Component<IXetDuyetDeTaiDonViProps> {
    state = {
        tap_tin: ''
    };
    componentDidMount() {
        this.props.getXetDuyetDeTaiDonVi(this.props.match.params.xetduyetdetaidonvi);
    }

    componentWillUnmount() {
        this.props.reset();
    }
    componentWillReceiveProps(nextProps: Readonly<IXetDuyetDeTaiDonViProps>, nextContext: any): void {
        this.setState({ tap_tin: nextProps.xetduyetdetaidonvi.tapTin });
    }

    luuXetDuyetDeTaiDonVi = (event, values) => {
        this.props.updateXetDuyetDeTaiDonVi(values, values.donVi, values.ngayXetDuyet.substring(0, 4), this.props.match.params.trangthai);
        this.troVeDanhSach();
    };
    uploadFileBienBanXetDuyetDeTaiDonVi = e => {
        const data = new FormData();
        const file = e.target.files[0];
        data.append('tap_tin', e.target.files[0]);
        this.setState({ tap_tin: file.name });
        this.props.uploadTapTinXetDuyetDeTaiDonVi(data);
    }
    troVeDanhSach = () => {
        this.props.history.push(`/quan-ly-nckh/xet-duyet-de-tai-don-vi/${this.props.match.params.tinhthanh}/${this.props.match.params.donvi}/${this.props.match.params.nam}/${this.props.match.params.trangthai}`);
        // this.props.history.goBack();
    }
    handleOnClickChonTapTin = (event: React.MouseEvent<HTMLElement>) => {
        if (document.getElementById('filedecuong') !== null) {
            document.getElementById('filedecuong').click();
        }
    }

    render() {
        const isInvalid = false;
        const { xetduyetdetaidonvi, loading, updating } = this.props;
        return (
            <div>
                <Row className="justify-content-center">
                    <Col md="8">
                        <h1>Cập nhật xét duyệt đề cương</h1>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md="8">
                        <AvForm onValidSubmit={this.luuXetDuyetDeTaiDonVi}>
                            {xetduyetdetaidonvi.maDeTai ? (
                                <AvGroup hidden>
                                    <Label for="id">Mã xét duyệt đề cương</Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                             type="text" className="form-control" name="maDeTai" readOnly value={xetduyetdetaidonvi.maDeTai} />
                                </AvGroup>
                            ) : null}
                            <AvGroup>
                                <Label style={ { fontWeight: 900 } }>Tên đề tài/sáng kiến</Label>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                    readOnly
                                    type="text"
                                    className="form-control"
                                    name="tenDeTai"
                                    value={xetduyetdetaidonvi.tenDeTai}
                                />
                            </AvGroup>
                            <AvGroup>
                                <Label style={ { fontWeight: 900 } }>Ngày xét duyệt <span style={{ color: 'red' }}>*</span></Label>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                    type="date"
                                    className="form-control"
                                    name="ngayXetDuyet"
                                         required
                                    value={xetduyetdetaidonvi.ngayXetDuyet !== '' ? xetduyetdetaidonvi.ngayXetDuyet :
                                        new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate()}
                                         validate={{
                                             required: {
                                                 value: true,
                                                 errorMessage: 'Chưa nhập ngày xét duyệt.'
                                             }
                                         }}
                                />
                            </AvGroup>
                            <AvGroup>
                                <Label style={ { fontWeight: 900 } }>Nội dung góp ý</Label>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                    type="text"
                                    className="form-control"
                                    name="noiDungGopY"
                                    value={xetduyetdetaidonvi.noiDungGopY}
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
                                                 errorMessage: 'Chưa chọn xét duyệt'
                                             }
                                         }}
                                        value={ xetduyetdetaidonvi.xetDuyet }
                                >
                                    <option value="">--Chọn xét duyệt</option>
                                    <option value={1}>Duyệt</option>
                                    <option value={2}>Không duyệt</option>
                                </AvField>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                         name="trangThai" hidden value={xetduyetdetaidonvi.trangThai}/>
                            </AvGroup>
                            <AvGroup>
                                <Label style={ { fontWeight: 900 } }> Tập tin biên bản xét duyệt của đề tài(Nhấn nút chọn tập tin để chọn biên bản)</Label>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                         hidden name="filedecuong" id="filedecuong" type="file" onChange={this.uploadFileBienBanXetDuyetDeTaiDonVi}/>
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
                            <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                hidden
                                type="text"
                                className="form-control"
                                name="donVi"
                                value={xetduyetdetaidonvi.donVi}
                            />
                            <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                hidden
                                type="text"
                                className="form-control"
                                name="trangThai"
                                value={xetduyetdetaidonvi.trangThai}
                            />
                            <Button tag={Link}
                                    to={`/quan-ly-nckh/xet-duyet-de-tai-don-vi/${this.props.match.params.tinhthanh}/${this.props.match.params.donvi}/${this.props.match.params.nam}/${this.props.match.params.trangthai}`}
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
    xetduyetdetaidonvi: storeState.xetduyetdetaidonvi.xet_duyet_de_tai_don_vi,
    loading: storeState.xetduyetdetaidonvi.loading,
    updating: storeState.xetduyetdetaidonvi.updating
});

const mapDispatchToProps = { getXetDuyetDeTaiDonVi, uploadTapTinXetDuyetDeTaiDonVi, updateXetDuyetDeTaiDonVi, reset };
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(XetDuyetDeTaiDonVi);
