import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Label, Row, Col } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField, AvFeedback, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getCDT, getDanhSachDanhGia, getBienBan, addBienBanCDT, updateBienBanCDT } from './cdt.reducer';
import { IRootState } from 'app/shared/reducers';

export interface ICapNhatBienBanCDTProps extends StateProps, DispatchProps, RouteComponentProps
    <{ cdt: string, tinhthanh: string, donvi: string, nam: string, kehoach: string, loaicdt: string }> {}

export class CapNhatBienBanCDT extends React.Component<ICapNhatBienBanCDTProps> {
    componentDidMount() {
        this.props.getDanhSachDanhGia(this.props.match.params.loaicdt);
        this.props.getCDT(this.props.match.params.cdt);
        this.props.getBienBan(this.props.match.params.cdt);
    }

    capNhatBienBan = (event, values) => {
        if (this.props.cdt.trangThai === 0) {
            this.props.addBienBanCDT(values, this.props.cdt.donVi, this.props.cdt.nam, this.props.cdt.keHoach);
        } else {
            this.props.updateBienBanCDT(values, this.props.cdt.donVi, this.props.cdt.nam, this.props.cdt.keHoach);
        }
        this.props.history.push(`/cdt/${this.props.match.params.tinhthanh}/${this.props.match.params.donvi}/${this.props.match.params.nam}/${this.props.match.params.kehoach}`);
    };

