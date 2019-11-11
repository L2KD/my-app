import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Label, Row, Col } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField, AvFeedback, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { layLoaiCDT, themMoiLoaiCDT, capNhatLoaiCDT, reset } from './loaicdt.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IThemMoiLoaiCDTProps extends StateProps, DispatchProps, RouteComponentProps<{ loaicdt: string }> {}

export interface IThemMoiLoaiCDTState {
    isNew: boolean;
}

export class ThemLoaiCDT extends React.Component<IThemMoiLoaiCDTProps, IThemMoiLoaiCDTState> {
    state: IThemMoiLoaiCDTState = {
        isNew: !this.props.match.params || !this.props.match.params.loaicdt
    };

    componentDidMount() {
        if (this.state.isNew) {
            this.props.reset();
        } else {
            this.props.layLoaiCDT(this.props.match.params.loaicdt);
        }
    }

    componentWillUnmount() {
        this.props.reset();
    }

    luuLoaiCDT = (event, values) => {
        if (this.state.isNew) {
            this.props.themMoiLoaiCDT(values);
        } else {
            this.props.capNhatLoaiCDT(values);
        }
        this.troVeDanhSach();
    };

    troVeDanhSach = () => {
        this.props.history.goBack();
    }

    render() {
        const isInvalid = false;
        const { loaicdt, loading, updating } = this.props;
        return (
            <div>
                <Row className="justify-content-center">
                    <Col md="8">
                        {this.state.isNew ? (<h1>Thêm mới loại chỉ đạo tuyến</h1>) : (<h1>Cập nhật loại chỉ đạo tuyến</h1>)}
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md="8">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <AvForm onValidSubmit={this.luuLoaiCDT}>
                                {loaicdt.ma_loai_cdt ? (
                                    <AvGroup>
                                        <Label style = { { fontWeight: '900' } } for="id">Mã loại chỉ đạo tuyến</Label>
                                        <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } } type="text" className="form-control" name="ma_loai_cdt" required readOnly value={loaicdt.ma_loai_cdt} />
                                    </AvGroup>
                                ) : null}
                                <AvGroup>
                                    <Label style = { { fontWeight: '900' } } for="tenloaicdt">Tên loại chỉ đạo tuyến</Label>
                                    <AvField style={ { fontWeight: 'bold', borderColor: '#0066ff', borderRadius: '5px', backgroundColor: 'white' } }
                                        type="text"
                                        className="form-control"
                                        name="ten_loai_cdt"
                                        validate={{
                                            required: {
                                                value: true,
                                                errorMessage: 'Chưa nhập tên loại chỉ đạo tuyến.'
                                            },
                                            minLength: {
                                                value: 1,
                                                errorMessage: 'Chưa nhập tên loại chỉ đạo tuyến.'
                                            },
                                            maxLength: {
                                                value: 100,
                                                errorMessage: 'Tên loại chỉ đạo tuyến không vượt quá 100 kí tự'
                                            }
                                        }}
                                        value={loaicdt.ten_loai_cdt}
                                    />
                                </AvGroup>
                                <Button tag={Link} to="/loai-cdt" replace color="info">
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
    loaicdt: storeState.loaicdt.loai_cdt,
    loading: storeState.loaicdt.loading,
    updating: storeState.loaicdt.updating
});

const mapDispatchToProps = { layLoaiCDT, themMoiLoaiCDT, capNhatLoaiCDT, reset };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ThemLoaiCDT);
