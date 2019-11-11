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
import { getDanhSachTinhThanh, getDanhSachDonVi, printDSDeTaiUngDungChoDonVi, reset } from './thongkenckh.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IThongKeDeTaiUngDungChoDonViProps extends StateProps, DispatchProps, RouteComponentProps<{}> {}

export interface IDeTaiState extends IPaginationBaseState {
    ma_tinh_thanh: string;
    ma_don_vi: string;
    nam_kh: string;
    ds_nam: any;
}

export class DanhSachThongKeDeTaiUngDungChoDonVi extends React.Component<IThongKeDeTaiUngDungChoDonViProps, IDeTaiState, HTMLElement> {
    state: IDeTaiState = {
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
    printDanhSachDeTaiUngDungDonVi = () => {
        this.props.printDSDeTaiUngDungChoDonVi(this.state.ma_don_vi, this.state.nam_kh);
    }
    render() {
        const { ds_tinh_thanh, ds_don_vi, loading } = this.props;
        return (
            <Modal isOpen toggle={this.dongHopThoai}>
                <ModalHeader toggle={this.dongHopThoai}>Chọn thông tin kế hoạch cần thống kê</ModalHeader>
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
                                <span style={ { float: 'left', fontSize: 'x-large', fontWeight: 'bold' }} className="d-none d-md-inline">Cơ quan</span>
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
                    <Button disabled={loading} color="primary" onClick={this.printDanhSachDeTaiUngDungDonVi}>
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
    ds_tinh_thanh: storeState.thongkenckh.ds_tinh_thanh,
    ds_don_vi: storeState.thongkenckh.ds_don_vi,
    loading: storeState.thongkenckh.loading,
    totalItems: storeState.thongkenckh.totalItems
});

const mapDispatchToProps = { getDanhSachTinhThanh, getDanhSachDonVi, printDSDeTaiUngDungChoDonVi, reset };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DanhSachThongKeDeTaiUngDungChoDonVi);
