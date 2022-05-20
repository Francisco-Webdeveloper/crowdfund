// import logo from './logo.svg';
import styles from "./App.module.scss";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { BackProject } from "./components/BackProject";
import { Stats } from "./components/Stats";
import { About } from "./components/About";

const App = () => {
  return (
    <div className={styles.container}>
      <Navbar />
      <Hero />
      <div className={styles.mainSection}>
        <BackProject />
        <Stats />
        <About />
      </div>
    </div>
  );
};

export default App;
