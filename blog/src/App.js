import { useContext } from "react";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Abouts from './pages/about/Abouts';
import Contact from "./pages/contact/Contact";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Context } from "./context/Comtext";
function App() {
  const {user} = useContext(Context);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={user ? <Home/> : <Register />} />
        <Route path="/login" element={user ? <Home/> : <Login />} />
        <Route path="/write" element={user ? <Write /> : <Login/>} />
        <Route path="/about" element={user ? <Abouts /> : <Login/>} />
        <Route path="/contact" element={user ? <Contact /> : <Login/>} />
        <Route path="/settings" element={user ? <Settings /> : <Login/>} />
        <Route path="/post/:postId" element={<Single />} />
      </Routes>
    </Router>
  );
}

export default App;
