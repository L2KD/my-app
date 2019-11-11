import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getDeTaiDangKy, deleteDeTaiDangKy } from './DeTaiDangKy.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IXoaDeTaiDangKyProps extends StateProps, DispatchProps, RouteComponentProps<{ detaidangky: string, donvi: string, nam: string }> {}

export class XoaDeTaiDangKy extends React.Component<IXoaDeTaiDangKyProps> {
    componentDidMount() {
        this.props.getDeTaiDangKy(this.props.match.params.detaidangky);
    }

    xoaDeTaiDangKy = event => {
        this.props.deleteDeTaiDangKy(this.props.detaidangky.maDeTai, this.props.match.params.donvi, this.props.match.params.nam);
        this.dongHopThoai(event);
    };

    dongHopThoai = event => {
        event.stopPropagation();
        this.props.history.push(`${this.props.location.pathname}`);
        this.props.history.goBack();
    };

    render() {
        const { detaidangky } = this.props;
        return (
            <Modal isOpen toggle={this.dongHopThoai}>
                <ModalHeader toggle={this.dongHopThoai}>Xác nhận xóa đề tài</ModalHeader>
                <ModalBody>Xóa đề tài này?</ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={this.xoaDeTaiDangKy}>
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
    detaidangky: storeState.detaidangky.de_tai_dang_ky
});

const mapDispatchToProps = { getDeTaiDangKy, deleteDeTaiDangKy };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(XoaDeTaiDangKy);
