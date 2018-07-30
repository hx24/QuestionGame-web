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
      current: 1,
      expandedRowKeys: []
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
        valueKey={valueKey}
        index={index}
        value={record[valueKey]}
        onChange={this.changeDataSource}
      />
    );
  };

  handleRewardDetailClick = key =>{
    if (this.state.expandedRowKeys.includes(key) ) {
      this.setState({
        expandedRowKeys: []
      })
    }else{
      this.setState({
        expandedRowKeys: [key]
      })
    }
  }

  getUserListData = (userList) => {
    const This = this;
    return userList.map( user => {
      const {ID, name, phone, revive} = user;
        return {
          key: ID,
          name,
          phone,
          revive,
          action: <DeleteBalloon handleRemove={() => This.handleRemove(ID)}/> ,
          detail: <IceButton type="primary"  onClick={()=>{This.handleRewardDetailClick(ID)}}>获奖详情&nbsp;&nbsp;<Icon type="arrow-down"/></IceButton> ,
          desc:
            <RewardDetaiList/>
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
            expandedRowKeys={this.state.expandedRowKeys}
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
