

import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import SimpleFluencyForm from './components/SimpleFluencyForm';

import './CreateCate.scss';

export default class CreateCate extends Component {
  static displayName = 'CreateCate';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '场次管理', link: '' },
      { text: '添加场次', link: '#/round/create' },
    ];
    return (
      <div className="create-cate-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <SimpleFluencyForm />
      </div>
    );
  }
}
