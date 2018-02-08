import 'react-native';
import React from 'react';
import Choices from '../src/components/Choices';
import { createChoices } from '../src/util/CalculationRandomizer';

import renderer from 'react-test-renderer';

const choices = [
  { value: 14, isCorrect: false },
  { value: 18, isCorrect: false },
  { value: 11, isCorrect: true },
  { value: 17, isCorrect: false }
];
const handlePressMock = jest.fn();

it('renders correctly', () => {
  const tree = renderer
    .create(<Choices choices={choices} handleAnswer={handlePressMock} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
