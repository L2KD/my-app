import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Label, Row, Col } from 'reactstrap';
import { AvForm, AvGroup, AvField } from 'availity-reactstrap-validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getBaoCaoQuyNamDeTai, updateBaoCaoQuyNamDeTai,
    uploadTapTinBaoCaoQuyNamDeTaiQuy1, uploadTapTinBaoCaoQuyNamDeTaiQuy2, uploadTapTinBaoCaoQuyNamDeTaiQuy3, uploadTapTinBaoCaoQuyNamDeTaiQuy4,
uploadTapTinBaoCaoQuyNamDeTaiNam } from './baocaoquynamdetai.reducer';
import { IRootState } from 'app/shared/reducers';

export interface ICapNhatBaoCaoQuyNamDeTaiProps extends StateProps, DispatchProps, RouteComponentProps<{ detai: string,
    donvi: string, nam: string, trangthai: string}> {}

export class CapNhatBaoCaoQuyNamDeTaiDeTaiScript extends React.Component<ICapNhatBaoCaoQuyNamDeTaiProps> {
    state = {
        tap_tin_bao_cao_quy_1: '',
        tap_tin_bao_cao_quy_2: '',
        tap_tin_bao_cao_quy_3: '',
        tap_tin_bao_cao_quy_4: '',
        tap_tin_bao_cao_nam: ''
    };
    constructor(props) {
        super(props);
        // this.props.getBaoCaoQuyNamDeTai(this.props.match.params.detai);
    }
    componentWillMount(): void {
        this.props.getBaoCaoQuyNamDeTai(this.props.match.params.detai);
    }

    componentWillReceiveProps(nextProps: Readonly<ICapNhatBaoCaoQuyNamDeTaiProps>, nextContext: any): void {
        this.setState({
                tap_tin_bao_cao_quy_1: nextProps.baocaoquynam.tapTinBaoCaoQuy1,
                tap_tin_bao_cao_quy_2: nextProps.baocaoquynam.tapTinBaoCaoQuy2,
                tap_tin_bao_cao_quy_3: nextProps.baocaoquynam.tapTinBaoCaoQuy3,
                tap_tin_bao_cao_quy_4: nextProps.baocaoquynam.tapTinBaoCaoQuy4,
                tap_tin_bao_cao_nam: nextProps.baocaoquynam.tapTinBaoCaoNam});
    }

    uploadFileBaoCaoQuyNamDeTaiQuy1 = e => {
        const data = new FormData();
        const file = e.target.files[0];
        data.append('tap_tin', e.target.files[0]);
        this.setState({ tap_tin_bao_cao_quy_1: file.name });
        this.props.uploadTapTinBaoCaoQuyNamDeTaiQuy1(data);
    }
    uploadFileBaoCaoQuyNamDeTaiQuy2 = e => {
        const data = new FormData();
        const file = e.target.files[0];
        data.append('tap_tin', e.target.files[0]);
        this.setState({ tap_tin_bao_cao_quy_2: file.name });
        this.props.uploadTapTinBaoCaoQuyNamDeTaiQuy2(data);
    }
    uploadFileBaoCaoQuyNamDeTaiQuy3 = e => {
        const data = new FormData();
        const file = e.target.files[0];
        data.append('tap_tin', e.target.files[0]);
        this.setState({ tap_tin_bao_cao_quy_3: file.name });
        this.props.uploadTapTinBaoCaoQuyNamDeTaiQuy3(data);
    }
    uploadFileBaoCaoQuyNamDeTaiQuy4 = e => {
        const data = new FormData();
        const file = e.target.files[0];
        data.append('tap_tin', e.target.files[0]);
        this.setState({ tap_tin_bao_cao_quy_4: file.name });
        this.props.uploadTapTinBaoCaoQuyNamDeTaiQuy4(data);
    }
    uploadFileBaoCaoQuyNamDeTaiNam = e => {
        const data = new FormData();
        const file = e.target.files[0];
        data.append('tap_tin', e.target.files[0]);
        this.setState({ tap_tin_bao_cao_nam: file.name });
        this.props.uploadTapTinBaoCaoQuyNamDeTaiNam(data);
    }
    updateBaoCaoQuyNamDeTai = (event, values) => {
        const donvi = this.props.match.params.donvi;
        const nam = this.props.match.params.nam;
        const trangthai = this.props.match.params.trangthai;
        this.props.updateBaoCaoQuyNamDeTai(values, donvi, nam, trangthai);
        this.dongHopThoai(event);
    };

