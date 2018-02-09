import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';

// create a component
const ProgressBar = props => {
  return (
    <View style={styles.container}>
      <Progress.Bar
        style={styles.progress}
        progress={props.progress}
        indeterminate={false}
        width={300}
        color="#9b59b6"
        borderColor="black"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderWidth: 0
  },
  progress: {
    margin: 10
  }
});

export default ProgressBar;
