//import liraries
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Calculation from './Calculation';
import Choices from './Choices';
import PropTypes from 'prop-types';

const CalculationAndChoices = props => {
  const calculation = (
    <Calculation calculation={props.calculation} answer={props.answer} />
  );

  const choices = (
    <Choices
      choices={props.choices}
      handleAnswer={answer => props.handleAnswer(answer)}
      buttonsDisabled={props.buttonsDisabled}
    />
  );
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around'
      }}
    >
      {calculation}
      {choices}
    </View>
  );
};

CalculationAndChoices.propTypes = {
  calculation: PropTypes.object.isRequired,
  answer: PropTypes.object,
  choices: PropTypes.array.isRequired,
  handleAnswer: PropTypes.func.isRequired,
  buttonsDisabled: PropTypes.bool.isRequired
};

export default CalculationAndChoices;
