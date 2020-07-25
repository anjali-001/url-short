import React from 'react'
import Signup from './Signup'

import {Link} from 'react-router-dom';
import Signin from './Signin';

function Landing() {
    return (
        <div>
            <h1>Hello from Landing</h1>
            <Signup/>
            
        </div>
    )
}

export default Landing
