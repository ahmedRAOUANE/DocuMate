"use client";

import { createSlice } from "@reduxjs/toolkit";

const conceptSlice = createSlice({
    name: "concept",
    initialState: { selectedConcept: { title: "new concept", id: '' }, conceptsList: [], status: "new concept", err: null },
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
        setErr: (state, { payload }) => {
            state.err = payload;
        },
        setStatus: (state, { payload }) => {
            state.status = payload;
        }
    }
});

export const { setSelectedConcept, setConceptsList, setConcepts, setErr, setStatus } = conceptSlice.actions;
export default conceptSlice.reducer;
