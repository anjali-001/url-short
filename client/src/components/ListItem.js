import React from "react";

function ListItem(props) {
  return (
    <li className="list-group-item" >
      <p className="text-light">url-{props.url}</p>
      <a href={`https://bitterlinks.herokuapp.com/${props.hash}`} target="_blank">
        <p className="text-light">{`https://bitterlinks.herokuapp.com/${props.hash}`}</p>
      </a>
    </li>
  );
}

export default ListItem;
