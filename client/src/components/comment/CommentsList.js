import { useState, useEffect } from "react";
import axios from "axios";

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ postId }) => {
  const [comments, setComments] = useState({});

  const fetchcomments = async (e) => {
    const res = await axios.get(
      `http://localhost:4001/posts/${postId}/comments`
    );
    setComments(res.data);
  };

  useEffect(() => {
    fetchcomments();
  }, []);

  const renderedComments = Object.values(comments).map((comment) => {
    return <li>{comment.content}</li>;
  });

  return <ul> {renderedComments}</ul>;
};
