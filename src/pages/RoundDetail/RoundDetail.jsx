import React, { Component } from 'react';
import Content from './components/Content';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
// import OverviewSatesChart from './components/OverviewSatesChart'

export default class RoundDetail extends Component {
  static displayName = 'RoundDetail';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    const breadcrumb = [
      { text: '场次管理', link: '' },
      { text: '场次列表', link: '#/round' },
      { text: '场次详情', },
    ];

    return (
      <div className="round-detail-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        {/* <OverviewSatesChart/> */}
        <Content />
      </div>
    );
  }
}
