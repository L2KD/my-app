import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getChucVu, deleteChucVu } from './chucvu.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IXoaChucVuProps extends StateProps, DispatchProps, RouteComponentProps<{ chucvu: string }> {}

export class Xoachucvu extends React.Component<IXoaChucVuProps> {
    componentDidMount() {
        this.props.getChucVu(this.props.match.params.chucvu);
    }

    xoaChucVu = event => {
        this.props.deleteChucVu(this.props.chucvu.maChucVu);
        this.dongHopThoai(event);
    };

    dongHopThoai = event => {
        event.stopPropagation();
        this.props.history.goBack();
    };

    render() {
        const { chucvu } = this.props;
        return (
            <Modal isOpen toggle={this.dongHopThoai}>
                <ModalHeader toggle={this.dongHopThoai}>Xác nhận xóa chức vụ</ModalHeader>
                <ModalBody>Xóa chức vụ này?</ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={this.xoaChucVu}>
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
    chucvu: storeState.chucvu.chuc_vu
});

const mapDispatchToProps = { getChucVu, deleteChucVu };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Xoachucvu);
