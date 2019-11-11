import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getLoaiDeTai, deleteLoaiDeTai } from './LoaiDeTai.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IXoaLoaiDeTaiProps extends StateProps, DispatchProps, RouteComponentProps<{ loaidetai: string }> {}

export class XoaLoaiDeTai extends React.Component<IXoaLoaiDeTaiProps> {
    componentDidMount() {
        this.props.getLoaiDeTai(this.props.match.params.loaidetai);
    }

    xoaLoaiDeTai = event => {
        this.props.deleteLoaiDeTai(this.props.loaidetai.maLoaiDeTai);
        this.dongHopThoai(event);
    };

    dongHopThoai = event => {
        event.stopPropagation();
        this.props.history.goBack();
    };

    render() {
        const { loaidetai } = this.props;
        return (
            <Modal isOpen toggle={this.dongHopThoai}>
                <ModalHeader toggle={this.dongHopThoai}>Xác nhận xóa loại đề tài</ModalHeader>
                <ModalBody>Xóa loại đề tài này?</ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={this.xoaLoaiDeTai}>
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
    loaidetai: storeState.loaidetai.loai_de_tai
});

const mapDispatchToProps = { getLoaiDeTai, deleteLoaiDeTai };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(XoaLoaiDeTai);
