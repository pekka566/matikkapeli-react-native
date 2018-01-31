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
    case 999:
      min = 0;
      max = 99999;
      break;
    default:
      min = 0;
      max = 100;
  }

  const firstNumber = Math.floor(Math.random() * max) + min;
  const secondNumber = Math.floor(Math.random() * max) + min;
  const result = firstNumber + secondNumber;

  let calculation = {
    firstNumber,
    operation: '+',
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

const createChoisesArray = (result, choices, numOfChoices, level) => {
  if (choices.length === 0) {
    choices.push({ value: result, isCorrect: true });
  }
  if (choices.length === numOfChoices) {
    shuffleArray(choices);
    return;
  }
  const random = Math.random() * level;
  const value = Math.floor(random) + 1;

  if (
    choices.find(element => {
      return value === element.value;
    }) ||
    value < 1 ||
    value === result
  ) {
    createChoisesArray(result, choices, numOfChoices, level);
  } else {
    choices.push({ value, isCorrect: false });
    createChoisesArray(result, choices, numOfChoices, level);
  }
};

export const createChoices = (result, level) => {
  if (level > 100) {
    level = level * 200;
  } else {
    level = level * 20;
  }

  let choicesArr = [];
  createChoisesArray(result, choicesArr, 4, level);
  return choicesArr;
};