    render() {
        const isInvalid = false;
        const { cdt, bienban, ds_danh_gia } = this.props;
        return (
            <div>
                <Row className="justify-content-center">
                    <h1>Xem thông tin chỉ đạo tuyến</h1>
                </Row>
                {/*<Row className="justify-content-center">*/}
                    {/*<Col md="8">*/}
                        <AvForm onValidSubmit={ this.capNhatBienBan }>
                            {
                                cdt.trangThai === 0 ? (
                                    // Nội dung thêm mới
                                    <Row className="justify-content-center">
                                        <Col>
                                            <AvGroup hidden>
                                                <Label style={ { fontWeight: 900 } }>Mã chỉ đạo tuyến</Label>
                                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                         type="text" name="maCDT" hidden value={ this.props.match.params.cdt }>
                                                    { this.props.match.params.cdt }
                                                </AvField>
                                            </AvGroup>
                                            <AvGroup>
                                                <Label style={ { fontWeight: 900 } }>Đánh giá chỉ đạo tuyến</Label>
                                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                         type="select" name="danhGia">
                                                    <option value="-1">--Chọn đánh giá chỉ đạo tuyến</option>
                                                {
                                                    ds_danh_gia.filter(danhgia => danhgia.trang_thai !== 0).map((ele, i) => (
                                                        <option key={ele.ma_danh_gia} value={ ele.ma_danh_gia }>
                                                            {ele.danh_gia_cdt}
                                                        </option>
                                                    ))}
                                                }
                                                </AvField>
                                            </AvGroup>
                                            <AvGroup>
                                                <Label style={ { fontWeight: 900 } }>Ngày bắt đầu</Label>
                                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                         type="date" className="form-control" name="ngayBatDau" />
                                            </AvGroup>
                                            <AvGroup>
                                                <Label style={ { fontWeight: 900 } }>Ngày kết thúc</Label>
                                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                         type="date" className="form-control" name="ngayKetThuc" />
                                            </AvGroup>
                                            <AvGroup>
                                                <Label style={ { fontWeight: 900 } }>Đơn vị chuyển giao</Label>
                                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                         type="text" className="form-control" name="donViChuyenGiao" readOnly value={ cdt.tenDonVi } />
                                            </AvGroup>
                                            <AvGroup>
                                                <Label style={ { fontWeight: 900 } }>Đơn vị được chuyển giao</Label>
                                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                         type="text" className="form-control" name="donViDuocChuyenGiao" readOnly value={ cdt.tenDonViTiepNhan } />
                                            </AvGroup>
                                            <AvGroup>
                                                <Label style={ { fontWeight: 900 } }>Báo cáo kết quả</Label>
                                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                         type="text" className="form-control" name="baoCaoKetQua" />
                                            </AvGroup>
                                            <AvGroup>
                                                <Label style={ { fontWeight: 900 } }>Thống báo sai sót</Label>
                                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                         type="text" className="form-control" name="thongBaoSaiSot"/>
                                            </AvGroup>
                                            <AvGroup>
                                                <Label style={ { fontWeight: 900 } }>Đề nghị của đoàn chỉ đạo</Label>
                                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                         type="text" className="form-control" name="deNghi"/>
                                            </AvGroup>
                                            <AvGroup>
                                                <Label style={ { fontWeight: 900 } }>Đóng góp công tác chỉ đạo</Label>
                                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                         type="text" className="form-control" name="dongGop"/>
                                            </AvGroup>
                                            <AvGroup>
                                                <Label style={ { fontWeight: 900 } }>Nhu cầu CĐT trong thời gian tới</Label>
                                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                         type="text" className="form-control" name="nhuCau"/>
                                            </AvGroup>
                                        </Col>
                                </Row>
                                ) : (
                                    // Các giá trị cần cập nhật
                                    <Row className="justify-content-center">
                                        <Col>
                                            <AvGroup hidden>
                                                <Label style={ { fontWeight: 900 } }>Mã chỉ đạo tuyến</Label>
                                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                         type="text" name="maCDT" hidden value={ this.props.match.params.cdt }>
                                                    { this.props.match.params.cdt }
                                                </AvField>
                                            </AvGroup>
                                            <AvGroup>
                                                <Label style={ { fontWeight: 900 } }>Đánh giá chỉ đạo tuyến</Label>
                                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                         type="select" name="danhGia" value={ bienban.danhGia }>
                                                    {
                                                        ds_danh_gia.map((ele, i) => (
                                                            <option key={ele.ma_danh_gia} value={ ele.ma_danh_gia }>
                                                                {ele.danh_gia_cdt}
                                                            </option>
                                                        ))}
                                                    }
                                                </AvField>
                                            </AvGroup>
                                            <AvGroup>
                                                <Label style={ { fontWeight: 900 } }>Ngày bắt đầu</Label>
                                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                         type="date" className="form-control" name="ngayBatDau" value={ bienban.ngayBatDau } />
                                            </AvGroup>
                                            <AvGroup>
                                                <Label style={ { fontWeight: 900 } }>Ngày kết thức</Label>
                                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                         type="date" className="form-control" name="ngayKetThuc" value={ bienban.ngayKetThuc } />
                                            </AvGroup>
                                            <AvGroup>
                                                <Label style={ { fontWeight: 900 } }>Đơn vị chuyển giao</Label>
                                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                         type="text" className="form-control" name="donViChuyenGiao" readOnly value={ cdt.tenDonVi } />
                                            </AvGroup>
                                            <AvGroup>
                                                <Label style={ { fontWeight: 900 } }>Đơn vị được chuyển giao</Label>
                                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                         type="text" className="form-control" name="donViDuocChuyenGiao" readOnly value={ cdt.tenDonViTiepNhan } />
                                            </AvGroup>
                                            <AvGroup>
                                                <Label style={ { fontWeight: 900 } }>Báo cáo kết quả</Label>
                                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                         type="text"
                                                         className="form-control"
                                                         name="baoCaoKetQua"
                                                         validate={{
                                                             required: {
                                                                 value: true,
                                                                 errorMessage: 'Chưa nhập báo cáo kết quả.'
                                                             },
                                                             minLength: {
                                                                 value: 1,
                                                                 errorMessage: 'Chưa nhập báo cáo kết quả.'
                                                             }
                                                         }}
                                                         value={ bienban.baoCaoKetQua } />
                                            </AvGroup>
                                            <AvGroup>
                                                <Label style={ { fontWeight: 900 } }>Thống báo sai sót</Label>
                                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                         type="text" className="form-control" name="thongBaoSaiSot" value={ bienban.thongBaoSaiSot } />
                                            </AvGroup>
                                            <AvGroup>
                                                <Label style={ { fontWeight: 900 } }>Đề nghị của đoàn chỉ đạo</Label>
                                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                         type="text" className="form-control" name="deNghi" value={ bienban.deNghi } />
                                            </AvGroup>
                                            <AvGroup>
                                                <Label style={ { fontWeight: 900 } }>Đóng góp công tác chỉ đạo</Label>
                                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                         type="text" className="form-control" name="dongGop" value={ bienban.dongGop } />
                                            </AvGroup>
                                            <AvGroup>
                                                <Label style={ { fontWeight: 900 } }>Nhu cầu CĐT trong thời gian tới</Label>
                                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                         type="text" className="form-control" name="nhuCau" value={ bienban.nhuCau } />
                                            </AvGroup>
                                        </Col>
                                    </Row>
                                )
                            }
                            <Button tag={Link}
                                    to={`/cdt/${this.props.match.params.tinhthanh}/${this.props.match.params.donvi}/${this.props.match.params.nam}/${this.props.match.params.kehoach}`}
                                    replace color="info">
                                <FontAwesomeIcon icon="arrow-left" />
                                &nbsp;
                                <span className="d-none d-md-inline">Trở về</span>
                            </Button>
                            &nbsp;
                            <Button color="primary" type="submit" disabled={isInvalid}>
                                <FontAwesomeIcon icon="save" />
                                &nbsp; Lưu
                            </Button>
                        </AvForm>
                    {/*</Col>*/}
                {/*</Row>*/}
            </div>
        );
    }
}

const mapStateToProps = (storeState: IRootState) => ({
    bienban: storeState.cdt.bienban,
    cdt: storeState.cdt.cdt,
    ds_danh_gia: storeState.cdt.ds_danh_gia
});

const mapDispatchToProps = { getCDT, getDanhSachDanhGia, getBienBan, addBienBanCDT, updateBienBanCDT };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CapNhatBienBanCDT);
