"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import useAuth from "@/custom-hooks/useAuth";
import useData from "@/custom-hooks/useData";

// icons
import Icon from "@/icons";

const Docs = () => {
    const docs = useSelector(state => state.projectSlice.projectsList);
    const error = useSelector(state => state.statesSlice.error);

    const user = useAuth();
    const { getProjects, selectProject } = useData();

    useEffect(() => {
        const fetchData = () => {
            if (user) {
                getProjects(user.uid);
            }
        }

        fetchData();
    }, [getProjects, user]);

    const handleSelectProject = (projectID) => {
        if (user) {
            selectProject(user.uid, projectID)
        }
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!user) {
        return <div>Loading user...</div>;
    }

    if (docs.length === 0) {
        return <div className="full-height full-width box column center-y center-x">
            <p>You have no projects yet!</p>
            <Link href={"/projects"} className="btn primary">create a article</Link>
        </div>;
    }

    return (
        <div className="container">
            <h2 className="sticky top-0 z-50 bb-inherit px-5 py-2 mt-0 bg-neutral-800 shadow">Docs</h2>
            <div className="box column">
                {docs.map(article => (
                    <div key={article.id} className="box column paper ai-start full-width">
                        <div className="box full-width">
                            <Link href={`docs/${article.id}`} className="btn link box" onClick={() => handleSelectProject(article.id)}>
                                <h2 className="transparent">{article.title}</h2>
                            </Link>
                            <Link href={`projects/${article.id}`} className="btn rounded icon">
                                <Icon name={"pen"} style={{ width: "40px" }} />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Docs;

