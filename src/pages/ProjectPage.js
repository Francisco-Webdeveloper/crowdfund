import styles from "./ProjectPage.module.scss";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Project from "../components/Project";
import { Navbar } from "../components/Navbar";
import { HeroImage } from "../components/HeroImage";
import { BsArrowUpCircleFill } from "react-icons/bs";
import { HashLink as Link } from "react-router-hash-link";
import { database } from "../firebaseConfig";
import { collection, onSnapshot, getDoc } from "firebase/firestore";

const ProjectPage = () => {
  const { projectId } = useParams();

  const [currentProject, setCurrentProject] = useState();
  const [projectPledges, setProjectPledges] = useState();

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

  const isLoading = !projectPledges || !currentProject;

  const { coverImage, coverImageXl } = currentProject;

  return (
    <>
      <Navbar />
      <HeroImage image={coverImage} imageXl={coverImageXl} />
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <Project pledges={projectPledges} project={currentProject} />
      )}
      <div className={styles.toTheTopContainer}>
        <Link to="#top">
          <h2 className={styles.toTheTop}>
            <BsArrowUpCircleFill />
          </h2>
        </Link>
      </div>
    </>
  );
};

export default ProjectPage;
