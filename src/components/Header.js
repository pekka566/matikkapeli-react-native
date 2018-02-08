import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { FormattedMessage } from 'react-native-globalize';

const Header = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>
        <FormattedMessage message="gamename" />
      </Text>
      <View style={styles.view}>
        <Text style={styles.text}>
          <FormattedMessage message="Level" />
          {' ' +
            props.level +
            '-  ' +
            props.timeUsed +
            '/' +
            props.maxTime +
            ' s.'}
        </Text>
        <Text style={styles.text}>
          <FormattedMessage message="Points" />
          {': ' +
            props.points +
            ' - ' +
            props.count.done +
            '/' +
            props.count.total +
            '.'}
        </Text>
      </View>
    </View>
  );
};

Header.propTypes = {
  level: PropTypes.number.isRequired,
  timeUsed: PropTypes.number.isRequired,
  maxTime: PropTypes.number.isRequired,
  points: PropTypes.number.isRequired,
  count: PropTypes.object.isRequired
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
