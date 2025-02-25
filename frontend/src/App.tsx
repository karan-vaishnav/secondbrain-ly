import Dashboard from "./pages/dashboard";
import SharedDashboard from "./pages/sharedDashboard";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/share/:hash" element={<SharedDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
