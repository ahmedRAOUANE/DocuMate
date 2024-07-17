/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import useAuth from './useAuth';
import useGetData from './useGetData';
import { db } from '@/config/firebase';
import { useCallback, useEffect } from 'react';
import { setAction, setIsConfirmed } from '@/store/confirmSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setErr, setNewConceptData, setSelectedConcept } from '@/store/conceptSlice';
import { doc, getDoc, setDoc, updateDoc, arrayUnion, deleteField } from 'firebase/firestore';
import useModal from './useModal';
import { setOperation, setWindow } from '@/store/modalSlice';

const useConcepts = () => {
    const selectedConcept = useSelector(state => state.conceptSlice.selectedConcept);
    const newConceptData = useSelector(state => state.conceptSlice.newConceptData);
    const action = useSelector(state => state.confirmSlice.action);
    const isConfirmed = useSelector(state => state.confirmSlice.isConfirmed);

    const user = useAuth();
    const dispatch = useDispatch();
    const getData = useGetData();
    const { closeWindow, openWindow } = useModal();

    const selectConcept = (concept) => {
        dispatch(setSelectedConcept(concept));
    };

    const createConceptData = useCallback(async () => {
        if (newConceptData) {
            try {
                const conceptDocRef = doc(db, "concepts", user.uid);
                const conceptDocSnap = await getDoc(conceptDocRef);

                if (conceptDocSnap.exists()) {
                    await updateDoc(conceptDocRef, {
                        [newConceptData.id]: newConceptData
                    });
                } else {
                    await setDoc(conceptDocRef, {
                        [newConceptData.id]: newConceptData
                    });
                }

                getData();
            } catch (err) {
                dispatch(setErr(err.message));
                console.log("error creating concept data: ", err);
            }
        }
    }, [dispatch, getData, newConceptData]);

    const updateSelectedConcept = useCallback(async (updatedData) => {
        if (selectedConcept) {
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
        } else {
            console.log('the selected concept state: ', selectedConcept);
        }
    }, [dispatch, getData, selectedConcept]);

    const addSubConcept = useCallback(async (newData) => {
        if (selectedConcept) {
            try {
                await createConceptData(newConceptData);

                const conceptDocRef = doc(db, "concepts", user.uid);
                await updateDoc(conceptDocRef, {
                    [`${selectedConcept.id}.subConcepts`]: arrayUnion(newData)
                });
                getData();
            } catch (err) {
                dispatch(setErr(err.message));
                console.log('error adding sub concept: ', err);
            }
        }
    }, [dispatch, getData, createConceptData, newConceptData, selectedConcept]);

    const deleteConcept = useCallback(async () => {
        if (selectedConcept) {
            try {
                const conceptDocRef = doc(db, "concepts", user.uid);
                const conceptDocSnap = await getDoc(conceptDocRef);

                if (conceptDocSnap.exists()) {
                    const conceptData = conceptDocSnap.data();
                    const concept = conceptData[selectedConcept.id];

                    // Check for sub-concepts and delete them
                    if (concept.subConcepts && concept.subConcepts.length > 0) {
                        const subConcepts = concept.subConcepts;
                        for (const subConcept of subConcepts) {
                            await updateDoc(conceptDocRef, {
                                [subConcept.id]: deleteField()
                            });
                        }
                    }

                    // Delete the selected concept
                    await updateDoc(conceptDocRef, {
                        [selectedConcept.id]: deleteField()
                    }).then(() => {
                        console.log('Concept deleted successfully..');
                        closeWindow();

                        getData();
                    });

                    console.log('Delete starts..');
                } else {
                    console.log('No document found for user: ', user.uid);
                }
            } catch (err) {
                console.log('Error deleting a concept: ', err);
            }
        } else {
            console.log('Selected concept: ', selectedConcept);
        }
    }, [selectedConcept, getData]);

    const deleteSubConcept = useCallback(async () => {
        if (selectedConcept && selectedConcept.parentID) {
            try {
                const conceptDocRef = doc(db, "concepts", user.uid);
                const conceptDocSnap = await getDoc(conceptDocRef);

                if (conceptDocSnap.exists()) {
                    const conceptData = conceptDocSnap.data();
                    const parentConcept = conceptData[selectedConcept.parentID];

                    // Filter out the sub-concept to be deleted
                    const updatedSubConcepts = parentConcept.subConcepts.filter(subConcept => subConcept.id !== selectedConcept.id);
                    console.log('updated sub concepts array: ', updatedSubConcepts);

                    // Update the parent concept with the new sub-concepts array
                    await updateDoc(conceptDocRef, {
                        [`${selectedConcept.parentID}.subConcepts`]: updatedSubConcepts
                    });

                    // Delete the sub-concept itself
                    await updateDoc(conceptDocRef, {
                        [selectedConcept.id]: deleteField()
                    }).then(() => {
                        console.log('Sub-concept deleted successfully..');
                        closeWindow();

                        getData();
                    });
                } else {
                    console.log('No document found for user: ', user.uid);
                }
            } catch (err) {
                console.log('Error deleting a sub-concept: ', err);
            }
        } else {
            console.log('Selected concept or parent ID not found: ', selectedConcept);
        }
    }, [selectedConcept, getData]);

    useEffect(() => {
        const handleConcept = async () => {
            // New main concept
            if (!selectedConcept && action === "new concept" && newConceptData) {
                dispatch(setOperation("new main concept"))
                await createConceptData(newConceptData);
                openWindow("success")

                dispatch(setNewConceptData(null));
                dispatch(setIsConfirmed(false));
            }
            // New sub-concept
            else if (selectedConcept && action === "new concept" && isConfirmed && newConceptData) {
                dispatch(setOperation("new sub concept"))

                const subConceptData = {
                    id: newConceptData.id,
                    title: newConceptData.title,
                    link: newConceptData.link,
                    parentID: newConceptData.parentID
                };
                await addSubConcept(subConceptData);
                dispatch(setNewConceptData(null));
                dispatch(setIsConfirmed(false));
                openWindow("success")
            }

            // Update existing concept
            else if (selectedConcept && action === "update concept" && isConfirmed && newConceptData) {
                dispatch(setOperation("update concept"))

                await updateSelectedConcept(newConceptData);
                openWindow("success");
                dispatch(setNewConceptData(null));
                dispatch(setIsConfirmed(false));
            }

            // delete concept
            else if (selectedConcept && action === "delete concept" && isConfirmed) {
                dispatch(setOperation("delete concept"))

                if (selectedConcept.parentID !== null) {
                    await deleteSubConcept();
                } else {
                    await deleteConcept();
                }

                openWindow("success")
                dispatch(setAction("update concept"));
            }

            await getData();
        };

        handleConcept();
    }, [selectedConcept, action, isConfirmed]);

    return {
        selectConcept
    };
};

export default useConcepts;

