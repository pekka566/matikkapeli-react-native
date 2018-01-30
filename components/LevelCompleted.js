import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Choice from './Choice';

const LevelCompleted = props => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>Level completed!</Text>
      </View>
      <View
        style={{
          paddingTop: '5%'
        }}
      >
        <Text style={styles.text}>You got {props.points} points.</Text>
      </View>
      <View
        style={{
          paddingTop: '20%'
        }}
      >
        <Choice
          value="Restart level"
          handlePress={value => {
            props.handleRestart(value);
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
    fontSize: 20,
    width: '100%',
    borderWidth: 0
  }
});

export default LevelCompleted;
