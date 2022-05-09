import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Navigation } from "./Components";
import {
  Home,
  Profile,
  Library,
  Login,
  PostCreator,
  StoryCreator
} from "./Pages";

function App() {
  const [loading, setLoading] = useState(true);
  const [cookies, setCookie] = useCookies();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [])

  return (
    <>{loading ? "loading..." : <Router>
      <Routes>
        <Route path="/" element={<><Navigation /><Home /></>} />
        <Route path="/profile" element={<><Navigation /><Profile /></>} />
        <Route path="/library" element={<><Navigation /><Library /></>} />
        <Route path="/login" element={<Login />} />
        <Route path="/postCreator" element={<><Navigation /><PostCreator /></>} />
        <Route path="/storyCreator" element={<StoryCreator />} />
      </Routes>
    </Router>}

    </>
  );
}

export default App;
