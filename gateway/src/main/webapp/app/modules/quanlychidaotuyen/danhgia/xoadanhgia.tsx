import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { layDanhGia, xoaDanhGiaVaTraVeDanhSach } from './danhgia.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IXoaDanhGiaProps extends StateProps, DispatchProps, RouteComponentProps<{ danhgia: string }> {}

export class XoaDanhGiaScript extends React.Component<IXoaDanhGiaProps> {
    componentDidMount() {
        this.props.layDanhGia(this.props.match.params.danhgia);
    }

    xoaDanhGia = event => {
        this.props.xoaDanhGiaVaTraVeDanhSach(this.props.danhgia.ma_danh_gia, this.props.danhgia.loai_cdt);
        this.dongHopThoai(event);
    };

    dongHopThoai = event => {
        event.stopPropagation();
        this.props.history.goBack();
    };

    render() {
        const { danhgia } = this.props;
        return (
            <Modal isOpen toggle={this.dongHopThoai}>
                <ModalHeader toggle={this.dongHopThoai}>Xác nhận xóa đánh giá chỉ đạo tuyến</ModalHeader>
                <ModalBody>Xóa đánh giá chỉ đạo tuyến này?</ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={this.xoaDanhGia}>
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
    danhgia: storeState.danhgia.danh_gia
});

const mapDispatchToProps = { layDanhGia, xoaDanhGiaVaTraVeDanhSach };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(XoaDanhGiaScript);
