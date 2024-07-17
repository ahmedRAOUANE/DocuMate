import { setIsConfirmed } from "@/store/confirmSlice";

const { setIsOpen, setWindow } = require("@/store/modalSlice");
const { useDispatch } = require("react-redux")

const useModal = () => {
    const dispatch = useDispatch();

    const openWindow = (window) => {
        dispatch(setIsOpen(true));
        dispatch(setWindow(window));
    }

    const closeWindow = () => {
        dispatch(setIsOpen(false));
        dispatch(setWindow(""));
        dispatch(setIsConfirmed(false));
    }

    return {
        openWindow,
        closeWindow
    }
}

export default useModal;