import { collection, query, getDocs, getDoc, doc } from "firebase/firestore";
import { database } from "../firebaseConfig";

// Firebase - real time collection data
export const collectProjectsDataFromFirebase = async () => {
  let projects = [];

  const projectsQuery = query(collection(database, "projects"));

  const projectsQuerySnapshot = await getDocs(projectsQuery);
  projectsQuerySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    projects.push({ ...doc.data(), id: doc.id });
  });

  return projects;
};

export const getProject = async (projectId) => {
  const docRef = doc(database, "projects", projectId);
  const projectDocumentSnapshot = await getDoc(docRef);
  console.log({ data: projectDocumentSnapshot.data() });
  return { id: projectDocumentSnapshot.id, ...projectDocumentSnapshot.data() };
};

export const getPledges = async (pledgesReferences) => {
  const references = pledgesReferences.map((reference) => getDoc(reference));
  const results = await Promise.all(references);
  return results.map((result) => {
    console.log({
      ...result.data(),
      id: result.id,
      name: result.data().id,
    });
    return {
      ...result.data(),
      id: result.id,
      name: result.data().id,
    };
  });
};
