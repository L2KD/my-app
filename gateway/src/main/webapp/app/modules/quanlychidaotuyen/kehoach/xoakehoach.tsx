import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getKeHoach, xoaKeHoachVaTraVeDanhSach } from './kehoach.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IXoaKeHoachProps extends StateProps, DispatchProps, RouteComponentProps<{ kehoach: string }> {}

export class XoaKeHoachScript extends React.Component<IXoaKeHoachProps> {
    componentDidMount() {
        this.props.getKeHoach(this.props.match.params.kehoach);
    }

    xoaKeHoach = event => {
        this.props.xoaKeHoachVaTraVeDanhSach(this.props.kehoach.maKeHoach, this.props.kehoach.donVi, this.props.kehoach.ngayBanHanh.toString().substring(0, 4));
        this.dongHopThoai(event);
    };

    dongHopThoai = event => {
        event.stopPropagation();
        this.props.history.push(`${this.props.location.pathname}`);
        this.props.history.goBack();
    };

    render() {
        const { kehoach } = this.props;
        return (
            <Modal isOpen toggle={this.dongHopThoai}>
                <ModalHeader toggle={this.dongHopThoai}>Xác nhận xóa kế hoạch chỉ đạo tuyến</ModalHeader>
                <ModalBody>Xóa kế hoạch chỉ đạo tuyến này?</ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={this.xoaKeHoach}>
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
    kehoach: storeState.kehoach.ke_hoach
});

const mapDispatchToProps = { getKeHoach, xoaKeHoachVaTraVeDanhSach };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(XoaKeHoachScript);
