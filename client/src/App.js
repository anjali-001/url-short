import React,{Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import {Route,Switch} from 'react-router-dom';
import Landing from './components/Landing';
import Home from './components/Home';
import Signin from './components/Signin';
import Signup from './components/Signup';
import List from './components/List';
import Guide from './components/Guide';

class App extends Component {
  render(){
  return (
    <div>
      <Switch>
      <Route path='/' exact component={Landing}/>
      <Route path='/home' exact component={Home}/>
      <Route path='/signin' exact component={Signin}/>
      <Route path='/signup' exact component={Signup}/>
      <Route path='/list' exact component={List}/>
      <Route path='/guide' exact component={Guide}/>
      </Switch>
      
      <footer className="text-center fixed">Made with <i class="fa fa-heart-o" aria-hidden="true"></i> by <a href="https://www.github.com/anjali-001"target="_blank">Anjali</a></footer>

    </div>
  )};
}

export default App;
