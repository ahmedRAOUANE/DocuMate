/* eslint-disable @next/next/no-img-element */
"use client";

import { useSelector } from 'react-redux';
import useAuth from '@/custom-hooks/useAuth';
import useData from '@/custom-hooks/useData';
import React, { useRef, useEffect } from 'react';
import useInputParser from '@/custom-hooks/useInputParser';

const Workspace = ({ params }) => {
    const currentProject = useSelector(state => state.projectSlice.selectedProject);
    const { projectID } = params;

    const typingareaRef = useRef();
    const lineNumbersRef = useRef();

    const user = useAuth();
    const { getProject } = useData();
    const { htmlTree, updateText } = useInputParser();

    useEffect(() => {
        const fetchData = async () => {
            if (user && projectID) {
                await getProject(user.uid, projectID);
            }
        };

        if (!currentProject && user) {
            fetchData();
        }

        // handle keydown event listener
        const handleKeydown = (ev) => {
            if (ev.ctrlKey && ev.key === 's' && user) {
                ev.preventDefault();
                updateText(typingareaRef.current.value, currentProject);
            }
        };

        window.addEventListener("keydown", handleKeydown);

        return () => {
            window.removeEventListener("keydown", handleKeydown);
        };
    }, [getProject, user, updateText, currentProject, projectID]);

    const handleScroll = (e) => {
        if (lineNumbersRef.current) {
            lineNumbersRef.current.scrollTop = e.target.scrollTop;
        }
    };

    const countLines = (text) => text.split("\n").length;

    return (
        <div className="workspace full-width">
            <div className="box column full-width">
                <div className="box full-width ">
                    {/* input area */}
                    <div className="inputarea paper box nowrap full-width outline ">
                        <div ref={lineNumbersRef} className="line-numbers scroller full-height" style={{ maxWidth: "fit-content" }}>
                            <div>
                                {currentProject && Array.from({ length: countLines(currentProject.body) }, (_, i) => (
                                    <div key={i}>{i + 1}</div>
                                ))}
                            </div>
                        </div>
                        <div className='full-width full-height'>
                            <textarea
                                defaultValue={currentProject && currentProject.body}
                                id="typingarea"
                                placeholder='Type here'
                                ref={typingareaRef}
                                required
                                style={{ resize: "none" }}
                                onScroll={handleScroll}
                            />
                        </div>
                    </div>

                    {/* preview */}
                    <div className="preview paper box column full-width outline">
                        <div className="preview-header box outline">
                            <p className='full-width'>preview</p>
                        </div>
                        <div className="preview-body scroller full-width box column jc-start ai-start outline">
                            <div className="full-width">
                                {htmlTree.map((ele, idx) => (
                                    <React.Fragment key={idx}>{ele}</React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Workspace;

