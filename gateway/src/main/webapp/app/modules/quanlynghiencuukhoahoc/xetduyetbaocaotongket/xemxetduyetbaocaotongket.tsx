import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Label, Row, Col } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField, AvFeedback, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getXetDuyetBaoCaoTongKet, downloadXetDuyetBaoCaoTongKet } from './xetduyetbaocaotongket.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IXemXetDyetBaoCaoTongKetProps extends StateProps, DispatchProps, RouteComponentProps<{
    xetduyetbaocaotongket: string, tinhthanh: string, donvi: string, nam: string, trangthai: string}> {}

export class XemXetDyetBaoCaoTongKet extends React.Component<IXemXetDyetBaoCaoTongKetProps> {
    componentDidMount() {
        this.props.getXetDuyetBaoCaoTongKet(this.props.match.params.xetduyetbaocaotongket);

    }
    troVeDanhSach = () => {
        this.props.history.goBack();
    }
    handleClickDownload = taptin => () => {
        this.props.downloadXetDuyetBaoCaoTongKet(taptin);
    }

    render() {
        const isInvalid = false;
        const { xetduyetbaocaotongket, loading, updating } = this.props;
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
                                         name="nam" type="text" className="form-control" readOnly value={xetduyetbaocaotongket.tenDonVi} />
                            </AvGroup>
                            <AvGroup>
                                <Label style={ { fontWeight: 900 } }>Tên đề tài</Label>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                         name="nam" type="text" className="form-control" readOnly value={xetduyetbaocaotongket.tenDeTai} />
                            </AvGroup>
                            <AvGroup>
                                <Label style={ { fontWeight: 900 } }>Nội dung góp ý</Label>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                         name="nam" type="text" className="form-control" readOnly value={xetduyetbaocaotongket.noiDungGopY} />
                            </AvGroup>
                            <AvGroup>
                                <Label style={ { fontWeight: 900 } }>Ngày đăng ký</Label>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                         name="nam" type="text" className="form-control" readOnly value={xetduyetbaocaotongket.ngayDangKy} />
                            </AvGroup>
                            <AvGroup>
                                <Label style={ { fontWeight: 900 } }>Ngày xét duyệt</Label>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                         name="nam" type="text" className="form-control" readOnly value={xetduyetbaocaotongket.ngayXetDuyet} />
                            </AvGroup>
                            <AvGroup>
                                <Label style={ { fontWeight: 900 } }>Kết quả xét duyệt</Label>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white',
                                    color: xetduyetbaocaotongket.xetDuyet + '' === '1' ? 'green' : (xetduyetbaocaotongket.xetDuyet + '' === '2' ? 'red' : 'black') } }
                                         name="nam" type="text" className="form-control" readOnly
                                         value={ xetduyetbaocaotongket.xetDuyet + '' === '1' ? 'Duyệt' :
                                             (xetduyetbaocaotongket.xetDuyet + '' === '2' ? 'Không duyệt' : 'Chờ duyệt') } />
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
                                                 value={xetduyetbaocaotongket.tapTin}
                                        />
                                    </Col>
                                    <Col>
                                        <Button style={ { color: 'white', backgroundColor: '#0066ff', borderStyle: 'none' } }
                                                onClick={ this.handleClickDownload(xetduyetbaocaotongket.tapTin) }>
                                            <span className="d-none d-md-inline">Tải xuống</span>
                                        </Button>
                                    </Col>
                                </Row>
                            </AvGroup>
                            <Button tag={Link}
                                    to={`/quan-ly-nckh/xet-duyet-bao-cao-tong-ket/${this.props.match.params.tinhthanh}/${this.props.match.params.donvi}/${this.props.match.params.nam}/${this.props.match.params.trangthai}`}
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
    xetduyetbaocaotongket: storeState.xetduyetbaocaotongket.xet_duyet_bao_cao_tong_ket,
    loading: storeState.xetduyetbaocaotongket.loading,
    updating: storeState.xetduyetbaocaotongket.updating
});

const mapDispatchToProps = { getXetDuyetBaoCaoTongKet, downloadXetDuyetBaoCaoTongKet };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(XemXetDyetBaoCaoTongKet);
