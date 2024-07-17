const { createSlice } = require("@reduxjs/toolkit");

const confirmSlice = createSlice({
    name: "confirm",
    initialState: { isConfirmed: false, action: "new concept" },
    reducers: {
        setIsConfirmed: (state, { payload }) => {
            state.isConfirmed = payload
        },
        setAction: (state, { payload }) => {
            state.action = payload
        },
    }
})

export const { setIsConfirmed, setAction } = confirmSlice.actions;
export default confirmSlice.reducer;