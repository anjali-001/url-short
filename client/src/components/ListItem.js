import React from "react";

function ListItem(props) {
  return (
    <li className="list-group-item" >
      <p className="text-light">url-{props.url}</p>
      <a href={`http://localhost:5000/${props.hash}`} target="_blank">
        <p className="text-light">{`http://localhost:5000/${props.hash}`}</p>
      </a>
    </li>
  );
}

export default ListItem;
