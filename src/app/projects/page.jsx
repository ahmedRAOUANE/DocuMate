"use client";

import React, { useEffect } from 'react';
import useGetData from '@/custom-hooks/useGetData';
import Link from 'next/link';
import Icon from '@/icons';
import { useDispatch, useSelector } from 'react-redux';
import useConcepts from '@/custom-hooks/useConcepts';
import { useRouter } from 'next/navigation';
import { setError, setIsLoading } from '@/store/statesSlice';
import { setNewConceptData, setSelectedConcept } from '@/store/conceptSlice';
import { v4 } from 'uuid';
import { setAction } from '@/store/confirmSlice';

const Projects = () => {
    const concepts = useSelector(state => state.conceptSlice.conceptsList);

    const getData = useGetData();
    const { selectConcept } = useConcepts();
    const route = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = () => {
            getData();
        };

        fetchData();
    }, [getData]);

    const handleCreateNewProject = async () => {
        dispatch(setIsLoading(true));

        try {
            const newConceptData = {
                title: "untitled",
                id: v4(),
            }

            dispatch(setNewConceptData(newConceptData));
            dispatch(setAction("new concept"));
            selectConcept(newConceptData);

            route.push(`projects/${newConceptData.id}`);
        } catch (err) {
            dispatch(setError("somthing went wrong, try again.."));
            console.log("Error createing new project: ", err);
        }
    }

    const renderCards = () => {
        return (
            <>
                {
                    concepts.map(concept => (
                        <Link href={`projects/${concept.id}`} onClick={() => selectConcept(concept)} key={concept.id} className="box ai-start paper outline" style={{ width: "190px", height: "190px" }}>
                            <h2>{concept.title}</h2>
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

