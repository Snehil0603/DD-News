import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";
import Login from "./pages/login/Login";
import LandingPage from "./pages/landingPage/LandingPage";
import Register from "./pages/register/Register";
import FavoriteNewsPage from "./pages/FavoritePage/FavoriteNewsPage";
import NewsSelect from "./pages/newsSelect/NewsSelect";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import NewsPage from "./pages/newsPage/NewsPage";

function App() {
  const { user } = useContext(Context); // Access user state from context

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protect LandingPage route */}
        <Route
          path="/landingPage"
          element={user ? <LandingPage /> : <Navigate to="/register" />}
        />

        <Route path="/favorite" element={<FavoriteNewsPage />} />
        <Route path="/newsSelect" element={<NewsSelect />} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/article" element={<NewsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
