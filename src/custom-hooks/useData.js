import { db } from "@/config/firebase";
import { useDispatch } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { setIsLoading } from "@/store/statesSlice";
import { setProjectsList, setSelectedProject } from "@/store/projectsSlice";
import { useCallback } from "react";

const useData = () => {
    const dispatch = useDispatch();

    // get one project
    const getProject = useCallback(async (userId, projectId) => {
        dispatch(setIsLoading(true))

        try {
            const projectDocRef = doc(db, "projects", userId);
            const projectDocSnap = await getDoc(projectDocRef);

            if (projectDocSnap.exists()) {
                const project = projectDocSnap.data()[projectId];
                dispatch(setSelectedProject(project));
            }

            dispatch(setIsLoading(false))
        } catch (err) {
            dispatch(setIsLoading(false))
            console.log('Error getting project: ', err);
        }
    }, [dispatch])

    // get all projects
    const getProjects = useCallback(async (userId) => {
        dispatch(setIsLoading(true));

        try {
            const projectsDocRef = doc(db, "projects", userId);
            const projectsDocSnap = await getDoc(projectsDocRef);

            if (projectsDocSnap.exists()) {
                const data = projectsDocSnap.data();

                const projects = Object.keys(data).map(id => data[id]);

                dispatch(setProjectsList(projects));
            }

            dispatch(setIsLoading(false));
        } catch (err) {
            dispatch(setIsLoading(false));
            console.log('Error Getting Data: ', err);
        }
    }, [dispatch]);

    return {
        getProject,
        getProjects,
    }
};

export default useData;

