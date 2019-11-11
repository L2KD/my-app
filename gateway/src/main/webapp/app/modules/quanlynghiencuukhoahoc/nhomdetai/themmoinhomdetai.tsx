import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Label, Row, Col } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField, AvFeedback, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getNhomDeTai, addNhomDeTai, updateNhomDeTai, reset } from './nhomdetai.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IThemMoiNhomDeTaiProps extends StateProps, DispatchProps, RouteComponentProps<{ nhomdetai: string }> {}

export interface IThemMoiNhomDeTaiState {
    isNew: boolean;
}

export class ThemNhomDeTai extends React.Component<IThemMoiNhomDeTaiProps, IThemMoiNhomDeTaiState> {
    state: IThemMoiNhomDeTaiState = {
        isNew: !this.props.match.params || !this.props.match.params.nhomdetai
    };

    componentDidMount() {
        if (this.state.isNew) {
            this.props.reset();
        } else {
            this.props.getNhomDeTai(this.props.match.params.nhomdetai);
        }
    }

    componentWillUnmount() {
        this.props.reset();
    }

    luuNhomDeTai = (event, values) => {
        if (this.state.isNew) {
            this.props.addNhomDeTai(values);
        } else {
            this.props.updateNhomDeTai(values);
        }
        this.troVeDanhSach();
    };

    troVeDanhSach = () => {
        this.props.history.goBack();
    }

    render() {
        const isInvalid = false;
        const { nhom_de_tai, loading, updating } = this.props;
        return (
            <div>
                <Row className="justify-content-center">
                    <Col md="8">
                        {this.state.isNew ? (<h1>Thêm mới nhóm đề tài</h1>) : (<h1>Cập nhật nhóm đề tài</h1>)}
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md="8">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <AvForm onValidSubmit={this.luuNhomDeTai}>
                                {nhom_de_tai.maNhomDeTai ? (
                                    <AvGroup>
                                        <Label style = { { fontWeight: 900 } } for="id">Mã nhóm đề tài</Label>
                                        <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                 type="text" className="form-control" name="maNhomDeTai" required readOnly value={nhom_de_tai.maNhomDeTai} />
                                    </AvGroup>
                                ) : null}
                                <AvGroup>
                                    <Label style = { { fontWeight: 900 } }>Tên nhóm đề tài <span style={{ color: 'red' }}>*</span></Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                        type="text"
                                        className="form-control"
                                        name="nhomDeTai"
                                             required
                                        validate={{
                                            required: {
                                                value: true,
                                                errorMessage: 'Chưa nhập tên nhóm đề tài.'
                                            },
                                            minLength: {
                                                value: 1,
                                                errorMessage: 'Chưa nhập tên nhóm đề tài.'
                                            },
                                            maxLength: {
                                                value: 100,
                                                errorMessage: 'Tên nhóm đề tài không vượt quá 100 kí tự'
                                            }
                                        }}
                                        value={nhom_de_tai.nhomDeTai}
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
                                                errorMessage: 'Chưa nhập vị trí nhóm đề tài.'
                                            }
                                        }}
                                        value={nhom_de_tai.viTri}
                                    />
                                </AvGroup>
                                {
                                    this.state.isNew ? (
                                        <AvGroup>
                                            <Label style = { { fontWeight: 900 } }>Trạng thái <span style={{ color: 'red' }}>*</span></Label>
                                            <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                     type="select" name="trangThai" value="1">
                                                <option value="1">Hoạt động</option>
                                                <option value="0">Không hoạt động</option>
                                            </AvField>
                                        </AvGroup>
                                    ) : (
                                        <AvGroup>
                                            <Label style = { { fontWeight: 900 } }>Trạng thái <span style={{ color: 'red' }}>*</span></Label>
                                            <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                     type="select" name="trangThai" value={nhom_de_tai.trangThai + ''}>
                                                <option value="1">Hoạt động</option>
                                                <option value="0">Không hoạt động</option>
                                            </AvField>
                                        </AvGroup>
                                    )
                                }

                                <Button tag={Link} to="/quan-ly-nckh/nhom-de-tai" replace color="info">
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
    nhom_de_tai: storeState.nhomdetai.nhom_de_tai,
    loading: storeState.nhomdetai.loading,
    updating: storeState.nhomdetai.updating
});

const mapDispatchToProps = { getNhomDeTai, addNhomDeTai, updateNhomDeTai, reset };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ThemNhomDeTai);
