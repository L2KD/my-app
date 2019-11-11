import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Label, Row, Col } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField, AvFeedback, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getChucVu, addChucVu, updateChucVu, reset } from './chucvu.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IThemMoiChucVuProps extends StateProps, DispatchProps, RouteComponentProps<{ chucvu: string }> {}

export interface IThemMoiChucVuState {
    isNew: boolean;
}

export class ThemChucVu extends React.Component<IThemMoiChucVuProps, IThemMoiChucVuState> {
    state: IThemMoiChucVuState = {
        isNew: !this.props.match.params || !this.props.match.params.chucvu
    };

    componentDidMount() {
        if (this.state.isNew) {
            this.props.reset();
        } else {
            this.props.getChucVu(this.props.match.params.chucvu);
        }
    }

    componentWillUnmount() {
        this.props.reset();
    }

    luuChucVu = (event, values) => {
        if (this.state.isNew) {
            this.props.addChucVu(values);
        } else {
            this.props.updateChucVu(values);
        }
        this.troVeDanhSach();
    };

    troVeDanhSach = () => {
        this.props.history.goBack();
    }

    render() {
        const isInvalid = false;
        const { chucvu, loading, updating } = this.props;
        return (
            <div>
                <Row className="justify-content-center">
                    <Col md="8">
                        {this.state.isNew ? (<h1>Thêm mới chức vụ</h1>) : (<h1>Cập nhật chức vụ</h1>)}
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md="8">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <AvForm onValidSubmit={this.luuChucVu}>
                                {chucvu.maChucVu ? (
                                    <AvGroup>
                                        <Label style = { { fontWeight: 900 } } for="id">Mã chức vụ</Label>
                                        <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                 type="text" className="form-control" name="maChucVu" required readOnly value={chucvu.maChucVu} />
                                    </AvGroup>
                                ) : null}
                                <AvGroup>
                                    <Label style = { { fontWeight: 900 } }>Tên chức vụ <span style={{ color: 'red' }}>*</span></Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                        type="text"
                                        className="form-control"
                                        name="chucVu"
                                             required
                                        validate={{
                                            required: {
                                                value: true,
                                                errorMessage: 'Chưa nhập tên chức vụ.'
                                            },
                                            minLength: {
                                                value: 1,
                                                errorMessage: 'Chưa nhập tên chức vụ.'
                                            },
                                            maxLength: {
                                                value: 100,
                                                errorMessage: 'Tên chức vụ không vượt quá 100 kí tự'
                                            }
                                        }}
                                        value={chucvu.chucVu}
                                    />
                                </AvGroup>
                                <AvGroup>
                                    <Label style = { { fontWeight: 900 } }>Vị trí <span style={{ color: 'red' }}>*</span></Label>
                                    <AvField min={1} style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                        type="number"
                                        className="form-control"
                                        name="viTri"
                                             required
                                        validate={{
                                            required: {
                                                value: true,
                                                errorMessage: 'Chưa nhập vị trí chức vụ.'
                                            }
                                        }}
                                        value={chucvu.viTri}
                                    />
                                </AvGroup>
                                {
                                    this.state.isNew ? (
                                        <AvGroup>
                                            <label style = { { fontWeight: 900 } }>Trạng thái <span style={{ color: 'red' }}>*</span></label>
                                            <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                     type="select" name="trangThai" value="1">
                                                <option value="1">Hoạt động</option>
                                                <option value="0">Không hoạt động</option>
                                            </AvField>
                                        </AvGroup>
                                    ) : (
                                        <AvGroup>
                                            <label style = { { fontWeight: 900 } }>Trạng thái <span style={{ color: 'red' }}>*</span></label>
                                            <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                     type="select" name="trangThai" value={chucvu.trangThai + ''}>
                                                <option value="1">Hoạt động</option>
                                                <option value="0">Không hoạt động</option>
                                            </AvField>
                                        </AvGroup>
                                    )
                                }
                                <Button tag={Link} to="/quan-ly-nckh/chuc-vu" replace color="info">
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
    chucvu: storeState.chucvu.chuc_vu,
    loading: storeState.chucvu.loading,
    updating: storeState.chucvu.updating
});

const mapDispatchToProps = { getChucVu, addChucVu, updateChucVu, reset };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ThemChucVu);
