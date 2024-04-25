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
    admin : {
        email : "",
        name : "",
        branch : ""
    },
    authentication: false,
    error: "",
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        studentlogin: (state, action) => {
            state.studentProfile = action.payload
            state.authentication = true
        },
        facultylogin: (state, action) => {
            state.facultyProfile = action.payload
            state.authentication = true
        },
        adminLogin : (state,action) => {
            state.admin = action.payload
            state.authentication = true
        },
        logout: (state) => {
            state.authentication = false
            state.studentProfile = {
                email: "",
                name: "",
                rollNo: "",
                semester: "",
                stream: "",
                subjectName: "",
            }
            state.facultyProfile = {
                email: "",
                name: "",
                semester: "",
                subjectName: "",
                subjectCode: "",
                stream: "",
            }
            state.admin = false
        },
    }
})

export const { studentlogin, facultylogin, logout,adminLogin } = authSlice.actions
export default authSlice.reducer
