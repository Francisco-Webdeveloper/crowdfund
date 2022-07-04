import { useParams } from "react-router-dom";
import projectsData from "../projectsData";
import Project from "../components/Project";
import pledgesData from "../pledgesData";

const ProjectPage = () => {
  const { projectId } = useParams();

  const { projects } = projectsData.data;

  // find the project whose id is the same as the projectId in our path
  const currentProject = projects.find((project) => project.id === projectId);

  if (!currentProject) {
    return <div style={{ color: "white" }}>Project not found</div>;
  }

  const { pledges } = pledgesData.data;

  const pledgeSet = pledges.find(
    (pledgeGroup) => pledgeGroup.id === currentProject.id
  );

  return <Project pledges={pledgeSet.pledgeGroup} project={currentProject} />;
};

export default ProjectPage;
