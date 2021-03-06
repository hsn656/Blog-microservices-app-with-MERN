import { useState } from "react";
import axios from "axios";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const [title, setTitle] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:4000/posts", {
      title,
    });
    setTitle("");
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control my-2"
          />
        </div>
        <button className="btn btn-success w-100 ">create</button>
      </form>
    </>
  );
};
