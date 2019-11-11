import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Label, Row, Col } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField, AvFeedback, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getDanhSachDonVi, uploadKeHoach, getKeHoach, addKeHoach, updateKeHoach, reset } from './kehoach.reducer';
import { IRootState } from 'src/main/webapp/app/shared/reducers';

export interface IThemMoiKeHoachProps extends StateProps, DispatchProps, RouteComponentProps<{ kehoach: string, ma_tinh_thanh: string }> {}

export interface IThemMoiKeHoachState {
    isNew: boolean;
    tap_tin: any;
}

export class ThemKeHoach extends React.Component<IThemMoiKeHoachProps, IThemMoiKeHoachState> {
    state: IThemMoiKeHoachState = {
        isNew: !this.props.match.params || !this.props.match.params.kehoach,
        tap_tin: ''
    };

    componentDidMount() {
        this.props.getDanhSachDonVi(this.props.match.params.ma_tinh_thanh);
        if (this.state.isNew) {
            this.props.reset();
        } else {
            this.props.getKeHoach(this.props.match.params.kehoach);
        }
    }

    componentWillUnmount() {
        this.props.reset();
    }

    onChange = e => {
        const data = new FormData();
        const file = e.target.files[0];
        data.append('tap_tin', e.target.files[0]);
        this.setState({ tap_tin: file.name });
        this.props.uploadKeHoach(data);
    }
    luuKeHoach = (event, values) => {
        if (this.state.isNew) {
            // values.append('tap_tin', this.state.tap_tin);
            this.props.addKeHoach(values);
        } else {
            this.props.updateKeHoach(values);
        }
        this.troVeDanhSach();
    };

    troVeDanhSach = () => {
        this.props.history.goBack();
    }

    render() {
        const isInvalid = false;
        const { ds_don_vi, kehoach, loading, updating } = this.props;
        return (
            <div>
                <Row className="justify-content-center">
                    <Col md="8">
                        {this.state.isNew ? (<h1>Thêm mới kế hoạch chỉ đạo tuyến</h1>) : (<h1>Cập nhật kế hoạch</h1>)}
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md="8">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <AvForm onValidSubmit={this.luuKeHoach}>
                                {kehoach.maKeHoach ? (
                                    <AvGroup>
                                        <Label for="id">Mã kế hoạch</Label>
                                        <AvField type="text" className="form-control" name="maKeHoach" required readOnly value={kehoach.maKeHoach} />
                                    </AvGroup>
                                ) : null}
                                {
                                    this.state.isNew ? (
                                        <AvGroup>
                                            <label>Đơn vị <span style={{ color: 'red' }}>*</span></label>
                                            <AvField type="select"
                                                     name="donVi"
                                                     required
                                                     validate={{
                                                         required: {
                                                             value: true,
                                                             errorMessage: 'Chưa chọn đơn vị.'
                                                         }
                                                     }}
                                            >
                                                {
                                                    ds_don_vi.map((ele, i) => (
                                                        <option key={ele.maDonVi} value={ ele.maDonVi }>
                                                            {ele.tenDonVi}
                                                        </option>
                                                    ))}
                                                }
                                            </AvField>
                                        </AvGroup>
                                    ) : (
                                        <AvGroup>
                                            <label>Đơn vị <span style={{ color: 'red' }}>*</span></label>
                                            <AvField type="select" name="donVi" value={ kehoach.donVi }>
                                                {
                                                    ds_don_vi.map((ele, i) => (
                                                        <option key={ele.maDonVi} value={ ele.maDonVi }>
                                                            {ele.tenDonVi}
                                                        </option>
                                                    ))}
                                                }
                                            </AvField>
                                        </AvGroup>
                                    )
                                }
                                <AvGroup>
                                    <Label for="noidung">Nội dung trích yếu</Label>
                                    <AvField
                                        type="text"
                                        className="form-control"
                                        name="noiDungTrichYeu"
                                        value={kehoach.noiDungTrichYeu}
                                    />
                                </AvGroup>
                                <AvGroup>
                                    <Label for="ngaybanhanh">Ngày ban hành</Label>
                                    <AvField
                                        type="date"
                                        className="form-control"
                                        name="ngayBanHanh"
                                        value={kehoach.ngayBanHanh}
                                    />
                                </AvGroup>
                                {
                                    this.state.tap_tin === undefined || this.state.tap_tin === null || this.state.tap_tin === '' ?
                                        (
                                            <input type="text" placeholder="Chọn tập tin" readOnly value={kehoach.tapTin}/>
                                        ) : (
                                            <input type="text" placeholder="Chọn tập tin" readOnly value={this.state.tap_tin}/>
                                        )
                                }
                                <input style={ { paddingLeft: '10px' } } type="file" onChange={this.onChange}/>
                                <AvGroup>
                                    <AvField
                                        hidden
                                        type="text"
                                        className="form-control"
                                        name="tapTin"
                                        value={this.state.tap_tin}
                                    />
                                </AvGroup>

                                <Button tag={Link} to="/ke-hoach" replace color="info">
                                    <FontAwesomeIcon icon="arrow-left" />
                                    &nbsp;
                                    <span className="d-none d-md-inline">Trở về</span>
                                </Button>
                                &nbsp;
                                <Button color="primary" type="submit" disabled={isInvalid || updating}>
                                    <FontAwesomeIcon icon="save" />
                                    &nbsp; Lưu
                                </Button>
                            </AvForm>
                        )}
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (storeState: IRootState) => ({
    kehoach: storeState.kehoach.ke_hoach,
    ds_don_vi: storeState.kehoach.ds_don_vi,
    loading: storeState.kehoach.loading,
    updating: storeState.kehoach.updating
});

const mapDispatchToProps = { getDanhSachDonVi, uploadKeHoach, getKeHoach, addKeHoach, updateKeHoach, reset };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ThemKeHoach);
