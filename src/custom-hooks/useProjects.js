/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { db } from "@/config/firebase";
import { setIsLoading } from "@/store/statesSlice";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { v4 } from "uuid";
import { useRouter } from "next/navigation"
import useData from "./useData";

const useProjects = () => {
    const dispatch = useDispatch();
    const route = useRouter();
    const { selectProject } = useData()

    const createProject = async (userId) => {
        dispatch(setIsLoading(true));

        try {
            const projectsDocRef = doc(db, "projects", userId);
            const projectsDocSnap = await getDoc(projectsDocRef);

            const projectID = `${userId}_${v4()}`;
            const project = {
                id: projectID,
                title: "Untitled",
                body: ""
            }

            if (projectsDocSnap.exists()) {
                await updateDoc(projectsDocRef, {
                    [projectID]: project
                })
            } else {
                await setDoc(projectsDocRef, { [projectID]: project });
            }

            route.push(`projects/${projectID}`);
            selectProject(userId, projectID);
            dispatch(setIsLoading(false));
        } catch (err) {
            dispatch(setIsLoading(false));
            console.log('Error Creating a new project: ', err);
        }
    }

    // upload the changes and update the seclected project
    const updateProjectContent = async (projectId, updatedData) => {
        const userID = projectId.split('_')[0]; // Get the user ID from the projectId

        dispatch(setIsLoading(true))
        try {
            const projectRef = doc(db, "projects", userID);
            const projectDoc = await getDoc(projectRef);

            if (projectDoc.exists()) {
                await updateDoc(projectRef, {
                    [`${projectId}.body`]: updatedData
                });

                // update the selected project
                selectProject(userID, projectId);

                dispatch(setIsLoading(false))
            } else {
                console.error(`Project ${projectId} not found.`);
                dispatch(setIsLoading(false))
            }
        } catch (err) {
            console.error('Error updating project: ', err);
        }
    }

    // upload the changes and update the seclected project
    const updateProjectTitle = async (projectId, updatedTitle) => {
        const userID = projectId.split('_')[0]; // Get the user ID from the projectId

        dispatch(setIsLoading(true));
        try {
            const projectRef = doc(db, "projects", userID);
            const projectDoc = await getDoc(projectRef);

            if (projectDoc.exists()) {
                await updateDoc(projectRef, {
                    [`${projectId}.title`]: updatedTitle
                });

                // update the selected project
                selectProject(userID, projectId);
                dispatch(setIsLoading(false))
            } else {
                console.error(`Project ${projectId} not found.`);
                dispatch(setIsLoading(false))
            }
        } catch (err) {
            console.error('Error updating project: ', err);
        }
    }

    const deleteProject = () => {
        console.log('start deleting project..');
    }

    return {
        createProject,
        updateProjectContent,
        updateProjectTitle,
        deleteProject,
    };
};

export default useProjects;

