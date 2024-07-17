/* eslint-disable @next/next/no-img-element */
"use client";

import { v4 } from 'uuid';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { storage } from '@/config/firebase';
import useAuth from '@/custom-hooks/useAuth';
import Dropdown from '@/components/Dropdown';
import useUpload from '@/custom-hooks/useUpload';
import useConcepts from '@/custom-hooks/useConcepts';
import useGetData from '@/custom-hooks/useGetData';
import { deleteObject, ref } from 'firebase/storage';
import React, { useEffect, useRef, useState } from 'react';

// icons
import Icon from '@/icons';
import useModal from '@/custom-hooks/useModal';
import { setAction, setIsConfirmed } from '@/store/confirmSlice';
import { setNewConceptData } from '@/store/conceptSlice';

const CreateDocs = () => {
    const selectedConcept = useSelector(state => state.conceptSlice.selectedConcept);
    const action = useSelector(state => state.confirmSlice.action);
    const isConfirmed = useSelector(state => state.confirmSlice.isConfirmed);

    const dispatch = useDispatch();

    const titleRef = useRef();
    const explanationRef = useRef();
    const imgRef = useRef();

    const [examples, setExamples] = useState(false);
    const [examplesList, setExamplesList] = useState([{ id: 1, content: "", title: "example-1" }]);
    const [img, setImg] = useState(null);

    const user = useAuth();
    const { uploadFile } = useUpload();
    const getData = useGetData();
    const { openWindow } = useModal();
    const { createNewConcept } = useConcepts();

    useEffect(() => {
        const fetchData = () => {
            getData();
        };

        fetchData();
    }, [getData]);

    useEffect(() => {
        if (selectedConcept) {
            if (action === "update concept" && selectedConcept.title !== "new concept") {
                titleRef.current.value = selectedConcept.title;
                explanationRef.current.value = selectedConcept.explanation || "";
                setExamplesList(selectedConcept.examples ? selectedConcept.examples.map((content, index) => ({ id: index + 1, content, title: `example-${index + 1}` })) : []);
                setExamples(!!selectedConcept.examples);
                setImg(selectedConcept.img || null);
            }
        }
    }, [action, selectedConcept]);

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

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file && user) {
            const link = titleRef.current.value.toLowerCase().replace(/\s+/g, '-');
            const imgUrl = await uploadFile(file, `concepts/${user.uid}/${link}/images/${file.name}_${v4()}`);
            setImg(imgUrl);
        }
    };

    const handleRemoveImg = async () => {
        if (img) {
            const imgRef = ref(storage, img);
            await deleteObject(imgRef);
            setImg(null);
        }
    }

    const handleAddConcept = async (e) => {
        e.preventDefault();

        dispatch(setIsConfirmed(true));

        if (user) {
            try {
                const title = titleRef.current.value;
                const link = title.toLowerCase().replace(/\s+/g, '-');

                const payload = {
                    id: v4(),
                    title,
                    link,
                    explanation: explanationRef.current.value,
                    img: img,
                    examples: examplesList.map(({ content }) => content),
                    subConcepts: selectedConcept ? selectedConcept.subConcepts : [],
                    parentID: selectedConcept && action === "new concept" ? selectedConcept.id : null,
                };

                dispatch(setNewConceptData(payload));
            } catch (err) {
                console.log("Error Submitting Data: ", err);
            }
        } else {
            console.log("no user found");
        }
    };

    const handleDelete = () => {
        openWindow("delet");
        dispatch(setAction("delete concept"))
    }

    return (
        <div className="">
            <div className="container box" style={{ justifyContent: 'flex-end', marginBottom: "20px" }}>
                <Link href="/docs">
                    Go to Docs
                </Link>
            </div>

            <form className="concept-form box column" onSubmit={handleAddConcept} style={{ padding: "0 20px" }}>
                <div className="box full-width form-header" style={{ justifyContent: "flex-end" }}>
                    {selectedConcept && action === "update concept" && <button onClick={handleDelete} type="button">delete</button>}
                    <button type="submit">{action === "update concept" ? "Update Concept" : "Add Concept"}</button>
                </div>

                <div className="box full-width ai-start">
                    {/* for the sidebar feature */}
                    {/* <div className="paper">
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
                    </div> */}

                    <div className="scroller full-width" style={{ maxHeight: "420px" }}>
                        <div className="box column full-width">
                            <input type="text" id="title" placeholder='title' ref={titleRef} required />

                            <textarea id="explanation" placeholder='Explanation' ref={explanationRef} required style={{ minHeight: "200px" }} />

                            {img && (
                                <div className="box">
                                    <div className="image-container relative">
                                        <button type="button" className={"icon delete btn box center-x center-y"} onClick={handleRemoveImg}>
                                            <Icon name={"remove"} />
                                        </button>
                                        <img src={img} alt="Concept Image" style={{ maxWidth: '200px', marginBottom: '10px' }} />
                                    </div>
                                </div>
                            )}

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

                    <div className="form-actions paper box column" style={{ width: '350px' }}>
                        <h3 className='full-width text-start disable-guitters text-slate-600'>concept control</h3>
                        <Dropdown />

                        <h3 className='full-width text-start disable-guitters text-slate-600'>content</h3>
                        <div className="box">
                            <label htmlFor="image" className='btn'>Add Image</label>
                            <input type="file" id="image" ref={imgRef} accept="image/*" className='hidden' onChange={handleImageChange} />
                            <button type="button" onClick={() => setExamples(!examples)} className='full-width'>
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

