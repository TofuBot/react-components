/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { shallow } from 'enzyme';
import { shallowWithTheme } from '@zendeskgarden/react-testing';
import ModalView from './ModalView';

describe('ModalView', () => {
  it('renders default styling', () => {
    const wrapper = shallow(<ModalView />);

    expect(wrapper).toHaveClassName('c-dialog');
  });

  it('renders RTL styling if provided', () => {
    const wrapper = shallowWithTheme(<ModalView />, { rtl: true });

    expect(wrapper).toHaveClassName('is-rtl');
  });

  it('renders large styling if provided', () => {
    const wrapper = shallow(<ModalView large />);

    expect(wrapper).toHaveClassName('c-dialog--large');
  });

  it('renders animate styling if provided', () => {
    const wrapper = shallow(<ModalView animate />);

    expect(wrapper).toHaveClassName('is-open');
  });
});
