/* eslint-disable @next/next/no-img-element */
"use client";

import { v4 } from 'uuid';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { storage } from '@/config/firebase';
import useAuth from '@/custom-hooks/useAuth';
import Dropdown from '@/components/dropdown/Dropdown';
import useUpload from '@/custom-hooks/useUpload';
import useConcepts from '@/custom-hooks/useConcepts';
import useGetData from '@/custom-hooks/useGetData';
import { deleteObject, ref } from 'firebase/storage';
import React, { useEffect, useRef, useState } from 'react';
import useModal from '@/custom-hooks/useModal';
import { setAction, setIsConfirmed } from '@/store/confirmSlice';
import { setNewConceptData } from '@/store/conceptSlice';
import Codearea from '@/components/specialSections/Codearea';
import Examplearea from '@/components/specialSections/Examplearea';

// icons
import Icon from '@/icons';

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
        <div className="scroller full-width" style={{ maxHeight: "400px" }}>
            <div className="box column full-width">
                <div className="paper box column full-width outline">
                    <textarea id="explanation" placeholder='Explanation' ref={explanationRef} required style={{ resize: "none" }} />
                    <Codearea lang={"code lang"} />
                    <textarea id="moreExplanation" placeholder='more Explanation' style={{ resize: "none" }} />
                    <Examplearea examples={examples} examplesList={examplesList} />
                </div>

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
            </div>
        </div>
    );
};

export default CreateDocs;

