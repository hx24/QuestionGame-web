import React, { Component } from 'react';
import CustomTable from './components/CustomTable';

import { connect } from "react-redux";
import { Loading, moment, Button} from "@icedesign/base";
import { Pagination } from 'antd';
import { withRouter } from 'react-router-dom';
import {Spin} from 'antd';
import { log } from 'util';

@withRouter
@connect(({round,loadings})=>({...round, loading: loadings.getRank}))
export default class Rank extends Component {
  static displayName = 'Rank';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state={
      pagesize: 10,
      pageindex: 1,
    }

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
        dataIndex: 'answercount',
        key: 'answercount',
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

  componentDidMount(){
    this.getPageData(1)
  }

  componentWillUnmount(){
    this.props.dispatch({
      type: 'clearRankData'
    })
  }

  getPageData = (pageindex) => {
    this.setState({
      pageindex
    })
    const {dispatch, match} = this.props;
    dispatch({
      type: 'getRank',
      payload: { 
        id: match.params.id,
        pagesize: this.state.pagesize,
        pageindex
      }
    })
  }


  handlePageChange = (current) => {
    this.getPageData(current)
  }


  render() {

    const {rankCount, rankList, loading} = this.props;

    return (
      <div className="tab-table">
          <Spin spinning={loading}>
            <CustomTable
              style={styles.customTable}
              dataSource={rankList}
              columns={this.columns}
              hasBorder={false}
            />
            {rankCount?<Pagination 
              style={styles.pagination} 
              current={this.props.pageindex} 
              onChange={this.handlePageChange} 
              total={rankCount}
              pageSize={this.state.pagesize}
            />:null}
          </Spin>
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