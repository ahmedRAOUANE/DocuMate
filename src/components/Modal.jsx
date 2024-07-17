"use client";

import React from 'react';
import { useSelector } from 'react-redux';
import useModal from '@/custom-hooks/useModal';

// style
import "../styles/modal.css";

// components
import DeleteMsg from './DeleteMsg';
import DropdownConceptsList from './DropdownConceptsList';
import SuccessMsg from './SuccessMsg';

const SelectedWindow = () => {
    const window = useSelector(state => state.modalSlice.window);

    switch (window) {
        case "conceptsList":
            return <DropdownConceptsList />
        case "delet":
            return <DeleteMsg />
        case "success":
            return <SuccessMsg />
        default:
            return null
    }
}

const Modal = () => {
    const isOpen = useSelector(state => state.modalSlice.isOpen);
    const window = useSelector(state => state.modalSlice.window);

    const overlayClass = `${window}Container`;

    const { closeWindow } = useModal()

    return isOpen && (
        <div className={`overlay full-width full-height box center-x center-y ${overlayClass}`} onClick={closeWindow}>
            <div className={`paper wrapper ${window}`} onClick={(e) => e.stopPropagation()}>
                <SelectedWindow />
            </div>
        </div>
    )
}

export default Modal