import React from 'react'
import {Link} from 'react-router-dom';
function Landing() {
    return (
        <>
          <div className="App-header-landing">
          <h2 className="px-4" style={{backgroundColor:"#08353b",color:"#ffffff",borderRadius:"5px"}}> Bitter <span style={{backgroundColor:"white",padding:"0 3px"}}>links</span></h2>

            <Link to="/signup"><button className="btn btn-outline-secondary btn-style pr-5 pl-5 m-1">Sign Up</button></Link>
            <Link to="/signin"><button className="btn btn-outline-secondary btn-style pr-5 pl-5 m-1">Sign In</button></Link>
        </div>
        </>
    )
}

export default Landing
