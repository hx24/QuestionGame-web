import React, { Component } from 'react';
import { Dialog, Button, Form, Input, Field, DatePicker, moment } from '@icedesign/base';
import {Button as AntButton} from 'antd';

const FormItem = Form.Item;

export default class EditDialog extends Component {
  static displayName = 'EditDialog';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      dataIndex: null,
    };
    this.field = new Field(this);
  }

  handleSubmit = () => {
    this.field.validate((errors, values) => {
      if (errors) {
        console.log('Errors in form!!!');
        return;
      }

      const { dataIndex } = this.state;
      const {getFormValues, type} = this.props;
      const submitValues = {
        ...values,
        time: values.time.getTime()
      }
      getFormValues(dataIndex, submitValues, type);
      this.setState({
        visible: false,
      });
    });
  };

  onOpen = (index, record) => {
    var time = record?new Date(record.time):null;
    this.field.setValues({
      ...record,
      time
    });
    this.setState({
      visible: true,
      dataIndex: index,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  checkTime = (rule, value, callback) => {
    console.log(value);
    if (value && value.getTime() <= Date.now()) {
      callback(new Error("开始时间不能小于当前时间!"));
    } else {
      callback();
    }
  }

  checkReward(rule, value, callback) {
    if(!value){
      callback(new Error("必填项"));
    }else if(isNaN(Number.parseInt(value))){
      callback(new Error("请输入数字"));
    }else if(Number.parseInt(value)<=0){
      callback(new Error("请输入大于0的数字"));
    }else{
      callback()
    }
  }

  render() {
    const init = this.field.init;
    const { index, record, type } = this.props;
    const formItemLayout = {
      labelCol: {
        fixedSpan: 6,
      },
      wrapperCol: {
        span: 14,
      },
    };

    const title = type==='update'?'修改':'+ 添加场次';

    const button = type==='update'?
    <Button
      size="small"
      type="primary"
      onClick={() => this.onOpen(index, record)}
    >
      {title}
    </Button>:
    <AntButton
      type="primary"
      onClick={() => this.onOpen(index, record)}
    >
      {title}
    </AntButton>

    return (

      <div style={styles.editDialog}>
        {button}
        <Dialog
          style={{ width: 640 }}
          visible={this.state.visible}
          onOk={this.handleSubmit}
          closable="esc,mask,close"
          onCancel={this.onClose}
          onClose={this.onClose}
          title={title}
        >
          <Form direction="ver" field={this.field}>
            <FormItem label="场次名称：" {...formItemLayout}>
              <Input
                maxLength={8}
                {...init('title', {
                  rules: [{ required: true, message: '必填选项' }],
                })}
              />
            </FormItem>

            <FormItem label="奖金总额：" {...formItemLayout}>
              <Input
                maxLength={6}
                {...init('reward', {
                    rules: [{ required: true, message: '必填选项' }],
                    props:{
                      onChange:(v)=>{
                        this.field.setValue('reward',v.replace(/[^\d]/g, ''));
                      }
                    }
                  }
                )}
              />
            </FormItem>

            <FormItem label="开始时间：" {...formItemLayout}>
              <DatePicker
                {...init('time', {
                    rules: [
                      { 
                        required: true, 
                        message: '必填选项',
                        type: "date", 
                      },
                      {
                        validator: this.checkTime
                      }
                    ]
                  }
                )}
                showTime={{ 
                  defaultValue: moment.now(),
                  format: "HH:mm"
                }}
              />
            </FormItem>
          </Form>
        </Dialog>
      </div>
    );
  }
}

const styles = {
  editDialog: {
    display: 'inline-block',
    marginRight: '5px',
  }
};