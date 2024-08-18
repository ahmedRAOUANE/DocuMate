"use client";

import { configureStore } from "@reduxjs/toolkit";

// slices
import projectSlice from "./projectsSlice";
import modalSlice from "./modalSlice";
import confirmSlice from "./confirmSlice";
import statesSlice from "./statesSlice";

export const store = configureStore({
    reducer: {
        projectSlice,
        modalSlice,
        confirmSlice,
        statesSlice
    }
})