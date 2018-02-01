import React from 'react';
import ReactNative, { StyleSheet, View, Text } from 'react-native';
import Header from './Header';
import CalculationAndChoices from './CalculationAndChoices';
import Footer from './Footer';
import LevelCompleted from './LevelCompleted';
import ProgressBar from './ProgressBar';
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
      buttonsDisabled: false,
      progress: 0
    };
    this.handleAnswer = this.handleAnswer.bind(this);
    this.buttonsDisabledCallback = this.buttonsDisabledCallback.bind(this);
    this.handleRestart = this.handleRestart.bind(this);
    this.handleTimeOut = this.handleTimeOut.bind(this);
  }

  componentDidMount() {
    this.animate();
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  animate() {
    let progress = 0;
    this.setState({ progress });
    let difficulties = this.props.level > 10 ? 2 : 1;
    this.timer = setInterval(() => {
      if (!this.state.buttonsDisabled) {
        progress += 0.005; // 200 seconds
        if (progress > 1) {
          this.handleTimeOut();
          progress = 0;
        }
        this.setState({ progress });
      }
    }, 1000 / difficulties);
  }

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

  handleTimeOut() {
    this.setState({ final: true });
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
        final: false,
        progress: 0
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
        {!this.state.final && <ProgressBar progress={this.state.progress} />}
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
    borderWidth: 0
  }
});
