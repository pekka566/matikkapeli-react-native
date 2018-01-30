// If level = 1 return numbers between 1 to 10.

export const createCalculation = level => {
  let min;
  let max;
  switch (level) {
    case 1:
      min = 1;
      max = 10;
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

const createChoisesArray = (result, choices, numOfChoices) => {
  if (choices.length === 0) {
    choices.push({ value: result, isCorrect: true });
  }
  if (choices.length === numOfChoices) {
    shuffleArray(choices);
    return;
  }

  const value = Math.floor(Math.random() * 20) + 1;
  if (
    choices.find(element => {
      return value === element.value;
    }) ||
    value < 1 ||
    value === result
  ) {
    createChoisesArray(result, choices, numOfChoices);
  } else {
    choices.push({ value, isCorrect: false });
    createChoisesArray(result, choices, numOfChoices);
  }
};

export const createChoices = result => {
  let choicesArr = [];
  createChoisesArray(result, choicesArr, 4);
  return choicesArr;
};
