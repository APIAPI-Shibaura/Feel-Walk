import "./App.css";
import Choice from "./components/Choice";
import Clear from "./components/Clear";
import Sunny from "./components/Sunny";
import Cloudy from "./components/Cloudy";
import Rainy from "./components/Rainy";
import Thunder from "./components/Thunder";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
      <div className="App">
        {/*aaa*/}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/choice" element={<Choice />} />
          <Route className="emotion" path="/Clear" element={<Clear />} />
          <Route className="emotion" path="/Sunny" element={<Sunny />} />
          <Route className="emotion" path="/Cloudy" element={<Cloudy />} />
          <Route className="emotion" path="/Rainy" element={<Rainy />} />
          <Route className="emotion" path="/Thunder" element={<Thunder />} />
        </Routes>
      </div>
  );
}

export default App;
