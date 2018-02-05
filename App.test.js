import {
  createChoices,
  createCalculation
} from './src/util/CalculationRandomizer';

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

it('random choices, level 3', () => {
  let calculation = {
    firstNumber: 3,
    operation: '/',
    secondNumber: 1,
    result: 3
  };
  let choices = createChoices(calculation, 3);
  expect(choices.length).toBe(4);
});

it('create choices, level 1', () => {
  console.time('Timer level 1');
  for (let i = 0; i < 1000; i++) {
    let calc = createCalculation(1);
    let choices = createChoices(calc, 1);
    expect(choices.length).toBe(4);
  }
  console.timeEnd('Timer level 1');
});

it('create choices, level 2', () => {
  console.time('Timer level 2');
  for (let i = 0; i < 1000; i++) {
    let calc = createCalculation(2);
    let choices = createChoices(calc, 2);
    expect(choices.length).toBe(4);
  }
  console.timeEnd('Timer level 2');
});

it('create choices, level 3', () => {
  console.time('Timer level 3');
  for (let i = 0; i < 10000; i++) {
    let calc = createCalculation(3);
    let choices = createChoices(calc, 3);
    expect(choices.length).toBe(4);
  }
  console.timeEnd('Timer level 3');
});

it('create choices, level hard', () => {
  console.time('Timer level hard');
  for (let i = 0; i < 10000; i++) {
    let calc = createCalculation(999);
    let choices = createChoices(calc, 999);
    expect(choices.length).toBe(4);
  }
  console.timeEnd('Timer level hard');
});
