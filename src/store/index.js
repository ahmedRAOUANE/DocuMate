"use client";

import { configureStore } from "@reduxjs/toolkit";

// slices
import conceptSlice from "./conceptSlice";
import modalSlice from "./modalSlice";
import confirmSlice from "./confirmSlice";
import statesSlice from "./statesSlice";

export const store = configureStore({
    reducer: {
        conceptSlice,
        modalSlice,
        confirmSlice,
        statesSlice
    }
})