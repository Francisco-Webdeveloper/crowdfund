// import logo from './logo.svg';
// import styles from "./App.module.scss";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";

const App = () => {
  return (
    <div className="container">
      <Navbar />
      <Hero />
      <h1>hello</h1>
    </div>
  );
};

export default App;
