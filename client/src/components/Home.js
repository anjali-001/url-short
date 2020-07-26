import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {removeUserSession} from '../utils/common';

class Home extends Component {
    constructor(props){
        super(props)
    }

    handleSignout = () => {
        removeUserSession();
        this.props.history.push('/signin')
    }

    render(){
        return (
            <div>
                <nav className="navbar navbar-dark bg-dark">
                   <h3 className="text-light">URL Shortener</h3>
                    <Link to="/signin"><button className="btn btn-light btn-outline-secondary" onClick={this.handleSignout}>Sign Out</button></Link>
               </nav>
            </div>
        )
    }
    
}

export default Home
