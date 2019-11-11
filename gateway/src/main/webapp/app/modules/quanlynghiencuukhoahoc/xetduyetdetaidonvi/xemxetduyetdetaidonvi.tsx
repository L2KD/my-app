import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Label, Row, Col } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField, AvFeedback, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getXetDuyetDeTaiDonVi, downloadXetDuyetDeTai } from './xetduyetdetaidonvi.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IXemXetDuyetDeTaiDonViProps extends StateProps, DispatchProps, RouteComponentProps<{ xetduyetdetaidonvi: string,
    tinhthanh: string, donvi: string, nam: string, trangthai: string }> {}

export class XemXetDuyetDeTaiDonVi extends React.Component<IXemXetDuyetDeTaiDonViProps> {
    componentDidMount() {
        this.props.getXetDuyetDeTaiDonVi(this.props.match.params.xetduyetdetaidonvi);

    }
    troVeDanhSach = () => {
        this.props.history.goBack();
    }
    handleClickDownload = taptin => () => {
        this.props.downloadXetDuyetDeTai(taptin);
    }

    render() {
        const isInvalid = false;
        const { xetduyetdetaidonvi, loading, updating } = this.props;
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
                                <Label style={ { fontWeight: 900 } }>Tên đề tài</Label>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                         name="nam" type="text" className="form-control" readOnly value={xetduyetdetaidonvi.tenDeTai} />
                            </AvGroup>
                            <AvGroup>
                                <Label style={ { fontWeight: 900 } }>Nội dung góp ý</Label>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                         name="nam" type="text" className="form-control" readOnly value={xetduyetdetaidonvi.noiDungGopY} />
                            </AvGroup>
                            <AvGroup>
                                <Label style={ { fontWeight: 900 } }>Ngày xét duyệt</Label>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                         name="nam" type="text" className="form-control" readOnly value={xetduyetdetaidonvi.ngayXetDuyet} />
                            </AvGroup>
                            <AvGroup>
                                <Label style={ { fontWeight: 900 } }>Kết quả xét duyệt</Label>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white',
                                    color: xetduyetdetaidonvi.xetDuyet + '' === '1' ? 'green' : (xetduyetdetaidonvi.xetDuyet + '' === '2' ? 'red' : 'black') } }
                                         name="nam" type="text" className="form-control" readOnly
                                         value={ xetduyetdetaidonvi.xetDuyet + '' === '1' ? 'Duyệt' : (xetduyetdetaidonvi.xetDuyet + '' === '2' ? 'Không duyệt' : 'Chờ duyệt') } />
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
                                                 value={xetduyetdetaidonvi.tapTin}
                                        />
                                    </Col>
                                    <Col>
                                        <Button style={ { color: 'white', backgroundColor: '#0066ff', borderStyle: 'none' } }
                                                onClick={ this.handleClickDownload(xetduyetdetaidonvi.tapTin) }>
                                            <span className="d-none d-md-inline">Tải xuống</span>
                                        </Button>
                                    </Col>
                                </Row>
                            </AvGroup>
                            <Button tag={Link}
                                    to={{ pathname: `/quan-ly-nckh/xet-duyet-de-tai-don-vi/${this.props.match.params.tinhthanh}/${this.props.match.params.donvi}/${this.props.match.params.nam}/${this.props.match.params.trangthai}` }}
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
    xetduyetdetaidonvi: storeState.xetduyetdetaidonvi.xet_duyet_de_tai_don_vi,
    loading: storeState.xetduyetdetaidonvi.loading,
    updating: storeState.xetduyetdetaidonvi.updating
});

const mapDispatchToProps = { getXetDuyetDeTaiDonVi, downloadXetDuyetDeTai };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(XemXetDuyetDeTaiDonVi);
