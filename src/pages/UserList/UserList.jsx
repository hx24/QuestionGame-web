

import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import ExpandedTable from './components/ExpandedTable';
import './UserList.scss';

export default class UserList extends Component {
  static displayName = 'UserList';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    const { router } = this.props;
    const breadcrumb = [
      { text: '用户管理'},
      { text: '用户列表'},
    ];
    return (
      <div className="userlist-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <ExpandedTable {...router} />
      </div>
    );
  }
}
