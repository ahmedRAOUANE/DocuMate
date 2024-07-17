import React from 'react'
import { useDispatch } from 'react-redux';
import useModal from '@/custom-hooks/useModal';
import { setAction, setIsConfirmed } from '@/store/confirmSlice';

const DeleteMsg = () => {

    const dispatch = useDispatch();

    const { closeWindow } = useModal();

    const confirmMsg = () => {
        dispatch(setIsConfirmed(true));
    }

    const cancel = () => {
        closeWindow()
        dispatch(setAction("update concept"));
        dispatch(setIsConfirmed(false));
    }

    return (
        <div className='box column'>
            <p>are you sure you want to delet this concept?</p>
            <div className="box full-width" style={{ justifyContent: "flex-end" }}>
                <button onClick={cancel}>cancel</button>
                <button className='danger' onClick={confirmMsg}>yes</button>
            </div>
        </div>
    )
}

export default DeleteMsg