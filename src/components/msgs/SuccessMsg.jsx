import React from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import useModal from '@/custom-hooks/useModal';
import { setAction, setIsConfirmed } from '@/store/confirmSlice';
import { setOperation } from '@/store/modalSlice';
import { useRouter } from 'next/navigation';

const SuccessMsg = () => {
  const operation = useSelector(state => state.modalSlice.operation);

  const dispatch = useDispatch();
  const router = useRouter();

  const { closeWindow } = useModal();

  const cancel = () => {
    closeWindow()
    dispatch(setOperation(operation));
    dispatch(setIsConfirmed(false));
  }

  const changePage = () => {
    router.push("docs");
    closeWindow();
  }

  const msg = () => {
    if (operation === "new main concept") {
      return "new main concept created successfully"
    }
    else if (operation === "new sub concept") {
      return "new sub concept created successfully"
    }
    else if (operation === "update concept") {
      return "concept updated successfully"
    }
    else if (operation === "delete concept") {
      return "concept have been deleted"
    } else {
      return "operation completed successfully"
    }
  }

  return (
    <div className='box column'>
      <p>{msg()}, do you want to go to Docs page?</p>
      <div className="box full-width" style={{ justifyContent: "flex-end" }}>
        <button onClick={cancel}>Stay</button>
        <button onClick={changePage}>Go To Docs</button>
      </div>
    </div>
  )
}

export default SuccessMsg