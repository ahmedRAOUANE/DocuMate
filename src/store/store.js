"use client";

import { configureStore } from "@reduxjs/toolkit";

import conceptSlice from "./conceptSlice";

export const store = configureStore({
    reducer: {
        conceptSlice
    }
})