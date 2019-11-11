import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Label, Table, Row, Badge } from 'reactstrap';
import {
    getSortState,
    IPaginationBaseState
} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AvForm, AvGroup, AvField } from 'availity-reactstrap-validation';
import { APP_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { getDanhSachTinhThanh, getDanhSachCoQuanBanHanh, getDanhSachDonVi, printDSCDT, reset } from './thongke.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IThongKeCDTProps extends StateProps, DispatchProps, RouteComponentProps<{}> {}

export interface IVanBanState extends IPaginationBaseState {
    ma_tinh_thanh: string;
    ma_don_vi: string;
    nam_kh: string;
    ds_nam: any;
}

export class DanhSachThongKeCDT extends React.Component<IThongKeCDTProps, IVanBanState, HTMLElement> {
    state: IVanBanState = {
        ...getSortState(this.props.location, ITEMS_PER_PAGE),
        ma_tinh_thanh: '',
        ma_don_vi: '',
        nam_kh: '2019',
        ds_nam: []
    };
    componentWillUnmount(): void {
        this.props.reset();
    }

    componentDidMount() {
        this.props.getDanhSachTinhThanh();
        const year = new Date().getFullYear();
        const val = [];
        for (let i = year - 5; i <= year + 5; i++) {
            val.push(i);
        }
        this.setState({ ds_nam: val });
    }
    handleSelectTinhThanh = (event: React.FormEvent<HTMLSelectElement>) => {
        const element = event.target as HTMLSelectElement;
        this.setState({ ma_tinh_thanh: element.value });
        if (this.state.ma_tinh_thanh !== '-1') {
            this.props.getDanhSachDonVi(element.value);
        }
    }
    handleSelectDonVi = (event: React.FormEvent<HTMLSelectElement>) => {
        const element = event.target as HTMLSelectElement;
        this.setState({ ma_don_vi: element.value });
    }
    handleSelectNam = (event: React.FormEvent<HTMLSelectElement>) => {
        const element = event.target as HTMLSelectElement;
        this.setState({ nam_kh: element.value });
    }
    dongHopThoai = event => {
        event.stopPropagation();
        this.props.history.goBack();
    };
    printDanhSachCDT = () => {
        this.props.printDSCDT(this.state.ma_don_vi, this.state.nam_kh);
    }
    render() {
        const { ds_tinh_thanh, ds_don_vi, loading } = this.props;
        return (
            <Modal isOpen toggle={this.dongHopThoai}>
                <ModalHeader toggle={this.dongHopThoai}>Chọn thông tin chỉ đạo tuyến cần thống kê</ModalHeader>
                <ModalBody>
                    <AvForm>
                        <AvGroup>
                            <div style={ { clear: 'both' } }>
                                <span style={ { float: 'left', fontSize: 'x-large', fontWeight: 'bold' }} className="d-none d-md-inline">Tỉnh thành</span>
                                <AvField style={ { width: '70%', float: 'right', fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                         type="select"
                                         className="form-control"
                                         name="tapTin"
                                         onChange={this.handleSelectTinhThanh}
                                >
                                    <option>--Chọn tỉnh thành</option>
                                    {
                                        ds_tinh_thanh.map((ele, i) => (
                                            <option value={ele.maTinhThanh}>{ele.tenTinhThanh}</option>
                                        ))
                                    }
                                </AvField>
                            </div>
                        </AvGroup>
                        <div style={ { clear: 'both' } }/>
                        <br />
                        <AvGroup>
                            <div style={ { clear: 'both' } }>
                                <span style={ { float: 'left', fontSize: 'x-large', fontWeight: 'bold' }} className="d-none d-md-inline">Đơn vị</span>
                                <AvField style={ { width: '70%', float: 'right', fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                         type="select"
                                         className="form-control"
                                         name="tapTin"
                                         onChange={this.handleSelectDonVi}
                                >
                                    <option>--Chọn đơn vị</option>
                                    {
                                        ds_don_vi.map((ele, i) => (
                                            <option value={ele.maDonVi}>{ele.tenDonVi}</option>
                                        ))
                                    }
                                </AvField>
                            </div>
                        </AvGroup>
                        <div style={ { clear: 'both' } }/>
                        <br />
                        <AvGroup>
                            <div style={ { clear: 'both' } }>
                                <span style={ { float: 'left', fontSize: 'x-large', fontWeight: 'bold' }} className="d-none d-md-inline">Năm</span>
                                <AvField style={ { width: '70%', float: 'right', fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                         type="select"
                                         className="form-control"
                                         name="tapTin"
                                         onChange={this.handleSelectNam}
                                >
                                    <option>--Chọn năm</option>
                                    {
                                        this.state.ds_nam.map((ele, i) => (
                                            <option value={ele}>{ele}</option>
                                        ))
                                    }
                                </AvField>
                            </div>
                        </AvGroup>
                    </AvForm>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.dongHopThoai}>
                        <FontAwesomeIcon icon="arrow-left" />
                        &nbsp; Đóng
                    </Button>
                    &nbsp;
                    <Button disabled={loading} color="primary" onClick={this.printDanhSachCDT}>
                        { !loading ? (<span>
                            <FontAwesomeIcon icon="eye" />
                                &nbsp;
                                In bảng
                            </span>
                        ) : (
                            <span>
                            <FontAwesomeIcon icon="sync" />
                                &nbsp;
                                Đang tạo
                            </span>
                        )}
                        {/*{ loading && <i className="fa fa-refresh fa-spin" />}*/}
                        {/*<FontAwesomeIcon icon="save" />*/}
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = (storeState: IRootState) => ({
    ds_tinh_thanh: storeState.thongke.ds_tinh_thanh,
    ds_don_vi: storeState.thongke.ds_don_vi,
    loading: storeState.thongke.loading,
    totalItems: storeState.thongke.totalItems
});

const mapDispatchToProps = { getDanhSachTinhThanh, getDanhSachCoQuanBanHanh, getDanhSachDonVi, printDSCDT, reset };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DanhSachThongKeCDT);
