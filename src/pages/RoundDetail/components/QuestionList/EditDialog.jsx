import React, { Component } from 'react';
import { Dialog, Form, Input, Field, Radio, Grid } from '@icedesign/base';
import {Button as AntButton} from 'antd';
const {Row, Col} = Grid;
const { Group: RadioGroup } = Radio;

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
        return;
      }
      const {getFormValues, type} = this.props;
      getFormValues( values, type);
      this.setState({
        visible: false,
      });
    });
  };

  onOpen = (index, record) => {
    this.field.setValues({
      ...record,
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

  render() {
    const init = this.field.init;
    const { index, record, type, render } = this.props;
    const formItemLayout = {
      labelCol: {
        fixedSpan: 6,
      },
      wrapperCol: {
        span: 14,
      },
    };

    const title = type==='update'?'修改':'+ 添加题目';

    const button = render?
    render:
    (<AntButton
      type="primary"
    >
      {title}
    </AntButton>)

    // const answers = record&&record.answers?record.answers:[];
    return (

      <div style={styles.editDialog}>
        <div onClick={() => this.onOpen(index, record)}>{button}</div>
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
            <FormItem label="题目：" {...formItemLayout}>
              <Input
                {...init('question', {
                  rules: [{ required: true, message: '必填选项' }],
                })}
                multiple 
                maxLength={35} 
                rows={4} 
                hasLimitHint 
              />
            </FormItem>

            <FormItem label="选项： " {...formItemLayout}>
                  <RadioGroup
                  style={{width:'100%'}}
                    {...init("correct", {
                      rules: [{ required: true, message: "请选择一个作为正确答案" }]
                    })}
                  >
                    {[1,2,3,4].map((answer,index)=>{
                      return (
                        <Row 
                          style={styles.answerItem} 
                          key={index}>
                            <Col span="2">
                              <Radio value={index}/>
                            </Col>
                            <Col span="22">
                              <FormItem wrapperCol={{span: 24}}>
                              <Input
                                style={{width:'100%'}}
                                {...init(`answer${index}`, {
                                  rules: [{ required: true, message: '必填选项' }],
                                })}
                                maxLength={12} 
                                hasLimitHint
                              />
                              </FormItem>
                          </Col>
                        </Row>
                      )
                    })}
                  </RadioGroup>
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
  },
  answerItem: {
    marginTop: '10px'
  }
};