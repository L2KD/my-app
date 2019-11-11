import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Label, Row, Col } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField, AvFeedback, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { layLoaiCDTDanhGia, layDanhSachLoaiCDTDanhGia, layDanhGia, themMoiDanhGia, capNhatDanhGia, reset } from './danhgia.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IThemMoiDanhGiaProps extends StateProps, DispatchProps, RouteComponentProps<{ danhgia: string, loaicdt: string }> {}

export interface IThemMoiDanhGiaState {
    isNew: boolean;
}

export class ThemDanhGia extends React.Component<IThemMoiDanhGiaProps, IThemMoiDanhGiaState> {
    state: IThemMoiDanhGiaState = {
        isNew: !this.props.match.params || !this.props.match.params.danhgia
    };

    componentDidMount() {
        this.props.layLoaiCDTDanhGia(this.props.match.params.loaicdt);
        if (this.state.isNew) {
            this.props.reset();
        } else {
            this.props.layDanhSachLoaiCDTDanhGia();
            this.props.layDanhGia(this.props.match.params.danhgia);
        }
    }

    componentWillUnmount() {
        this.props.reset();
    }

    luuDanhGia = (event, values) => {
        if (this.state.isNew) {
            this.props.themMoiDanhGia(values);
        } else {
            this.props.capNhatDanhGia(values);
        }
        this.props.history.push(`/danh-gia/${this.props.match.params.loaicdt}`);
    };
    render() {
        const isInvalid = false;
        const { loaicdt, ds_loai_cdt, danhgia, loading, updating } = this.props;
        return (
            <div>
                <Row className="justify-content-center">
                    <Col md="8">
                        {this.state.isNew ? (<h1>Thêm mới đánh giá kết quả chỉ đạo tuyến</h1>) : (<h1>Cập nhật đánh giá</h1>)}
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md="8">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <AvForm onValidSubmit={this.luuDanhGia}>
                                {danhgia.ma_danh_gia ? (
                                    <AvGroup>
                                        <Label style = { { fontWeight: '900' } } for="id">Mã đánh giá</Label>
                                        <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                 type="text" className="form-control" name="ma_danh_gia" required readOnly value={danhgia.ma_danh_gia} />
                                    </AvGroup>
                                ) : null}
                                <AvGroup>
                                    <Label style = { { fontWeight: '900' } } for="danhgiacdt">Đánh giá kết quả đạo tuyến</Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                        type="text"
                                        className="form-control"
                                        name="danh_gia_cdt"
                                        value={danhgia.danh_gia_cdt}
                                    />
                                </AvGroup>
                                {
                                    this.state.isNew ? (
                                        <AvGroup>
                                            <AvGroup hidden>
                                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                    type="number"
                                                    className="form-control"
                                                    name="loai_cdt"
                                                    value={loaicdt.ma_loai_cdt}
                                                />
                                            </AvGroup>
                                            <AvGroup>
                                                <Label style = { { fontWeight: '900' } } for="loaicdt">Loại chỉ đạo tuyến</Label>
                                                <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                    type="text"
                                                    className="form-control"
                                                    name="loaicdt"
                                                    value={loaicdt.ten_loai_cdt}
                                                />
                                            </AvGroup>
                                        </AvGroup>
                                    ) : (
                                        <AvGroup>
                                            <label>Loại chỉ đạo tuyến</label>
                                            <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } } type="select" name="loai_cdt" value={ danhgia.loai_cdt }>
                                                {
                                                    ds_loai_cdt.map((ele, i) => (
                                                        <option key={ele.ma_loai_cdt} value={ ele.ma_loai_cdt }>
                                                            {ele.ten_loai_cdt}
                                                        </option>
                                                    ))}
                                                }
                                            </AvField>
                                        </AvGroup>
                                    )
                                }
                                <AvGroup>
                                    <Label style = { { fontWeight: '900' } } for="vi_tri">Vị trí</Label>
                                    <AvField min={1} style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                        type="number"
                                        className="form-control"
                                        name="vi_tri"
                                        validate={{
                                            required: {
                                                value: true,
                                                errorMessage: 'Chưa nhập vị trí đánh giá.'
                                            }
                                        }}
                                        value={danhgia.vi_tri}
                                    />
                                </AvGroup>
                                {
                                    this.state.isNew ? (
                                        <AvGroup>
                                            <Label style = { { fontWeight: '900' } }>Trạng thái</Label>
                                            <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                     type="select" name="trang_thai" value="1">
                                                <option value="1">Hoạt động</option>
                                                <option value="0">Không hoạt động</option>
                                            </AvField>
                                        </AvGroup>
                                    ) : (
                                        <AvGroup>
                                            <label>Trạng thái</label>
                                            <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                                     type="select" name="trang_thai" value={ danhgia.trang_thai + ''}>
                                                <option value="1">Hoạt động</option>
                                                <option value="0">Không hoạt động</option>
                                            </AvField>
                                        </AvGroup>
                                    )
                                }

                                <Button tag={Link} to={`/danh-gia/${this.props.match.params.loaicdt}`} replace color="info">
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
    danhgia: storeState.danhgia.danh_gia,
    loaicdt: storeState.danhgia.loai_cdt,
    ds_loai_cdt: storeState.danhgia.ds_loai_cdt,
    loading: storeState.danhgia.loading,
    updating: storeState.danhgia.updating
});

const mapDispatchToProps = { layLoaiCDTDanhGia, layDanhSachLoaiCDTDanhGia, layDanhGia, themMoiDanhGia, capNhatDanhGia, reset };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ThemDanhGia);
