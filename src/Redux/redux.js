import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    facultyProfile: {
        email: "",
        name: "",
        semester: "",
        subjectName: "",
        subjectCode: "",
        stream: "",
    },
    studentProfile: {
        email: "",
        name: "",
        rollNo: "",
        semester: "",
        stream: "",
        subjectName: "",
    },
    authentication: "",
    error: "",
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducer: {
        studentlogin: (state, action) => {
            state.authentication = true
            state.studentProfile = action.payload
        },
        logout: (state) => {
            state.authentication = false
            state.facultyProfile = initialState.facultyProfile
            state.studentProfile = initialState.studentProfile
        }
    }
})

export const {studentlogin, logout} = authSlice.actions
export default authSlice.reducer