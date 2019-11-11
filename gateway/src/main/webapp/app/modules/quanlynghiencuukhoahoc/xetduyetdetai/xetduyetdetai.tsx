import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Label, Row, Col } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField, AvFeedback, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getXetDuyetDeTai, uploadXetDuyetDeTai, updateXetDuyetDeTai, reset } from './xetduyetdetai.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IXetDuyetDeTaiProps extends StateProps, DispatchProps, RouteComponentProps<{
    xetduyetdetai: string, tinhthanh: string, donvi: string, nam: string, trangthai: string }> {}

export class XetDuyetDeTai extends React.Component<IXetDuyetDeTaiProps> {
    state = {
        tap_tin: ''
    };
    componentDidMount() {
        this.props.getXetDuyetDeTai(this.props.match.params.xetduyetdetai);
    }

    componentWillUnmount() {
        this.props.reset();
    }

    luuXetDuyetDeTai = (event, values) => {
        this.props.updateXetDuyetDeTai(values, values.donVi, values.ngayDangKy.substring(0, 4), values.trangThai);
        this.props.history.push(`/quan-ly-nckh/xet-duyet-de-tai/${this.props.match.params.tinhthanh}/${this.props.match.params.donvi}/${this.props.match.params.nam}/${this.props.match.params.trangthai}`);
    };
    handleOnClickChonTapTin = (event: React.MouseEvent<HTMLElement>) => {
        if (document.getElementById('filexetduyet') !== null) {
            document.getElementById('filexetduyet').click();
        }
    }
    uploadFileXetDuyetDeTai = e => {
        const data = new FormData();
        const file = e.target.files[0];
        data.append('tap_tin', e.target.files[0]);
        this.setState({ tap_tin: file.name });
        this.props.uploadXetDuyetDeTai(data);
    }

    render() {
        const isInvalid = false;
        const { xetduyetdetai, loading, updating } = this.props;
        return (
            <div>
                <Row className="justify-content-center">
                    <Col md="8">
                        <h1>Cập nhật xét duyệt đề tài</h1>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md="8">
                        <AvForm onValidSubmit={this.luuXetDuyetDeTai}>
                            {xetduyetdetai.maDeTai ? (
                                <AvGroup hidden>
                                    <Label for="id">Mã xét duyệt đề tài</Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                             type="text" className="form-control" name="maDeTai" readOnly value={xetduyetdetai.maDeTai} />
                                </AvGroup>
                            ) : null}
                            <AvGroup>
                                <Label style={ { fontWeight: 900 } }>Tên đề tài/sáng kiến</Label>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                    readOnly
                                    type="text"
                                    className="form-control"
                                    name="tenDeTai"
                                    value={xetduyetdetai.tenDeTai}
                                />
                            </AvGroup>
                            <AvGroup>
                                <Label style={ { fontWeight: 900 } }>Ngày đăng ký</Label>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                    readOnly
                                    type="date"
                                    className="form-control"
                                    name="ngayDangKy"
                                    value={xetduyetdetai.ngayDangKy}
                                />
                            </AvGroup>
                            <AvGroup>
                                <Label style={ { fontWeight: 900 } }>Ngày xét duyệt <span style={{ color: 'red' }}>*</span></Label>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                    type="date"
                                    className="form-control"
                                    name="ngayXetDuyet"
                                         required
                                         validate={{
                                             required: {
                                                 value: true,
                                                 errorMessage: 'Chưa chọn ngày xét duyệt.'
                                             }
                                         }}
                                    value={xetduyetdetai.ngayXetDuyet !== '' ? xetduyetdetai.ngayXetDuyet :
                                        new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate()}
                                />
                            </AvGroup>
                            <AvGroup>
                                <Label style={ { fontWeight: 900 } }>Ý kiến đánh giá <span style={{ color: 'red' }}>*</span></Label>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                    type="text"
                                    className="form-control"
                                    name="yKienDanhGia"
                                         required
                                         validate={{
                                             required: {
                                                 value: true,
                                                 errorMessage: 'Chưa nhập ý kiến đánh giá.'
                                             }
                                         }}
                                    value={xetduyetdetai.yKienDanhGia}
                                />
                            </AvGroup>
                            <AvGroup>
                                <Label style={ { fontWeight: 900 } }>Xét duyệt</Label>
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
                                    value={ xetduyetdetai.xetDuyet }
                                >
                                    <option value="">--Chọn xét duyệt</option>
                                    <option value={1}>Duyệt</option>
                                    <option value={2}>Không duyệt</option>
                                </AvField>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                         name="trangThai" hidden value={xetduyetdetai.trangThai}/>
                            </AvGroup>
                            <AvGroup>
                                <Label style = { { fontWeight: 900 } }>Chọn tập tin kế hoạch đề tài(Nhấn nút chọn tập tin để chọn tập tin kế hoạch)</Label>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                         hidden name="filexetduyet" id="filexetduyet" type="file" onChange={this.uploadFileXetDuyetDeTai}/>
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
                                value={xetduyetdetai.donVi}
                            />
                            <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                hidden
                                type="text"
                                className="form-control"
                                name="trangThai"
                                value={xetduyetdetai.trangThai}
                            />
                            <Button tag={Link}
                                    to={`/quan-ly-nckh/xet-duyet-de-tai/${this.props.match.params.tinhthanh}/${this.props.match.params.donvi}/${this.props.match.params.nam}/${this.props.match.params.trangthai}`}
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
    xetduyetdetai: storeState.xetduyetdetai.xet_duyet_de_tai,
    loading: storeState.xetduyetdetai.loading,
    updating: storeState.xetduyetdetai.updating
});

const mapDispatchToProps = { getXetDuyetDeTai, uploadXetDuyetDeTai, updateXetDuyetDeTai, reset };
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(XetDuyetDeTai);
