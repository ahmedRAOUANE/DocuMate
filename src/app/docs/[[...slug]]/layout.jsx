/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import useGetData from "@/custom-hooks/useGetData";
import { useSelector } from "react-redux";

const DocsLayout = ({ children, params }) => {
    const mainConceptData = useSelector(state => state.conceptSlice.conceptsList);
    const [currentConcept, setCurrentConcept] = useState(null);
    const route = useMemo(() => params.slug || [], [params.slug]);

    const getData = useGetData();

    useEffect(() => {
        const fetchData = async () => {
            await getData();
        };

        fetchData();
    }, [getData]);

    useEffect(() => {
        if (route.length === 1 && mainConceptData) {
            const concept = mainConceptData.find(concept => concept.link === route[0]);
            setCurrentConcept(concept);
        } else if (route.length === 2 && mainConceptData) {
            const mainConcept = mainConceptData.find(concept => concept.link === route[0]);
            const subConcept = mainConcept?.subConcepts.find(sub => sub.link === route[1]);
            const targetSub = mainConceptData.find(sub => sub.id === subConcept.id)
            setCurrentConcept(targetSub);
        }
    }, [route, mainConceptData]);

    if (route.length === 1 && currentConcept) {
        return (
            <div className="container">
                <h2>{currentConcept.title}</h2>
                <p>{currentConcept.explanation}</p>
                {currentConcept.img && <img src={currentConcept.img} alt={currentConcept.title} />}
                {currentConcept.examples && currentConcept.examples.length > 0 && (
                    <div>
                        <h3>Examples:</h3>
                        <ul>
                            {currentConcept.examples.map((example, index) => (
                                <li key={index}>{example}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {currentConcept.subConcepts && currentConcept.subConcepts.length > 0 && (
                    <ul>
                        {currentConcept.subConcepts.map(sub => (
                            <li key={sub.id}>
                                <Link href={`/docs/${currentConcept.link}/${sub.link}`}>{sub.title}</Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    }

    if (route.length === 2 && currentConcept) {
        return (
            <div className="container">
                <h2>{currentConcept.title}</h2>
                <p>{currentConcept.explanation}</p>
                {currentConcept.img && <img src={currentConcept.img} alt={currentConcept.title} />}
                {currentConcept.examples && currentConcept.examples.length > 0 && (
                    <div>
                        <h3>Examples:</h3>
                        <ul>
                            {currentConcept.examples.map((example, index) => (
                                <li key={index}>{example}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div>
            {children}
        </div>
    );
};

export default DocsLayout;
