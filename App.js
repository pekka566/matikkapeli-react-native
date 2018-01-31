import React from 'react';
import Mathgame from './src/components/Mathgame';
import StartGame from './src/components/StartGame';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isStarting: true
    };
    this.restartGame = this.restartGame.bind(this);
    this.selectLevel = this.selectLevel.bind(this);
  }

  selectLevel(level) {
    this.setState(() => {
      return { isStarting: false, level };
    });
  }

  componentDidUpdate() {}

  restartGame() {
    this.setState({
      isStarting: true
    });
  }

  render() {
    return this.state.isStarting ? (
      <StartGame selectLevel={level => this.selectLevel(level)} />
    ) : (
      <Mathgame
        level={this.state.level}
        restartGame={() => this.restartGame()}
      />
    );
  }
}
