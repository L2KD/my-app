import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Label, Row, Col } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField, AvFeedback, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getCDT, getDanhSachCDT_NoiDung, getDanhSachCDT_DoiTuong, getDanhSachCDT_CaNhan_PhuTrach,
    getDanhSachCDT_CaNhan_TiepNhan, getDanhSachNhanVien, downloadCDT } from './cdt.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IXemCDTProps extends StateProps, DispatchProps, RouteComponentProps<{ cdt: string,
    donvi: string, tinhthanh: string, nam: string, kehoach: string, khoaphong: string,
    donvitiepnhan: string }> {}

export class XemCDT extends React.Component<IXemCDTProps> {
    componentDidMount() {
        this.props.getCDT(this.props.match.params.cdt);
        this.props.getDanhSachCDT_NoiDung(this.props.match.params.cdt);
        this.props.getDanhSachCDT_DoiTuong(this.props.match.params.cdt);
        this.props.getDanhSachNhanVien(this.props.match.params.khoaphong);
        this.props.getDanhSachCDT_CaNhan_PhuTrach(this.props.match.params.cdt);
        this.props.getDanhSachCDT_CaNhan_TiepNhan(this.props.match.params.cdt);
    }

    handleClickDownload = taptin => () => {
        this.props.downloadCDT(taptin);
    }
    troVeDanhSach = () => {
        this.props.history.goBack();
    }

