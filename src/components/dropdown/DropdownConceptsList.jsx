import React from 'react';
import { useSelector } from 'react-redux';
import useModal from '@/custom-hooks/useModal';
import useConcepts from '@/custom-hooks/useConcepts';

const DropdownConceptsList = () => {
    const data = useSelector(state => state.conceptSlice.conceptsList);

    const { selectConcept } = useConcepts();
    const { closeWindow } = useModal();

    const handleSelectConcept = (concept) => {
        selectConcept(concept)
        closeWindow();
    }

    const renderSubConcepts = (subConcepts, width = "unset") => {
        return (
            <ul className="box column" style={{ width: width, marginLeft: "30px" }}>
                {subConcepts.map(subConcept => (
                    <li key={subConcept.id} className='full-width'>
                        <div className="box column full-width">
                            <button type='button' className='full-width text-start' onClick={() => handleSelectConcept(subConcept)}>
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
        <>
            <ul className='box column full-width'>
                <li className='full-width'>
                    <button type='button' className='full-width text-start' onClick={() => handleSelectConcept(null)}>
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
        </>
    )
}

export default DropdownConceptsList