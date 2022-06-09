import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Project from "./pages/Project";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project-crowdfunding/:projectId" element={<Project />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
