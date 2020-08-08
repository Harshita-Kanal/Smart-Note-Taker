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
import firebase, { auth, provider } from './firebase.js';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: null
    }

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  logout() {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
  }
  login() {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        });
      });
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    });
  }

  render() { 
  return (
    <div>
    <Header login= {this.login} logout = {this.logout} user = {this.state.user} />
    <BrowserRouter>
        <Switch>
        <Route
          path="/note"
            component={() => <Note login={this.login} logout={this.logout} user={this.state.user} />}
          exact
        />
        <Route
          path="/tasks"
            component={() => <Task login={this.login} logout={this.logout} user={this.state.user} />}
        />
        <Route
          path="/discussions"
          component={() => <Discussion login = {this.login} logout = {this.logout} user = {this.state.user}/>}
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
