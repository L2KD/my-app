import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getKeHoachDeTai, deleteKeHoachDeTai } from './KeHoachDeTai.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IXoaKeHoachDeTaiProps extends StateProps, DispatchProps, RouteComponentProps<{
    kehoachdetai: string, donvi: string, nam: string }> {}

export class XoaKeHoachDeTai extends React.Component<IXoaKeHoachDeTaiProps> {
    componentDidMount() {
        this.props.getKeHoachDeTai(this.props.match.params.kehoachdetai);
    }

    xoaKeHoachDeTai = event => {
        this.props.deleteKeHoachDeTai(this.props.kehoachdetai.maKeHoachDeTai, this.props.match.params.donvi, this.props.match.params.nam);
        this.dongHopThoai(event);
    };

    dongHopThoai = event => {
        event.stopPropagation();
        this.props.history.goBack();
    };

    render() {
        const { kehoachdetai } = this.props;
        return (
            <Modal isOpen toggle={this.dongHopThoai}>
                <ModalHeader toggle={this.dongHopThoai}>Xác nhận xóa kế hoạch đề tài</ModalHeader>
                <ModalBody>Xóa kế hoạch đề tài này?</ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={this.xoaKeHoachDeTai}>
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
    kehoachdetai: storeState.kehoachdetai.ke_hoach_de_tai
});

const mapDispatchToProps = { getKeHoachDeTai, deleteKeHoachDeTai };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(XoaKeHoachDeTai);
