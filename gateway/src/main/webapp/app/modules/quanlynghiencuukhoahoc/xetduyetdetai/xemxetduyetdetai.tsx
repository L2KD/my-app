import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Label, Row, Col } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField, AvFeedback, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getXetDuyetDeTai, downloadXetDuyetDeTai } from './xetduyetdetai.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IXemXetDuyetDeTaiProps extends StateProps, DispatchProps, RouteComponentProps<{
    xetduyetdetai: string, tinhthanh: string, donvi: string, nam: string, trangthai: string }> {}

export class XemXetDuyetDeTai extends React.Component<IXemXetDuyetDeTaiProps> {
    componentDidMount() {
        this.props.getXetDuyetDeTai(this.props.match.params.xetduyetdetai);

    }
    troVeDanhSach = () => {
        this.props.history.goBack();
    }
    handleClickDownload = taptin => () => {
        this.props.downloadXetDuyetDeTai(taptin);
    }

    render() {
        const isInvalid = false;
        const { xetduyetdetai, loading, updating } = this.props;
        return (
            <div>
                <Row className="justify-content-center">
                    <Col md="8">
                        <h1>Thông tin kế hoạch đề tài</h1>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md="8">
                        <AvForm>
                            <AvGroup>
                                <Label style={ { fontWeight: 900 } }>Đơn vị thực hiện</Label>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                         name="nam" type="text" className="form-control" readOnly value={xetduyetdetai.tenDonVi} />
                            </AvGroup>
                            <AvGroup>
                                <Label style={ { fontWeight: 900 } }>Tên đề tài</Label>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                         name="nam" type="text" className="form-control" readOnly value={xetduyetdetai.tenDeTai} />
                            </AvGroup>
                            <AvGroup>
                                <Label style={ { fontWeight: 900 } }>Ý kiến đánh giá</Label>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                         name="nam" type="text" className="form-control" readOnly value={xetduyetdetai.yKienDanhGia} />
                            </AvGroup>
                            <AvGroup>
                                <Label style={ { fontWeight: 900 } }>Ngày đăng ký</Label>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                         name="nam" type="text" className="form-control" readOnly value={xetduyetdetai.ngayDangKy} />
                            </AvGroup>
                            <AvGroup>
                                <Label style={ { fontWeight: 900 } }>Ngày xét duyệt</Label>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                         name="nam" type="text" className="form-control" readOnly value={xetduyetdetai.ngayXetDuyet} />
                            </AvGroup>
                            <AvGroup>
                                <Label style={ { fontWeight: 900 } }>Kết quả xét duyệt</Label>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white',
                                    color: xetduyetdetai.xetDuyet === 1 ? 'green' : (xetduyetdetai.xetDuyet === 2 ? 'red' : 'black') } }
                                         name="nam" type="text" className="form-control" readOnly
                                         value={ xetduyetdetai.xetDuyet === 1 ? 'Duyệt' : (xetduyetdetai.xetDuyet === 2 ? 'Không duyệt' : 'Chờ duyệt') } />
                            </AvGroup>
                            <AvGroup>
                                <Label style={ { fontWeight: 900 } }>Tập tin</Label>
                                <Row>
                                    <Col>
                                        <AvField style={ { width: '100%', fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                 readOnly
                                                 type="text"
                                                 className="form-control"
                                                 name="tapTin"
                                                 value={xetduyetdetai.tapTin}
                                        />
                                    </Col>
                                    <Col>
                                        <Button style={ { color: 'white', backgroundColor: '#0066ff', borderStyle: 'none' } }
                                                onClick={ this.handleClickDownload(xetduyetdetai.tapTin) }>
                                            <span className="d-none d-md-inline">Tải xuống</span>
                                        </Button>
                                    </Col>
                                </Row>
                            </AvGroup>
                            <Button tag={Link}
                                    to={`/quan-ly-nckh/xet-duyet-de-tai/${this.props.match.params.tinhthanh}/${this.props.match.params.donvi}/${this.props.match.params.nam}/${this.props.match.params.trangthai}`}
                                    replace color="info">
                                <FontAwesomeIcon icon="arrow-left" />
                                &nbsp;
                                <span className="d-none d-md-inline">Trở về</span>
                            </Button>
                            &nbsp;
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

const mapDispatchToProps = { getXetDuyetDeTai, downloadXetDuyetDeTai };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(XemXetDuyetDeTai);
