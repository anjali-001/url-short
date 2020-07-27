import React from "react";

function ListItem(props) {
  return (

      
  <li className="list-group-item">{props.url} - <a href={`http://localhost:5000/${props.hash}`}target='_blank'>{`http://localhost:5000/${props.hash}`}</a></li>
     
   
  );
}

export default ListItem;
