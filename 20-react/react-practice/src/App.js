import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./pages/About";
import Discover from "./pages/Discover";
import Search from "./pages/Search";
import "./assets/main.css";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <main className="container">
          <Route exact path="/" component={About} />
          <Route exact path="/about" component={About} />
          <Route exact path="/discover" component={Discover} />
          <Route exact path="/search" component={Search} />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
