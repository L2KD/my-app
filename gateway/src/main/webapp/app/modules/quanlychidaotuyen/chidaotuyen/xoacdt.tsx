import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getCDT, xoaCDTVaTraVeDanhSach } from './cdt.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IXoaCDTProps extends StateProps, DispatchProps, RouteComponentProps<{ cdt: string }> {}

export class XoaCDTScript extends React.Component<IXoaCDTProps> {
    componentDidMount() {
        this.props.getCDT(this.props.match.params.cdt);
    }

    xoaCDT = event => {
        this.props.xoaCDTVaTraVeDanhSach(this.props.cdt.maCDT, this.props.cdt.donVi, this.props.cdt.ngayThucHien.toString().substring(0, 4), this.props.cdt.keHoach);
        this.dongHopThoai(event);
    };

    dongHopThoai = event => {
        event.stopPropagation();
        // this.props.history.push(`${this.props.location.pathname}`);
        this.props.history.goBack();
    };

    render() {
        const { cdt } = this.props;
        return (
            <Modal isOpen toggle={this.dongHopThoai}>
                <ModalHeader toggle={this.dongHopThoai}>Xác nhận xóa chỉ đạo tuyến</ModalHeader>
                <ModalBody>Xóa chỉ đạo tuyến này?</ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={this.xoaCDT}>
                        <FontAwesomeIcon icon="trash" />
                        &nbsp; Xóa
                    </Button>
                    <Button color="secondary" onClick={this.dongHopThoai}>
                        <FontAwesomeIcon icon="ban" />
                        &nbsp; Không
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = (storeState: IRootState) => ({
    cdt: storeState.cdt.cdt
});

const mapDispatchToProps = { getCDT, xoaCDTVaTraVeDanhSach };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(XoaCDTScript);
