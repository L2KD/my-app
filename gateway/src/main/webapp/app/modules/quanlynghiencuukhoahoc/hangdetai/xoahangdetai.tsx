import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getHangDeTai, deleteHangDeTai } from './hangdetai.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IXoaHangDeTaiProps extends StateProps, DispatchProps, RouteComponentProps<{ hangdetai: string }> {}

export class XoaHangDeTai extends React.Component<IXoaHangDeTaiProps> {
    componentDidMount() {
        this.props.getHangDeTai(this.props.match.params.hangdetai);
    }

    xoaHangDeTai = event => {
        this.props.deleteHangDeTai(this.props.hangdetai.maHangDeTai);
        this.dongHopThoai(event);
    };

    dongHopThoai = event => {
        event.stopPropagation();
        this.props.history.goBack();
    };

    render() {
        const { hangdetai } = this.props;
        return (
            <Modal isOpen toggle={this.dongHopThoai}>
                <ModalHeader toggle={this.dongHopThoai}>Xác nhận xóa hạng đề tài</ModalHeader>
                <ModalBody>Xóa hạng đề tài này?</ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={this.xoaHangDeTai}>
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
    hangdetai: storeState.hangdetai.hang_de_tai
});

const mapDispatchToProps = { getHangDeTai, deleteHangDeTai };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(XoaHangDeTai);
