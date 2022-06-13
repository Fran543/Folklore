import React from "react";
import { useLayoutEffect, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Navigation } from "./Components";
import {
  Home,
  Profile,
  Library,
  Login,
  PostCreator,
  StoryCreator,
  BlogCreator,
  PostFullScreen
} from "./Pages";

function App() {
  const [loading, setLoading] = useState(true);
  const [cookies, setCookie] = useCookies();
  const [isLoggedIn, setisLoggedIn] = useState(localStorage.getItem("isLoggedIn"));


  useLayoutEffect(() => {
    import('./App.css');
  })


  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [])

  return (
    <>{loading ? "loading..." :
      <Router>
        <Routes>
          <Route path="/" element={<><Navigation /><Home /></>} />
          <Route path="/profile" element={isLoggedIn === "true" ? <><Navigation /><Profile /></> : <Login />} />
          <Route path="/library" element={isLoggedIn === "true" ? <><Navigation /><Library /></> : <Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/postCreator" element={isLoggedIn === "true" ? <><Navigation /><PostCreator /></> : <Login />} />
          <Route path="/storyCreator" element={isLoggedIn === "true" ? <StoryCreator /> : <Login />} />
          <Route path="/blogCreator" element={isLoggedIn === "true" ? <BlogCreator /> : <Login />} />
          <Route path="/postFullscreen/:id" element={<PostFullScreen />} />
        </Routes>
      </Router>
    }
    </>
  );
}

export default App;
