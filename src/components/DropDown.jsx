'use client';

import React, { useState } from 'react';

const arrowDown = (
    <svg
        style={{ width: "30px" }}
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 24 24"
        data-testid="KeyboardArrowDownIcon"
        title="KeyboardArrowDown"
    >
        <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z"></path>
    </svg>
);
const arrowRight = (
    <svg
        style={{ width: "25px" }}
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 24 24"
        data-testid="ArrowForwardIosIcon"
        title="ArrowForwardIos"
    >
        <path d="M6.23 20.23 8 22l10-10L8 2 6.23 3.77 14.46 12z"></path>
    </svg>
);

const DropDown = () => {
    const [isHidden, setIsHidden] = useState(true);
    const [currentConcept, setCurrentConcept] = useState("new concept");

    const conceptList = [
        {
            title: "new concept",
            id: 0,
            subConcept: [],
        },
        {
            title: "concept 1",
            id: 1,
            subConcept: [
                { id: 4 },
                { id: 6 },
            ],
        },
        {
            title: "concept 2",
            id: 2,
            subConcept: [],
        },
        {
            title: "concept 3",
            id: 3,
            subConcept: [
                { id: 5 }
            ],
        },
        {
            title: "sub concept 1",
            id: 4,
            subConcept: [],
        },
        {
            title: "sub concept 3",
            id: 5,
            subConcept: [],
        },
        {
            title: "sub concept 1",
            id: 6,
            subConcept: [
                { id: 7 }
            ],
        },
        {
            title: "sub sub concept 1",
            id: 7,
            subConcept: [],
        },
    ];

    const handleConceptClick = (title) => {
        setCurrentConcept(title);
        setIsHidden(true);
    }

    const renderSubConcepts = (subConcepts, width = "unset") => {
        return (
            <ul className="box column" style={{ width: width, marginLeft: "30px" }}>
                {subConcepts.map(subConcept => {
                    const target = conceptList.find(concept => concept.id === subConcept.id);
                    return (
                        <li key={target.id} className='full-width'>
                            <div className="box column full-width">
                                <button className='full-width' onClick={() => handleConceptClick(target.title)}>
                                    {target.title}
                                </button>
                                {target.subConcept.length > 0 && renderSubConcepts(target.subConcept, "200px")}
                            </div>
                        </li>
                    );
                })}
            </ul>
        );
    }

    const mainConcepts = conceptList.filter(concept => !conceptList.some(c => c.subConcept.some(sub => sub.id === concept.id)));

    return (
        <div style={{ position: "relative", width: "200px" }}>
            <button onClick={() => setIsHidden(!isHidden)}>
                <span className='box'>
                    {currentConcept} {isHidden ? arrowRight : arrowDown}
                </span>
            </button>

            <div className={`paper scroller ${isHidden ? "hidden" : ""}`} style={{ position: "absolute", width: "300px", right: 0, maxHeight: "470px" }}>
                <ul className='box column full-width'>
                    {mainConcepts.map(concept => (
                        <li key={concept.id} className='full-width'>
                            <div className='box column full-width'>
                                <button className='full-width' onClick={() => handleConceptClick(concept.title)}>
                                    {concept.title}
                                </button>
                                {concept.subConcept.length > 0 && renderSubConcepts(concept.subConcept, "230px")}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default DropDown;
