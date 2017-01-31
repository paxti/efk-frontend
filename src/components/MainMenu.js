'use strict';

import React from 'react';

import '../styles/MainMenu.css'

class MainMenu extends React.Component {

  render() {
    return (

      <header id="main-header" className="slds-global-header_container">
        <a href="javascript:void(0);" className="slds-assistive-text slds-assistive-text--focus">Skip to Navigation</a>
        <a href="javascript:void(0);" className="slds-assistive-text slds-assistive-text--focus">Skip to Main Content</a>
        <div className="slds-global-header slds-grid slds-grid--align-spread">
        <div className="slds-global-header__item">
          <div className="slds-global-header__logo">
            <img src={require('../images/logo.png')} />
          </div>
        </div>

        <ul className="slds-global-header__item slds-grid slds-grid--vertical-align-center">

          <li className="slds-dropdown-trigger slds-dropdown-trigger--click slds-m-left--x-small">
            <button className="slds-button" title="person name" aria-haspopup="true">
              <span className="slds-avatar slds-avatar--circle slds-avatar--medium">
                <img src="/assets/images/avatar2.jpg" alt="person name" />
              </span>
            </button>
          </li>
        </ul>
      </div>


      <div className="slds-context-bar">
        <div className="slds-context-bar__primary slds-context-bar__item--divider-right">
          <div className="slds-context-bar__item slds-context-bar__dropdown-trigger slds-dropdown-trigger slds-dropdown-trigger--click slds-no-hover">
            <div className="slds-context-bar__icon-action">
              <a className="slds-icon-waffle_container slds-context-bar__button">
                <div className="slds-icon-waffle">
                  <div className="slds-r1"></div>
                  <div className="slds-r2"></div>
                  <div className="slds-r3"></div>
                  <div className="slds-r4"></div>
                  <div className="slds-r5"></div>
                  <div className="slds-r6"></div>
                  <div className="slds-r7"></div>
                  <div className="slds-r8"></div>
                  <div className="slds-r9"></div>
                </div>
                <span className="slds-assistive-text">Open App Launcher</span>
              </a>
            </div>
            <span className="slds-context-bar__label-action slds-context-bar__app-name">
              <span className="slds-truncate" title="{ this.props.appName || &#x27;App Name&#x27; }">{this.props.appName}</span>
            </span>
          </div>
        </div>
        <nav className="slds-context-bar__secondary" role="navigation">
          <ul className="slds-grid">
            {this.props.children}
          </ul>
        </nav>
      </div>
</header>    );
  }
}

MainMenu.displayName = 'MainMenu';

// Uncomment properties you need
// MainMenuComponent.propTypes = {};
// MainMenuComponent.defaultProps = {};

export default MainMenu;
