import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getChuThe, deleteChuThe } from './chuthedetai.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IXoaChuTheProps extends StateProps, DispatchProps, RouteComponentProps<{ chuthe: string }> {}

export class Xoachuthedetai extends React.Component<IXoaChuTheProps> {
    componentDidMount() {
        this.props.getChuThe(this.props.match.params.chuthe);
    }

    xoaChuThe = event => {
        this.props.deleteChuThe(this.props.chuthe.maChuThe);
        this.dongHopThoai(event);
    };

    dongHopThoai = event => {
        event.stopPropagation();
        this.props.history.goBack();
    };

    render() {
        const { chuthe } = this.props;
        return (
            <Modal isOpen toggle={this.dongHopThoai}>
                <ModalHeader toggle={this.dongHopThoai}>Xác nhận xóa chủ thể đề tài</ModalHeader>
                <ModalBody>Xóa chủ thể đề tài này?</ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={this.xoaChuThe}>
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
    chuthe: storeState.chuthe.chu_the
});

const mapDispatchToProps = { getChuThe, deleteChuThe };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Xoachuthedetai);
