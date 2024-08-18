"use client";

import Icon from '@/icons';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useData from '@/custom-hooks/useData';
import useAuth from '@/custom-hooks/useAuth';
import useProjects from '@/custom-hooks/useProjects';

const Projects = () => {
    const projects = useSelector(state => state.projectSlice.projectsList);

    const user = useAuth();
    const { getProjects, selectProject } = useData();
    const { createProject } = useProjects();

    // get all projects
    useEffect(() => {
        if (user) {
            getProjects(user.uid);
        }
    }, [user, getProjects]);

    const handleCreateNewProject = async () => {
        if (user) {
            createProject(user.uid);
        }
    }

    const renderCards = () => {
        return (
            <>
                {
                    projects.map(project => (
                        <Link href={`projects/${project.id}`} onClick={() => selectProject(user.uid, project.id)} key={project.id} className="box ai-start paper outline" style={{ width: "190px", height: "190px" }}>
                            <h2>{project.title}</h2>
                        </Link>
                    ))
                }
            </>
        )
    }

    return (
        <div className='full-height full-width box column center-x center-y' style={{ padding: "20px" }}>
            <h1 className='full-width text-start' style={{ flex: "0" }}>DocuMate</h1>
            <div className="box jc-start full-width" style={{ maxWidth: "820px" }}>
                <div onClick={handleCreateNewProject} className="btn box center-x center-y paper outline" style={{ width: "190px", height: "190px", backgroundColor: "white" }}>
                    <Icon name={"plus"} style={{ width: "100px" }} />
                </div>
                {renderCards()}
            </div>
        </div>
    )
}

export default Projects

