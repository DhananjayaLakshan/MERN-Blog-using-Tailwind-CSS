import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Singup from "./pages/Singup";
import Signin from "./pages/Signin";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-up" element={<Singup />} />
        <Route path="/sign-in" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  );
}
