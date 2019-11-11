import React from 'react';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from '../header-components';

export const EntitiesMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name="Chức năng" id="entity-menu">
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
      <DropdownItem tag={Link} to="/hinh-thuc">
          <FontAwesomeIcon icon="wrench" fixedWidth /> Hình thức chỉ đạo tuyến
      </DropdownItem>
      <DropdownItem tag={Link} to="/loai-cdt">
          <FontAwesomeIcon icon="wrench" fixedWidth /> Loại chỉ đạo tuyến
      </DropdownItem>
      <DropdownItem tag={Link} to="/noi-dung">
          <FontAwesomeIcon icon="wrench" fixedWidth /> Nội dung chỉ đạo tuyến
      </DropdownItem>
      <DropdownItem tag={Link} to="/doi-tuong">
          <FontAwesomeIcon icon="wrench" fixedWidth /> Đối tượng tiếp nhận chỉ đạo tuyến
      </DropdownItem>
      <DropdownItem tag={Link} to="/danh-gia">
          <FontAwesomeIcon icon="wrench" fixedWidth /> Đánh giá chỉ đạo tuyến
      </DropdownItem>
      <DropdownItem tag={Link} to="/van-ban">
          <FontAwesomeIcon icon="wrench" fixedWidth /> Văn bản chỉ đạo tuyến
      </DropdownItem>
      <DropdownItem tag={Link} to="/ke-hoach">
          <FontAwesomeIcon icon="wrench" fixedWidth /> Kế hoạch chỉ đạo tuyến
      </DropdownItem>
      <DropdownItem tag={Link} to="/cdt">
          <FontAwesomeIcon icon="wrench" fixedWidth /> Chi dao tuyen
      </DropdownItem>
  </NavDropdown>
);
