"use client";

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Dropdown from '@/components/dropdown/Dropdown'
import { useDispatch, useSelector } from 'react-redux';
import useAuth from '@/custom-hooks/useAuth';
import useUpload from '@/custom-hooks/useUpload';
import useModal from '@/custom-hooks/useModal';
import useConcepts from '@/custom-hooks/useConcepts';
import { setAction, setIsConfirmed } from '@/store/confirmSlice';
import { setSelectedConcept } from '@/store/conceptSlice';

const ProjectLayout = ({ children }) => {
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
    // const getData = useGetData();
    const { openWindow } = useModal();
    const { createNewConcept } = useConcepts();

    // useEffect(() => {
    //     const fetchData = () => {
    //         getData();
    //     };

    //     fetchData();
    // }, [getData]);

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
            <div className="container box full-width outline" style={{ marginBottom: "20px", boxShadow: "var(--light-shadow)", backgroundColoe: "#9E9E9E" }}>
                <h2>DocuMate</h2>
                <div className="title">
                    <input type="text" id="title" placeholder='title' ref={titleRef} defaultValue={"untitled"} />
                </div>
                <Link href="/docs" className='btn'>
                    Go to Docs
                </Link>
            </div>

            <form className="concept-form box column nowrap" onSubmit={handleAddConcept} style={{ padding: "0 20px", maxHeight: "470px" }}>
                <div className="box full-width form-header" style={{ justifyContent: "flex-end", flex: 0 }}>
                    {selectedConcept && action === "update concept" && <button className='danger' onClick={handleDelete} type="button">delete</button>}
                    <button className='success' type="submit">Save</button>
                    <button className='danger' type="nutton" onClick={handleDelete}>Cancel</button>
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

                    {children}

                    <div className="form-actions outline paper box column hide-in-small nowrap scroller" style={{ width: '350px', maxHeight: "400px" }}>
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
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ProjectLayout