import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    themeMode : window.matchMedia("(prefers-color-scheme : dark)").matches ? "dark" : "light",
}

export const themeSlice = createSlice({
    name : "theme",
    initialState,
    reducers : {
        setTheme : (state, action) => {
            state.themeMode = action.payload
        }
    }
})

export const {setTheme} = themeSlice.actions
export default themeSlice.reducer