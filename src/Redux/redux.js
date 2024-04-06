import {createSlice} from '@reduxjs/toolkit';

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
    name : "auth",
    initialState,
    reducers : {
        studentlogin : (state, action) => {
            state.studentProfile = action.payload
            state.authentication = true
        },
        facultylogin : (state, action) => {
            state.facultyProfile = action.payload
            state.authentication = true
        }
        
    }
})

export const {studentlogin, facultylogin} = authSlice.actions
export default authSlice.reducer
