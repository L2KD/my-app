import React from 'react';

import { connect } from 'react-redux';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Row, Col, Alert, Button } from 'reactstrap';

import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';
import { IRootState } from 'app/shared/reducers';
import { handleRegister, reset } from './register.reducer';

export type IRegisterProps = DispatchProps;

export interface IRegisterState {
  password: string;
}

export class RegisterPage extends React.Component<IRegisterProps, IRegisterState> {
  state: IRegisterState = {
    password: ''
  };

  componentWillUnmount() {
    this.props.reset();
  }

  handleValidSubmit = (event, values) => {
    this.props.handleRegister(values.username, values.email, values.firstPassword);
    event.preventDefault();
  };

  updatePassword = event => {
    this.setState({ password: event.target.value });
  };

  render() {
    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h1 id="register-title">Đăng ký tài khoản</h1>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            <AvForm id="register-form" onValidSubmit={this.handleValidSubmit}>
              <AvField
                name="username"
                label="Tên tài khoản:"
                placeholder="Nhập tên tài khoản"
                validate={{
                  required: { value: true, errorMessage: 'Chưa nhập tên tài khoản.' },
                  pattern: { value: '^[_.@A-Za-z0-9-]*$', errorMessage: 'Tên tài khoản chỉ bao gồm chữ và số' },
                  minLength: { value: 1, errorMessage: 'Độ dài tối thiểu là 1' },
                  maxLength: { value: 50, errorMessage: 'Độ dài tên tài khoản đã vượt quá 50 kí tự' }
                }}
              />
              <AvField
                name="email"
                label="Email"
                placeholder="Nhập Email"
                type="email"
                validate={{
                  required: { value: true, errorMessage: 'Chưa nhập Email.' },
                  minLength: { value: 5, errorMessage: 'Your email is required to be at least 5 characters.' },
                  maxLength: { value: 254, errorMessage: 'Your email cannot be longer than 50 characters.' }
                }}
              />
              <AvField
                name="firstPassword"
                label="New password"
                placeholder="Mật khẩu"
                type="password"
                onChange={this.updatePassword}
                validate={{
                  required: { value: true, errorMessage: 'Chưa nhập mật khẩu' },
                  minLength: { value: 4, errorMessage: 'Your password is required to be at least 4 characters.' },
                  maxLength: { value: 50, errorMessage: 'Your password cannot be longer than 50 characters.' }
                }}
              />
              <PasswordStrengthBar password={this.state.password} />
              <AvField
                name="secondPassword"
                label="New password confirmation"
                placeholder="Nhập lại mật khẩu"
                type="password"
                validate={{
                  required: { value: true, errorMessage: 'Nhập lại mật khẩu.' },
                  minLength: { value: 4, errorMessage: 'Your confirmation password is required to be at least 4 characters.' },
                  maxLength: { value: 50, errorMessage: 'Your confirmation password cannot be longer than 50 characters.' },
                  match: { value: 'firstPassword', errorMessage: 'The password and its confirmation do not match!' }
                }}
              />
              <Button id="register-submit" color="primary" type="submit">
                Đăng ký
              </Button>
            </AvForm>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapDispatchToProps = { handleRegister, reset };
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  null,
  mapDispatchToProps
)(RegisterPage);
