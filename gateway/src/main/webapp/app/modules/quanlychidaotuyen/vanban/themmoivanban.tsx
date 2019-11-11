import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Label, Row, Col } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField, AvFeedback, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getDanhSachDonVi, getVanBan, addVanBan, updateVanBan, getDanhSachCoQuanBanHanh, reset } from './vanban.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IThemMoiVanBanProps extends StateProps, DispatchProps, RouteComponentProps<{
    vanban: string, tinhthanh: string, donvi: string, nam: string }> {}

export interface IThemMoiVanBanState {
    isNew: boolean;
    tap_tin: any;
}

export class ThemVanBan extends React.Component<IThemMoiVanBanProps, IThemMoiVanBanState> {
    state: IThemMoiVanBanState = {
        isNew: !this.props.match.params || !this.props.match.params.vanban,
        tap_tin: ''
    };

    componentDidMount() {
        this.props.getDanhSachDonVi(this.props.match.params.tinhthanh);
        this.props.getDanhSachCoQuanBanHanh();
        if (this.state.isNew) {
            this.props.reset();
        } else {
            this.props.getVanBan(this.props.match.params.vanban);
        }
    }

    componentWillUnmount() {
        this.props.reset();
    }

    onChange(e) {
        this.setState({ tap_tin: e.target.files[0] });
    }
    luuVanBan = (event, values) => {
        if (this.state.isNew) {
            // values.append('tap_tin', this.state.tap_tin);
            this.props.addVanBan(values);
        } else {
            this.props.updateVanBan(values);
        }
        this.props.history.push(`/van-ban/${this.props.match.params.tinhthanh}/${this.props.match.params.donvi}/${this.props.match.params.nam}`);
    };

    render() {
        const isInvalid = false;
        const { ds_co_quan, ds_don_vi, vanban, loading, updating } = this.props;
        return (
            <div>
                <Row className="justify-content-center">
                    <Col md="8">
                        {this.state.isNew ? (<h1>Thêm mới văn bản chỉ đạo tuyến</h1>) : (<h1>Cập nhật văn bản</h1>)}
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md="8">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <AvForm onValidSubmit={this.luuVanBan}>
                                {vanban.maVanBan ? (
                                    <AvGroup>
                                        <Label for="id">Mã văn bản</Label>
                                        <AvField type="text" className="form-control" name="maVanBan" required readOnly value={vanban.maVanBan} />
                                    </AvGroup>
                                ) : null}
                                {
                                    this.state.isNew ? (
                                        <AvGroup>
                                            <label>Đơn vị</label>
                                            <AvField type="select" name="donVi" required>
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
                                            <label>Đơn vị</label>
                                            <AvField type="select" name="donVi" value={ vanban.donVi }>
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
                                {
                                    this.state.isNew ? (
                                        <AvGroup>
                                            <label>Cơ quan ban hành</label>
                                            <AvField type="select" name="coQuanBanHanh" required>
                                                {
                                                    ds_co_quan.map((ele, i) => (
                                                        <option key={ele.maCoQuanBanHanh} value={ ele.maCoQuanBanHanh }>
                                                            {ele.tenCoQuan}
                                                        </option>
                                                    ))}
                                                }
                                            </AvField>
                                        </AvGroup>
                                    ) : (
                                        <AvGroup>
                                            <label>Cơ quan ban hành</label>
                                            <AvField type="select" name="coQuanBanHanh" value={ vanban.coQuanBanHanh }>
                                                {
                                                    ds_co_quan.map((ele, i) => (
                                                        <option key={ele.maCoQuanBanHanh} value={ ele.maCoQuanBanHanh }>
                                                            {ele.tenCoQuan}
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
                                        validate={{
                                            required: {
                                                value: true,
                                                errorMessage: 'Chưa nhập nội dung trích yếu.'
                                            },
                                            minLength: {
                                                value: 1,
                                                errorMessage: 'Chưa nhập nội dung trích yếu.'
                                            }
                                        }}
                                        value={vanban.noiDungTrichYeu}
                                    />
                                </AvGroup>
                                <AvGroup>
                                    <Label for="ngaybanhanh">Ngày ban hành</Label>
                                    <AvField
                                        type="date"
                                        className="form-control"
                                        name="ngayBanHanh"
                                        value={vanban.ngayBanHanh}
                                    />
                                </AvGroup>
                                <AvGroup>
                                    <Label for="socongvan">Số công văn</Label>
                                    <AvField
                                        type="text"
                                        className="form-control"
                                        name="soCongVan"
                                        validate={{
                                            required: {
                                                value: true,
                                                errorMessage: 'Chưa nhập số công văn.'
                                            },
                                            minLength: {
                                                value: 2,
                                                errorMessage: 'Số công văn ít nhất 2 kí tự.'
                                            },
                                            maxLength: {
                                                value: 100,
                                                errorMessage: 'Số công văn không quá 30 kí tự'
                                            }
                                        }}
                                        value={vanban.soCongVan}
                                    />
                                </AvGroup>
                                <AvGroup>
                                    <Label for="socongvan">Tập tin</Label>
                                    <AvField
                                        // onChange = { this.onChange }
                                        type="text"
                                        className="form-control"
                                        name="tapTin"
                                        value={vanban.tapTin}
                                    />
                                </AvGroup>
                                {
                                    this.state.isNew ? (
                                        <AvGroup>
                                            <label>Trạng thái</label>
                                            <AvField type="select" name="trangThai" value="1">
                                                <option value="1">Hoạt động</option>
                                                <option value="0">Không hoạt động</option>
                                            </AvField>
                                        </AvGroup>
                                    ) : (
                                        <AvGroup>
                                            <label>Trạng thái</label>
                                            <AvField type="select" name="trangThai" value={ vanban.trangThai }>
                                                <option value="1">Hoạt động</option>
                                                <option value="0">Không hoạt động</option>
                                            </AvField>
                                        </AvGroup>
                                    )
                                }
                                <Button tag={Link} to={`/van-ban/${this.props.match.params.tinhthanh}/${this.props.match.params.donvi}/${this.props.match.params.nam}`} replace color="info">
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
    vanban: storeState.vanban.van_ban,
    ds_co_quan: storeState.vanban.ds_co_quan,
    ds_don_vi: storeState.vanban.ds_don_vi,
    loading: storeState.vanban.loading,
    updating: storeState.vanban.updating
});

const mapDispatchToProps = { getDanhSachDonVi, getVanBan, addVanBan, updateVanBan, getDanhSachCoQuanBanHanh, reset };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ThemVanBan);
