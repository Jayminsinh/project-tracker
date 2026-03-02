import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    projects: localStorage.getItem("projects") ? JSON.parse(localStorage.getItem("projects")) : []
}

const projectsSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
        addProject(state,action) {
            state.projects.push(action.payload);
            localStorage.setItem("projects",JSON.stringify(state.projects));
        },
        deleteProject(state,action) {
            state.projects = state.projects.filter(p => p.projectId !== action.payload);
            localStorage.setItem("projects", JSON.stringify(state.projects))
        },
        updateProject(state, action) {
            state.projects = state.projects.map(
                (p) => 
                    p.projectId === action.payload.projectId ? action.payload : p
            )
            localStorage.setItem("projects", JSON.stringify(state.projects))
        }
    }
})

export const {addProject, deleteProject, updateProject} = projectsSlice.actions
export default projectsSlice.reducer