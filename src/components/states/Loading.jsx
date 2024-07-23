"use client";

import React from 'react'
import { useSelector } from 'react-redux'

const Loading = () => {
    const isLoading = useSelector(state => state.statesSlice.isLoading);
    return isLoading && (
        <div
            style={{ position: "absolute", top: 0, left: 0, backgroundColor: "var(--main-color)" }}
            className='full-width full-height box center-x center-y'
        >
            Loading...
        </div>
    )
}

export default Loading