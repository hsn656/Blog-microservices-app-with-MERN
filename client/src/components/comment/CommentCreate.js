import { useState } from "react";
import axios from "axios";

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ postId }) => {
  const [content, setContent] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
      content,
    });
    setContent("");
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            placeholder="new comment..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-control my-2"
          />
        </div>
        <button className="btn btn-primary w-100 ">add</button>
      </form>
    </>
  );
};
