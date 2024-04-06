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
        }
    }
})

export const {studentlogin} = authSlice.actions
export default authSlice.reducer
