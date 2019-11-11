import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Label, Row, Col } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField, AvFeedback, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getDeTaiDangKy, getDanhSachKhoaPhongDeTai, reset, downloadDeTai } from './detaidangky.reducer';
import { IRootState } from 'app/shared/reducers';
import { IKhoaPhong } from 'app/modules/khoaphong/khoaphong.model';

export interface IThemMoiDeTaiDangKyProps extends StateProps, DispatchProps, RouteComponentProps<{
    detaidangky: string, tinhthanh: string, donvi: string, nam: string }> {}

export interface IThemMoiDeTaiDangKyState {
    isNew: boolean;
    tinhthanh: any;
    donvi: any;
    taptin: any;
    ds_khoa_phong: IKhoaPhong[];
}

export class ThemDeTaiDangKy extends React.Component<IThemMoiDeTaiDangKyProps, IThemMoiDeTaiDangKyState> {
    state: IThemMoiDeTaiDangKyState = {
        isNew: !this.props.match.params || !this.props.match.params.detaidangky,
        tinhthanh: this.props.match.params.tinhthanh,
        donvi: this.props.match.params.tinhthanh,
        taptin: '',
        ds_khoa_phong: []
    };

    componentDidMount() {
       this.props.getDanhSachKhoaPhongDeTai(this.props.match.params.detaidangky);
       this.props.getDeTaiDangKy(this.props.match.params.detaidangky);
    }
    componentWillReceiveProps(nextProps: Readonly<IThemMoiDeTaiDangKyProps>, nextContext: any): void {
        this.setState({ ds_khoa_phong: nextProps.ds_khoa_phong_de_tai.concat() });
    }

    componentWillUnmount() {
        this.props.reset();
    }
    handleClickDownload = taptin => () => {
        this.props.downloadDeTai(taptin);
    }
    troVeDanhSach = () => {
        this.props.history.goBack();
    }

    render() {
        const isInvalid = false;
        const { detaidangky, max_ma, ds_don_vi, loading, updating } = this.props;
        return (
            <div>
                <Row className="justify-content-center">
                    <Col md="8">
                        <h1>Xem thông tin đề tài đăng ký năm</h1>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md="8">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <AvForm>
                                <AvGroup>
                                    <Label style={ { fontWeight: 900 } }>Đơn vị</Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                             name="donvi" value={detaidangky.tenDonVi} readOnly/>
                                </AvGroup>
                                <AvGroup>
                                    <Label style={ { fontWeight: 900 } }>Tên đề tài</Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                             name="donvi" value={detaidangky.tenDeTai} readOnly/>
                                </AvGroup>
                                <AvGroup>
                                    <Label style={ { fontWeight: 900 } }>Ngày đăng ký</Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                             name="donvi" value={detaidangky.ngayDangKy} readOnly/>
                                </AvGroup>
                                <AvGroup>
                                    <Label style={ { fontWeight: 900 } }>Danh sách khoa phòng thực hiện</Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                             name="donvi" value={ this.state.ds_khoa_phong.map((ele, i) => (ele.tenKhoaPhong))} readOnly/>
                                </AvGroup>
                                <AvGroup>
                                    <Label style={ { fontWeight: 900 } }>Khoa phòng chủ nhiệm</Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                             name="donvi" value={detaidangky.tenKhoaPhongChuNhiem} readOnly/>
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
                                                     value={detaidangky.tapTin}
                                            />
                                        </Col>
                                        <Col>
                                            <Button style={ { color: 'white', backgroundColor: '#0066ff', borderStyle: 'none' } }
                                                    onClick={ this.handleClickDownload(detaidangky.tapTin) }>
                                                <span className="d-none d-md-inline">Tải xuống</span>
                                            </Button>
                                        </Col>
                                    </Row>
                                </AvGroup>
                                <Button tag={Link} to={`/quan-ly-nckh/de-tai-dang-ky/${this.props.match.params.tinhthanh}/${this.props.match.params.donvi}/${this.props.match.params.nam}`} replace color="info">
                                    <FontAwesomeIcon icon="arrow-left" />
                                    &nbsp;
                                    <span className="d-none d-md-inline">Trở về</span>
                                </Button>
                            </AvForm>
                        )}
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (storeState: IRootState) => ({
    detaidangky: storeState.detaidangky.de_tai_dang_ky,
    ds_don_vi: storeState.detaidangky.ds_don_vi,
    ds_khoa_phong_de_tai: storeState.detaidangky.ds_khoa_phong_de_tai,
    max_ma: storeState.detaidangky.max_ma_de_tai,
    loading: storeState.detaidangky.loading,
    updating: storeState.detaidangky.updating
});

const mapDispatchToProps = { getDeTaiDangKy, getDanhSachKhoaPhongDeTai, reset, downloadDeTai };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ThemDeTaiDangKy);
