import React, { Component } from 'react';
import ccc from './App.module.scss';
import Header from './component/header';
import Nav from './component/nav';
class App extends Component {
  render() {
    return (
      <div className={ccc.App} >
        <Header></Header>
        <Nav></Nav>
        {
          this.props.children
        }
      </div>
    );
  }
}

export default App;
