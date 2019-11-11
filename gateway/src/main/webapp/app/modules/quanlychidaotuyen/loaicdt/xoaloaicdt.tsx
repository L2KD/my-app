import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { layLoaiCDT, xoaLoaiCDT } from './loaicdt.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IXoaLoaiCDTProps extends StateProps, DispatchProps, RouteComponentProps<{ loaicdt: string }> {}

export class XoaLoaiCDTScript extends React.Component<IXoaLoaiCDTProps> {
    componentDidMount() {
        this.props.layLoaiCDT(this.props.match.params.loaicdt);
    }

    xoaLoaiCDT = event => {
        this.props.xoaLoaiCDT(this.props.loaicdt.ma_loai_cdt);
        this.dongHopThoai(event);
    };

    dongHopThoai = event => {
        event.stopPropagation();
        this.props.history.goBack();
    };

    render() {
        const { loaicdt } = this.props;
        return (
            <Modal isOpen toggle={this.dongHopThoai}>
                <ModalHeader toggle={this.dongHopThoai}>Xác nhận xóa nội dung chỉ đạo tuyến</ModalHeader>
                <ModalBody>Xóa nội dung chỉ đạo tuyến này?</ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={this.xoaLoaiCDT}>
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
    loaicdt: storeState.loaicdt.loai_cdt
});

const mapDispatchToProps = { layLoaiCDT, xoaLoaiCDT };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(XoaLoaiCDTScript);
