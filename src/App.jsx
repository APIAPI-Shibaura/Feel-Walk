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
        <h1>Mental Traker</h1>
        {/*aaa*/}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/choice" element={<Choice />} />
          <Route path="/Clear" element={<Clear />} />
          <Route path="/Sunny" element={<Sunny />} />
          <Route path="/Cloudy" element={<Cloudy />} />
          <Route path="/Rainy" element={<Rainy />} />
          <Route path="/Thunder" element={<Thunder />} />
        </Routes>
      </div>
  );
}

export default App;
