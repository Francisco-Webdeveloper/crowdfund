import { useState } from "react";
import styles from "./Project.module.scss";
import { Navbar } from "../components/Navbar";
import { HeroImage } from "../components/HeroImage";
import { ProjectHeader } from "../components/ProjectHeader";
import { StatusCard } from "../components/StatusCard";
import { About } from "../components/About";
import { Campaigns } from "../components/Campaigns";
import { ModalCard } from "../components/ModalCard";
import campaignsData from "../campaignsData";
import { useParams } from "react-router-dom";
import projectsData from "../projectsData";

const Project = () => {
  const [showModal, setShowModal] = useState(false);
  const { projectId } = useParams();

  console.log({ projectId });

  // const campaigns = campaignsData.data.campaigns.map(
  //   ({ product, pledgeAmount, description, stock }) => {
  //     return {
  //       product,
  //       pledgeAmount,
  //       description,
  //       stock,
  //     };
  //   }
  // );

  const { campaigns } = campaignsData.data;
  const [allCampaigns, setAllCampaigns] = useState(campaigns);

  console.log(allCampaigns);

  const handleShowModal = () => setShowModal(true);

  const handleCloseModal = () => setShowModal(false);

  const { projects } = projectsData.data;
  const currentProject = projects.find((project) => project.id === projectId);

  if (!currentProject) {
    return <div>Project not found</div>;
  }

  const { daysLeft, moneyBacked, progress, totalBackers, title, description } =
    currentProject;

  return (
    <div className={styles.container}>
      <Navbar />
      <HeroImage />
      <div className={styles.mainSection}>
        <ProjectHeader
          description={description}
          title={title}
          onClick={handleShowModal}
        />
        <ModalCard showModal={showModal} handleClose={handleCloseModal} />
        <StatusCard
          moneyBacked={moneyBacked}
          totalBackers={totalBackers}
          daysLeft={daysLeft}
          progress={progress}
        />
        <div className={styles.campaignsCard}>
          <About />
          {allCampaigns.map(
            ({ product, pledgeAmount, description, stock }, id) => {
              return (
                <Campaigns
                  key={id + 1}
                  product={product}
                  pledgeAmount={pledgeAmount}
                  description={description}
                  stock={stock}
                />
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};

export default Project;
