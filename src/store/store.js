import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import projectsReducer from "./projectsSlice"


const store = configureStore({
    reducer:{
        users: userReducer,
        projects: projectsReducer
    }
})

export default store;