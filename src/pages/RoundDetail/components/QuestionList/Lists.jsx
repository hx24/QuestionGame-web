import React, { Component } from 'react';
import IceContainer from '@icedesign/container'; 
import { Grid, Icon, Checkbox} from '@icedesign/base';
import {Button} from 'antd';

const { Row, Col } = Grid;

const getData = () => {
  return Array.from({ length: 10 }).map((item, index) => {
    return {
      title: `${index + 1}. 这里是试卷名称这里是试卷名称这里是试卷名称`,
      time: `2018-06-1${index}`,
      citation: index + 1,
      score: index + 90,
      subject: '自然语言',
      count: 20,
    };
  });
};

export default class Lists extends Component {
  static displayName = 'Lists';

  constructor(props) {
    super(props);
  }

  render() {
    const data = getData();
    return (
      <IceContainer>
        <div style={styles.addContainer}>
          <Button
            type="primary"
          >
            + &nbsp; 添加题目
          </Button>
        </div>
        <div style={styles.contentList}>
          {data.map((item, index) => {
            return (
              <div style={styles.item} key={index}>
                <Row >
                  <Col l="16">
                    <h6 style={styles.title}>{item.title}</h6>
                  </Col>
                  <Col l="8">
                    <div style={styles.operWrap}>
                      <div style={styles.oper}>
                        <Icon size="xs" type="edit" style={styles.operIcon} />
                        <span style={styles.operText}>编辑</span>
                      </div>
                      <div style={styles.oper}>
                        <Icon size="xs" type="ashbin" style={styles.operIcon} />
                        <span style={styles.operText}>删除</span>
                      </div>
                    </div>
                  </Col>
                </Row>
                
                <Row style={styles.metaWrap}>
                  <Col 
                    xl="6"
                    m="12"
                    xxs="24"
                  >
                    <div style={styles.meta}>
                      <Checkbox disabled>
                        <span style={styles.meteText}>A. <span>这是十五个字这是十五个字这是十</span></span>
                      </Checkbox>
                    </div>
                  </Col>
                  <Col 
                    xl="6"
                    m="12"
                    xxs="24"

                  >
                    <div style={styles.meta}>
                      <Checkbox disabled checked>
                        <span style={styles.meteText}>B. <span>这是十五个字这是十五个字这是十</span></span>
                      </Checkbox>
                    </div>
                  </Col>
                  <Col 
                    xl="6"
                    m="12"
                    xxs="24"

                  >
                    <div style={styles.meta}>
                      <Checkbox disabled>
                        <span style={styles.meteText}>C. <span>这是十五个字这是十五个字这是十</span></span>
                      </Checkbox>
                    </div>
                  </Col>
                  <Col 
                    xl="6"
                    m="12"
                    xxs="24"

                  >
                    <div style={styles.meta}>
                      <Checkbox disabled>
                        <span style={styles.meteText}>D. <span>这是十五个字这是十五个字这是十</span></span>
                      </Checkbox>
                    </div>
                  </Col>
                </Row>
              </div>
            );
          })}
        </div>
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
    cursor: 'pointer',
  },
  oper: {
    marginLeft: '15px',
    fontSize: '13px',
    color: '#999',
  },
  operIcon: {
    marginRight: '8px',
  },
};
