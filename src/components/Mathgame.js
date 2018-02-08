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
      progress: 0,
      secondsTotalUsed: 0,
      pointsPerCalculation: level * 10,
      maxTime: 0
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
    const addToProgress = 0.005;
    const difficulties = this.props.level > 10 ? 2 : 1;
    const interval = 1000 / difficulties; // 1000 ms
    const maxTime = interval / addToProgress / 1000;
    this.setState({ progress, maxTime });
    this.timer = setInterval(() => {
      if (!this.state.buttonsDisabled && !this.state.final) {
        progress += addToProgress; // 200 seconds
        let secondsTotalUsed = this.state.secondsTotalUsed + interval / 1000;
        if (progress > 1) {
          this.handleTimeOut();
          progress = 0;
        }
        this.setState({
          progress,
          secondsTotalUsed
        });
      }
    }, interval);
  }

  buttonsDisabledCallback() {
    this.setState((prevState, props) => {
      const addPoints = prevState.answer.isCorrect
        ? this.state.pointsPerCalculation
        : 0;
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
        progress: 0,
        secondsTotalUsed: 0
      };
    });
  }

  handleAnswer(value) {
    const cor = this.state.choices.filter(choice => choice.isCorrect === true);
    const isCorrect = value === cor[0].value;
    const timePerCalculation = this.state.maxTime / this.state.count.total;
    this.setState((prevState, props) => {
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
          timeUsed={Math.trunc(this.state.secondsTotalUsed)}
          maxTime={this.state.maxTime}
        />
        {!this.state.final && <ProgressBar progress={this.state.progress} />}
        {this.state.final ? (
          <LevelCompleted
            points={this.state.points}
            handleRestart={value => this.handleRestart(value)}
            maxPoints={this.state.count.total * this.state.level * 10}
            restartGame={() => this.props.restartGame()}
            maxTime={this.state.maxTime}
            timeUsed={this.state.secondsTotalUsed}
            pointsPerCalculation={this.state.pointsPerCalculation}
            numOfCalculations={this.state.count.total}
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
