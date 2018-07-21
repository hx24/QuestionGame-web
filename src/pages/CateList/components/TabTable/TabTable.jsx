import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import CustomTable from './components/CustomTable';
import EditDialog from './components/EditDialog';
import DeleteBalloon from './components/DeleteBalloon';
import { connect } from "react-redux";


@connect(({round})=>({...round}))
export default class TabTable extends Component {
  static displayName = 'TabTable';

  static propTypes = {};

  static defaultProps = {};

  componentDidMount(){
    const {dispatch} = this.props;
    dispatch({
      type: 'getRoundList',
      payload: {
        pagesize: '',
        pageindex: ''
      }
    })
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
              <EditDialog
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
  

  getFormValues = ( dataIndex, values) => {
    const {dispatch} = this.props;
    dispatch({
      type: 'updateRound',
      payload: values
    })
  };

  handleRemove = (value, index, record) => {

    console.log(record)
    const {dispatch} = this.props;
    dispatch({
      type: 'deleteRound',
      payload: {
        ID: record.ID
      }
    })
  };

  render() {

    const {list} = this.props;

    return (
      <div className="tab-table">
        <IceContainer>
          <CustomTable
            dataSource={list}
            columns={this.columns}
            hasBorder={false}
          />
        </IceContainer>
      </div>
    );
  }
}
