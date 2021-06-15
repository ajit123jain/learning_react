import React, { Component } from 'react';
import PostService from "../services/PostService";
import { Link } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import Select from 'react-select';
import { withCookies, Cookies } from "react-cookie";

class Domain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      domainList: [],
      current_user_id: this.props.cookies.get('user_id'),
    };

    this.fetchDomainList = this.fetchDomainList.bind(this);
  }

  componentDidMount() {
    this.fetchDomainList(this.state.current_user_id);
  }

  fetchDomainList(user_id) {
    var data = {user_id: user_id}
    PostService.fetchDomainList(data)
      .then(response => {
   
        this.setState({
          domainList: response.data.domains
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
    let domainList = this.state.domainList
    return (
      <div className="posts">
        <div className="posts-list">
          <ul className="list-group">
          {domainList &&
              domainList.map((company, index) => (
                <li key={index}
                >
                  {company.name}
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default withCookies(Domain);