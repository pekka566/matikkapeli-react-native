import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Header = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Matikkapeli</Text>
      <View style={styles.view}>
        <Text style={styles.text}>
          Level {props.level} - {props.timeUsed}/{props.maxTime} s.
        </Text>
        <Text style={styles.text}>
          {props.count.done}/{props.count.total} points: {props.points} p.{' '}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.2,
    width: '100%',
    borderWidth: 0
  },
  view: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    width: '100%'
  },
  textTitle: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    width: '100%'
  }
});

export default Header;
