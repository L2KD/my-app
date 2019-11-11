import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getNhomDeTai, deleteNhomDeTai } from './nhomdetai.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IXoaNhomDeTaiProps extends StateProps, DispatchProps, RouteComponentProps<{ nhomdetai: string }> {}

export class Xoanhomdetai extends React.Component<IXoaNhomDeTaiProps> {
    componentDidMount() {
        this.props.getNhomDeTai(this.props.match.params.nhomdetai);
    }

    xoaNhomDeTai = event => {
        this.props.deleteNhomDeTai(this.props.nhomdetai.maNhomDeTai);
        this.dongHopThoai(event);
    };

    dongHopThoai = event => {
        event.stopPropagation();
        this.props.history.goBack();
    };

    render() {
        const { nhomdetai } = this.props;
        return (
            <Modal isOpen toggle={this.dongHopThoai}>
                <ModalHeader toggle={this.dongHopThoai}>Xác nhận xóa nhóm đề tài</ModalHeader>
                <ModalBody>Xóa nhóm đề tài này?</ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={this.xoaNhomDeTai}>
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
    nhomdetai: storeState.nhomdetai.nhom_de_tai
});

const mapDispatchToProps = { getNhomDeTai, deleteNhomDeTai };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Xoanhomdetai);
