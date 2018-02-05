export const createCalculation = level => {
  let min;
  let max;
  switch (level) {
    case 1:
      min = 1;
      max = 10;
      break;
    case 2:
      min = 1;
      max = 20;
      break;
    case 3:
      min = 1;
      max = 10;
      break;
    case 999:
      min = 0;
      max = 99999;
      break;
    default:
      min = 0;
      max = 100;
  }

  // Level 1 -> only add operations
  // Level 2 -> add and subtraction operations
  // Level 3 -> all operations
  let operatorRandomIndex = 1;
  if (level === 2) {
    operatorRandomIndex = 2;
  } else if (level > 2) {
    operatorRandomIndex = 4;
  }
  const value = Math.floor(Math.random() * operatorRandomIndex) + 1;
  let operator = '+';
  switch (value) {
    case 2:
      operator = '-';
      break;
    case 3:
      operator = '*';
      break;
    case 4:
      operator = '/';
      break;
    default:
      operator = '+';
      break;
  }

  let firstNumber = Math.floor(Math.random() * max) + min;
  let secondNumber = Math.floor(Math.random() * max) + min;
  let result = firstNumber + secondNumber;
  if (operator === '-') {
    if (firstNumber < secondNumber) {
      let tmp = firstNumber;
      firstNumber = secondNumber;
      secondNumber = tmp;
    }
    result = firstNumber - secondNumber;
  } else if (operator === '*') {
    result = firstNumber * secondNumber;
  } else if (operator === '/') {
    firstNumber = firstNumber * secondNumber;
    result = firstNumber / secondNumber;
  }

  let calculation = {
    firstNumber,
    operation: operator,
    secondNumber,
    result
  };
  return calculation;
};

const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const createChoisesArray = (calculation, choices, numOfChoices, level) => {
  const result = calculation.result;
  if (choices.length === 0) {
    choices.push({ value: result, isCorrect: true });
  }
  if (choices.length === numOfChoices) {
    shuffleArray(choices);
    return;
  }

  const addOrMinusMax = numOfChoices * 2; // 8
  const random = Math.floor(Math.random() * addOrMinusMax) + 1; // 1 to 8
  const doAdd = Math.round(Math.random()) === 1; // 0 or 1 -> boolean
  const operator = calculation.operation;
  const secondNumber = doAdd
    ? calculation.secondNumber + random
    : calculation.secondNumber - random;
  let firstNumber = calculation.firstNumber;
  let value = firstNumber + secondNumber;
  if (operator === '-') {
    value = firstNumber - secondNumber;
  } else if (operator === '*') {
    value = firstNumber * secondNumber;
  } else if (operator === '/') {
    value = doAdd
      ? firstNumber / calculation.secondNumber + random * secondNumber
      : firstNumber / calculation.secondNumber - random * secondNumber;
  }

  value = Math.round(value);
  if (
    choices.find(element => {
      return value === element.value;
    }) ||
    value < 1 ||
    value === result ||
    value === Infinity ||
    value === NaN
  ) {
    createChoisesArray(calculation, choices, numOfChoices, level);
  } else {
    choices.push({ value, isCorrect: false });
    createChoisesArray(calculation, choices, numOfChoices, level);
  }
};

export const createChoices = (calculation, level) => {
  let choicesArr = [];
  createChoisesArray(calculation, choicesArr, 4, level);
  return choicesArr;
};
