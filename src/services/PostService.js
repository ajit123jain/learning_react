import http from "../http-common";

class PostService {
  fetchList(data) {
    return http.get("/posts/");
  }

  showPost(id, config) {
    return http.get(`/posts/${id}`, config);
  }

  updatePost(id, data, config){
    return http.patch(`/posts/${id}`, data, config);
  }

  deletePost(id, config){
    return http.delete(`/posts/${id}`, config);
  }

  createPost(data, config){
    return http.post("/posts/", data, config);
  }

  
}

export default new PostService();