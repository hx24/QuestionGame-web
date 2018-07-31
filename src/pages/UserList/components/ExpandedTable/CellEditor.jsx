/* eslint no-unused-expressions: 0 */
import React, { Component } from 'react';
import { Icon, Input, dom  } from '@icedesign/base';


export default class CellEditor extends Component {
  static displayName = 'CellEditor';

  constructor(props) {
    super(props);

    this.tempValue = '';
    this.state = {
      editMode: false,
      value: props.value || 0,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value,
      });
    }
  }

  componentWillUnmount(){
    const exitEditMode = this.exitEditMode;
    document.removeEventListener('click',exitEditMode)
  }

  exitEditMode = (e) => {
    if(!(e.target.nodeName==='INPUT'&&e.target.type==='text')){
      this.setState({
        editMode: false,
      })
      const exitEditMode = this.exitEditMode;
      document.removeEventListener('click',exitEditMode)
    }
  }

  editThisCell = () => {
    // 缓存数据以便回滚
    this.tempValue = this.state.value;
    this.setState({
      editMode: true,
    });
    const exitEditMode = this.exitEditMode;
    document.addEventListener('click',exitEditMode)
  };

  onValueChange = (value) => {
    value = value.replace(/[^\d]/g, '')
    this.setState({
      value,
    });
  };

  updateValue = () => {
    this.setState({
      editMode: false,
    });
    const {id} = this.props;
    const {value} = this.state;
    this.props.onReviveChange(id, value);
  };

  // rollBackThisCell = () => {
  //   this.setState({
  //     editMode: false,
  //   });
  // };

  render() {
    const { value, editMode } = this.state;

    if (editMode) {
      return (
        <div className="celleditor">
          <Input
            ref={input=>this.input=input}
            style={styles.cellInput}
            defaultValue={0}
            value={value}
            maxLength={3}
            onChange={this.onValueChange}
            onPressEnter={this.updateValue}
          />
          <span
            style={styles.operationIcon}
            title="确定"
            onClick={()=>{this.updateValue()}}
          >
            <Icon size="xs" type="select" />
          </span>
          {/* <span
            style={styles.operationIcon}
            title="撤销"
            onClick={this.rollBackThisCell}
          >
            <Icon size="xs" type="refresh" />
          </span> */}
        </div>
      );
    }
    return (
      <div className="celleditor">
        <span style={styles.cellValue}>{value}</span>
        <span
          style={styles.operationIcon}
          className="celleditor-trigger"
          title="编辑"
          onClick={this.editThisCell}
        >
          <Icon size="xs" type="edit" />
        </span>
      </div>
    );
  }
}

const styles = {
  cellInput: {
    width: 'calc(30%)',
    minWidth: '40px',
  },
  cellValue: {
    display: 'inline-block',
    width: '30px',
    textAlign: 'center',
  },
  operationIcon: {
    marginLeft: '10px',
    color: '#999',
    cursor: 'pointer',
  },
};
