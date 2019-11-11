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
import { getTaiKhoan, checkLogin } from './taikhoan.reducer';
import { IRootState } from 'app/shared/reducers';
import { ITaiKhoan, defaultTaiKhoan } from 'app/modules/taikhoan/taikhoan.model';
export interface IThongKeDeTaiDangKyProps extends StateProps, DispatchProps, RouteComponentProps<{}> {}

export interface IDeTaiState extends IPaginationBaseState {
    tai_khoan_temp: ITaiKhoan;
    tai_khoan: string;
    mat_khau: string;
    isChecked: boolean;
    isTrue: boolean;
}

export class FrmDangNhap extends React.Component<IThongKeDeTaiDangKyProps, IDeTaiState, HTMLElement> {
    state: IDeTaiState = {
        ...getSortState(this.props.location, ITEMS_PER_PAGE),
        tai_khoan_temp: defaultTaiKhoan,
        tai_khoan: '',
        mat_khau: '',
        isChecked: false,
        isTrue: false
    };
    componentDidMount(): void {
        document.getElementById('taiKhoan').focus();
    }

    componentWillReceiveProps(nextProps: Readonly<IThongKeDeTaiDangKyProps>, nextContext: any): void {
        this.setState({ isTrue: nextProps.isTrue });
        // if (nextProps.tai_khoan.maNhanVien !== null && nextProps.tai_khoan.maNhanVien !== undefined) {
        //     localStorage.setItem('ma_nhan_vien', nextProps.tai_khoan.maNhanVien.toString());
        // }
        // localStorage.setItem('mat_khau', nextProps.tai_khoan.matKhau);
        // localStorage.setItem('phan_quyen', nextProps.tai_khoan.phanQuyen);
        // localStorage.setItem('ten_nhan_vien', nextProps.tai_khoan.tenNhanVien);
    }

    dongHopThoai = event => {
        event.stopPropagation();
        this.props.history.goBack();
    };
    onChangeTaiKhoan = e => {
        this.setState({ tai_khoan: e.target.value });
    };
    /*onKeyPressTaiKhoan = e => {
        if (e.charCode === 13) {
            this.props.getTaiKhoan(this.state.tai_khoan);
        }
    }*/
    onChangeMatKhau = e => {
        this.setState({ mat_khau: e.target.value });
    };
    onKeyPressMatKhau = e => {
        if (e.charCode === 13) {
            this.onCheckTaiKhoan();
        }
    }
    onCheckTaiKhoan = () => {
        this.props.checkLogin(this.state.tai_khoan, this.state.mat_khau);
        setTimeout(() => {
            if (this.state.isTrue) {
                localStorage.setItem('tai_khoan', this.state.tai_khoan);
            alert('Đăng nhập thành công');
            this.props.history.push('/');
            } else {
                alert('Đăng nhập thất bại');
            }
            }, 1500);
    }
    // onLogin = (event, tk, mk) => {
    //     if (tk === this.state.tai_khoan_temp.taiKhoan && mk === this.state.tai_khoan_temp.matKhau) {
    //         this.setState({ isChecked: true, isTrue: true });
    //         this.props.setTaiKhoan(this.props.tai_khoan);
    //         alert('Đăng nhập thành công');
    //         event.stopPropagation();
    //         this.props.history.goBack();
    //     }
    // }
    render() {
        const { tai_khoan, loading } = this.props;
        return (
            <Modal isOpen toggle={this.dongHopThoai}>
                <ModalHeader toggle={this.dongHopThoai}>Đăng nhập</ModalHeader>
                <ModalBody>
                    <AvForm>
                        <AvGroup>
                            <Label>Tài khoản</Label>
                            <AvField id="taiKhoan" placeholder="Nhập tên tài khoản" name="taiKhoan" onChange={this.onChangeTaiKhoan}/>
                        </AvGroup>
                        <AvGroup>
                            <Label>Mật khẩu</Label>
                            <AvField placeholder="Nhập mật khẩu" type="password" name="matKhau" onChange={this.onChangeMatKhau} onKeyPress={this.onKeyPressMatKhau}/>
                        </AvGroup>
                        <div style={ { textAlign: 'center' } }>
                            <Button color="info" onClick={this.onCheckTaiKhoan}>
                                <span>Đăng nhập</span>
                            </Button>
                        </div>
                    </AvForm>
                </ModalBody>
                <ModalFooter />
            </Modal>
        );
    }
}

const mapStateToProps = (storeState: IRootState) => ({
    tai_khoan: storeState.taikhoan.tai_khoan,
    isTrue: storeState.taikhoan.isTrue,
    loading: storeState.thongkenckh.loading,
    totalItems: storeState.thongke.totalItems
});

const mapDispatchToProps = { getTaiKhoan, checkLogin };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FrmDangNhap);
