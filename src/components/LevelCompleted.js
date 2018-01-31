import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Choice from './Choice';
import goldStarImg from '../assets/gold_star_200.png';
import blueStarImg from '../assets/blue_star_200.png';

const LevelCompleted = props => {
  const correctPercent = props.points / props.maxPoints * 100;
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 0.15
        }}
      >
        <Text style={styles.text}>Level completed!</Text>
      </View>
      <View
        style={{
          flex: 0.15
        }}
      >
        <Text style={styles.text}>You got {props.points} points.</Text>
      </View>
      <View
        style={{ flexDirection: 'row', flex: 0.2, justifyContent: 'center' }}
      >
        <Image
          source={correctPercent > 20 ? goldStarImg : blueStarImg}
          style={styles.img}
        />
        <Image
          source={correctPercent > 50 ? goldStarImg : blueStarImg}
          style={styles.img}
        />
        <Image
          source={correctPercent > 80 ? goldStarImg : blueStarImg}
          style={styles.img}
        />
      </View>
      <View
        style={{
          flex: 0.6,
          justifyContent: 'flex-end'
        }}
      >
        <Choice
          value="Restart level"
          handlePress={value => {
            props.handleRestart(value);
          }}
        />
        <Choice
          value="Restart game"
          handlePress={() => {
            props.restartGame();
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
  },
  img: {
    width: 40,
    height: 40
  }
});

export default LevelCompleted;
