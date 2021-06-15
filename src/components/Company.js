import React, { Component } from 'react';
import PostService from "../services/PostService";
import { Link } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import Select from 'react-select';
import { withCookies, Cookies } from "react-cookie";

class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyList: [],
      current_user_id: this.props.cookies.get('user_id'),
    };

    this.fetchCompanyList = this.fetchCompanyList.bind(this);
  }

  componentDidMount() {
    this.fetchCompanyList(this.state.current_user_id);
  }

  fetchCompanyList(user_id) {
    var data = {user_id: user_id}
    PostService.fetchCompanyList(data)
      .then(response => {
        this.setState({
          companyList: response.data.company.data
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
    let companyList = this.state.companyList
    return (
      <div className="posts">
        <div className="posts-list">
          <ul className="list-group">
          {companyList &&
              companyList.map((company, index) => (
                <li key={index}
                >
                  {company.attributes.name}
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default withCookies(Company);