import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Label, Row, Col } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField, AvFeedback, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getChucVu } from './chucvu.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IXemChucVuProps extends StateProps, DispatchProps, RouteComponentProps<{ chucvu: string }> {}

export class Xemchucvu extends React.Component<IXemChucVuProps> {
    componentDidMount() {
        this.props.getChucVu(this.props.match.params.chucvu);

    }
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
                        <h1>Thông tin chức vụ</h1>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md="8">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <AvForm>
                                <AvGroup>
                                    <Label for="id">Mã chức vụ</Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                             type="text" className="form-control" name="maChucVu" required readOnly value={chucvu.maChucVu} />
                                </AvGroup>
                                <AvGroup>
                                    <Label for="tenchucvu">Tên chức vụ</Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                        type="text"
                                        className="form-control"
                                        name="tenChucVu"
                                        readOnly
                                        value={chucvu.chucVu}
                                    />
                                </AvGroup>
                                <AvGroup>
                                    <Label for="vi_tri">Vị trí</Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                        type="number"
                                        className="form-control"
                                        readOnly
                                        name="viTri"
                                        value={chucvu.viTri}
                                    />
                                </AvGroup>
                                <AvGroup>
                                    <label>Trạng thái</label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                        type="text"
                                        name="trangThai"
                                        readOnly
                                        value={ chucvu.trangThai === 0 ? 'Không hoạt động' : 'Hoạt động' }
                                    />
                                </AvGroup>
                                <Button tag={Link} to="/quan-ly-nckh/chuc-vu" replace color="info">
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
    chucvu: storeState.chucvu.chuc_vu,
    loading: storeState.chucvu.loading,
    updating: storeState.chucvu.updating
});

const mapDispatchToProps = { getChucVu };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Xemchucvu);
