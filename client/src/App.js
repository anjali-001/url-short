import React,{Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Route,Switch} from 'react-router-dom';
import Landing from './components/Landing';
import Home from './components/Home';
import Signin from './components/Signin';

class App extends Component {
  render(){
  return (
    <div>
      <Switch>
      <Route path='/' exact component={Landing}/>
      <Route path='/home' exact component={Home}/>
      <Route path='/signin' exact component={Signin}/>
      </Switch>
      
      
    </div>
  )};
}

export default App;
