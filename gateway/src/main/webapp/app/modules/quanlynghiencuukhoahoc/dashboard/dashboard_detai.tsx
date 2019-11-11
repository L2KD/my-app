import React, { Component } from 'react';
import { Pie, Bar, Line } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Row, Button } from 'reactstrap';
import { getDanhSachDeTaiAll, getDanhSachTongSoAll } from './dashboard.reducer';
import { IRootState } from 'app/shared/reducers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IDashboardDeTaiDangKy } from 'app/modules/quanlynghiencuukhoahoc/dashboard/dashboard.model';
export interface IDashBoardProps extends StateProps, DispatchProps, RouteComponentProps<{ }> {}
export interface IDashBoardState {
    chartData: {};
    chartData1: {};
}
class DashBoardDeTai extends Component<IDashBoardProps, IDashBoardState> {
    state: IDashBoardState = {
        chartData: {},
        chartData1: {}
    };

    componentDidMount(): void {
        this.props.getDanhSachDeTaiAll();
        this.props.getDanhSachTongSoAll();
    }

    componentWillReceiveProps(nextProps: Readonly<IDashBoardProps>, nextContext: any): void {
        const nam = [];
        const soLuongDeTai = [];
        const soLuongDeTai1 = [];
        const mang: IDashboardDeTaiDangKy[] = [];
            for (let i = new Date().getFullYear() - 4; i <= new Date().getFullYear(); i++) {
                nextProps.ds_de_tai.map((ele, idx) => {
                    if (ele.nam === i) {
                        mang.push({ nam: ele.nam, soLuong: ele.soLuong });
                        // break;
                    } else {
                        mang.push({ nam: i, soLuong: 0 });
                       //  break;
                    }
                });
            }
        // const mang1: IDashboardDeTaiDangKy[] = mang.filter((ele, i) => mang.includes(ele) === );
        const temp = mang.sort((a, b) => (a.soLuong < b.soLuong) ? 1 : ((b.soLuong < a.soLuong) ? -1 : 0));
        const result = Object.values(temp.reduce((r, o) => {
            r[o.nam] = r[o.nam] || { ...o };
            return r;
        }, { }));
        const temp1 = result.sort((a, b) => (a.nam > b.nam) ? 1 : ((b.nam > a.nam) ? -1 : 0));
        let tong = 0;
        temp1.map((ele, i) => {
            nam.push(ele.nam);
            soLuongDeTai.push(ele.soLuong);
            tong = tong + ele.soLuong;
        });
        this.setState({
            chartData: {
                labels: nam,
                datasets: [
                    {
                        label: 'Số lượng đề tài đã đăng ký',
                        data: soLuongDeTai,
                        backgroundColor: [
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(255, 159, 64, 0.6)',
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(153, 102, 255, 0.6)'
                        ]
                    }
                ]
            }
        });
        temp1.map((ele, i) => {
            soLuongDeTai1.push((ele.soLuong / tong * 100).toFixed(2));
        });
        this.setState({
            chartData1: {
                labels: nam,
                datasets: [
                    {
                        label: 'Số lượng đề tài đã đăng ký',
                        data: soLuongDeTai1,
                        backgroundColor: [
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(255, 159, 64, 0.6)',
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(153, 102, 255, 0.6)'
                        ]
                    }
                ]
            }
        });
    }

