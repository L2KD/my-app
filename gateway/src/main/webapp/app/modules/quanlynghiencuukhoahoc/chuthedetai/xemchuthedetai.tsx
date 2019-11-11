import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Label, Row, Col } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField, AvFeedback, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getChuThe } from './chuthedetai.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IXemChuTheProps extends StateProps, DispatchProps, RouteComponentProps<{ chuthe: string }> {}

export class Xemchuthedetai extends React.Component<IXemChuTheProps> {
    componentDidMount() {
        this.props.getChuThe(this.props.match.params.chuthe);

    }
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
                        <h1>Thông tin chủ thể đề tài</h1>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md="8">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <AvForm>
                                <AvGroup>
                                    <Label for="id">Mã chủ thể đề tài</Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                             type="text" className="form-control" name="maChuThe" required readOnly value={chuthe.maChuThe} />
                                </AvGroup>
                                <AvGroup>
                                    <Label for="tenchuthe">Tên chủ thể đề tài</Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                        type="text"
                                        className="form-control"
                                        name="tenChuThe"
                                        readOnly
                                        value={chuthe.chuTheDeTai}
                                    />
                                </AvGroup>
                                <AvGroup>
                                    <Label for="vi_tri">Vị trí</Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                        type="number"
                                        className="form-control"
                                        name="viTri"
                                        readOnly
                                        value={chuthe.viTri}
                                    />
                                </AvGroup>
                                <AvGroup>
                                    <label>Trạng thái</label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                        type="text"
                                        name="trangThai"
                                        readOnly
                                        value={ chuthe.trangThai === 0 ? 'Không hoạt động' : 'Hoạt động' }
                                    />
                                </AvGroup>
                                <Button tag={Link} to="/quan-ly-nckh/chu-the-de-tai" replace color="info">
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
    chuthe: storeState.chuthe.chu_the,
    loading: storeState.chuthe.loading,
    updating: storeState.chuthe.updating
});

const mapDispatchToProps = { getChuThe };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Xemchuthedetai);
