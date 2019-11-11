import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Label, Row, Col } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField, AvFeedback, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { layHinhThuc, themMoiHinhThuc, capNhatHinhThuc, reset } from './HinhThuc.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IThemMoiHinhThucProps extends StateProps, DispatchProps, RouteComponentProps<{ hinhthuc: string }> {}

export interface IThemMoiHinhThucState {
    isNew: boolean;
}

export class ThemHinhThuc extends React.Component<IThemMoiHinhThucProps, IThemMoiHinhThucState> {
    state: IThemMoiHinhThucState = {
        isNew: !this.props.match.params || !this.props.match.params.hinhthuc
    };

    componentDidMount() {
        if (this.state.isNew) {
            this.props.reset();
        } else {
            this.props.layHinhThuc(this.props.match.params.hinhthuc);
        }
    }

    componentWillUnmount() {
        this.props.reset();
    }

    luuHinhThuc = (event, values) => {
        if (this.state.isNew) {
            this.props.themMoiHinhThuc(values);
        } else {
            this.props.capNhatHinhThuc(values);
        }
        this.troVeDanhSach();
    };

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
                        {this.state.isNew ? (<h1>Thêm mới hình thức</h1>) : (<h1>Cập nhật hình thức</h1>)}
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md="8">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <AvForm onValidSubmit={this.luuHinhThuc}>
                                {hinhthuc.ma_hinh_thuc ? (
                                    <AvGroup>
                                        <Label style = { { fontWeight: '900' } } for="id">Mã hình thức</Label>
                                        <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } } type="text"
                                                 className="form-control" name="ma_hinh_thuc" required readOnly value={hinhthuc.ma_hinh_thuc} />
                                    </AvGroup>
                                ) : null}
                                <AvGroup>
                                    <Label style = { { fontWeight: '900' } } for="tenhinhthuc">Tên hình thức <span style={{ color: 'red' }}>*</span></Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                        type="text"
                                        className="form-control"
                                        name="ten_hinh_thuc"
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
                                    <Label style = { { fontWeight: '900' } } for="vi_tri">Vị trí <span style={{ color: 'red' }}>*</span></Label>
                                    <AvField min={1} style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                        type="number"
                                        className="form-control"
                                        name="vi_tri"
                                        validate={{
                                            required: {
                                                value: true,
                                                errorMessage: 'Chưa nhập vị trí hình thức.'
                                            }
                                        }}
                                        value={hinhthuc.vi_tri}
                                    />
                                </AvGroup>
                                {
                                    this.state.isNew ? (
                                        <AvGroup>
                                            <Label style = { { fontWeight: '900' } }>Trạng thái <span style={{ color: 'red' }}>*</span></Label>
                                            <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                     type="select" name="trang_thai" value="1">
                                                <option value="1">Hoạt động</option>
                                                <option value="0">Không hoạt động</option>
                                            </AvField>
                                        </AvGroup>
                                    ) : (
                                        <AvGroup>
                                            <Label style = { { fontWeight: '900' } }>Trạng thái</Label>
                                            <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                     type="select" name="trang_thai" value={hinhthuc.trang_thai + ''}>
                                                <option value="1">Hoạt động</option>
                                                <option value="0">Không hoạt động</option>
                                            </AvField>
                                        </AvGroup>
                                    )
                                }
                                <Button tag={Link} to="/hinh-thuc" replace color="info">
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
    hinhthuc: storeState.hinhthuc.hinh_thuc,
    loading: storeState.hinhthuc.loading,
    updating: storeState.hinhthuc.updating
});

const mapDispatchToProps = { layHinhThuc, themMoiHinhThuc, capNhatHinhThuc, reset };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ThemHinhThuc);
