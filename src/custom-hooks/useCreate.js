"use client";

import { db } from '@/config/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setErr, setSelectedConcept } from '@/store/conceptSlice';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import useGetData from './useGetData';
import useAuth from './useAuth';

const useConcepts = () => {
    const selectedConcept = useSelector(state => state.conceptSlice.selectedConcept);
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
                alert("Concept created successfully");
            } else {
                await setDoc(conceptDocRef, {
                    [payload.id]: payload
                });
                alert("Concept created successfully");
            }

            getData();
        } catch (err) {
            dispatch(setErr(err.message));
        }
    };

    const updateConcept = async (updatedData) => {
        try {
            const conceptDocRef = doc(db, "concepts", user.uid);
            await updateDoc(conceptDocRef, {
                [`${selectedConcept.id}.subConcepts`]: arrayUnion(updatedData)
            });
            getData();
            console.log('Data uploaded successfully');
        } catch (err) {
            dispatch(setErr(err.message));
        }
    };

    const createConcept = async (payload) => {
        if (selectedConcept.title === "new concept") {
            await createConceptData(payload);
        } else {
            const updatedData = {
                id: payload.id,
                title: payload.title,
                link: payload.link,
            };
            await updateConcept(updatedData);
            await createConceptData(payload);
        }

        await getData();
    };

    return {
        createConcept,
        selectConcept
    };
};

export default useConcepts;
