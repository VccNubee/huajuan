import React, { Component } from 'react';
import Header from './component/header';
import Nav from './component/nav';
class App extends Component {
  render() {
    return (
      <div>
        {/*<Header></Header>*/}
        {/*<Nav></Nav>*/}
        {
          this.props.children
        }
      </div>
    );
  }
}

export default App;
