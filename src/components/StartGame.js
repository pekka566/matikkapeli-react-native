import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FormattedMessage } from 'react-native-globalize';
import { PropTypes } from 'react-native-globalize';
import Choice from './Choice';

class StartGame extends Component {
  render() {
    const msgFormatterLevel = this.context.globalize.getMessageFormatter(
      'Level'
    );
    const msgFormatterHard = this.context.globalize.getMessageFormatter('hard');
    return (
      <View style={styles.container}>
        <View style={{ flex: 0.6, justifyContent: 'space-around' }}>
          <Text style={styles.text}>
            <FormattedMessage message="Select_level" />
          </Text>
          <Choice
            value={msgFormatterLevel() + ' 1'}
            handlePress={value => {
              this.props.selectLevel(1);
            }}
          />
          <Choice
            value={msgFormatterLevel() + ' 2'}
            handlePress={value => {
              this.props.selectLevel(2);
            }}
          />
          <Choice
            value={msgFormatterLevel() + ' 3'}
            handlePress={value => {
              this.props.selectLevel(3);
            }}
          />
          <Choice
            value={msgFormatterLevel() + ' ' + msgFormatterHard()}
            handlePress={value => {
              this.props.selectLevel(999);
            }}
          />
        </View>
      </View>
    );
  }
}

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

StartGame.contextTypes = {
  globalize: PropTypes.globalizeShape
};

export default StartGame;
