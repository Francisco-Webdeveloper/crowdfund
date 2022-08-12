import styles from "./ProjectPage.module.scss";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Project from "../components/Project";
import { Navbar } from "../components/Navbar";
import { HeroImage } from "../components/HeroImage";
import { BsArrowUpCircleFill } from "react-icons/bs";
import { HashLink as Link } from "react-router-hash-link";
import { getPledges, getProject } from "../services/project";

const ProjectPage = () => {
  const { projectId } = useParams();

  const [currentProject, setCurrentProject] = useState();
  const [projectPledges, setProjectPledges] = useState();

  // getProject("NUEBYucaMWYBlGs9qwX9").then((project) => {
  //   console.log({ project });
  // });

  useEffect(() => {
    const loadProjectData = async () => {
      const project = await getProject(projectId);
      console.log({ project });
      const pledges = await getPledges(project.pledges);
      console.log({ pledges });

      setCurrentProject(project);
      setProjectPledges(pledges);
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
