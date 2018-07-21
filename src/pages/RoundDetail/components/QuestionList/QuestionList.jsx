import React, { Component } from 'react';
import Lists from './Lists';

export default class QuestionList extends Component {
  static displayName = 'QuestionList';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Lists />
      </div>
    );
  }
}
