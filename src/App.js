import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProjectPage from "./pages/ProjectPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/project-crowdfunding/:projectId"
          element={<ProjectPage />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
