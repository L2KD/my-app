import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Label, Row, Col } from 'reactstrap';
import { AvForm, AvGroup, AvField } from 'availity-reactstrap-validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getBienBanKeHoachDeTaiUngDungChoDonVi, updateBienBanKeHoachDeTaiUngDungChoDonVi,
    uploadTapTinBienBanKeHoachDeTaiUngDungChoDonVi } from './bienbankehoachdetaiungdungchodonvi.reducer';
import { IRootState } from 'app/shared/reducers';

export interface ICapNhatBienBanKeHoachProps extends StateProps, DispatchProps, RouteComponentProps<{ detai: string,
donvi: string, nam: string, trangthai: string}> {}

export class CapNhatBienBanKeHoachDeTaiScript extends React.Component<ICapNhatBienBanKeHoachProps> {
    state = {
        tap_tin: ''
    };
    componentDidMount() {
        this.props.getBienBanKeHoachDeTaiUngDungChoDonVi(this.props.match.params.detai);
    }
    componentWillReceiveProps(nextProps: Readonly<ICapNhatBienBanKeHoachProps>, nextContext: any): void {
        this.setState({ tap_tin: nextProps.bienbankehoach.tapTin });
    }

    uploadFileBienBanXetDuyetDeTaiUngDungChoDonVi = e => {
        const data = new FormData();
        const file = e.target.files[0];
        data.append('tap_tin', e.target.files[0]);
        this.setState({ tap_tin: file.name });
        this.props.uploadTapTinBienBanKeHoachDeTaiUngDungChoDonVi(data);
    }
    updateBienBanKeHoach = (event, values) => {
        const donvi = this.props.match.params.donvi;
        const nam = this.props.match.params.nam;
        const trangthai = this.props.match.params.trangthai;
        this.props.updateBienBanKeHoachDeTaiUngDungChoDonVi(values, donvi, nam, trangthai);
        this.dongHopThoai(event);
    };

    dongHopThoai = event => {
        event.stopPropagation();
        this.props.history.push(`${this.props.location.pathname}`);
        this.props.history.goBack();
    };
    handleOnClickChonTapTin = (event: React.MouseEvent<HTMLElement>) => {
        if (document.getElementById('filebienban') !== null) {
            document.getElementById('filebienban').click();
        }
    }

    render() {
        return (
            <Modal isOpen toggle={this.dongHopThoai} style={ { width: '80%' } }>
                <ModalHeader toggle={this.dongHopThoai} style={ { fontWeight: 900 } }>Chọn tập tin biên bản kế hoạch cho đề tài </ModalHeader>
                <ModalBody>
                    <AvForm onValidSubmit={this.updateBienBanKeHoach}>
                        <AvGroup>
                            <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } } hidden name="maDeTai" type="text" value={this.props.match.params.detai} />
                            <Label> Tập tin biên bản kế hoạch của đề tài(Nhấn nút chọn tập tin để chọn biên bản)</Label>
                            <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } } hidden name="filebienban" id="filebienban" type="file" onChange={this.uploadFileBienBanXetDuyetDeTaiUngDungChoDonVi}/>
                            <div style={ { clear: 'both' } }>
                                <AvField style={ {width: '70%', float: 'left', fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
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
    bienbankehoach: storeState.bienbankehoachdetaiungdungchodonvi.bien_ban_ke_hoach_de_tai_ung_dung_cho_don_vi
});

const mapDispatchToProps = { getBienBanKeHoachDeTaiUngDungChoDonVi, updateBienBanKeHoachDeTaiUngDungChoDonVi, uploadTapTinBienBanKeHoachDeTaiUngDungChoDonVi };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CapNhatBienBanKeHoachDeTaiScript);
