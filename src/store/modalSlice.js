const { createSlice } = require("@reduxjs/toolkit");

const modalSlice = createSlice({
    name: "modal",
    initialState: { isOpen: false, window: "", operation: "" },
    reducers: {
        setIsOpen: (state, { payload }) => {
            state.isOpen = payload
        },
        setWindow: (state, { payload }) => {
            state.window = payload
        },
        setOperation: (state, { payload }) => {
            state.operation = payload
        },
    }
})

export const { setIsOpen, setWindow, setOperation } = modalSlice.actions;
export default modalSlice.reducer;