import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import CustomTable from './components/CustomTable';
import EditDialog from './components/EditDialog';
import DeleteBalloon from '../../../../components/DeleteBalloon';

import { connect } from "react-redux";
import { moment, Button} from "@icedesign/base";
import { Pagination } from 'antd';
import { withRouter } from 'react-router-dom';

import {Spin} from 'antd';

@withRouter
@connect(({round})=>({...round}))
export default class TabTable extends Component {
  static displayName = 'TabTable';

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
        title: '场次名称',
        dataIndex: 'title',
        key: 'title',
        width: 150,
      },
      {
        title: '奖金总额',
        dataIndex: 'reward',
        key: 'reward',
        width: 150,
      },
      {
        title: '开始时间',
        width: 150,
        dataIndex: 'time',
        key: 'time',
      },
      {
        title: '操作',
        key: 'action',
        width: 150,
        render: (value, index, record) => {
          return (
            <span>
              <Button
                style={styles.detailBtn}
                type="primary"
                size="small"
                onClick={()=>{this.toDetailPage(record.ID)}}
              >
                查看
              </Button>
              <EditDialog
                type="update"
                index={index}
                record={record}
                getFormValues={this.getFormValues}
              />
              <DeleteBalloon
                handleRemove={() => this.handleRemove(value, index, record)}
              />
            </span>
          );
        },
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

  getFormValues = ( dataIndex, values, type) => {
    const {dispatch} = this.props;
    var b = type==='add';
    dispatch({
      type: b?'addRound':'updateRound',
      payload: values
    })
    dispatch({
      type: 'updatePageindex',
      payload: 1
    })
  };

  handleRemove = (value, index, record) => {
    const {dispatch} = this.props;
    dispatch({
      type: 'deleteRound',
      payload: {
        ID: record.ID
      }
    })
  };

  handlePageChange = (current) => {
    this.props.dispatch({
      type: 'updatePageindex',
      payload: current
    })
    this.getPageData(current)
  }

  toDetailPage = (id) => {
    this.props.history.push(`/round/${id}`)
  }

  render() {

    const {list, count, loading, pagesize} = this.props;
    const formatList = list.map(item=>{
      return {
        ...item,
        time: moment(item.time).format('YYYY-MM-DD HH:mm:ss')
      }
    })

    return (
      <div className="tab-table">
        <IceContainer>
          <Spin spinning={loading}>
            <EditDialog
              type="add"
              getFormValues={this.getFormValues}
            />
            <CustomTable
              style={styles.customTable}
              dataSource={formatList}
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
          </Spin>
        </IceContainer>
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
  }
}
