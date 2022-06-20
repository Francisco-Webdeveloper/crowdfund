import { useState } from "react";
import styles from "./Project.module.scss";
import { Navbar } from "../components/Navbar";
import { HeroImage } from "../components/HeroImage";
import { ProjectHeader } from "../components/ProjectHeader";
import { StatusCard } from "../components/StatusCard";
import { About } from "../components/About";
import { PledgeCard } from "../components/PledgeCard";
import { PledgesModalCard } from "../components/PledgesModalCard";
import pledgesData from "../pledgesData";
import projectsData from "../projectsData";
import { useParams } from "react-router-dom";
import { PledgeList } from "../components/PledgeList";
import { BsArrowUpCircleFill } from "react-icons/bs";
import { HashLink as Link } from "react-router-hash-link";

const Project = () => {
  const [showModal, setShowModal] = useState(false);
  const [addBacker, setAddBacker] = useState(false);
  const { pledges } = pledgesData.data;
  const [allPledges, setAllPledges] = useState(pledges);

  const [selectedPledge, setSelectedPledge] = useState({
    pledgeId: "",
    formSubmitted: false,
  });

  const handleStockUpdate = (pledgeId) => {
    setAllPledges((prevPledges) => {
      const chosenPledge = prevPledges.find(({ id }) => id === pledgeId);
      chosenPledge.stock -= 1;

      return prevPledges;
    });
  };

  // update the state with value of the radio buttons
  const handlePledgeSelect = (event) => {
    const { name, value } = event.target;

    setSelectedPledge((prevSelectedPledge) => {
      return {
        ...prevSelectedPledge,
        [name]: value,
      };
    });
  };

  // update the state to true when the form is submitted
  const handleSubmit = (event) => {
    event.preventDefault();
    setSelectedPledge((prevselectedPledge) => {
      return {
        ...prevselectedPledge,
        formSubmitted: true,
      };
    });
  };

  // show the modal when the user clicks the button
  const handleShowModal = () => setShowModal(true);

  // hide the modal when the user and exits and clean the data
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPledge({
      pledgeId: "",
      formSubmitted: false,
    });
  };

  const { projectId } = useParams();

  const { projects } = projectsData.data;
  // find the project whose id is the same as the projectId in our path
  const currentProject = projects.find((project) => project.id === projectId);

  const [projectStatus, setProjectStatus] = useState({
    moneyBacked: currentProject.moneyBacked,
    totalBackers: currentProject.totalBackers,
  });

  // update the status card with the additional backer + money backed
  const handleProjectStatus = (pledgedAmount) => {
    setAddBacker(true);
    setProjectStatus((prevProjectStatus) => {
      return {
        moneyBacked: prevProjectStatus.moneyBacked + parseInt(pledgedAmount),
        totalBackers: addBacker
          ? // if the user already made a first pledge, keep the same number of backers
            prevProjectStatus.totalBackers
          : // if it is his first pledge, increment the total backers by 1.
            prevProjectStatus.totalBackers++,
      };
    });
  };

  if (!currentProject) {
    return <div style={{ color: "white" }}>Project not found</div>;
  }

  const handlePledgeConfirmClick = (pledgeId, pledgedAmount) => {
    handleProjectStatus(pledgedAmount);
    handleStockUpdate(pledgeId);
  };

  // get the value of a specific project's properties
  const {
    daysLeft,
    goal,
    title,
    description,
    about,
    modalIntroduction,
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
          pledgeSubmitted={selectedPledge.formSubmitted}
          confirmationPledgeText={confirmationPledgeText}
        >
          <PledgeList
            pledges={allPledges}
            selectedPledge={selectedPledge}
            onPledgeSelect={handlePledgeSelect}
            onSubmit={handleSubmit}
            onPledgeConfirmClick={handlePledgeConfirmClick}
          />
        </PledgesModalCard>
        <StatusCard
          daysLeft={daysLeft}
          goal={goal}
          projectStatus={projectStatus}
        />
        <div className={styles.pledgesCard}>
          <About about={about} />
          {allPledges.map(({ id, pledgeAmount, description, stock }) => {
            return (
              <PledgeCard
                key={id}
                product={id}
                pledgeAmount={pledgeAmount}
                description={description}
                stock={stock}
                onClick={handleShowModal}
                selectedPledge={selectedPledge}
              />
            );
          })}
        </div>
      </div>
      <div className={styles.toTheTopContainer}>
        <Link to="#top">
          <h2 className={styles.toTheTop}>
            <BsArrowUpCircleFill />
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default Project;
