import React, { Component } from 'react';
import IceContainer from '@icedesign/container'; 
import { Grid, Icon, Checkbox} from '@icedesign/base';
import EditDialog from './EditDialog';
import DeleteBalloon from '../../../../components/DeleteBalloon';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

import {Spin} from 'antd';

const { Row, Col } = Grid;

const mapStateToProps = ({round, loadings}) => {
  return {
    detail: round.detail,
    loading: loadings.roundDetail
  }
}

const answersLables = ["A. ", "B. ", "C. ", "D. "]

@withRouter
@connect(mapStateToProps)
export default class Lists extends Component {
  static displayName = 'Lists';

  constructor(props) {
    super(props);
  }

  componentDidMount(){
      const {dispatch, match} = this.props;
      dispatch({
        type: 'getRoundDetail',
        payload: { id: match.params.id}
      })
  }

  getFormValues = (values, type) => {
    const {dispatch, match} = this.props;
    const payload = {
      ...values,
      id: values.ID,
      roundId: match.params.id
    }
    dispatch({
      type: type==='add'?'addQuestion':'updateQuestion',
      payload
    })
  }

  editRender=(
    <div style={styles.oper}>
      <Icon size="xs" type="edit" style={styles.operIcon} />
      <span style={styles.operText}>修改</span>
    </div>
  )

  deleteRender = (
    <div style={styles.oper}>
      <Icon size="xs" type="ashbin" style={styles.operIcon} />
      <span style={styles.operText}>删除</span>
    </div>
  )

  handleRemove = id => {
    this.props.dispatch({
      type: 'deleteQuestion',
      payload: {
        id,
        roundId: this.props.match.params.id
      }
    })
  }



  render() {

    const {loading, detail} = this.props;
    const questions = detail.questions;

    return (
      <IceContainer>
        <Spin spinning={loading}>
          <div style={styles.addContainer}>
            <EditDialog 
              type="add"
              getFormValues={this.getFormValues}
            />
          </div>
          {questions.length===0?<div style={styles.noData}>暂无题目</div>:null}
          <div style={styles.contentList}>
            {questions.map((question,i) => {
              return (
                <div style={styles.item} key={question.ID}>
                  <Row >
                    <Col l="16">
                      <h6 style={styles.title}>{i+1}.&nbsp;&nbsp;&nbsp;{question.question}</h6>
                    </Col>
                    <Col l="8">
                      <div style={styles.operWrap}>
                        <EditDialog 
                          type="update"
                          record={question}
                          render={this.editRender}
                          getFormValues={this.getFormValues}
                        />
                        
                        <DeleteBalloon
                          render={this.deleteRender}
                          handleRemove={() => this.handleRemove(question.ID)}
                        />
                      </div>
                    </Col>
                  </Row>
                  
                  <Row style={styles.metaWrap}>
                    {question.answers.map((answer,i)=>{
                      return answer?(
                        <Col
                          key={question.ID+i}
                          xl="6"
                          m="12"
                          xxs="24"
                        >
                          <div style={styles.meta}>
                            <Checkbox disabled checked={question.correct===i}>
                              <span style={styles.meteText}>{answersLables[i]}&nbsp;<span>{answer}</span></span>
                            </Checkbox>
                          </div>
                        </Col>
                      ):null
                    })}
                  </Row>
                </div>
              );
            })}
          </div>
        </Spin>
      </IceContainer>
    );
  }
}

const styles = {
  cardTitle: {
    height: '16px',
    lineHeight: '16px',
    fontSize: '25px',
    color: 'rgb(51, 51, 51)',
    fontWeight: 'bold',
    margin: '0',
    padding: '0',
  },
  addContainer: {
    textAlign: 'right'
  },
  noData: {
    marginTop: '20px',
    textAlign: 'center',
    color: '#ccc',
    fontSize: '18px'
  },
  item: {
    position: 'relative',
    borderBottom: '1px solid #eee',
    padding: '20px 0',
  },
  title: {
    margin: '0 0 10px',
  },
  metaWrap: {
    display: 'flex',
    paddingLeft: '15px',
    flexWrap: 'wrap'
  },
  meta: {
    fontSize: '13px',
    marginTop: '20px',
    marginRight: '15px',
  },
  meteText: {
    color: '#666',
  },
  operWrap: {
    position: 'absolute',
    right: '0',
    display: 'flex',
  },
  oper: {
    marginLeft: '15px',
    fontSize: '13px',
    color: '#999',
    cursor: 'pointer',
  },
  operIcon: {
    marginRight: '8px',
  },
};
