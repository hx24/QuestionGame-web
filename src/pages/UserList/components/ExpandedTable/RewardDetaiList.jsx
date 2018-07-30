import React, { Component } from 'react';
import { Table } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import { Pagination } from 'antd';


export default class RewardDetaiList extends Component {
  static displayName = 'RewardDetaiList';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      expandedRowKeys: []
    };
  }

  handlePaginationChange = (current) => {
    this.setState({
      current,
    });
  };

  handleRewardDetailClick = (expandedRowKeys, currentRowKey, expanded, currentRecord)=>{
    /*
      expandedRowKeys: {Array} 展开的渲染行的key
      currentRowKey: {String} 当前点击的渲染行的key
      expanded: {Boolean} 当前点击是展开还是收起
      currentRecord: {Object} 当前点击额外渲染行的记录
    */
   console.log( [currentRowKey])
    this.setState({
      expandedRowKeys: [currentRowKey]
    })
  }

  render() {

    const data = Array.from({ length: 5 }).map((item, index) => {
        return {
          key: index + 10,
          roundName: '第一场',
          startTime: '2018-07-29 12:00',
          count: 6,
          reward: 1200 ,
        };
      });

    return (
      <IceContainer style={styles.container}>
        <Table
          hasBorder={false}
          dataSource={data}
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
          current={this.state.current}
          onChange={this.handlePaginationChange}
          total={100}
          pageSize={10}
        />
      </IceContainer>
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
