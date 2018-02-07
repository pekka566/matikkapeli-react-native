import React from 'react';
import { shallow } from 'enzyme';
import Choice from '../src/components/Choice';

it('renders without crashing', () => {
  const handlePressMock = jest.fn();
  const wrapper = shallow(
    <Choice
      buttonDisabled={false}
      value={'Press mee!'}
      handlePress={handlePressMock}
    />
  );
  expect(wrapper).toMatchSnapshot();
  expect(wrapper.find('Button').length).toBe(1);
  expect(wrapper.find('Text').length).toBe(1);
  expect(wrapper.find('View').length).toBe(2);
  expect(
    wrapper
      .find('Button')
      .first()
      .props().isDisabled
  ).toBe(false);

  wrapper
    .find('Button')
    .first()
    .props()
    .onPress();
  expect(handlePressMock.mock.calls.length).toBe(1);

  wrapper.setProps({
    buttonDisabled: true
  });
  expect(
    wrapper
      .find('Button')
      .first()
      .props().isDisabled
  ).toBe(true);

  wrapper
    .find('Button')
    .first()
    .props()
    .onPress();
  expect(handlePressMock.mock.calls.length).toBe(2); // it is still possible to press in test even the button is disabled!
});
