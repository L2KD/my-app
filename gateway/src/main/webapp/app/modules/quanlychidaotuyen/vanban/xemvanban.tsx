import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Label, Row, Col } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField, AvFeedback, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getVanBan, getDonVi, getCoQuanBanHanh, downloadVanBan } from './vanban.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IThemMoiDanhGiaProps extends StateProps, DispatchProps, RouteComponentProps<{ vanban: string,
tinhthanh: string, donvi: string, nam: string }> {}

export class Xemvanban extends React.Component<IThemMoiDanhGiaProps> {
    componentDidMount() {
        this.props.getVanBan(this.props.match.params.vanban);
        // this.props.getCoQuanBanHanh(this.props.vanban.coQuanBanHanh);
    }

    troVeDanhSach = () => {
        this.props.history.goBack();
    };
    handleClickDownload = taptin => () => {
        this.props.downloadVanBan(taptin);
    }

    render() {
        const isInvalid = false;
        const { vanban, loading, updating } = this.props;
        return (
            <div>
                <Row className="justify-content-center">
                    <Col md="8">
                        <h1>Thông tin văn bản</h1>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md="8">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <AvForm>
                                <AvGroup>
                                    <Label style={ { fontWeight: 900 } } for="noidung">Nội dung trích yếu</Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                        type="text"
                                        className="form-control"
                                        name="noi_dung_trich_yeu"
                                        readOnly
                                        value={vanban.noiDungTrichYeu}
                                    />
                                </AvGroup>
                                <AvGroup>
                                    <Label style={ { fontWeight: 900 } } for="ngaybanhanh">Ngày ban hành</Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                        type="text"
                                        className="form-control"
                                        name="ngay_ban_hanh"
                                        readOnly
                                        value={vanban.ngayBanHanh}
                                    />
                                </AvGroup>
                                <AvGroup>
                                    <Label style={ { fontWeight: 900 } } for="socongvan">Số công văn</Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                        type="text"
                                        className="form-control"
                                        name="so_cong_van"
                                        readOnly
                                        value={vanban.soCongVan}
                                    />
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
                                                     value={vanban.tapTin}
                                            />
                                        </Col>
                                        <Col>
                                            <Button style={ { color: 'white', backgroundColor: '#0066ff', borderStyle: 'none' } }
                                                    onClick={ this.handleClickDownload(vanban.tapTin) }>
                                                <span className="d-none d-md-inline">Tải xuống</span>
                                            </Button>
                                        </Col>
                                    </Row>
                                </AvGroup>
                                <AvGroup>
                                    <Label style={ { fontWeight: 900 } }>Trạng thái</Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                        type="text"
                                        name="trang_thai"
                                        readOnly
                                        value={ vanban.trangThai === 0 ? 'Không hoạt động' : 'Hoạt động' }
                                    />
                                </AvGroup>
                                <Button tag={Link} to={`/van-ban/${this.props.match.params.tinhthanh}/${this.props.match.params.donvi}/${this.props.match.params.nam}`} replace color="info">
                                    <FontAwesomeIcon icon="arrow-left" />
                                    &nbsp;
                                    <span className="d-none d-md-inline">Trở về</span>
                                </Button>
                                &nbsp;
                            </AvForm>
                        )}
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (storeState: IRootState) => ({
    vanban: storeState.vanban.van_ban,
    donvi: storeState.vanban.don_vi,
    coquan: storeState.vanban.co_quan,
    loading: storeState.vanban.loading,
    updating: storeState.vanban.updating
});

const mapDispatchToProps = { getVanBan, getDonVi, getCoQuanBanHanh, downloadVanBan };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Xemvanban);
