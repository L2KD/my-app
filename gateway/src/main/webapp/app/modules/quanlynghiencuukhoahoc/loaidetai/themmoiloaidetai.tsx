import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Label, Row, Col } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField, AvFeedback, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getLoaiDeTai, addLoaiDeTai, updateLoaiDeTai, reset } from './loaidetai.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IThemMoiLoaiDeTaiProps extends StateProps, DispatchProps, RouteComponentProps<{ loaidetai: string }> {}

export interface IThemMoiLoaiDeTaiState {
    isNew: boolean;
}

export class ThemLoaiDeTai extends React.Component<IThemMoiLoaiDeTaiProps, IThemMoiLoaiDeTaiState> {
    state: IThemMoiLoaiDeTaiState = {
        isNew: !this.props.match.params || !this.props.match.params.loaidetai
    };

    componentDidMount() {
        if (this.state.isNew) {
            this.props.reset();
        } else {
            this.props.getLoaiDeTai(this.props.match.params.loaidetai);
        }
    }

    componentWillUnmount() {
        this.props.reset();
    }

    luuLoaiDeTai = (event, values) => {
        if (this.state.isNew) {
            this.props.addLoaiDeTai(values);
        } else {
            this.props.updateLoaiDeTai(values);
        }
        this.troVeDanhSach();
    };

    troVeDanhSach = () => {
        this.props.history.goBack();
    }

    render() {
        const isInvalid = false;
        const { loaidetai, loading, updating } = this.props;
        return (
            <div>
                <Row className="justify-content-center">
                    <Col md="8">
                        {this.state.isNew ? (<h1>Thêm mới loại đề tài</h1>) : (<h1>Cập nhật loại đề tài</h1>)}
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md="8">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <AvForm onValidSubmit={this.luuLoaiDeTai}>
                                {loaidetai.maLoaiDeTai ? (
                                    <AvGroup>
                                        <Label style = { { fontWeight: 900 } } for="id">Mã loại đề tài</Label>
                                        <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                 type="text" className="form-control" name="maLoaiDeTai" required readOnly value={loaidetai.maLoaiDeTai} />
                                    </AvGroup>
                                ) : null}
                                <AvGroup>
                                    <Label style = { { fontWeight: 900 } }>Tên loại đề tài <span style={{ color: 'red' }}>*</span></Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                        type="text"
                                        className="form-control"
                                        name="loaiDeTai"
                                        validate={{
                                            required: {
                                                value: true,
                                                errorMessage: 'Chưa nhập tên loại đề tài.'
                                            },
                                            minLength: {
                                                value: 1,
                                                errorMessage: 'Chưa nhập tên loại đề tài.'
                                            },
                                            maxLength: {
                                                value: 100,
                                                errorMessage: 'Tên loại đề tài không vượt quá 100 kí tự'
                                            }
                                        }}
                                        value={loaidetai.loaiDeTai}
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
                                                errorMessage: 'Chưa nhập vị trí loại đề tài.'
                                            }
                                        }}
                                        value={loaidetai.viTri}
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
                                                     type="select" name="trangThai" value={loaidetai.trangThai + ''}>
                                                <option value="1">Hoạt động</option>
                                                <option value="0">Không hoạt động</option>
                                            </AvField>
                                        </AvGroup>
                                    )
                                }
                                <Button tag={Link} to="/quan-ly-nckh/loai-de-tai" replace color="info">
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
    loaidetai: storeState.loaidetai.loai_de_tai,
    loading: storeState.loaidetai.loading,
    updating: storeState.loaidetai.updating
});

const mapDispatchToProps = { getLoaiDeTai, addLoaiDeTai, updateLoaiDeTai, reset };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ThemLoaiDeTai);
