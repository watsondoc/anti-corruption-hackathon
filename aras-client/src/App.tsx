import "./App.css";
import { BrowserRouter } from "react-router";
import { Routes } from "./pages/routes";

function App() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
