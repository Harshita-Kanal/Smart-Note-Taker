import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Summarize from './components/SummarizeComponent';

class App extends Component {

  render() { 
  return (
    <div>
     <Header />
     <Summarize />
     <Footer />
    </div>
  );
  }
}

export default App;
