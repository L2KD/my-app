import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Label, Row, Col } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField, AvFeedback, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getDanhSachDonVi, uploadVanBan, getVanBan, addVanBan, updateVanBan, getDanhSachCoQuanBanHanh, reset } from './vanban.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IThemMoiVanBanProps extends StateProps, DispatchProps, RouteComponentProps<{
    vanban: string, tinhthanh: string, donvi: string, nam: string }> {}

export interface IThemMoiVanBanState {
    isNew: boolean;
    tap_tin: any;
}

export class ThemMoiVB extends React.Component<IThemMoiVanBanProps, IThemMoiVanBanState> {
    state: IThemMoiVanBanState = {
        isNew: !this.props.match.params || !this.props.match.params.vanban,
        tap_tin: ''
    };

    componentDidMount() {
        // this.props.uploadVanBan(this.state.tap_tin);
        this.props.getDanhSachDonVi(this.props.match.params.tinhthanh);
        this.props.getDanhSachCoQuanBanHanh();
        if (this.state.isNew) {
            this.props.reset();
        } else {
            this.props.getVanBan(this.props.match.params.vanban);
        }
    }
    componentWillReceiveProps(nextProps: Readonly<IThemMoiVanBanProps>, nextContext: any): void {
        this.setState({ tap_tin: nextProps.vanban.tapTin });
    }

    componentWillUnmount() {
        this.props.reset();
    }

    uploadTapTinVanBan = e => {
        const data = new FormData();
        const file = e.target.files[0];
        data.append('tap_tin', e.target.files[0]);
        this.setState({ tap_tin: file.name });
        this.props.uploadVanBan(data);
    }
    handleOnClickChonTapTin = (event: React.MouseEvent<HTMLElement>) => {
        if (document.getElementById('filevb') !== null) {
            document.getElementById('filevb').click();
        }
    }
    luuVanBan = (event, values) => {
        // values.append('tapTin', this.state.tap_tin);
        // console.log(this.state.tap_tin);
        if (this.state.isNew) {
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
                                        <Label style={ { fontWeight: 900 } } for="id">Mã văn bản</Label>
                                        <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } } type="text"
                                                 className="form-control" name="maVanBan" required readOnly value={vanban.maVanBan} />
                                    </AvGroup>
                                ) : null}
                                {
                                    this.state.isNew ? (
                                        <AvGroup>
                                            <Label style={ { fontWeight: 900 } }>Đơn vị <span style={{ color: 'red' }}>*</span></Label>
                                            <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                     type="select"
                                                     name="donVi"
                                                     required
                                                     validate={{
                                                         required: {
                                                             value: true,
                                                             errorMessage: 'Chưa chọn đơn vị'
                                                         }
                                                     }}
                                            >
                                                <option value="">--Chọn đơn vị</option>
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
                                            <Label style={ { fontWeight: 900 } }>Đơn vị <span style={{ color: 'red' }}>*</span></Label>
                                            <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                     type="select" name="donVi" value={ vanban.donVi }>
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
                                            <label style={ { fontWeight: 900 } }>Cơ quan ban hành <span style={{ color: 'red' }}>*</span></label>
                                            <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                     type="select"
                                                     name="coQuanBanHanh"
                                                     required
                                                     validate={{
                                                         required: {
                                                             value: true,
                                                             errorMessage: 'Chưa chọn cơ quan ban hành'
                                                         }
                                                     }}
                                            >
                                                <option value="">--Chọn cơ quan ban hành</option>
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
                                            <label style={ { fontWeight: 900 } }>Cơ quan ban hành <span style={{ color: 'red' }}>*</span></label>
                                            <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                     type="select" name="coQuanBanHanh" value={ vanban.coQuanBanHanh }>
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
                                    <Label style={ { fontWeight: 900 } } for="noidung">Nội dung trích yếu <span style={{ color: 'red' }}>*</span></Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
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
                                                     errorMessage: 'Chưa nhập nội dung trích yếu'
                                                 }
                                             }}
                                        value={vanban.noiDungTrichYeu}
                                    />
                                </AvGroup>
                                <AvGroup>
                                    <Label style={ { fontWeight: 900 } } for="ngaybanhanh">Ngày ban hành <span style={{ color: 'red' }}>*</span></Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                        type="date"
                                        className="form-control"
                                        name="ngayBanHanh"
                                        value={vanban.ngayBanHanh}
                                             required
                                             validate={{
                                                 required: {
                                                     value: true,
                                                     errorMessage: 'Chưa nhập ngày ban hành'
                                                 }
                                             }}
                                    />
                                </AvGroup>
                                <AvGroup>
                                    <Label style={ { fontWeight: 900 } } for="socongvan">Số công văn <span style={{ color: 'red' }}>*</span></Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
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
                                                     value: 30,
                                                     errorMessage: 'Số công văn không quá 30 kí tự'
                                                 }
                                             }}
                                            value={vanban.soCongVan}
                                    />
                                </AvGroup>
                                <AvGroup>
                                    <Label style={ { fontWeight: 900 } }>Chọn tập tin văn bản chỉ đạo tuyến(Nhấn nút chọn tập tin để chọn tập tin văn bản)</Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                             hidden name="filevb" id="filevb" type="file" onChange={this.uploadTapTinVanBan}/>
                                    <Row>
                                        <Col>
                                            <AvField style={ { width: '100%', fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                     readOnly
                                                     type="text"
                                                     className="form-control"
                                                     name="tapTin"
                                                     value={this.state.tap_tin}
                                            />
                                        </Col>
                                        <Col>
                                            <Button style={ { color: 'white', backgroundColor: '#0066ff', borderStyle: 'none' } } onClick={this.handleOnClickChonTapTin}>
                                                <span className="d-none d-md-inline">Chọn tập tin</span>
                                            </Button>
                                        </Col>
                                    </Row>
                                </AvGroup>
                                {
                                    this.state.isNew ? (
                                        <AvGroup>
                                            <Label style={ { fontWeight: 900 } }>Trạng thái <span style={{ color: 'red' }}>*</span></Label>
                                            <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                     type="select" name="trangThai" value="1">
                                                <option value="1">Hoạt động</option>
                                                <option value="0">Không hoạt động</option>
                                            </AvField>
                                        </AvGroup>
                                    ) : (
                                        <AvGroup>
                                            <Label style={ { fontWeight: 900 } }>Trạng thái <span style={{ color: 'red' }}>*</span></Label>
                                            <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                     type="select" name="trangThai" value={ vanban.trangThai + ''}>
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

const mapDispatchToProps = { getDanhSachDonVi, getVanBan, uploadVanBan, addVanBan, updateVanBan, getDanhSachCoQuanBanHanh, reset };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ThemMoiVB);
