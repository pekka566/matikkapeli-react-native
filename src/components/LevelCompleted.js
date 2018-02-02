import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { FormattedMessage, PropTypes } from 'react-native-globalize';
import Choice from './Choice';
import goldStarImg from '../assets/gold_star_200.png';
import blueStarImg from '../assets/blue_star_200.png';

class LevelCompleted extends Component {
  render() {
    const msgFormatterLevel = this.context.globalize.getMessageFormatter(
      'Restart_level'
    );
    const msgFormatterGame = this.context.globalize.getMessageFormatter(
      'Restart_game'
    );

    const correctPercent = this.props.points / this.props.maxPoints * 100;
    const correctAnswers =
      this.props.points / (this.props.maxPoints / this.props.numOfCalculations);
    return (
      <View style={styles.container}>
        <View
          style={{
            flex: 0.1
          }}
        >
          <Text style={styles.text}>
            <FormattedMessage message="Level_completed" />
          </Text>
        </View>
        <View
          style={{
            flex: 0.3
          }}
        >
          <Text style={styles.text}>
            <FormattedMessage message="Correct_answers" />
            {' ' + correctAnswers + '/' + this.props.numOfCalculations + '. '}
            <FormattedMessage
              message="Got_points"
              points={this.props.points}
            />{' '}
          </Text>
          <Text style={styles.text}>
            <FormattedMessage
              message="Time_used"
              seconds={this.props.timeUsed}
            />
          </Text>
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
            value={msgFormatterLevel()}
            handlePress={value => {
              this.props.handleRestart(value);
            }}
          />
          <Choice
            value={msgFormatterGame()}
            handlePress={() => {
              this.props.restartGame();
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
    fontSize: 16,
    width: '100%',
    borderWidth: 0
  },
  img: {
    width: 40,
    height: 40
  }
});

LevelCompleted.contextTypes = {
  globalize: PropTypes.globalizeShape
};

export default LevelCompleted;
