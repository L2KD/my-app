import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Label, Row, Col } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField, AvFeedback, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getChuThe, addChuThe, updateChuThe, reset } from './chuthedetai.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IThemMoiChuTheProps extends StateProps, DispatchProps, RouteComponentProps<{ chuthe: string }> {}

export interface IThemMoiChuTheState {
    isNew: boolean;
}

export class ThemChuThe extends React.Component<IThemMoiChuTheProps, IThemMoiChuTheState> {
    state: IThemMoiChuTheState = {
        isNew: !this.props.match.params || !this.props.match.params.chuthe
    };

    componentDidMount() {
        if (this.state.isNew) {
            this.props.reset();
        } else {
            this.props.getChuThe(this.props.match.params.chuthe);
        }
    }

    componentWillUnmount() {
        this.props.reset();
    }

    luuChuThe = (event, values) => {
        if (this.state.isNew) {
            this.props.addChuThe(values);
        } else {
            this.props.updateChuThe(values);
        }
        this.troVeDanhSach();
    };

    troVeDanhSach = () => {
        this.props.history.goBack();
    }

    render() {
        const isInvalid = false;
        const { chuthe, loading, updating } = this.props;
        return (
            <div>
                <Row className="justify-content-center">
                    <Col md="8">
                        {this.state.isNew ? (<h1>Thêm mới chủ thể đề tài</h1>) : (<h1>Cập nhật chủ thể đề tài</h1>)}
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md="8">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <AvForm onValidSubmit={this.luuChuThe}>
                                {chuthe.maChuThe ? (
                                    <AvGroup>
                                        <Label style = { { fontWeight: 900 } } for="id">Mã chủ thể đề tài</Label>
                                        <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                 type="text" className="form-control" name="maChuThe" required readOnly value={chuthe.maChuThe} />
                                    </AvGroup>
                                ) : null}
                                <AvGroup>
                                    <Label style = { { fontWeight: 900 } }>Chủ thể đề tài <span style={{ color: 'red' }}>*</span></Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                        type="text"
                                        className="form-control"
                                        name="chuTheDeTai"
                                        validate={{
                                            required: {
                                                value: true,
                                                errorMessage: 'Chưa nhập tên chủ thể đề tài.'
                                            },
                                            minLength: {
                                                value: 1,
                                                errorMessage: 'Chưa nhập tên chủ thể đề tài.'
                                            },
                                            maxLength: {
                                                value: 100,
                                                errorMessage: 'Tên chủ thể đề tài không vượt quá 100 kí tự'
                                            }
                                        }}
                                        value={chuthe.chuTheDeTai}
                                    />
                                </AvGroup>
                                <AvGroup>
                                    <Label style = { { fontWeight: 900 } }>Vị trí <span style={{ color: 'red' }}>*</span></Label>
                                    <AvField min={1} style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                        type="number"
                                        className="form-control"
                                        name="viTri"
                                        validate={{
                                            required: {
                                                value: true,
                                                errorMessage: 'Chưa nhập vị trí chủ thể đề tài.'
                                            }
                                        }}
                                        value={chuthe.viTri}
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
                                                     type="select" name="trangThai" value={chuthe.trangThai + ''}>
                                                <option value="1">Hoạt động</option>
                                                <option value="0">Không hoạt động</option>
                                            </AvField>
                                        </AvGroup>
                                    )
                                }
                                <Button tag={Link} to="/quan-ly-nckh/chu-the-de-tai" replace color="info">
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
    chuthe: storeState.chuthe.chu_the,
    loading: storeState.chuthe.loading,
    updating: storeState.chuthe.updating
});

const mapDispatchToProps = { getChuThe, addChuThe, updateChuThe, reset };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ThemChuThe);
