"use client";

import useAuth from "@/custom-hooks/useAuth";
import useProjects from "@/custom-hooks/useProjects";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const ProjectLayout = ({ children }) => {
    const currentProject = useSelector(state => state.projectSlice.selectedProject);

    const [isTitleChanged, setIsTileChanged] = useState(false);

    const titleRef = useRef();

    const user = useAuth();
    const { updateProjectTitle } = useProjects();

    useEffect(() => {
        // handle keydown event listener
        const handleKeydown = (ev) => {
            if (ev.ctrlKey && ev.key === 's' && user) {
                if (isTitleChanged) {
                    updateProjectTitle(currentProject.id, titleRef.current.value);
                    setIsTileChanged(false);
                }
            }
        };

        window.addEventListener("keydown", handleKeydown);

        return () => {
            window.removeEventListener("keydown", handleKeydown);
        };
    }, [updateProjectTitle]);

    return (
        <div>
            <div className="container box full-width outline" style={{ marginBottom: "20px", boxShadow: "var(--light-shadow)", backgroundColoe: "#9E9E9E" }}>
                <h2>DocuMate</h2>
                <div className="title">
                    <input
                        ref={titleRef}
                        type="text"
                        defaultValue={currentProject && currentProject.title}
                        onChange={() => setIsTileChanged(true)}
                    />
                </div>
                <Link href="/docs" className='btn'>
                    Go to Docs
                </Link>
            </div>

            <div className="concept-form box column nowrap" style={{ padding: "0 20px", maxHeight: "470px" }}>
                {/* to be fixed.. */}
                {/* <div className="box full-width form-header" style={{ justifyContent: "flex-end", flex: 0 }}>
                    <button className='success' type="submit">Save</button>
                    <button className='danger' type="nutton">Cancel</button>
                </div> */}

                <div className="box full-width ai-start">
                    {children}

                    {/* for the sidebar feature */}
                    {/* <div className="form-actions outline paper box column hide-in-small nowrap scroller" style={{ width: '350px', maxHeight: "400px" }}>
                        <h3 className='full-width text-start disable-guitters'>concept control</h3>
                        <Dropdown />

                        <h3 className='full-width text-start disable-guitters'>content control</h3>
                        <div className="box column full-width" style={{}}>
                            <label htmlFor="image" className='btn full-width'>Add Image</label>
                            <input type="file" id="image" ref={imgRef} accept="image/*" className='hidden' onChange={handleImageChange} />
                            <button type="button" onClick={() => setExamples(!examples)} className='full-width text-start'>
                                {examples ? "Remove Examples" : "Add Examples"}
                            </button>
                            <button type="button" className='full-width text-start'>
                                Add Note
                            </button>
                            <button type="button" className='full-width text-start'>
                                Add Comment
                            </button>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default ProjectLayout