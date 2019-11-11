import './footer.scss';

import React from 'react';

import { Col, Row } from 'reactstrap';

const Footer = props => (
  <div className="footer page-content">
    <Row>
      <Col md="12">
        <div style={ { width: '100%', height: '70', backgroundColor: '#0066ff', color: 'white', textAlign: 'left' } }>
            <h4>HIS @ 2019</h4>
        </div>
      </Col>
    </Row>
  </div>
);

export default Footer;
