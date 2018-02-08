import 'react-native';
import React from 'react';
import CalculationAndChoices from '../src/components/CalculationAndChoices';
import { createChoices } from '../src/util/CalculationRandomizer';

import renderer from 'react-test-renderer';

const calculation = {
  firstNumber: 5,
  operation: '+',
  secondNumber: 6,
  result: 11
};

const choices = [
  { value: 14, isCorrect: false },
  { value: 18, isCorrect: false },
  { value: 11, isCorrect: true },
  { value: 17, isCorrect: false }
];
const handlePressMock = jest.fn();

it('renders correctly', () => {
  const tree = renderer
    .create(
      <CalculationAndChoices
        calculation={calculation}
        choices={choices}
        handleAnswer={handlePressMock}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
