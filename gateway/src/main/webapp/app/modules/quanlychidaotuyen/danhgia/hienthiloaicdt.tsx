import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table, Row, Badge } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField, AvFeedback, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { layDanhSachLoaiCDTDanhGia } from './danhgia.reducer';
import { IRootState } from 'app/shared/reducers';
interface IHienThiDanhSachLoaiCDTDanhGiaProps extends StateProps, DispatchProps, RouteComponentProps<{}> {}

export class Hienthiloaicdt extends Component<IHienThiDanhSachLoaiCDTDanhGiaProps> {

    componentDidMount() {
        this.props.layDanhSachLoaiCDTDanhGia();
    }
    render() {
        const { ds_loai_cdt } = this.props;
        return (<div style={{ float: 'right' }}>
            <label>Loại chỉ đạo tuyến</label>
            <select style={{ width: 300 }}>
                {
                    ds_loai_cdt.map((loaicdt, i) => (
                    <option value={loaicdt.ma_loai_cdt}>{loaicdt.ten_loai_cdt}</option>
                ))}
            </select>
        </div>);
    }
}

const mapStateToProps = (storeState: IRootState) => ({
    ds_loai_cdt: storeState.danhgia.ds_loai_cdt
});

const mapDispatchToProps = { layDanhSachLoaiCDTDanhGia };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Hienthiloaicdt);
