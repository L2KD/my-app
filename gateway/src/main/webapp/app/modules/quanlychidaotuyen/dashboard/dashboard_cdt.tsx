import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Row, Button } from 'reactstrap';
import { getDanhSachCDTAll, getDanhSachTongSoAll } from './dashboard.reducer';
import { IRootState } from 'app/shared/reducers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export interface IDashBoardProps extends StateProps, DispatchProps, RouteComponentProps<{ }> {}
export interface IDashBoardState {
    chartData: {};
}
class DashBoardCDT extends Component<IDashBoardProps, IDashBoardState> {
    state: IDashBoardState = {
        chartData: {}
    };
    componentDidMount(): void {
        this.props.getDanhSachCDTAll();
        this.props.getDanhSachTongSoAll();
    }

    componentWillReceiveProps(nextProps: Readonly<IDashBoardProps>, nextContext: any): void {
        const tenDonVi = [];
        const soLuongCDT = [];
        nextProps.ds_cdt.map((ele, i) => {
            tenDonVi.push(ele.tenDonVi);
            soLuongCDT.push(ele.soLuongCDT);
        });
        this.setState({
            chartData: {
                labels: tenDonVi,
                datasets: [
                    {
                        label: 'Chỉ đạo tuyến theo đơn vị trong năm hiện tại',
                        data: soLuongCDT,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(153, 102, 255, 0.6)',
                            'rgba(255, 159, 64, 0.6)',
                            'rgba(255, 99, 132, 0.6)'
                        ]
                    }
                ]
            }
        });
    }

    render() {
        const { tong_so } = this.props;
        return (
            <div style={ { display: 'flex' } }>
                <div style={ { width: '70%', borderRight: 'solid 1px red' } }>
                    <Pie data={ this.state.chartData }
                         options={{
                             title: {
                                 display: true,
                                 text: 'Biểu đồ Thống kê số lượng chỉ đạo tuyến theo đơn vị (Đơn vị: Chỉ đạo tuyến)',
                                 fontSize: 20
                             }
                         }}
                    />
                </div>
                <div style={ { width: '30%', paddingLeft: '3%' } }>
                    <div style={{ width: '100%', textAlign: 'center', fontWeight: 'bold', fontSize: 'x-large' }}>
                         Thống kê tổng số trong năm 2019
                    </div>
                    <div style={{ width: '100%', paddingTop: '5px' }}>
                        <Row>
                            <div style={ { float: 'left', backgroundColor: '#66b3ff', width: '50px', height: '50px' } } />
                            &nbsp;
                            <p style={ { paddingTop: '10px', fontWeight: 'bold' } }>Tổng số văn bản chỉ đạo tuyến: { tong_so.tongSoVanBan }</p>
                        </Row>
                        <br/>
                        <Row>
                            <div style={ { float: 'left', backgroundColor: '#005ce6', width: '50px', height: '50px' } } />
                            &nbsp;
                            <p style={ { paddingTop: '10px', fontWeight: 'bold' } }>Tổng số kế hoạch chỉ đạo tuyến: { tong_so.tongSoKeHoach }</p>
                        </Row>
                        <br/>
                        <Row>
                            <div style={ { float: 'left', backgroundColor: '#ff6666', width: '50px', height: '50px' } } />
                            &nbsp;
                            <p style={ { paddingTop: '10px', fontWeight: 'bold' } }>Tổng số chỉ đạo tuyến: { tong_so.tongSoCDT }</p>
                        </Row>
                    </div>
                    <div style={ { width: '100%', paddingTop: '50px' } }>
                        <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to="/van-ban" color="info" size="sm">
                                <FontAwesomeIcon icon="heart" /> <span className="d-none d-md-inline">Văn bản</span>
                            </Button>
                            &nbsp;
                            <Button tag={Link} to="/ke-hoach" color="primary" size="sm">
                                <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Kế hoạch</span>
                            </Button>
                            &nbsp;
                            <Button
                                tag={Link}
                                to="/cdt"
                                color="danger"
                                size="sm"
                            >
                                <FontAwesomeIcon icon="wrench" /> <span className="d-none d-md-inline">Chỉ đạo tuyến</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (storeState: IRootState) => ({
    ds_cdt: storeState.dashboard.ds_cdt,
    tong_so: storeState.dashboard.tong_so
});

const mapDispatchToProps = { getDanhSachCDTAll, getDanhSachTongSoAll };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashBoardCDT);