    render() {
        const isInvalid = false;
        const { ds_cdt_noidung, ds_cdt_doituong, ds_cdt_canhan_phutrach, ds_cdt_canhan_tiepnhan, cdt, ds_nv } = this.props;
        return (
            <div>
                <Row className="justify-content-center">
                        <h1>Xem thông tin chỉ đạo tuyến</h1>
                </Row>
                <Row className="justify-content-center">
                    <Col md="8">
                            <AvForm>
                                {/*<AvGroup>*/}
                                    {/*<Label style={ { fontWeight: 900 } }>Mã chỉ đạo tuyến</Label>*/}
                                    {/*<AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }*/}
                                             {/*type="text" className="form-control" name="maCDT" readOnly value={ cdt.maCDT } />*/}
                                {/*</AvGroup>*/}
                                <AvGroup>
                                    <Label style={ { fontWeight: 900 } }>Năm</Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                             type="text" className="form-control" name="namCDT" readOnly value={ cdt.nam } />
                                </AvGroup>
                                <AvGroup>
                                    <Label style={ { fontWeight: 900 } }>Ngày thực hiện</Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                             type="text" className="form-control" name="ngayThucHien" readOnly value={ cdt.ngayThucHien } />
                                </AvGroup>
                                <AvGroup>
                                    <Label style={ { fontWeight: 900 } }>Đơn vị chỉ đạo tuyến</Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                             type="text" className="form-control" name="donVi" readOnly value={ cdt.tenDonVi } />
                                </AvGroup>
                                <AvGroup>
                                    <Label style={ { fontWeight: 900 } }>Kế hoạch chỉ đạo tuyến</Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                             type="text" className="form-control" name="keHoach" readOnly value={ cdt.noiDungTrichYeu } />
                                </AvGroup>
                                <AvGroup>
                                    <Label style={ { fontWeight: 900 } }>Hình thức chỉ đạo tuyến</Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                             type="text" className="form-control" name="hinhThuc" readOnly value={ cdt.noiDungTrichYeu } />
                                </AvGroup>
                                <AvGroup>
                                    <Label style={ { fontWeight: 900 } }>Loại chỉ đạo tuyến</Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                             type="text" className="form-control" name="loaiCDT" readOnly value={ cdt.tenLoaiCDT } />
                                </AvGroup>
                                <AvGroup>
                                    <Label style={ { fontWeight: 900 } }>Nội dung chỉ đạo tuyến</Label>
                                    <AvField disabled style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                             type="select" name="noiDungCDT" multiple readOnly>
                                        {
                                            ds_cdt_noidung.map((ele, i) => (
                                                <option key={ele.maNoiDung} value={ ele.maNoiDung }>{ ele.noiDung }</option>
                                            ))
                                        }
                                    </AvField>
                                </AvGroup>
                                <AvGroup>
                                    <Label style={ { fontWeight: 900 } }>Khoa phòng</Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                             type="text" className="form-control" name="khoaPhong" readOnly value={ cdt.tenKhoaPhong } />
                                </AvGroup>
                                <AvGroup>
                                    <Label style={ { fontWeight: 900 } }>Cá nhân phụ trách</Label>
                                    <AvField disabled style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                             type="select" name="caNhanPhuTrach" multiple readOnly>
                                        {
                                            ds_cdt_canhan_phutrach.map((ele, i) => (
                                                <option key={ele.maNhanVien} value={ ele.maNhanVien }>{ ele.tenNhanVien }</option>
                                            ))
                                        }
                                    </AvField>
                                </AvGroup>
                                <AvGroup>
                                    <Label style={ { fontWeight: 900 } }>Trưởng đoàn</Label>
                                    <AvField disabled style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                             type="select" name="truongDoan" value={ cdt.truongDoan }>
                                        {
                                            ds_nv.map((ele, i) => (
                                                <option key={ele.maNhanVien} value={ ele.maNhanVien }>{ ele.tenNhanVien }</option>
                                            ))
                                        }
                                    </AvField>
                                </AvGroup>
                                <AvGroup>
                                    <Label readOnly style={ { fontWeight: 900 } }>Thư ký</Label>
                                    <AvField disabled readOnly style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                             type="select" name="truongDoan" value={ cdt.thuKi }>
                                        {
                                            ds_nv.map((ele, i) => (
                                                <option key={ele.maNhanVien} value={ ele.maNhanVien }>{ ele.tenNhanVien }</option>
                                            ))
                                        }
                                    </AvField>
                                </AvGroup>
                                <AvGroup>
                                    <Label style={ { fontWeight: 900 } }>Đơn vị tiếp nhận chỉ đạo tuyến</Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                             type="text" className="form-control" name="donViTiepNhan" readOnly value={ cdt.tenDonViTiepNhan } />
                                </AvGroup>
                                <AvGroup>
                                    <Label style={ { fontWeight: 900 } }>Đối tượng tiếp nhận</Label>
                                    <AvField disabled style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                             type="select" name="doiTuongTiepNhan" multiple readOnly>
                                        {
                                            ds_cdt_doituong.map((ele, i) => (
                                                <option style={ { fontWeight: 'bold' } } key={ele.maDoiTuong} value={ ele.maDoiTuong }>{ ele.tenDoiTuong }</option>
                                            ))
                                        }
                                    </AvField>
                                </AvGroup>
                                <AvGroup>
                                    <Label style={ { fontWeight: 900 } }>Số người tiếp nhận</Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                             type="number" className="form-control" name="soNguoiTiepNhan" readOnly value={ cdt.soNguoiTiepNhan } />
                                </AvGroup>
                                <AvGroup>
                                    <Label style={ { fontWeight: 900 } }>Cá nhân tiếp nhận</Label>
                                    <AvField disabled style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                             type="select" name="caNhanTiepNhan" multiple readOnly>
                                        {
                                            ds_cdt_canhan_tiepnhan.map((ele, i) => (
                                                <option style={ { fontWeight: 'bold' } } key={ele.maNhanVien} value={ ele.maNhanVien }>{ ele.tenNhanVien }</option>
                                            ))
                                        }
                                    </AvField>
                                </AvGroup>
                                <AvGroup>
                                    <Label style={ { fontWeight: 900 } }>Người đại diện</Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                             type="text" className="form-control" name="nguoiDaiDien" readOnly value={ cdt.tenNguoiDaiDien } />
                                </AvGroup>
                                <AvGroup>
                                    <Label style={ { fontWeight: 900 } }>Tập tin</Label>
                                    <Row>
                                        <Col>
                                            <AvField style={ { width: '100%', fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                     readOnly
                                                     type="text"
                                                     className="form-control"
                                                     name="tapTin"
                                                     value={cdt.tapTin}
                                            />
                                        </Col>
                                        <Col>
                                            <Button style={ { color: 'white', backgroundColor: '#0066ff', borderStyle: 'none' } }
                                                    onClick={ this.handleClickDownload(cdt.tapTin) }>
                                                <span className="d-none d-md-inline">Tải xuống</span>
                                            </Button>
                                        </Col>
                                    </Row>
                                </AvGroup>
                                {
                                    cdt.trangThai === 1 ? (
                                        <AvGroup>
                                            <Label style={ { fontWeight: 900 } }>Trạng thái</Label>
                                            <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white', color: 'Blue' } }
                                                     type="text" className="form-control" name="tapTin" readOnly value="Đã cập nhật biên bản" />
                                        </AvGroup>
                                    ) : (
                                        <AvGroup>
                                            <Label style={ { fontWeight: 900 } }>Trạng thái</Label>
                                            <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white', color: 'Green' } }
                                                     type="text" className="form-control" name="tapTin" readOnly value="Mới" />
                                        </AvGroup>
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
                            </AvForm>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (storeState: IRootState) => ({
    cdt: storeState.cdt.cdt,
    ds_nv: storeState.cdt.ds_nhan_vien,
    ds_cdt_noidung: storeState.cdt.ds_cdt_noidung,
    ds_cdt_doituong: storeState.cdt.ds_cdt_doituong,
    ds_cdt_canhan_phutrach: storeState.cdt.ds_cdt_canhan_phutrach,
    ds_cdt_canhan_tiepnhan: storeState.cdt.ds_cdt_canhan_tiepnhan
});

const mapDispatchToProps = { getCDT, getDanhSachCDT_NoiDung, getDanhSachCDT_DoiTuong, getDanhSachCDT_CaNhan_PhuTrach,
    getDanhSachCDT_CaNhan_TiepNhan, getDanhSachNhanVien, downloadCDT };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(XemCDT);
