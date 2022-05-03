import { useState, useEffect } from "react";
import axios from "axios";
import CommentCreate from "../comment/CommentCreate";
import CommentsList from "../comment/CommentsList";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const [posts, setPosts] = useState({});

  const fetchPosts = async (e) => {
    const res = await axios.get("http://localhost:4000/posts");
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div className="card col-md-3 col-5 mb-4 " key={post.id}>
        <div className="card-body">
          <h3>{post.title}</h3>
          <CommentsList postId={post.id} />
          <CommentCreate postId={post.id} />
        </div>
      </div>
    );
  });

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
};
