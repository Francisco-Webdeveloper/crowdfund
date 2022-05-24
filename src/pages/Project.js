import { useState } from "react";
import styles from "./Project.module.scss";
import { Navbar } from "../components/Navbar";
import { HeroImage } from "../components/HeroImage";
import { ProjectHeader } from "../components/ProjectHeader";
import { StatusCard } from "../components/StatusCard";
import { ProductDescription } from "../components/ProductDescription";
import { ModalCard } from "../components/ModalCard";

const Project = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);

  const handleCloseModal = () => setShowModal(false);

  return (
    <div className={styles.container}>
      <Navbar />
      <HeroImage />
      <div className={styles.mainSection}>
        <ProjectHeader onClick={handleShowModal} />
        <ModalCard showModal={showModal} handleClose={handleCloseModal} />
        <StatusCard />
        <ProductDescription />
      </div>
    </div>
  );
};

export default Project;
