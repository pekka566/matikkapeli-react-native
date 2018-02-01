import { createChoices } from './src/util/CalculationRandomizer';

it('random choices', () => {
  let calculation = {
    firstNumber: 1,
    operation: '+',
    secondNumber: 5,
    result: 6
  };
  let choices = createChoices(calculation, 1);
  expect(choices.length).toBe(4);
});
