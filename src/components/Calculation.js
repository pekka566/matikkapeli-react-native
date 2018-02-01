import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const Calculation = props => {
  const styles = {
    container: {
      flex: 0.1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '1%',
      flexDirection: 'row'
    },
    text: {
      textAlign: 'center',
      flex: 1,
      fontWeight: 'bold',
      fontSize: 30,
      textShadowOffset: { width: 1, height: 1 },
      color: props.answer
        ? props.answer.isCorrect ? 'green' : 'red'
        : 'rgb(50, 50, 50)'
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {props.calculation.firstNumber + ' '}
        {props.calculation.operation}
        {' ' + props.calculation.secondNumber + ' = '}
        {props.answer ? props.answer.value : ''}
      </Text>
    </View>
  );
};

Calculation.propTypes = {
  calculation: PropTypes.object.isRequired,
  answer: PropTypes.object
};

export default Calculation;
