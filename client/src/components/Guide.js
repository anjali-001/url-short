import React, { Component } from "react";
import Navbar from './Navbar';

export default class Info extends Component {
  render() {
    return (
        <>
    <Navbar/>
      <div className=" App-header-guide
      container mt-5">
      <div className="card text-center">
        <div className="card-header" style={{backgroundColor:"#08353b", color:"white"}}>Information</div>
        <div className="card-body">
          <small className="card-title font-italic">This section is here to make sure that you have a seamless experience with Bitter Links</small>
          <p className="card-text">
            Bitter Links is a custom url shortener. Yep, it's as simple as it sounds. Let me walk you through the process once.
          </p>
          <ul className="text-left" style={{listStyle:"none"}}>
              <li className="m-2">Step 1: Paste the link you want to shorten in the box where you find "Link without https://". Make sure your link does not have https://  in it. We'll deal with that for you.</li>
              <li className="m-2">Step 2: Put a name of your choice in the box where it's written "Preferred name." If you give it a name then your link will have that name if it is be available, if you don't want to enter any name and just want to shorten the link because you think customzation is mainstream, that's cool too. No judegments there, we've got you covered.</li>
              <li className="m-2">Step 3: Click the button "Shorten" and VIOLA, you've got a shortenend link(with or without a custom name) for free.</li>
          </ul>
        </div>
        <small className="card-footer" style={{backgroundColor:"#08353b", color:"white"}}>Who likes long links, right? Shorten it.</small>
      </div>
      </div>  
      </>
    );
  }
}
