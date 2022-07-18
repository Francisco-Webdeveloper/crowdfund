import { useState } from "react";
import { useParams } from "react-router-dom";
import Project from "../components/Project";
// import projectsData from "../projectsData";
// import pledgesData from "../pledgesData";
import { database } from "../firebaseConfig";
import {
  collection,
  onSnapshot,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useEffect } from "react";

const ProjectPage = () => {
  const { projectId } = useParams();

  const [currentProject, setCurrentProject] = useState();
  const [projectPledges, setProjectPledges] = useState();

  //
  const updateStockInDb = (pledgeId, stockAmount) => {
    const pledgeRef = doc(database, "pledges", pledgeId);
    return updateDoc(pledgeRef, {
      stock: stockAmount,
    });
  };

  const handleStockUpdate = (pledgeId) => {
    const currentPledge = projectPledges.find(({ id }) => id === pledgeId);
    const { stock } = currentPledge;

    updateStockInDb(pledgeId, stock - 1)
      .then(
        setProjectPledges((prevPledges) => {
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
  //

  useEffect(() => {
    const loadPledgesData = (pledgesReferences) => {
      const references = pledgesReferences.map((reference) =>
        getDoc(reference)
      );
      Promise.all(references).then((results) => {
        setProjectPledges(
          results.map((result) => {
            return {
              ...result.data(),
              id: result.id,
              name: result.data().id,
            };
          })
        );
      });
    };

    const loadProjectData = () => {
      const projectsColRef = collection(database, "projects");
      onSnapshot(projectsColRef, (snapshot) => {
        const project = snapshot.docs.find((doc) => {
          return doc.data().identifier === projectId;
        });
        console.log(project.data().pledges);
        loadPledgesData(project.data().pledges);
        setCurrentProject({ ...project.data(), id: project.id });
      });
    };

    loadProjectData();
  }, [projectId]);

  if (!currentProject) {
    return <div style={{ color: "white" }}>Project not found</div>;
  }

  // Fetch data from ProjectsData.js
  // const { projects } = projectsData.data;
  // const currentProjectFromFile = projects.find(
  //   (project) => project.id === projectId
  // );

  // Fetch data from pledgesData.js
  // const pledges = pledgesData.data.pledgeGroups;
  // const currentPledgeGroupFromFile = pledges.find(
  //   (pledges) => pledges.projectId === currentProjectFromFile.id
  // );

  const isLoading = !projectPledges || !currentProject;

  return (
    <>
      {isLoading && <div>loading...</div>}
      {/* {isLoading && (
        <Project
          pledges={currentPledgeGroupFromFile}
          project={currentProjectFromFile}
        />
      )} */}
      {!isLoading && (
        <Project
          pledges={projectPledges}
          project={currentProject}
          onStockUpdate={handleStockUpdate}
        />
      )}
    </>
  );
};

export default ProjectPage;
