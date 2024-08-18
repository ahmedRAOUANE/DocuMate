"use client";

import useModal from '@/custom-hooks/useModal';
import { setAction } from '@/store/confirmSlice';
import { useDispatch, useSelector } from 'react-redux';

// icons
import Icon from "@/icons";

const Dropdown = () => {
    const selectedConcept = useSelector(state => state.conceptSlice.selectedConcept);
    const action = useSelector(state => state.confirmSlice.action);
    const isOpen = useSelector(state => state.modalSlice.isOpen);

    const dispatch = useDispatch()

    const { openWindow, closeWindow } = useModal();

    const updateAction = (value) => {
        dispatch(setAction(value))
    }

    return (
        <div style={{ position: "relative" }} className='full-width'>
            <div className="box column">
                <div className="btn-group switch full-width box">
                    <button type='button' onClick={() => updateAction("new concept")} className={action === "new concept" ? "active" : ""}>new concept</button>
                    <button type='button' onClick={() => updateAction("update concept")} className={action === "update concept" ? "active" : ""}>update concept</button>
                </div>

                <button type='button' onClick={() => isOpen ? closeWindow : openWindow("conceptsList")} className='full-width box'>
                    {selectedConcept ? selectedConcept.title : action === "new concept" ? "select concept" : "select concept to update"} {<Icon name="arrow-right" className={!isOpen ? "toRight" : "toDown"} />}
                </button>
            </div>
        </div>
    );
};

export default Dropdown;
