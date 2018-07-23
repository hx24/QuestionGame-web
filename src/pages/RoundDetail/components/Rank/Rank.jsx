import React, { Component } from 'react';
import CustomTable from './components/CustomTable';

import { connect } from "react-redux";
import { Loading, moment, Button} from "@icedesign/base";
import { Pagination } from 'antd';
import { withRouter } from 'react-router-dom';

@withRouter
@connect(({round})=>({...round}))
export default class Rank extends Component {
  static displayName = 'Rank';

  static propTypes = {};

  static defaultProps = {};

  componentDidMount(){
    if(this.props.list.length===0){
      this.getPageData(1)
    }
  }

  constructor(props) {
    super(props);

    this.columns = [
      {
        title: '排名',
        dataIndex: 'rank',
        key: 'rank',
        width: 150,
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        width: 150,
      },
      {
        title: '答对题目',
        dataIndex: 'count',
        key: 'count',
        width: 150,
      },
      {
        title: '获得奖金',
        width: 150,
        dataIndex: 'reward',
        key: 'reward',
      },
    ];
  }
  
  getPageData = pageindex => {
    const {dispatch} = this.props;
    dispatch({
      type: 'getRoundList',
      payload: {
        pageindex
      }
    })
  }


  handlePageChange = (current) => {
    this.props.dispatch({
      type: 'updatePageindex',
      payload: current
    })
    this.getPageData(current)
  }


  render() {

    const count=100, loading=false, pagesize=10;

    const mockd = {
        rank: 1,
        name: '黄鑫',
        count: 10,
        reward: 1000
    }

    const mockData = [mockd,mockd,mockd,mockd,mockd,mockd,mockd,mockd]

    return (
      <div className="tab-table">
          <Loading visible={loading} shape="fusion-reactor" color="rgb(32, 119, 255)">
            <CustomTable
              style={styles.customTable}
              dataSource={mockData}
              columns={this.columns}
              hasBorder={false}
            />
            {count?<Pagination 
              style={styles.pagination} 
              current={this.props.pageindex} 
              onChange={this.handlePageChange} 
              total={count}
              pageSize={pagesize}
            />:null}
          </Loading>
      </div>
    );
  }
}

const styles={
  detailBtn: {
    marginRight: '5px'
  },
  customTable: {
    marginTop: '10px'
  },
  pagination: {
    textAlign: 'right',
    marginTop: '30px',
    marginRight: '30px'
  },
}
