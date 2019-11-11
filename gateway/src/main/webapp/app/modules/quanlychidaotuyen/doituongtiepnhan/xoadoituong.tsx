import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { layDoiTuong, xoaDoiTuong } from './doituong.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IXoaDoiTuongProps extends StateProps, DispatchProps, RouteComponentProps<{ doituong: string }> {}

export class XoaDoiTuongScript extends React.Component<IXoaDoiTuongProps> {
    componentDidMount() {
        this.props.layDoiTuong(this.props.match.params.doituong);
    }

    xoaDoiTuong = event => {
        this.props.xoaDoiTuong(this.props.doituong.maDoiTuong);
        this.dongHopThoai(event);
    };

    dongHopThoai = event => {
        event.stopPropagation();
        this.props.history.goBack();
    };

    render() {
        const { doituong } = this.props;
        return (
            <Modal isOpen toggle={this.dongHopThoai}>
                <ModalHeader toggle={this.dongHopThoai}>Xác nhận xóa đối tượng tiếp nhận chỉ đạo tuyến chỉ đạo tuyến</ModalHeader>
                <ModalBody>Xóa đối tượng tiếp nhận chỉ đạo tuyến chỉ đạo tuyến này?</ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={this.xoaDoiTuong}>
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
    doituong: storeState.doituong.doi_tuong
});

const mapDispatchToProps = { layDoiTuong, xoaDoiTuong };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(XoaDoiTuongScript);
