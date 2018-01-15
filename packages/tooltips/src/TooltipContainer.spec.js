import React from 'react';
import TooltipContainer from './TooltipContainer';
import { mount } from 'enzyme';

jest.mock('popper.js', () => {
  const PopperJS = jest.requireActual('popper.js');

  return class Popper {
    static placements = PopperJS.placements;

    constructor() {
      return {
        destroy: () => {},
        scheduleUpdate: () => {}
      };
    }
  };
});
jest.useFakeTimers();

describe('TooltipContainer', () => {
  const basicExample = <TooltipContainer
    id="custom-test-id"
    tooltip={({ getTooltipProps }) => <div {...getTooltipProps({ 'data-test-id': 'tooltip' })}>tooltip</div>}>
    {({ getTriggerProps }) => (
      <div {...getTriggerProps({ refKey: 'ref', 'data-test-id': 'trigger' })}>trigger</div>
    )}
  </TooltipContainer>;

  const findTooltip = wrapper => {
    return wrapper.find('[data-test-id="tooltip"]');
  }

  const findTrigger = wrapper => {
    return wrapper.find('[data-test-id="trigger"]');
  }

  describe('getTriggerProps', () => {
    it('should have tabIndex of 0', () => {
      const wrapper = mount(basicExample);

      expect(findTrigger(wrapper).prop('tabIndex')).toBe(0);
    });

    describe('aria-describedby', () => {
      it('should be empty when not visible', () => {
        const wrapper = mount(basicExample);

        expect(findTrigger(wrapper).prop('aria-describedby')).toBe(undefined);
      });

      it('should reference tooltip id when visible', () => {
        const wrapper = mount(basicExample);

        findTrigger(wrapper).simulate('focus');

        jest.runOnlyPendingTimers();
        wrapper.update();
        expect(findTrigger(wrapper).prop('aria-describedby')).toBe('custom-test-id--tooltip');
      });
    });

    describe('onFocus()', () => {
      it('should not display tooltip immediately when focused', () => {
        const wrapper = mount(basicExample);

        findTrigger(wrapper).simulate('focus');
        expect(findTooltip(wrapper).parent().prop('aria-hidden')).toBe(true);
      });

      it('should display tooltip after delay when focused', () => {
        const wrapper = mount(basicExample);

        findTrigger(wrapper).simulate('focus');

        jest.runOnlyPendingTimers();
        wrapper.update();
        expect(findTooltip(wrapper).parent().prop('aria-hidden')).toBe(false);
      });
    });

    describe('onBlur()', () => {
      it('should close tooltip immediately after blur', () => {
        const wrapper = mount(basicExample);

        findTrigger(wrapper).simulate('focus');
        findTrigger(wrapper).simulate('blur');

        jest.runOnlyPendingTimers();
        wrapper.update();
        expect(findTooltip(wrapper).parent().prop('aria-hidden')).toBe(true);
      });
    });

    describe('onMouseEnter()', () => {
      it('should not display tooltip immediately when clicked', () => {
        const wrapper = mount(basicExample);

        findTrigger(wrapper).simulate('mouseenter');
        expect(findTooltip(wrapper).parent().prop('aria-hidden')).toBe(true);
      });

      it('should display tooltip after delay when clicked', () => {
        const wrapper = mount(basicExample);

        findTrigger(wrapper).simulate('mouseenter');

        jest.runOnlyPendingTimers();
        wrapper.update();
        expect(findTooltip(wrapper).parent().prop('aria-hidden')).toBe(false);
      });
    });

    describe('onMouseLeave()', () => {
      it('should not hide tooltip immediately when mouseleaved', () => {
        const wrapper = mount(basicExample);

        findTrigger(wrapper).simulate('mouseenter');
        jest.runOnlyPendingTimers();
        wrapper.update();
        expect(findTooltip(wrapper).parent().prop('aria-hidden')).toBe(false);

        findTrigger(wrapper).simulate('mouseleave');
        wrapper.update();
        expect(findTooltip(wrapper).parent().prop('aria-hidden')).toBe(false);
      });

      it('should hide tooltip aften delay when mouseleaved', () => {
        const wrapper = mount(basicExample);

        findTrigger(wrapper).simulate('mouseenter');
        findTrigger(wrapper).simulate('mouseleave');

        jest.runOnlyPendingTimers();
        wrapper.update();
        expect(findTooltip(wrapper).parent().prop('aria-hidden')).toBe(true);
      });
    });
  });

  describe('getTooltipProps', () => {
    it('should have accessibility ID applied', () => {
      const wrapper = mount(basicExample);

      findTrigger(wrapper).simulate('mouseover');
      jest.runOnlyPendingTimers();
      wrapper.update();

      expect(findTooltip(wrapper).prop('id')).toBe('custom-test-id--tooltip');
    });

    it('should not close tooltip if mouseenter during close delay period', () => {
      const wrapper = mount(basicExample);

      findTrigger(wrapper).simulate('mouseenter');
      findTrigger(wrapper).simulate('mouseleave');
      findTooltip(wrapper).simulate('mouseenter');

      jest.runOnlyPendingTimers();
      wrapper.update();
      expect(findTooltip(wrapper).parent().prop('aria-hidden')).toBe(false);
    });

    it('should close tooltip if mouseleaveed', () => {
      const wrapper = mount(basicExample);

      findTrigger(wrapper).simulate('mouseenter');
      findTrigger(wrapper).simulate('mouseleave');
      findTooltip(wrapper).simulate('mouseenter');
      findTooltip(wrapper).simulate('mouseleave');

      jest.runOnlyPendingTimers();
      wrapper.update();
      expect(findTooltip(wrapper).parent().prop('aria-hidden')).toBe(true);
    });
  });
});
