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

    const [isHidden, setIsHidden] = useState(true);

    const dispatch = useDispatch()
    const { selectConcept } = useConcepts();

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
                <select name="status" id="status" className='btn full-width' onChange={e => updateStatus(e.target.value)}>
                    <option value="new concept">new concept</option>
                    <option value="update concept">update concept</option>
                </select>

                <button type='button' onClick={() => setIsHidden(!isHidden)} className='full-width'>
                    <span className='box'>
                        {selectedConcept.title} {isHidden ? <Icon name="arrow-right" /> : <Icon name="arrow-down" />}
                    </span>
                </button>
            </div>

            <div className={`paper scroller ${isHidden ? "hidden" : ""}`} style={{ position: "absolute", width: "300px", right: 0, maxHeight: "470px" }}>
                <ul className='box column full-width'>
                    {mainConcepts.map(concept => (
                        <li key={concept.id} className='full-width'>
                            <div className='box column full-width'>
                                <button type='button' className='full-width text-start' onClick={() => selectConcept(concept)}>
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
