

import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import Codes from './components/Codes'
import './QRcode.scss';

export default class QRcode extends Component {
  static displayName = 'QRcode';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    const breadcrumb = [
      { text: '二维码'},
    ];
    return (
      <div className="QRcode-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <Codes/>
      </div>
    );
  }
}
