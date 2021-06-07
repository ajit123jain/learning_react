import http from "../http-common";

class PostService {
  fetchList(data) {
    return http.get("/posts/");
  }

  showPost(id) {
    return http.get(`/posts/${id}`);
  }

  updatePost(id, data){
    return http.patch(`/posts/${id}`, data);
  }

  deletePost(id){
    return http.delete(`/posts/${id}`);
  }

  createPost(data){
    return http.post("/posts/", data);
  }

  
}

export default new PostService();