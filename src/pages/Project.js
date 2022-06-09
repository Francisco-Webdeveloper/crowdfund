import { useState } from "react";
import styles from "./Project.module.scss";
import { Navbar } from "../components/Navbar";
import { HeroImage } from "../components/HeroImage";
import { ProjectHeader } from "../components/ProjectHeader";
import { StatusCard } from "../components/StatusCard";
import { About } from "../components/About";
import { CampaignCard } from "../components/CampaignCard";
import { PledgesModalCard } from "../components/PledgesModalCard";
import campaignsData from "../campaignsData";
import projectsData from "../projectsData";
import { useParams } from "react-router-dom";
import { CampaignList } from "../components/CampaignList";

const Project = () => {
  const [showModal, setShowModal] = useState(false);
  const { projectId } = useParams();

  const { campaigns } = campaignsData.data;
  const [allCampaigns, setAllCampaigns] = useState(campaigns);

  const [formData, setFormData] = useState({
    pledgeCard: "",
    pledgeAmount: "",
    formSubmitted: false,
  });

  // update the state with value of the radio buttons
  const handleChange = (event) => {
    const { name } = event.target;
    let value;
    name === "pledgeAmount"
      ? (value = event.target.value.replace(/\D/g, ""))
      : (value = event.target.value);

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  // update the state to true when the form is submitted
  const handleSubmit = (event) => {
    event.preventDefault();
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        formSubmitted: true,
      };
    });
  };

  console.log(formData);

  // show the modal when the user clicks the button
  const handleShowModal = () => setShowModal(true);

  // hide the modal when the user and exits and clean the data
  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ pledgeCard: "", pledgeAmount: "", formSubmitted: false });
  };

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
    confirmationPledgeText,
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
        <PledgesModalCard
          showModal={showModal}
          handleClose={handleCloseModal}
          modalIntroduction={modalIntroduction}
          formData={formData}
          confirmationPledgeText={confirmationPledgeText}
        >
          <CampaignList
            campaigns={allCampaigns}
            noRewardPledge={noRewardPledge}
            noRewardPledgeDescription={noRewardPledgeDescription}
            formData={formData}
            onChange={handleChange}
            handleClose={handleCloseModal}
            onSubmit={handleSubmit}
          />
        </PledgesModalCard>
        <StatusCard
          moneyBacked={moneyBacked}
          totalBackers={totalBackers}
          daysLeft={daysLeft}
          progress={progress}
        />
        <div className={styles.campaignsCard}>
          <About about={about} />
          {allCampaigns.map(({ product, pledgeAmount, description, stock }) => {
            return (
              <CampaignCard
                key={product}
                product={product}
                pledgeAmount={pledgeAmount}
                description={description}
                stock={stock}
                onClick={handleShowModal}
                formData={formData}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Project;
