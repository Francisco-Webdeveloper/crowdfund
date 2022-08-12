import { useState } from "react";
import styles from "./Project.module.scss";
import { ProjectHeader } from "../ProjectHeader";
import { StatusCard } from "../StatusCard";
import { About } from "../About";
import { PledgeCard } from "../PledgeCard";
import { PledgesModalCard } from "../PledgesModalCard";
import { PledgeSubmittedModalCard } from "../PledgeSubmittedModalCard";
import { PledgeList } from "../PledgeList";
import { database } from "../../firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

const Project = ({ pledges = [], project }) => {
  const [showModal, setShowModal] = useState(false);
  const [addBacker, setAddBacker] = useState(false);
  const [allPledges, setAllPledges] = useState(pledges);
  const [selectedPledge, setSelectedPledge] = useState({ pledgeId: "" });
  const [pledgeSubmitted, setPledgeSubmitted] = useState(false);
  const [projectStatus, setProjectStatus] = useState({
    moneyBacked: project.moneyBacked || 0,
    totalBackers: project.totalBackers || 0,
  });

  const updateStockInDb = (pledgeId, stockAmount) => {
    const pledgeRef = doc(database, "pledges", pledgeId);
    return updateDoc(pledgeRef, {
      stock: stockAmount,
    });
  };

  console.log({ allPledges });

  const handleStockUpdate = (pledgeId) => {
    const currentPledge = allPledges.find(({ id }) => id === pledgeId);
    console.log({ currentPledge });
    const { stock } = currentPledge;

    console.log({ pledgeId }); // j9bfVC1CunRVdLECa7iu
    updateStockInDb(pledgeId, stock - 1)
      .then(
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
        })
      )
      .catch((error) => {
        console.log(error);
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

  const handleShowModal = () => setShowModal(true);

  const handleCloseModal = () => {
    setShowModal(false);
    setPledgeSubmitted(false);
  };

  const updateProjectStatusInDb = async (moneyBacked, totalBackers) => {
    const projectRef = doc(database, "projects", project.id);
    return await updateDoc(projectRef, {
      moneyBacked,
      totalBackers,
    });
  };

  const handleProjectStatus = (pledgedAmount) => {
    let { moneyBacked, totalBackers } = projectStatus;

    if (!addBacker) {
      totalBackers++;
      setAddBacker(true);
    }

    moneyBacked = moneyBacked + parseInt(pledgedAmount, 10);

    updateProjectStatusInDb(moneyBacked, totalBackers)
      .then(() => {
        setProjectStatus({ totalBackers, moneyBacked });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (pledgeId, pledgedAmount) => {
    if (pledgeId !== "Pledge with no reward") {
      handleProjectStatus(pledgedAmount);
      handleStockUpdate(pledgeId);
    }
    setPledgeSubmitted(true);
  };

  const handleSubmitNoRewardPledge = (event) => {
    event.preventDefault();
    setPledgeSubmitted(true);
  };

  const {
    daysLeft,
    goal,
    title,
    description,
    about,
    modalIntroduction,
    confirmationPledgeText,
    bookmarked,
    id,
  } = project;

  return (
    <div className={styles.projectContainer}>
      <div className={styles.mainSection}>
        <ProjectHeader
          description={description}
          title={title}
          onClick={handleShowModal}
          isBookmarked={bookmarked}
          id={id}
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
              onSubmitNoReward={handleSubmitNoRewardPledge}
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
          {allPledges.map(({ id, pledgeAmount, description, stock, name }) => {
            return (
              <PledgeCard
                key={id}
                id={id}
                product={name}
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
    </div>
  );
};

export default Project;
