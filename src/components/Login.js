'use strict';

import React, { PropTypes as T } from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router';
import Button from 'react-lightning-design-system/lib/scripts/Button'
import Form from 'react-lightning-design-system/lib/scripts/Form'
import Input from 'react-lightning-design-system/lib/scripts/Input'
import AuthService from '../utils/AuthService'

import styles from '../styles/Login.css'

class Login extends React.Component {

  static contextTypes = {
    router: T.object
  }

  static propTypes = {
    location: T.object,
    auth: T.instanceOf(AuthService)
  }

  getAuthParams() {
    return {
      email: ReactDOM.findDOMNode(this.refs.email).value,
      password: ReactDOM.findDOMNode(this.refs.password).value
    }
  }

  login(e) {
    e.preventDefault()
    const { email, password } = this.getAuthParams()
    this.props.auth.login(email, password)
  }

  render() {

    const required = false;
    const login = () => this.login.bind(this);

    return (
      <div className="slds-grid slds-grid--frame">
        <div className="slds-grid slds-col slds-medium-size--6-of-6 slds-large-size--6-of-12">
          <div className="slds-grid slds-grid--vertical-stretch">
            <div className="slds-col slds-medium-size--1-of-6 slds-large-size--3-of-12"></div>
            <div className="slds-col slds-medium-size--4-of-6 slds-large-size--6-of-12 slds-grid--vertical">
              <div className={`${styles.full_height} + slds-grid slds-grid--vertical-stretch slds-grid--vertical-align-center slds-grid--vertical`}>
                <div className="slds-col slds-align-top"></div>
                <div className="slds-col slds-align-middle slds-grid--vertical-align-center ">
                  <img src={require('../images/logo.png')} />
                  <div className="slds-form-element slds-box ">

                    <Form>
                      <Input
                        id='username'
                        label='Username'
                        type='email'
                        ref='email'
                        required={ false }
                      />
                      <Input
                        id='password'
                        label='Password'
                        type='password'
                        ref='password'
                        required={ false }
                      />

                      <Button type="brand" onClick={ this.login.bind(this) }>Login</Button>

                    </Form>

                      <div className="slds-form-element slds-m-top--medium">
                        <a href="#" className="slds-text-link--reset">
                          <span className="slds-text-link">Forgot your password?</span>
                        </a>
                      </div>
                  </div>
                </div>
                <div className={`${styles.full_width} + slds-align-bottom slds-text-align--center`}>
                    © 2017 Gateway Exhibits Services. All rights reserved
                </div>
              </div>
            </div>
            <div className="slds-col slds-medium-size--1-of-6 slds-large-size--3-of-12"></div>
          </div>
        </div>
        <div className={`${styles.login_page_right} + slds-col slds-medium-size--3-of-6 slds-large-size--6-of-12 slds-large-show`}>
          <div className={styles.top}>have you heard of gateway exhibit services?</div>
          <div className={styles.middle}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the</div>
          <div className={styles.bottom}>
            <button type="button" className="slds-button slds-button--brand">Send</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;