    dongHopThoai = event => {
        event.stopPropagation();
        this.props.history.push(`${this.props.location.pathname}`);
        this.props.history.goBack();
    };
    handleOnClickChonTapTinQuy1 = event => {
        if (document.getElementById('filequy1') !== null) {
            document.getElementById('filequy1').click();
        }
    }

    handleOnClickChonTapTinQuy2 = event => {
        if (document.getElementById('filequy2') !== null) {
            document.getElementById('filequy2').click();
        }
    }

    handleOnClickChonTapTinQuy3 = event => {
        if (document.getElementById('filequy3') !== null) {
            document.getElementById('filequy3').click();
        }
    }

    handleOnClickChonTapTinQuy4 = event => {
        if (document.getElementById('filequy4') !== null) {
            document.getElementById('filequy4').click();
        }
    }

    handleOnClickChonTapTinNam = (event: React.MouseEvent<HTMLElement>) => {
        if (document.getElementById('filenam') !== null) {
            document.getElementById('filenam').click();
        }
    }

    render() {
        return (
            <Modal isOpen toggle={this.dongHopThoai} style={ { width: '80%' } }>
                <ModalHeader toggle={this.dongHopThoai} style={ { fontWeight: 900 } }>Chọn tập tin báo cáo quý/năm cho đề tài </ModalHeader>
                <ModalBody>
                    <AvForm onValidSubmit={this.updateBaoCaoQuyNamDeTai}>
                        <AvGroup>
                            <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                     hidden name="maDeTai" type="text" value={this.props.match.params.detai} />
                            <Label> Tập tin báo cáo quý 1 của đề tài(Nhấn nút chọn tập tin để chọn biên bản)</Label>
                            <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                     hidden name="filequy1" id="filequy1" type="file" onChange={this.uploadFileBaoCaoQuyNamDeTaiQuy1}/>
                            <div style={ { clear: 'both' } }>
                                <AvField style={ { width: '70%', float: 'left', fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                    readOnly
                                    type="text"
                                    className="form-control"
                                    name="tapTinBaoCaoQuy1"
                                    value={this.state.tap_tin_bao_cao_quy_1}
                                />
                                <Button style={ { color: 'white', backgroundColor: '#0066ff', borderStyle: 'none', float: 'right' } } onClick={this.handleOnClickChonTapTinQuy1}>
                                    <span className="d-none d-md-inline">Chọn tập tin</span>
                                </Button>
                            </div>
                        </AvGroup>
                        <div style={ { clear: 'both' } } />
                        <AvGroup>
                            <Label> Tập tin báo cáo quý 2 của đề tài(Nhấn nút chọn tập tin để chọn biên bản)</Label>
                            <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                     hidden name="filequy2" id="filequy2" type="file" onChange={this.uploadFileBaoCaoQuyNamDeTaiQuy2}/>
                            <div style={ { clear: 'both' } }>
                                <AvField style={ { width: '70%', float: 'left', fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                    readOnly
                                    type="text"
                                    className="form-control"
                                    name="tapTinBaoCaoQuy2"
                                    value={this.state.tap_tin_bao_cao_quy_2}
                                />
                                <Button style={ { color: 'white', backgroundColor: '#0066ff', borderStyle: 'none', float: 'right' } } onClick={this.handleOnClickChonTapTinQuy2}>
                                    <span className="d-none d-md-inline">Chọn tập tin</span>
                                </Button>
                            </div>
                        </AvGroup>
                        <div style={ { clear: 'both' } } />
                        <AvGroup>
                            <Label> Tập tin báo cáo quý 3 của đề tài(Nhấn nút chọn tập tin để chọn biên bản)</Label>
                            <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                     hidden name="filequy3" id="filequy3" type="file" onChange={this.uploadFileBaoCaoQuyNamDeTaiQuy3}/>
                            <div style={ { clear: 'both' } }>
                                <AvField style={ { width: '70%', float: 'left', fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                    readOnly
                                    type="text"
                                    className="form-control"
                                    name="tapTinBaoCaoQuy3"
                                    value={this.state.tap_tin_bao_cao_quy_3}
                                />
                                <Button style={ { color: 'white', backgroundColor: '#0066ff', borderStyle: 'none', float: 'right' } } onClick={this.handleOnClickChonTapTinQuy3}>
                                    <span className="d-none d-md-inline">Chọn tập tin</span>
                                </Button>
                            </div>
                        </AvGroup>
                        <div style={ { clear: 'both' } } />
                        <AvGroup>
                            <Label> Tập tin báo cáo quý 4 của đề tài(Nhấn nút chọn tập tin để chọn biên bản)</Label>
                            <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                     hidden name="filequy4" id="filequy4" type="file" onChange={this.uploadFileBaoCaoQuyNamDeTaiQuy4}/>
                            <div style={ { clear: 'both' } }>
                                <AvField style={ { width: '70%', float: 'left', fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                    readOnly
                                    type="text"
                                    className="form-control"
                                    name="tapTinBaoCaoQuy4"
                                    value={this.state.tap_tin_bao_cao_quy_4}
                                />
                                <Button style={ { color: 'white', backgroundColor: '#0066ff', borderStyle: 'none', float: 'right' } } onClick={this.handleOnClickChonTapTinQuy4}>
                                    <span className="d-none d-md-inline">Chọn tập tin</span>
                                </Button>
                            </div>
                        </AvGroup>
                        <div style={ { clear: 'both' } } />
                        <AvGroup>
                            <Label> Tập tin báo cáo năm của đề tài(Nhấn nút chọn tập tin để chọn biên bản)</Label>
                            <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                     hidden name="filenam" id="filenam" type="file" onChange={this.uploadFileBaoCaoQuyNamDeTaiNam}/>
                            <div style={ { clear: 'both' } }>
                                <AvField style={ { width: '70%', float: 'left', fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                    readOnly
                                    type="text"
                                    className="form-control"
                                    name="tapTinBaoCaoNam"
                                    value={this.state.tap_tin_bao_cao_nam}
                                />
                                <Button style={ { color: 'white', backgroundColor: '#0066ff', borderStyle: 'none', float: 'right' } } onClick={this.handleOnClickChonTapTinNam}>
                                    <span className="d-none d-md-inline">Chọn tập tin</span>
                                </Button>
                            </div>
                        </AvGroup>
                        <div style={ { clear: 'both' } } />
                        <br />
                        <div style={ { textAlign: 'center', marginTop: '5px', display: 'block' } }>
                            <Button color="primary" onClick={this.dongHopThoai}>
                                <FontAwesomeIcon icon="arrow-left" />
                                &nbsp; Đóng
                            </Button>
                            &nbsp;
                            <Button color="primary" type="submit">
                                <FontAwesomeIcon icon="save" />
                                &nbsp; Lưu
                            </Button>
                        </div>
                    </AvForm>
                </ModalBody>
                <ModalFooter/>
            </Modal>
        );
    }
}

const mapStateToProps = (storeState: IRootState) => ({
    baocaoquynam: storeState.baocaoquynamdetai.bao_cao_quy_nam_de_tai
});

const mapDispatchToProps = { getBaoCaoQuyNamDeTai, updateBaoCaoQuyNamDeTai, uploadTapTinBaoCaoQuyNamDeTaiQuy1, uploadTapTinBaoCaoQuyNamDeTaiQuy2, uploadTapTinBaoCaoQuyNamDeTaiQuy3,
    uploadTapTinBaoCaoQuyNamDeTaiQuy4, uploadTapTinBaoCaoQuyNamDeTaiNam };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CapNhatBaoCaoQuyNamDeTaiDeTaiScript);
