import React, { Component } from 'react';
import DataTable from 'react-data-table-component';
import PostService from "../services/PostService";


const data = [{ id: 1, title: 'Conan the Barbarian', description: '1982' }];
const columns = [
  {
    name: 'ID',
    selector: 'id',
    sortable: true,
  },
  {
    name: 'Title',
    selector: 'title',
    sortable: true,
  },
  {
    name: 'Description',
    selector: 'description',
    sortable: true,
    right: true,
  },
  {
    name: 'Action',
    button: true,
    cell: row => <div><a href='https://google.com' target="_blank" rel="noopener noreferrer">Download</a><br></br>
                <a href='https://google.com' target="_blank" rel="noopener noreferrer">Download</a></div>,
  },
];

export default class Home extends Component {

  constructor(props){
    super(props)
    this.state = {
      postList: [],
      user_id: props.user_id
    }
  }

  fetchPostList(user_id) {
    var data = {user_id: user_id}
    var config = {
      headers: {
        'Authorization': window.localStorage.getItem("token")
      }
    }
    PostService.fetchList(data, config)
      .then(response => {
        this.setState({
          postList: response.data
        })
      })
      .catch(e => {
        this.setState({
          errors: "Please try Again."
        });
      });
  }


  componentDidMount(){
    this.fetchPostList(this.state.current_user_id);
  }

  render() {
    const postList = this.state.postList
    return (
      <DataTable
        title="Arnold Movies"
        columns={columns}
        data={postList}
        pagination
      />
    )
  }
};