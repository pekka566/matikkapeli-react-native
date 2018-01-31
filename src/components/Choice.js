import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import Button from 'apsl-react-native-button';

const Choice = props => (
  <View style={styles.container}>
    <Button
      style={styles.buttonStyle}
      onPress={() => {
        props.handlePress(props.value);
      }}
      isDisabled={props.buttonDisabled}
    >
      <View style={styles.buttonView}>
        <Text style={styles.buttonText}>{props.value}</Text>
      </View>
    </Button>
  </View>
);

Choice.defaultProps = {
  buttonDisabled: false
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '2%',
    marginRight: '2%'
  },
  buttonStyle: {
    backgroundColor: '#9b59b6',
    borderColor: '#333',
    borderWidth: 3,
    borderRadius: 10
  },
  buttonView: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  buttonText: {
    textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    fontSize: 36,
    color: '#fff',
    flex: 1,
    lineHeight: 100,
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 6
  }
});

export default Choice;
