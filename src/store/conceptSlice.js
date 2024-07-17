"use client";

import { createSlice } from "@reduxjs/toolkit";

const conceptSlice = createSlice({
    name: "concept",
    initialState: { selectedConcept: null, conceptsList: [], err: null, newConceptData: null },
    reducers: {
        setSelectedConcept: (state, { payload }) => {
            state.selectedConcept = payload;
        },
        setConceptsList: (state, { payload }) => {
            state.conceptsList = payload;
        },
        setConcepts: (state, { payload }) => {
            state.concepts = payload;
        },
        setNewConceptData: (state, { payload }) => {
            state.newConceptData = payload;
        },
        setErr: (state, { payload }) => {
            state.err = payload;
        }
    }
});

export const { setSelectedConcept, setConceptsList, setConcepts, setErr, setNewConceptData } = conceptSlice.actions;
export default conceptSlice.reducer;
