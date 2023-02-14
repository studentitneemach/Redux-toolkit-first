import { configureStore,  } from "@reduxjs/toolkit";  
import  PostsReducer,{   emailGetData, fetchUsers}  from "./PostSlice";

const Store = configureStore({
  reducer: {
      posts: PostsReducer, 
  },
});

Store.dispatch(emailGetData())

  Store.dispatch(fetchUsers() );
export default Store;