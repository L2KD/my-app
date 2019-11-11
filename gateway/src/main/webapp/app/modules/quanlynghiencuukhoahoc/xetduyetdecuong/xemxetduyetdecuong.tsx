import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Label, Row, Col } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField, AvFeedback, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getXetDuyetDeCuong, downloadXetDuyetBienBanDeCuong, downloadXetDuyetDeCuong } from './xetduyetdecuong.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IXemXetDuyetDeCuongProps extends StateProps, DispatchProps, RouteComponentProps<{
    xetduyetdecuong: string, tinhthanh: string, donvi: string, nam: string, trangthai: string }> {}

export class XemXetDuyetDeCuong extends React.Component<IXemXetDuyetDeCuongProps> {
    componentDidMount() {
        this.props.getXetDuyetDeCuong(this.props.match.params.xetduyetdecuong);

    }
    troVeDanhSach = () => {
        this.props.history.goBack();
    }
    handleClickDownloadDeCuong = taptin => () => {
        this.props.downloadXetDuyetDeCuong(taptin);
    }
    handleClickDownloadBienBan = taptin => () => {
        this.props.downloadXetDuyetBienBanDeCuong(taptin);
    }

    render() {
        const isInvalid = false;
        const { xetduyetdecuong, loading, updating } = this.props;
        function TinhTrangDuyet(trangThai) {
            if (trangThai === 1) {
                return 'Được duyệt';
            } else if (trangThai === 2) {
                return 'Không được duyệt';
            } else if (trangThai === 3) {
                return 'Chờ duyệt';
            }
        }
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
                                         name="nam" type="text" className="form-control" readOnly value={xetduyetdecuong.tenDonVi} />
                            </AvGroup>
                            <AvGroup>
                                <Label style={ { fontWeight: 900 } }>Tên đề tài</Label>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                         name="nam" type="text" className="form-control" readOnly value={xetduyetdecuong.tenDeTai} />
                            </AvGroup>
                            <AvGroup>
                                <Label style={ { fontWeight: 900 } }>Ý kiến đánh giá</Label>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                         name="nam" type="text" className="form-control" readOnly value={xetduyetdecuong.noiDungGopY} />
                            </AvGroup>
                            <AvGroup>
                                <Label style={ { fontWeight: 900 } }>Ngày đăng ký</Label>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                         name="nam" type="text" className="form-control" readOnly value={xetduyetdecuong.ngayDangKy} />
                            </AvGroup>
                            <AvGroup>
                                <Label style={ { fontWeight: 900 } }>Ngày xét duyệt</Label>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                         name="nam" type="text" className="form-control" readOnly value={xetduyetdecuong.ngayXetDuyet} />
                            </AvGroup>
                            <AvGroup>
                                <Label style={ { fontWeight: 900 } }>Kết quả xét duyệt</Label>
                                <AvField
                                         style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white',
                                             color: xetduyetdecuong.xetDuyet + '' === '1' ? 'green' : (xetduyetdecuong.xetDuyet + '' === '2' ? 'red' : 'black') } }
                                         name="nam" type="text" className="form-control" readOnly
                                         value={ xetduyetdecuong.xetDuyet + '' === '1' ? 'Duyệt' : (xetduyetdecuong.xetDuyet + '' === '2' ? 'Không duyệt' : 'Chờ duyệt') } />
                            </AvGroup>
                            <AvGroup>
                                <Label style={ { fontWeight: 900 } }>Tập tin đề cương</Label>
                                <Row>
                                    <Col>
                                        <AvField style={ { width: '100%', fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                 readOnly
                                                 type="text"
                                                 className="form-control"
                                                 name="tapTin"
                                                 value={xetduyetdecuong.tapTinDeCuong}
                                        />
                                    </Col>
                                    <Col>
                                        <Button style={ { color: 'white', backgroundColor: '#0066ff', borderStyle: 'none' } }
                                                onClick={ this.handleClickDownloadDeCuong(xetduyetdecuong.tapTinDeCuong) }>
                                            <span className="d-none d-md-inline">Tải xuống</span>
                                        </Button>
                                    </Col>
                                </Row>
                            </AvGroup>
                            <AvGroup>
                                <Label style={ { fontWeight: 900 } }>Tập tin biên bản xét duyệt</Label>
                                <Row>
                                    <Col>
                                        <AvField style={ { width: '100%', fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                 readOnly
                                                 type="text"
                                                 className="form-control"
                                                 name="tapTin"
                                                 value={xetduyetdecuong.tapTinBienBan}
                                        />
                                    </Col>
                                    <Col>
                                        <Button style={ { color: 'white', backgroundColor: '#0066ff', borderStyle: 'none' } }
                                                onClick={ this.handleClickDownloadBienBan(xetduyetdecuong.tapTinBienBan) }>
                                            <span className="d-none d-md-inline">Tải xuống</span>
                                        </Button>
                                    </Col>
                                </Row>
                            </AvGroup>
                            <Button tag={Link}
                                    to={`/quan-ly-nckh/xet-duyet-de-cuong/${this.props.match.params.tinhthanh}/${this.props.match.params.donvi}/${this.props.match.params.nam}/${this.props.match.params.trangthai}`}
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
    xetduyetdecuong: storeState.xetduyetdecuong.xet_duyet_de_cuong,
    loading: storeState.xetduyetdecuong.loading,
    updating: storeState.xetduyetdecuong.updating
});

const mapDispatchToProps = { getXetDuyetDeCuong, downloadXetDuyetBienBanDeCuong, downloadXetDuyetDeCuong };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(XemXetDuyetDeCuong);
