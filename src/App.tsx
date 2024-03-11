import { useState } from "react";
import "./App.css";
import Posts from "./components/Posts";

function App() {
  const [showPost, setShowPost] = useState(true);

  return <div className="App">
     <button onClick={()=>setShowPost(!showPost)}>show Post</button>
    {showPost && <Posts />}</div>;
}

export default App;
