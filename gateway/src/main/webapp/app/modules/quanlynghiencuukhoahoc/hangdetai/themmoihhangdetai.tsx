import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Label, Row, Col } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField, AvFeedback, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getHangDeTai, addHangDeTai, updateHangDeTai, reset } from './hangdetai.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IThemMoiHangDeTaiProps extends StateProps, DispatchProps, RouteComponentProps<{ hangdetai: string }> {}

export interface IThemMoiHangDeTaiState {
    isNew: boolean;
}

export class ThemHangDeTai extends React.Component<IThemMoiHangDeTaiProps, IThemMoiHangDeTaiState> {
    state: IThemMoiHangDeTaiState = {
        isNew: !this.props.match.params || !this.props.match.params.hangdetai
    };

    componentDidMount() {
        if (this.state.isNew) {
            this.props.reset();
        } else {
            this.props.getHangDeTai(this.props.match.params.hangdetai);
        }
    }

    componentWillUnmount() {
        this.props.reset();
    }

    luuHangDeTai = (event, values) => {
        if (this.state.isNew) {
            this.props.addHangDeTai(values);
        } else {
            this.props.updateHangDeTai(values);
        }
        this.troVeDanhSach();
    };

    troVeDanhSach = () => {
        this.props.history.goBack();
    }

    render() {
        const isInvalid = false;
        const { hangdetai, loading, updating } = this.props;
        return (
            <div>
                <Row className="justify-content-center">
                    <Col md="8">
                        {this.state.isNew ? (<h1>Thêm mới hạng đề tài</h1>) : (<h1>Cập nhật hạng đề tài</h1>)}
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md="8">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <AvForm onValidSubmit={this.luuHangDeTai}>
                                {hangdetai.maHangDeTai ? (
                                    <AvGroup>
                                        <Label style = { { fontWeight: 900 } } for="id">Mã hạng đề tài</Label>
                                        <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                 type="text" className="form-control" name="maHangDeTai" required readOnly value={hangdetai.maHangDeTai} />
                                    </AvGroup>
                                ) : null}
                                <AvGroup>
                                    <Label style = { { fontWeight: 900 } }>Tên hạng đề tài <span style={{ color: 'red' }}>*</span></Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                        type="text"
                                        className="form-control"
                                        name="hangDeTai"
                                             required
                                        validate={{
                                            required: {
                                                value: true,
                                                errorMessage: 'Chưa nhập tên hạng đề tài.'
                                            },
                                            minLength: {
                                                value: 1,
                                                errorMessage: 'Chưa nhập tên hạng đề tài.'
                                            },
                                            maxLength: {
                                                value: 100,
                                                errorMessage: 'Tên hạng đề tài không vượt quá 100 kí tự'
                                            }
                                        }}
                                        value={hangdetai.hangDeTai}
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
                                                errorMessage: 'Chưa nhập vị trí hạng đề tài.'
                                            }
                                        }}
                                        value={hangdetai.viTri}
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
                                                     type="select" name="trangThai" value={hangdetai.trangThai + ''}>
                                                <option value="1">Hoạt động</option>
                                                <option value="0">Không hoạt động</option>
                                            </AvField>
                                        </AvGroup>
                                    )
                                }
                                <Button tag={Link} to="/quan-ly-nckh/hang-de-tai" replace color="info">
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
    hangdetai: storeState.hangdetai.hang_de_tai,
    loading: storeState.hangdetai.loading,
    updating: storeState.hangdetai.updating
});

const mapDispatchToProps = { getHangDeTai, addHangDeTai, updateHangDeTai, reset };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ThemHangDeTai);
