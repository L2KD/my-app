import React from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Alert, Row, Col } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Link } from 'react-router-dom';

export interface ILoginModalProps {
  showModal: boolean;
  loginError: boolean;
  handleLogin: Function;
  handleClose: Function;
}

class LoginModal extends React.Component<ILoginModalProps> {
  handleSubmit = (event, errors, { username, password, rememberMe }) => {
    const { handleLogin } = this.props;
    handleLogin(username, password, rememberMe);
  };

  render() {
    const { loginError, handleClose } = this.props;

    return (
      <Modal isOpen={this.props.showModal} toggle={handleClose} backdrop="static" id="login-page" autoFocus={false}>
        <AvForm onSubmit={this.handleSubmit}>
          <ModalHeader id="login-title" toggle={handleClose}>
            Đăng nhập
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col md="12">
                {loginError ? (
                  <Alert color="danger">
                    <strong>Đăng nhập thất bại!</strong> Kiểm tra lại thông tin.
                  </Alert>
                ) : null}
              </Col>
              <Col md="12">
                <AvField
                  name="username"
                  label="Tài khoản"
                  placeholder="Tài khoản"
                  required
                  errorMessage="Tài khoản không được để trống!"
                  autoFocus
                />
                <AvField
                  name="password"
                  type="password"
                  label="Mật khẩu"
                  placeholder="Mật khẩu"
                  required
                  errorMessage="Mật khẩu không được để trống!"
                />
                {/*<AvGroup check inline>*/}
                  {/*<Label className="form-check-label">*/}
                    {/*<AvInput type="checkbox" name="rememberMe" /> Nhớ mật khẩu*/}
                  {/*</Label>*/}
                {/*</AvGroup>*/}
              </Col>
            </Row>
            {/*<div className="mt-1">&nbsp;</div>*/}
            {/*<Alert color="warning">*/}
              {/*<Link to="/reset/request">Quên mật khẩu?</Link>*/}
            {/*</Alert>*/}
            {/*<Alert color="warning">*/}
              {/*<span>Chưa có tài khoản?</span> <Link to="/register">Đăng ký tài khoản</Link>*/}
            {/*</Alert>*/}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={handleClose} tabIndex="1">
              Thoát
            </Button>{' '}
            <Button color="primary" type="submit">
              Đăng nhập
            </Button>
          </ModalFooter>
        </AvForm>
      </Modal>
    );
  }
}

export default LoginModal;
