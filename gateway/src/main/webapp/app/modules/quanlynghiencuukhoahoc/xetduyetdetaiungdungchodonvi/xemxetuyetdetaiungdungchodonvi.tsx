import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Label, Row, Col } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField, AvFeedback, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getXetDuyetDeTaiUngDungChoDonVi, downloadXetDuyetDeTai } from './xetduyetdetaiungdungchodonvi.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IXemXetDuyetDeTaiUngDungChoDonViProps extends StateProps, DispatchProps, RouteComponentProps<{ xetduyetdetaiungdungchodonvi: string,
    tinhthanh: string, donvi: string, nam: string, trangthai: string }> {}

export class XemXetDuyetDeTaiUngDungChoDonVi extends React.Component<IXemXetDuyetDeTaiUngDungChoDonViProps> {
    componentDidMount() {
        this.props.getXetDuyetDeTaiUngDungChoDonVi(this.props.match.params.xetduyetdetaiungdungchodonvi);

    }
    troVeDanhSach = () => {
        this.props.history.goBack();
    }
    handleClickDownload = taptin => () => {
        this.props.downloadXetDuyetDeTai(taptin);
    }

    render() {
        const isInvalid = false;
        const { xetduyetdetaiungdungchodonvi, loading, updating } = this.props;
        return (
            <div>
                <Row className="justify-content-center">
                    <Col md="8">
                        <h1>Thông tin đề tài ứng dụng tại đơn vị</h1>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md="8">
                        <AvForm>
                            <AvGroup>
                                <Label style={ { fontWeight: 900 } }>Tên đề tài</Label>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                         name="nam" type="text" className="form-control" readOnly value={xetduyetdetaiungdungchodonvi.tenDeTai} />
                            </AvGroup>
                            <AvGroup>
                                <Label style={ { fontWeight: 900 } }>Ngày xét duyệt</Label>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                         name="nam" type="text" className="form-control" readOnly value={xetduyetdetaiungdungchodonvi.ngayXetDuyet} />
                            </AvGroup>
                            <AvGroup>
                                <Label style={ { fontWeight: 900 } }>Kết quả xét duyệt</Label>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white',
                                    color: xetduyetdetaiungdungchodonvi.xetDuyet + '' === '1' ? 'green' :
                                        (xetduyetdetaiungdungchodonvi.xetDuyet + '' === '2' ? 'red' : 'black') } }
                                         name="nam" type="text" className="form-control" readOnly
                                         value={ xetduyetdetaiungdungchodonvi.xetDuyet + '' === '1' ? 'Cho phép ứng dụng tại đơn vị' :
                                             (xetduyetdetaiungdungchodonvi.xetDuyet + '' === '2' ? 'Không cho phép ứng dụng tại đơn vị' : 'Chờ duyệt') } />
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
                                                 value={xetduyetdetaiungdungchodonvi.tapTin}
                                        />
                                    </Col>
                                    <Col>
                                        <Button style={ { color: 'white', backgroundColor: '#0066ff', borderStyle: 'none' } }
                                                onClick={ this.handleClickDownload(xetduyetdetaiungdungchodonvi.tapTin) }>
                                            <span className="d-none d-md-inline">Tải xuống</span>
                                        </Button>
                                    </Col>
                                </Row>
                            </AvGroup>
                            <Button tag={Link} to={`/quan-ly-nckh/xet-duyet-de-tai-ung-dung-cho-don-vi/${this.props.match.params.tinhthanh}/${this.props.match.params.donvi}/${this.props.match.params.nam}/${this.props.match.params.trangthai}`} replace color="info">
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
    xetduyetdetaiungdungchodonvi: storeState.xetduyetdetaiungdungchodonvi.xet_duyet_de_tai_ung_dung_cho_don_vi,
    loading: storeState.xetduyetdetaiungdungchodonvi.loading,
    updating: storeState.xetduyetdetaiungdungchodonvi.updating
});

const mapDispatchToProps = { getXetDuyetDeTaiUngDungChoDonVi, downloadXetDuyetDeTai };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(XemXetDuyetDeTaiUngDungChoDonVi);
