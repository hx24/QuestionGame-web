import React, { Component } from 'react';
import { Input, Radio, Grid } from '@icedesign/base';
const {Row, Col} = Grid;

export default class EditDialog extends Component {
  static displayName = 'EditDialog';

  static defaultProps = {};

  render() {
    const {init} = this.props;

    return (
        <Row>
          <Col span="2">
            <Radio value={123}/>
          </Col>
          <Col span="22">
          <Input
          style={{width:'100%'}}
            {...init('answerA', {
              rules: [{ required: true, message: '必填选项' }],
            })}
            maxLength={15} 
            hasLimitHint 
          />
          </Col>
        </Row>
    );
  }
}