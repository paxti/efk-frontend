/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */
'use strict';

// Uncomment the following lines to use the react test utilities
// import TestUtils from 'react-addons-test-utils';
import createComponent from 'helpers/shallowRenderHelper';

import MainMenu from 'components//MainMenu.js';

describe('MainMenu', () => {
  let component;

  beforeEach(() => {
    component = createComponent(MainMenu);
  });

  it('should have its component name as default className', () => {
    expect(true).to.equal(true);
  });
});
