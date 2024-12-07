import "./App.css";
import { BrowserRouter } from "react-router";
import { QueryClientProvider } from 'react-query'
import { Routes } from "./pages/routes";
import { queryClient } from "./query";


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
