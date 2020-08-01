import React from "react";

function ListItem(props) {
  return (
    <li className="list-group-item">
      <div className="row p-2">
        
      <p className="text-light pl-2">Link : {props.url}</p>
      <button className="ml-auto btn btn-outline-light  trash" onClick={()=>props.onDelete(props._id)}><i className="can text-light fa fa-trash-o" style={{fontSize:"18px"}} aria-hidden="true"></i></button>
      </div>
      
      <a href={`https://bitterlinks.herokuapp.com/${props.hash}`} target="_blank">
        <p className="text-light">Shortened Link : {`https://bitterlinks.herokuapp.com/${props.hash}`}</p>
      </a>
    </li>
  );
}

export default ListItem;
