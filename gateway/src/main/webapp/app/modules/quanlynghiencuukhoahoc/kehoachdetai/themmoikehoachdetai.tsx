import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Label, Row, Col } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField, AvFeedback, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getKeHoachDeTai, getDanhSachDonVi, uploadKeHoachDeTai, getDanhSachNamKH, addKeHoachDeTai, updateKeHoachDeTai, reset } from './kehoachdetai.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IThemMoiKeHoachDeTaiProps extends StateProps, DispatchProps, RouteComponentProps<{ kehoachdetai: string,
    tinhthanh: string, donvi: string, nam: string}> {}

export interface IThemMoiKeHoachDeTaiState {
    isNew: boolean;
    tinhthanh: any;
    donvi: any;
    ds_nam: any;
    tap_tin: any;
}

export class ThemKeHoachDeTai extends React.Component<IThemMoiKeHoachDeTaiProps, IThemMoiKeHoachDeTaiState> {
    state: IThemMoiKeHoachDeTaiState = {
        isNew: !this.props.match.params || !this.props.match.params.kehoachdetai,
        tinhthanh: this.props.match.params.tinhthanh,
        donvi: this.props.match.params.donvi,
        ds_nam: [],
        tap_tin: ''
    };

    componentDidMount() {
        const year = new Date().getFullYear();
        const val = [];
        for (let i = year - 5; i <= year + 5; i++) {
            val.push(i);
        }
        this.setState({ ds_nam: val });
        this.props.getDanhSachDonVi(this.state.tinhthanh);
        if (this.state.isNew) {
            this.props.reset();
        } else {
            this.props.getKeHoachDeTai(this.props.match.params.kehoachdetai);
        }
    }
    componentWillReceiveProps(nextProps: Readonly<IThemMoiKeHoachDeTaiProps>, nextContext: any): void {
        this.setState({ tap_tin: nextProps.kehoachdetai.tapTin });
    }

    componentWillUnmount() {
        this.props.reset();
    }

    luuKeHoachDeTai = (event, values) => {
        if (this.state.isNew) {
            this.props.addKeHoachDeTai(values);
        } else {
            this.props.updateKeHoachDeTai(values);
        }
        this.props.history.push(`/quan-ly-nckh/ke-hoach-de-tai/${this.props.match.params.tinhthanh}/${values.donVi}/${values.nam}`);
    }
    uploadFileKeHoachDeTai = e => {
        const data = new FormData();
        const file = e.target.files[0];
        data.append('tap_tin', e.target.files[0]);
        this.setState({ tap_tin: file.name });
        this.props.uploadKeHoachDeTai(data);
    }

    handleOnClickChonTapTin = (event: React.MouseEvent<HTMLElement>) => {
        if (document.getElementById('filekehoach') !== null) {
            document.getElementById('filekehoach').click();
        }
    }

    render() {
        const isInvalid = false;
        const { kehoachdetai, ds_don_vi, loading, updating } = this.props;
        return (
            <div>
                <Row className="justify-content-center">
                    <Col md="8">
                        {this.state.isNew ? (<h1>Thêm mới kế hoạch đề tài</h1>) : (<h1>Cập nhật kế hoạch đề tài</h1>)}
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md="8">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <AvForm onValidSubmit={this.luuKeHoachDeTai}>
                                {
                                    !this.state.isNew ? (
                                        <AvField hidden name="maKeHoachDeTai" value={kehoachdetai.maKeHoachDeTai}/>
                                    ) : null
                                }
                                {
                                    this.state.isNew ? (
                                        <AvGroup>
                                            <Label style = { { fontWeight: 900 } }>Năm <span style={{ color: 'red' }}>*</span></Label>
                                            <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                     type="select"
                                                     name="nam"
                                                     required
                                                     validate={{
                                                         required: {
                                                             value: true,
                                                             errorMessage: 'Chưa chọn năm.'
                                                         }
                                                     }}
                                            >
                                                <option value="">--Chọn năm</option>
                                                {
                                                    this.state.ds_nam.map((ele, i) => (
                                                        <option value={ ele }>
                                                            { ele }
                                                        </option>
                                                    ))
                                                }
                                            </AvField>
                                        </AvGroup>
                                    ) : (
                                        <AvGroup>
                                            <Label style = { { fontWeight: 900 } }>Năm <span style={{ color: 'red' }}>*</span></Label>
                                            <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                     type="select"
                                                     name="nam"
                                                     required value={kehoachdetai.nam}>
                                                {
                                                    this.state.ds_nam.map((ele, i) => (
                                                        <option value={ ele }>
                                                            { ele }
                                                        </option>
                                                    ))
                                                }
                                            </AvField>
                                        </AvGroup>
                                    )
                                }
                                {
                                    this.state.isNew ? (
                                        <AvGroup>
                                            <Label style = { { fontWeight: 900 } }>Đơn vị <span style={{ color: 'red' }}>*</span></Label>
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
                                            <Label style = { { fontWeight: 900 } }>Đơn vị <span style={{ color: 'red' }}>*</span></Label>
                                            <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                     type="select" name="donVi" value={ kehoachdetai.donVi }>
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
                                    <Label style = { { fontWeight: 900 } }>Kế hoạch đề tài <span style={{ color: 'red' }}>*</span></Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                        type="text"
                                        className="form-control"
                                        name="keHoachDeTai"
                                        validate={{
                                            required: {
                                                value: true,
                                                errorMessage: 'Chưa nhập kế hoạch đề tài.'
                                            },
                                            minLength: {
                                                value: 1,
                                                errorMessage: 'Chưa nhập kế hoạch đề tài.'
                                            },
                                            maxLength: {
                                                value: 100,
                                                errorMessage: 'Kế hoạch đề tài không vượt quá 100 kí tự'
                                            }
                                        }}
                                        value={kehoachdetai.keHoachDeTai}
                                    />
                                </AvGroup>
                                <AvGroup>
                                    <Label style = { { fontWeight: 900 } }>Nội dung trích yếu <span style={{ color: 'red' }}>*</span></Label>
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
                                        value={kehoachdetai.noiDungTrichYeu}
                                    />
                                </AvGroup>
                                <AvGroup>
                                    <Label style = { { fontWeight: 900 } }>Chọn tập tin kế hoạch đề tài(Nhấn nút chọn tập tin để chọn tập tin kế hoạch)</Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                             hidden name="filekehoach" id="filekehoach" type="file" onChange={this.uploadFileKeHoachDeTai}/>
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
                                <Button tag={Link}
                                        to={`/quan-ly-nckh/ke-hoach-de-tai/${this.props.match.params.tinhthanh}/${this.props.match.params.donvi}/${this.props.match.params.nam}`}
                                        replace color="info">
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
    kehoachdetai: storeState.kehoachdetai.ke_hoach_de_tai,
    ds_don_vi: storeState.kehoachdetai.ds_don_vi,
    // ds_nam_kh: storeState.kehoachdetai.ds_nam_kh,
    loading: storeState.kehoachdetai.loading,
    updating: storeState.kehoachdetai.updating
});

const mapDispatchToProps = { getKeHoachDeTai, getDanhSachDonVi, uploadKeHoachDeTai, getDanhSachNamKH, addKeHoachDeTai, updateKeHoachDeTai, reset };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ThemKeHoachDeTai);
