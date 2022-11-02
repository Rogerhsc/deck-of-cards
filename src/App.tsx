import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Deck from "./views/deck";
import Home from "./views/home";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/deck" element={<Deck />} />
    </Routes>
  </Router>
);

export default App