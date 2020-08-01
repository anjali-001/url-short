import React, { Component } from "react";
import axios from "axios";
import { getToken } from "../utils/common";
import ListItem from "./ListItem";
import Navbar from "./Navbar";

export class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
    };
  }

  handleDelete = (id) => {
    console.log('id', id)
    axios.post("/api/shorten/delete",{id:id},{
        headers: { "auth-token": getToken() }    })
    .then(res=>{console.log('res', res)
    this.handleDetails()})
    .catch(err=>console.log('err', err));
  }

  componentDidMount() {
    this.handleDetails();
  }
  handleDetails=()=>{
    axios
      .get("/api/shorten/list", {
        headers: { "auth-token": getToken() },
      })
      .then((res) => {
        this.setState({
          list: res.data,
        });
      })
      .catch((err) => err);
  }
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <div className="p-3 container App-header-list">
          <ul className="list-group" >
            {this.state.list.map((item) => {
              return <ListItem key={item.id} url={item.url} _id={item.id} hash={item.hash} onDelete={this.handleDelete}/>;
            })}
          </ul>{" "}

        </div>
      </React.Fragment>
    );
  }
}

export default List;
