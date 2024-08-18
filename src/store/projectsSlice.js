"use client";

import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
    name: "project",
    initialState: { selectedProject: null, projectsList: [], err: null },
    reducers: {
        setSelectedProject: (state, { payload }) => {
            state.selectedProject = payload;
        },
        setProjectsList: (state, { payload }) => {
            state.projectsList = payload;
        },
        setErr: (state, { payload }) => {
            state.err = payload;
        }
    }
});

export const { setSelectedProject, setProjectsList, setErr } = projectSlice.actions;
export default projectSlice.reducer;
