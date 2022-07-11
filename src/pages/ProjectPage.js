import { useState } from "react";
import { useParams } from "react-router-dom";
import Project from "../components/Project";
// import projectsData from "../projectsData";
// import pledgesData from "../pledgesData";
import { database } from "../firebaseConfig";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";

const ProjectPage = () => {
  const { projectId } = useParams();

  // const { projects } = projectsData.data;

  const [currentProject, setCurrentProject] = useState();
  const [currentPledgesGroup, setCurrentPledgesGroup] = useState();

  // Firebase - collection ref
  // const projectsColRef = collection(database, "projects");
  // const pledgesColRef = collection(database, "pledgeGroups");

  // Firebase - get collection data
  // getDocs(projectsColRef).then((snapshot) => {
  //   const projects = snapshot.docs.map((doc) => {
  //     return { ...doc.data(), id: doc.id };
  //   });
  //   console.log(projects);
  // });
  // .catch((err) => {
  //   console.log(err.message);
  // });

  // Firebase - real time collection data
  // onSnapshot(projectsColRef, (snapshot) => {
  //   const projects = snapshot.docs.map((doc) => {
  //     return { ...doc.data(), id: doc.id };
  //   });
  //   console.log(projects);
  // });

  // firebase - find the document whose identifier is the same as projectId
  useEffect(() => {
    const loadProjectData = () => {
      const projectsColRef = collection(database, "projects");
      onSnapshot(projectsColRef, (snapshot) => {
        const project = snapshot.docs.find((doc) => {
          return doc.data().identifier === projectId;
        });
        setCurrentProject({ ...project.data(), id: project.id });
      });
    };

    const loadPledgesData = () => {
      const pledgesColRef = collection(database, "pledgeGroups");
      onSnapshot(pledgesColRef, (snapshot) => {
        const pledges = snapshot.docs.find((doc) => {
          return doc.data().identifier === projectId;
        });
        setCurrentPledgesGroup({ ...pledges.data(), id: pledges.id });
      });
    };

    loadProjectData();
    loadPledgesData();
  }, [projectId]);

  console.log(currentProject);
  console.log(currentPledgesGroup);

  // find the project whose id is the same as the projectId in our path
  // const currentProject = projects.find((project) => project.id === projectId);

  if (!currentProject) {
    return <div style={{ color: "white" }}>Project not found</div>;
  }

  // const pledges = pledgesData.data.pledgeGroups;

  // const pledgeSet = pledges.find(
  //   (pledges) => pledges.id === currentProject.identifier
  // );

  console.log({ currentPledgesGroup });
  const isLoading = !currentPledgesGroup || !currentProject;

  return (
    // <Project pledges={currentPledgesGroup.pledges} project={currentProject} />
    <>
      {isLoading && <div>loading...</div>}
      {!isLoading && (
        <Project pledgesSet={currentPledgesGroup} project={currentProject} />
      )}
    </>
  );
};

export default ProjectPage;
