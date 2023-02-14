import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const USERS_URL = 'https://jsonplaceholder.typicode.com/';

const initialState = []

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axios.get(USERS_URL);
    return response.data
})

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            return action.payload;
        })
    }
})

export const selectAllUsers = (state) => state.users;
console.log(selectAllUsers)

export default usersSlice.reducer