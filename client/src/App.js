import PostCreate from "./components/post/PostCreate";
import PostsList from "./components/post/PostsList";

function App() {
  return (
    <div className="container mt-3">
      <div className="w-50 m-auto">
        <h1>Create Post</h1>
        <PostCreate />
      </div>
      <hr />
      <h1 className="my-4">Posts</h1>
      <PostsList />
    </div>
  );
}

export default App;
