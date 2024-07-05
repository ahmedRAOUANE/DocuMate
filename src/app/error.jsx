"use client";
import React from 'react'

const Error = ({ error, reset }) => {
    return (
        <div
            className="full-width full-height box column center-x center-y"
        >
            <p>{error.message}</p>
            <button className='primary' onClick={reset}>Reload</button>
        </div>
    )
}

export default Error