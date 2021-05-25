import React, { Component } from 'react';
import PostService from "../services/PostService";
import { Link } from 'react-router-dom';

export default class Post extends Component 
{
  constructor(props){
    super(props);
    this.getPost = this.getPost.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);

    this.state = {
      current_post: {
        id: null,
        title: "",
        description: "",
        published: false
      }
    }
  }

  onChangeTitle(e)
  {
    let title = e.target.value 
    this.setState(prevState => ({
      current_post: {
        ...prevState.current_post,
        title: title
      }
    }));
  }

  onChangeDescription(e){
    let description = e.target.value 
    this.setState(prevState => ({
      current_post: {
        ...prevState.current_post,
        description: description
      }
    }))
  }
  setConfig(){
    var config = {
      headers: {
        'Authorization': window.localStorage.getItem("token")
      }
    }
    return config;
  }
  getPost(id){
    var config = {
      headers: {
        'Authorization': window.localStorage.getItem("token")
      }
    }
    PostService.showPost(id, config)
      .then(response => {
        this.setState({
          current_post: response.data
        })
      })
      .catch(e => {
        this.props.history.push('/posts')
      });
  }
  updatePublished(){
   let current_post = this.state.current_post
    var data = {
      id: current_post.id,
      title: current_post.title,
      description: current_post.description,
      published: !current_post.published
    }

    let config = this.setConfig();
    PostService.updatePost(current_post.id, data, config)
      .then(response => {
        this.setState({
          current_post: response.data
        })
        this.props.history.push(`posts/${current_post.id}`)
      })
      .catch(e => {
        alert("Please try Again.") 
      });

  }
  updatePost(){
    let current_post = this.state.current_post
    var data = {
      id: current_post.id,
      title: current_post.title,
      description: current_post.description,
      published: current_post.published
    }

    let config = this.setConfig();
    PostService.updatePost(current_post.id, data, config)
      .then(response => {
        this.setState({
          current_post: response.data
        })
        this.props.history.push(`posts/${current_post.id}`)
      })
      .catch(e => {
        alert("Please try Again.") 
      });
  }

  deletePost(){
    let current_post = this.state.current_post
    let config = this.setConfig(); 
    PostService.deletePost(current_post.id, config)
      .then(response => {
        this.props.history.push('/posts')
      })
      .catch(e => {
        alert("Please try Again.") 
      });

  }
  componentDidMount() {
    this.getPost(this.props.match.params.id);
  }

  render(){
    let { current_post } =  this.state
    return (
      <div>
        <h3>Post</h3>
        <form>
          <div>
            <input type="text" name="title" value={current_post.title} onChange={this.onChangeTitle} />
            <input type="text" name="description" value={current_post.description} onChange={this.onChangeDescription} />
            <label>Status: {current_post.published? "Published" : "Pending"}</label>
          </div>
          <div className="actions">
            <button className="btn btn-sm btn-info" onClick={this.updatePublished}>{current_post.published? "Unpublish" : "Publish"}</button>
            <button className="btn btn-sm btn-info" onClick={this.updatePost}>Update</button>
            <button className="btn btn-sm btn-info" onClick={this.deletePost}>Delete</button>
          </div>
        </form>
      </div>
    )
  }
}