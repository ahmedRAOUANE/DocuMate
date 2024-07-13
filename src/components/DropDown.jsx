'use client';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import useConcepts from '@/custom-hooks/useCreate';

// icons
import Icon from "@/icons";

const Dropdown = () => {
    const data = useSelector(state => state.conceptSlice.conceptsList);
    const selectedConcept = useSelector(state => state.conceptSlice.selectedConcept);

    const [isHidden, setIsHidden] = useState(true);

    const { selectConcept } = useConcepts();

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
            <button type='button' onClick={() => setIsHidden(!isHidden)} className='full-width'>
                <span className='box'>
                    {selectedConcept.title} {isHidden ? <Icon name="arrow-right" /> : <Icon name="arrow-down" />}
                </span>
            </button>

            <div className={`paper scroller ${isHidden ? "hidden" : ""}`} style={{ position: "absolute", width: "300px", right: 0, maxHeight: "470px" }}>
                <ul className='box column full-width'>
                    <li key="new-concept" className='full-width'>
                        <div className='box column full-width'>
                            <button type='button' className='full-width text-start' onClick={() => selectConcept({ title: "new concept", id: "" })}>
                                new concept
                            </button>
                        </div>
                    </li>
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
