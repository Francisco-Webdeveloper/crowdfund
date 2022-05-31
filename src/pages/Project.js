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
import projectsData from "../projectsData";
import { useParams } from "react-router-dom";

const Project = () => {
  const [showModal, setShowModal] = useState(false);
  const { projectId } = useParams();

  console.log({ projectId });

  const { campaigns } = campaignsData.data;
  const [allCampaigns, setAllCampaigns] = useState(campaigns);

  // show the modal when the user clicks the button
  const handleShowModal = () => setShowModal(true);

  // hide the modal when the user clicks exits
  const handleCloseModal = () => setShowModal(false);

  const { projects } = projectsData.data;
  // find the project whose id is the same as the projectId in our path
  const currentProject = projects.find((project) => project.id === projectId);

  if (!currentProject) {
    return <div style={{ color: "white" }}>Project not found</div>;
  }

  // get the value of a specific project's properties
  const {
    daysLeft,
    moneyBacked,
    progress,
    totalBackers,
    title,
    description,
    about,
    modalIntroduction,
    noRewardPledge,
    noRewardPledgeDescription,
  } = currentProject;

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
        <ModalCard
          showModal={showModal}
          handleClose={handleCloseModal}
          campaigns={allCampaigns}
          modalIntroduction={modalIntroduction}
          noRewardPledge={noRewardPledge}
          noRewardPledgeDescription={noRewardPledgeDescription}
        />
        <StatusCard
          moneyBacked={moneyBacked}
          totalBackers={totalBackers}
          daysLeft={daysLeft}
          progress={progress}
        />
        <div className={styles.campaignsCard}>
          <About about={about} />
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
