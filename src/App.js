import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Summarize from './components/SummarizeComponent';
import {BrowserRouter} from 'react-router-dom'
import { Link, Route, Switch } from 'react-router-dom';
import Note from './components/NoteComponent';
import Discussion from './components/DiscussionComponent';
import Task from './components/TaskComponent';
import Cover from './components/CoverComponent';
class App extends Component {

  render() { 
  return (
    <div>
    <Header />
    <BrowserRouter>
        <Switch>
        <Route
          path="/note"
          component={Note}
          exact
        />
        <Route
          path="/tasks"
          component={Task}
        />
        <Route
          path="/discussions"
          component={Discussion}
        />
        <Route
            path=""
            component={Cover}
        />

        </Switch>
    </BrowserRouter> 
     {/* <Summarize /> */}
     <Footer />
    </div>
  );
  }
}

export default App;
