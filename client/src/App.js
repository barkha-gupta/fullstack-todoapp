import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import Todo from "./components/todo";

function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Routes>
        <Route exact path="/" element={ <Login/> } />
        <Route path="/register" element={ <Register/> } />
        <Route path="/todo" element={ <Todo/> } />
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
