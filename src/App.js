import React, { Component } from 'react';
import Header from './component/header';
import Nav from './component/nav';
import Footer from './component/footer'
import {BackTop} from "antd";
class App extends Component {
  render() {
    return (
      <div>
        <Header></Header>
        <Nav></Nav>
        {
          this.props.children
        }
        <Footer/>
        <BackTop visibilityHeight={600}/>
      </div>
    );
  }
}

export default App;
