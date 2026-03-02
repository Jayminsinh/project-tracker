import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    users: localStorage.getItem("users")? JSON.parse(localStorage.getItem("users")): [],
    currentUser :localStorage.getItem("currentUser")? JSON.parse(localStorage.getItem("currentUser")) : null,
    isAuth: localStorage.getItem("isAuth") ? JSON.parse(localStorage.getItem("isAuth")) : false
}

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        addUser(state,action) {
            state.users.push(action.payload);
            localStorage.setItem("users", JSON.stringify(state.users))
        },
        loginUser(state, action) {
            state.currentUser = action.payload;
            localStorage.setItem("currentUser" , JSON.stringify(action.payload));
            state.isAuth = true;
            localStorage.setItem("isAuth","true")
        },
        logoutUser(state) {
            state.currentUser = null;
            localStorage.removeItem("currentUser");
            state.isAuth = false;
            localStorage.setItem("isAuth","false")
        }
    }
})

export const {addUser, loginUser, logoutUser} = userSlice.actions
export default userSlice.reducer 