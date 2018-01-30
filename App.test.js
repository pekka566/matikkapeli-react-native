import { createChoices } from './util/CalculationRandomizer';

it('random choices', () => {
  let choices = createChoices(5);
  expect(choices.length).toBe(4);
});
