import React, { Component } from 'react';
import { Table, moment } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import { Pagination, Spin } from 'antd';


export default class RewardDetaiList extends Component {
  static displayName = 'RewardDetaiList';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  handlePaginationChange = (current) => {
    const {id, onPageChange, pagesize} = this.props;
    onPageChange(id, pagesize, current)
  };


  render() {

    const {pagesize, pageindex, count, data, userRoundLoading} = this.props;


    const dataSource = data.map((item, index) => {
        return {
          key: item.ID+index,
          roundName: item.roundName,
          startTime: moment(item.startTime).format('YYYY-MM-DD HH:mm:ss'),
          count: item.count,
          reward: item.reward ,
        };
      });

    return (
      <Spin spinning={userRoundLoading}>
        <IceContainer style={styles.container}>
          <Table
            hasBorder={false}
            dataSource={dataSource}
            primaryKey="key"
            align="center"
          >
            <Table.Column title="场次名称" dataIndex="roundName" />
            <Table.Column title="答题时间" dataIndex="startTime" />
            <Table.Column title="答对题目" dataIndex="count" />
            <Table.Column title="获得奖金" dataIndex="reward" />
          </Table>
          <Pagination 
            size="small"
            style={styles.pagenation}
            current={pageindex}
            onChange={this.handlePaginationChange}
            total={count}
            pageSize={pagesize}
          />
        </IceContainer>
      </Spin>
    );
  }
}

const styles = {
  container: {
    border: '1px solid #eee',
    borderTop: 'none',
    borderRadius: '0 0 10px 10px',
  },
  pagenation: {
    marginTop: '20px', 
    textAlign: 'right'
  },
}
