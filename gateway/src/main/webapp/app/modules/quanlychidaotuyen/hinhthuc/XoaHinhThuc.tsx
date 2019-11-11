import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { layHinhThuc, xoaHinhThuc } from './HinhThuc.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IXoaHinhThucProps extends StateProps, DispatchProps, RouteComponentProps<{ hinhthuc: string }> {}

export class XoaHinhThucScript extends React.Component<IXoaHinhThucProps> {
    componentDidMount() {
        this.props.layHinhThuc(this.props.match.params.hinhthuc);
    }

    xoaHinhThuc = event => {
        this.props.xoaHinhThuc(this.props.hinhthuc.ma_hinh_thuc);
        this.dongHopThoai(event);
    };

    dongHopThoai = event => {
        event.stopPropagation();
        this.props.history.goBack();
    };

    render() {
        const { hinhthuc } = this.props;
        return (
            <Modal isOpen toggle={this.dongHopThoai}>
                <ModalHeader toggle={this.dongHopThoai}>Xác nhận xóa hình thức chỉ đạo tuyến</ModalHeader>
                <ModalBody>Xóa hình thức chỉ đạo tuyến này?</ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={this.xoaHinhThuc}>
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
    hinhthuc: storeState.hinhthuc.hinh_thuc
});

const mapDispatchToProps = { layHinhThuc, xoaHinhThuc };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(XoaHinhThucScript);
