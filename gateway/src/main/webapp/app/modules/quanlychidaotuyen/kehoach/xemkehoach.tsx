import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Label, Row, Col } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField, AvFeedback, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getKeHoach, getDanhSachVanBanTheoKeHoach, getDonVi, downloadKeHoach } from './kehoach.reducer';
import { IRootState } from 'app/shared/reducers';
import { IVanBan } from 'app/modules/quanlychidaotuyen/vanban/vanban.model';

export interface IThemMoiDanhGiaProps extends StateProps, DispatchProps, RouteComponentProps<{ kehoach: string,
    tinhthanh: string, donvi: string, nam: string}> {}

export class Xemkehoach extends React.Component<IThemMoiDanhGiaProps> {
    state = {
        ds_vb: [] as IVanBan[]
    };
    componentDidMount() {
        this.props.getKeHoach(this.props.match.params.kehoach);
        this.props.getDanhSachVanBanTheoKeHoach(this.props.match.params.kehoach);
    }

    componentWillReceiveProps(nextProps: Readonly<IThemMoiDanhGiaProps>, nextContext: any): void {
        this.setState({ ds_vb: nextProps.ds_vb });
    }

    handleClickDownload = taptin => () => {
        this.props.downloadKeHoach(taptin);
    }
    troVeDanhSach = () => {
        this.props.history.goBack();
    }

    render() {
        const isInvalid = false;
        const { kehoach, loading, updating } = this.props;
        return (
            <div>
                <Row className="justify-content-center">
                    <Col md="8">
                        <h1>Thông tin kế hoạch</h1>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md="8">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <AvForm>
                                {/*<AvGroup>*/}
                                    {/*<Label style={ { fontWeight: 900 } } for="id">Mã kế hoạch</Label>*/}
                                    {/*<AvField type="text" className="form-control" name="ma_van_ban" required readOnly value={kehoach.maKeHoach} />*/}
                                {/*</AvGroup>*/}
                                {/*<AvGroup>*/}
                                    {/*<Label style={ { fontWeight: 900 } } for="donvi">Đơn vị</Label>*/}
                                    {/*<AvField*/}
                                        {/*type="text"*/}
                                        {/*className="form-control"*/}
                                        {/*name="don_vi"*/}
                                        {/*readOnly*/}
                                        {/*value={kehoach.donVi}*/}
                                    {/*/>*/}
                                {/*</AvGroup>*/}
                                <AvGroup>
                                    <Label style={ { fontWeight: 900 } } for="noidung">Nội dung trích yếu</Label>
                                    <AvField style={ { width: '100%', fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                        type="text"
                                        className="form-control"
                                        name="noi_dung_trich_yeu"
                                        readOnly
                                        value={kehoach.noiDungTrichYeu}
                                    />
                                </AvGroup>
                                <AvGroup>
                                    <Label style={ { fontWeight: 900 } } for="ngaybanhanh">Ngày ban hành</Label>
                                    <AvField style={ { width: '100%', fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                        type="text"
                                        className="form-control"
                                        name="ngay_ban_hanh"
                                        readOnly
                                        value={kehoach.ngayBanHanh}
                                    />
                                </AvGroup>
                                <AvGroup>
                                    <Label style={ { fontWeight: 900 } } for="ngaybanhanh">Căn cứ văn bản</Label>
                                    <AvField style={ { width: '100%', fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                        type="text"
                                        className="form-control"
                                        name="ngay_ban_hanh"
                                        readOnly
                                        value={this.state.ds_vb.map((ele, i) => (ele.noiDungTrichYeu))}
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
                                                     value={kehoach.tapTin}
                                            />
                                        </Col>
                                        <Col>
                                            <Button style={ { color: 'white', backgroundColor: '#0066ff', borderStyle: 'none' } }
                                                    onClick={ this.handleClickDownload(kehoach.tapTin) }>
                                                <span className="d-none d-md-inline">Tải xuống</span>
                                            </Button>
                                        </Col>
                                    </Row>
                                </AvGroup>
                                <Button tag={Link} to={`/ke-hoach/${this.props.match.params.tinhthanh}/${this.props.match.params.donvi}/${this.props.match.params.nam}`} replace color="info">
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
    kehoach: storeState.kehoach.ke_hoach,
    ds_vb: storeState.kehoach.ds_vb_ct,
    donvi: storeState.kehoach.don_vi,
    loading: storeState.kehoach.loading,
    updating: storeState.kehoach.updating
});

const mapDispatchToProps = { getKeHoach, getDanhSachVanBanTheoKeHoach, getDonVi, downloadKeHoach };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Xemkehoach);
