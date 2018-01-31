import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Choice from './Choice';

const StartGame = props => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 0.6, justifyContent: 'space-around' }}>
        <Text style={styles.text}>Select level</Text>
        <Choice
          value="Level 1"
          handlePress={value => {
            props.selectLevel(1);
          }}
        />
        <Choice
          value="Level 2"
          handlePress={value => {
            props.selectLevel(2);
          }}
        />
        <Choice
          value="Level crazy!"
          handlePress={value => {
            props.selectLevel(999);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%'
  },
  text: {
    textAlign: 'center',
    fontSize: 48,
    width: '100%',
    borderWidth: 0
  }
});

export default StartGame;
