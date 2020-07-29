import React from "react";

function ListItem(props) {
  return (

      
  // <li className="list-group-item">{props.url} - <a href={`http://localhost:5000/${props.hash}`}target="_blank">{`http://localhost:5000/${props.hash}`}</a></li>
  <tr className="table-light row">
  <td className="col-12 col-md-6 col-lg-6"><p>{props.url}</p></td>
  <td className="col-12 col-md-6 col-lg -6"><a href={`http://localhost:5000/${props.hash}`}target="_blank">{`http://localhost:5000/${props.hash}`}</a></td>
  {/* <td>2 days ago</td> */}
</tr>
   
  );
}

export default ListItem;
