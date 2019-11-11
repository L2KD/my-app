import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Label, Row, Col } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField, AvFeedback, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getDanhSachDonVi, uploadKeHoach, getMaxMa, getKeHoach, getDanhSachVanBanTheoKeHoach, addKeHoach, addKeHoach_1, updateKeHoach_1, reset } from './kehoach.reducer';
import { getDanhSachVanBan } from 'app/modules/quanlychidaotuyen/vanban/vanban.reducer';
import { IRootState } from 'app/shared/reducers';
import { IVanBan } from 'app/modules/quanlychidaotuyen/vanban/vanban.model';

export interface IThemMoiKeHoachProps extends StateProps, DispatchProps, RouteComponentProps<{ kehoach: string,
    donvi: string, tinhthanh: string, nam: string }> {}

export interface IThemMoiKeHoachState {
    isNew: boolean;
    tap_tin: any;
    vb: any;
    ds_vb_ct: IVanBan[];
    ds_vb_chon: any;
    max_ma_ke_hoach: any;
    tinh_thanh: any;
    don_vi: any;
    nam: any;
}

export class ThemKeHoach extends React.Component<IThemMoiKeHoachProps, IThemMoiKeHoachState> {
    state: IThemMoiKeHoachState = {
        isNew: !this.props.match.params || !this.props.match.params.kehoach,
        tap_tin: '',
        vb: '',
        ds_vb_ct: [],
        ds_vb_chon: [],
        max_ma_ke_hoach: '',
        don_vi: this.props.match.params.donvi,
        tinh_thanh: this.props.match.params.tinhthanh,
        nam: this.props.match.params.nam
    };

    componentDidMount() {
        this.props.getMaxMa(1);
        this.props.getDanhSachDonVi(this.props.match.params.tinhthanh);
        this.props.getDanhSachVanBan(this.props.match.params.donvi, this.props.match.params.nam);
        if (this.state.isNew) {
            this.props.reset();
        } else {
            this.props.getDanhSachVanBanTheoKeHoach(this.props.match.params.kehoach);
            this.props.getKeHoach(this.props.match.params.kehoach);
        }
    }

    componentWillReceiveProps(nextProps: Readonly<IThemMoiKeHoachProps>, nextContext: any): void {
        this.setState({ ds_vb_ct: nextProps.ds_vb_ct.concat(), tap_tin: nextProps.kehoach.tapTin });
    }

    componentWillUnmount() {
        this.props.reset();
    }

