import React from 'react';
import { shallow } from 'enzyme';
import Calculation from '../src/components/Calculation';

describe('<Calculation>', () => {
  let calculation = {
    firstNumber: 5,
    operation: '+',
    secondNumber: 6,
    result: 11
  };

  let calculation2 = {
    firstNumber: 15,
    operation: '+',
    secondNumber: 16,
    result: 31
  };
  const Component = <Calculation calculation={calculation}> </Calculation>;

  describe('Structure', () => {
    it('renders correctly', () => {
      const wrapper = shallow(Component);
      expect(wrapper).toMatchSnapshot();
    });

    it('renders calculation prop correctly', () => {
      const wrapper = shallow(Component);
      wrapper.setProps({ calculation: calculation2 });
      expect(wrapper).toMatchSnapshot();
    });

    it('renders props correctly', () => {
      const wrapper = shallow(Component);
      wrapper.setProps({ calculation: calculation2, answer: { value: 444 } });
      expect(wrapper).toMatchSnapshot();
    });
  });
});
