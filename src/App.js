import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Nvbar from "./layout/Nvbar";
import Footer from "./layout/Footer";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Service from "./pages/Service";
import Profile from "./pages/Profile";
import History from "./pages/History";
import Reservation from "./pages/Reservation";
import Aboutus from "./pages/Aboutus";
import Login from "./pages/Login";
import Register from "./pages/Register";
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
            <Route exact path="/service" element={<Service />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/history" element={<History />} />
            <Route exact path="/reservation" element={<Reservation />} />
            <Route exact path="/aboutus" element={<Aboutus />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
