import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import Choice from './Choice';

const Choices = props => {
  const listItems = props.choices.map((choice, index) => (
    <Choice
      key={index}
      value={choice.value}
      handlePress={answer => {
        props.handleAnswer(answer);
      }}
      buttonDisabled={props.buttonsDisabled}
    />
  ));
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        paddingTop: '5%',
        paddingBottom: '5%'
      }}
    >
      {listItems}
    </View>
  );
};

Choices.defaultProps = {
  buttonsDisabled: false
};

Choices.prototypes = {
  choices: PropTypes.array.isRequired,
  handleAnswer: PropTypes.func.isRequired,
  buttonsDisabled: PropTypes.bool
};

export default Choices;
