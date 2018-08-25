import React, { Component } from 'react';
import Img from '@icedesign/img';
import IceContainer from '@icedesign/container';
import './Codes.scss';
import { connect } from "react-redux";
import { Row, Col } from 'antd';

@connect(({user})=>({...user}))
export default class ExpandedTable extends Component {
  static displayName = 'Codes';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
  }
  render() {

    const spanConfig = {
      xs: 24,
      sm: 12
    }

    return (
        <IceContainer>
          <Row style={{margin: '10% 0'}}>
            <Col 
              {...spanConfig}
            >
              <div style={styles.QRcodeContainer}>
                <div style={styles.title}>Android、iOS客户端</div>
                <Img
                  width={200}
                  height={200} 
                  src="http://kar98k.club/static/images/qrcode-app.png" alt="app二维码"
                />
              </div>
            </Col >
              
            <Col 
              {...spanConfig}
            >
              <div style={styles.QRcodeContainer}>
                <div style={styles.title}>微信小程序</div>
                <Img
                  width={200}
                  height={200} 
                  src="http://kar98k.club/static/images/qrcode-miniApp.jpg" alt="小程序码"
                />
              </div>
              
            </Col>
          </Row>
        </IceContainer>
    );
  }
}

const styles = {
  QRcodeContainer: {
    width: 'auto',
    textAlign: 'center',

  },
  title: {
    textAlign: 'center',
    fontSize: '22px',
    marginBottom: 10,
  }
}

