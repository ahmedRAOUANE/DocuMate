const { createSlice } = require("@reduxjs/toolkit");

const statesSlice = createSlice({
    name: "states",
    initialState: { isLoading: true, error: null },
    reducers: {
        setIsLoading: (state, { paylod }) => {
            state.isLoading = paylod
        },
        setError: (state, { paylod }) => {
            state.error = paylod
        }
    }
})

export const { setIsLoading, setError } = statesSlice.actions;
export default statesSlice.reducer 