import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Label, Row, Col } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField, AvFeedback, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { layHinhThuc } from './HinhThuc.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IThemMoiHinhThucProps extends StateProps, DispatchProps, RouteComponentProps<{ hinhthuc: string }> {}

export class XemHinhThuc extends React.Component<IThemMoiHinhThucProps> {
    componentDidMount() {
            this.props.layHinhThuc(this.props.match.params.hinhthuc);

    }
    troVeDanhSach = () => {
        this.props.history.goBack();
    }

    render() {
        const isInvalid = false;
        const { hinhthuc, loading, updating } = this.props;
        return (
            <div>
                <Row className="justify-content-center">
                    <Col md="8">
                        <h1>Thông tin hình thức</h1>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md="8">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <AvForm>
                                    <AvGroup>
                                        <Label style = { { fontWeight: '900' } } for="id">Mã hình thức</Label>
                                        <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } } type="text" className="form-control" name="ma_hinh_thuc" required readOnly value={hinhthuc.ma_hinh_thuc} />
                                    </AvGroup>
                                <AvGroup>
                                    <Label style = { { fontWeight: '900' } } for="tenhinhthuc">Tên hình thức</Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                        type="text"
                                        className="form-control"
                                        name="ten_hinh_thuc"
                                        readOnly
                                        validate={{
                                            required: {
                                                value: true,
                                                errorMessage: 'Chưa nhập tên hình thức.'
                                            },
                                            minLength: {
                                                value: 1,
                                                errorMessage: 'Chưa nhập tên hình thức.'
                                            },
                                            maxLength: {
                                                value: 100,
                                                errorMessage: 'Tên hình thức không vượt quá 100 kí tự'
                                            }
                                        }}
                                        value={hinhthuc.ten_hinh_thuc}
                                    />
                                </AvGroup>
                                <AvGroup>
                                    <Label style = { { fontWeight: '900' } } for="vi_tri">Vị trí</Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                        type="number"
                                        className="form-control"
                                        name="vi_tri"
                                        readOnly
                                        validate={{
                                            required: {
                                                value: true,
                                                errorMessage: 'Chưa nhập vị trí hình thức.'
                                            }
                                        }}
                                        value={hinhthuc.vi_tri}
                                    />
                                </AvGroup>
                                <AvGroup>
                                    <Label style = { { fontWeight: '900' } }>Trạng thái</Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                        type="text"
                                        name="trang_thai"
                                        readOnly
                                        value={ hinhthuc.trang_thai === 0 ? 'Không hoạt động' : 'Hoạt động' }
                                    />
                                </AvGroup>
                                <Button tag={Link} to="/hinh-thuc" replace color="info">
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
    hinhthuc: storeState.hinhthuc.hinh_thuc,
    loading: storeState.hinhthuc.loading,
    updating: storeState.hinhthuc.updating
});

const mapDispatchToProps = { layHinhThuc };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(XemHinhThuc);
