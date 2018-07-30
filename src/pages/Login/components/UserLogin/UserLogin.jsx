/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Grid } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
} from '@icedesign/form-binder';
import './UserLogin.scss';
import { Feedback } from '@icedesign/base';
import { connect } from "react-redux";
import { Form, Icon, Input, Button, Checkbox } from 'antd';


const { Row, Col } = Grid;
const FormItem = Form.Item;

// 寻找背景图片可以从 https://unsplash.com/ 寻找
const backgroundImage =
  require('./images/TB1zsNhXTtYBeNjy1XdXXXXyVXa-2252-1500.png');

@withRouter
@connect(({user, loadings})=>({...user,loadings}))
@Form.create()
export default class UserLogin extends Component {
  static displayName = 'UserLogin';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        username: undefined,
        password: undefined,
        rememberUser: false,
      },
    };
  }

  componentDidMount(){
    var username=localStorage.getItem('username');
    username&&this.setState({
      value: {
        username: username,
        password: undefined,
        rememberUser: true,
      }
    })
  }

  formChange = (value) => {
    this.setState({
      value,
    });
  };

  handleSubmit = (e) => {
    // e.preventDefault();
    // this.refs.form.validateAll((errors, values) => {
    //   if (errors) {
    //     console.log('errors', errors);
    //     return;
    //   }
    //   const {dispatch} = this.props;
    //   dispatch({
    //     type: 'login',
    //     payload: values
    //   })
    //   if (values.username&&values.rememberUser) {
    //     localStorage.setItem('username',values.username);
    //   }else{
    //     localStorage.removeItem('username')
    //   }
    //   // this.props.history.push('/');
    //   // HashRouter.push('/');
    // });

    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {dispatch} = this.props;
        dispatch({
          type: 'login',
          payload: values
        })
        if (values.username&&values.remember) {
          localStorage.setItem('username',values.username);
        }else{
          localStorage.removeItem('username')
        }
        // this.props.history.push('/');
        // HashRouter.push('/');
      }
    });
  };

  render() {

    const {errorMsg,loadings} = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={styles.userLogin} className="user-login">
        <div
          style={{
            ...styles.userLoginBg,
            backgroundImage: `url(${backgroundImage})`,
          }}
        />
        <div style={styles.contentWrapper} className="content-wrapper">
          <h2 style={styles.slogan} className="slogan">
            欢迎使用 <br /> 答题英雄管理系统
          </h2>
          <div style={styles.formContainer}>
            <h4 style={styles.formTitle}>登录</h4>
            <IceFormBinderWrapper
              value={this.state.value}
              onChange={this.formChange}
              ref="form"
            >
              <div style={styles.formItems}>

                {errorMsg?<Row style={styles.formItem}>
                  <Col>
                  <Feedback title={errorMsg} type="error" shape="inline"></Feedback>
                  </Col>
                </Row>:null}
                <Form onSubmit={this.handleSubmit} className="login-form">
                  <FormItem>
                    {getFieldDecorator('username', {
                      rules: [{ required: true, message: '请输入用户名!' }],
                    })(
                      <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    )}
                  </FormItem>
                  <FormItem>
                    {getFieldDecorator('password', {
                      rules: [{ required: true, message: '请输入密码!' }],
                    })(
                      <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                  </FormItem>
                  <FormItem>
                    {getFieldDecorator('remember', {
                      valuePropName: 'checked',
                      initialValue: true,
                    })(
                      <Checkbox>记住账号</Checkbox>
                    )}
                    <Button loading={loadings.login} type="primary" htmlType="submit" className="login-form-button">
                      登陆
                    </Button>
                  </FormItem>
                </Form>

              </div>
            </IceFormBinderWrapper>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  userLogin: {
    position: 'relative',
    height: '100vh',
  },
  userLoginBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundSize: 'cover',
  },
  contentWrapper: {
    height: '100%',
    position: 'relative',
    marginTop: '0',
  },
  formContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '10px 30px',
    background: '#fff',
    borderRadius: '6px',
    boxShadow: '1px 1px 2px #eee',
  },
  formItem: {
    position: 'relative',
    marginBottom: '25px',
    flexDirection: 'column',
  },
  formTitle: {
    margin: '0 0 20px',
    textAlign: 'center',
    color: '#3080fe',
    letterSpacing: '12px',
  },
  inputIcon: {
    position: 'absolute',
    left: '0px',
    top: '3px',
    color: '#999',
  },
  submitBtn: {
    width: '240px',
    background: '#3080fe',
    borderRadius: '28px',
  },
  checkbox: {
    marginLeft: '5px',
  },
  tips: {
    textAlign: 'center',
  },
  link: {
    color: '#999',
    textDecoration: 'none',
    fontSize: '13px',
  },
  line: {
    color: '#dcd6d6',
    margin: '0 8px',
  },
  error: {
  }
};
