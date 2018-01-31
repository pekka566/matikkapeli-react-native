import React from 'react';
import Mathgame from './components/Mathgame';
import StartGame from './components/StartGame';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      isStarting: true,
      level: 1
    };

    this.selectLevel = this.selectLevel.bind(this);
  }

  selectLevel(level) {
    this.setState(() => {
      return { isStarting: false, level };
    });
  }

  render() {
    return this.state.isStarting ? (
      <StartGame selectLevel={level => this.selectLevel(level)} />
    ) : (
      <Mathgame level={this.state.level} />
    );
  }
}
