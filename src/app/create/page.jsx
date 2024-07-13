'use client';

import { v4 } from 'uuid';
import Link from 'next/link';
import useAuth from '@/custom-hooks/useAuth';
import Dropdown from '@/components/Dropdown';
import React, { useEffect, useRef, useState } from 'react';
import useUpload from '@/custom-hooks/useUploaod';
import useConcepts from '@/custom-hooks/useCreate';

// icons
import Icon from '@/icons';
import useGetData from '@/custom-hooks/useGetData';

const CreateDocs = () => {
    const titleRef = useRef();
    const explanationRef = useRef();
    const imgRef = useRef();

    const [examples, setExamples] = useState(false);
    const [examplesList, setExamplesList] = useState([{ id: 1, content: "", title: "example-1" }]);

    const user = useAuth();
    const { createConcept } = useConcepts();
    const { uploadFile } = useUpload();
    const getData = useGetData();

    useEffect(() => {
        const fetchData = () => {
            getData();
        }

        fetchData();
    }, [getData]);

    const addExampleField = () => {
        const newId = examplesList.length ? examplesList[examplesList.length - 1].id + 1 : 1;
        setExamplesList(prev => [...prev, { id: newId, content: "", title: `example-${newId}` }]);
    };

    const removeExampleField = (idToRemove) => {
        setExamplesList(prev => prev.filter(example => example.id !== idToRemove));
    };

    const handleExampleChange = (id, content) => {
        setExamplesList(prev => prev.map(example => example.id === id ? { ...example, content } : example));
    };

    const handleAddConcept = async (e) => {
        e.preventDefault();

        if (user) {
            try {
                const title = titleRef.current.value;
                const link = title.toLowerCase().replace(/\s+/g, '-');
                const file = imgRef.current.files[0];

                const imgUrl = file ? await uploadFile(file, `concepts/${user.uid}/${link}/images/${file.name}_${v4()}`) : null;

                const payload = {
                    id: v4(),
                    title,
                    link,
                    explanation: explanationRef.current.value,
                    img: imgUrl,
                    examples: examplesList.map(({ content }) => content),
                    subConcepts: []
                };

                await createConcept(payload);
            } catch (err) {
                console.log("Error Submitting Data: ", err);
            }
        } else {
            console.log("no user found");
        }
    };

    return (
        <div className="">
            <div className="container box" style={{ justifyContent: 'flex-end', marginBottom: "20px" }}>
                <Link href="/docs">
                    Go to Docs
                </Link>
            </div>

            <form className="concept-form box column" onSubmit={handleAddConcept}>
                <div className="box full-width form-header" style={{ justifyContent: "flex-end" }}>
                    <button type="submit">Add Concept</button>
                </div>

                <div className="box full-width ai-start">
                    <div className="paper">
                        <ul className="box column">
                            <li>
                                <button type="button" className='text-black bg-transparent box center-x center-y'><Icon name={"arrow-right"} /></button>
                            </li>
                            <li>
                                <button type="button" className='rounded box center-x center-y'>X</button>
                            </li>
                            <li>
                                <button type="button" className='rounded box center-x center-y'>X</button>
                            </li>
                            <li>
                                <button type="button" className='rounded box center-x center-y'>X</button>
                            </li>
                        </ul>
                    </div>

                    <div className="scroller full-width" style={{ maxHeight: "420px" }}>
                        <div className="box column full-width">
                            <input type="text" id="title" placeholder='title' ref={titleRef} required />

                            <textarea id="explanation" placeholder='Explanation' ref={explanationRef} required style={{ minHeight: "200px" }} />

                            {examples && examplesList.map(example => (
                                <div key={example.id} className="example-field box ai-start full-width">
                                    <textarea
                                        className='full-width'
                                        type="text"
                                        value={example.content}
                                        onChange={(e) => handleExampleChange(example.id, e.target.value)}
                                        placeholder={`Example ${example.id}`}
                                        style={{ minHeight: "100px" }}
                                    />
                                    <button type="button" onClick={() => removeExampleField(example.id)}>Remove</button>
                                </div>
                            ))}
                            {examples && <button type="button" onClick={addExampleField}>Add Another Example</button>}
                        </div>
                    </div>

                    <div className="form-actions paper box column">
                        <Dropdown />
                        <div className="box">
                            <label htmlFor="image" className='btn'>Add Image</label>
                            <input type="file" id="image" ref={imgRef} accept="image/*" className='hidden' />
                            <button type="button" onClick={() => setExamples(!examples)}>
                                {examples ? "Remove Examples" : "Add Examples"}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateDocs;
