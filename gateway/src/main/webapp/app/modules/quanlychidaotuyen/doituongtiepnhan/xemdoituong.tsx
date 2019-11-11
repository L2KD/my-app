import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Label, Row, Col } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField, AvFeedback, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { layDoiTuong } from './doituong.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IThemMoiDoiTuongProps extends StateProps, DispatchProps, RouteComponentProps<{ doituong: string }> {}

export class Xemdoituong extends React.Component<IThemMoiDoiTuongProps> {
    componentDidMount() {
            this.props.layDoiTuong(this.props.match.params.doituong);

    }
    troVeDanhSach = () => {
        this.props.history.goBack();
    }

    render() {
        const isInvalid = false;
        const { doituong, loading, updating } = this.props;
        return (
            <div>
                <Row className="justify-content-center">
                    <Col md="8">
                        <h1>Thông tin đối tượng tiếp nhận chỉ đạo tuyến</h1>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md="8">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <AvForm>
                                    <AvGroup>
                                        <Label style = { { fontWeight: '900' } } for="id">Mã đối tượng tiếp nhận chỉ đạo tuyến</Label>
                                        <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                 type="text" className="form-control" name="maDoiTuong" required readOnly value={doituong.maDoiTuong} />
                                    </AvGroup>
                                <AvGroup>
                                    <Label style = { { fontWeight: '900' } } for="tendoituong">Tên đối tượng tiếp nhận chỉ đạo tuyến</Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                        type="text"
                                        className="form-control"
                                        name="tenDoiTuong"
                                        readOnly
                                        validate={{
                                            required: {
                                                value: true,
                                                errorMessage: 'Chưa nhập tên đối tượng tiếp nhận chỉ đạo tuyến.'
                                            },
                                            minLength: {
                                                value: 1,
                                                errorMessage: 'Chưa nhập tên đối tượng tiếp nhận chỉ đạo tuyến.'
                                            },
                                            maxLength: {
                                                value: 100,
                                                errorMessage: 'Tên đối tượng tiếp nhận chỉ đạo tuyến không vượt quá 100 kí tự'
                                            }
                                        }}
                                        value={doituong.tenDoiTuong}
                                    />
                                </AvGroup>
                                <AvGroup>
                                    <Label style = { { fontWeight: '900' } } for="vi_tri">Vị trí</Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                        type="number"
                                        className="form-control"
                                        name="viTri"
                                        readOnly
                                        validate={{
                                            required: {
                                                value: true,
                                                errorMessage: 'Chưa nhập vị trí đối tượng tiếp nhận chỉ đạo tuyến.'
                                            }
                                        }}
                                        value={doituong.viTri}
                                    />
                                </AvGroup>
                                <AvGroup>
                                    <Label style = { { fontWeight: '900' } }>Trạng thái</Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                        type="text"
                                        name="trangThai"
                                        readOnly
                                        value={ doituong.trangThai === 0 ? 'Không hoạt động' : 'Hoạt động' }
                                    />
                                </AvGroup>
                                <Button tag={Link} to="/doi-tuong" replace color="info">
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
    doituong: storeState.doituong.doi_tuong,
    loading: storeState.doituong.loading,
    updating: storeState.doituong.updating
});

const mapDispatchToProps = { layDoiTuong };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Xemdoituong);
