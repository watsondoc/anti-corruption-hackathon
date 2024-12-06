import "./App.css";
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from 'react-query'
import { Routes } from "./pages/routes";

const queryClient = new QueryClient()

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