    hadleMultiSelect = e => {
        const options = e.target.options;
        const value = [] as IVanBan[];
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push({ maVanBan: options[i].value, noiDungTrichYeu: options[i].text });
            }
        }
        this.setState({ ds_vb_ct: value });
    }
    uploadTapTinKeHoach = e => {
        const data = new FormData();
        const file = e.target.files[0];
        data.append('tap_tin', e.target.files[0]);
        this.setState({ tap_tin: file.name });
        this.props.uploadKeHoach(data);
    }

    luuKH = (event, values) => {
        if (this.state.isNew) {
            this.props.addKeHoach_1(values, this.props.maxma + 1, this.state.ds_vb_ct);
            // this.state.vb.map((ele, i) => {
            //     this.props.addChiTietKeHoach(this.props.maxma + 1, ele);
            // });
        } else {
            this.props.updateKeHoach_1(values, this.state.ds_vb_ct);
        }
        this.troVeDanhSach();
    }

    // luuKeHoach = (event, values) => {
    //     if (this.state.isNew) {
    //         this.props.addKeHoach(values);
    //     } else {
    //         this.props.updateKeHoach_1(values);
    //     }
    //     this.troVeDanhSach();
    // };

    handleOnClickChonTapTin = (event: React.MouseEvent<HTMLElement>) => {
        if (document.getElementById('filekehoach') !== null) {
            document.getElementById('filekehoach').click();
        }
    }
    troVeDanhSach = () => {
        this.props.history.push(`/ke-hoach/${this.props.match.params.tinhthanh}/${this.props.match.params.donvi}/${this.props.match.params.nam}`);
        // this.props.history.goBack();
    }

    render() {
        const isInvalid = false;
        const { ds_don_vi, ds_vb_ct, ds_vb, kehoach, loading, updating } = this.props;
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
                            <AvForm onValidSubmit={ this.luuKH }>
                                {kehoach.maKeHoach ? (
                                    <AvGroup>
                                        <Label style={ { fontWeight: 900 } }>Mã kế hoạch</Label>
                                        <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } } type="text" className="form-control" name="maKeHoach" required readOnly value={kehoach.maKeHoach} />
                                    </AvGroup>
                                ) : null}
                                {
                                    this.state.isNew ? (
                                        <AvGroup>
                                            <label style={ { fontWeight: 900 } }>Đơn vị <span style={{ color: 'red' }}>*</span></label>
                                            <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                     type="select"
                                                     name="donVi"
                                                     required
                                                     validate={{
                                                         required: {
                                                             value: true,
                                                             errorMessage: 'Chưa chọn đơn vị.'
                                                         }
                                                     }}
                                            >
                                                <option value="-1">--Chọn đơn vị</option>
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
                                            <label style={ { fontWeight: 900 } }>Đơn vị <span style={{ color: 'red' }}>*</span></label>
                                            <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } } type="select" name="donVi" value={ kehoach.donVi }>
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
                                    <label style={ { fontWeight: 900 } }>Căn cứ các văn bản</label>
                                        <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                 readOnly name="ds_vb_ct_field" value={this.state.ds_vb_ct.map((ele, i) => (ele.noiDungTrichYeu))}/>
                                        <AvField style={ { width: '100%', fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                 type="select" name="ds_vb_field" multiple onChange={this.hadleMultiSelect}>
                                            {
                                                ds_vb.map((ele, i) => (
                                                    <option key={ele.maVanBan} value={ ele.maVanBan }>{ ele.noiDungTrichYeu }</option>
                                                ))
                                            }
                                        </AvField>
                                    </AvGroup>
                                <AvGroup>
                                    <Label style={ { fontWeight: 900 } }>Nội dung trích yếu <span style={{ color: 'red' }}>*</span></Label>
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
                                                     errorMessage: 'Chưa nhập nội dung trích yếu.'
                                                 }
                                             }}
                                        value={kehoach.noiDungTrichYeu}
                                    />
                                </AvGroup>
                                <AvGroup>
                                    <Label style={ { fontWeight: 900 } }>Ngày ban hành <span style={{ color: 'red' }}>*</span></Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                        type="date"
                                        className="form-control"
                                        name="ngayBanHanh"
                                             required
                                             validate={{
                                                 required: {
                                                     value: true,
                                                     errorMessage: 'Chưa nhập ngày ban hành.'
                                                 }
                                             }}
                                        value={kehoach.ngayBanHanh}
                                    />
                                </AvGroup>
                                <AvGroup>
                                    <Label style={ { fontWeight: 900 } }>Chọn tập tin kế hoạch chỉ đạo tuyến(Nhấn nút chọn tập tin để chọn tập tin kế hoạch)</Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                             hidden name="filekehoach" id="filekehoach" type="file" onChange={this.uploadTapTinKeHoach}/>
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
                                <Button tag={Link} to={`/ke-hoach/${this.props.match.params.tinhthanh}/${this.props.match.params.donvi}/${this.props.match.params.nam}`} replace color="info">
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
    maxma: storeState.kehoach.max_ma,
    kehoach: storeState.kehoach.ke_hoach,
    ds_don_vi: storeState.kehoach.ds_don_vi,
    ds_vb: storeState.vanban.ds_van_ban,
    ds_vb_ct: storeState.kehoach.ds_vb_ct,
    loading: storeState.kehoach.loading,
    updating: storeState.kehoach.updating
});

const mapDispatchToProps = { getDanhSachVanBan, getMaxMa, getDanhSachDonVi, getDanhSachVanBanTheoKeHoach, uploadKeHoach, getKeHoach, addKeHoach, addKeHoach_1, updateKeHoach_1,
    reset };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ThemKeHoach);
