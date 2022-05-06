import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Navigation,
  Home,
  Profile,
  Library,
  Login
} from "./Pages";
import PostCreator from './Pages/PostCreator/postCreator';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/library" element={<Library />} />
        <Route path="/login" element={<Login />} />
        <Route path="/postCreator" element={<PostCreator />} />
      </Routes>
    </Router>
  );
}

export default App;
