"use client";

import { configureStore } from "@reduxjs/toolkit";

import conceptSlice from "./conceptSlice";
import modalSlice from "./modalSlice";
import confirmSlice from "./confirmSlice";

export const store = configureStore({
    reducer: {
        conceptSlice,
        modalSlice,
        confirmSlice,
    }
})