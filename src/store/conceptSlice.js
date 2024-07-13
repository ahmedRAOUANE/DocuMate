"use client";

import { createSlice } from "@reduxjs/toolkit";

const conceptSlice = createSlice({
    name: "concept",
    initialState: { selectedConcept: { title: "new concept", id: '' }, conceptsList: [], err: null },
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
    }
});

export const { setSelectedConcept, setConceptsList, setConcepts, setErr } = conceptSlice.actions;
export default conceptSlice.reducer;