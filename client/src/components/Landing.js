import React from 'react'
import Signup from './Signup'

import {Link} from 'react-router-dom';
import Signin from './Signin';

function Landing() {
    return (
        <div>
           <nav className="navbar navbar-dark bg-dark">
               <h3 className="text-light">URL Shortener</h3>
               {/* <p>Already registered? Sign in here</p> */}
                <Link to="/signin"><button className="btn btn-light btn-outline-secondary">Signin</button></Link>
           </nav>
            <Signup/>
            
        </div>
    )
}

export default Landing
