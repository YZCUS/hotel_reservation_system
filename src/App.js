import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Nvbar from "./layout/Nvbar";
import Footer from "./layout/Footer";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Profile from "./pages/Profile";
import History from "./pages/History";
import Reservation from "./pages/Reservation";
import Aboutus from "./pages/Aboutus";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SearchResult from "./pages/SearchResult";
import Review from "./pages/Review";
import { AuthProvider } from "./authentication/AuthOptions";
function App() {
  return (
    <AuthProvider>
      <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
        <Router>
          <Nvbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/gallery" element={<Gallery />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/history" element={<History />} />
            <Route exact path="/reservation" element={<Reservation />} />
            <Route exact path="/aboutus" element={<Aboutus />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/searchresult" element={<SearchResult />} />
            <Route exact path="/review" element={<Review />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
