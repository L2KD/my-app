import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Label, Row, Col } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField, AvFeedback, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { layNoiDung } from './noidung.reducer';
import { IRootState } from 'src/main/webapp/app/shared/reducers';

export interface IThemMoiNoiDungProps extends StateProps, DispatchProps, RouteComponentProps<{ noidung: string }> {}

export class Xemnoidung extends React.Component<IThemMoiNoiDungProps> {
    componentDidMount() {
            this.props.layNoiDung(this.props.match.params.noidung);

    }
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
                        <h1>Thông tin nội dung</h1>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md="8">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <AvForm>
                                    <AvGroup>
                                        <Label for="id">Mã nội dung</Label>
                                        <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } } type="text" className="form-control" name="ma_noi_dung" required readOnly value={noidung.maNoiDung} />
                                    </AvGroup>
                                <AvGroup>
                                    <Label for="tennoidung">Tên nội dung</Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                        type="text"
                                        className="form-control"
                                        name="ten_noi_dung"
                                        readOnly
                                        validate={{
                                            required: {
                                                value: true,
                                                errorMessage: 'Chưa nhập tên nội dung.'
                                            },
                                            minLength: {
                                                value: 1,
                                                errorMessage: 'Chưa nhập tên nội dung.'
                                            },
                                            maxLength: {
                                                value: 100,
                                                errorMessage: 'Tên nội dung không vượt quá 100 kí tự'
                                            }
                                        }}
                                        value={noidung.noiDung}
                                    />
                                </AvGroup>
                                <AvGroup>
                                    <Label for="vi_tri">Vị trí</Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                        type="number"
                                        className="form-control"
                                        name="vi_tri"
                                        readOnly
                                        validate={{
                                            required: {
                                                value: true,
                                                errorMessage: 'Chưa nhập vị trí nội dung.'
                                            }
                                        }}
                                        value={noidung.viTri}
                                    />
                                </AvGroup>
                                <AvGroup>
                                    <label>Trạng thái</label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                        type="text"
                                        name="trang_thai"
                                        readOnly
                                        value={ noidung.trangThai === 0 ? 'Không hoạt động' : 'Hoạt động' }
                                    />
                                </AvGroup>
                                <Button tag={Link} to="/noi-dung" replace color="info">
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
    noidung: storeState.noidung.noi_dung,
    loading: storeState.noidung.loading,
    updating: storeState.noidung.updating
});

const mapDispatchToProps = { layNoiDung };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Xemnoidung);
