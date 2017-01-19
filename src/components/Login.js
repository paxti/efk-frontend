'use strict';

import React, { PropTypes as T } from 'react'
import { Link } from 'react-router'
import {
  Button, Form, Input, FieldSet,
} from 'react-lightning-design-system';

import AuthService from '../utils/AuthService'
import LoginStore from '../stores/LoginStore'

import styles from '../styles/Login.css';

require('styles/Login.css');

class Login extends React.Component {

  componentDidMount() {
    LoginStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    LoginStore.removeChangeListener(this.onChange);
  }

  handleLogin() {
    this.props.route.auth.login({
      connection: 'Username-Password-Authentication',
      responseType: 'token',
      email: document.getElementById("username").value,
      password: document.getElementById("password").value
    }, function(err) {
      this.state.hasError = true;
      if (err) alert("something went wrong: " + err.message);
    })
  }

  render() {

    const styles = { padding: '12px' };
    const required = false;
    const error = LoginStore.error && 'The input has an error';

    return (
      <div className="slds-grid slds-grid--frame">
        <div className="slds-grid slds-col slds-medium-size--6-of-6 slds-large-size--6-of-12">
          <div className="slds-grid slds-grid--vertical-stretch">
            <div className="slds-col slds-medium-size--1-of-6 slds-large-size--3-of-12"></div>
            <div className="slds-col slds-medium-size--4-of-6 slds-large-size--6-of-12 slds-grid--vertical">
              <div className="slds-grid slds-grid--vertical-stretch slds-grid--vertical-align-center full-height slds-grid--vertical">
                <div className="slds-col slds-align-top"></div>
                <div className="slds-col slds-align-middle slds-grid--vertical-align-center ">
                  <img src="../images/logo.png" />
                  <div className="slds-form-element slds-box ">

                  <Form>
                    <Input
                      id='username'
                      label='Username'
                      type='email'
                      required={ required }
                      error={ error }
                    />
                    <Input
                      id='password'
                      label='Password'
                      type='password'
                      required={ required }
                      error={ error }
                    />
                    <Button type='brand' onClick={ this.handleLogin.bind(this) } >Submit</Button>
                  </Form>

                    <div className="slds-form-element slds-m-top--medium">
                      <a href="#" className="slds-text-link--reset">
                        <span className="slds-text-link">Forgot your password?</span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="full-width slds-align-bottom slds-text-align--center">
                    © 2017 Gateway Exhibits Services. All rights reserved
                </div>
              </div>
            </div>
            <div className="slds-col slds-medium-size--1-of-6 slds-large-size--3-of-12"></div>
          </div>

        </div>
        <div className="slds-col slds-medium-size--3-of-6 slds-large-size--6-of-12 slds-large-show login-page-right">
          <div className="styles.top">have you heard of gateway exhibit services?</div>
          <div className="middle">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the</div>
          <div className="bottom">
            <button type="button" className="slds-button slds-button--brand">Send</button>
          </div>
          </div>
        </div>

    )
  }
}

Login.displayName = 'Login';

export default Login;
