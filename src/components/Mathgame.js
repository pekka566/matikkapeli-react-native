import React from 'react';
import ReactNative, { StyleSheet, View, Text } from 'react-native';
import Header from './Header';
import CalculationAndChoices from './CalculationAndChoices';
import Footer from './Footer';
import LevelCompleted from './LevelCompleted';
import SoundPlayer from '../util/SoundPlayer';
import {
  createCalculation,
  createChoices
} from '../util/CalculationRandomizer';

export default class Mathgame extends React.Component {
  constructor(props) {
    super(props);
    const count = { done: 1, total: 20 };
    const level = props.level;
    const calculation = createCalculation(level);
    const choices = createChoices(calculation, level);
    this.state = {
      level,
      count,
      points: 0,
      calculation,
      choices,
      buttonsDisabled: false
    };
    this.handleAnswer = this.handleAnswer.bind(this);
    this.buttonsDisabledCallback = this.buttonsDisabledCallback.bind(this);
    this.handleRestart = this.handleRestart.bind(this);
  }

  componentDidMount() {}

  buttonsDisabledCallback() {
    this.setState((prevState, props) => {
      const addPoints = prevState.answer.isCorrect ? this.state.level * 10 : 0;
      const calculation = createCalculation(prevState.level);
      const choices = createChoices(calculation, prevState.level);

      return {
        count: {
          ...prevState.count,
          done: prevState.count.done + 1
        },
        points: prevState.points + addPoints,
        calculation,
        choices,
        answer: undefined,
        buttonsDisabled: false,
        final: prevState.count.done >= prevState.count.total - 1
      };
    });
  }

  handleRestart(value) {
    this.setState((prevState, props) => {
      const calculation = createCalculation(prevState.level);
      const choices = createChoices(calculation, prevState.level);

      return {
        count: { done: 1, total: prevState.count.total },
        points: 0,
        calculation,
        choices,
        answer: undefined,
        buttonsDisabled: false,
        final: false
      };
    });
  }

  handleAnswer(value) {
    const cor = this.state.choices.filter(choice => choice.isCorrect === true);
    const isCorrect = value === cor[0].value;

    this.setState(() => {
      return {
        buttonsDisabled: true,
        answer: { value, isCorrect }
      };
    });

    if (isCorrect) {
      SoundPlayer.playCorrectSound(this.buttonsDisabledCallback);
    } else {
      SoundPlayer.playWrongSound(this.buttonsDisabledCallback);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          level={this.state.level}
          count={this.state.count}
          points={this.state.points}
        />

        {this.state.final ? (
          <LevelCompleted
            points={this.state.points}
            handleRestart={value => this.handleRestart(value)}
            maxPoints={this.state.count.total * this.state.level * 10}
            restartGame={() => this.props.restartGame()}
          />
        ) : (
          <CalculationAndChoices
            calculation={this.state.calculation}
            answer={this.state.answer}
            choices={this.state.choices}
            buttonsDisabled={this.state.buttonsDisabled}
            handleAnswer={answer => this.handleAnswer(answer)}
          />
        )}
        <Footer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    borderWidth: 1
  }
});
