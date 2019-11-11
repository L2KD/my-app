import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getVanBan, xoaVanBanVaTraVeDanhSach } from './vanban.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IXoaVanBanProps extends StateProps, DispatchProps, RouteComponentProps<{ vanban: string }> {}

export class XoaVanBanScript extends React.Component<IXoaVanBanProps> {
    componentDidMount() {
        this.props.getVanBan(this.props.match.params.vanban);
    }

    xoaVanBan = event => {
        this.props.xoaVanBanVaTraVeDanhSach(this.props.vanban.maVanBan, this.props.vanban.donVi, this.props.vanban.ngayBanHanh.toString().substring(0, 4));
        this.dongHopThoai(event);
    };

    dongHopThoai = event => {
        event.stopPropagation();
        this.props.history.goBack();
    };

    render() {
        const { vanban } = this.props;
        return (
            <Modal isOpen toggle={this.dongHopThoai}>
                <ModalHeader toggle={this.dongHopThoai}>Xác nhận xóa văn bản chỉ đạo tuyến</ModalHeader>
                <ModalBody>Xóa văn bản chỉ đạo tuyến này?</ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={this.xoaVanBan}>
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
    vanban: storeState.vanban.van_ban
});

const mapDispatchToProps = { getVanBan, xoaVanBanVaTraVeDanhSach };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(XoaVanBanScript);
