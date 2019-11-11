import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Label, Row, Col } from 'reactstrap';
import { AvForm, AvGroup, AvField } from 'availity-reactstrap-validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getVanBanApDungLauDai, updateVanBanApDungLauDai, uploadTapTinVanBanApDungLauDai } from './vanbanapdunglaudai.reducer';
import { IRootState } from 'app/shared/reducers';

export interface ICapNhatVanBanApDungLauDaiProps extends StateProps, DispatchProps, RouteComponentProps<{ detai: string,
    donvi: string, nam: string, trangthai: string}> {}

export class CapNhatVanBanApDungLauDaiDeTaiScript extends React.Component<ICapNhatVanBanApDungLauDaiProps> {
    state = {
        tap_tin: ''
    };
    componentDidMount(): void {
        this.props.getVanBanApDungLauDai(this.props.match.params.detai);
    }
    componentWillReceiveProps(nextProps: Readonly<ICapNhatVanBanApDungLauDaiProps>, nextContext: any): void {
        this.setState({ tap_tin: nextProps.vanbanapdunglaudai.tapTin });
    }

    uploadFileVanBanApDungLauDai = e => {
        const data = new FormData();
        const file = e.target.files[0];
        data.append('tap_tin', e.target.files[0]);
        this.setState({ tap_tin: file.name });
        this.props.uploadTapTinVanBanApDungLauDai(data);
    }
    updateVanBanApDungLauDai = (event, values) => {
        const donvi = this.props.match.params.donvi;
        const nam = this.props.match.params.nam;
        const trangthai = this.props.match.params.trangthai;
        this.props.updateVanBanApDungLauDai(values, donvi, nam, trangthai);
        this.dongHopThoai(event);
    };

    dongHopThoai = event => {
        event.stopPropagation();
        this.props.history.push(`${this.props.location.pathname}`);
        this.props.history.goBack();
    };
    handleOnClickChonTapTin = (event: React.MouseEvent<HTMLElement>) => {
        if (document.getElementById('filevanban') !== null) {
            document.getElementById('filevanban').click();
        }
    }

    render() {
        return (
            <Modal isOpen toggle={this.dongHopThoai} style={ { width: '80%' } }>
                <ModalHeader toggle={this.dongHopThoai} style={ { fontWeight: 900 } }>Chọn tập tin  văn bản áp dụng lâu dài </ModalHeader>
                <ModalBody>
                    <AvForm onValidSubmit={this.updateVanBanApDungLauDai}>
                        <AvGroup>
                            <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                     hidden name="maDeTai" type="text" value={this.props.match.params.detai} />
                            <Label> Tập tin văn bản áp dụng lâu dài của đề tài(Nhấn nút chọn tập tin để chọn văn bản)</Label>
                            <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                     hidden name="filevanban" id="filevanban" type="file" onChange={this.uploadFileVanBanApDungLauDai}/>
                            <div style={ { clear: 'both' } }>
                                <AvField style={ { width: '70%', float: 'left', fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                    readOnly
                                    type="text"
                                    className="form-control"
                                    name="tapTin"
                                    value={this.state.tap_tin}
                                />
                                <Button style={ { color: 'white', backgroundColor: '#0066ff', borderStyle: 'none', float: 'right' } } onClick={this.handleOnClickChonTapTin}>
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
    vanbanapdunglaudai: storeState.vanbanapdunglaudai.van_ban_ap_dung_lau_dai
});

const mapDispatchToProps = { getVanBanApDungLauDai, updateVanBanApDungLauDai, uploadTapTinVanBanApDungLauDai };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CapNhatVanBanApDungLauDaiDeTaiScript);
