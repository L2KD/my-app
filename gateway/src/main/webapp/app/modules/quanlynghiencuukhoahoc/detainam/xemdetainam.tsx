import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Label, Row, Col } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField, AvFeedback, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getDeTaiNam } from './detainam.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IXemDeTaiNamProps extends StateProps, DispatchProps, RouteComponentProps<{
    detainam: string, tinhthanh: string, donvi: string, nam: string, trangthai: string }> {}

export class XemDeTaiNam extends React.Component<IXemDeTaiNamProps> {
    componentDidMount() {
        this.props.getDeTaiNam(this.props.match.params.detainam);

    }
    troVeDanhSach = () => {
        this.props.history.goBack();
    }

    render() {
        const isInvalid = false;
        const { de_tai_nam, loading, updating } = this.props;
        return (
            <div>
                <Row className="justify-content-center">
                    <Col md="8">
                        <h1>Thông tin đề tài năm</h1>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md="8">
                        <AvForm>
                            <AvGroup>
                                <Label style={ { fontWeight: 900 } }>Tên đề tài</Label>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } } name="nam" type="text" className="form-control" readOnly value={de_tai_nam.tenDeTai} />
                            </AvGroup>
                            <AvGroup>
                                <Label style={ { fontWeight: 900 } }>Loại đề tài</Label>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } } name="nam" type="text" className="form-control" readOnly value={de_tai_nam.tenLoaiDeTai} />
                            </AvGroup>
                            <AvGroup>
                                <Label style={ { fontWeight: 900 } }>Hạng đề tài</Label>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } } name="nam" type="text" className="form-control" readOnly value={de_tai_nam.tenHangDeTai} />
                            </AvGroup>
                            <AvGroup>
                                <Label style={ { fontWeight: 900 } }>Nhóm đề tài</Label>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } } name="nam" type="text" className="form-control" readOnly value={de_tai_nam.tenNhomDeTai} />
                            </AvGroup>
                            <AvGroup>
                                <Label style={ { fontWeight: 900 } }>Chủ nhiệm đề tài</Label>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } } name="nam" type="text" className="form-control" readOnly value={de_tai_nam.tenChuNhiem} />
                            </AvGroup>
                            <AvGroup>
                                <Label style={ { fontWeight: 900 } }>Kết quả xét duyệt</Label>
                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white', color: de_tai_nam.trangThai === 1 ? 'blue' : 'green' } }
                                         name="nam" type="text" className="form-control" readOnly
                                         value={ de_tai_nam.trangThai === 1 ? 'Đã xét duyệt báo cáo tổng kết' : 'Đã lập danh mục đề tài năm' } />
                            </AvGroup>
                            <Button tag={Link}
                                    to={`/quan-ly-nckh/de-tai-nam/${this.props.match.params.tinhthanh}/${this.props.match.params.donvi}/${this.props.match.params.nam}/${this.props.match.params.trangthai}`}
                                    replace color="info">
                                <FontAwesomeIcon icon="arrow-left" />
                                &nbsp;
                                <span className="d-none d-md-inline">Trở về</span>
                            </Button>
                            &nbsp;
                        </AvForm>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (storeState: IRootState) => ({
    de_tai_nam: storeState.detainam.de_tai_nam,
    loading: storeState.detainam.loading,
    updating: storeState.detainam.updating
});

const mapDispatchToProps = { getDeTaiNam };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(XemDeTaiNam);
