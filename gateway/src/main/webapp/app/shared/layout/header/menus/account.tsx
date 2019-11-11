import React from 'react';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink as Link } from 'react-router-dom';

import { NavDropdown } from '../header-components';

const accountMenuItemsAuthenticated = (
  <>
    <DropdownItem tag={Link} to="/account/settings">
      <FontAwesomeIcon icon="wrench" fixedWidth /> Cài đặt
    </DropdownItem>
    <DropdownItem tag={Link} to="/account/password">
      <FontAwesomeIcon icon="clock" fixedWidth /> Mật khẩu
    </DropdownItem>
    <DropdownItem tag={Link} to="/logout">
      <FontAwesomeIcon icon="sign-out-alt" fixedWidth /> Đăng xuất
    </DropdownItem>
  </>
);

const accountMenuItems = (
  <>
    {/*<DropdownItem id="login-item" tag={Link} to="/login">*/}
      {/*<FontAwesomeIcon icon="sign-in-alt" fixedWidth /> Đăng nhập*/}
    {/*</DropdownItem>*/}
    {/*<DropdownItem tag={Link} to="/register">*/}
      {/*<FontAwesomeIcon icon="sign-in-alt" fixedWidth /> Đăng ký*/}
    {/*</DropdownItem>*/}
      <DropdownItem id="login-item" tag={Link} to="/tai-khoan/dang-nhap">
        <FontAwesomeIcon icon="sign-in-alt" fixedWidth /> Đăng nhập
      </DropdownItem>
  </>
);

// export const AccountMenu = ({ isAuthenticated = false }) => (
//     <NavDropdown icon="user" name="Tài khoản" id="account-menu">
//         {isAuthenticated ? accountMenuItemsAuthenticated : accountMenuItems}
//     </NavDropdown>
// );

const onClickDangXuat = () => {
    window.location.reload();
};

const logout = () => {
    localStorage.clear();
    window.location.reload();
};

export const AccountMenu = () => (
    <NavDropdown icon="user" name="Tài khoản" id="account-menu">
        {
            localStorage.getItem('tai_khoan') !== null && localStorage.getItem('tai_khoan') !== undefined ?
                (
                    <>
                        <DropdownItem id="login-item" onClick={logout}>
                            <FontAwesomeIcon icon="sign-in-alt" fixedWidth /> Đăng xuất
                        </DropdownItem>
                        {
                            localStorage.getItem('phan_quyen') === '1' ? (
                                <DropdownItem id="login-item" tag={Link} to="/dashboard-cdt">
                                    <FontAwesomeIcon icon="wrench" fixedWidth /> Dashboard
                                </DropdownItem>
                            ) : (
                                localStorage.getItem('phan_quyen') === '4' || localStorage.getItem('phan_quyen') === '5' ||
                                localStorage.getItem('phan_quyen') === '6' ? (
                                    <DropdownItem id="login-item" tag={Link} to="/quan-ly-nckh/dashboard-de-tai">
                                        <FontAwesomeIcon icon="wrench" fixedWidth /> Dashboard
                                    </DropdownItem>
                                ) : (
                                    <>
                                    </>
                                )
                            )
                        }
                    </>
                ) : (
                    <>
                        <DropdownItem id="login-item" tag={Link} to="/tai-khoan/dang-nhap">
                            <FontAwesomeIcon icon="sign-in-alt" fixedWidth /> Đăng nhập
                        </DropdownItem>
                </>
                )
        }
    </NavDropdown>
);

export default AccountMenu;
