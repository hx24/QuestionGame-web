import React, { Component } from 'react';
import { Button, moment } from '@icedesign/base';
import {DatePicker, Button as AntButton, Form, Input, Modal} from 'antd';

const FormItem = Form.Item;

@Form.create()
export default class EditDialog extends Component {
  static displayName = 'EditDialog';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      dataIndex: null,
    };
  }

  componentDidMount(){
    const {record={}} = this.props;
    var time = record.time?moment(record.time):null;
    this.props.form.setFieldsValue({
      title: record.title||'',
      reward: record.reward||'',
      time
    });
  }

  handleSubmit = () => {
    const {form} = this.props;
    form.validateFields((err, values)=>{
      if (!err) {
        const { dataIndex } = this.state;
        const {getFormValues, type} = this.props;
        const submitValues = {
          ...values,
          time: values.time.unix()*1000,
          ID: this.props.record.ID
        }
        getFormValues(dataIndex, submitValues, type);
        this.setState({
          visible: false,
        });
      }
    });
  };

  onOpen = (index) => {
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
    if (value && value.isBefore(moment())) {
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
    const { getFieldDecorator } = this.props.form;

    const { index, type } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 14 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 2 },
        sm: { span: 14 },
      },
    };

    const title = type==='update'?'修改':'+ 添加场次';

    const button = type==='update'?
    <Button
      size="small"
      type="primary"
      onClick={() => this.onOpen(index)}
    >
      {title}
    </Button>:
    <AntButton
      type="primary"
      onClick={() => this.onOpen(index)}
    >
      {title}
    </AntButton>

    return (

      <div style={styles.editDialog}>
        {button}
        <Modal
          style={{ width: '40%',minWidth: 300,maxWidth:640 }}
          visible={this.state.visible}
          onOk={this.handleSubmit}
          closable
          onCancel={this.onClose}
          onClose={this.onClose}
          title={title}
        >
          <Form direction="ver">
            <FormItem label="场次名称：" {...formItemLayout}>
              {getFieldDecorator('title', {
                rules: [{ required: true, message: '必填选项' }],
              })(
                <Input 
                  maxLength={8}
                />
              )}
            </FormItem>

            <FormItem label="奖金总额：" {...formItemLayout}>
              {getFieldDecorator('reward', {
                rules: [{ required: true, message: '必填选项' }],
              })(
                <Input
                  maxLength={6}
                  onChange={(e) => {
                    e.target.value = e.target.value.replace(/[^\d]/g, '');
                  }}
                />
              )}
            </FormItem>

            <FormItem label="开始时间：" {...formItemLayout}>
              {getFieldDecorator('time', {
                rules: [
                  { required: true, message: '必填选项' },
                  {validator: this.checkTime}
                ],
              })(
                <DatePicker
                  placeholder={'请选择时间'}
                  format={'YYYY-MM-DD HH:mm'}
                  showTime={{ 
                    defaultValue: moment(),
                    format: "HH:mm"
                  }}
                />
              )}
            </FormItem>
          </Form>
        </Modal>
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