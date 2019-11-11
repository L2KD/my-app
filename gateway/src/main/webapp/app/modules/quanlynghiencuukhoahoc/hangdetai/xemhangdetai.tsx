import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Label, Row, Col } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField, AvFeedback, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getHangDeTai } from './hangdetai.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IXemHangDeTaiProps extends StateProps, DispatchProps, RouteComponentProps<{ hangdetai: string }> {}

export class Xemhangdetai extends React.Component<IXemHangDeTaiProps> {
    componentDidMount() {
        this.props.getHangDeTai(this.props.match.params.hangdetai);

    }
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
                        <h1>Thông tin hạng đề tài</h1>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md="8">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <AvForm>
                                <AvGroup>
                                    <Label for="id">Mã hạng đề tài</Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } } type="text" className="form-control" name="maHangDeTai" required readOnly value={hangdetai.maHangDeTai} />
                                </AvGroup>
                                <AvGroup>
                                    <Label for="tenhangdetai">Tên hạng đề tài</Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                        type="text"
                                        className="form-control"
                                        name="HangDeTai"
                                        readOnly
                                        value={hangdetai.hangDeTai}
                                    />
                                </AvGroup>
                                <AvGroup>
                                    <Label for="vi_tri">Vị trí</Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                        type="number"
                                        className="form-control"
                                        name="viTri"
                                        readOnly
                                        value={hangdetai.viTri}
                                    />
                                </AvGroup>
                                <AvGroup>
                                    <label>Trạng thái</label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                        type="text"
                                        name="trangThai"
                                        readOnly
                                        value={ hangdetai.trangThai === 0 ? 'Không hoạt động' : 'Hoạt động' }
                                    />
                                </AvGroup>
                                <Button tag={Link} to="/quan-ly-nckh/hang-de-tai" replace color="info">
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
    hangdetai: storeState.hangdetai.hang_de_tai,
    loading: storeState.hangdetai.loading,
    updating: storeState.hangdetai.updating
});

const mapDispatchToProps = { getHangDeTai };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Xemhangdetai);
