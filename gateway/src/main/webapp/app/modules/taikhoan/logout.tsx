import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
export class Logout extends React.Component<RouteComponentProps> {
    componentDidMount(): void {
        localStorage.clear();
        // window.location.reload();
    }

    showForm = () => {
        localStorage.clear();
        window.location.reload();
        setTimeout(() => {
            return (
                <div className="p-5">
                    <h4>Đăng xuất thành công!</h4>
                </div>);
        }, 1000);
        this.props.history.push('/');
    }

    render() {
        return (
            this.showForm
        );
    }
}
export default Logout;
