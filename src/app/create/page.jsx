'use client';

import DropDown from '@/components/DropDown';
import { auth, db, storage } from '@/config/firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { v4 } from 'uuid';

const CreateDocs = () => {
    const titleRef = useRef();
    const explanationRef = useRef();
    const imgRef = useRef();

    const [examples, setExamples] = useState(false);
    const [examplesList, setExamplesList] = useState([{ id: 1, content: "", title: "example-1" }]);

    const user = auth.currentUser;

    const addExampleField = () => {
        const newId = examplesList.length ? examplesList[examplesList.length - 1].id + 1 : 1;
        setExamplesList(prev => [...prev, { id: newId, content: "", title: `example-${newId}` }]);
    }

    const removeExampleField = (idToRemove) => {
        setExamplesList(prev => prev.filter(example => example.id !== idToRemove));
    }

    const handleExampleChange = (id, content) => {
        setExamplesList(prev => prev.map(example => example.id === id ? { ...example, content } : example));
    }

    const handleAddConcept = async (e) => {
        e.preventDefault();

        const title = titleRef.current.value;
        const link = title.toLowerCase().replace(/\s+/g, '-');

        const imgUrl = await uploadFieles();

        const payload = {
            id: v4(),
            title,
            link,
            explanation: explanationRef.current.value,
            img: imgUrl || null,
            examples: examplesList,
            subConcepts: []
        };

        // Submit the payload to the server
        console.log('Submitting payload:', payload);
        uploadData(payload);
    }

    const uploadFieles = async () => {
        const image = imgRef.current.files[0];
        if (!image) return null;

        const imageName = `${image.name}_${v4()}`;
        const storageRef = ref(storage, `images/${user.uid}/${imageName}`);
        const snapshot = await uploadBytes(storageRef, image);
        const downloadUrl = await getDownloadURL(snapshot.ref);

        return downloadUrl;
    }

    const uploadData = async (data) => {
        const conceptDocRef = doc(db, "concepts", user.uid);
        const conceptDocSnap = await getDoc(conceptDocRef);

        if (!conceptDocSnap.exists()) {
            await setDoc(conceptDocRef, {
                [data.id]: data
            })
                .then(() => {
                    alert("concept add successfully");
                }, () => {
                    alert("something went wrong, try again..")
                })
        } else {
            await updateDoc(conceptDocRef, {
                [data.id]: data
            })
        }
    }

    return (
        <div className='container'>
            <div className="box">
                <h2>Create Docs</h2>
                <DropDown />
                <Link className='btn' href={"/docs"}>go to docs</Link>
            </div>

            <div className="paper">
                <form className="box column text-white" onSubmit={handleAddConcept}>
                    <input type="text" placeholder='title' autoFocus ref={titleRef} />
                    <textarea type="text" placeholder='explanation' ref={explanationRef} />
                    <input type="file" className='hidden' id="img" ref={imgRef} />
                    <label htmlFor="img" className='btn full-width'>Add Image</label>
                    <input type="button" value={`${examples ? "Hide" : "Add"} Examples Field`} onClick={() => setExamples(!examples)} />
                    <div className={`box column full-width ${examples ? "" : "hidden"}`}>
                        <input type="button" value={"+"} onClick={addExampleField} />
                        {
                            examplesList.map((example) => (
                                <div key={example.id} id={`example-${example.id}`} className="box full-width">
                                    <textarea
                                        className='full-width'
                                        name={`example-${example.id}`}
                                        id={`example-${example.id}`}
                                        value={example.content}
                                        onChange={(e) => handleExampleChange(example.id, e.target.value)}
                                    ></textarea>
                                    <button type='button' onClick={() => removeExampleField(example.id)}>-</button>
                                </div>
                            ))
                        }
                    </div>
                    <input type="submit" />
                </form>
            </div>
        </div>
    );
}

export default CreateDocs;

