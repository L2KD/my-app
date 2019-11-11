import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Label, Row, Col } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField, AvFeedback, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getKeHoachDeTai, downloadKeHoach } from './kehoachdetai.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IXemKeHoachDeTaiProps extends StateProps, DispatchProps, RouteComponentProps<{ kehoachdetai: string
    tinhthanh: string, donvi: string, nam: string}> {}

export class XemKeHoachDeTai extends React.Component<IXemKeHoachDeTaiProps> {
    componentDidMount() {
        this.props.getKeHoachDeTai(this.props.match.params.kehoachdetai);

    }
    handleClickDownload = taptin => () => {
        this.props.downloadKeHoach(taptin);
    }
    troVeDanhSach = () => {
        this.props.history.goBack();
    }

    render() {
        const isInvalid = false;
        const { kehoachdetai, loading, updating } = this.props;
        return (
            <div>
                <Row className="justify-content-center">
                    <Col md="8">
                        <h1>Thông tin kế hoạch đề tài</h1>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md="8">
                            <AvForm>
                                <AvGroup>
                                    <Label>Năm</Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                             name="nam" type="text" className="form-control" readOnly value={kehoachdetai.nam} />
                                </AvGroup>
                                <AvGroup>
                                    <Label>Kế hoạch đề tài</Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                        name="keHoachDetai"
                                        className="form-control"
                                        readOnly
                                        value={kehoachdetai.keHoachDeTai}
                                    />
                                </AvGroup>
                                <AvGroup>
                                    <Label for="vi_tri">Nội dung trích yếu</Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                        name="noiDungTrichYeu"
                                        type="text"
                                        className="form-control"
                                        readOnly
                                        value={kehoachdetai.noiDungTrichYeu}
                                    />
                                </AvGroup>
                                <AvGroup>
                                    <Label style={ { fontWeight: 900 } }>Tập tin</Label>
                                    <Row>
                                        <Col>
                                            <AvField style={ { width: '100%', fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                     readOnly
                                                     type="text"
                                                     className="form-control"
                                                     name="tapTin"
                                                     value={kehoachdetai.tapTin}
                                            />
                                        </Col>
                                        <Col>
                                            <Button style={ { color: 'white', backgroundColor: '#0066ff', borderStyle: 'none' } }
                                                    onClick={ this.handleClickDownload(kehoachdetai.tapTin) }>
                                                <span className="d-none d-md-inline">Tải xuống</span>
                                            </Button>
                                        </Col>
                                    </Row>
                                </AvGroup>
                                <Button tag={Link}
                                        to={`/quan-ly-nckh/ke-hoach-de-tai/${this.props.match.params.tinhthanh}/${this.props.match.params.donvi}/${this.props.match.params.nam}`}
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
    kehoachdetai: storeState.kehoachdetai.ke_hoach_de_tai,
    loading: storeState.kehoachdetai.loading,
    updating: storeState.kehoachdetai.updating
});

const mapDispatchToProps = { getKeHoachDeTai, downloadKeHoach };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(XemKeHoachDeTai);
