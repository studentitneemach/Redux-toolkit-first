import { configureStore } from "@reduxjs/toolkit"
import PostSlice from './PostSlice';
import UserSlice from "../User/userSlice";
const Store = configureStore({
    reducer:{
        posts:PostSlice,
        users: UserSlice,
    }
})
export default Store