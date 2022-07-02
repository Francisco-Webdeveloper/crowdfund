import { useState } from "react";
import styles from "./Project.module.scss";
import { Navbar } from "../Navbar";
import { HeroImage } from "../HeroImage";
import { ProjectHeader } from "../ProjectHeader";
import { StatusCard } from "../StatusCard";
import { About } from "../About";
import { PledgeCard } from "../PledgeCard";
import { PledgesModalCard } from "../PledgesModalCard";
import { PledgeSubmittedModalCard } from "../PledgeSubmittedModalCard";
import { PledgeList } from "../PledgeList";
import { BsArrowUpCircleFill } from "react-icons/bs";
import { HashLink as Link } from "react-router-hash-link";

const Project = ({ pledges, project }) => {
  const [showModal, setShowModal] = useState(false);
  const [addBacker, setAddBacker] = useState(false);
  const [allPledges, setAllPledges] = useState(pledges);
  const [selectedPledge, setSelectedPledge] = useState({ pledgeId: "" });
  const [pledgeSubmitted, setPledgeSubmitted] = useState(false);

  console.log({ showModal });

  const handleStockUpdate = (pledgeId) => {
    setAllPledges((prevPledges) => {
      const updatedPledges = [...prevPledges];
      const chosenPledgeIndex = updatedPledges.findIndex(
        ({ id }) => id === pledgeId
      );
      const chosenPledge = updatedPledges[chosenPledgeIndex];
      updatedPledges[chosenPledgeIndex] = {
        ...chosenPledge,
        stock: chosenPledge.stock - 1,
      };
      return updatedPledges;
    });
  };

  const handlePledgeSelect = (event) => {
    const { name, value } = event.target;

    setSelectedPledge((prevSelectedPledge) => {
      return {
        ...prevSelectedPledge,
        [name]: value,
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setPledgeSubmitted(true);
  };

  const handleShowModal = () => setShowModal(true);

  const handleCloseModal = () => {
    setShowModal(false);
    setPledgeSubmitted(false);
  };

  const [projectStatus, setProjectStatus] = useState({
    moneyBacked: project.moneyBacked,
    totalBackers: project.totalBackers,
  });

  const handleProjectStatus = (pledgedAmount) => {
    setProjectStatus((prevProjectStatus) => {
      let { totalBackers } = prevProjectStatus;

      if (!addBacker) {
        totalBackers++;
        setAddBacker(true);
      }

      return {
        moneyBacked:
          prevProjectStatus.moneyBacked + parseInt(pledgedAmount, 10),
        totalBackers,
      };
    });
  };

  const handlePledgeConfirmClick = (pledgeId, pledgedAmount) => {
    console.log("handlePledgeConfirmClick");
    handleProjectStatus(pledgedAmount);
    handleStockUpdate(pledgeId);
  };

  const {
    daysLeft,
    goal,
    title,
    description,
    about,
    modalIntroduction,
    confirmationPledgeText,
  } = project;

  return (
    <div className={styles.projectContainer}>
      <Navbar />
      <HeroImage />
      <div className={styles.mainSection}>
        <ProjectHeader
          description={description}
          title={title}
          onClick={handleShowModal}
        />
        {pledgeSubmitted ? (
          <PledgeSubmittedModalCard
            onCloseClick={handleCloseModal}
            confirmationPledgeText={confirmationPledgeText}
            showModal={showModal}
          />
        ) : (
          <PledgesModalCard
            showModal={showModal}
            onHide={handleCloseModal}
            modalIntroduction={modalIntroduction}
            pledgeSubmitted={pledgeSubmitted}
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
        )}
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
