"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import useAuth from "@/custom-hooks/useAuth";
import { useEffect } from "react";
import useGetData from "@/custom-hooks/useGetData";

const Docs = () => {
    const data = useSelector(state => state.conceptSlice.conceptsList);
    const error = useSelector(state => state.conceptSlice.err);

    const user = useAuth();
    const getData = useGetData();

    useEffect(() => {
        const fetchData = () => {
            getData();
        }

        fetchData();
    }, [getData]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!user) {
        return <div>Loading user...</div>;
    }

    if (data.length === 0) {
        return <div>No data available.</div>;
    }

    const mainConcepts = data.filter(concept => !data.some(c => c.subConcepts && c.subConcepts.some(sub => sub.id === concept.id)));

    return (
        <div className="container">
            <h2>Docs</h2>
            <div className="box column">
                {mainConcepts.map(concept => (
                    <div key={concept.id} className="box column transparent paper ai-start full-width">
                        <Link href={`docs/${concept.link}`} className="btn link">
                            <h2>{concept.title}</h2>
                        </Link>
                        <div className="box jc-start">
                            {concept.subConcepts && concept.subConcepts.map(sub => (
                                <Link key={sub.id} href={`docs/${concept.link}/${sub.link}`} className="btn link">
                                    {sub.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Docs;

