import React, { Component } from 'react';
import PostService from "../services/PostService";
import { Link } from 'react-router-dom';

export default class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postList: [],
      current_post: null,
      current_user_id: props.user_id,
      currentIndex: -1
    };

    this.fetchPostList = this.fetchPostList.bind(this);
  }

  componentDidMount() {
    this.fetchPostList(this.state.current_user_id);
  }

  setActivePost(post, index) {
    this.setState({
      current_post: post,
      currentIndex: index
    });
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

  render() {
    let user_id = this.state.current_user_id
    let postList = this.state.postList
    let currentIndex = this.state.currentIndex
    let current_post = this.state.current_post
    return (
      <div className="posts">
        <div className="posts-list">
          <ul className="list-group">
          {postList &&
              postList.map((post, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActivePost(post, index)}
                  key={index}
                >
                  {post.title}
                </li>
              ))}
          </ul>
        </div>
        {current_post ? (
            <div>
              <h4>Post</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {current_post.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {current_post.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {current_post.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/posts/" + current_post.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Post...</p>
            </div>
          )}
      </div>
    );
  }
}