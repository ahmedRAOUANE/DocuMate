"use client";

import useAuth from './useAuth';
import useGetData from './useGetData';
import { db } from '@/config/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setErr, setSelectedConcept } from '@/store/conceptSlice';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';

const useConcepts = () => {
    const selectedConcept = useSelector(state => state.conceptSlice.selectedConcept);
    const status = useSelector(state => state.conceptSlice.status);
    const user = useAuth();
    const dispatch = useDispatch();
    const getData = useGetData();

    const selectConcept = (concept) => {
        dispatch(setSelectedConcept(concept));
    };

    const createConceptData = async (payload) => {
        try {
            const conceptDocRef = doc(db, "concepts", user.uid);
            const conceptDocSnap = await getDoc(conceptDocRef);

            if (conceptDocSnap.exists()) {
                await updateDoc(conceptDocRef, {
                    [payload.id]: payload
                });
            } else {
                await setDoc(conceptDocRef, {
                    [payload.id]: payload
                });
            }

            getData();
        } catch (err) {
            dispatch(setErr(err.message));
            console.log("error creating concept data: ", err);
        }
    };

    const updateSelectedConcept = async (updatedData) => {
        try {
            const conceptDocRef = doc(db, "concepts", user.uid);
            await updateDoc(conceptDocRef, {
                [`${selectedConcept.id}`]: updatedData
            });
            getData();
        } catch (err) {
            dispatch(setErr(err.message));
            console.log('error updating a concept: ', err);
        }
    };

    const addSubConcept = async (newData, currentConceptData) => {
        try {
            await createConceptData(currentConceptData);

            const conceptDocRef = doc(db, "concepts", user.uid);
            await updateDoc(conceptDocRef, {
                [`${selectedConcept.id}.subConcepts`]: arrayUnion(newData)
            });
            getData();
        } catch (err) {
            dispatch(setErr(err.message));
            console.log('error adding sub concept: ', err);
        }
    };

    const createConcept = async (payload) => {
        // New main concept
        if (selectedConcept.title === "new concept" && status === "new concept") {
            await createConceptData(payload);
            alert("Concept created successfully");
        }

        // New sub-concept
        else if (selectedConcept.title !== "new concept" && status === "new concept") {
            const subConceptData = {
                id: payload.id,
                title: payload.title,
                link: payload.link,
            };
            await addSubConcept(subConceptData, payload);
            alert('Concept updated successfully');
        }

        // Update existing concept
        else if (selectedConcept.title !== "new concept" && status === "update concept") {
            await updateSelectedConcept(payload);
            alert('Concept updated successfully');
        }

        await getData();
    };

    return {
        createConcept,
        selectConcept
    };
};

export default useConcepts;
