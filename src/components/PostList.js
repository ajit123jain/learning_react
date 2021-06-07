import React, { Component } from 'react';
import PostService from "../services/PostService";
import { Link } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import Select from 'react-select';
import { withCookies, Cookies } from "react-cookie";

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postList: [],
      current_post: null,
      current_user_id: this.props.cookies.get('user_id'),
      currentIndex: -1,
      newPost: false,
      title: "",
      editor: "",
      selectedFile: null,
      selectedOption: null
    };

    this.fetchPostList = this.fetchPostList.bind(this);
    this.createNewPost = this.createNewPost.bind(this);
    this.newPost = this.newPost.bind(this);
    this.createNewPost = this.createNewPost.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  componentDidMount() {
    this.fetchPostList(this.state.current_user_id);
  }

  handleSelectChange(e){
    this.selectedOption = e.value
  }
  onChangeTitle(e){
    let title = e.target.value 
    this.setState({
      title: title
    })
  }

  handleEditorChange(e){
    let content = e.target.getContent();
    this.setState({
      editor: content
    })
  }
  onFileChange(event){
    this.setState({ selectedFile: event.target.files[0] });
  }

  setConfig(){
    var config = {
      headers: {
        'Authorization': window.localStorage.getItem("token")
      }
    }
    return config;
  }

  createNewPost(){
    let title = this.state.title
    let editor = this.state.editor 
    let config = this.setConfig();
    const formData = new FormData();
    formData.append(
        "post[image]",
        this.state.selectedFile,
        this.state.selectedFile.name
      );
      formData.append("post[title]", title)
      formData.append("post[description]", editor)
      formData.append("post[user_id]", this.props.current_user.id)
      formData.append("post[published]", false)
    PostService.createPost(formData, config)
      .then(response => {
        this.setState({
          new_post: false,
          title: "",
          description: ""
        })
      })
      .catch(e => {
        alert("Please try Again.") 
      });
  }

  newPost(){
    this.setState({
      newPost: true
    }) 
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
        'Authorization': window.localStorage.getItem("token"),
        'Tenant-Name':  window.localStorage.getItem("tenant-name")
      }
    }
    PostService.fetchList(data)
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
    let newPost = this.state.newPost
    let title = this.state.title
    let editor = this.state.editor
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
                </label>
                {current_post.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>
                {current_post.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>
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

          { newPost ?
            (
              <div>
                <h3>New Post</h3>
                <form multipart="true">
                  <div>
                    <input type="text" name="title" value={title} onChange={this.onChangeTitle} placeholder="Title" />
                    <br></br>
                    <input type="file" onChange={this.onFileChange} name="image" />
                    <Select
                      value={this.state.selectedOption}
                      onChange={this.handleSelectChange}
                      options={options}
                      style={{'margin-bottom': '50px'}}
                    />
                    <Editor
                      initialValue={editor}
                      init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                          'advlist autolink lists link image',
                          'charmap print preview anchor help',
                          'searchreplace visualblocks code',
                          'insertdatetime media table paste wordcount'
                        ],
                        toolbar:
                          'undo redo | formatselect | bold italic | \
                          alignleft aligncenter alignright | \
                          bullist numlist outdent indent | help'
                      }}
                      onChange={this.handleEditorChange}
                      name ="richeditor"
                    />
                  </div>
                  <div className="actions">
                    <button className="btn btn-sm btn-info" onClick={this.createNewPost}>Create Post</button>
                  </div>
                </form>
              </div>
            ) : (
              <div>
                <button onClick={this.newPost}>Add New Post</button>
              </div>
            )
          }
      </div>
    );
  }
}

export default withCookies(PostList);