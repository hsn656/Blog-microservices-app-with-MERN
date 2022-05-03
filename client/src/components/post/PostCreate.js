import { useState } from "react";
import axios from "axios";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const [title, setTitle] = useState("");

  console.log(setTitle);
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
          <label>title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">submit</button>
      </form>
    </>
  );
};
