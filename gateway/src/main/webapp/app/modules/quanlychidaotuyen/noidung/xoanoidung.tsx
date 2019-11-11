import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { layNoiDung, xoaNoiDung } from './noidung.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IXoaNoiDungProps extends StateProps, DispatchProps, RouteComponentProps<{ noidung: string }> {}

export class XoaNoiDungScript extends React.Component<IXoaNoiDungProps> {
    componentDidMount() {
        this.props.layNoiDung(this.props.match.params.noidung);
    }

    xoaNoiDung = event => {
        this.props.xoaNoiDung(this.props.noidung.maNoiDung);
        this.dongHopThoai(event);
    };

    dongHopThoai = event => {
        event.stopPropagation();
        this.props.history.goBack();
    };

    render() {
        const { noidung } = this.props;
        return (
            <Modal isOpen toggle={this.dongHopThoai}>
                <ModalHeader toggle={this.dongHopThoai}>Xác nhận xóa nội dung chỉ đạo tuyến</ModalHeader>
                <ModalBody>Xóa nội dung chỉ đạo tuyến này?</ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={this.xoaNoiDung}>
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
    noidung: storeState.noidung.noi_dung
});

const mapDispatchToProps = { layNoiDung, xoaNoiDung };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(XoaNoiDungScript);
