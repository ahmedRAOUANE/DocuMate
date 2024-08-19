"use client";

import React, { useEffect } from 'react';
import useAuth from '@/custom-hooks/useAuth';
import useData from '@/custom-hooks/useData';
import useInputParser from '@/custom-hooks/useInputParser';

const Document = () => {
    const user = useAuth();
    const { getProject } = useData();
    const { htmlTree } = useInputParser()

    useEffect(() => {
        const fetchData = () => {
            if (user) {
                getProject(user.uid);
            }
        }

        fetchData();
    }, [getProject, user]);

    return (
        <div className="container">
            <div className="paper box column jc-start ai-start outline" style={{ color: "black", gap: 0 }}>
                {htmlTree.map((ele, idx) => (
                    <React.Fragment key={idx}>{ele}</React.Fragment>
                ))}
            </div>
        </div>
    )
}

export default Document

