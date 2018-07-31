import React, { Component } from 'react';
import { Table, Button as IceButton, Icon } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import DeleteBalloon from '../../../../components/DeleteBalloon';
import RewardDetaiList from './RewardDetaiList';
import CellEditor from './CellEditor';
import './ExpandedTable.scss';
import { Pagination, Spin } from 'antd';
import { connect } from "react-redux";

@connect(({user})=>({...user}))
export default class ExpandedTable extends Component {
  static displayName = 'ExpandedTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      userRoundPagesize: 5,
      userRoundPageindex: 1,
      expandedRowKey: ''
    };
  }

  componentDidMount(){
    if(this.props.userList.length===0){
      this.getPageData(1)
    }
  }

  getPageData = pageindex => {
    const {dispatch} = this.props;
    dispatch({
      type: 'user/getUserList',
      payload: {
        pageindex
      }
    })
  }

  handlePaginationChange = (current) => {
    this.props.dispatch({
      type: 'user/updatePageindex',
      payload: current
    })
    this.getPageData(current)
  }

  renderEditor = (valueKey, value, index, record) => {
    return (
      <CellEditor
        value={record[valueKey]}
        id={record.key}
        onReviveChange={this.handleReviveChange}
      />
    );
  };

  handleReviveChange = (id, revive) => {
    const {dispatch} = this.props;
    dispatch({
      type: 'user/editRevive',
      payload: {
        id,
        revive
      }
    })
  }

  handleRewardDetailClick = (id, index) =>{
    if (this.state.expandedRowKey===id) {
      this.setState({
        expandedRowKey: ''
      })
    }else{
      this.props.dispatch({
        type: 'user/updateUserRoundListNCount',
        payload: {
          count: 0,
          list: []
        }
      })
      this.getUserRoundList(id, this.state.userRoundPagesize, 1)
      this.setState({
        expandedRowKey: id
      })
    }
  }

  getUserRoundList = (id, pagesize, pageindex, index) => {
    const {dispatch} = this.props;
    this.setState({
      userRoundPagesize: pagesize,
      userRoundPageindex: pageindex
    })
    dispatch({
      type: 'user/getUserRound',
      payload: {
        id,
        pagesize,
        pageindex
      }
    })
  }

  getUserListData = (userList) => {
    const This = this;
    return userList.map((user, index)=> {
      const {ID, name, phone, revive} = user;
      const {expandedRowKey, userRoundPagesize, userRoundPageindex} = This.state;
        return {
          key: ID,
          name,
          phone,
          revive,
          action: <DeleteBalloon handleRemove={() => This.handleRemove(ID)}/> ,
          detail: 
            <IceButton type="primary"  onClick={()=>{This.handleRewardDetailClick(ID, index)}}>
                获奖详情&nbsp;&nbsp;<Icon type={expandedRowKey===ID?"arrow-up":"arrow-down"}/>
            </IceButton> ,
          desc:
            <RewardDetaiList
              id={ID}
              index={index}
              pagesize={userRoundPagesize}
              pageindex={userRoundPageindex}
              onPageChange={This.getUserRoundList}
              count={This.props.userRoundCount}
              data={This.props.userRoundList}
              userRoundLoading={this.props.userRoundLoading}
            />
        };
    });
  }


  handleRemove = (id) => {
    const {dispatch} = this.props;
    dispatch({
      type: 'user/deleteUser',
      payload: {
        id
      }
    })
  }


  render() {

    const {userList, count, loading, pagesize, pageindex} = this.props;
    const data = this.getUserListData(userList)

    return (
      <Spin spinning={loading} className="expanded-table">
        <IceContainer>
          <Table
            hasBorder={false}
            dataSource={data}
            primaryKey="key"
            expandedRowIndent={[0,0]}
            expandedRowRender={(record) => record.desc}
            hasExpandedRowCtrl={false}
            expandedRowKeys={[this.state.expandedRowKey]}
            locale={{
              empty: "暂无用户",
            }}
          >
            <Table.Column title="姓名" dataIndex="name" />
            <Table.Column title="手机" dataIndex="phone" />
            <Table.Column title="复活卡" cell={this.renderEditor.bind(this, 'revive')} />
            <Table.Column title="操作" dataIndex="action" />
            <Table.Column title="" dataIndex="detail" />
          </Table>
          {count?<Pagination 
            style={styles.pagenation}
            current={pageindex}
            onChange={this.handlePaginationChange}
            total={count}
            pageSize={pagesize}
          />:null}
        </IceContainer>
      </Spin>
    );
  }
}

const styles = {
  editRevive : {
    color: '#ccc',
    border: 'none',
    backgroundColor: 'inherit'
  },
  pagenation: {
    marginTop: '20px', 
    textAlign: 'right'
  },
}
