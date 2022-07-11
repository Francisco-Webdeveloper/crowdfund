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
import { database } from "../../firebaseConfig";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

const Project = ({ pledgesSet, project }) => {
  const [showModal, setShowModal] = useState(false);
  const [addBacker, setAddBacker] = useState(false);
  const [allPledges, setAllPledges] = useState(pledgesSet.pledges);
  const [selectedPledge, setSelectedPledge] = useState({ pledgeId: "" });
  const [pledgeSubmitted, setPledgeSubmitted] = useState(false);
  const [projectStatus, setProjectStatus] = useState({
    moneyBacked: project.moneyBacked || 0,
    totalBackers: project.totalBackers || 0,
  });

  const handleStockUpdate = (pledgeId) => {
    // update the database

    // if the update went well
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

    // if it did't work you show an error to the user
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

  // // Firebase - update document properties
  // const projectRef = doc(database, "projects", project.id);
  // updateDoc(projectRef, {
  //   moneyBacked: projectStatus.moneyBacked,
  //   totalBackers: projectStatus.totalBackers,
  // });

  // // not working!!
  // const pledgesRef = doc(database, "pledgeGroups", pledgesSet.id);
  // allPledges.forEach(({ stock }) => {
  //   return updateDoc(pledgesRef, {
  //     stock: arrayUnion(stock),
  //   });
  // });

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

  const handlePledgeConfirmClick = (pledgeId, pledgedAmount) => {
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
    coverImage,
    coverImageXl,
  } = project;

  return (
    <div className={styles.projectContainer}>
      <Navbar />
      <HeroImage image={coverImage} imageXl={coverImageXl} />
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
