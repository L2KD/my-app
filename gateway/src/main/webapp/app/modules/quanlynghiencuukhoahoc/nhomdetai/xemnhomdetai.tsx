import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Label, Row, Col } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField, AvFeedback, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getNhomDeTai } from './nhomdetai.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IXemNhomDeTaiProps extends StateProps, DispatchProps, RouteComponentProps<{ nhomdetai: string }> {}

export class XemNhomDeTai extends React.Component<IXemNhomDeTaiProps> {
    componentDidMount() {
        this.props.getNhomDeTai(this.props.match.params.nhomdetai);

    }
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
                        <h1>Thông tin nhóm đề tài</h1>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md="8">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <AvForm>
                                <AvGroup>
                                    <Label for="id">Mã nhóm đề tài</Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                             type="text" className="form-control" name="maNhomDeTai" required readOnly value={nhom_de_tai.maNhomDeTai} />
                                </AvGroup>
                                <AvGroup>
                                    <Label for="tennhomdetai">Tên nhóm đề tài</Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                        type="text"
                                        className="form-control"
                                        name="tenNhomDeTai"
                                        readOnly
                                        value={nhom_de_tai.nhomDeTai}
                                    />
                                </AvGroup>
                                <AvGroup>
                                    <Label for="vi_tri">Vị trí</Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                        type="number"
                                        className="form-control"
                                        name="viTri"
                                        readOnly
                                        value={nhom_de_tai.viTri}
                                    />
                                </AvGroup>
                                <AvGroup>
                                    <label>Trạng thái</label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                        type="text"
                                        name="trangThai"
                                        readOnly
                                        value={ nhom_de_tai.trangThai === 0 ? 'Không hoạt động' : 'Hoạt động' }
                                    />
                                </AvGroup>
                                <Button tag={Link} to="/quan-ly-nckh/nhom-de-tai" replace color="info">
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
    nhom_de_tai: storeState.nhomdetai.nhom_de_tai,
    loading: storeState.nhomdetai.loading,
    updating: storeState.nhomdetai.updating
});

const mapDispatchToProps = { getNhomDeTai };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(XemNhomDeTai);
