import { useEffect, useState, useCallback } from "react";
import useAuth from "./useAuth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { setErr, setConceptsList } from "@/store/conceptSlice";
import { useDispatch } from "react-redux";
import { setIsLoading } from "@/store/statesSlice";

const useGetData = () => {
    const dispatch = useDispatch();
    const user = useAuth();

    const fetchData = useCallback(async () => {
        if (user) {
            try {
                const conceptsDocRef = doc(db, "concepts", user.uid);
                const conceptsDocSnap = await getDoc(conceptsDocRef);

                if (conceptsDocSnap.exists()) {
                    const conceptsData = conceptsDocSnap.data();
                    const conceptsArray = Object.keys(conceptsData).map(id => ({
                        id,
                        ...conceptsData[id]
                    }));

                    dispatch(setConceptsList(conceptsArray));
                    dispatch(setIsLoading(false));
                }
            } catch (err) {
                dispatch(setErr(err.message));
                console.log('Error loading data: ', err.message);
            }
        }
    }, [user, dispatch]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return fetchData;
};

export default useGetData;
