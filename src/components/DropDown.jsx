"use client";

import React, { useState } from 'react';
import { setStatus } from '@/store/conceptSlice';
import useConcepts from '@/custom-hooks/useCreate';
import { useDispatch, useSelector } from 'react-redux';

// icons
import Icon from "@/icons";

const Dropdown = () => {
    const data = useSelector(state => state.conceptSlice.conceptsList);
    const selectedConcept = useSelector(state => state.conceptSlice.selectedConcept);
    const status = useSelector(state => state.conceptSlice.status);

    const [isHidden, setIsHidden] = useState(true);

    const dispatch = useDispatch()
    const { selectConcept } = useConcepts();

    const handleSelectConcept = (concept) => {
        selectConcept(concept)
        setIsHidden(true)
    }

    const updateStatus = (value) => {
        dispatch(setStatus(value))
    }

    const renderSubConcepts = (subConcepts, width = "unset") => {
        return (
            <ul className="box column" style={{ width: width, marginLeft: "30px" }}>
                {subConcepts.map(subConcept => (
                    <li key={subConcept.id} className='full-width'>
                        <div className="box column full-width">
                            <button type='button' className='full-width' onClick={() => selectConcept(subConcept)}>
                                {subConcept.title}
                            </button>
                            {subConcept.subConcepts && subConcept.subConcepts.length > 0 && renderSubConcepts(subConcept.subConcepts, "200px")}
                        </div>
                    </li>
                ))}
            </ul>
        );
    };

    const mainConcepts = data.filter(concept => !data.some(c => c.subConcepts && c.subConcepts.some(sub => sub.id === concept.id)));

    return (
        <div style={{ position: "relative" }} className='full-width'>
            <div className="box column">
                <div className="box">
                    <button type='button' onClick={() => updateStatus("new concept")}>new concept</button>
                    <button type='button' onClick={() => updateStatus("update concept")}>update concept</button>
                </div>

                <button type='button' onClick={() => setIsHidden(!isHidden)} className='full-width box'>
                    {selectedConcept.title} {<Icon name="arrow-right" className={isHidden ? "toRight" : "toDown"} />}
                </button>
            </div>

            <div className={`paper scroller ${isHidden ? "hidden" : ""}`} style={{ position: "absolute", width: "300px", right: 0, maxHeight: "470px", zIndex: 400 }}>
                <ul className='box column full-width'>
                    <li className='full-width'>
                        <button type='button' className='full-width text-start' onClick={() => handleSelectConcept({ title: "new concept", id: "" })}>
                            new concept
                        </button>
                    </li>
                    <h3 className='full-width text-start disable-guitters text-slate-700'>concepts</h3>
                    {mainConcepts.map(concept => (
                        <li key={concept.id} className='full-width'>
                            <div className='box column full-width'>
                                <button type='button' className='full-width text-start' onClick={() => handleSelectConcept(concept)}>
                                    {concept.title}
                                </button>
                                {concept.subConcepts && concept.subConcepts.length > 0 && renderSubConcepts(concept.subConcepts, "230px")}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Dropdown;
