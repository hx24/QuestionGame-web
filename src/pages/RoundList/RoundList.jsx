

import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import TabTable from './components/TabTable';

import './RoundList.scss';

export default class CateList extends Component {
  static displayName = 'CateList';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '场次管理', link: '' },
      { text: '场次列表',},
    ];
    return (
      <div className="cate-list-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <TabTable />
      </div>
    );
  }
}
