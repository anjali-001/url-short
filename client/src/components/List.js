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
  componentDidMount() {
    axios
      .get("http://localhost:5000/api/shorten/list", {
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
        <div className="container p-3">
          <ul className="list-group">
            {this.state.list.map((item) => {
              return <ListItem key={item.id} url={item.url} hash={item.hash} />;
            })}
          </ul>{" "}
        </div>
      </React.Fragment>
    );
  }
}

export default List;
