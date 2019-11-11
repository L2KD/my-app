import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Label, Row, Col } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField, AvFeedback, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { layDanhGia } from './danhgia.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IThemMoiDanhGiaProps extends StateProps, DispatchProps, RouteComponentProps<{ danhgia: string }> {}

export class Xemdanhgia extends React.Component<IThemMoiDanhGiaProps> {
    componentDidMount() {
            this.props.layDanhGia(this.props.match.params.danhgia);

    }

    render() {
        const isInvalid = false;
        const { danhgia, loading, updating } = this.props;
        return (
            <div>
                <Row className="justify-content-center">
                    <Col md="8">
                        <h1>Thông tin đánh giá</h1>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md="8">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <AvForm>
                                    <AvGroup>
                                        <Label style = { { fontWeight: '900' } } for="id">Mã đánh giá</Label>
                                        <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } } type="text"
                                                 className="form-control" name="ma_danh_gia" required readOnly value={danhgia.ma_danh_gia} />
                                    </AvGroup>
                                <AvGroup>
                                    <Label style = { { fontWeight: '900' } } for="tendanhgia">Tên đánh giá</Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                        type="text"
                                        className="form-control"
                                        name="danh_gia_cdt"
                                        readOnly
                                        validate={{
                                            required: {
                                                value: true,
                                                errorMessage: 'Chưa nhập tên đánh giá.'
                                            },
                                            minLength: {
                                                value: 1,
                                                errorMessage: 'Chưa nhập tên đánh giá.'
                                            },
                                            maxLength: {
                                                value: 100,
                                                errorMessage: 'Tên đánh giá không vượt quá 100 kí tự'
                                            }
                                        }}
                                        value={danhgia.danh_gia_cdt}
                                    />
                                </AvGroup>
                                <AvGroup>
                                    <Label style = { { fontWeight: '900' } } for="vi_tri">Vị trí</Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                        type="number"
                                        className="form-control"
                                        name="vi_tri"
                                        readOnly
                                        validate={{
                                            required: {
                                                value: true,
                                                errorMessage: 'Chưa nhập vị trí đánh giá.'
                                            }
                                        }}
                                        value={danhgia.vi_tri}
                                    />
                                </AvGroup>
                                <AvGroup>
                                    <Label style = { { fontWeight: '900' } }>Trạng thái</Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                        type="text"
                                        name="trang_thai"
                                        readOnly
                                        value={ danhgia.trang_thai === 0 ? 'Không hoạt động' : 'Hoạt động' }
                                    />
                                </AvGroup>
                                <Button tag={Link} to={`/danh-gia/${danhgia.loai_cdt}`} replace color="info">
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
    danhgia: storeState.danhgia.danh_gia,
    loading: storeState.danhgia.loading,
    updating: storeState.danhgia.updating
});

const mapDispatchToProps = { layDanhGia };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Xemdanhgia);
