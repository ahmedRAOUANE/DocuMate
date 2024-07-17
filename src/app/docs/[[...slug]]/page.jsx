"use client";

import Link from "next/link";
import { useEffect } from "react";
import useAuth from "@/custom-hooks/useAuth";
import useGetData from "@/custom-hooks/useGetData";
import useConcepts from "@/custom-hooks/useConcepts";
import { useDispatch, useSelector } from "react-redux";

// icons
import Icon from "@/icons";
import { setAction } from "@/store/confirmSlice";

const Docs = () => {
    const data = useSelector(state => state.conceptSlice.conceptsList);
    const error = useSelector(state => state.conceptSlice.err);

    const dispatch = useDispatch();

    const user = useAuth();
    const getData = useGetData();
    const { selectConcept } = useConcepts();

    useEffect(() => {
        const fetchData = () => {
            getData();
        }

        fetchData();
    }, [getData]);

    const updateStatus = (value, concept) => {
        dispatch(setAction(value))
        selectConcept(concept)
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!user) {
        return <div>Loading user...</div>;
    }

    if (data.length === 0) {
        return <div className="full-height full-width box column center-y center-x">
            <p>No data available.</p>
            <Link href={"/create"} className="btn primary">create a concept</Link>
        </div>;
    }

    const mainConcepts = data.filter(concept => !data.some(c => c.subConcepts && c.subConcepts.some(sub => sub.id === concept.id)));

    return (
        <div>
            <h2 className="sticky top-0 z-50 bb-inherit px-5 py-2 mt-0 bg-neutral-800 shadow">Docs</h2>
            <div className="box column container">
                {mainConcepts.map(concept => (
                    <div key={concept.id} className="box column transparent paper ai-start full-width">
                        <div className="box full-width">
                            <Link href={`docs/${concept.link}`} className="btn link box">
                                <h2>{concept.title}</h2>
                            </Link>
                            <Link href={"create"} className="btn rounded icon" onClick={() => updateStatus("update concept", concept)}>
                                <Icon name={"pen"} style={{ width: "40px" }} />
                            </Link>
                        </div>
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

