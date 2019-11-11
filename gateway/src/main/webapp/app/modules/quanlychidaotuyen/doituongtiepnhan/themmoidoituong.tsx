import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Label, Row, Col } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField, AvFeedback, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { layDoiTuong, themMoiDoiTuong, capNhatDoiTuong, reset } from './doituong.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IThemMoiDoiTuongProps extends StateProps, DispatchProps, RouteComponentProps<{ doituong: string }> {}

export interface IThemMoiDoiTuongState {
    isNew: boolean;
}

export class ThemDoiTuong extends React.Component<IThemMoiDoiTuongProps, IThemMoiDoiTuongState> {
    state: IThemMoiDoiTuongState = {
        isNew: !this.props.match.params || !this.props.match.params.doituong
    };

    componentDidMount() {
        if (this.state.isNew) {
            this.props.reset();
        } else {
            this.props.layDoiTuong(this.props.match.params.doituong);
        }
    }

    componentWillUnmount() {
        this.props.reset();
    }

    luuDoiTuong = (event, values) => {
        if (this.state.isNew) {
            this.props.themMoiDoiTuong(values);
        } else {
            this.props.capNhatDoiTuong(values);
        }
        this.troVeDanhSach();
    };

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
                        {this.state.isNew ? (<h1>Thêm mới đối tượng tiếp nhận chỉ đạo tuyến</h1>) : (<h1>Cập nhật đối tượng tiếp nhận chỉ đạo tuyến</h1>)}
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md="8">
                        {loading ? (
                            <p>Đang tải...</p>
                        ) : (
                            <AvForm onValidSubmit={this.luuDoiTuong}>
                                {doituong.maDoiTuong ? (
                                    <AvGroup>
                                        <Label style = { { fontWeight: '900' } } for="id">Mã đối tượng tiếp nhận chỉ đạo tuyến</Label>
                                        <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                 type="text" className="form-control" name="maDoiTuong" required readOnly value={doituong.maDoiTuong} />
                                    </AvGroup>
                                ) : null}
                                <AvGroup>
                                    <Label style = { { fontWeight: '900' } } for="tendoituong">Tên đối tượng tiếp nhận chỉ đạo tuyến</Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                        type="text"
                                        className="form-control"
                                        name="tenDoiTuong"
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
                                    <AvField min={1} style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                        type="number"
                                        className="form-control"
                                        name="viTri"
                                        validate={{
                                            required: {
                                                value: true,
                                                errorMessage: 'Chưa nhập vị trí đối tượng tiếp nhận chỉ đạo tuyến.'
                                            }
                                        }}
                                        value={doituong.viTri}
                                    />
                                </AvGroup>
                                {
                                    this.state.isNew ? (
                                        <AvGroup>
                                            <Label style = { { fontWeight: '900' } }>Trạng thái</Label>
                                            <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                     type="select" name="trangThai" value="1">
                                                <option value="1">Hoạt động</option>
                                                <option value="0">Không hoạt động</option>
                                            </AvField>
                                        </AvGroup>
                                    ) : (
                                        <AvGroup>
                                            <Label style = { { fontWeight: '900' } }>Trạng thái</Label>
                                            <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                     type="select" name="trangThai" value={doituong.trangThai + ''}>
                                                <option value="1">Hoạt động</option>
                                                <option value="0">Không hoạt động</option>
                                            </AvField>
                                        </AvGroup>
                                    )
                                }
                                <Button tag={Link} to="/doi-tuong" replace color="info">
                                    <FontAwesomeIcon icon="arrow-left" />
                                    &nbsp;
                                    <span className="d-none d-md-inline">Trở về</span>
                                </Button>
                                &nbsp;
                                <Button color="primary" type="submit" disabled={isInvalid || updating}>
                                    <FontAwesomeIcon icon="save" />
                                    &nbsp; Lưu
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
    doituong: storeState.doituong.doi_tuong,
    loading: storeState.doituong.loading,
    updating: storeState.doituong.updating
});

const mapDispatchToProps = { layDoiTuong, themMoiDoiTuong, capNhatDoiTuong, reset };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ThemDoiTuong);
