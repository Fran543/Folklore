// import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Navigation,
  Home,
  Profile,
  Library,
  Login,
  PostCreator
} from "./Pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<><Navigation /><Home /></>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/library" element={<Library />} />
        <Route path="/login" element={<Login />} />
        <Route path="/postCreator" element={<PostCreator />} />
        <Route path="/storyCreator" element={<StoryCreator />} />
      </Routes>
    </Router>
  );
}

export default App;
