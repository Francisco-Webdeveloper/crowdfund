import { BrowserRouter, Routes, Route } from "react-router-dom";
import Project from "./pages/Project";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Project />} />
        <Route path="/project-crowdfunding/:projectId" element={<Project />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