    render() {
        const { tong_so } = this.props;
        return (
            <div>
                <div style={ { display: 'flex' } }>
                    <div style={ { width: '50%', borderRight: 'solid 1px red', paddingRight: '2px' } }>
                        <Bar data={ this.state.chartData }
                             options={{
                                 title: {
                                     display: true,
                                     text: 'Số lượng đề tài đăng ký trong 5 năm (Đơn vị: Đề tài)',
                                     fontSize: 20
                                 },
                                 scales: {
                                     // xAxes: [{
                                     //     ticks: { display: false },
                                     //     gridLines: {
                                     //         display: false,
                                     //         drawBorder: false
                                     //     }
                                     // }],
                                     // yAxes: [{
                                     //     ticks: { display: false },
                                     //     gridLines: {
                                     //         display: false,
                                     //         drawBorder: false
                                     //     }
                                     // }]
                                 }
                             }}
                        />
                    </div>
                    <div style={ { width: '50%' } }>
                        <Pie data={ this.state.chartData1 }
                             options={{
                                 title: {
                                     display: true,
                                     text: 'Thống kê theo phần trăm đề tài đăng ký (Đơn vị: %)',
                                     fontSize: 20
                                 }
                                 }}
                        />
                    </div>
                </div>
                <hr />
                <div style={ { textAlign: 'center' } }>
                    <Row>
                        <div style={ { width: '100%' } }>
                            <div style={{ width: '100%', textAlign: 'center', fontWeight: 'bold', fontSize: 'x-large' }}>
                                Thống kê tổng số trong năm 2019
                            </div>
                            <div style={{ width: '100%', paddingLeft: '25%', paddingTop: '25px' }}>
                                <Row>
                                    <div style={ { float: 'left', backgroundColor: '#66b3ff', width: '50px', height: '50px' } } />
                                    &nbsp;
                                    <p style={ { paddingTop: '10px', fontWeight: 'bold' } }>Tổng số đề tài đã đăng ký: { tong_so.tongDeTaiDangKy }</p>
                                </Row>
                                <br/>
                                <Row>
                                    <div style={ { float: 'left', backgroundColor: '#005ce6', width: '50px', height: '50px' } } />
                                    &nbsp;
                                    <p style={ { paddingTop: '10px', fontWeight: 'bold' } }>Tổng số đề tài công nhận đề tài năm: { tong_so.tongDeTaiNam }</p>
                                </Row>
                                <br/>
                                <Row>
                                    <div style={ { float: 'left', backgroundColor: '#ff6666', width: '50px', height: '50px' } } />
                                    &nbsp;
                                    <p style={ { paddingTop: '10px', fontWeight: 'bold' } }>Tổng số đề tài được ứng dụng tại các đơn vị: { tong_so.tongDeTaiDonVi }</p>
                                </Row>
                            </div>
                            <div style={ { width: '100%', paddingTop: '50px' } }>
                                <div className="btn-group flex-btn-group-container">
                                    {
                                        localStorage.getItem('phan_quyen') === '4' ?
                                            (
                                                <>
                                                    <Button tag={Link} to="/quan-ly-nckh/de-tai-dang-ky" color="info" size="sm">
                                                        <FontAwesomeIcon icon="heart" /> <span className="d-none d-md-inline">Đề tài đăng ký</span>
                                                    </Button>
                                                    &nbsp;
                                                </>
                                            ) : (
                                                localStorage.getItem('phan_quyen') === '5' ?
                                                    (
                                                        <>
                                                            <Button tag={Link} to="/quan-ly-nckh/de-tai-dang-ky" color="info" size="sm">
                                                                <FontAwesomeIcon icon="heart" /> <span className="d-none d-md-inline">Đề tài đăng ký</span>
                                                            </Button>
                                                            &nbsp;
                                                            <Button tag={Link} to="/quan-ly-nckh/de-tai-nam" color="primary" size="sm">
                                                                <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Đề tài năm</span>
                                                            </Button>
                                                            &nbsp;
                                                            <Button
                                                                tag={Link}
                                                                to="/quan-ly-nckh/xet-duyet-de-tai-ung-dung-cho-don-vi"
                                                                color="danger"
                                                                size="sm"
                                                            >
                                                                <FontAwesomeIcon icon="wrench" /> <span className="d-none d-md-inline">Đề tài ứng dụng đơn vị</span>
                                                            </Button>
                                                        </>
                                                    ) : (
                                                        <>
                                                        </>
                                                    )
                                            )
                                    }
                                </div>
                            </div>
                        </div>
                    </Row>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (storeState: IRootState) => ({
    ds_de_tai: storeState.dashboardDeTai.ds_de_tai,
    tong_so: storeState.dashboardDeTai.tong_so
});

const mapDispatchToProps = { getDanhSachDeTaiAll, getDanhSachTongSoAll };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashBoardDeTai);
