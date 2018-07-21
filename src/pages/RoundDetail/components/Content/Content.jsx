import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Tab } from "@icedesign/base";
import QuestionList from '../QuestionList'

const TabPane = Tab.TabPane;

export default class Content extends Component {

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange = (key) => {
    console.log("change", key);
  }
  
  handleClick = (key) => {
    console.log("click", key);
  }

  render() {
    return (
      <IceContainer>
        <Tab onChange={this.handleChange}>
            <TabPane key="questionList" tab="题目列表" onClick={this.handleClick}>
                <QuestionList />
            </TabPane>
            <TabPane key="rank" tab="排行榜" onClick={this.handleClick}>
                这里是排行榜内容
            </TabPane>
        </Tab>
      </IceContainer>
    );
  }
}
