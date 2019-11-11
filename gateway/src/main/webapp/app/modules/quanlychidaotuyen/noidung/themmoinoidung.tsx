import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Label, Row, Col } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField, AvFeedback, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { layNoiDung, themMoiNoiDung, capNhatNoiDung, reset } from './noidung.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IThemMoiNoiDungProps extends StateProps, DispatchProps, RouteComponentProps<{ noidung: string }> {}

export interface IThemMoiNoiDungState {
    isNew: boolean;
}

export class ThemNoiDung extends React.Component<IThemMoiNoiDungProps, IThemMoiNoiDungState> {
    state: IThemMoiNoiDungState = {
        isNew: !this.props.match.params || !this.props.match.params.noidung
    };

    componentDidMount() {
        if (this.state.isNew) {
            this.props.reset();
        } else {
            this.props.layNoiDung(this.props.match.params.noidung);
        }
    }

    componentWillUnmount() {
        this.props.reset();
    }

    luuNoiDung = (event, values) => {
        if (this.state.isNew) {
            this.props.themMoiNoiDung(values);
        } else {
            this.props.capNhatNoiDung(values);
        }
        this.troVeDanhSach();
    };

    troVeDanhSach = () => {
        this.props.history.goBack();
    }

    render() {
        const isInvalid = false;
        const { noidung, loading, updating } = this.props;
        return (
            <div>
                <Row className="justify-content-center">
                    <Col md="8">
                        {this.state.isNew ? (<h1>Thêm mới nội dung</h1>) : (<h1>Cập nhật nội dung</h1>)}
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md="8">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <AvForm onValidSubmit={this.luuNoiDung}>
                                {noidung.maNoiDung ? (
                                    <AvGroup>
                                        <Label style = { { fontWeight: '900' } } for="id">Mã nội dung</Label>
                                        <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                 type="text" className="form-control" name="maNoiDung" required readOnly value={noidung.maNoiDung} />
                                    </AvGroup>
                                ) : null}
                                <AvGroup>
                                    <Label style = { { fontWeight: '900' } } for="noidung">Nội dung chỉ đạo tuyến</Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                        type="text"
                                        className="form-control"
                                        name="noiDung"
                                        validate={{
                                            required: {
                                                value: true,
                                                errorMessage: 'Chưa nhập nội dung.'
                                            },
                                            minLength: {
                                                value: 1,
                                                errorMessage: 'Chưa nhập nội dung.'
                                            }
                                        }}
                                        value={noidung.noiDung}
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
                                                errorMessage: 'Chưa nhập vị trí nội dung.'
                                            }
                                        }}
                                        value={noidung.viTri}
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
                                                     type="select" name="trangThai" value={noidung.trangThai + ''}>
                                                <option value="1">Hoạt động</option>
                                                <option value="0">Không hoạt động</option>
                                            </AvField>
                                        </AvGroup>
                                    )
                                }
                                <Button tag={Link} to="/noi-dung" replace color="info">
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
    noidung: storeState.noidung.noi_dung,
    loading: storeState.noidung.loading,
    updating: storeState.noidung.updating
});

const mapDispatchToProps = { layNoiDung, themMoiNoiDung, capNhatNoiDung, reset };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ThemNoiDung);
